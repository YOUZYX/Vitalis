// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title IVitalisBounty — Bounty System Interface (Spec §3.B)
/// @notice Canonical interface from Vitalis_Master_Spec.md
interface IVitalisBounty {
    event BountyCreated(bytes32 indexed bountyId, uint256 reward);
    event SubmissionApproved(bytes32 indexed bountyId, address indexed worker);

    function createBounty(string calldata metadataURI) external payable returns (bytes32);
    function approveSubmission(bytes32 bountyId, address worker) external; // Triggers Registry.pulse()
}
