// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IVitalisBounty.sol";
import "./interfaces/IVitalityRegistry.sol";

/**
 * @title VitalisBounty — On-Chain Task & Reward System
 * @notice Manages the bounty lifecycle: create → submit → approve → pulse.
 * @dev Spec §3.B
 *
 *  createBounty:      Payable — locks MON reward, generates unique bountyId.
 *  approveSubmission: Pays worker, then calls Registry.pulse(worker) to restore vitality.
 */
contract VitalisBounty is IVitalisBounty, Ownable, ReentrancyGuard {

    // ─── Linked Contracts ────────────────────────────────────────────

    IVitalityRegistry public registry;

    // ─── Bounty State ────────────────────────────────────────────────

    struct Bounty {
        address creator;
        string metadataURI;
        uint256 reward;
        bool isActive;
        bool isCompleted;
    }

    mapping(bytes32 => Bounty) public bounties;
    uint256 public bountyCount;

    // ─── Access Control ──────────────────────────────────────────────

    mapping(address => bool) public approvers; // Addresses allowed to approve submissions

    // ─── Events (from interface) ─────────────────────────────────────
    // BountyCreated(bytes32 indexed bountyId, uint256 reward)
    // SubmissionApproved(bytes32 indexed bountyId, address indexed worker)

    // ─── Errors ──────────────────────────────────────────────────────

    error BountyNotFound();
    error BountyNotActive();
    error BountyAlreadyCompleted();
    error InsufficientReward();
    error NotApprover();
    error TransferFailed();

    // ─── Modifiers ───────────────────────────────────────────────────

    modifier onlyApprover() {
        if (!approvers[msg.sender] && msg.sender != owner()) revert NotApprover();
        _;
    }

    // ─── Constructor ─────────────────────────────────────────────────

    constructor(address _registry) Ownable(msg.sender) {
        registry = IVitalityRegistry(_registry);
        approvers[msg.sender] = true; // Owner is initial approver
    }

    // ─── Admin ───────────────────────────────────────────────────────

    /**
     * @notice Add an address that can approve submissions (e.g., Validator agent wallet).
     */
    function addApprover(address _approver) external onlyOwner {
        approvers[_approver] = true;
    }

    /**
     * @notice Remove an approver.
     */
    function removeApprover(address _approver) external onlyOwner {
        approvers[_approver] = false;
    }

    // ─── Create Bounty ───────────────────────────────────────────────

    /**
     * @notice Create a new bounty with a MON reward locked in the contract.
     * @param metadataURI  IPFS or URL pointing to bounty description/requirements.
     * @return bountyId    Unique identifier (keccak256 hash).
     */
    function createBounty(
        string calldata metadataURI
    ) external payable override returns (bytes32) {
        if (msg.value == 0) revert InsufficientReward();

        bountyCount++;

        bytes32 bountyId = keccak256(
            abi.encodePacked(
                msg.sender,
                metadataURI,
                msg.value,
                block.number,
                bountyCount
            )
        );

        bounties[bountyId] = Bounty({
            creator: msg.sender,
            metadataURI: metadataURI,
            reward: msg.value,
            isActive: true,
            isCompleted: false
        });

        emit BountyCreated(bountyId, msg.value);

        return bountyId;
    }

    // ─── Approve Submission ──────────────────────────────────────────

    /**
     * @notice Approve a submission: pay the worker and pulse their vitality.
     * @dev    Only callable by authorized approvers (Validator agent).
     *         Flow: validate → pay worker → call Registry.pulse(worker)
     *
     * @param bountyId  The bounty being completed.
     * @param worker    The agent/user who submitted the work.
     */
    function approveSubmission(
        bytes32 bountyId,
        address worker
    ) external override onlyApprover nonReentrant {
        Bounty storage bounty = bounties[bountyId];

        if (!bounty.isActive) revert BountyNotActive();
        if (bounty.isCompleted) revert BountyAlreadyCompleted();
        if (bounty.reward == 0) revert BountyNotFound();

        // Mark as completed
        bounty.isCompleted = true;
        bounty.isActive = false;

        // Pay the worker
        (bool success, ) = payable(worker).call{value: bounty.reward}("");
        if (!success) revert TransferFailed();

        // Pulse the worker's vitality via the Registry
        registry.pulse(worker);

        emit SubmissionApproved(bountyId, worker);
    }

    // ─── View Helpers ────────────────────────────────────────────────

    /**
     * @notice Check if a bounty exists and its current state.
     */
    function getBounty(bytes32 bountyId) external view returns (
        address creator,
        string memory metadataURI,
        uint256 reward,
        bool isActive,
        bool isCompleted
    ) {
        Bounty storage b = bounties[bountyId];
        return (b.creator, b.metadataURI, b.reward, b.isActive, b.isCompleted);
    }

    // ─── Receive MON ─────────────────────────────────────────────────

    receive() external payable {}
}
