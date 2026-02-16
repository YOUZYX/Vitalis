// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IVitalityRegistry.sol";

/**
 * @title VitalityRegistry — On-Chain Agent Metabolism
 * @notice Implements the core Vitalis metabolism: Decay, Pulse, Prune, Evolution.
 * @dev Spec §1.1 — "The Hard Logic (Immutable Rules)"
 *
 *  Decay:     currentVitality = storedVitality - ((block.number - lastUpdateBlock) / decayRate)
 *  Pulse:     +pulseAmount VITA on task completion (Validator/Bounty contract only)
 *  Prune:     Agent dies at ≤ 0 vitality — permissionless call
 *  Evolution: Strategist adjusts decayRate & pulseAmount
 */
contract VitalityRegistry is IVitalityRegistry, Ownable, ReentrancyGuard {

    // ─── Agent State ─────────────────────────────────────────────────

    struct AgentData {
        int256 storedVitality;   // Last checkpointed vitality
        uint256 lastUpdateBlock; // Block at which vitality was last checkpointed
        bool isActive;           // Whether the agent is alive
        bool isRegistered;       // Whether the agent has been registered
    }

    mapping(address => AgentData) public agents;

    // ─── Global Metabolic Parameters ─────────────────────────────────

    uint256 public decayRate = 1000;    // 1 VITA lost per 1000 blocks (~16 min on Monad)
    uint256 public pulseAmount = 50;    // +50 VITA on successful task completion
    uint256 public pruneReward = 1 ether; // Small MON reward for pruning dead agents

    // ─── Access Control ──────────────────────────────────────────────

    address public bountyContract;      // Only VitalisBounty can call pulse()
    address public strategist;          // Only strategist can update metabolic params

    // ─── Events (from interface) ─────────────────────────────────────
    // VitalityPulse(address indexed agent, uint256 newAmount)
    // AgentPruned(address indexed agent)
    // ParametersUpdated(uint256 newDecayRate, uint256 newPulseAmount)

    // ─── Custom Events ───────────────────────────────────────────────

    event AgentRegistered(address indexed agent, int256 initialVitality);

    // ─── Errors ──────────────────────────────────────────────────────

    error NotAuthorized();
    error AgentNotActive();
    error AgentNotRegistered();
    error AgentAlreadyRegistered();
    error AgentStillAlive();
    error InvalidDecayRate();

    // ─── Modifiers ───────────────────────────────────────────────────

    modifier onlyBountyContract() {
        if (msg.sender != bountyContract) revert NotAuthorized();
        _;
    }

    modifier onlyStrategist() {
        if (msg.sender != strategist) revert NotAuthorized();
        _;
    }

    // ─── Constructor ─────────────────────────────────────────────────

    constructor() Ownable(msg.sender) {
        strategist = msg.sender; // Owner is initial strategist
    }

    // ─── Admin Setup ─────────────────────────────────────────────────

    /**
     * @notice Set the VitalisBounty contract address (only owner, once).
     */
    function setBountyContract(address _bountyContract) external onlyOwner {
        bountyContract = _bountyContract;
    }

    /**
     * @notice Set the strategist address.
     */
    function setStrategist(address _strategist) external onlyOwner {
        strategist = _strategist;
    }

    // ─── Agent Registration ──────────────────────────────────────────

    /**
     * @notice Register a new agent with initial vitality of 100.
     */
    function registerAgent(address agent) external onlyOwner {
        if (agents[agent].isRegistered) revert AgentAlreadyRegistered();

        agents[agent] = AgentData({
            storedVitality: 100,
            lastUpdateBlock: block.number,
            isActive: true,
            isRegistered: true
        });

        emit AgentRegistered(agent, 100);
    }

    // ─── Core Metabolism: getVitality ────────────────────────────────

    /**
     * @notice Calculate current vitality with dynamic decay.
     * @dev    Spec §1.1: currentVitality = storedVitality - ((block.number - lastUpdateBlock) / decayRate)
     */
    function getVitality(address agent) external view override returns (int256) {
        AgentData storage data = agents[agent];
        if (!data.isRegistered) return 0;
        if (!data.isActive) return 0;

        uint256 blocksPassed = block.number - data.lastUpdateBlock;
        int256 decayed = int256(blocksPassed / decayRate);
        int256 currentVitality = data.storedVitality - decayed;

        return currentVitality;
    }

    // ─── Core Metabolism: pulse ──────────────────────────────────────

    /**
     * @notice Award vitality to an agent on task completion.
     * @dev    Only callable by the VitalisBounty contract.
     *         Checkpoints current vitality first, then adds pulseAmount.
     */
    function pulse(address agent) external override onlyBountyContract nonReentrant {
        AgentData storage data = agents[agent];
        if (!data.isRegistered) revert AgentNotRegistered();
        if (!data.isActive) revert AgentNotActive();

        // Checkpoint: apply pending decay
        _checkpoint(agent);

        // Add pulse reward
        data.storedVitality += int256(pulseAmount);
        data.lastUpdateBlock = block.number;

        emit VitalityPulse(agent, uint256(data.storedVitality));
    }

    // ─── Core Metabolism: prune ──────────────────────────────────────

    /**
     * @notice Prune a dead agent. Permissionless — anyone can call.
     * @dev    Spec §1.1: If currentVitality <= 0, mark INACTIVE, revoke permissions.
     *         The caller receives a small bounty reward.
     */
    function prune(address agent) external override nonReentrant {
        AgentData storage data = agents[agent];
        if (!data.isRegistered) revert AgentNotRegistered();
        if (!data.isActive) revert AgentNotActive();

        // Calculate current vitality
        _checkpoint(agent);

        if (data.storedVitality > 0) revert AgentStillAlive();

        // Mark as inactive (dead)
        data.isActive = false;

        // Reward the pruner
        if (address(this).balance >= pruneReward) {
            (bool success, ) = payable(msg.sender).call{value: pruneReward}("");
            require(success, "Prune reward transfer failed");
        }

        emit AgentPruned(agent);
    }

    // ─── Governance: Evolution ───────────────────────────────────────

    /**
     * @notice Update global metabolic parameters. Strategist only.
     * @dev    Spec §1.1 Rule 4: decayRate and pulseAmount adjustable.
     */
    function updateMetabolicParams(
        uint256 _decayRate,
        uint256 _pulseAmount
    ) external override onlyStrategist {
        if (_decayRate == 0) revert InvalidDecayRate();

        decayRate = _decayRate;
        pulseAmount = _pulseAmount;

        emit ParametersUpdated(_decayRate, _pulseAmount);
    }

    // ─── Internal Helpers ────────────────────────────────────────────

    /**
     * @dev Checkpoint: materialize pending decay into storedVitality.
     */
    function _checkpoint(address agent) internal {
        AgentData storage data = agents[agent];
        uint256 blocksPassed = block.number - data.lastUpdateBlock;
        int256 decayed = int256(blocksPassed / decayRate);
        data.storedVitality -= decayed;
        data.lastUpdateBlock = block.number;
    }

    // ─── Receive MON for Prune Rewards ───────────────────────────────

    receive() external payable {}
}
