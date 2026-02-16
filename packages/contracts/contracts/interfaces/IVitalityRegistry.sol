// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title IVitalityRegistry — Core Metabolism Interface (Spec §3.A)
/// @notice Canonical interface from Vitalis_Master_Spec.md
interface IVitalityRegistry {
    event VitalityPulse(address indexed agent, uint256 newAmount);
    event AgentPruned(address indexed agent);
    event ParametersUpdated(uint256 newDecayRate, uint256 newPulseAmount);

    // Core Metabolism
    function getVitality(address agent) external view returns (int256);
    function pulse(address agent) external; // Only callable by Validator
    function prune(address agent) external; // Permissionless

    // Governance (Strategist Only)
    function updateMetabolicParams(uint256 _decayRate, uint256 _pulseAmount) external;
}
