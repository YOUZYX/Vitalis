# artifacts\@openzeppelin\contracts\access\Ownable.sol\Ownable.dbg.json

```json
{
  "_format": "hh-sol-dbg-1",
  "buildInfo": "..\\..\\..\\..\\build-info\\96ec52b953361e72b59e153b7b04ee88.json"
}

```

# artifacts\@openzeppelin\contracts\access\Ownable.sol\Ownable.json

```json
{
  "_format": "hh-sol-artifact-1",
  "contractName": "Ownable",
  "sourceName": "@openzeppelin/contracts/access/Ownable.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

```

# artifacts\@openzeppelin\contracts\utils\Context.sol\Context.dbg.json

```json
{
  "_format": "hh-sol-dbg-1",
  "buildInfo": "..\\..\\..\\..\\build-info\\96ec52b953361e72b59e153b7b04ee88.json"
}

```

# artifacts\@openzeppelin\contracts\utils\Context.sol\Context.json

```json
{
  "_format": "hh-sol-artifact-1",
  "contractName": "Context",
  "sourceName": "@openzeppelin/contracts/utils/Context.sol",
  "abi": [],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

```

# artifacts\@openzeppelin\contracts\utils\ReentrancyGuard.sol\ReentrancyGuard.dbg.json

```json
{
  "_format": "hh-sol-dbg-1",
  "buildInfo": "..\\..\\..\\..\\build-info\\96ec52b953361e72b59e153b7b04ee88.json"
}

```

# artifacts\@openzeppelin\contracts\utils\ReentrancyGuard.sol\ReentrancyGuard.json

```json
{
  "_format": "hh-sol-artifact-1",
  "contractName": "ReentrancyGuard",
  "sourceName": "@openzeppelin/contracts/utils/ReentrancyGuard.sol",
  "abi": [
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

```

# artifacts\build-info\96ec52b953361e72b59e153b7b04ee88.json

```json
{"id":"96ec52b953361e72b59e153b7b04ee88","_format":"hh-sol-build-info-1","solcVersion":"0.8.20","solcLongVersion":"0.8.20+commit.a1b79de6","input":{"language":"Solidity","sources":{"@openzeppelin/contracts/access/Ownable.sol":{"content":"// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)\n\npragma solidity ^0.8.20;\n\nimport {Context} from \"../utils/Context.sol\";\n\n/**\n * @dev Contract module which provides a basic access control mechanism, where\n * there is an account (an owner) that can be granted exclusive access to\n * specific functions.\n *\n * The initial owner is set to the address provided by the deployer. This can\n * later be changed with {transferOwnership}.\n *\n * This module is used through inheritance. It will make available the modifier\n * `onlyOwner`, which can be applied to your functions to restrict their use to\n * the owner.\n */\nabstract contract Ownable is Context {\n    address private _owner;\n\n    /**\n     * @dev The caller account is not authorized to perform an operation.\n     */\n    error OwnableUnauthorizedAccount(address account);\n\n    /**\n     * @dev The owner is not a valid owner account. (eg. `address(0)`)\n     */\n    error OwnableInvalidOwner(address owner);\n\n    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);\n\n    /**\n     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.\n     */\n    constructor(address initialOwner) {\n        if (initialOwner == address(0)) {\n            revert OwnableInvalidOwner(address(0));\n        }\n        _transferOwnership(initialOwner);\n    }\n\n    /**\n     * @dev Throws if called by any account other than the owner.\n     */\n    modifier onlyOwner() {\n        _checkOwner();\n        _;\n    }\n\n    /**\n     * @dev Returns the address of the current owner.\n     */\n    function owner() public view virtual returns (address) {\n        return _owner;\n    }\n\n    /**\n     * @dev Throws if the sender is not the owner.\n     */\n    function _checkOwner() internal view virtual {\n        if (owner() != _msgSender()) {\n            revert OwnableUnauthorizedAccount(_msgSender());\n        }\n    }\n\n    /**\n     * @dev Leaves the contract without owner. It will not be possible to call\n     * `onlyOwner` functions. Can only be called by the current owner.\n     *\n     * NOTE: Renouncing ownership will leave the contract without an owner,\n     * thereby disabling any functionality that is only available to the owner.\n     */\n    function renounceOwnership() public virtual onlyOwner {\n        _transferOwnership(address(0));\n    }\n\n    /**\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\n     * Can only be called by the current owner.\n     */\n    function transferOwnership(address newOwner) public virtual onlyOwner {\n        if (newOwner == address(0)) {\n            revert OwnableInvalidOwner(address(0));\n        }\n        _transferOwnership(newOwner);\n    }\n\n    /**\n     * @dev Transfers ownership of the contract to a new account (`newOwner`).\n     * Internal function without access restriction.\n     */\n    function _transferOwnership(address newOwner) internal virtual {\n        address oldOwner = _owner;\n        _owner = newOwner;\n        emit OwnershipTransferred(oldOwner, newOwner);\n    }\n}\n"},"@openzeppelin/contracts/utils/Context.sol":{"content":"// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)\n\npragma solidity ^0.8.20;\n\n/**\n * @dev Provides information about the current execution context, including the\n * sender of the transaction and its data. While these are generally available\n * via msg.sender and msg.data, they should not be accessed in such a direct\n * manner, since when dealing with meta-transactions the account sending and\n * paying for execution may not be the actual sender (as far as an application\n * is concerned).\n *\n * This contract is only required for intermediate, library-like contracts.\n */\nabstract contract Context {\n    function _msgSender() internal view virtual returns (address) {\n        return msg.sender;\n    }\n\n    function _msgData() internal view virtual returns (bytes calldata) {\n        return msg.data;\n    }\n\n    function _contextSuffixLength() internal view virtual returns (uint256) {\n        return 0;\n    }\n}\n"},"@openzeppelin/contracts/utils/ReentrancyGuard.sol":{"content":"// SPDX-License-Identifier: MIT\n// OpenZeppelin Contracts (last updated v5.1.0) (utils/ReentrancyGuard.sol)\n\npragma solidity ^0.8.20;\n\n/**\n * @dev Contract module that helps prevent reentrant calls to a function.\n *\n * Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier\n * available, which can be applied to functions to make sure there are no nested\n * (reentrant) calls to them.\n *\n * Note that because there is a single `nonReentrant` guard, functions marked as\n * `nonReentrant` may not call one another. This can be worked around by making\n * those functions `private`, and then adding `external` `nonReentrant` entry\n * points to them.\n *\n * TIP: If EIP-1153 (transient storage) is available on the chain you're deploying at,\n * consider using {ReentrancyGuardTransient} instead.\n *\n * TIP: If you would like to learn more about reentrancy and alternative ways\n * to protect against it, check out our blog post\n * https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].\n */\nabstract contract ReentrancyGuard {\n    // Booleans are more expensive than uint256 or any type that takes up a full\n    // word because each write operation emits an extra SLOAD to first read the\n    // slot's contents, replace the bits taken up by the boolean, and then write\n    // back. This is the compiler's defense against contract upgrades and\n    // pointer aliasing, and it cannot be disabled.\n\n    // The values being non-zero value makes deployment a bit more expensive,\n    // but in exchange the refund on every call to nonReentrant will be lower in\n    // amount. Since refunds are capped to a percentage of the total\n    // transaction's gas, it is best to keep them low in cases like this one, to\n    // increase the likelihood of the full refund coming into effect.\n    uint256 private constant NOT_ENTERED = 1;\n    uint256 private constant ENTERED = 2;\n\n    uint256 private _status;\n\n    /**\n     * @dev Unauthorized reentrant call.\n     */\n    error ReentrancyGuardReentrantCall();\n\n    constructor() {\n        _status = NOT_ENTERED;\n    }\n\n    /**\n     * @dev Prevents a contract from calling itself, directly or indirectly.\n     * Calling a `nonReentrant` function from another `nonReentrant`\n     * function is not supported. It is possible to prevent this from happening\n     * by making the `nonReentrant` function external, and making it call a\n     * `private` function that does the actual work.\n     */\n    modifier nonReentrant() {\n        _nonReentrantBefore();\n        _;\n        _nonReentrantAfter();\n    }\n\n    function _nonReentrantBefore() private {\n        // On the first call to nonReentrant, _status will be NOT_ENTERED\n        if (_status == ENTERED) {\n            revert ReentrancyGuardReentrantCall();\n        }\n\n        // Any calls to nonReentrant after this point will fail\n        _status = ENTERED;\n    }\n\n    function _nonReentrantAfter() private {\n        // By storing the original value once again, a refund is triggered (see\n        // https://eips.ethereum.org/EIPS/eip-2200)\n        _status = NOT_ENTERED;\n    }\n\n    /**\n     * @dev Returns true if the reentrancy guard is currently set to \"entered\", which indicates there is a\n     * `nonReentrant` function in the call stack.\n     */\n    function _reentrancyGuardEntered() internal view returns (bool) {\n        return _status == ENTERED;\n    }\n}\n"},"contracts/interfaces/IVitalisBounty.sol":{"content":"// SPDX-License-Identifier: MIT\r\npragma solidity ^0.8.19;\r\n\r\n/// @title IVitalisBounty — Bounty System Interface (Spec §3.B)\r\n/// @notice Canonical interface from Vitalis_Master_Spec.md\r\ninterface IVitalisBounty {\r\n    event BountyCreated(bytes32 indexed bountyId, uint256 reward);\r\n    event SubmissionApproved(bytes32 indexed bountyId, address indexed worker);\r\n\r\n    function createBounty(string calldata metadataURI) external payable returns (bytes32);\r\n    function approveSubmission(bytes32 bountyId, address worker) external; // Triggers Registry.pulse()\r\n}\r\n"},"contracts/interfaces/IVitalityRegistry.sol":{"content":"// SPDX-License-Identifier: MIT\r\npragma solidity ^0.8.19;\r\n\r\n/// @title IVitalityRegistry — Core Metabolism Interface (Spec §3.A)\r\n/// @notice Canonical interface from Vitalis_Master_Spec.md\r\ninterface IVitalityRegistry {\r\n    event VitalityPulse(address indexed agent, uint256 newAmount);\r\n    event AgentPruned(address indexed agent);\r\n    event ParametersUpdated(uint256 newDecayRate, uint256 newPulseAmount);\r\n\r\n    // Core Metabolism\r\n    function getVitality(address agent) external view returns (int256);\r\n    function pulse(address agent) external; // Only callable by Validator\r\n    function prune(address agent) external; // Permissionless\r\n\r\n    // Governance (Strategist Only)\r\n    function updateMetabolicParams(uint256 _decayRate, uint256 _pulseAmount) external;\r\n}\r\n"},"contracts/VitalisBounty.sol":{"content":"// SPDX-License-Identifier: MIT\r\npragma solidity ^0.8.20;\r\n\r\nimport \"@openzeppelin/contracts/access/Ownable.sol\";\r\nimport \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";\r\nimport \"./interfaces/IVitalisBounty.sol\";\r\nimport \"./interfaces/IVitalityRegistry.sol\";\r\n\r\n/**\r\n * @title VitalisBounty — On-Chain Task & Reward System\r\n * @notice Manages the bounty lifecycle: create → submit → approve → pulse.\r\n * @dev Spec §3.B\r\n *\r\n *  createBounty:      Payable — locks MON reward, generates unique bountyId.\r\n *  approveSubmission: Pays worker, then calls Registry.pulse(worker) to restore vitality.\r\n */\r\ncontract VitalisBounty is IVitalisBounty, Ownable, ReentrancyGuard {\r\n\r\n    // ─── Linked Contracts ────────────────────────────────────────────\r\n\r\n    IVitalityRegistry public registry;\r\n\r\n    // ─── Bounty State ────────────────────────────────────────────────\r\n\r\n    struct Bounty {\r\n        address creator;\r\n        string metadataURI;\r\n        uint256 reward;\r\n        bool isActive;\r\n        bool isCompleted;\r\n    }\r\n\r\n    mapping(bytes32 => Bounty) public bounties;\r\n    uint256 public bountyCount;\r\n\r\n    // ─── Access Control ──────────────────────────────────────────────\r\n\r\n    mapping(address => bool) public approvers; // Addresses allowed to approve submissions\r\n\r\n    // ─── Events (from interface) ─────────────────────────────────────\r\n    // BountyCreated(bytes32 indexed bountyId, uint256 reward)\r\n    // SubmissionApproved(bytes32 indexed bountyId, address indexed worker)\r\n\r\n    // ─── Errors ──────────────────────────────────────────────────────\r\n\r\n    error BountyNotFound();\r\n    error BountyNotActive();\r\n    error BountyAlreadyCompleted();\r\n    error InsufficientReward();\r\n    error NotApprover();\r\n    error TransferFailed();\r\n\r\n    // ─── Modifiers ───────────────────────────────────────────────────\r\n\r\n    modifier onlyApprover() {\r\n        if (!approvers[msg.sender] && msg.sender != owner()) revert NotApprover();\r\n        _;\r\n    }\r\n\r\n    // ─── Constructor ─────────────────────────────────────────────────\r\n\r\n    constructor(address _registry) Ownable(msg.sender) {\r\n        registry = IVitalityRegistry(_registry);\r\n        approvers[msg.sender] = true; // Owner is initial approver\r\n    }\r\n\r\n    // ─── Admin ───────────────────────────────────────────────────────\r\n\r\n    /**\r\n     * @notice Add an address that can approve submissions (e.g., Validator agent wallet).\r\n     */\r\n    function addApprover(address _approver) external onlyOwner {\r\n        approvers[_approver] = true;\r\n    }\r\n\r\n    /**\r\n     * @notice Remove an approver.\r\n     */\r\n    function removeApprover(address _approver) external onlyOwner {\r\n        approvers[_approver] = false;\r\n    }\r\n\r\n    // ─── Create Bounty ───────────────────────────────────────────────\r\n\r\n    /**\r\n     * @notice Create a new bounty with a MON reward locked in the contract.\r\n     * @param metadataURI  IPFS or URL pointing to bounty description/requirements.\r\n     * @return bountyId    Unique identifier (keccak256 hash).\r\n     */\r\n    function createBounty(\r\n        string calldata metadataURI\r\n    ) external payable override returns (bytes32) {\r\n        if (msg.value == 0) revert InsufficientReward();\r\n\r\n        bountyCount++;\r\n\r\n        bytes32 bountyId = keccak256(\r\n            abi.encodePacked(\r\n                msg.sender,\r\n                metadataURI,\r\n                msg.value,\r\n                block.number,\r\n                bountyCount\r\n            )\r\n        );\r\n\r\n        bounties[bountyId] = Bounty({\r\n            creator: msg.sender,\r\n            metadataURI: metadataURI,\r\n            reward: msg.value,\r\n            isActive: true,\r\n            isCompleted: false\r\n        });\r\n\r\n        emit BountyCreated(bountyId, msg.value);\r\n\r\n        return bountyId;\r\n    }\r\n\r\n    // ─── Approve Submission ──────────────────────────────────────────\r\n\r\n    /**\r\n     * @notice Approve a submission: pay the worker and pulse their vitality.\r\n     * @dev    Only callable by authorized approvers (Validator agent).\r\n     *         Flow: validate → pay worker → call Registry.pulse(worker)\r\n     *\r\n     * @param bountyId  The bounty being completed.\r\n     * @param worker    The agent/user who submitted the work.\r\n     */\r\n    function approveSubmission(\r\n        bytes32 bountyId,\r\n        address worker\r\n    ) external override onlyApprover nonReentrant {\r\n        Bounty storage bounty = bounties[bountyId];\r\n\r\n        if (!bounty.isActive) revert BountyNotActive();\r\n        if (bounty.isCompleted) revert BountyAlreadyCompleted();\r\n        if (bounty.reward == 0) revert BountyNotFound();\r\n\r\n        // Mark as completed\r\n        bounty.isCompleted = true;\r\n        bounty.isActive = false;\r\n\r\n        // Pay the worker\r\n        (bool success, ) = payable(worker).call{value: bounty.reward}(\"\");\r\n        if (!success) revert TransferFailed();\r\n\r\n        // Pulse the worker's vitality via the Registry\r\n        registry.pulse(worker);\r\n\r\n        emit SubmissionApproved(bountyId, worker);\r\n    }\r\n\r\n    // ─── View Helpers ────────────────────────────────────────────────\r\n\r\n    /**\r\n     * @notice Check if a bounty exists and its current state.\r\n     */\r\n    function getBounty(bytes32 bountyId) external view returns (\r\n        address creator,\r\n        string memory metadataURI,\r\n        uint256 reward,\r\n        bool isActive,\r\n        bool isCompleted\r\n    ) {\r\n        Bounty storage b = bounties[bountyId];\r\n        return (b.creator, b.metadataURI, b.reward, b.isActive, b.isCompleted);\r\n    }\r\n\r\n    // ─── Receive MON ─────────────────────────────────────────────────\r\n\r\n    receive() external payable {}\r\n}\r\n"},"contracts/VitalityRegistry.sol":{"content":"// SPDX-License-Identifier: MIT\r\npragma solidity ^0.8.20;\r\n\r\nimport \"@openzeppelin/contracts/access/Ownable.sol\";\r\nimport \"@openzeppelin/contracts/utils/ReentrancyGuard.sol\";\r\nimport \"./interfaces/IVitalityRegistry.sol\";\r\n\r\n/**\r\n * @title VitalityRegistry — On-Chain Agent Metabolism\r\n * @notice Implements the core Vitalis metabolism: Decay, Pulse, Prune, Evolution.\r\n * @dev Spec §1.1 — \"The Hard Logic (Immutable Rules)\"\r\n *\r\n *  Decay:     currentVitality = storedVitality - ((block.number - lastUpdateBlock) / decayRate)\r\n *  Pulse:     +pulseAmount VITA on task completion (Validator/Bounty contract only)\r\n *  Prune:     Agent dies at ≤ 0 vitality — permissionless call\r\n *  Evolution: Strategist adjusts decayRate & pulseAmount\r\n */\r\ncontract VitalityRegistry is IVitalityRegistry, Ownable, ReentrancyGuard {\r\n\r\n    // ─── Agent State ─────────────────────────────────────────────────\r\n\r\n    struct AgentData {\r\n        int256 storedVitality;   // Last checkpointed vitality\r\n        uint256 lastUpdateBlock; // Block at which vitality was last checkpointed\r\n        bool isActive;           // Whether the agent is alive\r\n        bool isRegistered;       // Whether the agent has been registered\r\n    }\r\n\r\n    mapping(address => AgentData) public agents;\r\n\r\n    // ─── Global Metabolic Parameters ─────────────────────────────────\r\n\r\n    uint256 public decayRate = 1000;    // 1 VITA lost per 1000 blocks (~16 min on Monad)\r\n    uint256 public pulseAmount = 50;    // +50 VITA on successful task completion\r\n    uint256 public pruneReward = 1 ether; // Small MON reward for pruning dead agents\r\n\r\n    // ─── Access Control ──────────────────────────────────────────────\r\n\r\n    address public bountyContract;      // Only VitalisBounty can call pulse()\r\n    address public strategist;          // Only strategist can update metabolic params\r\n\r\n    // ─── Events (from interface) ─────────────────────────────────────\r\n    // VitalityPulse(address indexed agent, uint256 newAmount)\r\n    // AgentPruned(address indexed agent)\r\n    // ParametersUpdated(uint256 newDecayRate, uint256 newPulseAmount)\r\n\r\n    // ─── Custom Events ───────────────────────────────────────────────\r\n\r\n    event AgentRegistered(address indexed agent, int256 initialVitality);\r\n\r\n    // ─── Errors ──────────────────────────────────────────────────────\r\n\r\n    error NotAuthorized();\r\n    error AgentNotActive();\r\n    error AgentNotRegistered();\r\n    error AgentAlreadyRegistered();\r\n    error AgentStillAlive();\r\n    error InvalidDecayRate();\r\n\r\n    // ─── Modifiers ───────────────────────────────────────────────────\r\n\r\n    modifier onlyBountyContract() {\r\n        if (msg.sender != bountyContract) revert NotAuthorized();\r\n        _;\r\n    }\r\n\r\n    modifier onlyStrategist() {\r\n        if (msg.sender != strategist) revert NotAuthorized();\r\n        _;\r\n    }\r\n\r\n    // ─── Constructor ─────────────────────────────────────────────────\r\n\r\n    constructor() Ownable(msg.sender) {\r\n        strategist = msg.sender; // Owner is initial strategist\r\n    }\r\n\r\n    // ─── Admin Setup ─────────────────────────────────────────────────\r\n\r\n    /**\r\n     * @notice Set the VitalisBounty contract address (only owner, once).\r\n     */\r\n    function setBountyContract(address _bountyContract) external onlyOwner {\r\n        bountyContract = _bountyContract;\r\n    }\r\n\r\n    /**\r\n     * @notice Set the strategist address.\r\n     */\r\n    function setStrategist(address _strategist) external onlyOwner {\r\n        strategist = _strategist;\r\n    }\r\n\r\n    // ─── Agent Registration ──────────────────────────────────────────\r\n\r\n    /**\r\n     * @notice Register a new agent with initial vitality of 100.\r\n     */\r\n    function registerAgent(address agent) external onlyOwner {\r\n        if (agents[agent].isRegistered) revert AgentAlreadyRegistered();\r\n\r\n        agents[agent] = AgentData({\r\n            storedVitality: 100,\r\n            lastUpdateBlock: block.number,\r\n            isActive: true,\r\n            isRegistered: true\r\n        });\r\n\r\n        emit AgentRegistered(agent, 100);\r\n    }\r\n\r\n    // ─── Core Metabolism: getVitality ────────────────────────────────\r\n\r\n    /**\r\n     * @notice Calculate current vitality with dynamic decay.\r\n     * @dev    Spec §1.1: currentVitality = storedVitality - ((block.number - lastUpdateBlock) / decayRate)\r\n     */\r\n    function getVitality(address agent) external view override returns (int256) {\r\n        AgentData storage data = agents[agent];\r\n        if (!data.isRegistered) return 0;\r\n        if (!data.isActive) return 0;\r\n\r\n        uint256 blocksPassed = block.number - data.lastUpdateBlock;\r\n        int256 decayed = int256(blocksPassed / decayRate);\r\n        int256 currentVitality = data.storedVitality - decayed;\r\n\r\n        return currentVitality;\r\n    }\r\n\r\n    // ─── Core Metabolism: pulse ──────────────────────────────────────\r\n\r\n    /**\r\n     * @notice Award vitality to an agent on task completion.\r\n     * @dev    Only callable by the VitalisBounty contract.\r\n     *         Checkpoints current vitality first, then adds pulseAmount.\r\n     */\r\n    function pulse(address agent) external override onlyBountyContract nonReentrant {\r\n        AgentData storage data = agents[agent];\r\n        if (!data.isRegistered) revert AgentNotRegistered();\r\n        if (!data.isActive) revert AgentNotActive();\r\n\r\n        // Checkpoint: apply pending decay\r\n        _checkpoint(agent);\r\n\r\n        // Add pulse reward\r\n        data.storedVitality += int256(pulseAmount);\r\n        data.lastUpdateBlock = block.number;\r\n\r\n        emit VitalityPulse(agent, uint256(data.storedVitality));\r\n    }\r\n\r\n    // ─── Core Metabolism: prune ──────────────────────────────────────\r\n\r\n    /**\r\n     * @notice Prune a dead agent. Permissionless — anyone can call.\r\n     * @dev    Spec §1.1: If currentVitality <= 0, mark INACTIVE, revoke permissions.\r\n     *         The caller receives a small bounty reward.\r\n     */\r\n    function prune(address agent) external override nonReentrant {\r\n        AgentData storage data = agents[agent];\r\n        if (!data.isRegistered) revert AgentNotRegistered();\r\n        if (!data.isActive) revert AgentNotActive();\r\n\r\n        // Calculate current vitality\r\n        _checkpoint(agent);\r\n\r\n        if (data.storedVitality > 0) revert AgentStillAlive();\r\n\r\n        // Mark as inactive (dead)\r\n        data.isActive = false;\r\n\r\n        // Reward the pruner\r\n        if (address(this).balance >= pruneReward) {\r\n            (bool success, ) = payable(msg.sender).call{value: pruneReward}(\"\");\r\n            require(success, \"Prune reward transfer failed\");\r\n        }\r\n\r\n        emit AgentPruned(agent);\r\n    }\r\n\r\n    // ─── Governance: Evolution ───────────────────────────────────────\r\n\r\n    /**\r\n     * @notice Update global metabolic parameters. Strategist only.\r\n     * @dev    Spec §1.1 Rule 4: decayRate and pulseAmount adjustable.\r\n     */\r\n    function updateMetabolicParams(\r\n        uint256 _decayRate,\r\n        uint256 _pulseAmount\r\n    ) external override onlyStrategist {\r\n        if (_decayRate == 0) revert InvalidDecayRate();\r\n\r\n        decayRate = _decayRate;\r\n        pulseAmount = _pulseAmount;\r\n\r\n        emit ParametersUpdated(_decayRate, _pulseAmount);\r\n    }\r\n\r\n    // ─── Internal Helpers ────────────────────────────────────────────\r\n\r\n    /**\r\n     * @dev Checkpoint: materialize pending decay into storedVitality.\r\n     */\r\n    function _checkpoint(address agent) internal {\r\n        AgentData storage data = agents[agent];\r\n        uint256 blocksPassed = block.number - data.lastUpdateBlock;\r\n        int256 decayed = int256(blocksPassed / decayRate);\r\n        data.storedVitality -= decayed;\r\n        data.lastUpdateBlock = block.number;\r\n    }\r\n\r\n    // ─── Receive MON for Prune Rewards ───────────────────────────────\r\n\r\n    receive() external payable {}\r\n}\r\n"}},"settings":{"optimizer":{"enabled":true,"runs":200},"evmVersion":"paris","outputSelection":{"*":{"*":["abi","evm.bytecode","evm.deployedBytecode","evm.methodIdentifiers","metadata"],"":["ast"]}}}},"output":{"sources":{"@openzeppelin/contracts/access/Ownable.sol":{"ast":{"absolutePath":"@openzeppelin/contracts/access/Ownable.sol","exportedSymbols":{"Context":[177],"Ownable":[147]},"id":148,"license":"MIT","nodeType":"SourceUnit","nodes":[{"id":1,"literals":["solidity","^","0.8",".20"],"nodeType":"PragmaDirective","src":"102:24:0"},{"absolutePath":"@openzeppelin/contracts/utils/Context.sol","file":"../utils/Context.sol","id":3,"nameLocation":"-1:-1:-1","nodeType":"ImportDirective","scope":148,"sourceUnit":178,"src":"128:45:0","symbolAliases":[{"foreign":{"id":2,"name":"Context","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":177,"src":"136:7:0","typeDescriptions":{}},"nameLocation":"-1:-1:-1"}],"unitAlias":""},{"abstract":true,"baseContracts":[{"baseName":{"id":5,"name":"Context","nameLocations":["692:7:0"],"nodeType":"IdentifierPath","referencedDeclaration":177,"src":"692:7:0"},"id":6,"nodeType":"InheritanceSpecifier","src":"692:7:0"}],"canonicalName":"Ownable","contractDependencies":[],"contractKind":"contract","documentation":{"id":4,"nodeType":"StructuredDocumentation","src":"175:487:0","text":" @dev Contract module which provides a basic access control mechanism, where\n there is an account (an owner) that can be granted exclusive access to\n specific functions.\n The initial owner is set to the address provided by the deployer. This can\n later be changed with {transferOwnership}.\n This module is used through inheritance. It will make available the modifier\n `onlyOwner`, which can be applied to your functions to restrict their use to\n the owner."},"fullyImplemented":true,"id":147,"linearizedBaseContracts":[147,177],"name":"Ownable","nameLocation":"681:7:0","nodeType":"ContractDefinition","nodes":[{"constant":false,"id":8,"mutability":"mutable","name":"_owner","nameLocation":"722:6:0","nodeType":"VariableDeclaration","scope":147,"src":"706:22:0","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":7,"name":"address","nodeType":"ElementaryTypeName","src":"706:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"private"},{"documentation":{"id":9,"nodeType":"StructuredDocumentation","src":"735:85:0","text":" @dev The caller account is not authorized to perform an operation."},"errorSelector":"118cdaa7","id":13,"name":"OwnableUnauthorizedAccount","nameLocation":"831:26:0","nodeType":"ErrorDefinition","parameters":{"id":12,"nodeType":"ParameterList","parameters":[{"constant":false,"id":11,"mutability":"mutable","name":"account","nameLocation":"866:7:0","nodeType":"VariableDeclaration","scope":13,"src":"858:15:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":10,"name":"address","nodeType":"ElementaryTypeName","src":"858:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"857:17:0"},"src":"825:50:0"},{"documentation":{"id":14,"nodeType":"StructuredDocumentation","src":"881:82:0","text":" @dev The owner is not a valid owner account. (eg. `address(0)`)"},"errorSelector":"1e4fbdf7","id":18,"name":"OwnableInvalidOwner","nameLocation":"974:19:0","nodeType":"ErrorDefinition","parameters":{"id":17,"nodeType":"ParameterList","parameters":[{"constant":false,"id":16,"mutability":"mutable","name":"owner","nameLocation":"1002:5:0","nodeType":"VariableDeclaration","scope":18,"src":"994:13:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":15,"name":"address","nodeType":"ElementaryTypeName","src":"994:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"993:15:0"},"src":"968:41:0"},{"anonymous":false,"eventSelector":"8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0","id":24,"name":"OwnershipTransferred","nameLocation":"1021:20:0","nodeType":"EventDefinition","parameters":{"id":23,"nodeType":"ParameterList","parameters":[{"constant":false,"id":20,"indexed":true,"mutability":"mutable","name":"previousOwner","nameLocation":"1058:13:0","nodeType":"VariableDeclaration","scope":24,"src":"1042:29:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":19,"name":"address","nodeType":"ElementaryTypeName","src":"1042:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":22,"indexed":true,"mutability":"mutable","name":"newOwner","nameLocation":"1089:8:0","nodeType":"VariableDeclaration","scope":24,"src":"1073:24:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":21,"name":"address","nodeType":"ElementaryTypeName","src":"1073:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"1041:57:0"},"src":"1015:84:0"},{"body":{"id":49,"nodeType":"Block","src":"1259:153:0","statements":[{"condition":{"commonType":{"typeIdentifier":"t_address","typeString":"address"},"id":35,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"id":30,"name":"initialOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":27,"src":"1273:12:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"BinaryOperation","operator":"==","rightExpression":{"arguments":[{"hexValue":"30","id":33,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1297:1:0","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"}],"id":32,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"1289:7:0","typeDescriptions":{"typeIdentifier":"t_type$_t_address_$","typeString":"type(address)"},"typeName":{"id":31,"name":"address","nodeType":"ElementaryTypeName","src":"1289:7:0","typeDescriptions":{}}},"id":34,"isConstant":false,"isLValue":false,"isPure":true,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"1289:10:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"1273:26:0","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":44,"nodeType":"IfStatement","src":"1269:95:0","trueBody":{"id":43,"nodeType":"Block","src":"1301:63:0","statements":[{"errorCall":{"arguments":[{"arguments":[{"hexValue":"30","id":39,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1350:1:0","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"}],"id":38,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"1342:7:0","typeDescriptions":{"typeIdentifier":"t_type$_t_address_$","typeString":"type(address)"},"typeName":{"id":37,"name":"address","nodeType":"ElementaryTypeName","src":"1342:7:0","typeDescriptions":{}}},"id":40,"isConstant":false,"isLValue":false,"isPure":true,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"1342:10:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":36,"name":"OwnableInvalidOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":18,"src":"1322:19:0","typeDescriptions":{"typeIdentifier":"t_function_error_pure$_t_address_$returns$__$","typeString":"function (address) pure"}},"id":41,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"1322:31:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":42,"nodeType":"RevertStatement","src":"1315:38:0"}]}},{"expression":{"arguments":[{"id":46,"name":"initialOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":27,"src":"1392:12:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":45,"name":"_transferOwnership","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":146,"src":"1373:18:0","typeDescriptions":{"typeIdentifier":"t_function_internal_nonpayable$_t_address_$returns$__$","typeString":"function (address)"}},"id":47,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"1373:32:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":48,"nodeType":"ExpressionStatement","src":"1373:32:0"}]},"documentation":{"id":25,"nodeType":"StructuredDocumentation","src":"1105:115:0","text":" @dev Initializes the contract setting the address provided by the deployer as the initial owner."},"id":50,"implemented":true,"kind":"constructor","modifiers":[],"name":"","nameLocation":"-1:-1:-1","nodeType":"FunctionDefinition","parameters":{"id":28,"nodeType":"ParameterList","parameters":[{"constant":false,"id":27,"mutability":"mutable","name":"initialOwner","nameLocation":"1245:12:0","nodeType":"VariableDeclaration","scope":50,"src":"1237:20:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":26,"name":"address","nodeType":"ElementaryTypeName","src":"1237:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"1236:22:0"},"returnParameters":{"id":29,"nodeType":"ParameterList","parameters":[],"src":"1259:0:0"},"scope":147,"src":"1225:187:0","stateMutability":"nonpayable","virtual":false,"visibility":"internal"},{"body":{"id":57,"nodeType":"Block","src":"1521:41:0","statements":[{"expression":{"arguments":[],"expression":{"argumentTypes":[],"id":53,"name":"_checkOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":84,"src":"1531:11:0","typeDescriptions":{"typeIdentifier":"t_function_internal_view$__$returns$__$","typeString":"function () view"}},"id":54,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"1531:13:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":55,"nodeType":"ExpressionStatement","src":"1531:13:0"},{"id":56,"nodeType":"PlaceholderStatement","src":"1554:1:0"}]},"documentation":{"id":51,"nodeType":"StructuredDocumentation","src":"1418:77:0","text":" @dev Throws if called by any account other than the owner."},"id":58,"name":"onlyOwner","nameLocation":"1509:9:0","nodeType":"ModifierDefinition","parameters":{"id":52,"nodeType":"ParameterList","parameters":[],"src":"1518:2:0"},"src":"1500:62:0","virtual":false,"visibility":"internal"},{"body":{"id":66,"nodeType":"Block","src":"1693:30:0","statements":[{"expression":{"id":64,"name":"_owner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":8,"src":"1710:6:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"functionReturnParameters":63,"id":65,"nodeType":"Return","src":"1703:13:0"}]},"documentation":{"id":59,"nodeType":"StructuredDocumentation","src":"1568:65:0","text":" @dev Returns the address of the current owner."},"functionSelector":"8da5cb5b","id":67,"implemented":true,"kind":"function","modifiers":[],"name":"owner","nameLocation":"1647:5:0","nodeType":"FunctionDefinition","parameters":{"id":60,"nodeType":"ParameterList","parameters":[],"src":"1652:2:0"},"returnParameters":{"id":63,"nodeType":"ParameterList","parameters":[{"constant":false,"id":62,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":67,"src":"1684:7:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":61,"name":"address","nodeType":"ElementaryTypeName","src":"1684:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"1683:9:0"},"scope":147,"src":"1638:85:0","stateMutability":"view","virtual":true,"visibility":"public"},{"body":{"id":83,"nodeType":"Block","src":"1841:117:0","statements":[{"condition":{"commonType":{"typeIdentifier":"t_address","typeString":"address"},"id":75,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"arguments":[],"expression":{"argumentTypes":[],"id":71,"name":"owner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":67,"src":"1855:5:0","typeDescriptions":{"typeIdentifier":"t_function_internal_view$__$returns$_t_address_$","typeString":"function () view returns (address)"}},"id":72,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"1855:7:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"BinaryOperation","operator":"!=","rightExpression":{"arguments":[],"expression":{"argumentTypes":[],"id":73,"name":"_msgSender","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":159,"src":"1866:10:0","typeDescriptions":{"typeIdentifier":"t_function_internal_view$__$returns$_t_address_$","typeString":"function () view returns (address)"}},"id":74,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"1866:12:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"1855:23:0","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":82,"nodeType":"IfStatement","src":"1851:101:0","trueBody":{"id":81,"nodeType":"Block","src":"1880:72:0","statements":[{"errorCall":{"arguments":[{"arguments":[],"expression":{"argumentTypes":[],"id":77,"name":"_msgSender","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":159,"src":"1928:10:0","typeDescriptions":{"typeIdentifier":"t_function_internal_view$__$returns$_t_address_$","typeString":"function () view returns (address)"}},"id":78,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"1928:12:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":76,"name":"OwnableUnauthorizedAccount","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":13,"src":"1901:26:0","typeDescriptions":{"typeIdentifier":"t_function_error_pure$_t_address_$returns$__$","typeString":"function (address) pure"}},"id":79,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"1901:40:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":80,"nodeType":"RevertStatement","src":"1894:47:0"}]}}]},"documentation":{"id":68,"nodeType":"StructuredDocumentation","src":"1729:62:0","text":" @dev Throws if the sender is not the owner."},"id":84,"implemented":true,"kind":"function","modifiers":[],"name":"_checkOwner","nameLocation":"1805:11:0","nodeType":"FunctionDefinition","parameters":{"id":69,"nodeType":"ParameterList","parameters":[],"src":"1816:2:0"},"returnParameters":{"id":70,"nodeType":"ParameterList","parameters":[],"src":"1841:0:0"},"scope":147,"src":"1796:162:0","stateMutability":"view","virtual":true,"visibility":"internal"},{"body":{"id":97,"nodeType":"Block","src":"2347:47:0","statements":[{"expression":{"arguments":[{"arguments":[{"hexValue":"30","id":93,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"2384:1:0","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"}],"id":92,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"2376:7:0","typeDescriptions":{"typeIdentifier":"t_type$_t_address_$","typeString":"type(address)"},"typeName":{"id":91,"name":"address","nodeType":"ElementaryTypeName","src":"2376:7:0","typeDescriptions":{}}},"id":94,"isConstant":false,"isLValue":false,"isPure":true,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2376:10:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":90,"name":"_transferOwnership","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":146,"src":"2357:18:0","typeDescriptions":{"typeIdentifier":"t_function_internal_nonpayable$_t_address_$returns$__$","typeString":"function (address)"}},"id":95,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2357:30:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":96,"nodeType":"ExpressionStatement","src":"2357:30:0"}]},"documentation":{"id":85,"nodeType":"StructuredDocumentation","src":"1964:324:0","text":" @dev Leaves the contract without owner. It will not be possible to call\n `onlyOwner` functions. Can only be called by the current owner.\n NOTE: Renouncing ownership will leave the contract without an owner,\n thereby disabling any functionality that is only available to the owner."},"functionSelector":"715018a6","id":98,"implemented":true,"kind":"function","modifiers":[{"id":88,"kind":"modifierInvocation","modifierName":{"id":87,"name":"onlyOwner","nameLocations":["2337:9:0"],"nodeType":"IdentifierPath","referencedDeclaration":58,"src":"2337:9:0"},"nodeType":"ModifierInvocation","src":"2337:9:0"}],"name":"renounceOwnership","nameLocation":"2302:17:0","nodeType":"FunctionDefinition","parameters":{"id":86,"nodeType":"ParameterList","parameters":[],"src":"2319:2:0"},"returnParameters":{"id":89,"nodeType":"ParameterList","parameters":[],"src":"2347:0:0"},"scope":147,"src":"2293:101:0","stateMutability":"nonpayable","virtual":true,"visibility":"public"},{"body":{"id":125,"nodeType":"Block","src":"2613:145:0","statements":[{"condition":{"commonType":{"typeIdentifier":"t_address","typeString":"address"},"id":111,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"id":106,"name":"newOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":101,"src":"2627:8:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"BinaryOperation","operator":"==","rightExpression":{"arguments":[{"hexValue":"30","id":109,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"2647:1:0","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"}],"id":108,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"2639:7:0","typeDescriptions":{"typeIdentifier":"t_type$_t_address_$","typeString":"type(address)"},"typeName":{"id":107,"name":"address","nodeType":"ElementaryTypeName","src":"2639:7:0","typeDescriptions":{}}},"id":110,"isConstant":false,"isLValue":false,"isPure":true,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2639:10:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"2627:22:0","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":120,"nodeType":"IfStatement","src":"2623:91:0","trueBody":{"id":119,"nodeType":"Block","src":"2651:63:0","statements":[{"errorCall":{"arguments":[{"arguments":[{"hexValue":"30","id":115,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"2700:1:0","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"}],"id":114,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"2692:7:0","typeDescriptions":{"typeIdentifier":"t_type$_t_address_$","typeString":"type(address)"},"typeName":{"id":113,"name":"address","nodeType":"ElementaryTypeName","src":"2692:7:0","typeDescriptions":{}}},"id":116,"isConstant":false,"isLValue":false,"isPure":true,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2692:10:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":112,"name":"OwnableInvalidOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":18,"src":"2672:19:0","typeDescriptions":{"typeIdentifier":"t_function_error_pure$_t_address_$returns$__$","typeString":"function (address) pure"}},"id":117,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2672:31:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":118,"nodeType":"RevertStatement","src":"2665:38:0"}]}},{"expression":{"arguments":[{"id":122,"name":"newOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":101,"src":"2742:8:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":121,"name":"_transferOwnership","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":146,"src":"2723:18:0","typeDescriptions":{"typeIdentifier":"t_function_internal_nonpayable$_t_address_$returns$__$","typeString":"function (address)"}},"id":123,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2723:28:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":124,"nodeType":"ExpressionStatement","src":"2723:28:0"}]},"documentation":{"id":99,"nodeType":"StructuredDocumentation","src":"2400:138:0","text":" @dev Transfers ownership of the contract to a new account (`newOwner`).\n Can only be called by the current owner."},"functionSelector":"f2fde38b","id":126,"implemented":true,"kind":"function","modifiers":[{"id":104,"kind":"modifierInvocation","modifierName":{"id":103,"name":"onlyOwner","nameLocations":["2603:9:0"],"nodeType":"IdentifierPath","referencedDeclaration":58,"src":"2603:9:0"},"nodeType":"ModifierInvocation","src":"2603:9:0"}],"name":"transferOwnership","nameLocation":"2552:17:0","nodeType":"FunctionDefinition","parameters":{"id":102,"nodeType":"ParameterList","parameters":[{"constant":false,"id":101,"mutability":"mutable","name":"newOwner","nameLocation":"2578:8:0","nodeType":"VariableDeclaration","scope":126,"src":"2570:16:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":100,"name":"address","nodeType":"ElementaryTypeName","src":"2570:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"2569:18:0"},"returnParameters":{"id":105,"nodeType":"ParameterList","parameters":[],"src":"2613:0:0"},"scope":147,"src":"2543:215:0","stateMutability":"nonpayable","virtual":true,"visibility":"public"},{"body":{"id":145,"nodeType":"Block","src":"2975:124:0","statements":[{"assignments":[133],"declarations":[{"constant":false,"id":133,"mutability":"mutable","name":"oldOwner","nameLocation":"2993:8:0","nodeType":"VariableDeclaration","scope":145,"src":"2985:16:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":132,"name":"address","nodeType":"ElementaryTypeName","src":"2985:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"id":135,"initialValue":{"id":134,"name":"_owner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":8,"src":"3004:6:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"VariableDeclarationStatement","src":"2985:25:0"},{"expression":{"id":138,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":136,"name":"_owner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":8,"src":"3020:6:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"id":137,"name":"newOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":129,"src":"3029:8:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"3020:17:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"id":139,"nodeType":"ExpressionStatement","src":"3020:17:0"},{"eventCall":{"arguments":[{"id":141,"name":"oldOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":133,"src":"3073:8:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},{"id":142,"name":"newOwner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":129,"src":"3083:8:0","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"},{"typeIdentifier":"t_address","typeString":"address"}],"id":140,"name":"OwnershipTransferred","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":24,"src":"3052:20:0","typeDescriptions":{"typeIdentifier":"t_function_event_nonpayable$_t_address_$_t_address_$returns$__$","typeString":"function (address,address)"}},"id":143,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"3052:40:0","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":144,"nodeType":"EmitStatement","src":"3047:45:0"}]},"documentation":{"id":127,"nodeType":"StructuredDocumentation","src":"2764:143:0","text":" @dev Transfers ownership of the contract to a new account (`newOwner`).\n Internal function without access restriction."},"id":146,"implemented":true,"kind":"function","modifiers":[],"name":"_transferOwnership","nameLocation":"2921:18:0","nodeType":"FunctionDefinition","parameters":{"id":130,"nodeType":"ParameterList","parameters":[{"constant":false,"id":129,"mutability":"mutable","name":"newOwner","nameLocation":"2948:8:0","nodeType":"VariableDeclaration","scope":146,"src":"2940:16:0","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":128,"name":"address","nodeType":"ElementaryTypeName","src":"2940:7:0","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"2939:18:0"},"returnParameters":{"id":131,"nodeType":"ParameterList","parameters":[],"src":"2975:0:0"},"scope":147,"src":"2912:187:0","stateMutability":"nonpayable","virtual":true,"visibility":"internal"}],"scope":148,"src":"663:2438:0","usedErrors":[13,18],"usedEvents":[24]}],"src":"102:3000:0"},"id":0},"@openzeppelin/contracts/utils/Context.sol":{"ast":{"absolutePath":"@openzeppelin/contracts/utils/Context.sol","exportedSymbols":{"Context":[177]},"id":178,"license":"MIT","nodeType":"SourceUnit","nodes":[{"id":149,"literals":["solidity","^","0.8",".20"],"nodeType":"PragmaDirective","src":"101:24:1"},{"abstract":true,"baseContracts":[],"canonicalName":"Context","contractDependencies":[],"contractKind":"contract","documentation":{"id":150,"nodeType":"StructuredDocumentation","src":"127:496:1","text":" @dev Provides information about the current execution context, including the\n sender of the transaction and its data. While these are generally available\n via msg.sender and msg.data, they should not be accessed in such a direct\n manner, since when dealing with meta-transactions the account sending and\n paying for execution may not be the actual sender (as far as an application\n is concerned).\n This contract is only required for intermediate, library-like contracts."},"fullyImplemented":true,"id":177,"linearizedBaseContracts":[177],"name":"Context","nameLocation":"642:7:1","nodeType":"ContractDefinition","nodes":[{"body":{"id":158,"nodeType":"Block","src":"718:34:1","statements":[{"expression":{"expression":{"id":155,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"735:3:1","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":156,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"739:6:1","memberName":"sender","nodeType":"MemberAccess","src":"735:10:1","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"functionReturnParameters":154,"id":157,"nodeType":"Return","src":"728:17:1"}]},"id":159,"implemented":true,"kind":"function","modifiers":[],"name":"_msgSender","nameLocation":"665:10:1","nodeType":"FunctionDefinition","parameters":{"id":151,"nodeType":"ParameterList","parameters":[],"src":"675:2:1"},"returnParameters":{"id":154,"nodeType":"ParameterList","parameters":[{"constant":false,"id":153,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":159,"src":"709:7:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":152,"name":"address","nodeType":"ElementaryTypeName","src":"709:7:1","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"708:9:1"},"scope":177,"src":"656:96:1","stateMutability":"view","virtual":true,"visibility":"internal"},{"body":{"id":167,"nodeType":"Block","src":"825:32:1","statements":[{"expression":{"expression":{"id":164,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"842:3:1","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":165,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"846:4:1","memberName":"data","nodeType":"MemberAccess","src":"842:8:1","typeDescriptions":{"typeIdentifier":"t_bytes_calldata_ptr","typeString":"bytes calldata"}},"functionReturnParameters":163,"id":166,"nodeType":"Return","src":"835:15:1"}]},"id":168,"implemented":true,"kind":"function","modifiers":[],"name":"_msgData","nameLocation":"767:8:1","nodeType":"FunctionDefinition","parameters":{"id":160,"nodeType":"ParameterList","parameters":[],"src":"775:2:1"},"returnParameters":{"id":163,"nodeType":"ParameterList","parameters":[{"constant":false,"id":162,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":168,"src":"809:14:1","stateVariable":false,"storageLocation":"calldata","typeDescriptions":{"typeIdentifier":"t_bytes_calldata_ptr","typeString":"bytes"},"typeName":{"id":161,"name":"bytes","nodeType":"ElementaryTypeName","src":"809:5:1","typeDescriptions":{"typeIdentifier":"t_bytes_storage_ptr","typeString":"bytes"}},"visibility":"internal"}],"src":"808:16:1"},"scope":177,"src":"758:99:1","stateMutability":"view","virtual":true,"visibility":"internal"},{"body":{"id":175,"nodeType":"Block","src":"935:25:1","statements":[{"expression":{"hexValue":"30","id":173,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"952:1:1","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"functionReturnParameters":172,"id":174,"nodeType":"Return","src":"945:8:1"}]},"id":176,"implemented":true,"kind":"function","modifiers":[],"name":"_contextSuffixLength","nameLocation":"872:20:1","nodeType":"FunctionDefinition","parameters":{"id":169,"nodeType":"ParameterList","parameters":[],"src":"892:2:1"},"returnParameters":{"id":172,"nodeType":"ParameterList","parameters":[{"constant":false,"id":171,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":176,"src":"926:7:1","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":170,"name":"uint256","nodeType":"ElementaryTypeName","src":"926:7:1","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"925:9:1"},"scope":177,"src":"863:97:1","stateMutability":"view","virtual":true,"visibility":"internal"}],"scope":178,"src":"624:338:1","usedErrors":[],"usedEvents":[]}],"src":"101:862:1"},"id":1},"@openzeppelin/contracts/utils/ReentrancyGuard.sol":{"ast":{"absolutePath":"@openzeppelin/contracts/utils/ReentrancyGuard.sol","exportedSymbols":{"ReentrancyGuard":[246]},"id":247,"license":"MIT","nodeType":"SourceUnit","nodes":[{"id":179,"literals":["solidity","^","0.8",".20"],"nodeType":"PragmaDirective","src":"109:24:2"},{"abstract":true,"baseContracts":[],"canonicalName":"ReentrancyGuard","contractDependencies":[],"contractKind":"contract","documentation":{"id":180,"nodeType":"StructuredDocumentation","src":"135:894:2","text":" @dev Contract module that helps prevent reentrant calls to a function.\n Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier\n available, which can be applied to functions to make sure there are no nested\n (reentrant) calls to them.\n Note that because there is a single `nonReentrant` guard, functions marked as\n `nonReentrant` may not call one another. This can be worked around by making\n those functions `private`, and then adding `external` `nonReentrant` entry\n points to them.\n TIP: If EIP-1153 (transient storage) is available on the chain you're deploying at,\n consider using {ReentrancyGuardTransient} instead.\n TIP: If you would like to learn more about reentrancy and alternative ways\n to protect against it, check out our blog post\n https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul]."},"fullyImplemented":true,"id":246,"linearizedBaseContracts":[246],"name":"ReentrancyGuard","nameLocation":"1048:15:2","nodeType":"ContractDefinition","nodes":[{"constant":true,"id":183,"mutability":"constant","name":"NOT_ENTERED","nameLocation":"1843:11:2","nodeType":"VariableDeclaration","scope":246,"src":"1818:40:2","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":181,"name":"uint256","nodeType":"ElementaryTypeName","src":"1818:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":{"hexValue":"31","id":182,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1857:1:2","typeDescriptions":{"typeIdentifier":"t_rational_1_by_1","typeString":"int_const 1"},"value":"1"},"visibility":"private"},{"constant":true,"id":186,"mutability":"constant","name":"ENTERED","nameLocation":"1889:7:2","nodeType":"VariableDeclaration","scope":246,"src":"1864:36:2","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":184,"name":"uint256","nodeType":"ElementaryTypeName","src":"1864:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":{"hexValue":"32","id":185,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1899:1:2","typeDescriptions":{"typeIdentifier":"t_rational_2_by_1","typeString":"int_const 2"},"value":"2"},"visibility":"private"},{"constant":false,"id":188,"mutability":"mutable","name":"_status","nameLocation":"1923:7:2","nodeType":"VariableDeclaration","scope":246,"src":"1907:23:2","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":187,"name":"uint256","nodeType":"ElementaryTypeName","src":"1907:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"private"},{"documentation":{"id":189,"nodeType":"StructuredDocumentation","src":"1937:52:2","text":" @dev Unauthorized reentrant call."},"errorSelector":"3ee5aeb5","id":191,"name":"ReentrancyGuardReentrantCall","nameLocation":"2000:28:2","nodeType":"ErrorDefinition","parameters":{"id":190,"nodeType":"ParameterList","parameters":[],"src":"2028:2:2"},"src":"1994:37:2"},{"body":{"id":198,"nodeType":"Block","src":"2051:38:2","statements":[{"expression":{"id":196,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":194,"name":"_status","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":188,"src":"2061:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"id":195,"name":"NOT_ENTERED","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":183,"src":"2071:11:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"2061:21:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":197,"nodeType":"ExpressionStatement","src":"2061:21:2"}]},"id":199,"implemented":true,"kind":"constructor","modifiers":[],"name":"","nameLocation":"-1:-1:-1","nodeType":"FunctionDefinition","parameters":{"id":192,"nodeType":"ParameterList","parameters":[],"src":"2048:2:2"},"returnParameters":{"id":193,"nodeType":"ParameterList","parameters":[],"src":"2051:0:2"},"scope":246,"src":"2037:52:2","stateMutability":"nonpayable","virtual":false,"visibility":"internal"},{"body":{"id":209,"nodeType":"Block","src":"2490:79:2","statements":[{"expression":{"arguments":[],"expression":{"argumentTypes":[],"id":202,"name":"_nonReentrantBefore","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":226,"src":"2500:19:2","typeDescriptions":{"typeIdentifier":"t_function_internal_nonpayable$__$returns$__$","typeString":"function ()"}},"id":203,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2500:21:2","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":204,"nodeType":"ExpressionStatement","src":"2500:21:2"},{"id":205,"nodeType":"PlaceholderStatement","src":"2531:1:2"},{"expression":{"arguments":[],"expression":{"argumentTypes":[],"id":206,"name":"_nonReentrantAfter","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":234,"src":"2542:18:2","typeDescriptions":{"typeIdentifier":"t_function_internal_nonpayable$__$returns$__$","typeString":"function ()"}},"id":207,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2542:20:2","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":208,"nodeType":"ExpressionStatement","src":"2542:20:2"}]},"documentation":{"id":200,"nodeType":"StructuredDocumentation","src":"2095:366:2","text":" @dev Prevents a contract from calling itself, directly or indirectly.\n Calling a `nonReentrant` function from another `nonReentrant`\n function is not supported. It is possible to prevent this from happening\n by making the `nonReentrant` function external, and making it call a\n `private` function that does the actual work."},"id":210,"name":"nonReentrant","nameLocation":"2475:12:2","nodeType":"ModifierDefinition","parameters":{"id":201,"nodeType":"ParameterList","parameters":[],"src":"2487:2:2"},"src":"2466:103:2","virtual":false,"visibility":"internal"},{"body":{"id":225,"nodeType":"Block","src":"2614:268:2","statements":[{"condition":{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":215,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"id":213,"name":"_status","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":188,"src":"2702:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"==","rightExpression":{"id":214,"name":"ENTERED","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":186,"src":"2713:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"2702:18:2","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":220,"nodeType":"IfStatement","src":"2698:86:2","trueBody":{"id":219,"nodeType":"Block","src":"2722:62:2","statements":[{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":216,"name":"ReentrancyGuardReentrantCall","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":191,"src":"2743:28:2","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":217,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2743:30:2","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":218,"nodeType":"RevertStatement","src":"2736:37:2"}]}},{"expression":{"id":223,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":221,"name":"_status","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":188,"src":"2858:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"id":222,"name":"ENTERED","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":186,"src":"2868:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"2858:17:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":224,"nodeType":"ExpressionStatement","src":"2858:17:2"}]},"id":226,"implemented":true,"kind":"function","modifiers":[],"name":"_nonReentrantBefore","nameLocation":"2584:19:2","nodeType":"FunctionDefinition","parameters":{"id":211,"nodeType":"ParameterList","parameters":[],"src":"2603:2:2"},"returnParameters":{"id":212,"nodeType":"ParameterList","parameters":[],"src":"2614:0:2"},"scope":246,"src":"2575:307:2","stateMutability":"nonpayable","virtual":false,"visibility":"private"},{"body":{"id":233,"nodeType":"Block","src":"2926:170:2","statements":[{"expression":{"id":231,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":229,"name":"_status","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":188,"src":"3068:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"id":230,"name":"NOT_ENTERED","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":183,"src":"3078:11:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"3068:21:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":232,"nodeType":"ExpressionStatement","src":"3068:21:2"}]},"id":234,"implemented":true,"kind":"function","modifiers":[],"name":"_nonReentrantAfter","nameLocation":"2897:18:2","nodeType":"FunctionDefinition","parameters":{"id":227,"nodeType":"ParameterList","parameters":[],"src":"2915:2:2"},"returnParameters":{"id":228,"nodeType":"ParameterList","parameters":[],"src":"2926:0:2"},"scope":246,"src":"2888:208:2","stateMutability":"nonpayable","virtual":false,"visibility":"private"},{"body":{"id":244,"nodeType":"Block","src":"3339:42:2","statements":[{"expression":{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":242,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"id":240,"name":"_status","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":188,"src":"3356:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"==","rightExpression":{"id":241,"name":"ENTERED","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":186,"src":"3367:7:2","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"3356:18:2","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"functionReturnParameters":239,"id":243,"nodeType":"Return","src":"3349:25:2"}]},"documentation":{"id":235,"nodeType":"StructuredDocumentation","src":"3102:168:2","text":" @dev Returns true if the reentrancy guard is currently set to \"entered\", which indicates there is a\n `nonReentrant` function in the call stack."},"id":245,"implemented":true,"kind":"function","modifiers":[],"name":"_reentrancyGuardEntered","nameLocation":"3284:23:2","nodeType":"FunctionDefinition","parameters":{"id":236,"nodeType":"ParameterList","parameters":[],"src":"3307:2:2"},"returnParameters":{"id":239,"nodeType":"ParameterList","parameters":[{"constant":false,"id":238,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":245,"src":"3333:4:2","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":237,"name":"bool","nodeType":"ElementaryTypeName","src":"3333:4:2","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"}],"src":"3332:6:2"},"scope":246,"src":"3275:106:2","stateMutability":"view","virtual":false,"visibility":"internal"}],"scope":247,"src":"1030:2353:2","usedErrors":[191],"usedEvents":[]}],"src":"109:3275:2"},"id":2},"contracts/VitalisBounty.sol":{"ast":{"absolutePath":"contracts/VitalisBounty.sol","exportedSymbols":{"Context":[177],"IVitalisBounty":[1014],"IVitalityRegistry":[1058],"Ownable":[147],"ReentrancyGuard":[246],"VitalisBounty":[552]},"id":553,"license":"MIT","nodeType":"SourceUnit","nodes":[{"id":248,"literals":["solidity","^","0.8",".20"],"nodeType":"PragmaDirective","src":"33:24:3"},{"absolutePath":"@openzeppelin/contracts/access/Ownable.sol","file":"@openzeppelin/contracts/access/Ownable.sol","id":249,"nameLocation":"-1:-1:-1","nodeType":"ImportDirective","scope":553,"sourceUnit":148,"src":"61:52:3","symbolAliases":[],"unitAlias":""},{"absolutePath":"@openzeppelin/contracts/utils/ReentrancyGuard.sol","file":"@openzeppelin/contracts/utils/ReentrancyGuard.sol","id":250,"nameLocation":"-1:-1:-1","nodeType":"ImportDirective","scope":553,"sourceUnit":247,"src":"115:59:3","symbolAliases":[],"unitAlias":""},{"absolutePath":"contracts/interfaces/IVitalisBounty.sol","file":"./interfaces/IVitalisBounty.sol","id":251,"nameLocation":"-1:-1:-1","nodeType":"ImportDirective","scope":553,"sourceUnit":1015,"src":"176:41:3","symbolAliases":[],"unitAlias":""},{"absolutePath":"contracts/interfaces/IVitalityRegistry.sol","file":"./interfaces/IVitalityRegistry.sol","id":252,"nameLocation":"-1:-1:-1","nodeType":"ImportDirective","scope":553,"sourceUnit":1059,"src":"219:44:3","symbolAliases":[],"unitAlias":""},{"abstract":false,"baseContracts":[{"baseName":{"id":254,"name":"IVitalisBounty","nameLocations":["642:14:3"],"nodeType":"IdentifierPath","referencedDeclaration":1014,"src":"642:14:3"},"id":255,"nodeType":"InheritanceSpecifier","src":"642:14:3"},{"baseName":{"id":256,"name":"Ownable","nameLocations":["658:7:3"],"nodeType":"IdentifierPath","referencedDeclaration":147,"src":"658:7:3"},"id":257,"nodeType":"InheritanceSpecifier","src":"658:7:3"},{"baseName":{"id":258,"name":"ReentrancyGuard","nameLocations":["667:15:3"],"nodeType":"IdentifierPath","referencedDeclaration":246,"src":"667:15:3"},"id":259,"nodeType":"InheritanceSpecifier","src":"667:15:3"}],"canonicalName":"VitalisBounty","contractDependencies":[],"contractKind":"contract","documentation":{"id":253,"nodeType":"StructuredDocumentation","src":"267:347:3","text":" @title VitalisBounty — On-Chain Task & Reward System\n @notice Manages the bounty lifecycle: create → submit → approve → pulse.\n @dev Spec §3.B\n  createBounty:      Payable — locks MON reward, generates unique bountyId.\n  approveSubmission: Pays worker, then calls Registry.pulse(worker) to restore vitality."},"fullyImplemented":true,"id":552,"linearizedBaseContracts":[552,246,147,177,1014],"name":"VitalisBounty","nameLocation":"625:13:3","nodeType":"ContractDefinition","nodes":[{"constant":false,"functionSelector":"7b103999","id":262,"mutability":"mutable","name":"registry","nameLocation":"887:8:3","nodeType":"VariableDeclaration","scope":552,"src":"862:33:3","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_contract$_IVitalityRegistry_$1058","typeString":"contract IVitalityRegistry"},"typeName":{"id":261,"nodeType":"UserDefinedTypeName","pathNode":{"id":260,"name":"IVitalityRegistry","nameLocations":["862:17:3"],"nodeType":"IdentifierPath","referencedDeclaration":1058,"src":"862:17:3"},"referencedDeclaration":1058,"src":"862:17:3","typeDescriptions":{"typeIdentifier":"t_contract$_IVitalityRegistry_$1058","typeString":"contract IVitalityRegistry"}},"visibility":"public"},{"canonicalName":"VitalisBounty.Bounty","id":273,"members":[{"constant":false,"id":264,"mutability":"mutable","name":"creator","nameLocation":"1115:7:3","nodeType":"VariableDeclaration","scope":273,"src":"1107:15:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":263,"name":"address","nodeType":"ElementaryTypeName","src":"1107:7:3","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":266,"mutability":"mutable","name":"metadataURI","nameLocation":"1140:11:3","nodeType":"VariableDeclaration","scope":273,"src":"1133:18:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"},"typeName":{"id":265,"name":"string","nodeType":"ElementaryTypeName","src":"1133:6:3","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"visibility":"internal"},{"constant":false,"id":268,"mutability":"mutable","name":"reward","nameLocation":"1170:6:3","nodeType":"VariableDeclaration","scope":273,"src":"1162:14:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":267,"name":"uint256","nodeType":"ElementaryTypeName","src":"1162:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"},{"constant":false,"id":270,"mutability":"mutable","name":"isActive","nameLocation":"1192:8:3","nodeType":"VariableDeclaration","scope":273,"src":"1187:13:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":269,"name":"bool","nodeType":"ElementaryTypeName","src":"1187:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"},{"constant":false,"id":272,"mutability":"mutable","name":"isCompleted","nameLocation":"1216:11:3","nodeType":"VariableDeclaration","scope":273,"src":"1211:16:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":271,"name":"bool","nodeType":"ElementaryTypeName","src":"1211:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"}],"name":"Bounty","nameLocation":"1089:6:3","nodeType":"StructDefinition","scope":552,"src":"1082:153:3","visibility":"public"},{"constant":false,"functionSelector":"bf5522da","id":278,"mutability":"mutable","name":"bounties","nameLocation":"1277:8:3","nodeType":"VariableDeclaration","scope":552,"src":"1243:42:3","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_mapping$_t_bytes32_$_t_struct$_Bounty_$273_storage_$","typeString":"mapping(bytes32 => struct VitalisBounty.Bounty)"},"typeName":{"id":277,"keyName":"","keyNameLocation":"-1:-1:-1","keyType":{"id":274,"name":"bytes32","nodeType":"ElementaryTypeName","src":"1251:7:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"nodeType":"Mapping","src":"1243:26:3","typeDescriptions":{"typeIdentifier":"t_mapping$_t_bytes32_$_t_struct$_Bounty_$273_storage_$","typeString":"mapping(bytes32 => struct VitalisBounty.Bounty)"},"valueName":"","valueNameLocation":"-1:-1:-1","valueType":{"id":276,"nodeType":"UserDefinedTypeName","pathNode":{"id":275,"name":"Bounty","nameLocations":["1262:6:3"],"nodeType":"IdentifierPath","referencedDeclaration":273,"src":"1262:6:3"},"referencedDeclaration":273,"src":"1262:6:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty"}}},"visibility":"public"},{"constant":false,"functionSelector":"3e362c96","id":280,"mutability":"mutable","name":"bountyCount","nameLocation":"1307:11:3","nodeType":"VariableDeclaration","scope":552,"src":"1292:26:3","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":279,"name":"uint256","nodeType":"ElementaryTypeName","src":"1292:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"public"},{"constant":false,"functionSelector":"0a144391","id":284,"mutability":"mutable","name":"approvers","nameLocation":"1533:9:3","nodeType":"VariableDeclaration","scope":552,"src":"1501:41:3","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_bool_$","typeString":"mapping(address => bool)"},"typeName":{"id":283,"keyName":"","keyNameLocation":"-1:-1:-1","keyType":{"id":281,"name":"address","nodeType":"ElementaryTypeName","src":"1509:7:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"Mapping","src":"1501:24:3","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_bool_$","typeString":"mapping(address => bool)"},"valueName":"","valueNameLocation":"-1:-1:-1","valueType":{"id":282,"name":"bool","nodeType":"ElementaryTypeName","src":"1520:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}}},"visibility":"public"},{"errorSelector":"93395f9c","id":286,"name":"BountyNotFound","nameLocation":"2088:14:3","nodeType":"ErrorDefinition","parameters":{"id":285,"nodeType":"ParameterList","parameters":[],"src":"2102:2:3"},"src":"2082:23:3"},{"errorSelector":"89b4cbec","id":288,"name":"BountyNotActive","nameLocation":"2117:15:3","nodeType":"ErrorDefinition","parameters":{"id":287,"nodeType":"ParameterList","parameters":[],"src":"2132:2:3"},"src":"2111:24:3"},{"errorSelector":"4c305cbe","id":290,"name":"BountyAlreadyCompleted","nameLocation":"2147:22:3","nodeType":"ErrorDefinition","parameters":{"id":289,"nodeType":"ParameterList","parameters":[],"src":"2169:2:3"},"src":"2141:31:3"},{"errorSelector":"d77b6db6","id":292,"name":"InsufficientReward","nameLocation":"2184:18:3","nodeType":"ErrorDefinition","parameters":{"id":291,"nodeType":"ParameterList","parameters":[],"src":"2202:2:3"},"src":"2178:27:3"},{"errorSelector":"65f84cc0","id":294,"name":"NotApprover","nameLocation":"2217:11:3","nodeType":"ErrorDefinition","parameters":{"id":293,"nodeType":"ParameterList","parameters":[],"src":"2228:2:3"},"src":"2211:20:3"},{"errorSelector":"90b8ec18","id":296,"name":"TransferFailed","nameLocation":"2243:14:3","nodeType":"ErrorDefinition","parameters":{"id":295,"nodeType":"ParameterList","parameters":[],"src":"2257:2:3"},"src":"2237:23:3"},{"body":{"id":314,"nodeType":"Block","src":"2476:104:3","statements":[{"condition":{"commonType":{"typeIdentifier":"t_bool","typeString":"bool"},"id":308,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"id":302,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"!","prefix":true,"src":"2491:22:3","subExpression":{"baseExpression":{"id":298,"name":"approvers","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":284,"src":"2492:9:3","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_bool_$","typeString":"mapping(address => bool)"}},"id":301,"indexExpression":{"expression":{"id":299,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"2502:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":300,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"2506:6:3","memberName":"sender","nodeType":"MemberAccess","src":"2502:10:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"nodeType":"IndexAccess","src":"2492:21:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"nodeType":"BinaryOperation","operator":"&&","rightExpression":{"commonType":{"typeIdentifier":"t_address","typeString":"address"},"id":307,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"id":303,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"2517:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":304,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"2521:6:3","memberName":"sender","nodeType":"MemberAccess","src":"2517:10:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"BinaryOperation","operator":"!=","rightExpression":{"arguments":[],"expression":{"argumentTypes":[],"id":305,"name":"owner","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":67,"src":"2531:5:3","typeDescriptions":{"typeIdentifier":"t_function_internal_view$__$returns$_t_address_$","typeString":"function () view returns (address)"}},"id":306,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2531:7:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"2517:21:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"src":"2491:47:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":312,"nodeType":"IfStatement","src":"2487:73:3","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":309,"name":"NotApprover","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":294,"src":"2547:11:3","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":310,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2547:13:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":311,"nodeType":"RevertStatement","src":"2540:20:3"}},{"id":313,"nodeType":"PlaceholderStatement","src":"2571:1:3"}]},"id":315,"name":"onlyApprover","nameLocation":"2461:12:3","nodeType":"ModifierDefinition","parameters":{"id":297,"nodeType":"ParameterList","parameters":[],"src":"2473:2:3"},"src":"2452:128:3","virtual":false,"visibility":"internal"},{"body":{"id":337,"nodeType":"Block","src":"2819:126:3","statements":[{"expression":{"id":328,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":324,"name":"registry","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":262,"src":"2830:8:3","typeDescriptions":{"typeIdentifier":"t_contract$_IVitalityRegistry_$1058","typeString":"contract IVitalityRegistry"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"arguments":[{"id":326,"name":"_registry","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":317,"src":"2859:9:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":325,"name":"IVitalityRegistry","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":1058,"src":"2841:17:3","typeDescriptions":{"typeIdentifier":"t_type$_t_contract$_IVitalityRegistry_$1058_$","typeString":"type(contract IVitalityRegistry)"}},"id":327,"isConstant":false,"isLValue":false,"isPure":false,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"2841:28:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_contract$_IVitalityRegistry_$1058","typeString":"contract IVitalityRegistry"}},"src":"2830:39:3","typeDescriptions":{"typeIdentifier":"t_contract$_IVitalityRegistry_$1058","typeString":"contract IVitalityRegistry"}},"id":329,"nodeType":"ExpressionStatement","src":"2830:39:3"},{"expression":{"id":335,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"baseExpression":{"id":330,"name":"approvers","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":284,"src":"2880:9:3","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_bool_$","typeString":"mapping(address => bool)"}},"id":333,"indexExpression":{"expression":{"id":331,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"2890:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":332,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"2894:6:3","memberName":"sender","nodeType":"MemberAccess","src":"2890:10:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"nodeType":"IndexAccess","src":"2880:21:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"hexValue":"74727565","id":334,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"2904:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"true"},"src":"2880:28:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":336,"nodeType":"ExpressionStatement","src":"2880:28:3"}]},"id":338,"implemented":true,"kind":"constructor","modifiers":[{"arguments":[{"expression":{"id":320,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"2807:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":321,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"2811:6:3","memberName":"sender","nodeType":"MemberAccess","src":"2807:10:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"id":322,"kind":"baseConstructorSpecifier","modifierName":{"id":319,"name":"Ownable","nameLocations":["2799:7:3"],"nodeType":"IdentifierPath","referencedDeclaration":147,"src":"2799:7:3"},"nodeType":"ModifierInvocation","src":"2799:19:3"}],"name":"","nameLocation":"-1:-1:-1","nodeType":"FunctionDefinition","parameters":{"id":318,"nodeType":"ParameterList","parameters":[{"constant":false,"id":317,"mutability":"mutable","name":"_registry","nameLocation":"2788:9:3","nodeType":"VariableDeclaration","scope":338,"src":"2780:17:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":316,"name":"address","nodeType":"ElementaryTypeName","src":"2780:7:3","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"2779:19:3"},"returnParameters":{"id":323,"nodeType":"ParameterList","parameters":[],"src":"2819:0:3"},"scope":552,"src":"2768:177:3","stateMutability":"nonpayable","virtual":false,"visibility":"public"},{"body":{"id":352,"nodeType":"Block","src":"3314:46:3","statements":[{"expression":{"id":350,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"baseExpression":{"id":346,"name":"approvers","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":284,"src":"3325:9:3","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_bool_$","typeString":"mapping(address => bool)"}},"id":348,"indexExpression":{"id":347,"name":"_approver","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":341,"src":"3335:9:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"nodeType":"IndexAccess","src":"3325:20:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"hexValue":"74727565","id":349,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"3348:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"true"},"src":"3325:27:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":351,"nodeType":"ExpressionStatement","src":"3325:27:3"}]},"documentation":{"id":339,"nodeType":"StructuredDocumentation","src":"3145:104:3","text":" @notice Add an address that can approve submissions (e.g., Validator agent wallet)."},"functionSelector":"b646c194","id":353,"implemented":true,"kind":"function","modifiers":[{"id":344,"kind":"modifierInvocation","modifierName":{"id":343,"name":"onlyOwner","nameLocations":["3304:9:3"],"nodeType":"IdentifierPath","referencedDeclaration":58,"src":"3304:9:3"},"nodeType":"ModifierInvocation","src":"3304:9:3"}],"name":"addApprover","nameLocation":"3264:11:3","nodeType":"FunctionDefinition","parameters":{"id":342,"nodeType":"ParameterList","parameters":[{"constant":false,"id":341,"mutability":"mutable","name":"_approver","nameLocation":"3284:9:3","nodeType":"VariableDeclaration","scope":353,"src":"3276:17:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":340,"name":"address","nodeType":"ElementaryTypeName","src":"3276:7:3","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"3275:19:3"},"returnParameters":{"id":345,"nodeType":"ParameterList","parameters":[],"src":"3314:0:3"},"scope":552,"src":"3255:105:3","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":{"id":367,"nodeType":"Block","src":"3484:47:3","statements":[{"expression":{"id":365,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"baseExpression":{"id":361,"name":"approvers","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":284,"src":"3495:9:3","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_bool_$","typeString":"mapping(address => bool)"}},"id":363,"indexExpression":{"id":362,"name":"_approver","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":356,"src":"3505:9:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"nodeType":"IndexAccess","src":"3495:20:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"hexValue":"66616c7365","id":364,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"3518:5:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"false"},"src":"3495:28:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":366,"nodeType":"ExpressionStatement","src":"3495:28:3"}]},"documentation":{"id":354,"nodeType":"StructuredDocumentation","src":"3368:48:3","text":" @notice Remove an approver."},"functionSelector":"6cf4c88f","id":368,"implemented":true,"kind":"function","modifiers":[{"id":359,"kind":"modifierInvocation","modifierName":{"id":358,"name":"onlyOwner","nameLocations":["3474:9:3"],"nodeType":"IdentifierPath","referencedDeclaration":58,"src":"3474:9:3"},"nodeType":"ModifierInvocation","src":"3474:9:3"}],"name":"removeApprover","nameLocation":"3431:14:3","nodeType":"FunctionDefinition","parameters":{"id":357,"nodeType":"ParameterList","parameters":[{"constant":false,"id":356,"mutability":"mutable","name":"_approver","nameLocation":"3454:9:3","nodeType":"VariableDeclaration","scope":368,"src":"3446:17:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":355,"name":"address","nodeType":"ElementaryTypeName","src":"3446:7:3","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"3445:19:3"},"returnParameters":{"id":360,"nodeType":"ParameterList","parameters":[],"src":"3484:0:3"},"scope":552,"src":"3422:109:3","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"baseFunctions":[1006],"body":{"id":426,"nodeType":"Block","src":"4071:638:3","statements":[{"condition":{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":380,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"id":377,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"4086:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":378,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"4090:5:3","memberName":"value","nodeType":"MemberAccess","src":"4086:9:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"==","rightExpression":{"hexValue":"30","id":379,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"4099:1:3","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"src":"4086:14:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":384,"nodeType":"IfStatement","src":"4082:47:3","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":381,"name":"InsufficientReward","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":292,"src":"4109:18:3","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":382,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"4109:20:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":383,"nodeType":"RevertStatement","src":"4102:27:3"}},{"expression":{"id":386,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"++","prefix":false,"src":"4142:13:3","subExpression":{"id":385,"name":"bountyCount","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":280,"src":"4142:11:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":387,"nodeType":"ExpressionStatement","src":"4142:13:3"},{"assignments":[389],"declarations":[{"constant":false,"id":389,"mutability":"mutable","name":"bountyId","nameLocation":"4176:8:3","nodeType":"VariableDeclaration","scope":426,"src":"4168:16:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"},"typeName":{"id":388,"name":"bytes32","nodeType":"ElementaryTypeName","src":"4168:7:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"visibility":"internal"}],"id":403,"initialValue":{"arguments":[{"arguments":[{"expression":{"id":393,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"4246:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":394,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"4250:6:3","memberName":"sender","nodeType":"MemberAccess","src":"4246:10:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},{"id":395,"name":"metadataURI","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":371,"src":"4275:11:3","typeDescriptions":{"typeIdentifier":"t_string_calldata_ptr","typeString":"string calldata"}},{"expression":{"id":396,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"4305:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":397,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"4309:5:3","memberName":"value","nodeType":"MemberAccess","src":"4305:9:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},{"expression":{"id":398,"name":"block","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-4,"src":"4333:5:3","typeDescriptions":{"typeIdentifier":"t_magic_block","typeString":"block"}},"id":399,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"4339:6:3","memberName":"number","nodeType":"MemberAccess","src":"4333:12:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},{"id":400,"name":"bountyCount","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":280,"src":"4364:11:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"},{"typeIdentifier":"t_string_calldata_ptr","typeString":"string calldata"},{"typeIdentifier":"t_uint256","typeString":"uint256"},{"typeIdentifier":"t_uint256","typeString":"uint256"},{"typeIdentifier":"t_uint256","typeString":"uint256"}],"expression":{"id":391,"name":"abi","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-1,"src":"4211:3:3","typeDescriptions":{"typeIdentifier":"t_magic_abi","typeString":"abi"}},"id":392,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"memberLocation":"4215:12:3","memberName":"encodePacked","nodeType":"MemberAccess","src":"4211:16:3","typeDescriptions":{"typeIdentifier":"t_function_abiencodepacked_pure$__$returns$_t_bytes_memory_ptr_$","typeString":"function () pure returns (bytes memory)"}},"id":401,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"4211:179:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_bytes_memory_ptr","typeString":"bytes memory"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_bytes_memory_ptr","typeString":"bytes memory"}],"id":390,"name":"keccak256","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-8,"src":"4187:9:3","typeDescriptions":{"typeIdentifier":"t_function_keccak256_pure$_t_bytes_memory_ptr_$returns$_t_bytes32_$","typeString":"function (bytes memory) pure returns (bytes32)"}},"id":402,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"4187:214:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"nodeType":"VariableDeclarationStatement","src":"4168:233:3"},{"expression":{"id":416,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"baseExpression":{"id":404,"name":"bounties","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":278,"src":"4414:8:3","typeDescriptions":{"typeIdentifier":"t_mapping$_t_bytes32_$_t_struct$_Bounty_$273_storage_$","typeString":"mapping(bytes32 => struct VitalisBounty.Bounty storage ref)"}},"id":406,"indexExpression":{"id":405,"name":"bountyId","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":389,"src":"4423:8:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"nodeType":"IndexAccess","src":"4414:18:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage","typeString":"struct VitalisBounty.Bounty storage ref"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"arguments":[{"expression":{"id":408,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"4466:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":409,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"4470:6:3","memberName":"sender","nodeType":"MemberAccess","src":"4466:10:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},{"id":410,"name":"metadataURI","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":371,"src":"4504:11:3","typeDescriptions":{"typeIdentifier":"t_string_calldata_ptr","typeString":"string calldata"}},{"expression":{"id":411,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"4538:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":412,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"4542:5:3","memberName":"value","nodeType":"MemberAccess","src":"4538:9:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},{"hexValue":"74727565","id":413,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"4572:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"true"},{"hexValue":"66616c7365","id":414,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"4604:5:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"false"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"},{"typeIdentifier":"t_string_calldata_ptr","typeString":"string calldata"},{"typeIdentifier":"t_uint256","typeString":"uint256"},{"typeIdentifier":"t_bool","typeString":"bool"},{"typeIdentifier":"t_bool","typeString":"bool"}],"id":407,"name":"Bounty","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":273,"src":"4435:6:3","typeDescriptions":{"typeIdentifier":"t_type$_t_struct$_Bounty_$273_storage_ptr_$","typeString":"type(struct VitalisBounty.Bounty storage pointer)"}},"id":415,"isConstant":false,"isLValue":false,"isPure":false,"kind":"structConstructorCall","lValueRequested":false,"nameLocations":["4457:7:3","4491:11:3","4530:6:3","4562:8:3","4591:11:3"],"names":["creator","metadataURI","reward","isActive","isCompleted"],"nodeType":"FunctionCall","src":"4435:186:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_memory_ptr","typeString":"struct VitalisBounty.Bounty memory"}},"src":"4414:207:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage","typeString":"struct VitalisBounty.Bounty storage ref"}},"id":417,"nodeType":"ExpressionStatement","src":"4414:207:3"},{"eventCall":{"arguments":[{"id":419,"name":"bountyId","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":389,"src":"4653:8:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},{"expression":{"id":420,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"4663:3:3","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":421,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"4667:5:3","memberName":"value","nodeType":"MemberAccess","src":"4663:9:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_bytes32","typeString":"bytes32"},{"typeIdentifier":"t_uint256","typeString":"uint256"}],"id":418,"name":"BountyCreated","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":993,"src":"4639:13:3","typeDescriptions":{"typeIdentifier":"t_function_event_nonpayable$_t_bytes32_$_t_uint256_$returns$__$","typeString":"function (bytes32,uint256)"}},"id":422,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"4639:34:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":423,"nodeType":"EmitStatement","src":"4634:39:3"},{"expression":{"id":424,"name":"bountyId","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":389,"src":"4693:8:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"functionReturnParameters":376,"id":425,"nodeType":"Return","src":"4686:15:3"}]},"documentation":{"id":369,"nodeType":"StructuredDocumentation","src":"3715:239:3","text":" @notice Create a new bounty with a MON reward locked in the contract.\n @param metadataURI  IPFS or URL pointing to bounty description/requirements.\n @return bountyId    Unique identifier (keccak256 hash)."},"functionSelector":"06868c4b","id":427,"implemented":true,"kind":"function","modifiers":[],"name":"createBounty","nameLocation":"3969:12:3","nodeType":"FunctionDefinition","overrides":{"id":373,"nodeType":"OverrideSpecifier","overrides":[],"src":"4044:8:3"},"parameters":{"id":372,"nodeType":"ParameterList","parameters":[{"constant":false,"id":371,"mutability":"mutable","name":"metadataURI","nameLocation":"4008:11:3","nodeType":"VariableDeclaration","scope":427,"src":"3992:27:3","stateVariable":false,"storageLocation":"calldata","typeDescriptions":{"typeIdentifier":"t_string_calldata_ptr","typeString":"string"},"typeName":{"id":370,"name":"string","nodeType":"ElementaryTypeName","src":"3992:6:3","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"visibility":"internal"}],"src":"3981:45:3"},"returnParameters":{"id":376,"nodeType":"ParameterList","parameters":[{"constant":false,"id":375,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":427,"src":"4062:7:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"},"typeName":{"id":374,"name":"bytes32","nodeType":"ElementaryTypeName","src":"4062:7:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"visibility":"internal"}],"src":"4061:9:3"},"scope":552,"src":"3960:749:3","stateMutability":"payable","virtual":false,"visibility":"external"},{"baseFunctions":[1013],"body":{"id":510,"nodeType":"Block","src":"5386:645:3","statements":[{"assignments":[442],"declarations":[{"constant":false,"id":442,"mutability":"mutable","name":"bounty","nameLocation":"5412:6:3","nodeType":"VariableDeclaration","scope":510,"src":"5397:21:3","stateVariable":false,"storageLocation":"storage","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty"},"typeName":{"id":441,"nodeType":"UserDefinedTypeName","pathNode":{"id":440,"name":"Bounty","nameLocations":["5397:6:3"],"nodeType":"IdentifierPath","referencedDeclaration":273,"src":"5397:6:3"},"referencedDeclaration":273,"src":"5397:6:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty"}},"visibility":"internal"}],"id":446,"initialValue":{"baseExpression":{"id":443,"name":"bounties","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":278,"src":"5421:8:3","typeDescriptions":{"typeIdentifier":"t_mapping$_t_bytes32_$_t_struct$_Bounty_$273_storage_$","typeString":"mapping(bytes32 => struct VitalisBounty.Bounty storage ref)"}},"id":445,"indexExpression":{"id":444,"name":"bountyId","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":430,"src":"5430:8:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"nodeType":"IndexAccess","src":"5421:18:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage","typeString":"struct VitalisBounty.Bounty storage ref"}},"nodeType":"VariableDeclarationStatement","src":"5397:42:3"},{"condition":{"id":449,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"!","prefix":true,"src":"5456:16:3","subExpression":{"expression":{"id":447,"name":"bounty","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":442,"src":"5457:6:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":448,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"5464:8:3","memberName":"isActive","nodeType":"MemberAccess","referencedDeclaration":270,"src":"5457:15:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":453,"nodeType":"IfStatement","src":"5452:46:3","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":450,"name":"BountyNotActive","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":288,"src":"5481:15:3","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":451,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"5481:17:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":452,"nodeType":"RevertStatement","src":"5474:24:3"}},{"condition":{"expression":{"id":454,"name":"bounty","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":442,"src":"5513:6:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":455,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"5520:11:3","memberName":"isCompleted","nodeType":"MemberAccess","referencedDeclaration":272,"src":"5513:18:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":459,"nodeType":"IfStatement","src":"5509:55:3","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":456,"name":"BountyAlreadyCompleted","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":290,"src":"5540:22:3","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":457,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"5540:24:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":458,"nodeType":"RevertStatement","src":"5533:31:3"}},{"condition":{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":463,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"id":460,"name":"bounty","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":442,"src":"5579:6:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":461,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"5586:6:3","memberName":"reward","nodeType":"MemberAccess","referencedDeclaration":268,"src":"5579:13:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"==","rightExpression":{"hexValue":"30","id":462,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"5596:1:3","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"src":"5579:18:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":467,"nodeType":"IfStatement","src":"5575:47:3","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":464,"name":"BountyNotFound","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":286,"src":"5606:14:3","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":465,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"5606:16:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":466,"nodeType":"RevertStatement","src":"5599:23:3"}},{"expression":{"id":472,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"expression":{"id":468,"name":"bounty","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":442,"src":"5665:6:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":470,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"memberLocation":"5672:11:3","memberName":"isCompleted","nodeType":"MemberAccess","referencedDeclaration":272,"src":"5665:18:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"hexValue":"74727565","id":471,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"5686:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"true"},"src":"5665:25:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":473,"nodeType":"ExpressionStatement","src":"5665:25:3"},{"expression":{"id":478,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"expression":{"id":474,"name":"bounty","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":442,"src":"5701:6:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":476,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"memberLocation":"5708:8:3","memberName":"isActive","nodeType":"MemberAccess","referencedDeclaration":270,"src":"5701:15:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"hexValue":"66616c7365","id":477,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"5719:5:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"false"},"src":"5701:23:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":479,"nodeType":"ExpressionStatement","src":"5701:23:3"},{"assignments":[481,null],"declarations":[{"constant":false,"id":481,"mutability":"mutable","name":"success","nameLocation":"5770:7:3","nodeType":"VariableDeclaration","scope":510,"src":"5765:12:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":480,"name":"bool","nodeType":"ElementaryTypeName","src":"5765:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"},null],"id":492,"initialValue":{"arguments":[{"hexValue":"","id":490,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"5826:2:3","typeDescriptions":{"typeIdentifier":"t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470","typeString":"literal_string \"\""},"value":""}],"expression":{"argumentTypes":[{"typeIdentifier":"t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470","typeString":"literal_string \"\""}],"expression":{"argumentTypes":[{"typeIdentifier":"t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470","typeString":"literal_string \"\""}],"expression":{"arguments":[{"id":484,"name":"worker","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":432,"src":"5791:6:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":483,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"5783:8:3","typeDescriptions":{"typeIdentifier":"t_type$_t_address_payable_$","typeString":"type(address payable)"},"typeName":{"id":482,"name":"address","nodeType":"ElementaryTypeName","src":"5783:8:3","stateMutability":"payable","typeDescriptions":{}}},"id":485,"isConstant":false,"isLValue":false,"isPure":false,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"5783:15:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address_payable","typeString":"address payable"}},"id":486,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"5799:4:3","memberName":"call","nodeType":"MemberAccess","src":"5783:20:3","typeDescriptions":{"typeIdentifier":"t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$","typeString":"function (bytes memory) payable returns (bool,bytes memory)"}},"id":489,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"names":["value"],"nodeType":"FunctionCallOptions","options":[{"expression":{"id":487,"name":"bounty","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":442,"src":"5811:6:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":488,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"5818:6:3","memberName":"reward","nodeType":"MemberAccess","referencedDeclaration":268,"src":"5811:13:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}}],"src":"5783:42:3","typeDescriptions":{"typeIdentifier":"t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$value","typeString":"function (bytes memory) payable returns (bool,bytes memory)"}},"id":491,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"5783:46:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$_t_bool_$_t_bytes_memory_ptr_$","typeString":"tuple(bool,bytes memory)"}},"nodeType":"VariableDeclarationStatement","src":"5764:65:3"},{"condition":{"id":494,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"!","prefix":true,"src":"5844:8:3","subExpression":{"id":493,"name":"success","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":481,"src":"5845:7:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":498,"nodeType":"IfStatement","src":"5840:37:3","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":495,"name":"TransferFailed","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":296,"src":"5861:14:3","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":496,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"5861:16:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":497,"nodeType":"RevertStatement","src":"5854:23:3"}},{"expression":{"arguments":[{"id":502,"name":"worker","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":432,"src":"5962:6:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"expression":{"id":499,"name":"registry","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":262,"src":"5947:8:3","typeDescriptions":{"typeIdentifier":"t_contract$_IVitalityRegistry_$1058","typeString":"contract IVitalityRegistry"}},"id":501,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"5956:5:3","memberName":"pulse","nodeType":"MemberAccess","referencedDeclaration":1045,"src":"5947:14:3","typeDescriptions":{"typeIdentifier":"t_function_external_nonpayable$_t_address_$returns$__$","typeString":"function (address) external"}},"id":503,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"5947:22:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":504,"nodeType":"ExpressionStatement","src":"5947:22:3"},{"eventCall":{"arguments":[{"id":506,"name":"bountyId","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":430,"src":"6006:8:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},{"id":507,"name":"worker","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":432,"src":"6016:6:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_bytes32","typeString":"bytes32"},{"typeIdentifier":"t_address","typeString":"address"}],"id":505,"name":"SubmissionApproved","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":999,"src":"5987:18:3","typeDescriptions":{"typeIdentifier":"t_function_event_nonpayable$_t_bytes32_$_t_address_$returns$__$","typeString":"function (bytes32,address)"}},"id":508,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"5987:36:3","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":509,"nodeType":"EmitStatement","src":"5982:41:3"}]},"documentation":{"id":428,"nodeType":"StructuredDocumentation","src":"4883:367:3","text":" @notice Approve a submission: pay the worker and pulse their vitality.\n @dev    Only callable by authorized approvers (Validator agent).\n         Flow: validate → pay worker → call Registry.pulse(worker)\n @param bountyId  The bounty being completed.\n @param worker    The agent/user who submitted the work."},"functionSelector":"cce5b74b","id":511,"implemented":true,"kind":"function","modifiers":[{"id":436,"kind":"modifierInvocation","modifierName":{"id":435,"name":"onlyApprover","nameLocations":["5360:12:3"],"nodeType":"IdentifierPath","referencedDeclaration":315,"src":"5360:12:3"},"nodeType":"ModifierInvocation","src":"5360:12:3"},{"id":438,"kind":"modifierInvocation","modifierName":{"id":437,"name":"nonReentrant","nameLocations":["5373:12:3"],"nodeType":"IdentifierPath","referencedDeclaration":210,"src":"5373:12:3"},"nodeType":"ModifierInvocation","src":"5373:12:3"}],"name":"approveSubmission","nameLocation":"5265:17:3","nodeType":"FunctionDefinition","overrides":{"id":434,"nodeType":"OverrideSpecifier","overrides":[],"src":"5351:8:3"},"parameters":{"id":433,"nodeType":"ParameterList","parameters":[{"constant":false,"id":430,"mutability":"mutable","name":"bountyId","nameLocation":"5301:8:3","nodeType":"VariableDeclaration","scope":511,"src":"5293:16:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"},"typeName":{"id":429,"name":"bytes32","nodeType":"ElementaryTypeName","src":"5293:7:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"visibility":"internal"},{"constant":false,"id":432,"mutability":"mutable","name":"worker","nameLocation":"5328:6:3","nodeType":"VariableDeclaration","scope":511,"src":"5320:14:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":431,"name":"address","nodeType":"ElementaryTypeName","src":"5320:7:3","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"5282:59:3"},"returnParameters":{"id":439,"nodeType":"ParameterList","parameters":[],"src":"5386:0:3"},"scope":552,"src":"5256:775:3","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":{"id":546,"nodeType":"Block","src":"6504:137:3","statements":[{"assignments":[529],"declarations":[{"constant":false,"id":529,"mutability":"mutable","name":"b","nameLocation":"6530:1:3","nodeType":"VariableDeclaration","scope":546,"src":"6515:16:3","stateVariable":false,"storageLocation":"storage","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty"},"typeName":{"id":528,"nodeType":"UserDefinedTypeName","pathNode":{"id":527,"name":"Bounty","nameLocations":["6515:6:3"],"nodeType":"IdentifierPath","referencedDeclaration":273,"src":"6515:6:3"},"referencedDeclaration":273,"src":"6515:6:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty"}},"visibility":"internal"}],"id":533,"initialValue":{"baseExpression":{"id":530,"name":"bounties","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":278,"src":"6534:8:3","typeDescriptions":{"typeIdentifier":"t_mapping$_t_bytes32_$_t_struct$_Bounty_$273_storage_$","typeString":"mapping(bytes32 => struct VitalisBounty.Bounty storage ref)"}},"id":532,"indexExpression":{"id":531,"name":"bountyId","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":514,"src":"6543:8:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"nodeType":"IndexAccess","src":"6534:18:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage","typeString":"struct VitalisBounty.Bounty storage ref"}},"nodeType":"VariableDeclarationStatement","src":"6515:37:3"},{"expression":{"components":[{"expression":{"id":534,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":529,"src":"6571:1:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":535,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"6573:7:3","memberName":"creator","nodeType":"MemberAccess","referencedDeclaration":264,"src":"6571:9:3","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},{"expression":{"id":536,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":529,"src":"6582:1:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":537,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"6584:11:3","memberName":"metadataURI","nodeType":"MemberAccess","referencedDeclaration":266,"src":"6582:13:3","typeDescriptions":{"typeIdentifier":"t_string_storage","typeString":"string storage ref"}},{"expression":{"id":538,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":529,"src":"6597:1:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":539,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"6599:6:3","memberName":"reward","nodeType":"MemberAccess","referencedDeclaration":268,"src":"6597:8:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},{"expression":{"id":540,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":529,"src":"6607:1:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":541,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"6609:8:3","memberName":"isActive","nodeType":"MemberAccess","referencedDeclaration":270,"src":"6607:10:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},{"expression":{"id":542,"name":"b","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":529,"src":"6619:1:3","typeDescriptions":{"typeIdentifier":"t_struct$_Bounty_$273_storage_ptr","typeString":"struct VitalisBounty.Bounty storage pointer"}},"id":543,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"6621:11:3","memberName":"isCompleted","nodeType":"MemberAccess","referencedDeclaration":272,"src":"6619:13:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}}],"id":544,"isConstant":false,"isInlineArray":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"TupleExpression","src":"6570:63:3","typeDescriptions":{"typeIdentifier":"t_tuple$_t_address_$_t_string_storage_$_t_uint256_$_t_bool_$_t_bool_$","typeString":"tuple(address,string storage ref,uint256,bool,bool)"}},"functionReturnParameters":526,"id":545,"nodeType":"Return","src":"6563:70:3"}]},"documentation":{"id":512,"nodeType":"StructuredDocumentation","src":"6217:76:3","text":" @notice Check if a bounty exists and its current state."},"functionSelector":"2417395c","id":547,"implemented":true,"kind":"function","modifiers":[],"name":"getBounty","nameLocation":"6308:9:3","nodeType":"FunctionDefinition","parameters":{"id":515,"nodeType":"ParameterList","parameters":[{"constant":false,"id":514,"mutability":"mutable","name":"bountyId","nameLocation":"6326:8:3","nodeType":"VariableDeclaration","scope":547,"src":"6318:16:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"},"typeName":{"id":513,"name":"bytes32","nodeType":"ElementaryTypeName","src":"6318:7:3","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"visibility":"internal"}],"src":"6317:18:3"},"returnParameters":{"id":526,"nodeType":"ParameterList","parameters":[{"constant":false,"id":517,"mutability":"mutable","name":"creator","nameLocation":"6377:7:3","nodeType":"VariableDeclaration","scope":547,"src":"6369:15:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":516,"name":"address","nodeType":"ElementaryTypeName","src":"6369:7:3","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":519,"mutability":"mutable","name":"metadataURI","nameLocation":"6409:11:3","nodeType":"VariableDeclaration","scope":547,"src":"6395:25:3","stateVariable":false,"storageLocation":"memory","typeDescriptions":{"typeIdentifier":"t_string_memory_ptr","typeString":"string"},"typeName":{"id":518,"name":"string","nodeType":"ElementaryTypeName","src":"6395:6:3","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"visibility":"internal"},{"constant":false,"id":521,"mutability":"mutable","name":"reward","nameLocation":"6439:6:3","nodeType":"VariableDeclaration","scope":547,"src":"6431:14:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":520,"name":"uint256","nodeType":"ElementaryTypeName","src":"6431:7:3","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"},{"constant":false,"id":523,"mutability":"mutable","name":"isActive","nameLocation":"6461:8:3","nodeType":"VariableDeclaration","scope":547,"src":"6456:13:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":522,"name":"bool","nodeType":"ElementaryTypeName","src":"6456:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"},{"constant":false,"id":525,"mutability":"mutable","name":"isCompleted","nameLocation":"6485:11:3","nodeType":"VariableDeclaration","scope":547,"src":"6480:16:3","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":524,"name":"bool","nodeType":"ElementaryTypeName","src":"6480:4:3","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"}],"src":"6358:145:3"},"scope":552,"src":"6299:342:3","stateMutability":"view","virtual":false,"visibility":"external"},{"body":{"id":550,"nodeType":"Block","src":"6856:2:3","statements":[]},"id":551,"implemented":true,"kind":"receive","modifiers":[],"name":"","nameLocation":"-1:-1:-1","nodeType":"FunctionDefinition","parameters":{"id":548,"nodeType":"ParameterList","parameters":[],"src":"6836:2:3"},"returnParameters":{"id":549,"nodeType":"ParameterList","parameters":[],"src":"6856:0:3"},"scope":552,"src":"6829:29:3","stateMutability":"payable","virtual":false,"visibility":"external"}],"scope":553,"src":"616:6245:3","usedErrors":[13,18,191,286,288,290,292,294,296],"usedEvents":[24,993,999]}],"src":"33:6830:3"},"id":3},"contracts/VitalityRegistry.sol":{"ast":{"absolutePath":"contracts/VitalityRegistry.sol","exportedSymbols":{"Context":[177],"IVitalityRegistry":[1058],"Ownable":[147],"ReentrancyGuard":[246],"VitalityRegistry":[984]},"id":985,"license":"MIT","nodeType":"SourceUnit","nodes":[{"id":554,"literals":["solidity","^","0.8",".20"],"nodeType":"PragmaDirective","src":"33:24:4"},{"absolutePath":"@openzeppelin/contracts/access/Ownable.sol","file":"@openzeppelin/contracts/access/Ownable.sol","id":555,"nameLocation":"-1:-1:-1","nodeType":"ImportDirective","scope":985,"sourceUnit":148,"src":"61:52:4","symbolAliases":[],"unitAlias":""},{"absolutePath":"@openzeppelin/contracts/utils/ReentrancyGuard.sol","file":"@openzeppelin/contracts/utils/ReentrancyGuard.sol","id":556,"nameLocation":"-1:-1:-1","nodeType":"ImportDirective","scope":985,"sourceUnit":247,"src":"115:59:4","symbolAliases":[],"unitAlias":""},{"absolutePath":"contracts/interfaces/IVitalityRegistry.sol","file":"./interfaces/IVitalityRegistry.sol","id":557,"nameLocation":"-1:-1:-1","nodeType":"ImportDirective","scope":985,"sourceUnit":1059,"src":"176:44:4","symbolAliases":[],"unitAlias":""},{"abstract":false,"baseContracts":[{"baseName":{"id":559,"name":"IVitalityRegistry","nameLocations":["780:17:4"],"nodeType":"IdentifierPath","referencedDeclaration":1058,"src":"780:17:4"},"id":560,"nodeType":"InheritanceSpecifier","src":"780:17:4"},{"baseName":{"id":561,"name":"Ownable","nameLocations":["799:7:4"],"nodeType":"IdentifierPath","referencedDeclaration":147,"src":"799:7:4"},"id":562,"nodeType":"InheritanceSpecifier","src":"799:7:4"},{"baseName":{"id":563,"name":"ReentrancyGuard","nameLocations":["808:15:4"],"nodeType":"IdentifierPath","referencedDeclaration":246,"src":"808:15:4"},"id":564,"nodeType":"InheritanceSpecifier","src":"808:15:4"}],"canonicalName":"VitalityRegistry","contractDependencies":[],"contractKind":"contract","documentation":{"id":558,"nodeType":"StructuredDocumentation","src":"224:525:4","text":" @title VitalityRegistry — On-Chain Agent Metabolism\n @notice Implements the core Vitalis metabolism: Decay, Pulse, Prune, Evolution.\n @dev Spec §1.1 — \"The Hard Logic (Immutable Rules)\"\n  Decay:     currentVitality = storedVitality - ((block.number - lastUpdateBlock) / decayRate)\n  Pulse:     +pulseAmount VITA on task completion (Validator/Bounty contract only)\n  Prune:     Agent dies at ≤ 0 vitality — permissionless call\n  Evolution: Strategist adjusts decayRate & pulseAmount"},"fullyImplemented":true,"id":984,"linearizedBaseContracts":[984,246,147,177,1058],"name":"VitalityRegistry","nameLocation":"760:16:4","nodeType":"ContractDefinition","nodes":[{"canonicalName":"VitalityRegistry.AgentData","id":573,"members":[{"constant":false,"id":566,"mutability":"mutable","name":"storedVitality","nameLocation":"1048:14:4","nodeType":"VariableDeclaration","scope":573,"src":"1041:21:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"},"typeName":{"id":565,"name":"int256","nodeType":"ElementaryTypeName","src":"1041:6:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"visibility":"internal"},{"constant":false,"id":568,"mutability":"mutable","name":"lastUpdateBlock","nameLocation":"1113:15:4","nodeType":"VariableDeclaration","scope":573,"src":"1105:23:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":567,"name":"uint256","nodeType":"ElementaryTypeName","src":"1105:7:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"},{"constant":false,"id":570,"mutability":"mutable","name":"isActive","nameLocation":"1193:8:4","nodeType":"VariableDeclaration","scope":573,"src":"1188:13:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":569,"name":"bool","nodeType":"ElementaryTypeName","src":"1188:4:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"},{"constant":false,"id":572,"mutability":"mutable","name":"isRegistered","nameLocation":"1257:12:4","nodeType":"VariableDeclaration","scope":573,"src":"1252:17:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":571,"name":"bool","nodeType":"ElementaryTypeName","src":"1252:4:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"}],"name":"AgentData","nameLocation":"1020:9:4","nodeType":"StructDefinition","scope":984,"src":"1013:311:4","visibility":"public"},{"constant":false,"functionSelector":"fd66091e","id":578,"mutability":"mutable","name":"agents","nameLocation":"1369:6:4","nodeType":"VariableDeclaration","scope":984,"src":"1332:43:4","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_struct$_AgentData_$573_storage_$","typeString":"mapping(address => struct VitalityRegistry.AgentData)"},"typeName":{"id":577,"keyName":"","keyNameLocation":"-1:-1:-1","keyType":{"id":574,"name":"address","nodeType":"ElementaryTypeName","src":"1340:7:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"Mapping","src":"1332:29:4","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_struct$_AgentData_$573_storage_$","typeString":"mapping(address => struct VitalityRegistry.AgentData)"},"valueName":"","valueNameLocation":"-1:-1:-1","valueType":{"id":576,"nodeType":"UserDefinedTypeName","pathNode":{"id":575,"name":"AgentData","nameLocations":["1351:9:4"],"nodeType":"IdentifierPath","referencedDeclaration":573,"src":"1351:9:4"},"referencedDeclaration":573,"src":"1351:9:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData"}}},"visibility":"public"},{"constant":false,"functionSelector":"a9c1f2f1","id":581,"mutability":"mutable","name":"decayRate","nameLocation":"1547:9:4","nodeType":"VariableDeclaration","scope":984,"src":"1532:31:4","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":579,"name":"uint256","nodeType":"ElementaryTypeName","src":"1532:7:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":{"hexValue":"31303030","id":580,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1559:4:4","typeDescriptions":{"typeIdentifier":"t_rational_1000_by_1","typeString":"int_const 1000"},"value":"1000"},"visibility":"public"},{"constant":false,"functionSelector":"80b3fa3f","id":584,"mutability":"mutable","name":"pulseAmount","nameLocation":"1638:11:4","nodeType":"VariableDeclaration","scope":984,"src":"1623:31:4","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":582,"name":"uint256","nodeType":"ElementaryTypeName","src":"1623:7:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":{"hexValue":"3530","id":583,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1652:2:4","typeDescriptions":{"typeIdentifier":"t_rational_50_by_1","typeString":"int_const 50"},"value":"50"},"visibility":"public"},{"constant":false,"functionSelector":"fc2dff08","id":587,"mutability":"mutable","name":"pruneReward","nameLocation":"1721:11:4","nodeType":"VariableDeclaration","scope":984,"src":"1706:36:4","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":585,"name":"uint256","nodeType":"ElementaryTypeName","src":"1706:7:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"value":{"hexValue":"31","id":586,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"1735:7:4","subdenomination":"ether","typeDescriptions":{"typeIdentifier":"t_rational_1000000000000000000_by_1","typeString":"int_const 1000000000000000000"},"value":"1"},"visibility":"public"},{"constant":false,"functionSelector":"ddf9fa09","id":589,"mutability":"mutable","name":"bountyContract","nameLocation":"1984:14:4","nodeType":"VariableDeclaration","scope":984,"src":"1969:29:4","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":588,"name":"address","nodeType":"ElementaryTypeName","src":"1969:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"public"},{"constant":false,"functionSelector":"1fe4a686","id":591,"mutability":"mutable","name":"strategist","nameLocation":"2064:10:4","nodeType":"VariableDeclaration","scope":984,"src":"2049:25:4","stateVariable":true,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":590,"name":"address","nodeType":"ElementaryTypeName","src":"2049:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"public"},{"anonymous":false,"eventSelector":"86d94fe3783a846468c0b7912fca3072b86415f6da1c7045926f0bc687a9da12","id":597,"name":"AgentRegistered","nameLocation":"2656:15:4","nodeType":"EventDefinition","parameters":{"id":596,"nodeType":"ParameterList","parameters":[{"constant":false,"id":593,"indexed":true,"mutability":"mutable","name":"agent","nameLocation":"2688:5:4","nodeType":"VariableDeclaration","scope":597,"src":"2672:21:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":592,"name":"address","nodeType":"ElementaryTypeName","src":"2672:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":595,"indexed":false,"mutability":"mutable","name":"initialVitality","nameLocation":"2702:15:4","nodeType":"VariableDeclaration","scope":597,"src":"2695:22:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"},"typeName":{"id":594,"name":"int256","nodeType":"ElementaryTypeName","src":"2695:6:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"visibility":"internal"}],"src":"2671:47:4"},"src":"2650:69:4"},{"errorSelector":"ea8e4eb5","id":599,"name":"NotAuthorized","nameLocation":"2923:13:4","nodeType":"ErrorDefinition","parameters":{"id":598,"nodeType":"ParameterList","parameters":[],"src":"2936:2:4"},"src":"2917:22:4"},{"errorSelector":"486fcee2","id":601,"name":"AgentNotActive","nameLocation":"2951:14:4","nodeType":"ErrorDefinition","parameters":{"id":600,"nodeType":"ParameterList","parameters":[],"src":"2965:2:4"},"src":"2945:23:4"},{"errorSelector":"83bcfb47","id":603,"name":"AgentNotRegistered","nameLocation":"2980:18:4","nodeType":"ErrorDefinition","parameters":{"id":602,"nodeType":"ParameterList","parameters":[],"src":"2998:2:4"},"src":"2974:27:4"},{"errorSelector":"e098d3ee","id":605,"name":"AgentAlreadyRegistered","nameLocation":"3013:22:4","nodeType":"ErrorDefinition","parameters":{"id":604,"nodeType":"ParameterList","parameters":[],"src":"3035:2:4"},"src":"3007:31:4"},{"errorSelector":"78eda064","id":607,"name":"AgentStillAlive","nameLocation":"3050:15:4","nodeType":"ErrorDefinition","parameters":{"id":606,"nodeType":"ParameterList","parameters":[],"src":"3065:2:4"},"src":"3044:24:4"},{"errorSelector":"cf0b0420","id":609,"name":"InvalidDecayRate","nameLocation":"3080:16:4","nodeType":"ErrorDefinition","parameters":{"id":608,"nodeType":"ParameterList","parameters":[],"src":"3096:2:4"},"src":"3074:25:4"},{"body":{"id":620,"nodeType":"Block","src":"3321:87:4","statements":[{"condition":{"commonType":{"typeIdentifier":"t_address","typeString":"address"},"id":614,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"id":611,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"3336:3:4","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":612,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"3340:6:4","memberName":"sender","nodeType":"MemberAccess","src":"3336:10:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"BinaryOperation","operator":"!=","rightExpression":{"id":613,"name":"bountyContract","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":589,"src":"3350:14:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"3336:28:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":618,"nodeType":"IfStatement","src":"3332:56:4","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":615,"name":"NotAuthorized","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":599,"src":"3373:13:4","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":616,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"3373:15:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":617,"nodeType":"RevertStatement","src":"3366:22:4"}},{"id":619,"nodeType":"PlaceholderStatement","src":"3399:1:4"}]},"id":621,"name":"onlyBountyContract","nameLocation":"3300:18:4","nodeType":"ModifierDefinition","parameters":{"id":610,"nodeType":"ParameterList","parameters":[],"src":"3318:2:4"},"src":"3291:117:4","virtual":false,"visibility":"internal"},{"body":{"id":632,"nodeType":"Block","src":"3442:83:4","statements":[{"condition":{"commonType":{"typeIdentifier":"t_address","typeString":"address"},"id":626,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"id":623,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"3457:3:4","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":624,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"3461:6:4","memberName":"sender","nodeType":"MemberAccess","src":"3457:10:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"BinaryOperation","operator":"!=","rightExpression":{"id":625,"name":"strategist","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":591,"src":"3471:10:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"3457:24:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":630,"nodeType":"IfStatement","src":"3453:52:4","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":627,"name":"NotAuthorized","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":599,"src":"3490:13:4","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":628,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"3490:15:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":629,"nodeType":"RevertStatement","src":"3483:22:4"}},{"id":631,"nodeType":"PlaceholderStatement","src":"3516:1:4"}]},"id":633,"name":"onlyStrategist","nameLocation":"3425:14:4","nodeType":"ModifierDefinition","parameters":{"id":622,"nodeType":"ParameterList","parameters":[],"src":"3439:2:4"},"src":"3416:109:4","virtual":false,"visibility":"internal"},{"body":{"id":645,"nodeType":"Block","src":"3747:73:4","statements":[{"expression":{"id":643,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":640,"name":"strategist","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":591,"src":"3758:10:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"expression":{"id":641,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"3771:3:4","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":642,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"3775:6:4","memberName":"sender","nodeType":"MemberAccess","src":"3771:10:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"3758:23:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"id":644,"nodeType":"ExpressionStatement","src":"3758:23:4"}]},"id":646,"implemented":true,"kind":"constructor","modifiers":[{"arguments":[{"expression":{"id":636,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"3735:3:4","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":637,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"3739:6:4","memberName":"sender","nodeType":"MemberAccess","src":"3735:10:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"id":638,"kind":"baseConstructorSpecifier","modifierName":{"id":635,"name":"Ownable","nameLocations":["3727:7:4"],"nodeType":"IdentifierPath","referencedDeclaration":147,"src":"3727:7:4"},"nodeType":"ModifierInvocation","src":"3727:19:4"}],"name":"","nameLocation":"-1:-1:-1","nodeType":"FunctionDefinition","parameters":{"id":634,"nodeType":"ParameterList","parameters":[],"src":"3724:2:4"},"returnParameters":{"id":639,"nodeType":"ParameterList","parameters":[],"src":"3747:0:4"},"scope":984,"src":"3713:107:4","stateMutability":"nonpayable","virtual":false,"visibility":"public"},{"body":{"id":658,"nodeType":"Block","src":"4172:51:4","statements":[{"expression":{"id":656,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":654,"name":"bountyContract","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":589,"src":"4183:14:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"id":655,"name":"_bountyContract","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":649,"src":"4200:15:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"4183:32:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"id":657,"nodeType":"ExpressionStatement","src":"4183:32:4"}]},"documentation":{"id":647,"nodeType":"StructuredDocumentation","src":"4008:87:4","text":" @notice Set the VitalisBounty contract address (only owner, once)."},"functionSelector":"7af86a29","id":659,"implemented":true,"kind":"function","modifiers":[{"id":652,"kind":"modifierInvocation","modifierName":{"id":651,"name":"onlyOwner","nameLocations":["4162:9:4"],"nodeType":"IdentifierPath","referencedDeclaration":58,"src":"4162:9:4"},"nodeType":"ModifierInvocation","src":"4162:9:4"}],"name":"setBountyContract","nameLocation":"4110:17:4","nodeType":"FunctionDefinition","parameters":{"id":650,"nodeType":"ParameterList","parameters":[{"constant":false,"id":649,"mutability":"mutable","name":"_bountyContract","nameLocation":"4136:15:4","nodeType":"VariableDeclaration","scope":659,"src":"4128:23:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":648,"name":"address","nodeType":"ElementaryTypeName","src":"4128:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"4127:25:4"},"returnParameters":{"id":653,"nodeType":"ParameterList","parameters":[],"src":"4172:0:4"},"scope":984,"src":"4101:122:4","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":{"id":671,"nodeType":"Block","src":"4356:43:4","statements":[{"expression":{"id":669,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":667,"name":"strategist","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":591,"src":"4367:10:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"id":668,"name":"_strategist","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":662,"src":"4380:11:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"src":"4367:24:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"id":670,"nodeType":"ExpressionStatement","src":"4367:24:4"}]},"documentation":{"id":660,"nodeType":"StructuredDocumentation","src":"4231:56:4","text":" @notice Set the strategist address."},"functionSelector":"c7b9d530","id":672,"implemented":true,"kind":"function","modifiers":[{"id":665,"kind":"modifierInvocation","modifierName":{"id":664,"name":"onlyOwner","nameLocations":["4346:9:4"],"nodeType":"IdentifierPath","referencedDeclaration":58,"src":"4346:9:4"},"nodeType":"ModifierInvocation","src":"4346:9:4"}],"name":"setStrategist","nameLocation":"4302:13:4","nodeType":"FunctionDefinition","parameters":{"id":663,"nodeType":"ParameterList","parameters":[{"constant":false,"id":662,"mutability":"mutable","name":"_strategist","nameLocation":"4324:11:4","nodeType":"VariableDeclaration","scope":672,"src":"4316:19:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":661,"name":"address","nodeType":"ElementaryTypeName","src":"4316:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"4315:21:4"},"returnParameters":{"id":666,"nodeType":"ParameterList","parameters":[],"src":"4356:0:4"},"scope":984,"src":"4293:106:4","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":{"id":705,"nodeType":"Block","src":"4715:318:4","statements":[{"condition":{"expression":{"baseExpression":{"id":680,"name":"agents","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":578,"src":"4730:6:4","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_struct$_AgentData_$573_storage_$","typeString":"mapping(address => struct VitalityRegistry.AgentData storage ref)"}},"id":682,"indexExpression":{"id":681,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":675,"src":"4737:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"nodeType":"IndexAccess","src":"4730:13:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage","typeString":"struct VitalityRegistry.AgentData storage ref"}},"id":683,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"4744:12:4","memberName":"isRegistered","nodeType":"MemberAccess","referencedDeclaration":572,"src":"4730:26:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":687,"nodeType":"IfStatement","src":"4726:63:4","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":684,"name":"AgentAlreadyRegistered","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":605,"src":"4765:22:4","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":685,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"4765:24:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":686,"nodeType":"RevertStatement","src":"4758:31:4"}},{"expression":{"id":698,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"baseExpression":{"id":688,"name":"agents","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":578,"src":"4802:6:4","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_struct$_AgentData_$573_storage_$","typeString":"mapping(address => struct VitalityRegistry.AgentData storage ref)"}},"id":690,"indexExpression":{"id":689,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":675,"src":"4809:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"nodeType":"IndexAccess","src":"4802:13:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage","typeString":"struct VitalityRegistry.AgentData storage ref"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"arguments":[{"hexValue":"313030","id":692,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"4859:3:4","typeDescriptions":{"typeIdentifier":"t_rational_100_by_1","typeString":"int_const 100"},"value":"100"},{"expression":{"id":693,"name":"block","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-4,"src":"4894:5:4","typeDescriptions":{"typeIdentifier":"t_magic_block","typeString":"block"}},"id":694,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"4900:6:4","memberName":"number","nodeType":"MemberAccess","src":"4894:12:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},{"hexValue":"74727565","id":695,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"4931:4:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"true"},{"hexValue":"74727565","id":696,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"4964:4:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"true"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_rational_100_by_1","typeString":"int_const 100"},{"typeIdentifier":"t_uint256","typeString":"uint256"},{"typeIdentifier":"t_bool","typeString":"bool"},{"typeIdentifier":"t_bool","typeString":"bool"}],"id":691,"name":"AgentData","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":573,"src":"4818:9:4","typeDescriptions":{"typeIdentifier":"t_type$_t_struct$_AgentData_$573_storage_ptr_$","typeString":"type(struct VitalityRegistry.AgentData storage pointer)"}},"id":697,"isConstant":false,"isLValue":false,"isPure":false,"kind":"structConstructorCall","lValueRequested":false,"nameLocations":["4843:14:4","4877:15:4","4921:8:4","4950:12:4"],"names":["storedVitality","lastUpdateBlock","isActive","isRegistered"],"nodeType":"FunctionCall","src":"4818:162:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_memory_ptr","typeString":"struct VitalityRegistry.AgentData memory"}},"src":"4802:178:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage","typeString":"struct VitalityRegistry.AgentData storage ref"}},"id":699,"nodeType":"ExpressionStatement","src":"4802:178:4"},{"eventCall":{"arguments":[{"id":701,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":675,"src":"5014:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},{"hexValue":"313030","id":702,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"5021:3:4","typeDescriptions":{"typeIdentifier":"t_rational_100_by_1","typeString":"int_const 100"},"value":"100"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"},{"typeIdentifier":"t_rational_100_by_1","typeString":"int_const 100"}],"id":700,"name":"AgentRegistered","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":597,"src":"4998:15:4","typeDescriptions":{"typeIdentifier":"t_function_event_nonpayable$_t_address_$_t_int256_$returns$__$","typeString":"function (address,int256)"}},"id":703,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"4998:27:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":704,"nodeType":"EmitStatement","src":"4993:32:4"}]},"documentation":{"id":673,"nodeType":"StructuredDocumentation","src":"4573:79:4","text":" @notice Register a new agent with initial vitality of 100."},"functionSelector":"306b9bb9","id":706,"implemented":true,"kind":"function","modifiers":[{"id":678,"kind":"modifierInvocation","modifierName":{"id":677,"name":"onlyOwner","nameLocations":["4705:9:4"],"nodeType":"IdentifierPath","referencedDeclaration":58,"src":"4705:9:4"},"nodeType":"ModifierInvocation","src":"4705:9:4"}],"name":"registerAgent","nameLocation":"4667:13:4","nodeType":"FunctionDefinition","parameters":{"id":676,"nodeType":"ParameterList","parameters":[{"constant":false,"id":675,"mutability":"mutable","name":"agent","nameLocation":"4689:5:4","nodeType":"VariableDeclaration","scope":706,"src":"4681:13:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":674,"name":"address","nodeType":"ElementaryTypeName","src":"4681:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"4680:15:4"},"returnParameters":{"id":679,"nodeType":"ParameterList","parameters":[],"src":"4715:0:4"},"scope":984,"src":"4658:375:4","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"baseFunctions":[1040],"body":{"id":760,"nodeType":"Block","src":"5454:370:4","statements":[{"assignments":[717],"declarations":[{"constant":false,"id":717,"mutability":"mutable","name":"data","nameLocation":"5483:4:4","nodeType":"VariableDeclaration","scope":760,"src":"5465:22:4","stateVariable":false,"storageLocation":"storage","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData"},"typeName":{"id":716,"nodeType":"UserDefinedTypeName","pathNode":{"id":715,"name":"AgentData","nameLocations":["5465:9:4"],"nodeType":"IdentifierPath","referencedDeclaration":573,"src":"5465:9:4"},"referencedDeclaration":573,"src":"5465:9:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData"}},"visibility":"internal"}],"id":721,"initialValue":{"baseExpression":{"id":718,"name":"agents","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":578,"src":"5490:6:4","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_struct$_AgentData_$573_storage_$","typeString":"mapping(address => struct VitalityRegistry.AgentData storage ref)"}},"id":720,"indexExpression":{"id":719,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":709,"src":"5497:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"nodeType":"IndexAccess","src":"5490:13:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage","typeString":"struct VitalityRegistry.AgentData storage ref"}},"nodeType":"VariableDeclarationStatement","src":"5465:38:4"},{"condition":{"id":724,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"!","prefix":true,"src":"5518:18:4","subExpression":{"expression":{"id":722,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":717,"src":"5519:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":723,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"5524:12:4","memberName":"isRegistered","nodeType":"MemberAccess","referencedDeclaration":572,"src":"5519:17:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":727,"nodeType":"IfStatement","src":"5514:32:4","trueBody":{"expression":{"hexValue":"30","id":725,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"5545:1:4","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"functionReturnParameters":714,"id":726,"nodeType":"Return","src":"5538:8:4"}},{"condition":{"id":730,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"!","prefix":true,"src":"5561:14:4","subExpression":{"expression":{"id":728,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":717,"src":"5562:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":729,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"5567:8:4","memberName":"isActive","nodeType":"MemberAccess","referencedDeclaration":570,"src":"5562:13:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":733,"nodeType":"IfStatement","src":"5557:28:4","trueBody":{"expression":{"hexValue":"30","id":731,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"5584:1:4","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"functionReturnParameters":714,"id":732,"nodeType":"Return","src":"5577:8:4"}},{"assignments":[735],"declarations":[{"constant":false,"id":735,"mutability":"mutable","name":"blocksPassed","nameLocation":"5606:12:4","nodeType":"VariableDeclaration","scope":760,"src":"5598:20:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":734,"name":"uint256","nodeType":"ElementaryTypeName","src":"5598:7:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"id":741,"initialValue":{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":740,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"id":736,"name":"block","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-4,"src":"5621:5:4","typeDescriptions":{"typeIdentifier":"t_magic_block","typeString":"block"}},"id":737,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"5627:6:4","memberName":"number","nodeType":"MemberAccess","src":"5621:12:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"-","rightExpression":{"expression":{"id":738,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":717,"src":"5636:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":739,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"5641:15:4","memberName":"lastUpdateBlock","nodeType":"MemberAccess","referencedDeclaration":568,"src":"5636:20:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"5621:35:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"VariableDeclarationStatement","src":"5598:58:4"},{"assignments":[743],"declarations":[{"constant":false,"id":743,"mutability":"mutable","name":"decayed","nameLocation":"5674:7:4","nodeType":"VariableDeclaration","scope":760,"src":"5667:14:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"},"typeName":{"id":742,"name":"int256","nodeType":"ElementaryTypeName","src":"5667:6:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"visibility":"internal"}],"id":750,"initialValue":{"arguments":[{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":748,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"id":746,"name":"blocksPassed","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":735,"src":"5691:12:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"/","rightExpression":{"id":747,"name":"decayRate","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":581,"src":"5706:9:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"5691:24:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_uint256","typeString":"uint256"}],"id":745,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"5684:6:4","typeDescriptions":{"typeIdentifier":"t_type$_t_int256_$","typeString":"type(int256)"},"typeName":{"id":744,"name":"int256","nodeType":"ElementaryTypeName","src":"5684:6:4","typeDescriptions":{}}},"id":749,"isConstant":false,"isLValue":false,"isPure":false,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"5684:32:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"nodeType":"VariableDeclarationStatement","src":"5667:49:4"},{"assignments":[752],"declarations":[{"constant":false,"id":752,"mutability":"mutable","name":"currentVitality","nameLocation":"5734:15:4","nodeType":"VariableDeclaration","scope":760,"src":"5727:22:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"},"typeName":{"id":751,"name":"int256","nodeType":"ElementaryTypeName","src":"5727:6:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"visibility":"internal"}],"id":757,"initialValue":{"commonType":{"typeIdentifier":"t_int256","typeString":"int256"},"id":756,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"id":753,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":717,"src":"5752:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":754,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"5757:14:4","memberName":"storedVitality","nodeType":"MemberAccess","referencedDeclaration":566,"src":"5752:19:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"nodeType":"BinaryOperation","operator":"-","rightExpression":{"id":755,"name":"decayed","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":743,"src":"5774:7:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"src":"5752:29:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"nodeType":"VariableDeclarationStatement","src":"5727:54:4"},{"expression":{"id":758,"name":"currentVitality","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":752,"src":"5801:15:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"functionReturnParameters":714,"id":759,"nodeType":"Return","src":"5794:22:4"}]},"documentation":{"id":707,"nodeType":"StructuredDocumentation","src":"5187:185:4","text":" @notice Calculate current vitality with dynamic decay.\n @dev    Spec §1.1: currentVitality = storedVitality - ((block.number - lastUpdateBlock) / decayRate)"},"functionSelector":"2f36b5d9","id":761,"implemented":true,"kind":"function","modifiers":[],"name":"getVitality","nameLocation":"5387:11:4","nodeType":"FunctionDefinition","overrides":{"id":711,"nodeType":"OverrideSpecifier","overrides":[],"src":"5428:8:4"},"parameters":{"id":710,"nodeType":"ParameterList","parameters":[{"constant":false,"id":709,"mutability":"mutable","name":"agent","nameLocation":"5407:5:4","nodeType":"VariableDeclaration","scope":761,"src":"5399:13:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":708,"name":"address","nodeType":"ElementaryTypeName","src":"5399:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"5398:15:4"},"returnParameters":{"id":714,"nodeType":"ParameterList","parameters":[{"constant":false,"id":713,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":761,"src":"5446:6:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"},"typeName":{"id":712,"name":"int256","nodeType":"ElementaryTypeName","src":"5446:6:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"visibility":"internal"}],"src":"5445:8:4"},"scope":984,"src":"5378:446:4","stateMutability":"view","virtual":false,"visibility":"external"},{"baseFunctions":[1045],"body":{"id":822,"nodeType":"Block","src":"6287:446:4","statements":[{"assignments":[774],"declarations":[{"constant":false,"id":774,"mutability":"mutable","name":"data","nameLocation":"6316:4:4","nodeType":"VariableDeclaration","scope":822,"src":"6298:22:4","stateVariable":false,"storageLocation":"storage","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData"},"typeName":{"id":773,"nodeType":"UserDefinedTypeName","pathNode":{"id":772,"name":"AgentData","nameLocations":["6298:9:4"],"nodeType":"IdentifierPath","referencedDeclaration":573,"src":"6298:9:4"},"referencedDeclaration":573,"src":"6298:9:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData"}},"visibility":"internal"}],"id":778,"initialValue":{"baseExpression":{"id":775,"name":"agents","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":578,"src":"6323:6:4","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_struct$_AgentData_$573_storage_$","typeString":"mapping(address => struct VitalityRegistry.AgentData storage ref)"}},"id":777,"indexExpression":{"id":776,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":764,"src":"6330:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"nodeType":"IndexAccess","src":"6323:13:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage","typeString":"struct VitalityRegistry.AgentData storage ref"}},"nodeType":"VariableDeclarationStatement","src":"6298:38:4"},{"condition":{"id":781,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"!","prefix":true,"src":"6351:18:4","subExpression":{"expression":{"id":779,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":774,"src":"6352:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":780,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"6357:12:4","memberName":"isRegistered","nodeType":"MemberAccess","referencedDeclaration":572,"src":"6352:17:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":785,"nodeType":"IfStatement","src":"6347:51:4","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":782,"name":"AgentNotRegistered","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":603,"src":"6378:18:4","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":783,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"6378:20:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":784,"nodeType":"RevertStatement","src":"6371:27:4"}},{"condition":{"id":788,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"!","prefix":true,"src":"6413:14:4","subExpression":{"expression":{"id":786,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":774,"src":"6414:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":787,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"6419:8:4","memberName":"isActive","nodeType":"MemberAccess","referencedDeclaration":570,"src":"6414:13:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":792,"nodeType":"IfStatement","src":"6409:43:4","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":789,"name":"AgentNotActive","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":601,"src":"6436:14:4","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":790,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"6436:16:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":791,"nodeType":"RevertStatement","src":"6429:23:4"}},{"expression":{"arguments":[{"id":794,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":764,"src":"6521:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":793,"name":"_checkpoint","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":979,"src":"6509:11:4","typeDescriptions":{"typeIdentifier":"t_function_internal_nonpayable$_t_address_$returns$__$","typeString":"function (address)"}},"id":795,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"6509:18:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":796,"nodeType":"ExpressionStatement","src":"6509:18:4"},{"expression":{"id":804,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"expression":{"id":797,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":774,"src":"6569:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":799,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"memberLocation":"6574:14:4","memberName":"storedVitality","nodeType":"MemberAccess","referencedDeclaration":566,"src":"6569:19:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"nodeType":"Assignment","operator":"+=","rightHandSide":{"arguments":[{"id":802,"name":"pulseAmount","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":584,"src":"6599:11:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_uint256","typeString":"uint256"}],"id":801,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"6592:6:4","typeDescriptions":{"typeIdentifier":"t_type$_t_int256_$","typeString":"type(int256)"},"typeName":{"id":800,"name":"int256","nodeType":"ElementaryTypeName","src":"6592:6:4","typeDescriptions":{}}},"id":803,"isConstant":false,"isLValue":false,"isPure":false,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"6592:19:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"src":"6569:42:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"id":805,"nodeType":"ExpressionStatement","src":"6569:42:4"},{"expression":{"id":811,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"expression":{"id":806,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":774,"src":"6622:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":808,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"memberLocation":"6627:15:4","memberName":"lastUpdateBlock","nodeType":"MemberAccess","referencedDeclaration":568,"src":"6622:20:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"expression":{"id":809,"name":"block","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-4,"src":"6645:5:4","typeDescriptions":{"typeIdentifier":"t_magic_block","typeString":"block"}},"id":810,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"6651:6:4","memberName":"number","nodeType":"MemberAccess","src":"6645:12:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"6622:35:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":812,"nodeType":"ExpressionStatement","src":"6622:35:4"},{"eventCall":{"arguments":[{"id":814,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":764,"src":"6689:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},{"arguments":[{"expression":{"id":817,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":774,"src":"6704:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":818,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"6709:14:4","memberName":"storedVitality","nodeType":"MemberAccess","referencedDeclaration":566,"src":"6704:19:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_int256","typeString":"int256"}],"id":816,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"6696:7:4","typeDescriptions":{"typeIdentifier":"t_type$_t_uint256_$","typeString":"type(uint256)"},"typeName":{"id":815,"name":"uint256","nodeType":"ElementaryTypeName","src":"6696:7:4","typeDescriptions":{}}},"id":819,"isConstant":false,"isLValue":false,"isPure":false,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"6696:28:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"},{"typeIdentifier":"t_uint256","typeString":"uint256"}],"id":813,"name":"VitalityPulse","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":1023,"src":"6675:13:4","typeDescriptions":{"typeIdentifier":"t_function_event_nonpayable$_t_address_$_t_uint256_$returns$__$","typeString":"function (address,uint256)"}},"id":820,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"6675:50:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":821,"nodeType":"EmitStatement","src":"6670:55:4"}]},"documentation":{"id":762,"nodeType":"StructuredDocumentation","src":"5990:211:4","text":" @notice Award vitality to an agent on task completion.\n @dev    Only callable by the VitalisBounty contract.\n         Checkpoints current vitality first, then adds pulseAmount."},"functionSelector":"8e97fdc3","id":823,"implemented":true,"kind":"function","modifiers":[{"id":768,"kind":"modifierInvocation","modifierName":{"id":767,"name":"onlyBountyContract","nameLocations":["6255:18:4"],"nodeType":"IdentifierPath","referencedDeclaration":621,"src":"6255:18:4"},"nodeType":"ModifierInvocation","src":"6255:18:4"},{"id":770,"kind":"modifierInvocation","modifierName":{"id":769,"name":"nonReentrant","nameLocations":["6274:12:4"],"nodeType":"IdentifierPath","referencedDeclaration":210,"src":"6274:12:4"},"nodeType":"ModifierInvocation","src":"6274:12:4"}],"name":"pulse","nameLocation":"6216:5:4","nodeType":"FunctionDefinition","overrides":{"id":766,"nodeType":"OverrideSpecifier","overrides":[],"src":"6246:8:4"},"parameters":{"id":765,"nodeType":"ParameterList","parameters":[{"constant":false,"id":764,"mutability":"mutable","name":"agent","nameLocation":"6230:5:4","nodeType":"VariableDeclaration","scope":823,"src":"6222:13:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":763,"name":"address","nodeType":"ElementaryTypeName","src":"6222:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"6221:15:4"},"returnParameters":{"id":771,"nodeType":"ParameterList","parameters":[],"src":"6287:0:4"},"scope":984,"src":"6207:526:4","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"baseFunctions":[1050],"body":{"id":902,"nodeType":"Block","src":"7197:656:4","statements":[{"assignments":[834],"declarations":[{"constant":false,"id":834,"mutability":"mutable","name":"data","nameLocation":"7226:4:4","nodeType":"VariableDeclaration","scope":902,"src":"7208:22:4","stateVariable":false,"storageLocation":"storage","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData"},"typeName":{"id":833,"nodeType":"UserDefinedTypeName","pathNode":{"id":832,"name":"AgentData","nameLocations":["7208:9:4"],"nodeType":"IdentifierPath","referencedDeclaration":573,"src":"7208:9:4"},"referencedDeclaration":573,"src":"7208:9:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData"}},"visibility":"internal"}],"id":838,"initialValue":{"baseExpression":{"id":835,"name":"agents","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":578,"src":"7233:6:4","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_struct$_AgentData_$573_storage_$","typeString":"mapping(address => struct VitalityRegistry.AgentData storage ref)"}},"id":837,"indexExpression":{"id":836,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":826,"src":"7240:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"nodeType":"IndexAccess","src":"7233:13:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage","typeString":"struct VitalityRegistry.AgentData storage ref"}},"nodeType":"VariableDeclarationStatement","src":"7208:38:4"},{"condition":{"id":841,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"!","prefix":true,"src":"7261:18:4","subExpression":{"expression":{"id":839,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":834,"src":"7262:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":840,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"7267:12:4","memberName":"isRegistered","nodeType":"MemberAccess","referencedDeclaration":572,"src":"7262:17:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":845,"nodeType":"IfStatement","src":"7257:51:4","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":842,"name":"AgentNotRegistered","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":603,"src":"7288:18:4","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":843,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"7288:20:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":844,"nodeType":"RevertStatement","src":"7281:27:4"}},{"condition":{"id":848,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"nodeType":"UnaryOperation","operator":"!","prefix":true,"src":"7323:14:4","subExpression":{"expression":{"id":846,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":834,"src":"7324:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":847,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"7329:8:4","memberName":"isActive","nodeType":"MemberAccess","referencedDeclaration":570,"src":"7324:13:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":852,"nodeType":"IfStatement","src":"7319:43:4","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":849,"name":"AgentNotActive","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":601,"src":"7346:14:4","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":850,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"7346:16:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":851,"nodeType":"RevertStatement","src":"7339:23:4"}},{"expression":{"arguments":[{"id":854,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":826,"src":"7426:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":853,"name":"_checkpoint","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":979,"src":"7414:11:4","typeDescriptions":{"typeIdentifier":"t_function_internal_nonpayable$_t_address_$returns$__$","typeString":"function (address)"}},"id":855,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"7414:18:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":856,"nodeType":"ExpressionStatement","src":"7414:18:4"},{"condition":{"commonType":{"typeIdentifier":"t_int256","typeString":"int256"},"id":860,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"id":857,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":834,"src":"7449:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":858,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"7454:14:4","memberName":"storedVitality","nodeType":"MemberAccess","referencedDeclaration":566,"src":"7449:19:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"nodeType":"BinaryOperation","operator":">","rightExpression":{"hexValue":"30","id":859,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"7471:1:4","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"src":"7449:23:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":864,"nodeType":"IfStatement","src":"7445:53:4","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":861,"name":"AgentStillAlive","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":607,"src":"7481:15:4","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":862,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"7481:17:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":863,"nodeType":"RevertStatement","src":"7474:24:4"}},{"expression":{"id":869,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"expression":{"id":865,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":834,"src":"7547:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":867,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"memberLocation":"7552:8:4","memberName":"isActive","nodeType":"MemberAccess","referencedDeclaration":570,"src":"7547:13:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"hexValue":"66616c7365","id":868,"isConstant":false,"isLValue":false,"isPure":true,"kind":"bool","lValueRequested":false,"nodeType":"Literal","src":"7563:5:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"value":"false"},"src":"7547:21:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":870,"nodeType":"ExpressionStatement","src":"7547:21:4"},{"condition":{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":877,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"arguments":[{"id":873,"name":"this","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-28,"src":"7623:4:4","typeDescriptions":{"typeIdentifier":"t_contract$_VitalityRegistry_$984","typeString":"contract VitalityRegistry"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_contract$_VitalityRegistry_$984","typeString":"contract VitalityRegistry"}],"id":872,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"7615:7:4","typeDescriptions":{"typeIdentifier":"t_type$_t_address_$","typeString":"type(address)"},"typeName":{"id":871,"name":"address","nodeType":"ElementaryTypeName","src":"7615:7:4","typeDescriptions":{}}},"id":874,"isConstant":false,"isLValue":false,"isPure":false,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"7615:13:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"id":875,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"7629:7:4","memberName":"balance","nodeType":"MemberAccess","src":"7615:21:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":">=","rightExpression":{"id":876,"name":"pruneReward","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":587,"src":"7640:11:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"7615:36:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":897,"nodeType":"IfStatement","src":"7611:199:4","trueBody":{"id":896,"nodeType":"Block","src":"7653:157:4","statements":[{"assignments":[879,null],"declarations":[{"constant":false,"id":879,"mutability":"mutable","name":"success","nameLocation":"7674:7:4","nodeType":"VariableDeclaration","scope":896,"src":"7669:12:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"},"typeName":{"id":878,"name":"bool","nodeType":"ElementaryTypeName","src":"7669:4:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"visibility":"internal"},null],"id":890,"initialValue":{"arguments":[{"hexValue":"","id":888,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"7732:2:4","typeDescriptions":{"typeIdentifier":"t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470","typeString":"literal_string \"\""},"value":""}],"expression":{"argumentTypes":[{"typeIdentifier":"t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470","typeString":"literal_string \"\""}],"expression":{"argumentTypes":[{"typeIdentifier":"t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470","typeString":"literal_string \"\""}],"expression":{"arguments":[{"expression":{"id":882,"name":"msg","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-15,"src":"7695:3:4","typeDescriptions":{"typeIdentifier":"t_magic_message","typeString":"msg"}},"id":883,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"7699:6:4","memberName":"sender","nodeType":"MemberAccess","src":"7695:10:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":881,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"7687:8:4","typeDescriptions":{"typeIdentifier":"t_type$_t_address_payable_$","typeString":"type(address payable)"},"typeName":{"id":880,"name":"address","nodeType":"ElementaryTypeName","src":"7687:8:4","stateMutability":"payable","typeDescriptions":{}}},"id":884,"isConstant":false,"isLValue":false,"isPure":false,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"7687:19:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_address_payable","typeString":"address payable"}},"id":885,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"7707:4:4","memberName":"call","nodeType":"MemberAccess","src":"7687:24:4","typeDescriptions":{"typeIdentifier":"t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$","typeString":"function (bytes memory) payable returns (bool,bytes memory)"}},"id":887,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"names":["value"],"nodeType":"FunctionCallOptions","options":[{"id":886,"name":"pruneReward","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":587,"src":"7719:11:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}}],"src":"7687:44:4","typeDescriptions":{"typeIdentifier":"t_function_barecall_payable$_t_bytes_memory_ptr_$returns$_t_bool_$_t_bytes_memory_ptr_$value","typeString":"function (bytes memory) payable returns (bool,bytes memory)"}},"id":889,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"7687:48:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$_t_bool_$_t_bytes_memory_ptr_$","typeString":"tuple(bool,bytes memory)"}},"nodeType":"VariableDeclarationStatement","src":"7668:67:4"},{"expression":{"arguments":[{"id":892,"name":"success","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":879,"src":"7758:7:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},{"hexValue":"5072756e6520726577617264207472616e73666572206661696c6564","id":893,"isConstant":false,"isLValue":false,"isPure":true,"kind":"string","lValueRequested":false,"nodeType":"Literal","src":"7767:30:4","typeDescriptions":{"typeIdentifier":"t_stringliteral_2fbdaddc9214f49cc874cceefa9da2874ee454a04fd2c5b9d09b0e57a8f7ffb0","typeString":"literal_string \"Prune reward transfer failed\""},"value":"Prune reward transfer failed"}],"expression":{"argumentTypes":[{"typeIdentifier":"t_bool","typeString":"bool"},{"typeIdentifier":"t_stringliteral_2fbdaddc9214f49cc874cceefa9da2874ee454a04fd2c5b9d09b0e57a8f7ffb0","typeString":"literal_string \"Prune reward transfer failed\""}],"id":891,"name":"require","nodeType":"Identifier","overloadedDeclarations":[-18,-18],"referencedDeclaration":-18,"src":"7750:7:4","typeDescriptions":{"typeIdentifier":"t_function_require_pure$_t_bool_$_t_string_memory_ptr_$returns$__$","typeString":"function (bool,string memory) pure"}},"id":894,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"7750:48:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":895,"nodeType":"ExpressionStatement","src":"7750:48:4"}]}},{"eventCall":{"arguments":[{"id":899,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":826,"src":"7839:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_address","typeString":"address"}],"id":898,"name":"AgentPruned","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":1027,"src":"7827:11:4","typeDescriptions":{"typeIdentifier":"t_function_event_nonpayable$_t_address_$returns$__$","typeString":"function (address)"}},"id":900,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"7827:18:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":901,"nodeType":"EmitStatement","src":"7822:23:4"}]},"documentation":{"id":824,"nodeType":"StructuredDocumentation","src":"6899:231:4","text":" @notice Prune a dead agent. Permissionless — anyone can call.\n @dev    Spec §1.1: If currentVitality <= 0, mark INACTIVE, revoke permissions.\n         The caller receives a small bounty reward."},"functionSelector":"0f3cca49","id":903,"implemented":true,"kind":"function","modifiers":[{"id":830,"kind":"modifierInvocation","modifierName":{"id":829,"name":"nonReentrant","nameLocations":["7184:12:4"],"nodeType":"IdentifierPath","referencedDeclaration":210,"src":"7184:12:4"},"nodeType":"ModifierInvocation","src":"7184:12:4"}],"name":"prune","nameLocation":"7145:5:4","nodeType":"FunctionDefinition","overrides":{"id":828,"nodeType":"OverrideSpecifier","overrides":[],"src":"7175:8:4"},"parameters":{"id":827,"nodeType":"ParameterList","parameters":[{"constant":false,"id":826,"mutability":"mutable","name":"agent","nameLocation":"7159:5:4","nodeType":"VariableDeclaration","scope":903,"src":"7151:13:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":825,"name":"address","nodeType":"ElementaryTypeName","src":"7151:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"7150:15:4"},"returnParameters":{"id":831,"nodeType":"ParameterList","parameters":[],"src":"7197:0:4"},"scope":984,"src":"7136:717:4","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"baseFunctions":[1057],"body":{"id":934,"nodeType":"Block","src":"8312:198:4","statements":[{"condition":{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":916,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"id":914,"name":"_decayRate","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":906,"src":"8327:10:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"==","rightExpression":{"hexValue":"30","id":915,"isConstant":false,"isLValue":false,"isPure":true,"kind":"number","lValueRequested":false,"nodeType":"Literal","src":"8341:1:4","typeDescriptions":{"typeIdentifier":"t_rational_0_by_1","typeString":"int_const 0"},"value":"0"},"src":"8327:15:4","typeDescriptions":{"typeIdentifier":"t_bool","typeString":"bool"}},"id":920,"nodeType":"IfStatement","src":"8323:46:4","trueBody":{"errorCall":{"arguments":[],"expression":{"argumentTypes":[],"id":917,"name":"InvalidDecayRate","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":609,"src":"8351:16:4","typeDescriptions":{"typeIdentifier":"t_function_error_pure$__$returns$__$","typeString":"function () pure"}},"id":918,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"8351:18:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":919,"nodeType":"RevertStatement","src":"8344:25:4"}},{"expression":{"id":923,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":921,"name":"decayRate","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":581,"src":"8382:9:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"id":922,"name":"_decayRate","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":906,"src":"8394:10:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"8382:22:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":924,"nodeType":"ExpressionStatement","src":"8382:22:4"},{"expression":{"id":927,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"id":925,"name":"pulseAmount","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":584,"src":"8415:11:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"id":926,"name":"_pulseAmount","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":908,"src":"8429:12:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"8415:26:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":928,"nodeType":"ExpressionStatement","src":"8415:26:4"},{"eventCall":{"arguments":[{"id":930,"name":"_decayRate","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":906,"src":"8477:10:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},{"id":931,"name":"_pulseAmount","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":908,"src":"8489:12:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_uint256","typeString":"uint256"},{"typeIdentifier":"t_uint256","typeString":"uint256"}],"id":929,"name":"ParametersUpdated","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":1033,"src":"8459:17:4","typeDescriptions":{"typeIdentifier":"t_function_event_nonpayable$_t_uint256_$_t_uint256_$returns$__$","typeString":"function (uint256,uint256)"}},"id":932,"isConstant":false,"isLValue":false,"isPure":false,"kind":"functionCall","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"8459:43:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_tuple$__$","typeString":"tuple()"}},"id":933,"nodeType":"EmitStatement","src":"8454:48:4"}]},"documentation":{"id":904,"nodeType":"StructuredDocumentation","src":"8021:154:4","text":" @notice Update global metabolic parameters. Strategist only.\n @dev    Spec §1.1 Rule 4: decayRate and pulseAmount adjustable."},"functionSelector":"87693efc","id":935,"implemented":true,"kind":"function","modifiers":[{"id":912,"kind":"modifierInvocation","modifierName":{"id":911,"name":"onlyStrategist","nameLocations":["8297:14:4"],"nodeType":"IdentifierPath","referencedDeclaration":633,"src":"8297:14:4"},"nodeType":"ModifierInvocation","src":"8297:14:4"}],"name":"updateMetabolicParams","nameLocation":"8190:21:4","nodeType":"FunctionDefinition","overrides":{"id":910,"nodeType":"OverrideSpecifier","overrides":[],"src":"8288:8:4"},"parameters":{"id":909,"nodeType":"ParameterList","parameters":[{"constant":false,"id":906,"mutability":"mutable","name":"_decayRate","nameLocation":"8230:10:4","nodeType":"VariableDeclaration","scope":935,"src":"8222:18:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":905,"name":"uint256","nodeType":"ElementaryTypeName","src":"8222:7:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"},{"constant":false,"id":908,"mutability":"mutable","name":"_pulseAmount","nameLocation":"8259:12:4","nodeType":"VariableDeclaration","scope":935,"src":"8251:20:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":907,"name":"uint256","nodeType":"ElementaryTypeName","src":"8251:7:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"8211:67:4"},"returnParameters":{"id":913,"nodeType":"ParameterList","parameters":[],"src":"8312:0:4"},"scope":984,"src":"8181:329:4","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"body":{"id":978,"nodeType":"Block","src":"8823:273:4","statements":[{"assignments":[943],"declarations":[{"constant":false,"id":943,"mutability":"mutable","name":"data","nameLocation":"8852:4:4","nodeType":"VariableDeclaration","scope":978,"src":"8834:22:4","stateVariable":false,"storageLocation":"storage","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData"},"typeName":{"id":942,"nodeType":"UserDefinedTypeName","pathNode":{"id":941,"name":"AgentData","nameLocations":["8834:9:4"],"nodeType":"IdentifierPath","referencedDeclaration":573,"src":"8834:9:4"},"referencedDeclaration":573,"src":"8834:9:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData"}},"visibility":"internal"}],"id":947,"initialValue":{"baseExpression":{"id":944,"name":"agents","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":578,"src":"8859:6:4","typeDescriptions":{"typeIdentifier":"t_mapping$_t_address_$_t_struct$_AgentData_$573_storage_$","typeString":"mapping(address => struct VitalityRegistry.AgentData storage ref)"}},"id":946,"indexExpression":{"id":945,"name":"agent","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":938,"src":"8866:5:4","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"nodeType":"IndexAccess","src":"8859:13:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage","typeString":"struct VitalityRegistry.AgentData storage ref"}},"nodeType":"VariableDeclarationStatement","src":"8834:38:4"},{"assignments":[949],"declarations":[{"constant":false,"id":949,"mutability":"mutable","name":"blocksPassed","nameLocation":"8891:12:4","nodeType":"VariableDeclaration","scope":978,"src":"8883:20:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":948,"name":"uint256","nodeType":"ElementaryTypeName","src":"8883:7:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"id":955,"initialValue":{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":954,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"expression":{"id":950,"name":"block","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-4,"src":"8906:5:4","typeDescriptions":{"typeIdentifier":"t_magic_block","typeString":"block"}},"id":951,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"8912:6:4","memberName":"number","nodeType":"MemberAccess","src":"8906:12:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"-","rightExpression":{"expression":{"id":952,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":943,"src":"8921:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":953,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":false,"memberLocation":"8926:15:4","memberName":"lastUpdateBlock","nodeType":"MemberAccess","referencedDeclaration":568,"src":"8921:20:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"8906:35:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"VariableDeclarationStatement","src":"8883:58:4"},{"assignments":[957],"declarations":[{"constant":false,"id":957,"mutability":"mutable","name":"decayed","nameLocation":"8959:7:4","nodeType":"VariableDeclaration","scope":978,"src":"8952:14:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"},"typeName":{"id":956,"name":"int256","nodeType":"ElementaryTypeName","src":"8952:6:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"visibility":"internal"}],"id":964,"initialValue":{"arguments":[{"commonType":{"typeIdentifier":"t_uint256","typeString":"uint256"},"id":962,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftExpression":{"id":960,"name":"blocksPassed","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":949,"src":"8976:12:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"BinaryOperation","operator":"/","rightExpression":{"id":961,"name":"decayRate","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":581,"src":"8991:9:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"8976:24:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}}],"expression":{"argumentTypes":[{"typeIdentifier":"t_uint256","typeString":"uint256"}],"id":959,"isConstant":false,"isLValue":false,"isPure":true,"lValueRequested":false,"nodeType":"ElementaryTypeNameExpression","src":"8969:6:4","typeDescriptions":{"typeIdentifier":"t_type$_t_int256_$","typeString":"type(int256)"},"typeName":{"id":958,"name":"int256","nodeType":"ElementaryTypeName","src":"8969:6:4","typeDescriptions":{}}},"id":963,"isConstant":false,"isLValue":false,"isPure":false,"kind":"typeConversion","lValueRequested":false,"nameLocations":[],"names":[],"nodeType":"FunctionCall","src":"8969:32:4","tryCall":false,"typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"nodeType":"VariableDeclarationStatement","src":"8952:49:4"},{"expression":{"id":969,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"expression":{"id":965,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":943,"src":"9012:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":967,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"memberLocation":"9017:14:4","memberName":"storedVitality","nodeType":"MemberAccess","referencedDeclaration":566,"src":"9012:19:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"nodeType":"Assignment","operator":"-=","rightHandSide":{"id":968,"name":"decayed","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":957,"src":"9035:7:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"src":"9012:30:4","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"id":970,"nodeType":"ExpressionStatement","src":"9012:30:4"},{"expression":{"id":976,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"leftHandSide":{"expression":{"id":971,"name":"data","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":943,"src":"9053:4:4","typeDescriptions":{"typeIdentifier":"t_struct$_AgentData_$573_storage_ptr","typeString":"struct VitalityRegistry.AgentData storage pointer"}},"id":973,"isConstant":false,"isLValue":true,"isPure":false,"lValueRequested":true,"memberLocation":"9058:15:4","memberName":"lastUpdateBlock","nodeType":"MemberAccess","referencedDeclaration":568,"src":"9053:20:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"nodeType":"Assignment","operator":"=","rightHandSide":{"expression":{"id":974,"name":"block","nodeType":"Identifier","overloadedDeclarations":[],"referencedDeclaration":-4,"src":"9076:5:4","typeDescriptions":{"typeIdentifier":"t_magic_block","typeString":"block"}},"id":975,"isConstant":false,"isLValue":false,"isPure":false,"lValueRequested":false,"memberLocation":"9082:6:4","memberName":"number","nodeType":"MemberAccess","src":"9076:12:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"src":"9053:35:4","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"id":977,"nodeType":"ExpressionStatement","src":"9053:35:4"}]},"documentation":{"id":936,"nodeType":"StructuredDocumentation","src":"8688:84:4","text":" @dev Checkpoint: materialize pending decay into storedVitality."},"id":979,"implemented":true,"kind":"function","modifiers":[],"name":"_checkpoint","nameLocation":"8787:11:4","nodeType":"FunctionDefinition","parameters":{"id":939,"nodeType":"ParameterList","parameters":[{"constant":false,"id":938,"mutability":"mutable","name":"agent","nameLocation":"8807:5:4","nodeType":"VariableDeclaration","scope":979,"src":"8799:13:4","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":937,"name":"address","nodeType":"ElementaryTypeName","src":"8799:7:4","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"8798:15:4"},"returnParameters":{"id":940,"nodeType":"ParameterList","parameters":[],"src":"8823:0:4"},"scope":984,"src":"8778:318:4","stateMutability":"nonpayable","virtual":false,"visibility":"internal"},{"body":{"id":982,"nodeType":"Block","src":"9275:2:4","statements":[]},"id":983,"implemented":true,"kind":"receive","modifiers":[],"name":"","nameLocation":"-1:-1:-1","nodeType":"FunctionDefinition","parameters":{"id":980,"nodeType":"ParameterList","parameters":[],"src":"9255:2:4"},"returnParameters":{"id":981,"nodeType":"ParameterList","parameters":[],"src":"9275:0:4"},"scope":984,"src":"9248:29:4","stateMutability":"payable","virtual":false,"visibility":"external"}],"scope":985,"src":"751:8529:4","usedErrors":[13,18,191,599,601,603,605,607,609],"usedEvents":[24,597,1023,1027,1033]}],"src":"33:9249:4"},"id":4},"contracts/interfaces/IVitalisBounty.sol":{"ast":{"absolutePath":"contracts/interfaces/IVitalisBounty.sol","exportedSymbols":{"IVitalisBounty":[1014]},"id":1015,"license":"MIT","nodeType":"SourceUnit","nodes":[{"id":986,"literals":["solidity","^","0.8",".19"],"nodeType":"PragmaDirective","src":"33:24:5"},{"abstract":false,"baseContracts":[],"canonicalName":"IVitalisBounty","contractDependencies":[],"contractKind":"interface","documentation":{"id":987,"nodeType":"StructuredDocumentation","src":"61:129:5","text":"@title IVitalisBounty — Bounty System Interface (Spec §3.B)\n @notice Canonical interface from Vitalis_Master_Spec.md"},"fullyImplemented":false,"id":1014,"linearizedBaseContracts":[1014],"name":"IVitalisBounty","nameLocation":"200:14:5","nodeType":"ContractDefinition","nodes":[{"anonymous":false,"eventSelector":"a5968139833b3514d7c565f873ebc2a5af89c7f67bd436b227206a21ff73676d","id":993,"name":"BountyCreated","nameLocation":"228:13:5","nodeType":"EventDefinition","parameters":{"id":992,"nodeType":"ParameterList","parameters":[{"constant":false,"id":989,"indexed":true,"mutability":"mutable","name":"bountyId","nameLocation":"258:8:5","nodeType":"VariableDeclaration","scope":993,"src":"242:24:5","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"},"typeName":{"id":988,"name":"bytes32","nodeType":"ElementaryTypeName","src":"242:7:5","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"visibility":"internal"},{"constant":false,"id":991,"indexed":false,"mutability":"mutable","name":"reward","nameLocation":"276:6:5","nodeType":"VariableDeclaration","scope":993,"src":"268:14:5","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":990,"name":"uint256","nodeType":"ElementaryTypeName","src":"268:7:5","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"241:42:5"},"src":"222:62:5"},{"anonymous":false,"eventSelector":"2c87d92d54fcf72b587c92c2d781bc23399eef1715fd00cae882bd1316781a4b","id":999,"name":"SubmissionApproved","nameLocation":"296:18:5","nodeType":"EventDefinition","parameters":{"id":998,"nodeType":"ParameterList","parameters":[{"constant":false,"id":995,"indexed":true,"mutability":"mutable","name":"bountyId","nameLocation":"331:8:5","nodeType":"VariableDeclaration","scope":999,"src":"315:24:5","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"},"typeName":{"id":994,"name":"bytes32","nodeType":"ElementaryTypeName","src":"315:7:5","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"visibility":"internal"},{"constant":false,"id":997,"indexed":true,"mutability":"mutable","name":"worker","nameLocation":"357:6:5","nodeType":"VariableDeclaration","scope":999,"src":"341:22:5","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":996,"name":"address","nodeType":"ElementaryTypeName","src":"341:7:5","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"314:50:5"},"src":"290:75:5"},{"functionSelector":"06868c4b","id":1006,"implemented":false,"kind":"function","modifiers":[],"name":"createBounty","nameLocation":"382:12:5","nodeType":"FunctionDefinition","parameters":{"id":1002,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1001,"mutability":"mutable","name":"metadataURI","nameLocation":"411:11:5","nodeType":"VariableDeclaration","scope":1006,"src":"395:27:5","stateVariable":false,"storageLocation":"calldata","typeDescriptions":{"typeIdentifier":"t_string_calldata_ptr","typeString":"string"},"typeName":{"id":1000,"name":"string","nodeType":"ElementaryTypeName","src":"395:6:5","typeDescriptions":{"typeIdentifier":"t_string_storage_ptr","typeString":"string"}},"visibility":"internal"}],"src":"394:29:5"},"returnParameters":{"id":1005,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1004,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1006,"src":"450:7:5","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"},"typeName":{"id":1003,"name":"bytes32","nodeType":"ElementaryTypeName","src":"450:7:5","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"visibility":"internal"}],"src":"449:9:5"},"scope":1014,"src":"373:86:5","stateMutability":"payable","virtual":false,"visibility":"external"},{"functionSelector":"cce5b74b","id":1013,"implemented":false,"kind":"function","modifiers":[],"name":"approveSubmission","nameLocation":"474:17:5","nodeType":"FunctionDefinition","parameters":{"id":1011,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1008,"mutability":"mutable","name":"bountyId","nameLocation":"500:8:5","nodeType":"VariableDeclaration","scope":1013,"src":"492:16:5","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"},"typeName":{"id":1007,"name":"bytes32","nodeType":"ElementaryTypeName","src":"492:7:5","typeDescriptions":{"typeIdentifier":"t_bytes32","typeString":"bytes32"}},"visibility":"internal"},{"constant":false,"id":1010,"mutability":"mutable","name":"worker","nameLocation":"518:6:5","nodeType":"VariableDeclaration","scope":1013,"src":"510:14:5","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1009,"name":"address","nodeType":"ElementaryTypeName","src":"510:7:5","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"491:34:5"},"returnParameters":{"id":1012,"nodeType":"ParameterList","parameters":[],"src":"534:0:5"},"scope":1014,"src":"465:70:5","stateMutability":"nonpayable","virtual":false,"visibility":"external"}],"scope":1015,"src":"190:377:5","usedErrors":[],"usedEvents":[993,999]}],"src":"33:536:5"},"id":5},"contracts/interfaces/IVitalityRegistry.sol":{"ast":{"absolutePath":"contracts/interfaces/IVitalityRegistry.sol","exportedSymbols":{"IVitalityRegistry":[1058]},"id":1059,"license":"MIT","nodeType":"SourceUnit","nodes":[{"id":1016,"literals":["solidity","^","0.8",".19"],"nodeType":"PragmaDirective","src":"33:24:6"},{"abstract":false,"baseContracts":[],"canonicalName":"IVitalityRegistry","contractDependencies":[],"contractKind":"interface","documentation":{"id":1017,"nodeType":"StructuredDocumentation","src":"61:134:6","text":"@title IVitalityRegistry — Core Metabolism Interface (Spec §3.A)\n @notice Canonical interface from Vitalis_Master_Spec.md"},"fullyImplemented":false,"id":1058,"linearizedBaseContracts":[1058],"name":"IVitalityRegistry","nameLocation":"205:17:6","nodeType":"ContractDefinition","nodes":[{"anonymous":false,"eventSelector":"d7563a2b45d0b0f1b01b82db96ae4752fe46daa24649b6076762ae631a0cdd2b","id":1023,"name":"VitalityPulse","nameLocation":"236:13:6","nodeType":"EventDefinition","parameters":{"id":1022,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1019,"indexed":true,"mutability":"mutable","name":"agent","nameLocation":"266:5:6","nodeType":"VariableDeclaration","scope":1023,"src":"250:21:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1018,"name":"address","nodeType":"ElementaryTypeName","src":"250:7:6","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"},{"constant":false,"id":1021,"indexed":false,"mutability":"mutable","name":"newAmount","nameLocation":"281:9:6","nodeType":"VariableDeclaration","scope":1023,"src":"273:17:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1020,"name":"uint256","nodeType":"ElementaryTypeName","src":"273:7:6","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"249:42:6"},"src":"230:62:6"},{"anonymous":false,"eventSelector":"3481493766137a21a43eefafc4c946920d719b13638a00ce8eb791ec28cc9ef4","id":1027,"name":"AgentPruned","nameLocation":"304:11:6","nodeType":"EventDefinition","parameters":{"id":1026,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1025,"indexed":true,"mutability":"mutable","name":"agent","nameLocation":"332:5:6","nodeType":"VariableDeclaration","scope":1027,"src":"316:21:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1024,"name":"address","nodeType":"ElementaryTypeName","src":"316:7:6","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"315:23:6"},"src":"298:41:6"},{"anonymous":false,"eventSelector":"faccb0639ff7851e0e24f3b2d9ab03cd62ffb63f5b4d90aaeff85bb078c1fa48","id":1033,"name":"ParametersUpdated","nameLocation":"351:17:6","nodeType":"EventDefinition","parameters":{"id":1032,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1029,"indexed":false,"mutability":"mutable","name":"newDecayRate","nameLocation":"377:12:6","nodeType":"VariableDeclaration","scope":1033,"src":"369:20:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1028,"name":"uint256","nodeType":"ElementaryTypeName","src":"369:7:6","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"},{"constant":false,"id":1031,"indexed":false,"mutability":"mutable","name":"newPulseAmount","nameLocation":"399:14:6","nodeType":"VariableDeclaration","scope":1033,"src":"391:22:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1030,"name":"uint256","nodeType":"ElementaryTypeName","src":"391:7:6","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"368:46:6"},"src":"345:70:6"},{"functionSelector":"2f36b5d9","id":1040,"implemented":false,"kind":"function","modifiers":[],"name":"getVitality","nameLocation":"456:11:6","nodeType":"FunctionDefinition","parameters":{"id":1036,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1035,"mutability":"mutable","name":"agent","nameLocation":"476:5:6","nodeType":"VariableDeclaration","scope":1040,"src":"468:13:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1034,"name":"address","nodeType":"ElementaryTypeName","src":"468:7:6","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"467:15:6"},"returnParameters":{"id":1039,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1038,"mutability":"mutable","name":"","nameLocation":"-1:-1:-1","nodeType":"VariableDeclaration","scope":1040,"src":"506:6:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"},"typeName":{"id":1037,"name":"int256","nodeType":"ElementaryTypeName","src":"506:6:6","typeDescriptions":{"typeIdentifier":"t_int256","typeString":"int256"}},"visibility":"internal"}],"src":"505:8:6"},"scope":1058,"src":"447:67:6","stateMutability":"view","virtual":false,"visibility":"external"},{"functionSelector":"8e97fdc3","id":1045,"implemented":false,"kind":"function","modifiers":[],"name":"pulse","nameLocation":"529:5:6","nodeType":"FunctionDefinition","parameters":{"id":1043,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1042,"mutability":"mutable","name":"agent","nameLocation":"543:5:6","nodeType":"VariableDeclaration","scope":1045,"src":"535:13:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1041,"name":"address","nodeType":"ElementaryTypeName","src":"535:7:6","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"534:15:6"},"returnParameters":{"id":1044,"nodeType":"ParameterList","parameters":[],"src":"558:0:6"},"scope":1058,"src":"520:39:6","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"functionSelector":"0f3cca49","id":1050,"implemented":false,"kind":"function","modifiers":[],"name":"prune","nameLocation":"604:5:6","nodeType":"FunctionDefinition","parameters":{"id":1048,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1047,"mutability":"mutable","name":"agent","nameLocation":"618:5:6","nodeType":"VariableDeclaration","scope":1050,"src":"610:13:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"},"typeName":{"id":1046,"name":"address","nodeType":"ElementaryTypeName","src":"610:7:6","stateMutability":"nonpayable","typeDescriptions":{"typeIdentifier":"t_address","typeString":"address"}},"visibility":"internal"}],"src":"609:15:6"},"returnParameters":{"id":1049,"nodeType":"ParameterList","parameters":[],"src":"633:0:6"},"scope":1058,"src":"595:39:6","stateMutability":"nonpayable","virtual":false,"visibility":"external"},{"functionSelector":"87693efc","id":1057,"implemented":false,"kind":"function","modifiers":[],"name":"updateMetabolicParams","nameLocation":"706:21:6","nodeType":"FunctionDefinition","parameters":{"id":1055,"nodeType":"ParameterList","parameters":[{"constant":false,"id":1052,"mutability":"mutable","name":"_decayRate","nameLocation":"736:10:6","nodeType":"VariableDeclaration","scope":1057,"src":"728:18:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1051,"name":"uint256","nodeType":"ElementaryTypeName","src":"728:7:6","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"},{"constant":false,"id":1054,"mutability":"mutable","name":"_pulseAmount","nameLocation":"756:12:6","nodeType":"VariableDeclaration","scope":1057,"src":"748:20:6","stateVariable":false,"storageLocation":"default","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"},"typeName":{"id":1053,"name":"uint256","nodeType":"ElementaryTypeName","src":"748:7:6","typeDescriptions":{"typeIdentifier":"t_uint256","typeString":"uint256"}},"visibility":"internal"}],"src":"727:42:6"},"returnParameters":{"id":1056,"nodeType":"ParameterList","parameters":[],"src":"778:0:6"},"scope":1058,"src":"697:82:6","stateMutability":"nonpayable","virtual":false,"visibility":"external"}],"scope":1059,"src":"195:587:6","usedErrors":[],"usedEvents":[1023,1027,1033]}],"src":"33:751:6"},"id":6}},"contracts":{"@openzeppelin/contracts/access/Ownable.sol":{"Ownable":{"abi":[{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}],"evm":{"bytecode":{"functionDebugData":{},"generatedSources":[],"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"deployedBytecode":{"functionDebugData":{},"generatedSources":[],"immutableReferences":{},"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"methodIdentifiers":{"owner()":"8da5cb5b","renounceOwnership()":"715018a6","transferOwnership(address)":"f2fde38b"}},"metadata":"{\"compiler\":{\"version\":\"0.8.20+commit.a1b79de6\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"details\":\"Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions. The initial owner is set to the address provided by the deployer. This can later be changed with {transferOwnership}. This module is used through inheritance. It will make available the modifier `onlyOwner`, which can be applied to your functions to restrict their use to the owner.\",\"errors\":{\"OwnableInvalidOwner(address)\":[{\"details\":\"The owner is not a valid owner account. (eg. `address(0)`)\"}],\"OwnableUnauthorizedAccount(address)\":[{\"details\":\"The caller account is not authorized to perform an operation.\"}]},\"kind\":\"dev\",\"methods\":{\"constructor\":{\"details\":\"Initializes the contract setting the address provided by the deployer as the initial owner.\"},\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"renounceOwnership()\":{\"details\":\"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.\"},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"}},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"@openzeppelin/contracts/access/Ownable.sol\":\"Ownable\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/access/Ownable.sol\":{\"keccak256\":\"0xff6d0bb2e285473e5311d9d3caacb525ae3538a80758c10649a4d61029b017bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8ed324d3920bb545059d66ab97d43e43ee85fd3bd52e03e401f020afb0b120f6\",\"dweb:/ipfs/QmfEckWLmZkDDcoWrkEvMWhms66xwTLff9DDhegYpvHo1a\"]},\"@openzeppelin/contracts/utils/Context.sol\":{\"keccak256\":\"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12\",\"dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF\"]}},\"version\":1}"}},"@openzeppelin/contracts/utils/Context.sol":{"Context":{"abi":[],"evm":{"bytecode":{"functionDebugData":{},"generatedSources":[],"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"deployedBytecode":{"functionDebugData":{},"generatedSources":[],"immutableReferences":{},"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"methodIdentifiers":{}},"metadata":"{\"compiler\":{\"version\":\"0.8.20+commit.a1b79de6\"},\"language\":\"Solidity\",\"output\":{\"abi\":[],\"devdoc\":{\"details\":\"Provides information about the current execution context, including the sender of the transaction and its data. While these are generally available via msg.sender and msg.data, they should not be accessed in such a direct manner, since when dealing with meta-transactions the account sending and paying for execution may not be the actual sender (as far as an application is concerned). This contract is only required for intermediate, library-like contracts.\",\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"@openzeppelin/contracts/utils/Context.sol\":\"Context\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/utils/Context.sol\":{\"keccak256\":\"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12\",\"dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF\"]}},\"version\":1}"}},"@openzeppelin/contracts/utils/ReentrancyGuard.sol":{"ReentrancyGuard":{"abi":[{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"}],"evm":{"bytecode":{"functionDebugData":{},"generatedSources":[],"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"deployedBytecode":{"functionDebugData":{},"generatedSources":[],"immutableReferences":{},"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"methodIdentifiers":{}},"metadata":"{\"compiler\":{\"version\":\"0.8.20+commit.a1b79de6\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"}],\"devdoc\":{\"details\":\"Contract module that helps prevent reentrant calls to a function. Inheriting from `ReentrancyGuard` will make the {nonReentrant} modifier available, which can be applied to functions to make sure there are no nested (reentrant) calls to them. Note that because there is a single `nonReentrant` guard, functions marked as `nonReentrant` may not call one another. This can be worked around by making those functions `private`, and then adding `external` `nonReentrant` entry points to them. TIP: If EIP-1153 (transient storage) is available on the chain you're deploying at, consider using {ReentrancyGuardTransient} instead. TIP: If you would like to learn more about reentrancy and alternative ways to protect against it, check out our blog post https://blog.openzeppelin.com/reentrancy-after-istanbul/[Reentrancy After Istanbul].\",\"errors\":{\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"version\":1}},\"settings\":{\"compilationTarget\":{\"@openzeppelin/contracts/utils/ReentrancyGuard.sol\":\"ReentrancyGuard\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0x11a5a79827df29e915a12740caf62fe21ebe27c08c9ae3e09abe9ee3ba3866d3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3cf0c69ab827e3251db9ee6a50647d62c90ba580a4d7bbff21f2bea39e7b2f4a\",\"dweb:/ipfs/QmZiKwtKU1SBX4RGfQtY7PZfiapbbu6SZ9vizGQD9UHjRA\"]}},\"version\":1}"}},"contracts/VitalisBounty.sol":{"VitalisBounty":{"abi":[{"inputs":[{"internalType":"address","name":"_registry","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"BountyAlreadyCompleted","type":"error"},{"inputs":[],"name":"BountyNotActive","type":"error"},{"inputs":[],"name":"BountyNotFound","type":"error"},{"inputs":[],"name":"InsufficientReward","type":"error"},{"inputs":[],"name":"NotApprover","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"inputs":[],"name":"TransferFailed","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"bountyId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"BountyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"bountyId","type":"bytes32"},{"indexed":true,"internalType":"address","name":"worker","type":"address"}],"name":"SubmissionApproved","type":"event"},{"inputs":[{"internalType":"address","name":"_approver","type":"address"}],"name":"addApprover","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"bountyId","type":"bytes32"},{"internalType":"address","name":"worker","type":"address"}],"name":"approveSubmission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"approvers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"bounties","outputs":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"string","name":"metadataURI","type":"string"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"isCompleted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bountyCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"metadataURI","type":"string"}],"name":"createBounty","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"bountyId","type":"bytes32"}],"name":"getBounty","outputs":[{"internalType":"address","name":"creator","type":"address"},{"internalType":"string","name":"metadataURI","type":"string"},{"internalType":"uint256","name":"reward","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"isCompleted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"registry","outputs":[{"internalType":"contract IVitalityRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_approver","type":"address"}],"name":"removeApprover","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],"evm":{"bytecode":{"functionDebugData":{"@_199":{"entryPoint":null,"id":199,"parameterSlots":0,"returnSlots":0},"@_338":{"entryPoint":null,"id":338,"parameterSlots":1,"returnSlots":0},"@_50":{"entryPoint":null,"id":50,"parameterSlots":1,"returnSlots":0},"@_transferOwnership_146":{"entryPoint":164,"id":146,"parameterSlots":1,"returnSlots":0},"abi_decode_tuple_t_address_fromMemory":{"entryPoint":244,"id":null,"parameterSlots":2,"returnSlots":1},"abi_encode_tuple_t_address__to_t_address__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1}},"generatedSources":[{"ast":{"nodeType":"YulBlock","src":"0:514:7","statements":[{"nodeType":"YulBlock","src":"6:3:7","statements":[]},{"body":{"nodeType":"YulBlock","src":"95:209:7","statements":[{"body":{"nodeType":"YulBlock","src":"141:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"150:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"153:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"143:6:7"},"nodeType":"YulFunctionCall","src":"143:12:7"},"nodeType":"YulExpressionStatement","src":"143:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"dataEnd","nodeType":"YulIdentifier","src":"116:7:7"},{"name":"headStart","nodeType":"YulIdentifier","src":"125:9:7"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"112:3:7"},"nodeType":"YulFunctionCall","src":"112:23:7"},{"kind":"number","nodeType":"YulLiteral","src":"137:2:7","type":"","value":"32"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"108:3:7"},"nodeType":"YulFunctionCall","src":"108:32:7"},"nodeType":"YulIf","src":"105:52:7"},{"nodeType":"YulVariableDeclaration","src":"166:29:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"185:9:7"}],"functionName":{"name":"mload","nodeType":"YulIdentifier","src":"179:5:7"},"nodeType":"YulFunctionCall","src":"179:16:7"},"variables":[{"name":"value","nodeType":"YulTypedName","src":"170:5:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"258:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"267:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"270:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"260:6:7"},"nodeType":"YulFunctionCall","src":"260:12:7"},"nodeType":"YulExpressionStatement","src":"260:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"217:5:7"},{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"228:5:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"243:3:7","type":"","value":"160"},{"kind":"number","nodeType":"YulLiteral","src":"248:1:7","type":"","value":"1"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"239:3:7"},"nodeType":"YulFunctionCall","src":"239:11:7"},{"kind":"number","nodeType":"YulLiteral","src":"252:1:7","type":"","value":"1"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"235:3:7"},"nodeType":"YulFunctionCall","src":"235:19:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"224:3:7"},"nodeType":"YulFunctionCall","src":"224:31:7"}],"functionName":{"name":"eq","nodeType":"YulIdentifier","src":"214:2:7"},"nodeType":"YulFunctionCall","src":"214:42:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"207:6:7"},"nodeType":"YulFunctionCall","src":"207:50:7"},"nodeType":"YulIf","src":"204:70:7"},{"nodeType":"YulAssignment","src":"283:15:7","value":{"name":"value","nodeType":"YulIdentifier","src":"293:5:7"},"variableNames":[{"name":"value0","nodeType":"YulIdentifier","src":"283:6:7"}]}]},"name":"abi_decode_tuple_t_address_fromMemory","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"61:9:7","type":""},{"name":"dataEnd","nodeType":"YulTypedName","src":"72:7:7","type":""}],"returnVariables":[{"name":"value0","nodeType":"YulTypedName","src":"84:6:7","type":""}],"src":"14:290:7"},{"body":{"nodeType":"YulBlock","src":"410:102:7","statements":[{"nodeType":"YulAssignment","src":"420:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"432:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"443:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"428:3:7"},"nodeType":"YulFunctionCall","src":"428:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"420:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"462:9:7"},{"arguments":[{"name":"value0","nodeType":"YulIdentifier","src":"477:6:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"493:3:7","type":"","value":"160"},{"kind":"number","nodeType":"YulLiteral","src":"498:1:7","type":"","value":"1"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"489:3:7"},"nodeType":"YulFunctionCall","src":"489:11:7"},{"kind":"number","nodeType":"YulLiteral","src":"502:1:7","type":"","value":"1"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"485:3:7"},"nodeType":"YulFunctionCall","src":"485:19:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"473:3:7"},"nodeType":"YulFunctionCall","src":"473:32:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"455:6:7"},"nodeType":"YulFunctionCall","src":"455:51:7"},"nodeType":"YulExpressionStatement","src":"455:51:7"}]},"name":"abi_encode_tuple_t_address__to_t_address__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"379:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"390:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"401:4:7","type":""}],"src":"309:203:7"}]},"contents":"{\n    { }\n    function abi_decode_tuple_t_address_fromMemory(headStart, dataEnd) -> value0\n    {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n        let value := mload(headStart)\n        if iszero(eq(value, and(value, sub(shl(160, 1), 1)))) { revert(0, 0) }\n        value0 := value\n    }\n    function abi_encode_tuple_t_address__to_t_address__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n}","id":7,"language":"Yul","name":"#utility.yul"}],"linkReferences":{},"object":"608060405234801561001057600080fd5b50604051610d90380380610d9083398101604081905261002f916100f4565b338061005557604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61005e816100a4565b506001808055600280546001600160a01b0319166001600160a01b039390931692909217909155336000908152600560205260409020805460ff19169091179055610124565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561010657600080fd5b81516001600160a01b038116811461011d57600080fd5b9392505050565b610c5d806101336000396000f3fe6080604052600436106100ab5760003560e01c80637b103999116100645780637b1039991461019b5780638da5cb5b146101d3578063b646c194146101f1578063bf5522da14610211578063cce5b74b14610231578063f2fde38b1461025157600080fd5b806306868c4b146100b75780630a144391146100dd5780632417395c1461011d5780633e362c961461014e5780636cf4c88f14610164578063715018a61461018657600080fd5b366100b257005b600080fd5b6100ca6100c53660046108f5565b610271565b6040519081526020015b60405180910390f35b3480156100e957600080fd5b5061010d6100f8366004610983565b60056020526000908152604090205460ff1681565b60405190151581526020016100d4565b34801561012957600080fd5b5061013d6101383660046109a5565b6103f2565b6040516100d49594939291906109be565b34801561015a57600080fd5b506100ca60045481565b34801561017057600080fd5b5061018461017f366004610983565b6104da565b005b34801561019257600080fd5b50610184610503565b3480156101a757600080fd5b506002546101bb906001600160a01b031681565b6040516001600160a01b0390911681526020016100d4565b3480156101df57600080fd5b506000546001600160a01b03166101bb565b3480156101fd57600080fd5b5061018461020c366004610983565b610517565b34801561021d57600080fd5b5061013d61022c3660046109a5565b610543565b34801561023d57600080fd5b5061018461024c366004610a3b565b61060b565b34801561025d57600080fd5b5061018461026c366004610983565b61080b565b60003460000361029457604051636bbdb6db60e11b815260040160405180910390fd5b600480549060006102a483610a67565b9190505550600033848434436004546040516020016102c896959493929190610a8e565b60408051601f19818403018152828252805160209182012060a0840183523384528251601f880183900483028101830190935286835293508281019190879087908190840183828082843760009201829052509385525050346020808501919091526001604080860182905260609095018490528684526003825293909220845181546001600160a01b0319166001600160a01b03909116178155918401519192830191610377915082610b67565b50604082810151600283015560608301516003909201805460809094015161ffff1990941692151561ff00191692909217610100931515939093029290921790555134815281907fa5968139833b3514d7c565f873ebc2a5af89c7f67bd436b227206a21ff73676d9060200160405180910390a29392505050565b60008181526003602081905260408220805460028201549282015460018301805460609587958695869591946001600160a01b039091169390929160ff808216926101009092041690849061044690610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461047290610ade565b80156104bf5780601f10610494576101008083540402835291602001916104bf565b820191906000526020600020905b8154815290600101906020018083116104a257829003601f168201915b50505050509350955095509550955095505091939590929450565b6104e261084e565b6001600160a01b03166000908152600560205260409020805460ff19169055565b61050b61084e565b610515600061087b565b565b61051f61084e565b6001600160a01b03166000908152600560205260409020805460ff19166001179055565b600360205260009081526040902080546001820180546001600160a01b03909216929161056f90610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461059b90610ade565b80156105e85780601f106105bd576101008083540402835291602001916105e8565b820191906000526020600020905b8154815290600101906020018083116105cb57829003601f168201915b50505050600283015460039093015491929160ff80821692506101009091041685565b3360009081526005602052604090205460ff1615801561063657506000546001600160a01b03163314155b1561065457604051630197e13360e61b815260040160405180910390fd5b61065c6108cb565b60008281526003602081905260409091209081015460ff166106915760405163226d32fb60e21b815260040160405180910390fd5b6003810154610100900460ff16156106bc576040516326182e5f60e11b815260040160405180910390fd5b80600201546000036106e1576040516324ce57e760e21b815260040160405180910390fd5b60038101805461ffff191661010017905560028101546040516000916001600160a01b038516918381818185875af1925050503d8060008114610740576040519150601f19603f3d011682016040523d82523d6000602084013e610745565b606091505b5050905080610767576040516312171d8360e31b815260040160405180910390fd5b600254604051638e97fdc360e01b81526001600160a01b03858116600483015290911690638e97fdc390602401600060405180830381600087803b1580156107ae57600080fd5b505af11580156107c2573d6000803e3d6000fd5b50506040516001600160a01b03861692508691507f2c87d92d54fcf72b587c92c2d781bc23399eef1715fd00cae882bd1316781a4b90600090a3505061080760018055565b5050565b61081361084e565b6001600160a01b03811661084257604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61084b8161087b565b50565b6000546001600160a01b031633146105155760405163118cdaa760e01b8152336004820152602401610839565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6002600154036108ee57604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6000806020838503121561090857600080fd5b823567ffffffffffffffff8082111561092057600080fd5b818501915085601f83011261093457600080fd5b81358181111561094357600080fd5b86602082850101111561095557600080fd5b60209290920196919550909350505050565b80356001600160a01b038116811461097e57600080fd5b919050565b60006020828403121561099557600080fd5b61099e82610967565b9392505050565b6000602082840312156109b757600080fd5b5035919050565b60018060a01b03861681526000602060a08184015286518060a085015260005b818110156109fa5788810183015185820160c0015282016109de565b50600060c0828601015260c0601f19601f83011685010192505050846040830152610a29606083018515159052565b82151560808301529695505050505050565b60008060408385031215610a4e57600080fd5b82359150610a5e60208401610967565b90509250929050565b600060018201610a8757634e487b7160e01b600052601160045260246000fd5b5060010190565b6bffffffffffffffffffffffff198760601b1681528486601483013760149401938401929092526034830152605482015260740192915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680610af257607f821691505b602082108103610b1257634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610b6257600081815260208120601f850160051c81016020861015610b3f5750805b601f850160051c820191505b81811015610b5e57828155600101610b4b565b5050505b505050565b815167ffffffffffffffff811115610b8157610b81610ac8565b610b9581610b8f8454610ade565b84610b18565b602080601f831160018114610bca5760008415610bb25750858301515b600019600386901b1c1916600185901b178555610b5e565b600085815260208120601f198616915b82811015610bf957888601518255948401946001909101908401610bda565b5085821015610c175787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220234ff02bc4c745dcd853431b948b046aca836d4dff35c0c3fb926ce62c18269364736f6c63430008140033","opcodes":"PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD PUSH2 0xD90 CODESIZE SUB DUP1 PUSH2 0xD90 DUP4 CODECOPY DUP2 ADD PUSH1 0x40 DUP2 SWAP1 MSTORE PUSH2 0x2F SWAP2 PUSH2 0xF4 JUMP JUMPDEST CALLER DUP1 PUSH2 0x55 JUMPI PUSH1 0x40 MLOAD PUSH4 0x1E4FBDF7 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x0 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x5E DUP2 PUSH2 0xA4 JUMP JUMPDEST POP PUSH1 0x1 DUP1 DUP1 SSTORE PUSH1 0x2 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP4 SWAP1 SWAP4 AND SWAP3 SWAP1 SWAP3 OR SWAP1 SWAP2 SSTORE CALLER PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0xFF NOT AND SWAP1 SWAP2 OR SWAP1 SSTORE PUSH2 0x124 JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT DUP4 AND DUP2 OR DUP5 SSTORE PUSH1 0x40 MLOAD SWAP2 SWAP1 SWAP3 AND SWAP3 DUP4 SWAP2 PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 SWAP2 SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x106 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0x11D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH2 0xC5D DUP1 PUSH2 0x133 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xAB JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x7B103999 GT PUSH2 0x64 JUMPI DUP1 PUSH4 0x7B103999 EQ PUSH2 0x19B JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x1D3 JUMPI DUP1 PUSH4 0xB646C194 EQ PUSH2 0x1F1 JUMPI DUP1 PUSH4 0xBF5522DA EQ PUSH2 0x211 JUMPI DUP1 PUSH4 0xCCE5B74B EQ PUSH2 0x231 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x251 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x6868C4B EQ PUSH2 0xB7 JUMPI DUP1 PUSH4 0xA144391 EQ PUSH2 0xDD JUMPI DUP1 PUSH4 0x2417395C EQ PUSH2 0x11D JUMPI DUP1 PUSH4 0x3E362C96 EQ PUSH2 0x14E JUMPI DUP1 PUSH4 0x6CF4C88F EQ PUSH2 0x164 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0x186 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST CALLDATASIZE PUSH2 0xB2 JUMPI STOP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xCA PUSH2 0xC5 CALLDATASIZE PUSH1 0x4 PUSH2 0x8F5 JUMP JUMPDEST PUSH2 0x271 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xE9 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x10D PUSH2 0xF8 CALLDATASIZE PUSH1 0x4 PUSH2 0x983 JUMP JUMPDEST PUSH1 0x5 PUSH1 0x20 MSTORE PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH1 0xFF AND DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xD4 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x129 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x13D PUSH2 0x138 CALLDATASIZE PUSH1 0x4 PUSH2 0x9A5 JUMP JUMPDEST PUSH2 0x3F2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xD4 SWAP6 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x9BE JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x15A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xCA PUSH1 0x4 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x170 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x17F CALLDATASIZE PUSH1 0x4 PUSH2 0x983 JUMP JUMPDEST PUSH2 0x4DA JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x192 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x503 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1A7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x2 SLOAD PUSH2 0x1BB SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xD4 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1DF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x1BB JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1FD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x20C CALLDATASIZE PUSH1 0x4 PUSH2 0x983 JUMP JUMPDEST PUSH2 0x517 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x21D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x13D PUSH2 0x22C CALLDATASIZE PUSH1 0x4 PUSH2 0x9A5 JUMP JUMPDEST PUSH2 0x543 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x23D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x24C CALLDATASIZE PUSH1 0x4 PUSH2 0xA3B JUMP JUMPDEST PUSH2 0x60B JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x25D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x26C CALLDATASIZE PUSH1 0x4 PUSH2 0x983 JUMP JUMPDEST PUSH2 0x80B JUMP JUMPDEST PUSH1 0x0 CALLVALUE PUSH1 0x0 SUB PUSH2 0x294 JUMPI PUSH1 0x40 MLOAD PUSH4 0x6BBDB6DB PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x4 DUP1 SLOAD SWAP1 PUSH1 0x0 PUSH2 0x2A4 DUP4 PUSH2 0xA67 JUMP JUMPDEST SWAP2 SWAP1 POP SSTORE POP PUSH1 0x0 CALLER DUP5 DUP5 CALLVALUE NUMBER PUSH1 0x4 SLOAD PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0x2C8 SWAP7 SWAP6 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0xA8E JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0x1F NOT DUP2 DUP5 SUB ADD DUP2 MSTORE DUP3 DUP3 MSTORE DUP1 MLOAD PUSH1 0x20 SWAP2 DUP3 ADD KECCAK256 PUSH1 0xA0 DUP5 ADD DUP4 MSTORE CALLER DUP5 MSTORE DUP3 MLOAD PUSH1 0x1F DUP9 ADD DUP4 SWAP1 DIV DUP4 MUL DUP2 ADD DUP4 ADD SWAP1 SWAP4 MSTORE DUP7 DUP4 MSTORE SWAP4 POP DUP3 DUP2 ADD SWAP2 SWAP1 DUP8 SWAP1 DUP8 SWAP1 DUP2 SWAP1 DUP5 ADD DUP4 DUP3 DUP1 DUP3 DUP5 CALLDATACOPY PUSH1 0x0 SWAP3 ADD DUP3 SWAP1 MSTORE POP SWAP4 DUP6 MSTORE POP POP CALLVALUE PUSH1 0x20 DUP1 DUP6 ADD SWAP2 SWAP1 SWAP2 MSTORE PUSH1 0x1 PUSH1 0x40 DUP1 DUP7 ADD DUP3 SWAP1 MSTORE PUSH1 0x60 SWAP1 SWAP6 ADD DUP5 SWAP1 MSTORE DUP7 DUP5 MSTORE PUSH1 0x3 DUP3 MSTORE SWAP4 SWAP1 SWAP3 KECCAK256 DUP5 MLOAD DUP2 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND OR DUP2 SSTORE SWAP2 DUP5 ADD MLOAD SWAP2 SWAP3 DUP4 ADD SWAP2 PUSH2 0x377 SWAP2 POP DUP3 PUSH2 0xB67 JUMP JUMPDEST POP PUSH1 0x40 DUP3 DUP2 ADD MLOAD PUSH1 0x2 DUP4 ADD SSTORE PUSH1 0x60 DUP4 ADD MLOAD PUSH1 0x3 SWAP1 SWAP3 ADD DUP1 SLOAD PUSH1 0x80 SWAP1 SWAP5 ADD MLOAD PUSH2 0xFFFF NOT SWAP1 SWAP5 AND SWAP3 ISZERO ISZERO PUSH2 0xFF00 NOT AND SWAP3 SWAP1 SWAP3 OR PUSH2 0x100 SWAP4 ISZERO ISZERO SWAP4 SWAP1 SWAP4 MUL SWAP3 SWAP1 SWAP3 OR SWAP1 SSTORE MLOAD CALLVALUE DUP2 MSTORE DUP2 SWAP1 PUSH32 0xA5968139833B3514D7C565F873EBC2A5AF89C7F67BD436B227206A21FF73676D SWAP1 PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG2 SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 DUP3 KECCAK256 DUP1 SLOAD PUSH1 0x2 DUP3 ADD SLOAD SWAP3 DUP3 ADD SLOAD PUSH1 0x1 DUP4 ADD DUP1 SLOAD PUSH1 0x60 SWAP6 DUP8 SWAP6 DUP7 SWAP6 DUP7 SWAP6 SWAP2 SWAP5 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP4 SWAP1 SWAP3 SWAP2 PUSH1 0xFF DUP1 DUP3 AND SWAP3 PUSH2 0x100 SWAP1 SWAP3 DIV AND SWAP1 DUP5 SWAP1 PUSH2 0x446 SWAP1 PUSH2 0xADE JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x472 SWAP1 PUSH2 0xADE JUMP JUMPDEST DUP1 ISZERO PUSH2 0x4BF JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x494 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x4BF JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x4A2 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP4 POP SWAP6 POP SWAP6 POP SWAP6 POP SWAP6 POP SWAP6 POP POP SWAP2 SWAP4 SWAP6 SWAP1 SWAP3 SWAP5 POP JUMP JUMPDEST PUSH2 0x4E2 PUSH2 0x84E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0xFF NOT AND SWAP1 SSTORE JUMP JUMPDEST PUSH2 0x50B PUSH2 0x84E JUMP JUMPDEST PUSH2 0x515 PUSH1 0x0 PUSH2 0x87B JUMP JUMPDEST JUMP JUMPDEST PUSH2 0x51F PUSH2 0x84E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0xFF NOT AND PUSH1 0x1 OR SWAP1 SSTORE JUMP JUMPDEST PUSH1 0x3 PUSH1 0x20 MSTORE PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0x1 DUP3 ADD DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP3 AND SWAP3 SWAP2 PUSH2 0x56F SWAP1 PUSH2 0xADE JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x59B SWAP1 PUSH2 0xADE JUMP JUMPDEST DUP1 ISZERO PUSH2 0x5E8 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x5BD JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x5E8 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x5CB JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP PUSH1 0x2 DUP4 ADD SLOAD PUSH1 0x3 SWAP1 SWAP4 ADD SLOAD SWAP2 SWAP3 SWAP2 PUSH1 0xFF DUP1 DUP3 AND SWAP3 POP PUSH2 0x100 SWAP1 SWAP2 DIV AND DUP6 JUMP JUMPDEST CALLER PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH1 0xFF AND ISZERO DUP1 ISZERO PUSH2 0x636 JUMPI POP PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ ISZERO JUMPDEST ISZERO PUSH2 0x654 JUMPI PUSH1 0x40 MLOAD PUSH4 0x197E133 PUSH1 0xE6 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x65C PUSH2 0x8CB JUMP JUMPDEST PUSH1 0x0 DUP3 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 SWAP1 DUP2 ADD SLOAD PUSH1 0xFF AND PUSH2 0x691 JUMPI PUSH1 0x40 MLOAD PUSH4 0x226D32FB PUSH1 0xE2 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x3 DUP2 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND ISZERO PUSH2 0x6BC JUMPI PUSH1 0x40 MLOAD PUSH4 0x26182E5F PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x2 ADD SLOAD PUSH1 0x0 SUB PUSH2 0x6E1 JUMPI PUSH1 0x40 MLOAD PUSH4 0x24CE57E7 PUSH1 0xE2 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x3 DUP2 ADD DUP1 SLOAD PUSH2 0xFFFF NOT AND PUSH2 0x100 OR SWAP1 SSTORE PUSH1 0x2 DUP2 ADD SLOAD PUSH1 0x40 MLOAD PUSH1 0x0 SWAP2 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP6 AND SWAP2 DUP4 DUP2 DUP2 DUP2 DUP6 DUP8 GAS CALL SWAP3 POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x740 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x745 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP SWAP1 POP DUP1 PUSH2 0x767 JUMPI PUSH1 0x40 MLOAD PUSH4 0x12171D83 PUSH1 0xE3 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 SLOAD PUSH1 0x40 MLOAD PUSH4 0x8E97FDC3 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP6 DUP2 AND PUSH1 0x4 DUP4 ADD MSTORE SWAP1 SWAP2 AND SWAP1 PUSH4 0x8E97FDC3 SWAP1 PUSH1 0x24 ADD PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x7AE JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0x7C2 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP7 AND SWAP3 POP DUP7 SWAP2 POP PUSH32 0x2C87D92D54FCF72B587C92C2D781BC23399EEF1715FD00CAE882BD1316781A4B SWAP1 PUSH1 0x0 SWAP1 LOG3 POP POP PUSH2 0x807 PUSH1 0x1 DUP1 SSTORE JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH2 0x813 PUSH2 0x84E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH2 0x842 JUMPI PUSH1 0x40 MLOAD PUSH4 0x1E4FBDF7 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x0 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x84B DUP2 PUSH2 0x87B JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ PUSH2 0x515 JUMPI PUSH1 0x40 MLOAD PUSH4 0x118CDAA7 PUSH1 0xE0 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD PUSH2 0x839 JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT DUP4 AND DUP2 OR DUP5 SSTORE PUSH1 0x40 MLOAD SWAP2 SWAP1 SWAP3 AND SWAP3 DUP4 SWAP2 PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 SWAP2 SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x2 PUSH1 0x1 SLOAD SUB PUSH2 0x8EE JUMPI PUSH1 0x40 MLOAD PUSH4 0x3EE5AEB5 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 PUSH1 0x1 SSTORE JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x20 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x908 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP3 CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP1 DUP3 GT ISZERO PUSH2 0x920 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 DUP6 ADD SWAP2 POP DUP6 PUSH1 0x1F DUP4 ADD SLT PUSH2 0x934 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD DUP2 DUP2 GT ISZERO PUSH2 0x943 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP7 PUSH1 0x20 DUP3 DUP6 ADD ADD GT ISZERO PUSH2 0x955 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x20 SWAP3 SWAP1 SWAP3 ADD SWAP7 SWAP2 SWAP6 POP SWAP1 SWAP4 POP POP POP POP JUMP JUMPDEST DUP1 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0x97E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x995 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x99E DUP3 PUSH2 0x967 JUMP JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x9B7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x1 DUP1 PUSH1 0xA0 SHL SUB DUP7 AND DUP2 MSTORE PUSH1 0x0 PUSH1 0x20 PUSH1 0xA0 DUP2 DUP5 ADD MSTORE DUP7 MLOAD DUP1 PUSH1 0xA0 DUP6 ADD MSTORE PUSH1 0x0 JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0x9FA JUMPI DUP9 DUP2 ADD DUP4 ADD MLOAD DUP6 DUP3 ADD PUSH1 0xC0 ADD MSTORE DUP3 ADD PUSH2 0x9DE JUMP JUMPDEST POP PUSH1 0x0 PUSH1 0xC0 DUP3 DUP7 ADD ADD MSTORE PUSH1 0xC0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND DUP6 ADD ADD SWAP3 POP POP POP DUP5 PUSH1 0x40 DUP4 ADD MSTORE PUSH2 0xA29 PUSH1 0x60 DUP4 ADD DUP6 ISZERO ISZERO SWAP1 MSTORE JUMP JUMPDEST DUP3 ISZERO ISZERO PUSH1 0x80 DUP4 ADD MSTORE SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0xA4E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP3 CALLDATALOAD SWAP2 POP PUSH2 0xA5E PUSH1 0x20 DUP5 ADD PUSH2 0x967 JUMP JUMPDEST SWAP1 POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 DUP3 ADD PUSH2 0xA87 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP PUSH1 0x1 ADD SWAP1 JUMP JUMPDEST PUSH12 0xFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP8 PUSH1 0x60 SHL AND DUP2 MSTORE DUP5 DUP7 PUSH1 0x14 DUP4 ADD CALLDATACOPY PUSH1 0x14 SWAP5 ADD SWAP4 DUP5 ADD SWAP3 SWAP1 SWAP3 MSTORE PUSH1 0x34 DUP4 ADD MSTORE PUSH1 0x54 DUP3 ADD MSTORE PUSH1 0x74 ADD SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH2 0xAF2 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 SUB PUSH2 0xB12 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x1F DUP3 GT ISZERO PUSH2 0xB62 JUMPI PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x20 DUP2 KECCAK256 PUSH1 0x1F DUP6 ADD PUSH1 0x5 SHR DUP2 ADD PUSH1 0x20 DUP7 LT ISZERO PUSH2 0xB3F JUMPI POP DUP1 JUMPDEST PUSH1 0x1F DUP6 ADD PUSH1 0x5 SHR DUP3 ADD SWAP2 POP JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0xB5E JUMPI DUP3 DUP2 SSTORE PUSH1 0x1 ADD PUSH2 0xB4B JUMP JUMPDEST POP POP POP JUMPDEST POP POP POP JUMP JUMPDEST DUP2 MLOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0xB81 JUMPI PUSH2 0xB81 PUSH2 0xAC8 JUMP JUMPDEST PUSH2 0xB95 DUP2 PUSH2 0xB8F DUP5 SLOAD PUSH2 0xADE JUMP JUMPDEST DUP5 PUSH2 0xB18 JUMP JUMPDEST PUSH1 0x20 DUP1 PUSH1 0x1F DUP4 GT PUSH1 0x1 DUP2 EQ PUSH2 0xBCA JUMPI PUSH1 0x0 DUP5 ISZERO PUSH2 0xBB2 JUMPI POP DUP6 DUP4 ADD MLOAD JUMPDEST PUSH1 0x0 NOT PUSH1 0x3 DUP7 SWAP1 SHL SHR NOT AND PUSH1 0x1 DUP6 SWAP1 SHL OR DUP6 SSTORE PUSH2 0xB5E JUMP JUMPDEST PUSH1 0x0 DUP6 DUP2 MSTORE PUSH1 0x20 DUP2 KECCAK256 PUSH1 0x1F NOT DUP7 AND SWAP2 JUMPDEST DUP3 DUP2 LT ISZERO PUSH2 0xBF9 JUMPI DUP9 DUP7 ADD MLOAD DUP3 SSTORE SWAP5 DUP5 ADD SWAP5 PUSH1 0x1 SWAP1 SWAP2 ADD SWAP1 DUP5 ADD PUSH2 0xBDA JUMP JUMPDEST POP DUP6 DUP3 LT ISZERO PUSH2 0xC17 JUMPI DUP8 DUP6 ADD MLOAD PUSH1 0x0 NOT PUSH1 0x3 DUP9 SWAP1 SHL PUSH1 0xF8 AND SHR NOT AND DUP2 SSTORE JUMPDEST POP POP POP POP POP PUSH1 0x1 SWAP1 DUP2 SHL ADD SWAP1 SSTORE POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0x23 0x4F CREATE 0x2B 0xC4 0xC7 GASLIMIT 0xDC 0xD8 MSTORE8 NUMBER SHL SWAP5 DUP12 DIV PUSH11 0xCA836D4DFF35C0C3FB926C 0xE6 0x2C XOR 0x26 SWAP4 PUSH5 0x736F6C6343 STOP ADDMOD EQ STOP CALLER ","sourceMap":"616:6245:3:-:0;;;2768:177;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;2807:10;;1269:95:0;;1322:31;;-1:-1:-1;;;1322:31:0;;1350:1;1322:31;;;455:51:7;428:18;;1322:31:0;;;;;;;1269:95;1373:32;1392:12;1373:18;:32::i;:::-;-1:-1:-1;1857:1:2;2061:21;;;2830:8:3::1;:39:::0;;-1:-1:-1;;;;;;2830:39:3::1;-1:-1:-1::0;;;;;2830:39:3;;;::::1;::::0;;;::::1;::::0;;;2890:10:::1;-1:-1:-1::0;2880:21:3;;;:9:::1;:21;::::0;;;;:28;;-1:-1:-1;;2880:28:3::1;::::0;;::::1;::::0;;616:6245;;2912:187:0;2985:16;3004:6;;-1:-1:-1;;;;;3020:17:0;;;-1:-1:-1;;;;;;3020:17:0;;;;;;3052:40;;3004:6;;;;;;;3052:40;;2985:16;3052:40;2975:124;2912:187;:::o;14:290:7:-;84:6;137:2;125:9;116:7;112:23;108:32;105:52;;;153:1;150;143:12;105:52;179:16;;-1:-1:-1;;;;;224:31:7;;214:42;;204:70;;270:1;267;260:12;204:70;293:5;14:290;-1:-1:-1;;;14:290:7:o;309:203::-;616:6245:3;;;;;;"},"deployedBytecode":{"functionDebugData":{"@_551":{"entryPoint":null,"id":551,"parameterSlots":0,"returnSlots":0},"@_checkOwner_84":{"entryPoint":2126,"id":84,"parameterSlots":0,"returnSlots":0},"@_msgSender_159":{"entryPoint":null,"id":159,"parameterSlots":0,"returnSlots":1},"@_nonReentrantAfter_234":{"entryPoint":null,"id":234,"parameterSlots":0,"returnSlots":0},"@_nonReentrantBefore_226":{"entryPoint":2251,"id":226,"parameterSlots":0,"returnSlots":0},"@_transferOwnership_146":{"entryPoint":2171,"id":146,"parameterSlots":1,"returnSlots":0},"@addApprover_353":{"entryPoint":1303,"id":353,"parameterSlots":1,"returnSlots":0},"@approveSubmission_511":{"entryPoint":1547,"id":511,"parameterSlots":2,"returnSlots":0},"@approvers_284":{"entryPoint":null,"id":284,"parameterSlots":0,"returnSlots":0},"@bounties_278":{"entryPoint":1347,"id":278,"parameterSlots":0,"returnSlots":0},"@bountyCount_280":{"entryPoint":null,"id":280,"parameterSlots":0,"returnSlots":0},"@createBounty_427":{"entryPoint":625,"id":427,"parameterSlots":2,"returnSlots":1},"@getBounty_547":{"entryPoint":1010,"id":547,"parameterSlots":1,"returnSlots":5},"@owner_67":{"entryPoint":null,"id":67,"parameterSlots":0,"returnSlots":1},"@registry_262":{"entryPoint":null,"id":262,"parameterSlots":0,"returnSlots":0},"@removeApprover_368":{"entryPoint":1242,"id":368,"parameterSlots":1,"returnSlots":0},"@renounceOwnership_98":{"entryPoint":1283,"id":98,"parameterSlots":0,"returnSlots":0},"@transferOwnership_126":{"entryPoint":2059,"id":126,"parameterSlots":1,"returnSlots":0},"abi_decode_address":{"entryPoint":2407,"id":null,"parameterSlots":1,"returnSlots":1},"abi_decode_tuple_t_address":{"entryPoint":2435,"id":null,"parameterSlots":2,"returnSlots":1},"abi_decode_tuple_t_bytes32":{"entryPoint":2469,"id":null,"parameterSlots":2,"returnSlots":1},"abi_decode_tuple_t_bytes32t_address":{"entryPoint":2619,"id":null,"parameterSlots":2,"returnSlots":2},"abi_decode_tuple_t_string_calldata_ptr":{"entryPoint":2293,"id":null,"parameterSlots":2,"returnSlots":2},"abi_encode_bool":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":0},"abi_encode_tuple_packed_t_address_t_string_calldata_ptr_t_uint256_t_uint256_t_uint256__to_t_address_t_string_memory_ptr_t_uint256_t_uint256_t_uint256__nonPadded_inplace_fromStack_reversed":{"entryPoint":2702,"id":null,"parameterSlots":7,"returnSlots":1},"abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":1,"returnSlots":1},"abi_encode_tuple_t_address__to_t_address__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"abi_encode_tuple_t_address_t_string_memory_ptr_t_uint256_t_bool_t_bool__to_t_address_t_string_memory_ptr_t_uint256_t_bool_t_bool__fromStack_reversed":{"entryPoint":2494,"id":null,"parameterSlots":6,"returnSlots":1},"abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"abi_encode_tuple_t_bytes32__to_t_bytes32__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"abi_encode_tuple_t_contract$_IVitalityRegistry_$1058__to_t_address__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"array_dataslot_string_storage":{"entryPoint":null,"id":null,"parameterSlots":1,"returnSlots":1},"clean_up_bytearray_end_slots_string_storage":{"entryPoint":2840,"id":null,"parameterSlots":3,"returnSlots":0},"copy_byte_array_to_storage_from_t_string_memory_ptr_to_t_string_storage":{"entryPoint":2919,"id":null,"parameterSlots":2,"returnSlots":0},"extract_byte_array_length":{"entryPoint":2782,"id":null,"parameterSlots":1,"returnSlots":1},"extract_used_part_and_set_length_of_short_byte_array":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"increment_t_uint256":{"entryPoint":2663,"id":null,"parameterSlots":1,"returnSlots":1},"panic_error_0x41":{"entryPoint":2760,"id":null,"parameterSlots":0,"returnSlots":0}},"generatedSources":[{"ast":{"nodeType":"YulBlock","src":"0:7128:7","statements":[{"nodeType":"YulBlock","src":"6:3:7","statements":[]},{"body":{"nodeType":"YulBlock","src":"104:502:7","statements":[{"body":{"nodeType":"YulBlock","src":"150:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"159:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"162:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"152:6:7"},"nodeType":"YulFunctionCall","src":"152:12:7"},"nodeType":"YulExpressionStatement","src":"152:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"dataEnd","nodeType":"YulIdentifier","src":"125:7:7"},{"name":"headStart","nodeType":"YulIdentifier","src":"134:9:7"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"121:3:7"},"nodeType":"YulFunctionCall","src":"121:23:7"},{"kind":"number","nodeType":"YulLiteral","src":"146:2:7","type":"","value":"32"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"117:3:7"},"nodeType":"YulFunctionCall","src":"117:32:7"},"nodeType":"YulIf","src":"114:52:7"},{"nodeType":"YulVariableDeclaration","src":"175:37:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"202:9:7"}],"functionName":{"name":"calldataload","nodeType":"YulIdentifier","src":"189:12:7"},"nodeType":"YulFunctionCall","src":"189:23:7"},"variables":[{"name":"offset","nodeType":"YulTypedName","src":"179:6:7","type":""}]},{"nodeType":"YulVariableDeclaration","src":"221:28:7","value":{"kind":"number","nodeType":"YulLiteral","src":"231:18:7","type":"","value":"0xffffffffffffffff"},"variables":[{"name":"_1","nodeType":"YulTypedName","src":"225:2:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"276:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"285:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"288:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"278:6:7"},"nodeType":"YulFunctionCall","src":"278:12:7"},"nodeType":"YulExpressionStatement","src":"278:12:7"}]},"condition":{"arguments":[{"name":"offset","nodeType":"YulIdentifier","src":"264:6:7"},{"name":"_1","nodeType":"YulIdentifier","src":"272:2:7"}],"functionName":{"name":"gt","nodeType":"YulIdentifier","src":"261:2:7"},"nodeType":"YulFunctionCall","src":"261:14:7"},"nodeType":"YulIf","src":"258:34:7"},{"nodeType":"YulVariableDeclaration","src":"301:32:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"315:9:7"},{"name":"offset","nodeType":"YulIdentifier","src":"326:6:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"311:3:7"},"nodeType":"YulFunctionCall","src":"311:22:7"},"variables":[{"name":"_2","nodeType":"YulTypedName","src":"305:2:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"381:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"390:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"393:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"383:6:7"},"nodeType":"YulFunctionCall","src":"383:12:7"},"nodeType":"YulExpressionStatement","src":"383:12:7"}]},"condition":{"arguments":[{"arguments":[{"arguments":[{"name":"_2","nodeType":"YulIdentifier","src":"360:2:7"},{"kind":"number","nodeType":"YulLiteral","src":"364:4:7","type":"","value":"0x1f"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"356:3:7"},"nodeType":"YulFunctionCall","src":"356:13:7"},{"name":"dataEnd","nodeType":"YulIdentifier","src":"371:7:7"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"352:3:7"},"nodeType":"YulFunctionCall","src":"352:27:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"345:6:7"},"nodeType":"YulFunctionCall","src":"345:35:7"},"nodeType":"YulIf","src":"342:55:7"},{"nodeType":"YulVariableDeclaration","src":"406:30:7","value":{"arguments":[{"name":"_2","nodeType":"YulIdentifier","src":"433:2:7"}],"functionName":{"name":"calldataload","nodeType":"YulIdentifier","src":"420:12:7"},"nodeType":"YulFunctionCall","src":"420:16:7"},"variables":[{"name":"length","nodeType":"YulTypedName","src":"410:6:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"463:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"472:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"475:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"465:6:7"},"nodeType":"YulFunctionCall","src":"465:12:7"},"nodeType":"YulExpressionStatement","src":"465:12:7"}]},"condition":{"arguments":[{"name":"length","nodeType":"YulIdentifier","src":"451:6:7"},{"name":"_1","nodeType":"YulIdentifier","src":"459:2:7"}],"functionName":{"name":"gt","nodeType":"YulIdentifier","src":"448:2:7"},"nodeType":"YulFunctionCall","src":"448:14:7"},"nodeType":"YulIf","src":"445:34:7"},{"body":{"nodeType":"YulBlock","src":"529:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"538:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"541:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"531:6:7"},"nodeType":"YulFunctionCall","src":"531:12:7"},"nodeType":"YulExpressionStatement","src":"531:12:7"}]},"condition":{"arguments":[{"arguments":[{"arguments":[{"name":"_2","nodeType":"YulIdentifier","src":"502:2:7"},{"name":"length","nodeType":"YulIdentifier","src":"506:6:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"498:3:7"},"nodeType":"YulFunctionCall","src":"498:15:7"},{"kind":"number","nodeType":"YulLiteral","src":"515:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"494:3:7"},"nodeType":"YulFunctionCall","src":"494:24:7"},{"name":"dataEnd","nodeType":"YulIdentifier","src":"520:7:7"}],"functionName":{"name":"gt","nodeType":"YulIdentifier","src":"491:2:7"},"nodeType":"YulFunctionCall","src":"491:37:7"},"nodeType":"YulIf","src":"488:57:7"},{"nodeType":"YulAssignment","src":"554:21:7","value":{"arguments":[{"name":"_2","nodeType":"YulIdentifier","src":"568:2:7"},{"kind":"number","nodeType":"YulLiteral","src":"572:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"564:3:7"},"nodeType":"YulFunctionCall","src":"564:11:7"},"variableNames":[{"name":"value0","nodeType":"YulIdentifier","src":"554:6:7"}]},{"nodeType":"YulAssignment","src":"584:16:7","value":{"name":"length","nodeType":"YulIdentifier","src":"594:6:7"},"variableNames":[{"name":"value1","nodeType":"YulIdentifier","src":"584:6:7"}]}]},"name":"abi_decode_tuple_t_string_calldata_ptr","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"62:9:7","type":""},{"name":"dataEnd","nodeType":"YulTypedName","src":"73:7:7","type":""}],"returnVariables":[{"name":"value0","nodeType":"YulTypedName","src":"85:6:7","type":""},{"name":"value1","nodeType":"YulTypedName","src":"93:6:7","type":""}],"src":"14:592:7"},{"body":{"nodeType":"YulBlock","src":"712:76:7","statements":[{"nodeType":"YulAssignment","src":"722:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"734:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"745:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"730:3:7"},"nodeType":"YulFunctionCall","src":"730:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"722:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"764:9:7"},{"name":"value0","nodeType":"YulIdentifier","src":"775:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"757:6:7"},"nodeType":"YulFunctionCall","src":"757:25:7"},"nodeType":"YulExpressionStatement","src":"757:25:7"}]},"name":"abi_encode_tuple_t_bytes32__to_t_bytes32__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"681:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"692:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"703:4:7","type":""}],"src":"611:177:7"},{"body":{"nodeType":"YulBlock","src":"842:124:7","statements":[{"nodeType":"YulAssignment","src":"852:29:7","value":{"arguments":[{"name":"offset","nodeType":"YulIdentifier","src":"874:6:7"}],"functionName":{"name":"calldataload","nodeType":"YulIdentifier","src":"861:12:7"},"nodeType":"YulFunctionCall","src":"861:20:7"},"variableNames":[{"name":"value","nodeType":"YulIdentifier","src":"852:5:7"}]},{"body":{"nodeType":"YulBlock","src":"944:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"953:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"956:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"946:6:7"},"nodeType":"YulFunctionCall","src":"946:12:7"},"nodeType":"YulExpressionStatement","src":"946:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"903:5:7"},{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"914:5:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"929:3:7","type":"","value":"160"},{"kind":"number","nodeType":"YulLiteral","src":"934:1:7","type":"","value":"1"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"925:3:7"},"nodeType":"YulFunctionCall","src":"925:11:7"},{"kind":"number","nodeType":"YulLiteral","src":"938:1:7","type":"","value":"1"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"921:3:7"},"nodeType":"YulFunctionCall","src":"921:19:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"910:3:7"},"nodeType":"YulFunctionCall","src":"910:31:7"}],"functionName":{"name":"eq","nodeType":"YulIdentifier","src":"900:2:7"},"nodeType":"YulFunctionCall","src":"900:42:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"893:6:7"},"nodeType":"YulFunctionCall","src":"893:50:7"},"nodeType":"YulIf","src":"890:70:7"}]},"name":"abi_decode_address","nodeType":"YulFunctionDefinition","parameters":[{"name":"offset","nodeType":"YulTypedName","src":"821:6:7","type":""}],"returnVariables":[{"name":"value","nodeType":"YulTypedName","src":"832:5:7","type":""}],"src":"793:173:7"},{"body":{"nodeType":"YulBlock","src":"1041:116:7","statements":[{"body":{"nodeType":"YulBlock","src":"1087:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"1096:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"1099:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"1089:6:7"},"nodeType":"YulFunctionCall","src":"1089:12:7"},"nodeType":"YulExpressionStatement","src":"1089:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"dataEnd","nodeType":"YulIdentifier","src":"1062:7:7"},{"name":"headStart","nodeType":"YulIdentifier","src":"1071:9:7"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"1058:3:7"},"nodeType":"YulFunctionCall","src":"1058:23:7"},{"kind":"number","nodeType":"YulLiteral","src":"1083:2:7","type":"","value":"32"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"1054:3:7"},"nodeType":"YulFunctionCall","src":"1054:32:7"},"nodeType":"YulIf","src":"1051:52:7"},{"nodeType":"YulAssignment","src":"1112:39:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1141:9:7"}],"functionName":{"name":"abi_decode_address","nodeType":"YulIdentifier","src":"1122:18:7"},"nodeType":"YulFunctionCall","src":"1122:29:7"},"variableNames":[{"name":"value0","nodeType":"YulIdentifier","src":"1112:6:7"}]}]},"name":"abi_decode_tuple_t_address","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"1007:9:7","type":""},{"name":"dataEnd","nodeType":"YulTypedName","src":"1018:7:7","type":""}],"returnVariables":[{"name":"value0","nodeType":"YulTypedName","src":"1030:6:7","type":""}],"src":"971:186:7"},{"body":{"nodeType":"YulBlock","src":"1203:50:7","statements":[{"expression":{"arguments":[{"name":"pos","nodeType":"YulIdentifier","src":"1220:3:7"},{"arguments":[{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"1239:5:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"1232:6:7"},"nodeType":"YulFunctionCall","src":"1232:13:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"1225:6:7"},"nodeType":"YulFunctionCall","src":"1225:21:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1213:6:7"},"nodeType":"YulFunctionCall","src":"1213:34:7"},"nodeType":"YulExpressionStatement","src":"1213:34:7"}]},"name":"abi_encode_bool","nodeType":"YulFunctionDefinition","parameters":[{"name":"value","nodeType":"YulTypedName","src":"1187:5:7","type":""},{"name":"pos","nodeType":"YulTypedName","src":"1194:3:7","type":""}],"src":"1162:91:7"},{"body":{"nodeType":"YulBlock","src":"1353:92:7","statements":[{"nodeType":"YulAssignment","src":"1363:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1375:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"1386:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"1371:3:7"},"nodeType":"YulFunctionCall","src":"1371:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"1363:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1405:9:7"},{"arguments":[{"arguments":[{"name":"value0","nodeType":"YulIdentifier","src":"1430:6:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"1423:6:7"},"nodeType":"YulFunctionCall","src":"1423:14:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"1416:6:7"},"nodeType":"YulFunctionCall","src":"1416:22:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1398:6:7"},"nodeType":"YulFunctionCall","src":"1398:41:7"},"nodeType":"YulExpressionStatement","src":"1398:41:7"}]},"name":"abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"1322:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"1333:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"1344:4:7","type":""}],"src":"1258:187:7"},{"body":{"nodeType":"YulBlock","src":"1520:110:7","statements":[{"body":{"nodeType":"YulBlock","src":"1566:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"1575:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"1578:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"1568:6:7"},"nodeType":"YulFunctionCall","src":"1568:12:7"},"nodeType":"YulExpressionStatement","src":"1568:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"dataEnd","nodeType":"YulIdentifier","src":"1541:7:7"},{"name":"headStart","nodeType":"YulIdentifier","src":"1550:9:7"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"1537:3:7"},"nodeType":"YulFunctionCall","src":"1537:23:7"},{"kind":"number","nodeType":"YulLiteral","src":"1562:2:7","type":"","value":"32"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"1533:3:7"},"nodeType":"YulFunctionCall","src":"1533:32:7"},"nodeType":"YulIf","src":"1530:52:7"},{"nodeType":"YulAssignment","src":"1591:33:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1614:9:7"}],"functionName":{"name":"calldataload","nodeType":"YulIdentifier","src":"1601:12:7"},"nodeType":"YulFunctionCall","src":"1601:23:7"},"variableNames":[{"name":"value0","nodeType":"YulIdentifier","src":"1591:6:7"}]}]},"name":"abi_decode_tuple_t_bytes32","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"1486:9:7","type":""},{"name":"dataEnd","nodeType":"YulTypedName","src":"1497:7:7","type":""}],"returnVariables":[{"name":"value0","nodeType":"YulTypedName","src":"1509:6:7","type":""}],"src":"1450:180:7"},{"body":{"nodeType":"YulBlock","src":"1856:649:7","statements":[{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1873:9:7"},{"arguments":[{"name":"value0","nodeType":"YulIdentifier","src":"1888:6:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"1904:3:7","type":"","value":"160"},{"kind":"number","nodeType":"YulLiteral","src":"1909:1:7","type":"","value":"1"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"1900:3:7"},"nodeType":"YulFunctionCall","src":"1900:11:7"},{"kind":"number","nodeType":"YulLiteral","src":"1913:1:7","type":"","value":"1"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"1896:3:7"},"nodeType":"YulFunctionCall","src":"1896:19:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"1884:3:7"},"nodeType":"YulFunctionCall","src":"1884:32:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1866:6:7"},"nodeType":"YulFunctionCall","src":"1866:51:7"},"nodeType":"YulExpressionStatement","src":"1866:51:7"},{"nodeType":"YulVariableDeclaration","src":"1926:12:7","value":{"kind":"number","nodeType":"YulLiteral","src":"1936:2:7","type":"","value":"32"},"variables":[{"name":"_1","nodeType":"YulTypedName","src":"1930:2:7","type":""}]},{"expression":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1958:9:7"},{"name":"_1","nodeType":"YulIdentifier","src":"1969:2:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"1954:3:7"},"nodeType":"YulFunctionCall","src":"1954:18:7"},{"kind":"number","nodeType":"YulLiteral","src":"1974:3:7","type":"","value":"160"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1947:6:7"},"nodeType":"YulFunctionCall","src":"1947:31:7"},"nodeType":"YulExpressionStatement","src":"1947:31:7"},{"nodeType":"YulVariableDeclaration","src":"1987:27:7","value":{"arguments":[{"name":"value1","nodeType":"YulIdentifier","src":"2007:6:7"}],"functionName":{"name":"mload","nodeType":"YulIdentifier","src":"2001:5:7"},"nodeType":"YulFunctionCall","src":"2001:13:7"},"variables":[{"name":"length","nodeType":"YulTypedName","src":"1991:6:7","type":""}]},{"expression":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2034:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"2045:3:7","type":"","value":"160"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2030:3:7"},"nodeType":"YulFunctionCall","src":"2030:19:7"},{"name":"length","nodeType":"YulIdentifier","src":"2051:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2023:6:7"},"nodeType":"YulFunctionCall","src":"2023:35:7"},"nodeType":"YulExpressionStatement","src":"2023:35:7"},{"nodeType":"YulVariableDeclaration","src":"2067:10:7","value":{"kind":"number","nodeType":"YulLiteral","src":"2076:1:7","type":"","value":"0"},"variables":[{"name":"i","nodeType":"YulTypedName","src":"2071:1:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"2136:91:7","statements":[{"expression":{"arguments":[{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2165:9:7"},{"name":"i","nodeType":"YulIdentifier","src":"2176:1:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2161:3:7"},"nodeType":"YulFunctionCall","src":"2161:17:7"},{"kind":"number","nodeType":"YulLiteral","src":"2180:3:7","type":"","value":"192"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2157:3:7"},"nodeType":"YulFunctionCall","src":"2157:27:7"},{"arguments":[{"arguments":[{"arguments":[{"name":"value1","nodeType":"YulIdentifier","src":"2200:6:7"},{"name":"i","nodeType":"YulIdentifier","src":"2208:1:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2196:3:7"},"nodeType":"YulFunctionCall","src":"2196:14:7"},{"name":"_1","nodeType":"YulIdentifier","src":"2212:2:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2192:3:7"},"nodeType":"YulFunctionCall","src":"2192:23:7"}],"functionName":{"name":"mload","nodeType":"YulIdentifier","src":"2186:5:7"},"nodeType":"YulFunctionCall","src":"2186:30:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2150:6:7"},"nodeType":"YulFunctionCall","src":"2150:67:7"},"nodeType":"YulExpressionStatement","src":"2150:67:7"}]},"condition":{"arguments":[{"name":"i","nodeType":"YulIdentifier","src":"2097:1:7"},{"name":"length","nodeType":"YulIdentifier","src":"2100:6:7"}],"functionName":{"name":"lt","nodeType":"YulIdentifier","src":"2094:2:7"},"nodeType":"YulFunctionCall","src":"2094:13:7"},"nodeType":"YulForLoop","post":{"nodeType":"YulBlock","src":"2108:19:7","statements":[{"nodeType":"YulAssignment","src":"2110:15:7","value":{"arguments":[{"name":"i","nodeType":"YulIdentifier","src":"2119:1:7"},{"name":"_1","nodeType":"YulIdentifier","src":"2122:2:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2115:3:7"},"nodeType":"YulFunctionCall","src":"2115:10:7"},"variableNames":[{"name":"i","nodeType":"YulIdentifier","src":"2110:1:7"}]}]},"pre":{"nodeType":"YulBlock","src":"2090:3:7","statements":[]},"src":"2086:141:7"},{"expression":{"arguments":[{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2251:9:7"},{"name":"length","nodeType":"YulIdentifier","src":"2262:6:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2247:3:7"},"nodeType":"YulFunctionCall","src":"2247:22:7"},{"kind":"number","nodeType":"YulLiteral","src":"2271:3:7","type":"","value":"192"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2243:3:7"},"nodeType":"YulFunctionCall","src":"2243:32:7"},{"kind":"number","nodeType":"YulLiteral","src":"2277:1:7","type":"","value":"0"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2236:6:7"},"nodeType":"YulFunctionCall","src":"2236:43:7"},"nodeType":"YulExpressionStatement","src":"2236:43:7"},{"nodeType":"YulAssignment","src":"2288:63:7","value":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2304:9:7"},{"arguments":[{"arguments":[{"name":"length","nodeType":"YulIdentifier","src":"2323:6:7"},{"kind":"number","nodeType":"YulLiteral","src":"2331:2:7","type":"","value":"31"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2319:3:7"},"nodeType":"YulFunctionCall","src":"2319:15:7"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2340:2:7","type":"","value":"31"}],"functionName":{"name":"not","nodeType":"YulIdentifier","src":"2336:3:7"},"nodeType":"YulFunctionCall","src":"2336:7:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"2315:3:7"},"nodeType":"YulFunctionCall","src":"2315:29:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2300:3:7"},"nodeType":"YulFunctionCall","src":"2300:45:7"},{"kind":"number","nodeType":"YulLiteral","src":"2347:3:7","type":"","value":"192"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2296:3:7"},"nodeType":"YulFunctionCall","src":"2296:55:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"2288:4:7"}]},{"expression":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2371:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"2382:2:7","type":"","value":"64"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2367:3:7"},"nodeType":"YulFunctionCall","src":"2367:18:7"},{"name":"value2","nodeType":"YulIdentifier","src":"2387:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2360:6:7"},"nodeType":"YulFunctionCall","src":"2360:34:7"},"nodeType":"YulExpressionStatement","src":"2360:34:7"},{"expression":{"arguments":[{"name":"value3","nodeType":"YulIdentifier","src":"2419:6:7"},{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2431:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"2442:2:7","type":"","value":"96"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2427:3:7"},"nodeType":"YulFunctionCall","src":"2427:18:7"}],"functionName":{"name":"abi_encode_bool","nodeType":"YulIdentifier","src":"2403:15:7"},"nodeType":"YulFunctionCall","src":"2403:43:7"},"nodeType":"YulExpressionStatement","src":"2403:43:7"},{"expression":{"arguments":[{"name":"value4","nodeType":"YulIdentifier","src":"2471:6:7"},{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2483:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"2494:3:7","type":"","value":"128"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2479:3:7"},"nodeType":"YulFunctionCall","src":"2479:19:7"}],"functionName":{"name":"abi_encode_bool","nodeType":"YulIdentifier","src":"2455:15:7"},"nodeType":"YulFunctionCall","src":"2455:44:7"},"nodeType":"YulExpressionStatement","src":"2455:44:7"}]},"name":"abi_encode_tuple_t_address_t_string_memory_ptr_t_uint256_t_bool_t_bool__to_t_address_t_string_memory_ptr_t_uint256_t_bool_t_bool__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"1793:9:7","type":""},{"name":"value4","nodeType":"YulTypedName","src":"1804:6:7","type":""},{"name":"value3","nodeType":"YulTypedName","src":"1812:6:7","type":""},{"name":"value2","nodeType":"YulTypedName","src":"1820:6:7","type":""},{"name":"value1","nodeType":"YulTypedName","src":"1828:6:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"1836:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"1847:4:7","type":""}],"src":"1635:870:7"},{"body":{"nodeType":"YulBlock","src":"2611:76:7","statements":[{"nodeType":"YulAssignment","src":"2621:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2633:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"2644:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2629:3:7"},"nodeType":"YulFunctionCall","src":"2629:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"2621:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2663:9:7"},{"name":"value0","nodeType":"YulIdentifier","src":"2674:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2656:6:7"},"nodeType":"YulFunctionCall","src":"2656:25:7"},"nodeType":"YulExpressionStatement","src":"2656:25:7"}]},"name":"abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"2580:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"2591:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"2602:4:7","type":""}],"src":"2510:177:7"},{"body":{"nodeType":"YulBlock","src":"2819:102:7","statements":[{"nodeType":"YulAssignment","src":"2829:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2841:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"2852:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2837:3:7"},"nodeType":"YulFunctionCall","src":"2837:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"2829:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2871:9:7"},{"arguments":[{"name":"value0","nodeType":"YulIdentifier","src":"2886:6:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2902:3:7","type":"","value":"160"},{"kind":"number","nodeType":"YulLiteral","src":"2907:1:7","type":"","value":"1"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"2898:3:7"},"nodeType":"YulFunctionCall","src":"2898:11:7"},{"kind":"number","nodeType":"YulLiteral","src":"2911:1:7","type":"","value":"1"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"2894:3:7"},"nodeType":"YulFunctionCall","src":"2894:19:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"2882:3:7"},"nodeType":"YulFunctionCall","src":"2882:32:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2864:6:7"},"nodeType":"YulFunctionCall","src":"2864:51:7"},"nodeType":"YulExpressionStatement","src":"2864:51:7"}]},"name":"abi_encode_tuple_t_contract$_IVitalityRegistry_$1058__to_t_address__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"2788:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"2799:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"2810:4:7","type":""}],"src":"2692:229:7"},{"body":{"nodeType":"YulBlock","src":"3027:102:7","statements":[{"nodeType":"YulAssignment","src":"3037:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"3049:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"3060:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"3045:3:7"},"nodeType":"YulFunctionCall","src":"3045:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"3037:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"3079:9:7"},{"arguments":[{"name":"value0","nodeType":"YulIdentifier","src":"3094:6:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"3110:3:7","type":"","value":"160"},{"kind":"number","nodeType":"YulLiteral","src":"3115:1:7","type":"","value":"1"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"3106:3:7"},"nodeType":"YulFunctionCall","src":"3106:11:7"},{"kind":"number","nodeType":"YulLiteral","src":"3119:1:7","type":"","value":"1"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"3102:3:7"},"nodeType":"YulFunctionCall","src":"3102:19:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"3090:3:7"},"nodeType":"YulFunctionCall","src":"3090:32:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"3072:6:7"},"nodeType":"YulFunctionCall","src":"3072:51:7"},"nodeType":"YulExpressionStatement","src":"3072:51:7"}]},"name":"abi_encode_tuple_t_address__to_t_address__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"2996:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"3007:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"3018:4:7","type":""}],"src":"2926:203:7"},{"body":{"nodeType":"YulBlock","src":"3221:167:7","statements":[{"body":{"nodeType":"YulBlock","src":"3267:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"3276:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"3279:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"3269:6:7"},"nodeType":"YulFunctionCall","src":"3269:12:7"},"nodeType":"YulExpressionStatement","src":"3269:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"dataEnd","nodeType":"YulIdentifier","src":"3242:7:7"},{"name":"headStart","nodeType":"YulIdentifier","src":"3251:9:7"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"3238:3:7"},"nodeType":"YulFunctionCall","src":"3238:23:7"},{"kind":"number","nodeType":"YulLiteral","src":"3263:2:7","type":"","value":"64"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"3234:3:7"},"nodeType":"YulFunctionCall","src":"3234:32:7"},"nodeType":"YulIf","src":"3231:52:7"},{"nodeType":"YulAssignment","src":"3292:33:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"3315:9:7"}],"functionName":{"name":"calldataload","nodeType":"YulIdentifier","src":"3302:12:7"},"nodeType":"YulFunctionCall","src":"3302:23:7"},"variableNames":[{"name":"value0","nodeType":"YulIdentifier","src":"3292:6:7"}]},{"nodeType":"YulAssignment","src":"3334:48:7","value":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"3367:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"3378:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"3363:3:7"},"nodeType":"YulFunctionCall","src":"3363:18:7"}],"functionName":{"name":"abi_decode_address","nodeType":"YulIdentifier","src":"3344:18:7"},"nodeType":"YulFunctionCall","src":"3344:38:7"},"variableNames":[{"name":"value1","nodeType":"YulIdentifier","src":"3334:6:7"}]}]},"name":"abi_decode_tuple_t_bytes32t_address","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"3179:9:7","type":""},{"name":"dataEnd","nodeType":"YulTypedName","src":"3190:7:7","type":""}],"returnVariables":[{"name":"value0","nodeType":"YulTypedName","src":"3202:6:7","type":""},{"name":"value1","nodeType":"YulTypedName","src":"3210:6:7","type":""}],"src":"3134:254:7"},{"body":{"nodeType":"YulBlock","src":"3440:185:7","statements":[{"body":{"nodeType":"YulBlock","src":"3479:111:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"3500:1:7","type":"","value":"0"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"3507:3:7","type":"","value":"224"},{"kind":"number","nodeType":"YulLiteral","src":"3512:10:7","type":"","value":"0x4e487b71"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"3503:3:7"},"nodeType":"YulFunctionCall","src":"3503:20:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"3493:6:7"},"nodeType":"YulFunctionCall","src":"3493:31:7"},"nodeType":"YulExpressionStatement","src":"3493:31:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"3544:1:7","type":"","value":"4"},{"kind":"number","nodeType":"YulLiteral","src":"3547:4:7","type":"","value":"0x11"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"3537:6:7"},"nodeType":"YulFunctionCall","src":"3537:15:7"},"nodeType":"YulExpressionStatement","src":"3537:15:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"3572:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"3575:4:7","type":"","value":"0x24"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"3565:6:7"},"nodeType":"YulFunctionCall","src":"3565:15:7"},"nodeType":"YulExpressionStatement","src":"3565:15:7"}]},"condition":{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"3456:5:7"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"3467:1:7","type":"","value":"0"}],"functionName":{"name":"not","nodeType":"YulIdentifier","src":"3463:3:7"},"nodeType":"YulFunctionCall","src":"3463:6:7"}],"functionName":{"name":"eq","nodeType":"YulIdentifier","src":"3453:2:7"},"nodeType":"YulFunctionCall","src":"3453:17:7"},"nodeType":"YulIf","src":"3450:140:7"},{"nodeType":"YulAssignment","src":"3599:20:7","value":{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"3610:5:7"},{"kind":"number","nodeType":"YulLiteral","src":"3617:1:7","type":"","value":"1"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"3606:3:7"},"nodeType":"YulFunctionCall","src":"3606:13:7"},"variableNames":[{"name":"ret","nodeType":"YulIdentifier","src":"3599:3:7"}]}]},"name":"increment_t_uint256","nodeType":"YulFunctionDefinition","parameters":[{"name":"value","nodeType":"YulTypedName","src":"3422:5:7","type":""}],"returnVariables":[{"name":"ret","nodeType":"YulTypedName","src":"3432:3:7","type":""}],"src":"3393:232:7"},{"body":{"nodeType":"YulBlock","src":"3891:304:7","statements":[{"expression":{"arguments":[{"name":"pos","nodeType":"YulIdentifier","src":"3908:3:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"3921:2:7","type":"","value":"96"},{"name":"value0","nodeType":"YulIdentifier","src":"3925:6:7"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"3917:3:7"},"nodeType":"YulFunctionCall","src":"3917:15:7"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"3938:26:7","type":"","value":"0xffffffffffffffffffffffff"}],"functionName":{"name":"not","nodeType":"YulIdentifier","src":"3934:3:7"},"nodeType":"YulFunctionCall","src":"3934:31:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"3913:3:7"},"nodeType":"YulFunctionCall","src":"3913:53:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"3901:6:7"},"nodeType":"YulFunctionCall","src":"3901:66:7"},"nodeType":"YulExpressionStatement","src":"3901:66:7"},{"expression":{"arguments":[{"arguments":[{"name":"pos","nodeType":"YulIdentifier","src":"3993:3:7"},{"kind":"number","nodeType":"YulLiteral","src":"3998:2:7","type":"","value":"20"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"3989:3:7"},"nodeType":"YulFunctionCall","src":"3989:12:7"},{"name":"value1","nodeType":"YulIdentifier","src":"4003:6:7"},{"name":"value2","nodeType":"YulIdentifier","src":"4011:6:7"}],"functionName":{"name":"calldatacopy","nodeType":"YulIdentifier","src":"3976:12:7"},"nodeType":"YulFunctionCall","src":"3976:42:7"},"nodeType":"YulExpressionStatement","src":"3976:42:7"},{"nodeType":"YulVariableDeclaration","src":"4027:26:7","value":{"arguments":[{"name":"pos","nodeType":"YulIdentifier","src":"4041:3:7"},{"name":"value2","nodeType":"YulIdentifier","src":"4046:6:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"4037:3:7"},"nodeType":"YulFunctionCall","src":"4037:16:7"},"variables":[{"name":"_1","nodeType":"YulTypedName","src":"4031:2:7","type":""}]},{"expression":{"arguments":[{"arguments":[{"name":"_1","nodeType":"YulIdentifier","src":"4073:2:7"},{"kind":"number","nodeType":"YulLiteral","src":"4077:2:7","type":"","value":"20"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"4069:3:7"},"nodeType":"YulFunctionCall","src":"4069:11:7"},{"name":"value3","nodeType":"YulIdentifier","src":"4082:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"4062:6:7"},"nodeType":"YulFunctionCall","src":"4062:27:7"},"nodeType":"YulExpressionStatement","src":"4062:27:7"},{"expression":{"arguments":[{"arguments":[{"name":"_1","nodeType":"YulIdentifier","src":"4109:2:7"},{"kind":"number","nodeType":"YulLiteral","src":"4113:2:7","type":"","value":"52"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"4105:3:7"},"nodeType":"YulFunctionCall","src":"4105:11:7"},{"name":"value4","nodeType":"YulIdentifier","src":"4118:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"4098:6:7"},"nodeType":"YulFunctionCall","src":"4098:27:7"},"nodeType":"YulExpressionStatement","src":"4098:27:7"},{"expression":{"arguments":[{"arguments":[{"name":"_1","nodeType":"YulIdentifier","src":"4145:2:7"},{"kind":"number","nodeType":"YulLiteral","src":"4149:2:7","type":"","value":"84"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"4141:3:7"},"nodeType":"YulFunctionCall","src":"4141:11:7"},{"name":"value5","nodeType":"YulIdentifier","src":"4154:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"4134:6:7"},"nodeType":"YulFunctionCall","src":"4134:27:7"},"nodeType":"YulExpressionStatement","src":"4134:27:7"},{"nodeType":"YulAssignment","src":"4170:19:7","value":{"arguments":[{"name":"_1","nodeType":"YulIdentifier","src":"4181:2:7"},{"kind":"number","nodeType":"YulLiteral","src":"4185:3:7","type":"","value":"116"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"4177:3:7"},"nodeType":"YulFunctionCall","src":"4177:12:7"},"variableNames":[{"name":"end","nodeType":"YulIdentifier","src":"4170:3:7"}]}]},"name":"abi_encode_tuple_packed_t_address_t_string_calldata_ptr_t_uint256_t_uint256_t_uint256__to_t_address_t_string_memory_ptr_t_uint256_t_uint256_t_uint256__nonPadded_inplace_fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"pos","nodeType":"YulTypedName","src":"3827:3:7","type":""},{"name":"value5","nodeType":"YulTypedName","src":"3832:6:7","type":""},{"name":"value4","nodeType":"YulTypedName","src":"3840:6:7","type":""},{"name":"value3","nodeType":"YulTypedName","src":"3848:6:7","type":""},{"name":"value2","nodeType":"YulTypedName","src":"3856:6:7","type":""},{"name":"value1","nodeType":"YulTypedName","src":"3864:6:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"3872:6:7","type":""}],"returnVariables":[{"name":"end","nodeType":"YulTypedName","src":"3883:3:7","type":""}],"src":"3630:565:7"},{"body":{"nodeType":"YulBlock","src":"4232:95:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4249:1:7","type":"","value":"0"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4256:3:7","type":"","value":"224"},{"kind":"number","nodeType":"YulLiteral","src":"4261:10:7","type":"","value":"0x4e487b71"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"4252:3:7"},"nodeType":"YulFunctionCall","src":"4252:20:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"4242:6:7"},"nodeType":"YulFunctionCall","src":"4242:31:7"},"nodeType":"YulExpressionStatement","src":"4242:31:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4289:1:7","type":"","value":"4"},{"kind":"number","nodeType":"YulLiteral","src":"4292:4:7","type":"","value":"0x41"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"4282:6:7"},"nodeType":"YulFunctionCall","src":"4282:15:7"},"nodeType":"YulExpressionStatement","src":"4282:15:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4313:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"4316:4:7","type":"","value":"0x24"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"4306:6:7"},"nodeType":"YulFunctionCall","src":"4306:15:7"},"nodeType":"YulExpressionStatement","src":"4306:15:7"}]},"name":"panic_error_0x41","nodeType":"YulFunctionDefinition","src":"4200:127:7"},{"body":{"nodeType":"YulBlock","src":"4387:325:7","statements":[{"nodeType":"YulAssignment","src":"4397:22:7","value":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4411:1:7","type":"","value":"1"},{"name":"data","nodeType":"YulIdentifier","src":"4414:4:7"}],"functionName":{"name":"shr","nodeType":"YulIdentifier","src":"4407:3:7"},"nodeType":"YulFunctionCall","src":"4407:12:7"},"variableNames":[{"name":"length","nodeType":"YulIdentifier","src":"4397:6:7"}]},{"nodeType":"YulVariableDeclaration","src":"4428:38:7","value":{"arguments":[{"name":"data","nodeType":"YulIdentifier","src":"4458:4:7"},{"kind":"number","nodeType":"YulLiteral","src":"4464:1:7","type":"","value":"1"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"4454:3:7"},"nodeType":"YulFunctionCall","src":"4454:12:7"},"variables":[{"name":"outOfPlaceEncoding","nodeType":"YulTypedName","src":"4432:18:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"4505:31:7","statements":[{"nodeType":"YulAssignment","src":"4507:27:7","value":{"arguments":[{"name":"length","nodeType":"YulIdentifier","src":"4521:6:7"},{"kind":"number","nodeType":"YulLiteral","src":"4529:4:7","type":"","value":"0x7f"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"4517:3:7"},"nodeType":"YulFunctionCall","src":"4517:17:7"},"variableNames":[{"name":"length","nodeType":"YulIdentifier","src":"4507:6:7"}]}]},"condition":{"arguments":[{"name":"outOfPlaceEncoding","nodeType":"YulIdentifier","src":"4485:18:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"4478:6:7"},"nodeType":"YulFunctionCall","src":"4478:26:7"},"nodeType":"YulIf","src":"4475:61:7"},{"body":{"nodeType":"YulBlock","src":"4595:111:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4616:1:7","type":"","value":"0"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4623:3:7","type":"","value":"224"},{"kind":"number","nodeType":"YulLiteral","src":"4628:10:7","type":"","value":"0x4e487b71"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"4619:3:7"},"nodeType":"YulFunctionCall","src":"4619:20:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"4609:6:7"},"nodeType":"YulFunctionCall","src":"4609:31:7"},"nodeType":"YulExpressionStatement","src":"4609:31:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4660:1:7","type":"","value":"4"},{"kind":"number","nodeType":"YulLiteral","src":"4663:4:7","type":"","value":"0x22"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"4653:6:7"},"nodeType":"YulFunctionCall","src":"4653:15:7"},"nodeType":"YulExpressionStatement","src":"4653:15:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4688:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"4691:4:7","type":"","value":"0x24"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"4681:6:7"},"nodeType":"YulFunctionCall","src":"4681:15:7"},"nodeType":"YulExpressionStatement","src":"4681:15:7"}]},"condition":{"arguments":[{"name":"outOfPlaceEncoding","nodeType":"YulIdentifier","src":"4551:18:7"},{"arguments":[{"name":"length","nodeType":"YulIdentifier","src":"4574:6:7"},{"kind":"number","nodeType":"YulLiteral","src":"4582:2:7","type":"","value":"32"}],"functionName":{"name":"lt","nodeType":"YulIdentifier","src":"4571:2:7"},"nodeType":"YulFunctionCall","src":"4571:14:7"}],"functionName":{"name":"eq","nodeType":"YulIdentifier","src":"4548:2:7"},"nodeType":"YulFunctionCall","src":"4548:38:7"},"nodeType":"YulIf","src":"4545:161:7"}]},"name":"extract_byte_array_length","nodeType":"YulFunctionDefinition","parameters":[{"name":"data","nodeType":"YulTypedName","src":"4367:4:7","type":""}],"returnVariables":[{"name":"length","nodeType":"YulTypedName","src":"4376:6:7","type":""}],"src":"4332:380:7"},{"body":{"nodeType":"YulBlock","src":"4773:65:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4790:1:7","type":"","value":"0"},{"name":"ptr","nodeType":"YulIdentifier","src":"4793:3:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"4783:6:7"},"nodeType":"YulFunctionCall","src":"4783:14:7"},"nodeType":"YulExpressionStatement","src":"4783:14:7"},{"nodeType":"YulAssignment","src":"4806:26:7","value":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"4824:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"4827:4:7","type":"","value":"0x20"}],"functionName":{"name":"keccak256","nodeType":"YulIdentifier","src":"4814:9:7"},"nodeType":"YulFunctionCall","src":"4814:18:7"},"variableNames":[{"name":"data","nodeType":"YulIdentifier","src":"4806:4:7"}]}]},"name":"array_dataslot_string_storage","nodeType":"YulFunctionDefinition","parameters":[{"name":"ptr","nodeType":"YulTypedName","src":"4756:3:7","type":""}],"returnVariables":[{"name":"data","nodeType":"YulTypedName","src":"4764:4:7","type":""}],"src":"4717:121:7"},{"body":{"nodeType":"YulBlock","src":"4924:464:7","statements":[{"body":{"nodeType":"YulBlock","src":"4957:425:7","statements":[{"nodeType":"YulVariableDeclaration","src":"4971:11:7","value":{"kind":"number","nodeType":"YulLiteral","src":"4981:1:7","type":"","value":"0"},"variables":[{"name":"_1","nodeType":"YulTypedName","src":"4975:2:7","type":""}]},{"expression":{"arguments":[{"name":"_1","nodeType":"YulIdentifier","src":"5002:2:7"},{"name":"array","nodeType":"YulIdentifier","src":"5006:5:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"4995:6:7"},"nodeType":"YulFunctionCall","src":"4995:17:7"},"nodeType":"YulExpressionStatement","src":"4995:17:7"},{"nodeType":"YulVariableDeclaration","src":"5025:31:7","value":{"arguments":[{"name":"_1","nodeType":"YulIdentifier","src":"5047:2:7"},{"kind":"number","nodeType":"YulLiteral","src":"5051:4:7","type":"","value":"0x20"}],"functionName":{"name":"keccak256","nodeType":"YulIdentifier","src":"5037:9:7"},"nodeType":"YulFunctionCall","src":"5037:19:7"},"variables":[{"name":"data","nodeType":"YulTypedName","src":"5029:4:7","type":""}]},{"nodeType":"YulVariableDeclaration","src":"5069:57:7","value":{"arguments":[{"name":"data","nodeType":"YulIdentifier","src":"5092:4:7"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"5102:1:7","type":"","value":"5"},{"arguments":[{"name":"startIndex","nodeType":"YulIdentifier","src":"5109:10:7"},{"kind":"number","nodeType":"YulLiteral","src":"5121:2:7","type":"","value":"31"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"5105:3:7"},"nodeType":"YulFunctionCall","src":"5105:19:7"}],"functionName":{"name":"shr","nodeType":"YulIdentifier","src":"5098:3:7"},"nodeType":"YulFunctionCall","src":"5098:27:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"5088:3:7"},"nodeType":"YulFunctionCall","src":"5088:38:7"},"variables":[{"name":"deleteStart","nodeType":"YulTypedName","src":"5073:11:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"5163:23:7","statements":[{"nodeType":"YulAssignment","src":"5165:19:7","value":{"name":"data","nodeType":"YulIdentifier","src":"5180:4:7"},"variableNames":[{"name":"deleteStart","nodeType":"YulIdentifier","src":"5165:11:7"}]}]},"condition":{"arguments":[{"name":"startIndex","nodeType":"YulIdentifier","src":"5145:10:7"},{"kind":"number","nodeType":"YulLiteral","src":"5157:4:7","type":"","value":"0x20"}],"functionName":{"name":"lt","nodeType":"YulIdentifier","src":"5142:2:7"},"nodeType":"YulFunctionCall","src":"5142:20:7"},"nodeType":"YulIf","src":"5139:47:7"},{"nodeType":"YulVariableDeclaration","src":"5199:41:7","value":{"arguments":[{"name":"data","nodeType":"YulIdentifier","src":"5213:4:7"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"5223:1:7","type":"","value":"5"},{"arguments":[{"name":"len","nodeType":"YulIdentifier","src":"5230:3:7"},{"kind":"number","nodeType":"YulLiteral","src":"5235:2:7","type":"","value":"31"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"5226:3:7"},"nodeType":"YulFunctionCall","src":"5226:12:7"}],"functionName":{"name":"shr","nodeType":"YulIdentifier","src":"5219:3:7"},"nodeType":"YulFunctionCall","src":"5219:20:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"5209:3:7"},"nodeType":"YulFunctionCall","src":"5209:31:7"},"variables":[{"name":"_2","nodeType":"YulTypedName","src":"5203:2:7","type":""}]},{"nodeType":"YulVariableDeclaration","src":"5253:24:7","value":{"name":"deleteStart","nodeType":"YulIdentifier","src":"5266:11:7"},"variables":[{"name":"start","nodeType":"YulTypedName","src":"5257:5:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"5351:21:7","statements":[{"expression":{"arguments":[{"name":"start","nodeType":"YulIdentifier","src":"5360:5:7"},{"name":"_1","nodeType":"YulIdentifier","src":"5367:2:7"}],"functionName":{"name":"sstore","nodeType":"YulIdentifier","src":"5353:6:7"},"nodeType":"YulFunctionCall","src":"5353:17:7"},"nodeType":"YulExpressionStatement","src":"5353:17:7"}]},"condition":{"arguments":[{"name":"start","nodeType":"YulIdentifier","src":"5301:5:7"},{"name":"_2","nodeType":"YulIdentifier","src":"5308:2:7"}],"functionName":{"name":"lt","nodeType":"YulIdentifier","src":"5298:2:7"},"nodeType":"YulFunctionCall","src":"5298:13:7"},"nodeType":"YulForLoop","post":{"nodeType":"YulBlock","src":"5312:26:7","statements":[{"nodeType":"YulAssignment","src":"5314:22:7","value":{"arguments":[{"name":"start","nodeType":"YulIdentifier","src":"5327:5:7"},{"kind":"number","nodeType":"YulLiteral","src":"5334:1:7","type":"","value":"1"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"5323:3:7"},"nodeType":"YulFunctionCall","src":"5323:13:7"},"variableNames":[{"name":"start","nodeType":"YulIdentifier","src":"5314:5:7"}]}]},"pre":{"nodeType":"YulBlock","src":"5294:3:7","statements":[]},"src":"5290:82:7"}]},"condition":{"arguments":[{"name":"len","nodeType":"YulIdentifier","src":"4940:3:7"},{"kind":"number","nodeType":"YulLiteral","src":"4945:2:7","type":"","value":"31"}],"functionName":{"name":"gt","nodeType":"YulIdentifier","src":"4937:2:7"},"nodeType":"YulFunctionCall","src":"4937:11:7"},"nodeType":"YulIf","src":"4934:448:7"}]},"name":"clean_up_bytearray_end_slots_string_storage","nodeType":"YulFunctionDefinition","parameters":[{"name":"array","nodeType":"YulTypedName","src":"4896:5:7","type":""},{"name":"len","nodeType":"YulTypedName","src":"4903:3:7","type":""},{"name":"startIndex","nodeType":"YulTypedName","src":"4908:10:7","type":""}],"src":"4843:545:7"},{"body":{"nodeType":"YulBlock","src":"5478:81:7","statements":[{"nodeType":"YulAssignment","src":"5488:65:7","value":{"arguments":[{"arguments":[{"name":"data","nodeType":"YulIdentifier","src":"5503:4:7"},{"arguments":[{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"5521:1:7","type":"","value":"3"},{"name":"len","nodeType":"YulIdentifier","src":"5524:3:7"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"5517:3:7"},"nodeType":"YulFunctionCall","src":"5517:11:7"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"5534:1:7","type":"","value":"0"}],"functionName":{"name":"not","nodeType":"YulIdentifier","src":"5530:3:7"},"nodeType":"YulFunctionCall","src":"5530:6:7"}],"functionName":{"name":"shr","nodeType":"YulIdentifier","src":"5513:3:7"},"nodeType":"YulFunctionCall","src":"5513:24:7"}],"functionName":{"name":"not","nodeType":"YulIdentifier","src":"5509:3:7"},"nodeType":"YulFunctionCall","src":"5509:29:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"5499:3:7"},"nodeType":"YulFunctionCall","src":"5499:40:7"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"5545:1:7","type":"","value":"1"},{"name":"len","nodeType":"YulIdentifier","src":"5548:3:7"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"5541:3:7"},"nodeType":"YulFunctionCall","src":"5541:11:7"}],"functionName":{"name":"or","nodeType":"YulIdentifier","src":"5496:2:7"},"nodeType":"YulFunctionCall","src":"5496:57:7"},"variableNames":[{"name":"used","nodeType":"YulIdentifier","src":"5488:4:7"}]}]},"name":"extract_used_part_and_set_length_of_short_byte_array","nodeType":"YulFunctionDefinition","parameters":[{"name":"data","nodeType":"YulTypedName","src":"5455:4:7","type":""},{"name":"len","nodeType":"YulTypedName","src":"5461:3:7","type":""}],"returnVariables":[{"name":"used","nodeType":"YulTypedName","src":"5469:4:7","type":""}],"src":"5393:166:7"},{"body":{"nodeType":"YulBlock","src":"5660:1256:7","statements":[{"nodeType":"YulVariableDeclaration","src":"5670:24:7","value":{"arguments":[{"name":"src","nodeType":"YulIdentifier","src":"5690:3:7"}],"functionName":{"name":"mload","nodeType":"YulIdentifier","src":"5684:5:7"},"nodeType":"YulFunctionCall","src":"5684:10:7"},"variables":[{"name":"newLen","nodeType":"YulTypedName","src":"5674:6:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"5737:22:7","statements":[{"expression":{"arguments":[],"functionName":{"name":"panic_error_0x41","nodeType":"YulIdentifier","src":"5739:16:7"},"nodeType":"YulFunctionCall","src":"5739:18:7"},"nodeType":"YulExpressionStatement","src":"5739:18:7"}]},"condition":{"arguments":[{"name":"newLen","nodeType":"YulIdentifier","src":"5709:6:7"},{"kind":"number","nodeType":"YulLiteral","src":"5717:18:7","type":"","value":"0xffffffffffffffff"}],"functionName":{"name":"gt","nodeType":"YulIdentifier","src":"5706:2:7"},"nodeType":"YulFunctionCall","src":"5706:30:7"},"nodeType":"YulIf","src":"5703:56:7"},{"expression":{"arguments":[{"name":"slot","nodeType":"YulIdentifier","src":"5812:4:7"},{"arguments":[{"arguments":[{"name":"slot","nodeType":"YulIdentifier","src":"5850:4:7"}],"functionName":{"name":"sload","nodeType":"YulIdentifier","src":"5844:5:7"},"nodeType":"YulFunctionCall","src":"5844:11:7"}],"functionName":{"name":"extract_byte_array_length","nodeType":"YulIdentifier","src":"5818:25:7"},"nodeType":"YulFunctionCall","src":"5818:38:7"},{"name":"newLen","nodeType":"YulIdentifier","src":"5858:6:7"}],"functionName":{"name":"clean_up_bytearray_end_slots_string_storage","nodeType":"YulIdentifier","src":"5768:43:7"},"nodeType":"YulFunctionCall","src":"5768:97:7"},"nodeType":"YulExpressionStatement","src":"5768:97:7"},{"nodeType":"YulVariableDeclaration","src":"5874:18:7","value":{"kind":"number","nodeType":"YulLiteral","src":"5891:1:7","type":"","value":"0"},"variables":[{"name":"srcOffset","nodeType":"YulTypedName","src":"5878:9:7","type":""}]},{"nodeType":"YulVariableDeclaration","src":"5901:23:7","value":{"kind":"number","nodeType":"YulLiteral","src":"5920:4:7","type":"","value":"0x20"},"variables":[{"name":"srcOffset_1","nodeType":"YulTypedName","src":"5905:11:7","type":""}]},{"nodeType":"YulAssignment","src":"5933:24:7","value":{"name":"srcOffset_1","nodeType":"YulIdentifier","src":"5946:11:7"},"variableNames":[{"name":"srcOffset","nodeType":"YulIdentifier","src":"5933:9:7"}]},{"cases":[{"body":{"nodeType":"YulBlock","src":"6003:656:7","statements":[{"nodeType":"YulVariableDeclaration","src":"6017:35:7","value":{"arguments":[{"name":"newLen","nodeType":"YulIdentifier","src":"6036:6:7"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"6048:2:7","type":"","value":"31"}],"functionName":{"name":"not","nodeType":"YulIdentifier","src":"6044:3:7"},"nodeType":"YulFunctionCall","src":"6044:7:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"6032:3:7"},"nodeType":"YulFunctionCall","src":"6032:20:7"},"variables":[{"name":"loopEnd","nodeType":"YulTypedName","src":"6021:7:7","type":""}]},{"nodeType":"YulVariableDeclaration","src":"6065:49:7","value":{"arguments":[{"name":"slot","nodeType":"YulIdentifier","src":"6109:4:7"}],"functionName":{"name":"array_dataslot_string_storage","nodeType":"YulIdentifier","src":"6079:29:7"},"nodeType":"YulFunctionCall","src":"6079:35:7"},"variables":[{"name":"dstPtr","nodeType":"YulTypedName","src":"6069:6:7","type":""}]},{"nodeType":"YulVariableDeclaration","src":"6127:10:7","value":{"kind":"number","nodeType":"YulLiteral","src":"6136:1:7","type":"","value":"0"},"variables":[{"name":"i","nodeType":"YulTypedName","src":"6131:1:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"6214:172:7","statements":[{"expression":{"arguments":[{"name":"dstPtr","nodeType":"YulIdentifier","src":"6239:6:7"},{"arguments":[{"arguments":[{"name":"src","nodeType":"YulIdentifier","src":"6257:3:7"},{"name":"srcOffset","nodeType":"YulIdentifier","src":"6262:9:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"6253:3:7"},"nodeType":"YulFunctionCall","src":"6253:19:7"}],"functionName":{"name":"mload","nodeType":"YulIdentifier","src":"6247:5:7"},"nodeType":"YulFunctionCall","src":"6247:26:7"}],"functionName":{"name":"sstore","nodeType":"YulIdentifier","src":"6232:6:7"},"nodeType":"YulFunctionCall","src":"6232:42:7"},"nodeType":"YulExpressionStatement","src":"6232:42:7"},{"nodeType":"YulAssignment","src":"6291:24:7","value":{"arguments":[{"name":"dstPtr","nodeType":"YulIdentifier","src":"6305:6:7"},{"kind":"number","nodeType":"YulLiteral","src":"6313:1:7","type":"","value":"1"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"6301:3:7"},"nodeType":"YulFunctionCall","src":"6301:14:7"},"variableNames":[{"name":"dstPtr","nodeType":"YulIdentifier","src":"6291:6:7"}]},{"nodeType":"YulAssignment","src":"6332:40:7","value":{"arguments":[{"name":"srcOffset","nodeType":"YulIdentifier","src":"6349:9:7"},{"name":"srcOffset_1","nodeType":"YulIdentifier","src":"6360:11:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"6345:3:7"},"nodeType":"YulFunctionCall","src":"6345:27:7"},"variableNames":[{"name":"srcOffset","nodeType":"YulIdentifier","src":"6332:9:7"}]}]},"condition":{"arguments":[{"name":"i","nodeType":"YulIdentifier","src":"6161:1:7"},{"name":"loopEnd","nodeType":"YulIdentifier","src":"6164:7:7"}],"functionName":{"name":"lt","nodeType":"YulIdentifier","src":"6158:2:7"},"nodeType":"YulFunctionCall","src":"6158:14:7"},"nodeType":"YulForLoop","post":{"nodeType":"YulBlock","src":"6173:28:7","statements":[{"nodeType":"YulAssignment","src":"6175:24:7","value":{"arguments":[{"name":"i","nodeType":"YulIdentifier","src":"6184:1:7"},{"name":"srcOffset_1","nodeType":"YulIdentifier","src":"6187:11:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"6180:3:7"},"nodeType":"YulFunctionCall","src":"6180:19:7"},"variableNames":[{"name":"i","nodeType":"YulIdentifier","src":"6175:1:7"}]}]},"pre":{"nodeType":"YulBlock","src":"6154:3:7","statements":[]},"src":"6150:236:7"},{"body":{"nodeType":"YulBlock","src":"6434:166:7","statements":[{"nodeType":"YulVariableDeclaration","src":"6452:43:7","value":{"arguments":[{"arguments":[{"name":"src","nodeType":"YulIdentifier","src":"6479:3:7"},{"name":"srcOffset","nodeType":"YulIdentifier","src":"6484:9:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"6475:3:7"},"nodeType":"YulFunctionCall","src":"6475:19:7"}],"functionName":{"name":"mload","nodeType":"YulIdentifier","src":"6469:5:7"},"nodeType":"YulFunctionCall","src":"6469:26:7"},"variables":[{"name":"lastValue","nodeType":"YulTypedName","src":"6456:9:7","type":""}]},{"expression":{"arguments":[{"name":"dstPtr","nodeType":"YulIdentifier","src":"6519:6:7"},{"arguments":[{"name":"lastValue","nodeType":"YulIdentifier","src":"6531:9:7"},{"arguments":[{"arguments":[{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"6558:1:7","type":"","value":"3"},{"name":"newLen","nodeType":"YulIdentifier","src":"6561:6:7"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"6554:3:7"},"nodeType":"YulFunctionCall","src":"6554:14:7"},{"kind":"number","nodeType":"YulLiteral","src":"6570:3:7","type":"","value":"248"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"6550:3:7"},"nodeType":"YulFunctionCall","src":"6550:24:7"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"6580:1:7","type":"","value":"0"}],"functionName":{"name":"not","nodeType":"YulIdentifier","src":"6576:3:7"},"nodeType":"YulFunctionCall","src":"6576:6:7"}],"functionName":{"name":"shr","nodeType":"YulIdentifier","src":"6546:3:7"},"nodeType":"YulFunctionCall","src":"6546:37:7"}],"functionName":{"name":"not","nodeType":"YulIdentifier","src":"6542:3:7"},"nodeType":"YulFunctionCall","src":"6542:42:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"6527:3:7"},"nodeType":"YulFunctionCall","src":"6527:58:7"}],"functionName":{"name":"sstore","nodeType":"YulIdentifier","src":"6512:6:7"},"nodeType":"YulFunctionCall","src":"6512:74:7"},"nodeType":"YulExpressionStatement","src":"6512:74:7"}]},"condition":{"arguments":[{"name":"loopEnd","nodeType":"YulIdentifier","src":"6405:7:7"},{"name":"newLen","nodeType":"YulIdentifier","src":"6414:6:7"}],"functionName":{"name":"lt","nodeType":"YulIdentifier","src":"6402:2:7"},"nodeType":"YulFunctionCall","src":"6402:19:7"},"nodeType":"YulIf","src":"6399:201:7"},{"expression":{"arguments":[{"name":"slot","nodeType":"YulIdentifier","src":"6620:4:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"6634:1:7","type":"","value":"1"},{"name":"newLen","nodeType":"YulIdentifier","src":"6637:6:7"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"6630:3:7"},"nodeType":"YulFunctionCall","src":"6630:14:7"},{"kind":"number","nodeType":"YulLiteral","src":"6646:1:7","type":"","value":"1"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"6626:3:7"},"nodeType":"YulFunctionCall","src":"6626:22:7"}],"functionName":{"name":"sstore","nodeType":"YulIdentifier","src":"6613:6:7"},"nodeType":"YulFunctionCall","src":"6613:36:7"},"nodeType":"YulExpressionStatement","src":"6613:36:7"}]},"nodeType":"YulCase","src":"5996:663:7","value":{"kind":"number","nodeType":"YulLiteral","src":"6001:1:7","type":"","value":"1"}},{"body":{"nodeType":"YulBlock","src":"6676:234:7","statements":[{"nodeType":"YulVariableDeclaration","src":"6690:14:7","value":{"kind":"number","nodeType":"YulLiteral","src":"6703:1:7","type":"","value":"0"},"variables":[{"name":"value","nodeType":"YulTypedName","src":"6694:5:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"6739:67:7","statements":[{"nodeType":"YulAssignment","src":"6757:35:7","value":{"arguments":[{"arguments":[{"name":"src","nodeType":"YulIdentifier","src":"6776:3:7"},{"name":"srcOffset","nodeType":"YulIdentifier","src":"6781:9:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"6772:3:7"},"nodeType":"YulFunctionCall","src":"6772:19:7"}],"functionName":{"name":"mload","nodeType":"YulIdentifier","src":"6766:5:7"},"nodeType":"YulFunctionCall","src":"6766:26:7"},"variableNames":[{"name":"value","nodeType":"YulIdentifier","src":"6757:5:7"}]}]},"condition":{"name":"newLen","nodeType":"YulIdentifier","src":"6720:6:7"},"nodeType":"YulIf","src":"6717:89:7"},{"expression":{"arguments":[{"name":"slot","nodeType":"YulIdentifier","src":"6826:4:7"},{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"6885:5:7"},{"name":"newLen","nodeType":"YulIdentifier","src":"6892:6:7"}],"functionName":{"name":"extract_used_part_and_set_length_of_short_byte_array","nodeType":"YulIdentifier","src":"6832:52:7"},"nodeType":"YulFunctionCall","src":"6832:67:7"}],"functionName":{"name":"sstore","nodeType":"YulIdentifier","src":"6819:6:7"},"nodeType":"YulFunctionCall","src":"6819:81:7"},"nodeType":"YulExpressionStatement","src":"6819:81:7"}]},"nodeType":"YulCase","src":"6668:242:7","value":"default"}],"expression":{"arguments":[{"name":"newLen","nodeType":"YulIdentifier","src":"5976:6:7"},{"kind":"number","nodeType":"YulLiteral","src":"5984:2:7","type":"","value":"31"}],"functionName":{"name":"gt","nodeType":"YulIdentifier","src":"5973:2:7"},"nodeType":"YulFunctionCall","src":"5973:14:7"},"nodeType":"YulSwitch","src":"5966:944:7"}]},"name":"copy_byte_array_to_storage_from_t_string_memory_ptr_to_t_string_storage","nodeType":"YulFunctionDefinition","parameters":[{"name":"slot","nodeType":"YulTypedName","src":"5645:4:7","type":""},{"name":"src","nodeType":"YulTypedName","src":"5651:3:7","type":""}],"src":"5564:1352:7"},{"body":{"nodeType":"YulBlock","src":"7112:14:7","statements":[{"nodeType":"YulAssignment","src":"7114:10:7","value":{"name":"pos","nodeType":"YulIdentifier","src":"7121:3:7"},"variableNames":[{"name":"end","nodeType":"YulIdentifier","src":"7114:3:7"}]}]},"name":"abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"pos","nodeType":"YulTypedName","src":"7096:3:7","type":""}],"returnVariables":[{"name":"end","nodeType":"YulTypedName","src":"7104:3:7","type":""}],"src":"6921:205:7"}]},"contents":"{\n    { }\n    function abi_decode_tuple_t_string_calldata_ptr(headStart, dataEnd) -> value0, value1\n    {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n        let offset := calldataload(headStart)\n        let _1 := 0xffffffffffffffff\n        if gt(offset, _1) { revert(0, 0) }\n        let _2 := add(headStart, offset)\n        if iszero(slt(add(_2, 0x1f), dataEnd)) { revert(0, 0) }\n        let length := calldataload(_2)\n        if gt(length, _1) { revert(0, 0) }\n        if gt(add(add(_2, length), 32), dataEnd) { revert(0, 0) }\n        value0 := add(_2, 32)\n        value1 := length\n    }\n    function abi_encode_tuple_t_bytes32__to_t_bytes32__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, value0)\n    }\n    function abi_decode_address(offset) -> value\n    {\n        value := calldataload(offset)\n        if iszero(eq(value, and(value, sub(shl(160, 1), 1)))) { revert(0, 0) }\n    }\n    function abi_decode_tuple_t_address(headStart, dataEnd) -> value0\n    {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n        value0 := abi_decode_address(headStart)\n    }\n    function abi_encode_bool(value, pos)\n    {\n        mstore(pos, iszero(iszero(value)))\n    }\n    function abi_encode_tuple_t_bool__to_t_bool__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, iszero(iszero(value0)))\n    }\n    function abi_decode_tuple_t_bytes32(headStart, dataEnd) -> value0\n    {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n        value0 := calldataload(headStart)\n    }\n    function abi_encode_tuple_t_address_t_string_memory_ptr_t_uint256_t_bool_t_bool__to_t_address_t_string_memory_ptr_t_uint256_t_bool_t_bool__fromStack_reversed(headStart, value4, value3, value2, value1, value0) -> tail\n    {\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n        let _1 := 32\n        mstore(add(headStart, _1), 160)\n        let length := mload(value1)\n        mstore(add(headStart, 160), length)\n        let i := 0\n        for { } lt(i, length) { i := add(i, _1) }\n        {\n            mstore(add(add(headStart, i), 192), mload(add(add(value1, i), _1)))\n        }\n        mstore(add(add(headStart, length), 192), 0)\n        tail := add(add(headStart, and(add(length, 31), not(31))), 192)\n        mstore(add(headStart, 64), value2)\n        abi_encode_bool(value3, add(headStart, 96))\n        abi_encode_bool(value4, add(headStart, 128))\n    }\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, value0)\n    }\n    function abi_encode_tuple_t_contract$_IVitalityRegistry_$1058__to_t_address__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n    function abi_encode_tuple_t_address__to_t_address__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n    function abi_decode_tuple_t_bytes32t_address(headStart, dataEnd) -> value0, value1\n    {\n        if slt(sub(dataEnd, headStart), 64) { revert(0, 0) }\n        value0 := calldataload(headStart)\n        value1 := abi_decode_address(add(headStart, 32))\n    }\n    function increment_t_uint256(value) -> ret\n    {\n        if eq(value, not(0))\n        {\n            mstore(0, shl(224, 0x4e487b71))\n            mstore(4, 0x11)\n            revert(0, 0x24)\n        }\n        ret := add(value, 1)\n    }\n    function abi_encode_tuple_packed_t_address_t_string_calldata_ptr_t_uint256_t_uint256_t_uint256__to_t_address_t_string_memory_ptr_t_uint256_t_uint256_t_uint256__nonPadded_inplace_fromStack_reversed(pos, value5, value4, value3, value2, value1, value0) -> end\n    {\n        mstore(pos, and(shl(96, value0), not(0xffffffffffffffffffffffff)))\n        calldatacopy(add(pos, 20), value1, value2)\n        let _1 := add(pos, value2)\n        mstore(add(_1, 20), value3)\n        mstore(add(_1, 52), value4)\n        mstore(add(_1, 84), value5)\n        end := add(_1, 116)\n    }\n    function panic_error_0x41()\n    {\n        mstore(0, shl(224, 0x4e487b71))\n        mstore(4, 0x41)\n        revert(0, 0x24)\n    }\n    function extract_byte_array_length(data) -> length\n    {\n        length := shr(1, data)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) { length := and(length, 0x7f) }\n        if eq(outOfPlaceEncoding, lt(length, 32))\n        {\n            mstore(0, shl(224, 0x4e487b71))\n            mstore(4, 0x22)\n            revert(0, 0x24)\n        }\n    }\n    function array_dataslot_string_storage(ptr) -> data\n    {\n        mstore(0, ptr)\n        data := keccak256(0, 0x20)\n    }\n    function clean_up_bytearray_end_slots_string_storage(array, len, startIndex)\n    {\n        if gt(len, 31)\n        {\n            let _1 := 0\n            mstore(_1, array)\n            let data := keccak256(_1, 0x20)\n            let deleteStart := add(data, shr(5, add(startIndex, 31)))\n            if lt(startIndex, 0x20) { deleteStart := data }\n            let _2 := add(data, shr(5, add(len, 31)))\n            let start := deleteStart\n            for { } lt(start, _2) { start := add(start, 1) }\n            { sstore(start, _1) }\n        }\n    }\n    function extract_used_part_and_set_length_of_short_byte_array(data, len) -> used\n    {\n        used := or(and(data, not(shr(shl(3, len), not(0)))), shl(1, len))\n    }\n    function copy_byte_array_to_storage_from_t_string_memory_ptr_to_t_string_storage(slot, src)\n    {\n        let newLen := mload(src)\n        if gt(newLen, 0xffffffffffffffff) { panic_error_0x41() }\n        clean_up_bytearray_end_slots_string_storage(slot, extract_byte_array_length(sload(slot)), newLen)\n        let srcOffset := 0\n        let srcOffset_1 := 0x20\n        srcOffset := srcOffset_1\n        switch gt(newLen, 31)\n        case 1 {\n            let loopEnd := and(newLen, not(31))\n            let dstPtr := array_dataslot_string_storage(slot)\n            let i := 0\n            for { } lt(i, loopEnd) { i := add(i, srcOffset_1) }\n            {\n                sstore(dstPtr, mload(add(src, srcOffset)))\n                dstPtr := add(dstPtr, 1)\n                srcOffset := add(srcOffset, srcOffset_1)\n            }\n            if lt(loopEnd, newLen)\n            {\n                let lastValue := mload(add(src, srcOffset))\n                sstore(dstPtr, and(lastValue, not(shr(and(shl(3, newLen), 248), not(0)))))\n            }\n            sstore(slot, add(shl(1, newLen), 1))\n        }\n        default {\n            let value := 0\n            if newLen\n            {\n                value := mload(add(src, srcOffset))\n            }\n            sstore(slot, extract_used_part_and_set_length_of_short_byte_array(value, newLen))\n        }\n    }\n    function abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed(pos) -> end\n    { end := pos }\n}","id":7,"language":"Yul","name":"#utility.yul"}],"immutableReferences":{},"linkReferences":{},"object":"6080604052600436106100ab5760003560e01c80637b103999116100645780637b1039991461019b5780638da5cb5b146101d3578063b646c194146101f1578063bf5522da14610211578063cce5b74b14610231578063f2fde38b1461025157600080fd5b806306868c4b146100b75780630a144391146100dd5780632417395c1461011d5780633e362c961461014e5780636cf4c88f14610164578063715018a61461018657600080fd5b366100b257005b600080fd5b6100ca6100c53660046108f5565b610271565b6040519081526020015b60405180910390f35b3480156100e957600080fd5b5061010d6100f8366004610983565b60056020526000908152604090205460ff1681565b60405190151581526020016100d4565b34801561012957600080fd5b5061013d6101383660046109a5565b6103f2565b6040516100d49594939291906109be565b34801561015a57600080fd5b506100ca60045481565b34801561017057600080fd5b5061018461017f366004610983565b6104da565b005b34801561019257600080fd5b50610184610503565b3480156101a757600080fd5b506002546101bb906001600160a01b031681565b6040516001600160a01b0390911681526020016100d4565b3480156101df57600080fd5b506000546001600160a01b03166101bb565b3480156101fd57600080fd5b5061018461020c366004610983565b610517565b34801561021d57600080fd5b5061013d61022c3660046109a5565b610543565b34801561023d57600080fd5b5061018461024c366004610a3b565b61060b565b34801561025d57600080fd5b5061018461026c366004610983565b61080b565b60003460000361029457604051636bbdb6db60e11b815260040160405180910390fd5b600480549060006102a483610a67565b9190505550600033848434436004546040516020016102c896959493929190610a8e565b60408051601f19818403018152828252805160209182012060a0840183523384528251601f880183900483028101830190935286835293508281019190879087908190840183828082843760009201829052509385525050346020808501919091526001604080860182905260609095018490528684526003825293909220845181546001600160a01b0319166001600160a01b03909116178155918401519192830191610377915082610b67565b50604082810151600283015560608301516003909201805460809094015161ffff1990941692151561ff00191692909217610100931515939093029290921790555134815281907fa5968139833b3514d7c565f873ebc2a5af89c7f67bd436b227206a21ff73676d9060200160405180910390a29392505050565b60008181526003602081905260408220805460028201549282015460018301805460609587958695869591946001600160a01b039091169390929160ff808216926101009092041690849061044690610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461047290610ade565b80156104bf5780601f10610494576101008083540402835291602001916104bf565b820191906000526020600020905b8154815290600101906020018083116104a257829003601f168201915b50505050509350955095509550955095505091939590929450565b6104e261084e565b6001600160a01b03166000908152600560205260409020805460ff19169055565b61050b61084e565b610515600061087b565b565b61051f61084e565b6001600160a01b03166000908152600560205260409020805460ff19166001179055565b600360205260009081526040902080546001820180546001600160a01b03909216929161056f90610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461059b90610ade565b80156105e85780601f106105bd576101008083540402835291602001916105e8565b820191906000526020600020905b8154815290600101906020018083116105cb57829003601f168201915b50505050600283015460039093015491929160ff80821692506101009091041685565b3360009081526005602052604090205460ff1615801561063657506000546001600160a01b03163314155b1561065457604051630197e13360e61b815260040160405180910390fd5b61065c6108cb565b60008281526003602081905260409091209081015460ff166106915760405163226d32fb60e21b815260040160405180910390fd5b6003810154610100900460ff16156106bc576040516326182e5f60e11b815260040160405180910390fd5b80600201546000036106e1576040516324ce57e760e21b815260040160405180910390fd5b60038101805461ffff191661010017905560028101546040516000916001600160a01b038516918381818185875af1925050503d8060008114610740576040519150601f19603f3d011682016040523d82523d6000602084013e610745565b606091505b5050905080610767576040516312171d8360e31b815260040160405180910390fd5b600254604051638e97fdc360e01b81526001600160a01b03858116600483015290911690638e97fdc390602401600060405180830381600087803b1580156107ae57600080fd5b505af11580156107c2573d6000803e3d6000fd5b50506040516001600160a01b03861692508691507f2c87d92d54fcf72b587c92c2d781bc23399eef1715fd00cae882bd1316781a4b90600090a3505061080760018055565b5050565b61081361084e565b6001600160a01b03811661084257604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61084b8161087b565b50565b6000546001600160a01b031633146105155760405163118cdaa760e01b8152336004820152602401610839565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6002600154036108ee57604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6000806020838503121561090857600080fd5b823567ffffffffffffffff8082111561092057600080fd5b818501915085601f83011261093457600080fd5b81358181111561094357600080fd5b86602082850101111561095557600080fd5b60209290920196919550909350505050565b80356001600160a01b038116811461097e57600080fd5b919050565b60006020828403121561099557600080fd5b61099e82610967565b9392505050565b6000602082840312156109b757600080fd5b5035919050565b60018060a01b03861681526000602060a08184015286518060a085015260005b818110156109fa5788810183015185820160c0015282016109de565b50600060c0828601015260c0601f19601f83011685010192505050846040830152610a29606083018515159052565b82151560808301529695505050505050565b60008060408385031215610a4e57600080fd5b82359150610a5e60208401610967565b90509250929050565b600060018201610a8757634e487b7160e01b600052601160045260246000fd5b5060010190565b6bffffffffffffffffffffffff198760601b1681528486601483013760149401938401929092526034830152605482015260740192915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680610af257607f821691505b602082108103610b1257634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610b6257600081815260208120601f850160051c81016020861015610b3f5750805b601f850160051c820191505b81811015610b5e57828155600101610b4b565b5050505b505050565b815167ffffffffffffffff811115610b8157610b81610ac8565b610b9581610b8f8454610ade565b84610b18565b602080601f831160018114610bca5760008415610bb25750858301515b600019600386901b1c1916600185901b178555610b5e565b600085815260208120601f198616915b82811015610bf957888601518255948401946001909101908401610bda565b5085821015610c175787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220234ff02bc4c745dcd853431b948b046aca836d4dff35c0c3fb926ce62c18269364736f6c63430008140033","opcodes":"PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xAB JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x7B103999 GT PUSH2 0x64 JUMPI DUP1 PUSH4 0x7B103999 EQ PUSH2 0x19B JUMPI DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x1D3 JUMPI DUP1 PUSH4 0xB646C194 EQ PUSH2 0x1F1 JUMPI DUP1 PUSH4 0xBF5522DA EQ PUSH2 0x211 JUMPI DUP1 PUSH4 0xCCE5B74B EQ PUSH2 0x231 JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x251 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x6868C4B EQ PUSH2 0xB7 JUMPI DUP1 PUSH4 0xA144391 EQ PUSH2 0xDD JUMPI DUP1 PUSH4 0x2417395C EQ PUSH2 0x11D JUMPI DUP1 PUSH4 0x3E362C96 EQ PUSH2 0x14E JUMPI DUP1 PUSH4 0x6CF4C88F EQ PUSH2 0x164 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0x186 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST CALLDATASIZE PUSH2 0xB2 JUMPI STOP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0xCA PUSH2 0xC5 CALLDATASIZE PUSH1 0x4 PUSH2 0x8F5 JUMP JUMPDEST PUSH2 0x271 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0xE9 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x10D PUSH2 0xF8 CALLDATASIZE PUSH1 0x4 PUSH2 0x983 JUMP JUMPDEST PUSH1 0x5 PUSH1 0x20 MSTORE PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH1 0xFF AND DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 ISZERO ISZERO DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xD4 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x129 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x13D PUSH2 0x138 CALLDATASIZE PUSH1 0x4 PUSH2 0x9A5 JUMP JUMPDEST PUSH2 0x3F2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0xD4 SWAP6 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x9BE JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x15A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0xCA PUSH1 0x4 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x170 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x17F CALLDATASIZE PUSH1 0x4 PUSH2 0x983 JUMP JUMPDEST PUSH2 0x4DA JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x192 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x503 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1A7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x2 SLOAD PUSH2 0x1BB SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0xD4 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1DF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x1BB JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1FD JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x20C CALLDATASIZE PUSH1 0x4 PUSH2 0x983 JUMP JUMPDEST PUSH2 0x517 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x21D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x13D PUSH2 0x22C CALLDATASIZE PUSH1 0x4 PUSH2 0x9A5 JUMP JUMPDEST PUSH2 0x543 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x23D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x24C CALLDATASIZE PUSH1 0x4 PUSH2 0xA3B JUMP JUMPDEST PUSH2 0x60B JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x25D JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x184 PUSH2 0x26C CALLDATASIZE PUSH1 0x4 PUSH2 0x983 JUMP JUMPDEST PUSH2 0x80B JUMP JUMPDEST PUSH1 0x0 CALLVALUE PUSH1 0x0 SUB PUSH2 0x294 JUMPI PUSH1 0x40 MLOAD PUSH4 0x6BBDB6DB PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x4 DUP1 SLOAD SWAP1 PUSH1 0x0 PUSH2 0x2A4 DUP4 PUSH2 0xA67 JUMP JUMPDEST SWAP2 SWAP1 POP SSTORE POP PUSH1 0x0 CALLER DUP5 DUP5 CALLVALUE NUMBER PUSH1 0x4 SLOAD PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0x2C8 SWAP7 SWAP6 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0xA8E JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0x1F NOT DUP2 DUP5 SUB ADD DUP2 MSTORE DUP3 DUP3 MSTORE DUP1 MLOAD PUSH1 0x20 SWAP2 DUP3 ADD KECCAK256 PUSH1 0xA0 DUP5 ADD DUP4 MSTORE CALLER DUP5 MSTORE DUP3 MLOAD PUSH1 0x1F DUP9 ADD DUP4 SWAP1 DIV DUP4 MUL DUP2 ADD DUP4 ADD SWAP1 SWAP4 MSTORE DUP7 DUP4 MSTORE SWAP4 POP DUP3 DUP2 ADD SWAP2 SWAP1 DUP8 SWAP1 DUP8 SWAP1 DUP2 SWAP1 DUP5 ADD DUP4 DUP3 DUP1 DUP3 DUP5 CALLDATACOPY PUSH1 0x0 SWAP3 ADD DUP3 SWAP1 MSTORE POP SWAP4 DUP6 MSTORE POP POP CALLVALUE PUSH1 0x20 DUP1 DUP6 ADD SWAP2 SWAP1 SWAP2 MSTORE PUSH1 0x1 PUSH1 0x40 DUP1 DUP7 ADD DUP3 SWAP1 MSTORE PUSH1 0x60 SWAP1 SWAP6 ADD DUP5 SWAP1 MSTORE DUP7 DUP5 MSTORE PUSH1 0x3 DUP3 MSTORE SWAP4 SWAP1 SWAP3 KECCAK256 DUP5 MLOAD DUP2 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND OR DUP2 SSTORE SWAP2 DUP5 ADD MLOAD SWAP2 SWAP3 DUP4 ADD SWAP2 PUSH2 0x377 SWAP2 POP DUP3 PUSH2 0xB67 JUMP JUMPDEST POP PUSH1 0x40 DUP3 DUP2 ADD MLOAD PUSH1 0x2 DUP4 ADD SSTORE PUSH1 0x60 DUP4 ADD MLOAD PUSH1 0x3 SWAP1 SWAP3 ADD DUP1 SLOAD PUSH1 0x80 SWAP1 SWAP5 ADD MLOAD PUSH2 0xFFFF NOT SWAP1 SWAP5 AND SWAP3 ISZERO ISZERO PUSH2 0xFF00 NOT AND SWAP3 SWAP1 SWAP3 OR PUSH2 0x100 SWAP4 ISZERO ISZERO SWAP4 SWAP1 SWAP4 MUL SWAP3 SWAP1 SWAP3 OR SWAP1 SSTORE MLOAD CALLVALUE DUP2 MSTORE DUP2 SWAP1 PUSH32 0xA5968139833B3514D7C565F873EBC2A5AF89C7F67BD436B227206A21FF73676D SWAP1 PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG2 SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 DUP3 KECCAK256 DUP1 SLOAD PUSH1 0x2 DUP3 ADD SLOAD SWAP3 DUP3 ADD SLOAD PUSH1 0x1 DUP4 ADD DUP1 SLOAD PUSH1 0x60 SWAP6 DUP8 SWAP6 DUP7 SWAP6 DUP7 SWAP6 SWAP2 SWAP5 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND SWAP4 SWAP1 SWAP3 SWAP2 PUSH1 0xFF DUP1 DUP3 AND SWAP3 PUSH2 0x100 SWAP1 SWAP3 DIV AND SWAP1 DUP5 SWAP1 PUSH2 0x446 SWAP1 PUSH2 0xADE JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x472 SWAP1 PUSH2 0xADE JUMP JUMPDEST DUP1 ISZERO PUSH2 0x4BF JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x494 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x4BF JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x4A2 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP4 POP SWAP6 POP SWAP6 POP SWAP6 POP SWAP6 POP SWAP6 POP POP SWAP2 SWAP4 SWAP6 SWAP1 SWAP3 SWAP5 POP JUMP JUMPDEST PUSH2 0x4E2 PUSH2 0x84E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0xFF NOT AND SWAP1 SSTORE JUMP JUMPDEST PUSH2 0x50B PUSH2 0x84E JUMP JUMPDEST PUSH2 0x515 PUSH1 0x0 PUSH2 0x87B JUMP JUMPDEST JUMP JUMPDEST PUSH2 0x51F PUSH2 0x84E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0xFF NOT AND PUSH1 0x1 OR SWAP1 SSTORE JUMP JUMPDEST PUSH1 0x3 PUSH1 0x20 MSTORE PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x40 SWAP1 KECCAK256 DUP1 SLOAD PUSH1 0x1 DUP3 ADD DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP3 AND SWAP3 SWAP2 PUSH2 0x56F SWAP1 PUSH2 0xADE JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x59B SWAP1 PUSH2 0xADE JUMP JUMPDEST DUP1 ISZERO PUSH2 0x5E8 JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x5BD JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x5E8 JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x5CB JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP PUSH1 0x2 DUP4 ADD SLOAD PUSH1 0x3 SWAP1 SWAP4 ADD SLOAD SWAP2 SWAP3 SWAP2 PUSH1 0xFF DUP1 DUP3 AND SWAP3 POP PUSH2 0x100 SWAP1 SWAP2 DIV AND DUP6 JUMP JUMPDEST CALLER PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x5 PUSH1 0x20 MSTORE PUSH1 0x40 SWAP1 KECCAK256 SLOAD PUSH1 0xFF AND ISZERO DUP1 ISZERO PUSH2 0x636 JUMPI POP PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ ISZERO JUMPDEST ISZERO PUSH2 0x654 JUMPI PUSH1 0x40 MLOAD PUSH4 0x197E133 PUSH1 0xE6 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x65C PUSH2 0x8CB JUMP JUMPDEST PUSH1 0x0 DUP3 DUP2 MSTORE PUSH1 0x3 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 SWAP1 DUP2 ADD SLOAD PUSH1 0xFF AND PUSH2 0x691 JUMPI PUSH1 0x40 MLOAD PUSH4 0x226D32FB PUSH1 0xE2 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x3 DUP2 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND ISZERO PUSH2 0x6BC JUMPI PUSH1 0x40 MLOAD PUSH4 0x26182E5F PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x2 ADD SLOAD PUSH1 0x0 SUB PUSH2 0x6E1 JUMPI PUSH1 0x40 MLOAD PUSH4 0x24CE57E7 PUSH1 0xE2 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x3 DUP2 ADD DUP1 SLOAD PUSH2 0xFFFF NOT AND PUSH2 0x100 OR SWAP1 SSTORE PUSH1 0x2 DUP2 ADD SLOAD PUSH1 0x40 MLOAD PUSH1 0x0 SWAP2 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP6 AND SWAP2 DUP4 DUP2 DUP2 DUP2 DUP6 DUP8 GAS CALL SWAP3 POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x740 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x745 JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP SWAP1 POP DUP1 PUSH2 0x767 JUMPI PUSH1 0x40 MLOAD PUSH4 0x12171D83 PUSH1 0xE3 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 SLOAD PUSH1 0x40 MLOAD PUSH4 0x8E97FDC3 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP6 DUP2 AND PUSH1 0x4 DUP4 ADD MSTORE SWAP1 SWAP2 AND SWAP1 PUSH4 0x8E97FDC3 SWAP1 PUSH1 0x24 ADD PUSH1 0x0 PUSH1 0x40 MLOAD DUP1 DUP4 SUB DUP2 PUSH1 0x0 DUP8 DUP1 EXTCODESIZE ISZERO DUP1 ISZERO PUSH2 0x7AE JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP GAS CALL ISZERO DUP1 ISZERO PUSH2 0x7C2 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP7 AND SWAP3 POP DUP7 SWAP2 POP PUSH32 0x2C87D92D54FCF72B587C92C2D781BC23399EEF1715FD00CAE882BD1316781A4B SWAP1 PUSH1 0x0 SWAP1 LOG3 POP POP PUSH2 0x807 PUSH1 0x1 DUP1 SSTORE JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH2 0x813 PUSH2 0x84E JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH2 0x842 JUMPI PUSH1 0x40 MLOAD PUSH4 0x1E4FBDF7 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x0 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x84B DUP2 PUSH2 0x87B JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ PUSH2 0x515 JUMPI PUSH1 0x40 MLOAD PUSH4 0x118CDAA7 PUSH1 0xE0 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD PUSH2 0x839 JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT DUP4 AND DUP2 OR DUP5 SSTORE PUSH1 0x40 MLOAD SWAP2 SWAP1 SWAP3 AND SWAP3 DUP4 SWAP2 PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 SWAP2 SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x2 PUSH1 0x1 SLOAD SUB PUSH2 0x8EE JUMPI PUSH1 0x40 MLOAD PUSH4 0x3EE5AEB5 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 PUSH1 0x1 SSTORE JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x20 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x908 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP3 CALLDATALOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP1 DUP3 GT ISZERO PUSH2 0x920 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 DUP6 ADD SWAP2 POP DUP6 PUSH1 0x1F DUP4 ADD SLT PUSH2 0x934 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD DUP2 DUP2 GT ISZERO PUSH2 0x943 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP7 PUSH1 0x20 DUP3 DUP6 ADD ADD GT ISZERO PUSH2 0x955 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x20 SWAP3 SWAP1 SWAP3 ADD SWAP7 SWAP2 SWAP6 POP SWAP1 SWAP4 POP POP POP POP JUMP JUMPDEST DUP1 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0x97E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x995 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x99E DUP3 PUSH2 0x967 JUMP JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x9B7 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLDATALOAD SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x1 DUP1 PUSH1 0xA0 SHL SUB DUP7 AND DUP2 MSTORE PUSH1 0x0 PUSH1 0x20 PUSH1 0xA0 DUP2 DUP5 ADD MSTORE DUP7 MLOAD DUP1 PUSH1 0xA0 DUP6 ADD MSTORE PUSH1 0x0 JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0x9FA JUMPI DUP9 DUP2 ADD DUP4 ADD MLOAD DUP6 DUP3 ADD PUSH1 0xC0 ADD MSTORE DUP3 ADD PUSH2 0x9DE JUMP JUMPDEST POP PUSH1 0x0 PUSH1 0xC0 DUP3 DUP7 ADD ADD MSTORE PUSH1 0xC0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND DUP6 ADD ADD SWAP3 POP POP POP DUP5 PUSH1 0x40 DUP4 ADD MSTORE PUSH2 0xA29 PUSH1 0x60 DUP4 ADD DUP6 ISZERO ISZERO SWAP1 MSTORE JUMP JUMPDEST DUP3 ISZERO ISZERO PUSH1 0x80 DUP4 ADD MSTORE SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0xA4E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP3 CALLDATALOAD SWAP2 POP PUSH2 0xA5E PUSH1 0x20 DUP5 ADD PUSH2 0x967 JUMP JUMPDEST SWAP1 POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 DUP3 ADD PUSH2 0xA87 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP PUSH1 0x1 ADD SWAP1 JUMP JUMPDEST PUSH12 0xFFFFFFFFFFFFFFFFFFFFFFFF NOT DUP8 PUSH1 0x60 SHL AND DUP2 MSTORE DUP5 DUP7 PUSH1 0x14 DUP4 ADD CALLDATACOPY PUSH1 0x14 SWAP5 ADD SWAP4 DUP5 ADD SWAP3 SWAP1 SWAP3 MSTORE PUSH1 0x34 DUP4 ADD MSTORE PUSH1 0x54 DUP3 ADD MSTORE PUSH1 0x74 ADD SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x41 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x1 DUP2 DUP2 SHR SWAP1 DUP3 AND DUP1 PUSH2 0xAF2 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 SUB PUSH2 0xB12 JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x1F DUP3 GT ISZERO PUSH2 0xB62 JUMPI PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x20 DUP2 KECCAK256 PUSH1 0x1F DUP6 ADD PUSH1 0x5 SHR DUP2 ADD PUSH1 0x20 DUP7 LT ISZERO PUSH2 0xB3F JUMPI POP DUP1 JUMPDEST PUSH1 0x1F DUP6 ADD PUSH1 0x5 SHR DUP3 ADD SWAP2 POP JUMPDEST DUP2 DUP2 LT ISZERO PUSH2 0xB5E JUMPI DUP3 DUP2 SSTORE PUSH1 0x1 ADD PUSH2 0xB4B JUMP JUMPDEST POP POP POP JUMPDEST POP POP POP JUMP JUMPDEST DUP2 MLOAD PUSH8 0xFFFFFFFFFFFFFFFF DUP2 GT ISZERO PUSH2 0xB81 JUMPI PUSH2 0xB81 PUSH2 0xAC8 JUMP JUMPDEST PUSH2 0xB95 DUP2 PUSH2 0xB8F DUP5 SLOAD PUSH2 0xADE JUMP JUMPDEST DUP5 PUSH2 0xB18 JUMP JUMPDEST PUSH1 0x20 DUP1 PUSH1 0x1F DUP4 GT PUSH1 0x1 DUP2 EQ PUSH2 0xBCA JUMPI PUSH1 0x0 DUP5 ISZERO PUSH2 0xBB2 JUMPI POP DUP6 DUP4 ADD MLOAD JUMPDEST PUSH1 0x0 NOT PUSH1 0x3 DUP7 SWAP1 SHL SHR NOT AND PUSH1 0x1 DUP6 SWAP1 SHL OR DUP6 SSTORE PUSH2 0xB5E JUMP JUMPDEST PUSH1 0x0 DUP6 DUP2 MSTORE PUSH1 0x20 DUP2 KECCAK256 PUSH1 0x1F NOT DUP7 AND SWAP2 JUMPDEST DUP3 DUP2 LT ISZERO PUSH2 0xBF9 JUMPI DUP9 DUP7 ADD MLOAD DUP3 SSTORE SWAP5 DUP5 ADD SWAP5 PUSH1 0x1 SWAP1 SWAP2 ADD SWAP1 DUP5 ADD PUSH2 0xBDA JUMP JUMPDEST POP DUP6 DUP3 LT ISZERO PUSH2 0xC17 JUMPI DUP8 DUP6 ADD MLOAD PUSH1 0x0 NOT PUSH1 0x3 DUP9 SWAP1 SHL PUSH1 0xF8 AND SHR NOT AND DUP2 SSTORE JUMPDEST POP POP POP POP POP PUSH1 0x1 SWAP1 DUP2 SHL ADD SWAP1 SSTORE POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0x23 0x4F CREATE 0x2B 0xC4 0xC7 GASLIMIT 0xDC 0xD8 MSTORE8 NUMBER SHL SWAP5 DUP12 DIV PUSH11 0xCA836D4DFF35C0C3FB926C 0xE6 0x2C XOR 0x26 SWAP4 PUSH5 0x736F6C6343 STOP ADDMOD EQ STOP CALLER ","sourceMap":"616:6245:3:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3960:749;;;;;;:::i;:::-;;:::i;:::-;;;757:25:7;;;745:2;730:18;3960:749:3;;;;;;;;1501:41;;;;;;;;;;-1:-1:-1;1501:41:3;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;1423:14:7;;1416:22;1398:41;;1386:2;1371:18;1501:41:3;1258:187:7;6299:342:3;;;;;;;;;;-1:-1:-1;6299:342:3;;;;;:::i;:::-;;:::i;:::-;;;;;;;;;;;:::i;1292:26::-;;;;;;;;;;;;;;;;3422:109;;;;;;;;;;-1:-1:-1;3422:109:3;;;;;:::i;:::-;;:::i;:::-;;2293:101:0;;;;;;;;;;;;;:::i;862:33:3:-;;;;;;;;;;-1:-1:-1;862:33:3;;;;-1:-1:-1;;;;;862:33:3;;;;;;-1:-1:-1;;;;;2882:32:7;;;2864:51;;2852:2;2837:18;862:33:3;2692:229:7;1638:85:0;;;;;;;;;;-1:-1:-1;1684:7:0;1710:6;-1:-1:-1;;;;;1710:6:0;1638:85;;3255:105:3;;;;;;;;;;-1:-1:-1;3255:105:3;;;;;:::i;:::-;;:::i;1243:42::-;;;;;;;;;;-1:-1:-1;1243:42:3;;;;;:::i;:::-;;:::i;5256:775::-;;;;;;;;;;-1:-1:-1;5256:775:3;;;;;:::i;:::-;;:::i;2543:215:0:-;;;;;;;;;;-1:-1:-1;2543:215:0;;;;;:::i;:::-;;:::i;3960:749:3:-;4062:7;4086:9;4099:1;4086:14;4082:47;;4109:20;;-1:-1:-1;;;4109:20:3;;;;;;;;;;;4082:47;4142:11;:13;;;:11;:13;;;:::i;:::-;;;;;;4168:16;4246:10;4275:11;;4305:9;4333:12;4364:11;;4211:179;;;;;;;;;;;;;:::i;:::-;;;;-1:-1:-1;;4211:179:3;;;;;;;;;4187:214;;4211:179;4187:214;;;;4435:186;;;;;4466:10;4435:186;;;;;;;;;;;;;;;;;;;;;;4187:214;-1:-1:-1;4435:186:3;;;;;4504:11;;;;;;4435:186;;4504:11;;;;4435:186;;;;;;;;-1:-1:-1;4435:186:3;;;-1:-1:-1;;4538:9:3;4435:186;;;;;;;;4572:4;4435:186;;;;;;;;;;;;;;4414:18;;;:8;:18;;;;;;:207;;;;-1:-1:-1;;;;;;4414:207:3;-1:-1:-1;;;;;4414:207:3;;;;;;;;;;:18;;:207;;;;;-1:-1:-1;4414:207:3;;:::i;:::-;-1:-1:-1;4414:207:3;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;4414:207:3;;;;;;-1:-1:-1;;4414:207:3;;;;;;;;;;;;;;;;;;;4639:34;4663:9;757:25:7;;4653:8:3;;4639:34;;745:2:7;730:18;4639:34:3;;;;;;;4693:8;3960:749;-1:-1:-1;;;3960:749:3:o;6299:342::-;6369:15;6534:18;;;:8;:18;;;;;;;6571:9;;6597:8;;;;6607:10;;;;6571:9;6582:13;;6563:70;;6395:25;;6369:15;;;;;;6534:18;;-1:-1:-1;;;;;6571:9:3;;;;6582:13;;6597:8;6607:10;;;;;6571:9;6619:13;;;;;6582;;6563:70;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;6299:342;;;;;;;:::o;3422:109::-;1531:13:0;:11;:13::i;:::-;-1:-1:-1;;;;;3495:20:3::1;3518:5;3495:20:::0;;;:9:::1;:20;::::0;;;;:28;;-1:-1:-1;;3495:28:3::1;::::0;;3422:109::o;2293:101:0:-;1531:13;:11;:13::i;:::-;2357:30:::1;2384:1;2357:18;:30::i;:::-;2293:101::o:0;3255:105:3:-;1531:13:0;:11;:13::i;:::-;-1:-1:-1;;;;;3325:20:3::1;;::::0;;;:9:::1;:20;::::0;;;;:27;;-1:-1:-1;;3325:27:3::1;3348:4;3325:27;::::0;;3255:105::o;1243:42::-;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;;1243:42:3;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;-1:-1:-1;;;;1243:42:3;;;;;;;;;;;;;;;;;-1:-1:-1;1243:42:3;;;;;;:::o;5256:775::-;2502:10;2492:21;;;;:9;:21;;;;;;;;2491:22;:47;;;;-1:-1:-1;1684:7:0;1710:6;-1:-1:-1;;;;;1710:6:0;2517:10:3;:21;;2491:47;2487:73;;;2547:13;;-1:-1:-1;;;2547:13:3;;;;;;;;;;;2487:73;2500:21:2::1;:19;:21::i;:::-;5397::3::2;5421:18:::0;;;:8:::2;:18;::::0;;;;;;;5457:15;;::::2;::::0;::::2;;5452:46;;5481:17;;-1:-1:-1::0;;;5481:17:3::2;;;;;;;;;;;5452:46;5513:18;::::0;::::2;::::0;::::2;::::0;::::2;;;5509:55;;;5540:24;;-1:-1:-1::0;;;5540:24:3::2;;;;;;;;;;;5509:55;5579:6;:13;;;5596:1;5579:18:::0;5575:47:::2;;5606:16;;-1:-1:-1::0;;;5606:16:3::2;;;;;;;;;;;5575:47;5665:18;::::0;::::2;:25:::0;;-1:-1:-1;;5701:23:3;5665:25:::2;5701:23:::0;;;5811:13:::2;::::0;::::2;::::0;5783:46:::2;::::0;-1:-1:-1;;;;;;;5783:20:3;::::2;::::0;-1:-1:-1;5783:46:3;-1:-1:-1;5783:46:3;5811:13;5783:20;:46:::2;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;5764:65;;;5845:7;5840:37;;5861:16;;-1:-1:-1::0;;;5861:16:3::2;;;;;;;;;;;5840:37;5947:8;::::0;:22:::2;::::0;-1:-1:-1;;;5947:22:3;;-1:-1:-1;;;;;2882:32:7;;;5947:22:3::2;::::0;::::2;2864:51:7::0;5947:8:3;;::::2;::::0;:14:::2;::::0;2837:18:7;;5947:22:3::2;;;;;;;;;;;;;;;;;::::0;::::2;;;;;;;;;;;;::::0;::::2;;;;;-1:-1:-1::0;;5987:36:3::2;::::0;-1:-1:-1;;;;;5987:36:3;::::2;::::0;-1:-1:-1;6006:8:3;;-1:-1:-1;5987:36:3::2;::::0;;;::::2;5386:645;;2542:20:2::1;1857:1:::0;3068:21;;2888:208;2542:20:::1;5256:775:3::0;;:::o;2543:215:0:-;1531:13;:11;:13::i;:::-;-1:-1:-1;;;;;2627:22:0;::::1;2623:91;;2672:31;::::0;-1:-1:-1;;;2672:31:0;;2700:1:::1;2672:31;::::0;::::1;2864:51:7::0;2837:18;;2672:31:0::1;;;;;;;;2623:91;2723:28;2742:8;2723:18;:28::i;:::-;2543:215:::0;:::o;1796:162::-;1684:7;1710:6;-1:-1:-1;;;;;1710:6:0;735:10:1;1855:23:0;1851:101;;1901:40;;-1:-1:-1;;;1901:40:0;;735:10:1;1901:40:0;;;2864:51:7;2837:18;;1901:40:0;2692:229:7;2912:187:0;2985:16;3004:6;;-1:-1:-1;;;;;3020:17:0;;;-1:-1:-1;;;;;;3020:17:0;;;;;;3052:40;;3004:6;;;;;;;3052:40;;2985:16;3052:40;2975:124;2912:187;:::o;2575:307:2:-;1899:1;2702:7;;:18;2698:86;;2743:30;;-1:-1:-1;;;2743:30:2;;;;;;;;;;;2698:86;1899:1;2858:7;:17;2575:307::o;14:592:7:-;85:6;93;146:2;134:9;125:7;121:23;117:32;114:52;;;162:1;159;152:12;114:52;202:9;189:23;231:18;272:2;264:6;261:14;258:34;;;288:1;285;278:12;258:34;326:6;315:9;311:22;301:32;;371:7;364:4;360:2;356:13;352:27;342:55;;393:1;390;383:12;342:55;433:2;420:16;459:2;451:6;448:14;445:34;;;475:1;472;465:12;445:34;520:7;515:2;506:6;502:2;498:15;494:24;491:37;488:57;;;541:1;538;531:12;488:57;572:2;564:11;;;;;594:6;;-1:-1:-1;14:592:7;;-1:-1:-1;;;;14:592:7:o;793:173::-;861:20;;-1:-1:-1;;;;;910:31:7;;900:42;;890:70;;956:1;953;946:12;890:70;793:173;;;:::o;971:186::-;1030:6;1083:2;1071:9;1062:7;1058:23;1054:32;1051:52;;;1099:1;1096;1089:12;1051:52;1122:29;1141:9;1122:29;:::i;:::-;1112:39;971:186;-1:-1:-1;;;971:186:7:o;1450:180::-;1509:6;1562:2;1550:9;1541:7;1537:23;1533:32;1530:52;;;1578:1;1575;1568:12;1530:52;-1:-1:-1;1601:23:7;;1450:180;-1:-1:-1;1450:180:7:o;1635:870::-;1913:1;1909;1904:3;1900:11;1896:19;1888:6;1884:32;1873:9;1866:51;1847:4;1936:2;1974:3;1969:2;1958:9;1954:18;1947:31;2007:6;2001:13;2051:6;2045:3;2034:9;2030:19;2023:35;2076:1;2086:141;2100:6;2097:1;2094:13;2086:141;;;2196:14;;;2192:23;;2186:30;2161:17;;;2180:3;2157:27;2150:67;2115:10;;2086:141;;;2090:3;2277:1;2271:3;2262:6;2251:9;2247:22;2243:32;2236:43;2347:3;2340:2;2336:7;2331:2;2323:6;2319:15;2315:29;2304:9;2300:45;2296:55;2288:63;;;;2387:6;2382:2;2371:9;2367:18;2360:34;2403:43;2442:2;2431:9;2427:18;2419:6;1232:13;1225:21;1213:34;;1162:91;2403:43;1232:13;;1225:21;2494:3;2479:19;;1213:34;1635:870;;;;;;;;:::o;3134:254::-;3202:6;3210;3263:2;3251:9;3242:7;3238:23;3234:32;3231:52;;;3279:1;3276;3269:12;3231:52;3315:9;3302:23;3292:33;;3344:38;3378:2;3367:9;3363:18;3344:38;:::i;:::-;3334:48;;3134:254;;;;;:::o;3393:232::-;3432:3;3453:17;;;3450:140;;3512:10;3507:3;3503:20;3500:1;3493:31;3547:4;3544:1;3537:15;3575:4;3572:1;3565:15;3450:140;-1:-1:-1;3617:1:7;3606:13;;3393:232::o;3630:565::-;3938:26;3934:31;3925:6;3921:2;3917:15;3913:53;3908:3;3901:66;4011:6;4003;3998:2;3993:3;3989:12;3976:42;4077:2;4037:16;;4069:11;;;4062:27;;;;4113:2;4105:11;;4098:27;4149:2;4141:11;;4134:27;4185:3;4177:12;;3630:565;-1:-1:-1;;3630:565:7:o;4200:127::-;4261:10;4256:3;4252:20;4249:1;4242:31;4292:4;4289:1;4282:15;4316:4;4313:1;4306:15;4332:380;4411:1;4407:12;;;;4454;;;4475:61;;4529:4;4521:6;4517:17;4507:27;;4475:61;4582:2;4574:6;4571:14;4551:18;4548:38;4545:161;;4628:10;4623:3;4619:20;4616:1;4609:31;4663:4;4660:1;4653:15;4691:4;4688:1;4681:15;4545:161;;4332:380;;;:::o;4843:545::-;4945:2;4940:3;4937:11;4934:448;;;4981:1;5006:5;5002:2;4995:17;5051:4;5047:2;5037:19;5121:2;5109:10;5105:19;5102:1;5098:27;5092:4;5088:38;5157:4;5145:10;5142:20;5139:47;;;-1:-1:-1;5180:4:7;5139:47;5235:2;5230:3;5226:12;5223:1;5219:20;5213:4;5209:31;5199:41;;5290:82;5308:2;5301:5;5298:13;5290:82;;;5353:17;;;5334:1;5323:13;5290:82;;;5294:3;;;4934:448;4843:545;;;:::o;5564:1352::-;5690:3;5684:10;5717:18;5709:6;5706:30;5703:56;;;5739:18;;:::i;:::-;5768:97;5858:6;5818:38;5850:4;5844:11;5818:38;:::i;:::-;5812:4;5768:97;:::i;:::-;5920:4;;5984:2;5973:14;;6001:1;5996:663;;;;6703:1;6720:6;6717:89;;;-1:-1:-1;6772:19:7;;;6766:26;6717:89;-1:-1:-1;;5521:1:7;5517:11;;;5513:24;5509:29;5499:40;5545:1;5541:11;;;5496:57;6819:81;;5966:944;;5996:663;4790:1;4783:14;;;4827:4;4814:18;;-1:-1:-1;;6032:20:7;;;6150:236;6164:7;6161:1;6158:14;6150:236;;;6253:19;;;6247:26;6232:42;;6345:27;;;;6313:1;6301:14;;;;6180:19;;6150:236;;;6154:3;6414:6;6405:7;6402:19;6399:201;;;6475:19;;;6469:26;-1:-1:-1;;6558:1:7;6554:14;;;6570:3;6550:24;6546:37;6542:42;6527:58;6512:74;;6399:201;-1:-1:-1;;;;;6646:1:7;6630:14;;;6626:22;6613:36;;-1:-1:-1;5564:1352:7:o"},"methodIdentifiers":{"addApprover(address)":"b646c194","approveSubmission(bytes32,address)":"cce5b74b","approvers(address)":"0a144391","bounties(bytes32)":"bf5522da","bountyCount()":"3e362c96","createBounty(string)":"06868c4b","getBounty(bytes32)":"2417395c","owner()":"8da5cb5b","registry()":"7b103999","removeApprover(address)":"6cf4c88f","renounceOwnership()":"715018a6","transferOwnership(address)":"f2fde38b"}},"metadata":"{\"compiler\":{\"version\":\"0.8.20+commit.a1b79de6\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_registry\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"BountyAlreadyCompleted\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"BountyNotActive\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"BountyNotFound\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InsufficientReward\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotApprover\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"TransferFailed\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"bountyId\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\"}],\"name\":\"BountyCreated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"bountyId\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"worker\",\"type\":\"address\"}],\"name\":\"SubmissionApproved\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_approver\",\"type\":\"address\"}],\"name\":\"addApprover\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"bountyId\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"worker\",\"type\":\"address\"}],\"name\":\"approveSubmission\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"approvers\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"bounties\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"metadataURI\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"isActive\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"isCompleted\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"bountyCount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"metadataURI\",\"type\":\"string\"}],\"name\":\"createBounty\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"bountyId\",\"type\":\"bytes32\"}],\"name\":\"getBounty\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"creator\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"metadataURI\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"isActive\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"isCompleted\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"registry\",\"outputs\":[{\"internalType\":\"contract IVitalityRegistry\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_approver\",\"type\":\"address\"}],\"name\":\"removeApprover\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"details\":\"Spec \\u00a73.B  createBounty:      Payable \\u2014 locks MON reward, generates unique bountyId.  approveSubmission: Pays worker, then calls Registry.pulse(worker) to restore vitality.\",\"errors\":{\"OwnableInvalidOwner(address)\":[{\"details\":\"The owner is not a valid owner account. (eg. `address(0)`)\"}],\"OwnableUnauthorizedAccount(address)\":[{\"details\":\"The caller account is not authorized to perform an operation.\"}],\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"approveSubmission(bytes32,address)\":{\"details\":\"Only callable by authorized approvers (Validator agent).         Flow: validate \\u2192 pay worker \\u2192 call Registry.pulse(worker)\",\"params\":{\"bountyId\":\"The bounty being completed.\",\"worker\":\"The agent/user who submitted the work.\"}},\"createBounty(string)\":{\"params\":{\"metadataURI\":\"IPFS or URL pointing to bounty description/requirements.\"},\"returns\":{\"_0\":\"bountyId    Unique identifier (keccak256 hash).\"}},\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"renounceOwnership()\":{\"details\":\"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.\"},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"}},\"title\":\"VitalisBounty \\u2014 On-Chain Task & Reward System\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"addApprover(address)\":{\"notice\":\"Add an address that can approve submissions (e.g., Validator agent wallet).\"},\"approveSubmission(bytes32,address)\":{\"notice\":\"Approve a submission: pay the worker and pulse their vitality.\"},\"createBounty(string)\":{\"notice\":\"Create a new bounty with a MON reward locked in the contract.\"},\"getBounty(bytes32)\":{\"notice\":\"Check if a bounty exists and its current state.\"},\"removeApprover(address)\":{\"notice\":\"Remove an approver.\"}},\"notice\":\"Manages the bounty lifecycle: create \\u2192 submit \\u2192 approve \\u2192 pulse.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"contracts/VitalisBounty.sol\":\"VitalisBounty\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/access/Ownable.sol\":{\"keccak256\":\"0xff6d0bb2e285473e5311d9d3caacb525ae3538a80758c10649a4d61029b017bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8ed324d3920bb545059d66ab97d43e43ee85fd3bd52e03e401f020afb0b120f6\",\"dweb:/ipfs/QmfEckWLmZkDDcoWrkEvMWhms66xwTLff9DDhegYpvHo1a\"]},\"@openzeppelin/contracts/utils/Context.sol\":{\"keccak256\":\"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12\",\"dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF\"]},\"@openzeppelin/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0x11a5a79827df29e915a12740caf62fe21ebe27c08c9ae3e09abe9ee3ba3866d3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3cf0c69ab827e3251db9ee6a50647d62c90ba580a4d7bbff21f2bea39e7b2f4a\",\"dweb:/ipfs/QmZiKwtKU1SBX4RGfQtY7PZfiapbbu6SZ9vizGQD9UHjRA\"]},\"contracts/VitalisBounty.sol\":{\"keccak256\":\"0xc2ea40b8b68dfc819afb0f77eeb001e219eef4073ca8b7b63cc814a6cc485764\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://c996b9eb94616070ec7daa17006d8d762a84b10a317a947fc3600d6a49253b07\",\"dweb:/ipfs/QmT7kn4XEoHXsjWcrocHWykzd46ftfmpQDMZihw5XeMp5s\"]},\"contracts/interfaces/IVitalisBounty.sol\":{\"keccak256\":\"0x38621210730431cbdb2f71840f505565f4f0ff25f88e27aab10eac0ef16d24ce\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://0576b95d302b7226a8fe981edf7ea9b12bda9cba7b14f49c621600574f436af7\",\"dweb:/ipfs/QmVgUge3PgHMnkjfAfAWpxSBTWp9qYxkTF4EYtTzMipzBN\"]},\"contracts/interfaces/IVitalityRegistry.sol\":{\"keccak256\":\"0x169b841eebe3b6ff10ff344fd278f28047088b2d3c6f1738909cc01cebd70889\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://94abb92920abe475584b0fe1dbf0dea31477f4fa57b08af7fb816c9755a9ac8f\",\"dweb:/ipfs/QmVFBwCeD9f25tZDkZjkKWvT43Z8APcEj7eMp4bYmRg2e4\"]}},\"version\":1}"}},"contracts/VitalityRegistry.sol":{"VitalityRegistry":{"abi":[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AgentAlreadyRegistered","type":"error"},{"inputs":[],"name":"AgentNotActive","type":"error"},{"inputs":[],"name":"AgentNotRegistered","type":"error"},{"inputs":[],"name":"AgentStillAlive","type":"error"},{"inputs":[],"name":"InvalidDecayRate","type":"error"},{"inputs":[],"name":"NotAuthorized","type":"error"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"inputs":[],"name":"ReentrancyGuardReentrantCall","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"}],"name":"AgentPruned","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"},{"indexed":false,"internalType":"int256","name":"initialVitality","type":"int256"}],"name":"AgentRegistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDecayRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPulseAmount","type":"uint256"}],"name":"ParametersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"},{"indexed":false,"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"VitalityPulse","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"agents","outputs":[{"internalType":"int256","name":"storedVitality","type":"int256"},{"internalType":"uint256","name":"lastUpdateBlock","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"},{"internalType":"bool","name":"isRegistered","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bountyContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decayRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"agent","type":"address"}],"name":"getVitality","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"agent","type":"address"}],"name":"prune","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pruneReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"agent","type":"address"}],"name":"pulse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"pulseAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"agent","type":"address"}],"name":"registerAgent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_bountyContract","type":"address"}],"name":"setBountyContract","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_strategist","type":"address"}],"name":"setStrategist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"strategist","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_decayRate","type":"uint256"},{"internalType":"uint256","name":"_pulseAmount","type":"uint256"}],"name":"updateMetabolicParams","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}],"evm":{"bytecode":{"functionDebugData":{"@_199":{"entryPoint":null,"id":199,"parameterSlots":0,"returnSlots":0},"@_50":{"entryPoint":null,"id":50,"parameterSlots":1,"returnSlots":0},"@_646":{"entryPoint":null,"id":646,"parameterSlots":0,"returnSlots":0},"@_transferOwnership_146":{"entryPoint":115,"id":146,"parameterSlots":1,"returnSlots":0},"abi_encode_tuple_t_address__to_t_address__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1}},"generatedSources":[{"ast":{"nodeType":"YulBlock","src":"0:219:7","statements":[{"nodeType":"YulBlock","src":"6:3:7","statements":[]},{"body":{"nodeType":"YulBlock","src":"115:102:7","statements":[{"nodeType":"YulAssignment","src":"125:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"137:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"148:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"133:3:7"},"nodeType":"YulFunctionCall","src":"133:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"125:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"167:9:7"},{"arguments":[{"name":"value0","nodeType":"YulIdentifier","src":"182:6:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"198:3:7","type":"","value":"160"},{"kind":"number","nodeType":"YulLiteral","src":"203:1:7","type":"","value":"1"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"194:3:7"},"nodeType":"YulFunctionCall","src":"194:11:7"},{"kind":"number","nodeType":"YulLiteral","src":"207:1:7","type":"","value":"1"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"190:3:7"},"nodeType":"YulFunctionCall","src":"190:19:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"178:3:7"},"nodeType":"YulFunctionCall","src":"178:32:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"160:6:7"},"nodeType":"YulFunctionCall","src":"160:51:7"},"nodeType":"YulExpressionStatement","src":"160:51:7"}]},"name":"abi_encode_tuple_t_address__to_t_address__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"84:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"95:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"106:4:7","type":""}],"src":"14:203:7"}]},"contents":"{\n    { }\n    function abi_encode_tuple_t_address__to_t_address__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n}","id":7,"language":"Yul","name":"#utility.yul"}],"linkReferences":{},"object":"60806040526103e86003556032600455670de0b6b3a764000060055534801561002757600080fd5b50338061004e57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61005781610073565b5060018055600780546001600160a01b031916331790556100c3565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610ae4806100d26000396000f3fe6080604052600436106100f75760003560e01c80638da5cb5b1161008a578063ddf9fa0911610059578063ddf9fa091461028f578063f2fde38b146102af578063fc2dff08146102cf578063fd66091e146102e557600080fd5b80638da5cb5b1461021b5780638e97fdc314610239578063a9c1f2f114610259578063c7b9d5301461026f57600080fd5b8063715018a6116100c6578063715018a6146101b05780637af86a29146101c557806380b3fa3f146101e557806387693efc146101fb57600080fd5b80630f3cca49146101035780631fe4a686146101255780632f36b5d914610162578063306b9bb91461019057600080fd5b366100fe57005b600080fd5b34801561010f57600080fd5b5061012361011e3660046109bc565b610354565b005b34801561013157600080fd5b50600754610145906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561016e57600080fd5b5061018261017d3660046109bc565b6104e7565b604051908152602001610159565b34801561019c57600080fd5b506101236101ab3660046109bc565b610571565b3480156101bc57600080fd5b50610123610669565b3480156101d157600080fd5b506101236101e03660046109bc565b61067d565b3480156101f157600080fd5b5061018260045481565b34801561020757600080fd5b506101236102163660046109ec565b6106a7565b34801561022757600080fd5b506000546001600160a01b0316610145565b34801561024557600080fd5b506101236102543660046109bc565b61073a565b34801561026557600080fd5b5061018260035481565b34801561027b57600080fd5b5061012361028a3660046109bc565b61084a565b34801561029b57600080fd5b50600654610145906001600160a01b031681565b3480156102bb57600080fd5b506101236102ca3660046109bc565b610874565b3480156102db57600080fd5b5061018260055481565b3480156102f157600080fd5b5061032c6103003660046109bc565b600260208190526000918252604090912080546001820154919092015460ff8082169161010090041684565b6040805194855260208501939093529015159183019190915215156060820152608001610159565b61035c6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166103a0576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166103c557604051632437e77160e11b815260040160405180910390fd5b6103ce826108d9565b8054600012156103f157604051631e3b681960e21b815260040160405180910390fd5b60028101805460ff1916905560055447106104a65760055460405160009133918381818185875af1925050503d8060008114610449576040519150601f19603f3d011682016040523d82523d6000602084013e61044e565b606091505b50509050806104a45760405162461bcd60e51b815260206004820152601c60248201527f5072756e6520726577617264207472616e73666572206661696c65640000000060448201526064015b60405180910390fd5b505b6040516001600160a01b038316907f3481493766137a21a43eefafc4c946920d719b13638a00ce8eb791ec28cc9ef490600090a2506104e460018055565b50565b6001600160a01b0381166000908152600260208190526040822090810154610100900460ff1661051a5750600092915050565b600281015460ff1661052f5750600092915050565b60008160010154436105419190610a24565b90506000600354826105539190610a3d565b905060008184600001546105679190610a5f565b9695505050505050565b61057961093f565b6001600160a01b03811660009081526002602081905260409091200154610100900460ff16156105bc5760405163704c69f760e11b815260040160405180910390fd5b6040805160808101825260648082524360208084019182526001848601818152606086018281526001600160a01b03891660008181526002808752908a9020985189559551938801939093559051959093018054935161ffff1990941695151561ff00191695909517610100931515939093029290921790935592519081527f86d94fe3783a846468c0b7912fca3072b86415f6da1c7045926f0bc687a9da12910160405180910390a250565b61067161093f565b61067b600061096c565b565b61068561093f565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b6007546001600160a01b031633146106d25760405163ea8e4eb560e01b815260040160405180910390fd5b816000036106f357604051630678582160e51b815260040160405180910390fd5b6003829055600481905560408051838152602081018390527ffaccb0639ff7851e0e24f3b2d9ab03cd62ffb63f5b4d90aaeff85bb078c1fa48910160405180910390a15050565b6006546001600160a01b031633146107655760405163ea8e4eb560e01b815260040160405180910390fd5b61076d6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166107b1576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166107d657604051632437e77160e11b815260040160405180910390fd5b6107df826108d9565b6004548160000160008282546107f59190610a86565b909155505043600182015580546040519081526001600160a01b038316907fd7563a2b45d0b0f1b01b82db96ae4752fe46daa24649b6076762ae631a0cdd2b9060200160405180910390a2506104e460018055565b61085261093f565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b61087c61093f565b6001600160a01b0381166108a657604051631e4fbdf760e01b81526000600482015260240161049b565b6104e48161096c565b6002600154036108d257604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6001600160a01b038116600090815260026020526040812060018101549091906109039043610a24565b90506000600354826109159190610a3d565b90508083600001600082825461092b9190610a5f565b909155505043600190930192909255505050565b6000546001600160a01b0316331461067b5760405163118cdaa760e01b815233600482015260240161049b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156109ce57600080fd5b81356001600160a01b03811681146109e557600080fd5b9392505050565b600080604083850312156109ff57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b81810381811115610a3757610a37610a0e565b92915050565b600082610a5a57634e487b7160e01b600052601260045260246000fd5b500490565b8181036000831280158383131683831282161715610a7f57610a7f610a0e565b5092915050565b8082018281126000831280158216821582161715610aa657610aa6610a0e565b50509291505056fea26469706673582212200fc46ab2a6d3edc44b53de50eddce2215f153b7fda095d3a76fdc72c192f83b064736f6c63430008140033","opcodes":"PUSH1 0x80 PUSH1 0x40 MSTORE PUSH2 0x3E8 PUSH1 0x3 SSTORE PUSH1 0x32 PUSH1 0x4 SSTORE PUSH8 0xDE0B6B3A7640000 PUSH1 0x5 SSTORE CALLVALUE DUP1 ISZERO PUSH2 0x27 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP CALLER DUP1 PUSH2 0x4E JUMPI PUSH1 0x40 MLOAD PUSH4 0x1E4FBDF7 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x0 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x57 DUP2 PUSH2 0x73 JUMP JUMPDEST POP PUSH1 0x1 DUP1 SSTORE PUSH1 0x7 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND CALLER OR SWAP1 SSTORE PUSH2 0xC3 JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT DUP4 AND DUP2 OR DUP5 SSTORE PUSH1 0x40 MLOAD SWAP2 SWAP1 SWAP3 AND SWAP3 DUP4 SWAP2 PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 SWAP2 SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH2 0xAE4 DUP1 PUSH2 0xD2 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xF7 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x8DA5CB5B GT PUSH2 0x8A JUMPI DUP1 PUSH4 0xDDF9FA09 GT PUSH2 0x59 JUMPI DUP1 PUSH4 0xDDF9FA09 EQ PUSH2 0x28F JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2AF JUMPI DUP1 PUSH4 0xFC2DFF08 EQ PUSH2 0x2CF JUMPI DUP1 PUSH4 0xFD66091E EQ PUSH2 0x2E5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x21B JUMPI DUP1 PUSH4 0x8E97FDC3 EQ PUSH2 0x239 JUMPI DUP1 PUSH4 0xA9C1F2F1 EQ PUSH2 0x259 JUMPI DUP1 PUSH4 0xC7B9D530 EQ PUSH2 0x26F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x715018A6 GT PUSH2 0xC6 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0x1B0 JUMPI DUP1 PUSH4 0x7AF86A29 EQ PUSH2 0x1C5 JUMPI DUP1 PUSH4 0x80B3FA3F EQ PUSH2 0x1E5 JUMPI DUP1 PUSH4 0x87693EFC EQ PUSH2 0x1FB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0xF3CCA49 EQ PUSH2 0x103 JUMPI DUP1 PUSH4 0x1FE4A686 EQ PUSH2 0x125 JUMPI DUP1 PUSH4 0x2F36B5D9 EQ PUSH2 0x162 JUMPI DUP1 PUSH4 0x306B9BB9 EQ PUSH2 0x190 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST CALLDATASIZE PUSH2 0xFE JUMPI STOP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x10F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x11E CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x354 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x131 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x7 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND DUP2 MSTORE PUSH1 0x20 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x16E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x182 PUSH2 0x17D CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x4E7 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x159 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x19C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x1AB CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x571 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1BC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x669 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1D1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x1E0 CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x67D JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1F1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x182 PUSH1 0x4 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x207 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x216 CALLDATASIZE PUSH1 0x4 PUSH2 0x9EC JUMP JUMPDEST PUSH2 0x6A7 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x227 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x145 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x245 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x254 CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x73A JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x265 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x182 PUSH1 0x3 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x27B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x28A CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x84A JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x29B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x6 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2BB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x2CA CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x874 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2DB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x182 PUSH1 0x5 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2F1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x32C PUSH2 0x300 CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x0 SWAP2 DUP3 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 DUP1 SLOAD PUSH1 0x1 DUP3 ADD SLOAD SWAP2 SWAP1 SWAP3 ADD SLOAD PUSH1 0xFF DUP1 DUP3 AND SWAP2 PUSH2 0x100 SWAP1 DIV AND DUP5 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP5 DUP6 MSTORE PUSH1 0x20 DUP6 ADD SWAP4 SWAP1 SWAP4 MSTORE SWAP1 ISZERO ISZERO SWAP2 DUP4 ADD SWAP2 SWAP1 SWAP2 MSTORE ISZERO ISZERO PUSH1 0x60 DUP3 ADD MSTORE PUSH1 0x80 ADD PUSH2 0x159 JUMP JUMPDEST PUSH2 0x35C PUSH2 0x8AF JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 SWAP1 DUP2 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND PUSH2 0x3A0 JUMPI PUSH1 0x40 MLOAD PUSH4 0x83BCFB47 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 DUP2 ADD SLOAD PUSH1 0xFF AND PUSH2 0x3C5 JUMPI PUSH1 0x40 MLOAD PUSH4 0x2437E771 PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x3CE DUP3 PUSH2 0x8D9 JUMP JUMPDEST DUP1 SLOAD PUSH1 0x0 SLT ISZERO PUSH2 0x3F1 JUMPI PUSH1 0x40 MLOAD PUSH4 0x1E3B6819 PUSH1 0xE2 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 DUP2 ADD DUP1 SLOAD PUSH1 0xFF NOT AND SWAP1 SSTORE PUSH1 0x5 SLOAD SELFBALANCE LT PUSH2 0x4A6 JUMPI PUSH1 0x5 SLOAD PUSH1 0x40 MLOAD PUSH1 0x0 SWAP2 CALLER SWAP2 DUP4 DUP2 DUP2 DUP2 DUP6 DUP8 GAS CALL SWAP3 POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x449 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x44E JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP SWAP1 POP DUP1 PUSH2 0x4A4 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1C PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x5072756E6520726577617264207472616E73666572206661696C656400000000 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP1 PUSH32 0x3481493766137A21A43EEFAFC4C946920D719B13638A00CE8EB791EC28CC9EF4 SWAP1 PUSH1 0x0 SWAP1 LOG2 POP PUSH2 0x4E4 PUSH1 0x1 DUP1 SSTORE JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 DUP3 KECCAK256 SWAP1 DUP2 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND PUSH2 0x51A JUMPI POP PUSH1 0x0 SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x2 DUP2 ADD SLOAD PUSH1 0xFF AND PUSH2 0x52F JUMPI POP PUSH1 0x0 SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 PUSH1 0x1 ADD SLOAD NUMBER PUSH2 0x541 SWAP2 SWAP1 PUSH2 0xA24 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH1 0x3 SLOAD DUP3 PUSH2 0x553 SWAP2 SWAP1 PUSH2 0xA3D JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 DUP5 PUSH1 0x0 ADD SLOAD PUSH2 0x567 SWAP2 SWAP1 PUSH2 0xA5F JUMP JUMPDEST SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH2 0x579 PUSH2 0x93F JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND ISZERO PUSH2 0x5BC JUMPI PUSH1 0x40 MLOAD PUSH4 0x704C69F7 PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0x80 DUP2 ADD DUP3 MSTORE PUSH1 0x64 DUP1 DUP3 MSTORE NUMBER PUSH1 0x20 DUP1 DUP5 ADD SWAP2 DUP3 MSTORE PUSH1 0x1 DUP5 DUP7 ADD DUP2 DUP2 MSTORE PUSH1 0x60 DUP7 ADD DUP3 DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP10 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 DUP1 DUP8 MSTORE SWAP1 DUP11 SWAP1 KECCAK256 SWAP9 MLOAD DUP10 SSTORE SWAP6 MLOAD SWAP4 DUP9 ADD SWAP4 SWAP1 SWAP4 SSTORE SWAP1 MLOAD SWAP6 SWAP1 SWAP4 ADD DUP1 SLOAD SWAP4 MLOAD PUSH2 0xFFFF NOT SWAP1 SWAP5 AND SWAP6 ISZERO ISZERO PUSH2 0xFF00 NOT AND SWAP6 SWAP1 SWAP6 OR PUSH2 0x100 SWAP4 ISZERO ISZERO SWAP4 SWAP1 SWAP4 MUL SWAP3 SWAP1 SWAP3 OR SWAP1 SWAP4 SSTORE SWAP3 MLOAD SWAP1 DUP2 MSTORE PUSH32 0x86D94FE3783A846468C0B7912FCA3072B86415F6DA1C7045926F0BC687A9DA12 SWAP2 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG2 POP JUMP JUMPDEST PUSH2 0x671 PUSH2 0x93F JUMP JUMPDEST PUSH2 0x67B PUSH1 0x0 PUSH2 0x96C JUMP JUMPDEST JUMP JUMPDEST PUSH2 0x685 PUSH2 0x93F JUMP JUMPDEST PUSH1 0x6 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP3 SWAP1 SWAP3 AND SWAP2 SWAP1 SWAP2 OR SWAP1 SSTORE JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ PUSH2 0x6D2 JUMPI PUSH1 0x40 MLOAD PUSH4 0xEA8E4EB5 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP2 PUSH1 0x0 SUB PUSH2 0x6F3 JUMPI PUSH1 0x40 MLOAD PUSH4 0x6785821 PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x3 DUP3 SWAP1 SSTORE PUSH1 0x4 DUP2 SWAP1 SSTORE PUSH1 0x40 DUP1 MLOAD DUP4 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP4 SWAP1 MSTORE PUSH32 0xFACCB0639FF7851E0E24F3B2D9AB03CD62FFB63F5B4D90AAEFF85BB078C1FA48 SWAP2 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG1 POP POP JUMP JUMPDEST PUSH1 0x6 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ PUSH2 0x765 JUMPI PUSH1 0x40 MLOAD PUSH4 0xEA8E4EB5 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x76D PUSH2 0x8AF JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 SWAP1 DUP2 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND PUSH2 0x7B1 JUMPI PUSH1 0x40 MLOAD PUSH4 0x83BCFB47 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 DUP2 ADD SLOAD PUSH1 0xFF AND PUSH2 0x7D6 JUMPI PUSH1 0x40 MLOAD PUSH4 0x2437E771 PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x7DF DUP3 PUSH2 0x8D9 JUMP JUMPDEST PUSH1 0x4 SLOAD DUP2 PUSH1 0x0 ADD PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x7F5 SWAP2 SWAP1 PUSH2 0xA86 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP NUMBER PUSH1 0x1 DUP3 ADD SSTORE DUP1 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP1 PUSH32 0xD7563A2B45D0B0F1B01B82DB96AE4752FE46DAA24649B6076762AE631A0CDD2B SWAP1 PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG2 POP PUSH2 0x4E4 PUSH1 0x1 DUP1 SSTORE JUMP JUMPDEST PUSH2 0x852 PUSH2 0x93F JUMP JUMPDEST PUSH1 0x7 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP3 SWAP1 SWAP3 AND SWAP2 SWAP1 SWAP2 OR SWAP1 SSTORE JUMP JUMPDEST PUSH2 0x87C PUSH2 0x93F JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH2 0x8A6 JUMPI PUSH1 0x40 MLOAD PUSH4 0x1E4FBDF7 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x0 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD PUSH2 0x49B JUMP JUMPDEST PUSH2 0x4E4 DUP2 PUSH2 0x96C JUMP JUMPDEST PUSH1 0x2 PUSH1 0x1 SLOAD SUB PUSH2 0x8D2 JUMPI PUSH1 0x40 MLOAD PUSH4 0x3EE5AEB5 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 PUSH1 0x1 SSTORE JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 PUSH1 0x1 DUP2 ADD SLOAD SWAP1 SWAP2 SWAP1 PUSH2 0x903 SWAP1 NUMBER PUSH2 0xA24 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH1 0x3 SLOAD DUP3 PUSH2 0x915 SWAP2 SWAP1 PUSH2 0xA3D JUMP JUMPDEST SWAP1 POP DUP1 DUP4 PUSH1 0x0 ADD PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x92B SWAP2 SWAP1 PUSH2 0xA5F JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP NUMBER PUSH1 0x1 SWAP1 SWAP4 ADD SWAP3 SWAP1 SWAP3 SSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ PUSH2 0x67B JUMPI PUSH1 0x40 MLOAD PUSH4 0x118CDAA7 PUSH1 0xE0 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD PUSH2 0x49B JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT DUP4 AND DUP2 OR DUP5 SSTORE PUSH1 0x40 MLOAD SWAP2 SWAP1 SWAP3 AND SWAP3 DUP4 SWAP2 PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 SWAP2 SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x9CE JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0x9E5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x9FF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP POP DUP1 CALLDATALOAD SWAP3 PUSH1 0x20 SWAP1 SWAP2 ADD CALLDATALOAD SWAP2 POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST DUP2 DUP2 SUB DUP2 DUP2 GT ISZERO PUSH2 0xA37 JUMPI PUSH2 0xA37 PUSH2 0xA0E JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH2 0xA5A JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP DIV SWAP1 JUMP JUMPDEST DUP2 DUP2 SUB PUSH1 0x0 DUP4 SLT DUP1 ISZERO DUP4 DUP4 SGT AND DUP4 DUP4 SLT DUP3 AND OR ISZERO PUSH2 0xA7F JUMPI PUSH2 0xA7F PUSH2 0xA0E JUMP JUMPDEST POP SWAP3 SWAP2 POP POP JUMP JUMPDEST DUP1 DUP3 ADD DUP3 DUP2 SLT PUSH1 0x0 DUP4 SLT DUP1 ISZERO DUP3 AND DUP3 ISZERO DUP3 AND OR ISZERO PUSH2 0xAA6 JUMPI PUSH2 0xAA6 PUSH2 0xA0E JUMP JUMPDEST POP POP SWAP3 SWAP2 POP POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xF 0xC4 PUSH11 0xB2A6D3EDC44B53DE50EDDC 0xE2 0x21 PUSH0 ISZERO EXTCODESIZE PUSH32 0xDA095D3A76FDC72C192F83B064736F6C63430008140033000000000000000000 ","sourceMap":"751:8529:4:-:0;;;1559:4;1532:31;;1652:2;1623:31;;1735:7;1706:36;;3713:107;;;;;;;;;-1:-1:-1;3735:10:4;;1269:95:0;;1322:31;;-1:-1:-1;;;1322:31:0;;1350:1;1322:31;;;160:51:7;133:18;;1322:31:0;;;;;;;1269:95;1373:32;1392:12;1373:18;:32::i;:::-;-1:-1:-1;1857:1:2;2061:21;;3758:10:4::1;:23:::0;;-1:-1:-1;;;;;;3758:23:4::1;3771:10;3758:23;::::0;;751:8529;;2912:187:0;2985:16;3004:6;;-1:-1:-1;;;;;3020:17:0;;;-1:-1:-1;;;;;;3020:17:0;;;;;;3052:40;;3004:6;;;;;;;3052:40;;2985:16;3052:40;2975:124;2912:187;:::o;14:203:7:-;751:8529:4;;;;;;"},"deployedBytecode":{"functionDebugData":{"@_983":{"entryPoint":null,"id":983,"parameterSlots":0,"returnSlots":0},"@_checkOwner_84":{"entryPoint":2367,"id":84,"parameterSlots":0,"returnSlots":0},"@_checkpoint_979":{"entryPoint":2265,"id":979,"parameterSlots":1,"returnSlots":0},"@_msgSender_159":{"entryPoint":null,"id":159,"parameterSlots":0,"returnSlots":1},"@_nonReentrantAfter_234":{"entryPoint":null,"id":234,"parameterSlots":0,"returnSlots":0},"@_nonReentrantBefore_226":{"entryPoint":2223,"id":226,"parameterSlots":0,"returnSlots":0},"@_transferOwnership_146":{"entryPoint":2412,"id":146,"parameterSlots":1,"returnSlots":0},"@agents_578":{"entryPoint":null,"id":578,"parameterSlots":0,"returnSlots":0},"@bountyContract_589":{"entryPoint":null,"id":589,"parameterSlots":0,"returnSlots":0},"@decayRate_581":{"entryPoint":null,"id":581,"parameterSlots":0,"returnSlots":0},"@getVitality_761":{"entryPoint":1255,"id":761,"parameterSlots":1,"returnSlots":1},"@owner_67":{"entryPoint":null,"id":67,"parameterSlots":0,"returnSlots":1},"@pruneReward_587":{"entryPoint":null,"id":587,"parameterSlots":0,"returnSlots":0},"@prune_903":{"entryPoint":852,"id":903,"parameterSlots":1,"returnSlots":0},"@pulseAmount_584":{"entryPoint":null,"id":584,"parameterSlots":0,"returnSlots":0},"@pulse_823":{"entryPoint":1850,"id":823,"parameterSlots":1,"returnSlots":0},"@registerAgent_706":{"entryPoint":1393,"id":706,"parameterSlots":1,"returnSlots":0},"@renounceOwnership_98":{"entryPoint":1641,"id":98,"parameterSlots":0,"returnSlots":0},"@setBountyContract_659":{"entryPoint":1661,"id":659,"parameterSlots":1,"returnSlots":0},"@setStrategist_672":{"entryPoint":2122,"id":672,"parameterSlots":1,"returnSlots":0},"@strategist_591":{"entryPoint":null,"id":591,"parameterSlots":0,"returnSlots":0},"@transferOwnership_126":{"entryPoint":2164,"id":126,"parameterSlots":1,"returnSlots":0},"@updateMetabolicParams_935":{"entryPoint":1703,"id":935,"parameterSlots":2,"returnSlots":0},"abi_decode_tuple_t_address":{"entryPoint":2492,"id":null,"parameterSlots":2,"returnSlots":1},"abi_decode_tuple_t_uint256t_uint256":{"entryPoint":2540,"id":null,"parameterSlots":2,"returnSlots":2},"abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":1,"returnSlots":1},"abi_encode_tuple_t_address__to_t_address__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"abi_encode_tuple_t_int256__to_t_int256__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"abi_encode_tuple_t_int256_t_uint256_t_bool_t_bool__to_t_int256_t_uint256_t_bool_t_bool__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":5,"returnSlots":1},"abi_encode_tuple_t_rational_100_by_1__to_t_int256__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"abi_encode_tuple_t_stringliteral_2fbdaddc9214f49cc874cceefa9da2874ee454a04fd2c5b9d09b0e57a8f7ffb0__to_t_string_memory_ptr__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":1,"returnSlots":1},"abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":2,"returnSlots":1},"abi_encode_tuple_t_uint256_t_uint256__to_t_uint256_t_uint256__fromStack_reversed":{"entryPoint":null,"id":null,"parameterSlots":3,"returnSlots":1},"checked_add_t_int256":{"entryPoint":2694,"id":null,"parameterSlots":2,"returnSlots":1},"checked_div_t_uint256":{"entryPoint":2621,"id":null,"parameterSlots":2,"returnSlots":1},"checked_sub_t_int256":{"entryPoint":2655,"id":null,"parameterSlots":2,"returnSlots":1},"checked_sub_t_uint256":{"entryPoint":2596,"id":null,"parameterSlots":2,"returnSlots":1},"panic_error_0x11":{"entryPoint":2574,"id":null,"parameterSlots":0,"returnSlots":0}},"generatedSources":[{"ast":{"nodeType":"YulBlock","src":"0:3463:7","statements":[{"nodeType":"YulBlock","src":"6:3:7","statements":[]},{"body":{"nodeType":"YulBlock","src":"84:216:7","statements":[{"body":{"nodeType":"YulBlock","src":"130:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"139:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"142:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"132:6:7"},"nodeType":"YulFunctionCall","src":"132:12:7"},"nodeType":"YulExpressionStatement","src":"132:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"dataEnd","nodeType":"YulIdentifier","src":"105:7:7"},{"name":"headStart","nodeType":"YulIdentifier","src":"114:9:7"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"101:3:7"},"nodeType":"YulFunctionCall","src":"101:23:7"},{"kind":"number","nodeType":"YulLiteral","src":"126:2:7","type":"","value":"32"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"97:3:7"},"nodeType":"YulFunctionCall","src":"97:32:7"},"nodeType":"YulIf","src":"94:52:7"},{"nodeType":"YulVariableDeclaration","src":"155:36:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"181:9:7"}],"functionName":{"name":"calldataload","nodeType":"YulIdentifier","src":"168:12:7"},"nodeType":"YulFunctionCall","src":"168:23:7"},"variables":[{"name":"value","nodeType":"YulTypedName","src":"159:5:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"254:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"263:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"266:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"256:6:7"},"nodeType":"YulFunctionCall","src":"256:12:7"},"nodeType":"YulExpressionStatement","src":"256:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"213:5:7"},{"arguments":[{"name":"value","nodeType":"YulIdentifier","src":"224:5:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"239:3:7","type":"","value":"160"},{"kind":"number","nodeType":"YulLiteral","src":"244:1:7","type":"","value":"1"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"235:3:7"},"nodeType":"YulFunctionCall","src":"235:11:7"},{"kind":"number","nodeType":"YulLiteral","src":"248:1:7","type":"","value":"1"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"231:3:7"},"nodeType":"YulFunctionCall","src":"231:19:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"220:3:7"},"nodeType":"YulFunctionCall","src":"220:31:7"}],"functionName":{"name":"eq","nodeType":"YulIdentifier","src":"210:2:7"},"nodeType":"YulFunctionCall","src":"210:42:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"203:6:7"},"nodeType":"YulFunctionCall","src":"203:50:7"},"nodeType":"YulIf","src":"200:70:7"},{"nodeType":"YulAssignment","src":"279:15:7","value":{"name":"value","nodeType":"YulIdentifier","src":"289:5:7"},"variableNames":[{"name":"value0","nodeType":"YulIdentifier","src":"279:6:7"}]}]},"name":"abi_decode_tuple_t_address","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"50:9:7","type":""},{"name":"dataEnd","nodeType":"YulTypedName","src":"61:7:7","type":""}],"returnVariables":[{"name":"value0","nodeType":"YulTypedName","src":"73:6:7","type":""}],"src":"14:286:7"},{"body":{"nodeType":"YulBlock","src":"406:102:7","statements":[{"nodeType":"YulAssignment","src":"416:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"428:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"439:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"424:3:7"},"nodeType":"YulFunctionCall","src":"424:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"416:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"458:9:7"},{"arguments":[{"name":"value0","nodeType":"YulIdentifier","src":"473:6:7"},{"arguments":[{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"489:3:7","type":"","value":"160"},{"kind":"number","nodeType":"YulLiteral","src":"494:1:7","type":"","value":"1"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"485:3:7"},"nodeType":"YulFunctionCall","src":"485:11:7"},{"kind":"number","nodeType":"YulLiteral","src":"498:1:7","type":"","value":"1"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"481:3:7"},"nodeType":"YulFunctionCall","src":"481:19:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"469:3:7"},"nodeType":"YulFunctionCall","src":"469:32:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"451:6:7"},"nodeType":"YulFunctionCall","src":"451:51:7"},"nodeType":"YulExpressionStatement","src":"451:51:7"}]},"name":"abi_encode_tuple_t_address__to_t_address__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"375:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"386:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"397:4:7","type":""}],"src":"305:203:7"},{"body":{"nodeType":"YulBlock","src":"612:76:7","statements":[{"nodeType":"YulAssignment","src":"622:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"634:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"645:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"630:3:7"},"nodeType":"YulFunctionCall","src":"630:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"622:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"664:9:7"},{"name":"value0","nodeType":"YulIdentifier","src":"675:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"657:6:7"},"nodeType":"YulFunctionCall","src":"657:25:7"},"nodeType":"YulExpressionStatement","src":"657:25:7"}]},"name":"abi_encode_tuple_t_int256__to_t_int256__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"581:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"592:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"603:4:7","type":""}],"src":"513:175:7"},{"body":{"nodeType":"YulBlock","src":"794:76:7","statements":[{"nodeType":"YulAssignment","src":"804:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"816:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"827:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"812:3:7"},"nodeType":"YulFunctionCall","src":"812:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"804:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"846:9:7"},{"name":"value0","nodeType":"YulIdentifier","src":"857:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"839:6:7"},"nodeType":"YulFunctionCall","src":"839:25:7"},"nodeType":"YulExpressionStatement","src":"839:25:7"}]},"name":"abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"763:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"774:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"785:4:7","type":""}],"src":"693:177:7"},{"body":{"nodeType":"YulBlock","src":"962:161:7","statements":[{"body":{"nodeType":"YulBlock","src":"1008:16:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"1017:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"1020:1:7","type":"","value":"0"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"1010:6:7"},"nodeType":"YulFunctionCall","src":"1010:12:7"},"nodeType":"YulExpressionStatement","src":"1010:12:7"}]},"condition":{"arguments":[{"arguments":[{"name":"dataEnd","nodeType":"YulIdentifier","src":"983:7:7"},{"name":"headStart","nodeType":"YulIdentifier","src":"992:9:7"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"979:3:7"},"nodeType":"YulFunctionCall","src":"979:23:7"},{"kind":"number","nodeType":"YulLiteral","src":"1004:2:7","type":"","value":"64"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"975:3:7"},"nodeType":"YulFunctionCall","src":"975:32:7"},"nodeType":"YulIf","src":"972:52:7"},{"nodeType":"YulAssignment","src":"1033:33:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1056:9:7"}],"functionName":{"name":"calldataload","nodeType":"YulIdentifier","src":"1043:12:7"},"nodeType":"YulFunctionCall","src":"1043:23:7"},"variableNames":[{"name":"value0","nodeType":"YulIdentifier","src":"1033:6:7"}]},{"nodeType":"YulAssignment","src":"1075:42:7","value":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1102:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"1113:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"1098:3:7"},"nodeType":"YulFunctionCall","src":"1098:18:7"}],"functionName":{"name":"calldataload","nodeType":"YulIdentifier","src":"1085:12:7"},"nodeType":"YulFunctionCall","src":"1085:32:7"},"variableNames":[{"name":"value1","nodeType":"YulIdentifier","src":"1075:6:7"}]}]},"name":"abi_decode_tuple_t_uint256t_uint256","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"920:9:7","type":""},{"name":"dataEnd","nodeType":"YulTypedName","src":"931:7:7","type":""}],"returnVariables":[{"name":"value0","nodeType":"YulTypedName","src":"943:6:7","type":""},{"name":"value1","nodeType":"YulTypedName","src":"951:6:7","type":""}],"src":"875:248:7"},{"body":{"nodeType":"YulBlock","src":"1299:238:7","statements":[{"nodeType":"YulAssignment","src":"1309:27:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1321:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"1332:3:7","type":"","value":"128"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"1317:3:7"},"nodeType":"YulFunctionCall","src":"1317:19:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"1309:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1352:9:7"},{"name":"value0","nodeType":"YulIdentifier","src":"1363:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1345:6:7"},"nodeType":"YulFunctionCall","src":"1345:25:7"},"nodeType":"YulExpressionStatement","src":"1345:25:7"},{"expression":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1390:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"1401:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"1386:3:7"},"nodeType":"YulFunctionCall","src":"1386:18:7"},{"name":"value1","nodeType":"YulIdentifier","src":"1406:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1379:6:7"},"nodeType":"YulFunctionCall","src":"1379:34:7"},"nodeType":"YulExpressionStatement","src":"1379:34:7"},{"expression":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1433:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"1444:2:7","type":"","value":"64"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"1429:3:7"},"nodeType":"YulFunctionCall","src":"1429:18:7"},{"arguments":[{"arguments":[{"name":"value2","nodeType":"YulIdentifier","src":"1463:6:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"1456:6:7"},"nodeType":"YulFunctionCall","src":"1456:14:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"1449:6:7"},"nodeType":"YulFunctionCall","src":"1449:22:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1422:6:7"},"nodeType":"YulFunctionCall","src":"1422:50:7"},"nodeType":"YulExpressionStatement","src":"1422:50:7"},{"expression":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1492:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"1503:2:7","type":"","value":"96"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"1488:3:7"},"nodeType":"YulFunctionCall","src":"1488:18:7"},{"arguments":[{"arguments":[{"name":"value3","nodeType":"YulIdentifier","src":"1522:6:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"1515:6:7"},"nodeType":"YulFunctionCall","src":"1515:14:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"1508:6:7"},"nodeType":"YulFunctionCall","src":"1508:22:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1481:6:7"},"nodeType":"YulFunctionCall","src":"1481:50:7"},"nodeType":"YulExpressionStatement","src":"1481:50:7"}]},"name":"abi_encode_tuple_t_int256_t_uint256_t_bool_t_bool__to_t_int256_t_uint256_t_bool_t_bool__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"1244:9:7","type":""},{"name":"value3","nodeType":"YulTypedName","src":"1255:6:7","type":""},{"name":"value2","nodeType":"YulTypedName","src":"1263:6:7","type":""},{"name":"value1","nodeType":"YulTypedName","src":"1271:6:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"1279:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"1290:4:7","type":""}],"src":"1128:409:7"},{"body":{"nodeType":"YulBlock","src":"1733:14:7","statements":[{"nodeType":"YulAssignment","src":"1735:10:7","value":{"name":"pos","nodeType":"YulIdentifier","src":"1742:3:7"},"variableNames":[{"name":"end","nodeType":"YulIdentifier","src":"1735:3:7"}]}]},"name":"abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"pos","nodeType":"YulTypedName","src":"1717:3:7","type":""}],"returnVariables":[{"name":"end","nodeType":"YulTypedName","src":"1725:3:7","type":""}],"src":"1542:205:7"},{"body":{"nodeType":"YulBlock","src":"1926:178:7","statements":[{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1943:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"1954:2:7","type":"","value":"32"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1936:6:7"},"nodeType":"YulFunctionCall","src":"1936:21:7"},"nodeType":"YulExpressionStatement","src":"1936:21:7"},{"expression":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"1977:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"1988:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"1973:3:7"},"nodeType":"YulFunctionCall","src":"1973:18:7"},{"kind":"number","nodeType":"YulLiteral","src":"1993:2:7","type":"","value":"28"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"1966:6:7"},"nodeType":"YulFunctionCall","src":"1966:30:7"},"nodeType":"YulExpressionStatement","src":"1966:30:7"},{"expression":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2016:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"2027:2:7","type":"","value":"64"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2012:3:7"},"nodeType":"YulFunctionCall","src":"2012:18:7"},{"hexValue":"5072756e6520726577617264207472616e73666572206661696c6564","kind":"string","nodeType":"YulLiteral","src":"2032:30:7","type":"","value":"Prune reward transfer failed"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2005:6:7"},"nodeType":"YulFunctionCall","src":"2005:58:7"},"nodeType":"YulExpressionStatement","src":"2005:58:7"},{"nodeType":"YulAssignment","src":"2072:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2084:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"2095:2:7","type":"","value":"96"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2080:3:7"},"nodeType":"YulFunctionCall","src":"2080:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"2072:4:7"}]}]},"name":"abi_encode_tuple_t_stringliteral_2fbdaddc9214f49cc874cceefa9da2874ee454a04fd2c5b9d09b0e57a8f7ffb0__to_t_string_memory_ptr__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"1903:9:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"1917:4:7","type":""}],"src":"1752:352:7"},{"body":{"nodeType":"YulBlock","src":"2141:95:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2158:1:7","type":"","value":"0"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2165:3:7","type":"","value":"224"},{"kind":"number","nodeType":"YulLiteral","src":"2170:10:7","type":"","value":"0x4e487b71"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"2161:3:7"},"nodeType":"YulFunctionCall","src":"2161:20:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2151:6:7"},"nodeType":"YulFunctionCall","src":"2151:31:7"},"nodeType":"YulExpressionStatement","src":"2151:31:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2198:1:7","type":"","value":"4"},{"kind":"number","nodeType":"YulLiteral","src":"2201:4:7","type":"","value":"0x11"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2191:6:7"},"nodeType":"YulFunctionCall","src":"2191:15:7"},"nodeType":"YulExpressionStatement","src":"2191:15:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2222:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"2225:4:7","type":"","value":"0x24"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"2215:6:7"},"nodeType":"YulFunctionCall","src":"2215:15:7"},"nodeType":"YulExpressionStatement","src":"2215:15:7"}]},"name":"panic_error_0x11","nodeType":"YulFunctionDefinition","src":"2109:127:7"},{"body":{"nodeType":"YulBlock","src":"2290:79:7","statements":[{"nodeType":"YulAssignment","src":"2300:17:7","value":{"arguments":[{"name":"x","nodeType":"YulIdentifier","src":"2312:1:7"},{"name":"y","nodeType":"YulIdentifier","src":"2315:1:7"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"2308:3:7"},"nodeType":"YulFunctionCall","src":"2308:9:7"},"variableNames":[{"name":"diff","nodeType":"YulIdentifier","src":"2300:4:7"}]},{"body":{"nodeType":"YulBlock","src":"2341:22:7","statements":[{"expression":{"arguments":[],"functionName":{"name":"panic_error_0x11","nodeType":"YulIdentifier","src":"2343:16:7"},"nodeType":"YulFunctionCall","src":"2343:18:7"},"nodeType":"YulExpressionStatement","src":"2343:18:7"}]},"condition":{"arguments":[{"name":"diff","nodeType":"YulIdentifier","src":"2332:4:7"},{"name":"x","nodeType":"YulIdentifier","src":"2338:1:7"}],"functionName":{"name":"gt","nodeType":"YulIdentifier","src":"2329:2:7"},"nodeType":"YulFunctionCall","src":"2329:11:7"},"nodeType":"YulIf","src":"2326:37:7"}]},"name":"checked_sub_t_uint256","nodeType":"YulFunctionDefinition","parameters":[{"name":"x","nodeType":"YulTypedName","src":"2272:1:7","type":""},{"name":"y","nodeType":"YulTypedName","src":"2275:1:7","type":""}],"returnVariables":[{"name":"diff","nodeType":"YulTypedName","src":"2281:4:7","type":""}],"src":"2241:128:7"},{"body":{"nodeType":"YulBlock","src":"2420:171:7","statements":[{"body":{"nodeType":"YulBlock","src":"2451:111:7","statements":[{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2472:1:7","type":"","value":"0"},{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2479:3:7","type":"","value":"224"},{"kind":"number","nodeType":"YulLiteral","src":"2484:10:7","type":"","value":"0x4e487b71"}],"functionName":{"name":"shl","nodeType":"YulIdentifier","src":"2475:3:7"},"nodeType":"YulFunctionCall","src":"2475:20:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2465:6:7"},"nodeType":"YulFunctionCall","src":"2465:31:7"},"nodeType":"YulExpressionStatement","src":"2465:31:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2516:1:7","type":"","value":"4"},{"kind":"number","nodeType":"YulLiteral","src":"2519:4:7","type":"","value":"0x12"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2509:6:7"},"nodeType":"YulFunctionCall","src":"2509:15:7"},"nodeType":"YulExpressionStatement","src":"2509:15:7"},{"expression":{"arguments":[{"kind":"number","nodeType":"YulLiteral","src":"2544:1:7","type":"","value":"0"},{"kind":"number","nodeType":"YulLiteral","src":"2547:4:7","type":"","value":"0x24"}],"functionName":{"name":"revert","nodeType":"YulIdentifier","src":"2537:6:7"},"nodeType":"YulFunctionCall","src":"2537:15:7"},"nodeType":"YulExpressionStatement","src":"2537:15:7"}]},"condition":{"arguments":[{"name":"y","nodeType":"YulIdentifier","src":"2440:1:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"2433:6:7"},"nodeType":"YulFunctionCall","src":"2433:9:7"},"nodeType":"YulIf","src":"2430:132:7"},{"nodeType":"YulAssignment","src":"2571:14:7","value":{"arguments":[{"name":"x","nodeType":"YulIdentifier","src":"2580:1:7"},{"name":"y","nodeType":"YulIdentifier","src":"2583:1:7"}],"functionName":{"name":"div","nodeType":"YulIdentifier","src":"2576:3:7"},"nodeType":"YulFunctionCall","src":"2576:9:7"},"variableNames":[{"name":"r","nodeType":"YulIdentifier","src":"2571:1:7"}]}]},"name":"checked_div_t_uint256","nodeType":"YulFunctionDefinition","parameters":[{"name":"x","nodeType":"YulTypedName","src":"2405:1:7","type":""},{"name":"y","nodeType":"YulTypedName","src":"2408:1:7","type":""}],"returnVariables":[{"name":"r","nodeType":"YulTypedName","src":"2414:1:7","type":""}],"src":"2374:217:7"},{"body":{"nodeType":"YulBlock","src":"2644:152:7","statements":[{"nodeType":"YulAssignment","src":"2654:17:7","value":{"arguments":[{"name":"x","nodeType":"YulIdentifier","src":"2666:1:7"},{"name":"y","nodeType":"YulIdentifier","src":"2669:1:7"}],"functionName":{"name":"sub","nodeType":"YulIdentifier","src":"2662:3:7"},"nodeType":"YulFunctionCall","src":"2662:9:7"},"variableNames":[{"name":"diff","nodeType":"YulIdentifier","src":"2654:4:7"}]},{"nodeType":"YulVariableDeclaration","src":"2680:19:7","value":{"arguments":[{"name":"y","nodeType":"YulIdentifier","src":"2694:1:7"},{"kind":"number","nodeType":"YulLiteral","src":"2697:1:7","type":"","value":"0"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"2690:3:7"},"nodeType":"YulFunctionCall","src":"2690:9:7"},"variables":[{"name":"_1","nodeType":"YulTypedName","src":"2684:2:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"2768:22:7","statements":[{"expression":{"arguments":[],"functionName":{"name":"panic_error_0x11","nodeType":"YulIdentifier","src":"2770:16:7"},"nodeType":"YulFunctionCall","src":"2770:18:7"},"nodeType":"YulExpressionStatement","src":"2770:18:7"}]},"condition":{"arguments":[{"arguments":[{"arguments":[{"name":"_1","nodeType":"YulIdentifier","src":"2725:2:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"2718:6:7"},"nodeType":"YulFunctionCall","src":"2718:10:7"},{"arguments":[{"name":"diff","nodeType":"YulIdentifier","src":"2734:4:7"},{"name":"x","nodeType":"YulIdentifier","src":"2740:1:7"}],"functionName":{"name":"sgt","nodeType":"YulIdentifier","src":"2730:3:7"},"nodeType":"YulFunctionCall","src":"2730:12:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"2714:3:7"},"nodeType":"YulFunctionCall","src":"2714:29:7"},{"arguments":[{"name":"_1","nodeType":"YulIdentifier","src":"2749:2:7"},{"arguments":[{"name":"diff","nodeType":"YulIdentifier","src":"2757:4:7"},{"name":"x","nodeType":"YulIdentifier","src":"2763:1:7"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"2753:3:7"},"nodeType":"YulFunctionCall","src":"2753:12:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"2745:3:7"},"nodeType":"YulFunctionCall","src":"2745:21:7"}],"functionName":{"name":"or","nodeType":"YulIdentifier","src":"2711:2:7"},"nodeType":"YulFunctionCall","src":"2711:56:7"},"nodeType":"YulIf","src":"2708:82:7"}]},"name":"checked_sub_t_int256","nodeType":"YulFunctionDefinition","parameters":[{"name":"x","nodeType":"YulTypedName","src":"2626:1:7","type":""},{"name":"y","nodeType":"YulTypedName","src":"2629:1:7","type":""}],"returnVariables":[{"name":"diff","nodeType":"YulTypedName","src":"2635:4:7","type":""}],"src":"2596:200:7"},{"body":{"nodeType":"YulBlock","src":"2911:76:7","statements":[{"nodeType":"YulAssignment","src":"2921:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2933:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"2944:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"2929:3:7"},"nodeType":"YulFunctionCall","src":"2929:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"2921:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"2963:9:7"},{"name":"value0","nodeType":"YulIdentifier","src":"2974:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"2956:6:7"},"nodeType":"YulFunctionCall","src":"2956:25:7"},"nodeType":"YulExpressionStatement","src":"2956:25:7"}]},"name":"abi_encode_tuple_t_rational_100_by_1__to_t_int256__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"2880:9:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"2891:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"2902:4:7","type":""}],"src":"2801:186:7"},{"body":{"nodeType":"YulBlock","src":"3121:119:7","statements":[{"nodeType":"YulAssignment","src":"3131:26:7","value":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"3143:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"3154:2:7","type":"","value":"64"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"3139:3:7"},"nodeType":"YulFunctionCall","src":"3139:18:7"},"variableNames":[{"name":"tail","nodeType":"YulIdentifier","src":"3131:4:7"}]},{"expression":{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"3173:9:7"},{"name":"value0","nodeType":"YulIdentifier","src":"3184:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"3166:6:7"},"nodeType":"YulFunctionCall","src":"3166:25:7"},"nodeType":"YulExpressionStatement","src":"3166:25:7"},{"expression":{"arguments":[{"arguments":[{"name":"headStart","nodeType":"YulIdentifier","src":"3211:9:7"},{"kind":"number","nodeType":"YulLiteral","src":"3222:2:7","type":"","value":"32"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"3207:3:7"},"nodeType":"YulFunctionCall","src":"3207:18:7"},{"name":"value1","nodeType":"YulIdentifier","src":"3227:6:7"}],"functionName":{"name":"mstore","nodeType":"YulIdentifier","src":"3200:6:7"},"nodeType":"YulFunctionCall","src":"3200:34:7"},"nodeType":"YulExpressionStatement","src":"3200:34:7"}]},"name":"abi_encode_tuple_t_uint256_t_uint256__to_t_uint256_t_uint256__fromStack_reversed","nodeType":"YulFunctionDefinition","parameters":[{"name":"headStart","nodeType":"YulTypedName","src":"3082:9:7","type":""},{"name":"value1","nodeType":"YulTypedName","src":"3093:6:7","type":""},{"name":"value0","nodeType":"YulTypedName","src":"3101:6:7","type":""}],"returnVariables":[{"name":"tail","nodeType":"YulTypedName","src":"3112:4:7","type":""}],"src":"2992:248:7"},{"body":{"nodeType":"YulBlock","src":"3292:169:7","statements":[{"nodeType":"YulAssignment","src":"3302:16:7","value":{"arguments":[{"name":"x","nodeType":"YulIdentifier","src":"3313:1:7"},{"name":"y","nodeType":"YulIdentifier","src":"3316:1:7"}],"functionName":{"name":"add","nodeType":"YulIdentifier","src":"3309:3:7"},"nodeType":"YulFunctionCall","src":"3309:9:7"},"variableNames":[{"name":"sum","nodeType":"YulIdentifier","src":"3302:3:7"}]},{"nodeType":"YulVariableDeclaration","src":"3327:21:7","value":{"arguments":[{"name":"sum","nodeType":"YulIdentifier","src":"3341:3:7"},{"name":"y","nodeType":"YulIdentifier","src":"3346:1:7"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"3337:3:7"},"nodeType":"YulFunctionCall","src":"3337:11:7"},"variables":[{"name":"_1","nodeType":"YulTypedName","src":"3331:2:7","type":""}]},{"nodeType":"YulVariableDeclaration","src":"3357:19:7","value":{"arguments":[{"name":"x","nodeType":"YulIdentifier","src":"3371:1:7"},{"kind":"number","nodeType":"YulLiteral","src":"3374:1:7","type":"","value":"0"}],"functionName":{"name":"slt","nodeType":"YulIdentifier","src":"3367:3:7"},"nodeType":"YulFunctionCall","src":"3367:9:7"},"variables":[{"name":"_2","nodeType":"YulTypedName","src":"3361:2:7","type":""}]},{"body":{"nodeType":"YulBlock","src":"3433:22:7","statements":[{"expression":{"arguments":[],"functionName":{"name":"panic_error_0x11","nodeType":"YulIdentifier","src":"3435:16:7"},"nodeType":"YulFunctionCall","src":"3435:18:7"},"nodeType":"YulExpressionStatement","src":"3435:18:7"}]},"condition":{"arguments":[{"arguments":[{"arguments":[{"name":"_2","nodeType":"YulIdentifier","src":"3402:2:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"3395:6:7"},"nodeType":"YulFunctionCall","src":"3395:10:7"},{"name":"_1","nodeType":"YulIdentifier","src":"3407:2:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"3391:3:7"},"nodeType":"YulFunctionCall","src":"3391:19:7"},{"arguments":[{"name":"_2","nodeType":"YulIdentifier","src":"3416:2:7"},{"arguments":[{"name":"_1","nodeType":"YulIdentifier","src":"3427:2:7"}],"functionName":{"name":"iszero","nodeType":"YulIdentifier","src":"3420:6:7"},"nodeType":"YulFunctionCall","src":"3420:10:7"}],"functionName":{"name":"and","nodeType":"YulIdentifier","src":"3412:3:7"},"nodeType":"YulFunctionCall","src":"3412:19:7"}],"functionName":{"name":"or","nodeType":"YulIdentifier","src":"3388:2:7"},"nodeType":"YulFunctionCall","src":"3388:44:7"},"nodeType":"YulIf","src":"3385:70:7"}]},"name":"checked_add_t_int256","nodeType":"YulFunctionDefinition","parameters":[{"name":"x","nodeType":"YulTypedName","src":"3275:1:7","type":""},{"name":"y","nodeType":"YulTypedName","src":"3278:1:7","type":""}],"returnVariables":[{"name":"sum","nodeType":"YulTypedName","src":"3284:3:7","type":""}],"src":"3245:216:7"}]},"contents":"{\n    { }\n    function abi_decode_tuple_t_address(headStart, dataEnd) -> value0\n    {\n        if slt(sub(dataEnd, headStart), 32) { revert(0, 0) }\n        let value := calldataload(headStart)\n        if iszero(eq(value, and(value, sub(shl(160, 1), 1)))) { revert(0, 0) }\n        value0 := value\n    }\n    function abi_encode_tuple_t_address__to_t_address__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, and(value0, sub(shl(160, 1), 1)))\n    }\n    function abi_encode_tuple_t_int256__to_t_int256__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, value0)\n    }\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, value0)\n    }\n    function abi_decode_tuple_t_uint256t_uint256(headStart, dataEnd) -> value0, value1\n    {\n        if slt(sub(dataEnd, headStart), 64) { revert(0, 0) }\n        value0 := calldataload(headStart)\n        value1 := calldataload(add(headStart, 32))\n    }\n    function abi_encode_tuple_t_int256_t_uint256_t_bool_t_bool__to_t_int256_t_uint256_t_bool_t_bool__fromStack_reversed(headStart, value3, value2, value1, value0) -> tail\n    {\n        tail := add(headStart, 128)\n        mstore(headStart, value0)\n        mstore(add(headStart, 32), value1)\n        mstore(add(headStart, 64), iszero(iszero(value2)))\n        mstore(add(headStart, 96), iszero(iszero(value3)))\n    }\n    function abi_encode_tuple_packed_t_stringliteral_c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470__to_t_bytes_memory_ptr__nonPadded_inplace_fromStack_reversed(pos) -> end\n    { end := pos }\n    function abi_encode_tuple_t_stringliteral_2fbdaddc9214f49cc874cceefa9da2874ee454a04fd2c5b9d09b0e57a8f7ffb0__to_t_string_memory_ptr__fromStack_reversed(headStart) -> tail\n    {\n        mstore(headStart, 32)\n        mstore(add(headStart, 32), 28)\n        mstore(add(headStart, 64), \"Prune reward transfer failed\")\n        tail := add(headStart, 96)\n    }\n    function panic_error_0x11()\n    {\n        mstore(0, shl(224, 0x4e487b71))\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n    function checked_sub_t_uint256(x, y) -> diff\n    {\n        diff := sub(x, y)\n        if gt(diff, x) { panic_error_0x11() }\n    }\n    function checked_div_t_uint256(x, y) -> r\n    {\n        if iszero(y)\n        {\n            mstore(0, shl(224, 0x4e487b71))\n            mstore(4, 0x12)\n            revert(0, 0x24)\n        }\n        r := div(x, y)\n    }\n    function checked_sub_t_int256(x, y) -> diff\n    {\n        diff := sub(x, y)\n        let _1 := slt(y, 0)\n        if or(and(iszero(_1), sgt(diff, x)), and(_1, slt(diff, x))) { panic_error_0x11() }\n    }\n    function abi_encode_tuple_t_rational_100_by_1__to_t_int256__fromStack_reversed(headStart, value0) -> tail\n    {\n        tail := add(headStart, 32)\n        mstore(headStart, value0)\n    }\n    function abi_encode_tuple_t_uint256_t_uint256__to_t_uint256_t_uint256__fromStack_reversed(headStart, value1, value0) -> tail\n    {\n        tail := add(headStart, 64)\n        mstore(headStart, value0)\n        mstore(add(headStart, 32), value1)\n    }\n    function checked_add_t_int256(x, y) -> sum\n    {\n        sum := add(x, y)\n        let _1 := slt(sum, y)\n        let _2 := slt(x, 0)\n        if or(and(iszero(_2), _1), and(_2, iszero(_1))) { panic_error_0x11() }\n    }\n}","id":7,"language":"Yul","name":"#utility.yul"}],"immutableReferences":{},"linkReferences":{},"object":"6080604052600436106100f75760003560e01c80638da5cb5b1161008a578063ddf9fa0911610059578063ddf9fa091461028f578063f2fde38b146102af578063fc2dff08146102cf578063fd66091e146102e557600080fd5b80638da5cb5b1461021b5780638e97fdc314610239578063a9c1f2f114610259578063c7b9d5301461026f57600080fd5b8063715018a6116100c6578063715018a6146101b05780637af86a29146101c557806380b3fa3f146101e557806387693efc146101fb57600080fd5b80630f3cca49146101035780631fe4a686146101255780632f36b5d914610162578063306b9bb91461019057600080fd5b366100fe57005b600080fd5b34801561010f57600080fd5b5061012361011e3660046109bc565b610354565b005b34801561013157600080fd5b50600754610145906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561016e57600080fd5b5061018261017d3660046109bc565b6104e7565b604051908152602001610159565b34801561019c57600080fd5b506101236101ab3660046109bc565b610571565b3480156101bc57600080fd5b50610123610669565b3480156101d157600080fd5b506101236101e03660046109bc565b61067d565b3480156101f157600080fd5b5061018260045481565b34801561020757600080fd5b506101236102163660046109ec565b6106a7565b34801561022757600080fd5b506000546001600160a01b0316610145565b34801561024557600080fd5b506101236102543660046109bc565b61073a565b34801561026557600080fd5b5061018260035481565b34801561027b57600080fd5b5061012361028a3660046109bc565b61084a565b34801561029b57600080fd5b50600654610145906001600160a01b031681565b3480156102bb57600080fd5b506101236102ca3660046109bc565b610874565b3480156102db57600080fd5b5061018260055481565b3480156102f157600080fd5b5061032c6103003660046109bc565b600260208190526000918252604090912080546001820154919092015460ff8082169161010090041684565b6040805194855260208501939093529015159183019190915215156060820152608001610159565b61035c6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166103a0576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166103c557604051632437e77160e11b815260040160405180910390fd5b6103ce826108d9565b8054600012156103f157604051631e3b681960e21b815260040160405180910390fd5b60028101805460ff1916905560055447106104a65760055460405160009133918381818185875af1925050503d8060008114610449576040519150601f19603f3d011682016040523d82523d6000602084013e61044e565b606091505b50509050806104a45760405162461bcd60e51b815260206004820152601c60248201527f5072756e6520726577617264207472616e73666572206661696c65640000000060448201526064015b60405180910390fd5b505b6040516001600160a01b038316907f3481493766137a21a43eefafc4c946920d719b13638a00ce8eb791ec28cc9ef490600090a2506104e460018055565b50565b6001600160a01b0381166000908152600260208190526040822090810154610100900460ff1661051a5750600092915050565b600281015460ff1661052f5750600092915050565b60008160010154436105419190610a24565b90506000600354826105539190610a3d565b905060008184600001546105679190610a5f565b9695505050505050565b61057961093f565b6001600160a01b03811660009081526002602081905260409091200154610100900460ff16156105bc5760405163704c69f760e11b815260040160405180910390fd5b6040805160808101825260648082524360208084019182526001848601818152606086018281526001600160a01b03891660008181526002808752908a9020985189559551938801939093559051959093018054935161ffff1990941695151561ff00191695909517610100931515939093029290921790935592519081527f86d94fe3783a846468c0b7912fca3072b86415f6da1c7045926f0bc687a9da12910160405180910390a250565b61067161093f565b61067b600061096c565b565b61068561093f565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b6007546001600160a01b031633146106d25760405163ea8e4eb560e01b815260040160405180910390fd5b816000036106f357604051630678582160e51b815260040160405180910390fd5b6003829055600481905560408051838152602081018390527ffaccb0639ff7851e0e24f3b2d9ab03cd62ffb63f5b4d90aaeff85bb078c1fa48910160405180910390a15050565b6006546001600160a01b031633146107655760405163ea8e4eb560e01b815260040160405180910390fd5b61076d6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166107b1576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166107d657604051632437e77160e11b815260040160405180910390fd5b6107df826108d9565b6004548160000160008282546107f59190610a86565b909155505043600182015580546040519081526001600160a01b038316907fd7563a2b45d0b0f1b01b82db96ae4752fe46daa24649b6076762ae631a0cdd2b9060200160405180910390a2506104e460018055565b61085261093f565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b61087c61093f565b6001600160a01b0381166108a657604051631e4fbdf760e01b81526000600482015260240161049b565b6104e48161096c565b6002600154036108d257604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6001600160a01b038116600090815260026020526040812060018101549091906109039043610a24565b90506000600354826109159190610a3d565b90508083600001600082825461092b9190610a5f565b909155505043600190930192909255505050565b6000546001600160a01b0316331461067b5760405163118cdaa760e01b815233600482015260240161049b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156109ce57600080fd5b81356001600160a01b03811681146109e557600080fd5b9392505050565b600080604083850312156109ff57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b81810381811115610a3757610a37610a0e565b92915050565b600082610a5a57634e487b7160e01b600052601260045260246000fd5b500490565b8181036000831280158383131683831282161715610a7f57610a7f610a0e565b5092915050565b8082018281126000831280158216821582161715610aa657610aa6610a0e565b50509291505056fea26469706673582212200fc46ab2a6d3edc44b53de50eddce2215f153b7fda095d3a76fdc72c192f83b064736f6c63430008140033","opcodes":"PUSH1 0x80 PUSH1 0x40 MSTORE PUSH1 0x4 CALLDATASIZE LT PUSH2 0xF7 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x8DA5CB5B GT PUSH2 0x8A JUMPI DUP1 PUSH4 0xDDF9FA09 GT PUSH2 0x59 JUMPI DUP1 PUSH4 0xDDF9FA09 EQ PUSH2 0x28F JUMPI DUP1 PUSH4 0xF2FDE38B EQ PUSH2 0x2AF JUMPI DUP1 PUSH4 0xFC2DFF08 EQ PUSH2 0x2CF JUMPI DUP1 PUSH4 0xFD66091E EQ PUSH2 0x2E5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x8DA5CB5B EQ PUSH2 0x21B JUMPI DUP1 PUSH4 0x8E97FDC3 EQ PUSH2 0x239 JUMPI DUP1 PUSH4 0xA9C1F2F1 EQ PUSH2 0x259 JUMPI DUP1 PUSH4 0xC7B9D530 EQ PUSH2 0x26F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0x715018A6 GT PUSH2 0xC6 JUMPI DUP1 PUSH4 0x715018A6 EQ PUSH2 0x1B0 JUMPI DUP1 PUSH4 0x7AF86A29 EQ PUSH2 0x1C5 JUMPI DUP1 PUSH4 0x80B3FA3F EQ PUSH2 0x1E5 JUMPI DUP1 PUSH4 0x87693EFC EQ PUSH2 0x1FB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP1 PUSH4 0xF3CCA49 EQ PUSH2 0x103 JUMPI DUP1 PUSH4 0x1FE4A686 EQ PUSH2 0x125 JUMPI DUP1 PUSH4 0x2F36B5D9 EQ PUSH2 0x162 JUMPI DUP1 PUSH4 0x306B9BB9 EQ PUSH2 0x190 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST CALLDATASIZE PUSH2 0xFE JUMPI STOP JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x10F JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x11E CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x354 JUMP JUMPDEST STOP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x131 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x7 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP1 SWAP2 AND DUP2 MSTORE PUSH1 0x20 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x16E JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x182 PUSH2 0x17D CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x4E7 JUMP JUMPDEST PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH2 0x159 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x19C JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x1AB CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x571 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1BC JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x669 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1D1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x1E0 CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x67D JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x1F1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x182 PUSH1 0x4 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x207 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x216 CALLDATASIZE PUSH1 0x4 PUSH2 0x9EC JUMP JUMPDEST PUSH2 0x6A7 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x227 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND PUSH2 0x145 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x245 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x254 CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x73A JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x265 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x182 PUSH1 0x3 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x27B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x28A CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x84A JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x29B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x6 SLOAD PUSH2 0x145 SWAP1 PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2BB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x123 PUSH2 0x2CA CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH2 0x874 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2DB JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x182 PUSH1 0x5 SLOAD DUP2 JUMP JUMPDEST CALLVALUE DUP1 ISZERO PUSH2 0x2F1 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x32C PUSH2 0x300 CALLDATASIZE PUSH1 0x4 PUSH2 0x9BC JUMP JUMPDEST PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x0 SWAP2 DUP3 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 DUP1 SLOAD PUSH1 0x1 DUP3 ADD SLOAD SWAP2 SWAP1 SWAP3 ADD SLOAD PUSH1 0xFF DUP1 DUP3 AND SWAP2 PUSH2 0x100 SWAP1 DIV AND DUP5 JUMP JUMPDEST PUSH1 0x40 DUP1 MLOAD SWAP5 DUP6 MSTORE PUSH1 0x20 DUP6 ADD SWAP4 SWAP1 SWAP4 MSTORE SWAP1 ISZERO ISZERO SWAP2 DUP4 ADD SWAP2 SWAP1 SWAP2 MSTORE ISZERO ISZERO PUSH1 0x60 DUP3 ADD MSTORE PUSH1 0x80 ADD PUSH2 0x159 JUMP JUMPDEST PUSH2 0x35C PUSH2 0x8AF JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 SWAP1 DUP2 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND PUSH2 0x3A0 JUMPI PUSH1 0x40 MLOAD PUSH4 0x83BCFB47 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 DUP2 ADD SLOAD PUSH1 0xFF AND PUSH2 0x3C5 JUMPI PUSH1 0x40 MLOAD PUSH4 0x2437E771 PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x3CE DUP3 PUSH2 0x8D9 JUMP JUMPDEST DUP1 SLOAD PUSH1 0x0 SLT ISZERO PUSH2 0x3F1 JUMPI PUSH1 0x40 MLOAD PUSH4 0x1E3B6819 PUSH1 0xE2 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 DUP2 ADD DUP1 SLOAD PUSH1 0xFF NOT AND SWAP1 SSTORE PUSH1 0x5 SLOAD SELFBALANCE LT PUSH2 0x4A6 JUMPI PUSH1 0x5 SLOAD PUSH1 0x40 MLOAD PUSH1 0x0 SWAP2 CALLER SWAP2 DUP4 DUP2 DUP2 DUP2 DUP6 DUP8 GAS CALL SWAP3 POP POP POP RETURNDATASIZE DUP1 PUSH1 0x0 DUP2 EQ PUSH2 0x449 JUMPI PUSH1 0x40 MLOAD SWAP2 POP PUSH1 0x1F NOT PUSH1 0x3F RETURNDATASIZE ADD AND DUP3 ADD PUSH1 0x40 MSTORE RETURNDATASIZE DUP3 MSTORE RETURNDATASIZE PUSH1 0x0 PUSH1 0x20 DUP5 ADD RETURNDATACOPY PUSH2 0x44E JUMP JUMPDEST PUSH1 0x60 SWAP2 POP JUMPDEST POP POP SWAP1 POP DUP1 PUSH2 0x4A4 JUMPI PUSH1 0x40 MLOAD PUSH3 0x461BCD PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x20 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x1C PUSH1 0x24 DUP3 ADD MSTORE PUSH32 0x5072756E6520726577617264207472616E73666572206661696C656400000000 PUSH1 0x44 DUP3 ADD MSTORE PUSH1 0x64 ADD JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST POP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP1 PUSH32 0x3481493766137A21A43EEFAFC4C946920D719B13638A00CE8EB791EC28CC9EF4 SWAP1 PUSH1 0x0 SWAP1 LOG2 POP PUSH2 0x4E4 PUSH1 0x1 DUP1 SSTORE JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 DUP3 KECCAK256 SWAP1 DUP2 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND PUSH2 0x51A JUMPI POP PUSH1 0x0 SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x2 DUP2 ADD SLOAD PUSH1 0xFF AND PUSH2 0x52F JUMPI POP PUSH1 0x0 SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 PUSH1 0x1 ADD SLOAD NUMBER PUSH2 0x541 SWAP2 SWAP1 PUSH2 0xA24 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH1 0x3 SLOAD DUP3 PUSH2 0x553 SWAP2 SWAP1 PUSH2 0xA3D JUMP JUMPDEST SWAP1 POP PUSH1 0x0 DUP2 DUP5 PUSH1 0x0 ADD SLOAD PUSH2 0x567 SWAP2 SWAP1 PUSH2 0xA5F JUMP JUMPDEST SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH2 0x579 PUSH2 0x93F JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND ISZERO PUSH2 0x5BC JUMPI PUSH1 0x40 MLOAD PUSH4 0x704C69F7 PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x40 DUP1 MLOAD PUSH1 0x80 DUP2 ADD DUP3 MSTORE PUSH1 0x64 DUP1 DUP3 MSTORE NUMBER PUSH1 0x20 DUP1 DUP5 ADD SWAP2 DUP3 MSTORE PUSH1 0x1 DUP5 DUP7 ADD DUP2 DUP2 MSTORE PUSH1 0x60 DUP7 ADD DUP3 DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP10 AND PUSH1 0x0 DUP2 DUP2 MSTORE PUSH1 0x2 DUP1 DUP8 MSTORE SWAP1 DUP11 SWAP1 KECCAK256 SWAP9 MLOAD DUP10 SSTORE SWAP6 MLOAD SWAP4 DUP9 ADD SWAP4 SWAP1 SWAP4 SSTORE SWAP1 MLOAD SWAP6 SWAP1 SWAP4 ADD DUP1 SLOAD SWAP4 MLOAD PUSH2 0xFFFF NOT SWAP1 SWAP5 AND SWAP6 ISZERO ISZERO PUSH2 0xFF00 NOT AND SWAP6 SWAP1 SWAP6 OR PUSH2 0x100 SWAP4 ISZERO ISZERO SWAP4 SWAP1 SWAP4 MUL SWAP3 SWAP1 SWAP3 OR SWAP1 SWAP4 SSTORE SWAP3 MLOAD SWAP1 DUP2 MSTORE PUSH32 0x86D94FE3783A846468C0B7912FCA3072B86415F6DA1C7045926F0BC687A9DA12 SWAP2 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG2 POP JUMP JUMPDEST PUSH2 0x671 PUSH2 0x93F JUMP JUMPDEST PUSH2 0x67B PUSH1 0x0 PUSH2 0x96C JUMP JUMPDEST JUMP JUMPDEST PUSH2 0x685 PUSH2 0x93F JUMP JUMPDEST PUSH1 0x6 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP3 SWAP1 SWAP3 AND SWAP2 SWAP1 SWAP2 OR SWAP1 SSTORE JUMP JUMPDEST PUSH1 0x7 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ PUSH2 0x6D2 JUMPI PUSH1 0x40 MLOAD PUSH4 0xEA8E4EB5 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP2 PUSH1 0x0 SUB PUSH2 0x6F3 JUMPI PUSH1 0x40 MLOAD PUSH4 0x6785821 PUSH1 0xE5 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x3 DUP3 SWAP1 SSTORE PUSH1 0x4 DUP2 SWAP1 SSTORE PUSH1 0x40 DUP1 MLOAD DUP4 DUP2 MSTORE PUSH1 0x20 DUP2 ADD DUP4 SWAP1 MSTORE PUSH32 0xFACCB0639FF7851E0E24F3B2D9AB03CD62FFB63F5B4D90AAEFF85BB078C1FA48 SWAP2 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG1 POP POP JUMP JUMPDEST PUSH1 0x6 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ PUSH2 0x765 JUMPI PUSH1 0x40 MLOAD PUSH4 0xEA8E4EB5 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x76D PUSH2 0x8AF JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 DUP2 SWAP1 MSTORE PUSH1 0x40 SWAP1 SWAP2 KECCAK256 SWAP1 DUP2 ADD SLOAD PUSH2 0x100 SWAP1 DIV PUSH1 0xFF AND PUSH2 0x7B1 JUMPI PUSH1 0x40 MLOAD PUSH4 0x83BCFB47 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 DUP2 ADD SLOAD PUSH1 0xFF AND PUSH2 0x7D6 JUMPI PUSH1 0x40 MLOAD PUSH4 0x2437E771 PUSH1 0xE1 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x7DF DUP3 PUSH2 0x8D9 JUMP JUMPDEST PUSH1 0x4 SLOAD DUP2 PUSH1 0x0 ADD PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x7F5 SWAP2 SWAP1 PUSH2 0xA86 JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP NUMBER PUSH1 0x1 DUP3 ADD SSTORE DUP1 SLOAD PUSH1 0x40 MLOAD SWAP1 DUP2 MSTORE PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 AND SWAP1 PUSH32 0xD7563A2B45D0B0F1B01B82DB96AE4752FE46DAA24649B6076762AE631A0CDD2B SWAP1 PUSH1 0x20 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG2 POP PUSH2 0x4E4 PUSH1 0x1 DUP1 SSTORE JUMP JUMPDEST PUSH2 0x852 PUSH2 0x93F JUMP JUMPDEST PUSH1 0x7 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB SWAP3 SWAP1 SWAP3 AND SWAP2 SWAP1 SWAP2 OR SWAP1 SSTORE JUMP JUMPDEST PUSH2 0x87C PUSH2 0x93F JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH2 0x8A6 JUMPI PUSH1 0x40 MLOAD PUSH4 0x1E4FBDF7 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x0 PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD PUSH2 0x49B JUMP JUMPDEST PUSH2 0x4E4 DUP2 PUSH2 0x96C JUMP JUMPDEST PUSH1 0x2 PUSH1 0x1 SLOAD SUB PUSH2 0x8D2 JUMPI PUSH1 0x40 MLOAD PUSH4 0x3EE5AEB5 PUSH1 0xE0 SHL DUP2 MSTORE PUSH1 0x4 ADD PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 PUSH1 0x1 SSTORE JUMP JUMPDEST PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND PUSH1 0x0 SWAP1 DUP2 MSTORE PUSH1 0x2 PUSH1 0x20 MSTORE PUSH1 0x40 DUP2 KECCAK256 PUSH1 0x1 DUP2 ADD SLOAD SWAP1 SWAP2 SWAP1 PUSH2 0x903 SWAP1 NUMBER PUSH2 0xA24 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH1 0x3 SLOAD DUP3 PUSH2 0x915 SWAP2 SWAP1 PUSH2 0xA3D JUMP JUMPDEST SWAP1 POP DUP1 DUP4 PUSH1 0x0 ADD PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x92B SWAP2 SWAP1 PUSH2 0xA5F JUMP JUMPDEST SWAP1 SWAP2 SSTORE POP POP NUMBER PUSH1 0x1 SWAP1 SWAP4 ADD SWAP3 SWAP1 SWAP3 SSTORE POP POP POP JUMP JUMPDEST PUSH1 0x0 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB AND CALLER EQ PUSH2 0x67B JUMPI PUSH1 0x40 MLOAD PUSH4 0x118CDAA7 PUSH1 0xE0 SHL DUP2 MSTORE CALLER PUSH1 0x4 DUP3 ADD MSTORE PUSH1 0x24 ADD PUSH2 0x49B JUMP JUMPDEST PUSH1 0x0 DUP1 SLOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP4 DUP2 AND PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB NOT DUP4 AND DUP2 OR DUP5 SSTORE PUSH1 0x40 MLOAD SWAP2 SWAP1 SWAP3 AND SWAP3 DUP4 SWAP2 PUSH32 0x8BE0079C531659141344CD1FD0A4F28419497F9722A3DAAFE3B4186F6B6457E0 SWAP2 SWAP1 LOG3 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x9CE JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST DUP2 CALLDATALOAD PUSH1 0x1 PUSH1 0x1 PUSH1 0xA0 SHL SUB DUP2 AND DUP2 EQ PUSH2 0x9E5 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x9FF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP POP DUP1 CALLDATALOAD SWAP3 PUSH1 0x20 SWAP1 SWAP2 ADD CALLDATALOAD SWAP2 POP JUMP JUMPDEST PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST DUP2 DUP2 SUB DUP2 DUP2 GT ISZERO PUSH2 0xA37 JUMPI PUSH2 0xA37 PUSH2 0xA0E JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH2 0xA5A JUMPI PUSH4 0x4E487B71 PUSH1 0xE0 SHL PUSH1 0x0 MSTORE PUSH1 0x12 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST POP DIV SWAP1 JUMP JUMPDEST DUP2 DUP2 SUB PUSH1 0x0 DUP4 SLT DUP1 ISZERO DUP4 DUP4 SGT AND DUP4 DUP4 SLT DUP3 AND OR ISZERO PUSH2 0xA7F JUMPI PUSH2 0xA7F PUSH2 0xA0E JUMP JUMPDEST POP SWAP3 SWAP2 POP POP JUMP JUMPDEST DUP1 DUP3 ADD DUP3 DUP2 SLT PUSH1 0x0 DUP4 SLT DUP1 ISZERO DUP3 AND DUP3 ISZERO DUP3 AND OR ISZERO PUSH2 0xAA6 JUMPI PUSH2 0xAA6 PUSH2 0xA0E JUMP JUMPDEST POP POP SWAP3 SWAP2 POP POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 0xF 0xC4 PUSH11 0xB2A6D3EDC44B53DE50EDDC 0xE2 0x21 PUSH0 ISZERO EXTCODESIZE PUSH32 0xDA095D3A76FDC72C192F83B064736F6C63430008140033000000000000000000 ","sourceMap":"751:8529:4:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7136:717;;;;;;;;;;-1:-1:-1;7136:717:4;;;;;:::i;:::-;;:::i;:::-;;2049:25;;;;;;;;;;-1:-1:-1;2049:25:4;;;;-1:-1:-1;;;;;2049:25:4;;;;;;-1:-1:-1;;;;;469:32:7;;;451:51;;439:2;424:18;2049:25:4;;;;;;;;5378:446;;;;;;;;;;-1:-1:-1;5378:446:4;;;;;:::i;:::-;;:::i;:::-;;;657:25:7;;;645:2;630:18;5378:446:4;513:175:7;4658:375:4;;;;;;;;;;-1:-1:-1;4658:375:4;;;;;:::i;:::-;;:::i;2293:101:0:-;;;;;;;;;;;;;:::i;4101:122:4:-;;;;;;;;;;-1:-1:-1;4101:122:4;;;;;:::i;:::-;;:::i;1623:31::-;;;;;;;;;;;;;;;;8181:329;;;;;;;;;;-1:-1:-1;8181:329:4;;;;;:::i;:::-;;:::i;1638:85:0:-;;;;;;;;;;-1:-1:-1;1684:7:0;1710:6;-1:-1:-1;;;;;1710:6:0;1638:85;;6207:526:4;;;;;;;;;;-1:-1:-1;6207:526:4;;;;;:::i;:::-;;:::i;1532:31::-;;;;;;;;;;;;;;;;4293:106;;;;;;;;;;-1:-1:-1;4293:106:4;;;;;:::i;:::-;;:::i;1969:29::-;;;;;;;;;;-1:-1:-1;1969:29:4;;;;-1:-1:-1;;;;;1969:29:4;;;2543:215:0;;;;;;;;;;-1:-1:-1;2543:215:0;;;;;:::i;:::-;;:::i;1706:36:4:-;;;;;;;;;;;;;;;;1332:43;;;;;;;;;;-1:-1:-1;1332:43:4;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1345:25:7;;;1401:2;1386:18;;1379:34;;;;1456:14;;1449:22;1429:18;;;1422:50;;;;1515:14;1508:22;1503:2;1488:18;;1481:50;1332:3;1317:19;1332:43:4;1128:409:7;7136:717:4;2500:21:2;:19;:21::i;:::-;-1:-1:-1;;;;;7233:13:4;::::1;7208:22;7233:13:::0;;;:6:::1;:13;::::0;;;;;;;7262:17;;::::1;::::0;::::1;::::0;::::1;;;7257:51;;7288:20;;-1:-1:-1::0;;;7288:20:4::1;;;;;;;;;;;7257:51;7324:13;::::0;::::1;::::0;::::1;;7319:43;;7346:16;;-1:-1:-1::0;;;7346:16:4::1;;;;;;;;;;;7319:43;7414:18;7426:5;7414:11;:18::i;:::-;7449:19:::0;;7471:1:::1;-1:-1:-1::0;7445:53:4::1;;;7481:17;;-1:-1:-1::0;;;7481:17:4::1;;;;;;;;;;;7445:53;7547:13;::::0;::::1;:21:::0;;-1:-1:-1;;7547:21:4::1;::::0;;7640:11:::1;::::0;7615:21:::1;:36;7611:199;;7719:11;::::0;7687:48:::1;::::0;7669:12:::1;::::0;7695:10:::1;::::0;7669:12;7687:48;7669:12;7687:48;7719:11;7695:10;7687:48:::1;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;7668:67;;;7758:7;7750:48;;;::::0;-1:-1:-1;;;7750:48:4;;1954:2:7;7750:48:4::1;::::0;::::1;1936:21:7::0;1993:2;1973:18;;;1966:30;2032;2012:18;;;2005:58;2080:18;;7750:48:4::1;;;;;;;;;7653:157;7611:199;7827:18;::::0;-1:-1:-1;;;;;7827:18:4;::::1;::::0;::::1;::::0;;;::::1;7197:656;2542:20:2::0;1857:1;3068:21;;2888:208;2542:20;7136:717:4;:::o;5378:446::-;-1:-1:-1;;;;;5490:13:4;;5446:6;5490:13;;;:6;:13;;;;;;;5519:17;;;;;;;;;5514:32;;-1:-1:-1;5545:1:4;;5378:446;-1:-1:-1;;5378:446:4:o;5514:32::-;5562:13;;;;;;5557:28;;-1:-1:-1;5584:1:4;;5378:446;-1:-1:-1;;5378:446:4:o;5557:28::-;5598:20;5636:4;:20;;;5621:12;:35;;;;:::i;:::-;5598:58;;5667:14;5706:9;;5691:12;:24;;;;:::i;:::-;5667:49;;5727:22;5774:7;5752:4;:19;;;:29;;;;:::i;:::-;5727:54;5378:446;-1:-1:-1;;;;;;5378:446:4:o;4658:375::-;1531:13:0;:11;:13::i;:::-;-1:-1:-1;;;;;4730:13:4;::::1;;::::0;;;:6:::1;:13;::::0;;;;;;;:26:::1;::::0;::::1;::::0;::::1;;;4726:63;;;4765:24;;-1:-1:-1::0;;;4765:24:4::1;;;;;;;;;;;4726:63;4818:162;::::0;;::::1;::::0;::::1;::::0;;4859:3:::1;4818:162:::0;;;4894:12:::1;4818:162;::::0;;::::1;::::0;;;4931:4:::1;4818:162:::0;;;;;;;;;;;;-1:-1:-1;;;;;4802:13:4;::::1;-1:-1:-1::0;4802:13:4;;;:6:::1;:13:::0;;;;;;;:178;;;;;;;;::::1;::::0;;;;;;;;;::::1;::::0;;;;-1:-1:-1;;4802:178:4;;;;::::1;;-1:-1:-1::0;;4802:178:4;;;;;::::1;::::0;::::1;;::::0;;;::::1;::::0;;;::::1;::::0;;;4998:27;;657:25:7;;;4998:27:4::1;::::0;630:18:7;4998:27:4::1;;;;;;;4658:375:::0;:::o;2293:101:0:-;1531:13;:11;:13::i;:::-;2357:30:::1;2384:1;2357:18;:30::i;:::-;2293:101::o:0;4101:122:4:-;1531:13:0;:11;:13::i;:::-;4183:14:4::1;:32:::0;;-1:-1:-1;;;;;;4183:32:4::1;-1:-1:-1::0;;;;;4183:32:4;;;::::1;::::0;;;::::1;::::0;;4101:122::o;8181:329::-;3471:10;;-1:-1:-1;;;;;3471:10:4;3457;:24;3453:52;;3490:15;;-1:-1:-1;;;3490:15:4;;;;;;;;;;;3453:52;8327:10:::1;8341:1;8327:15:::0;8323:46:::1;;8351:18;;-1:-1:-1::0;;;8351:18:4::1;;;;;;;;;;;8323:46;8382:9;:22:::0;;;8415:11:::1;:26:::0;;;8459:43:::1;::::0;;3166:25:7;;;3222:2;3207:18;;3200:34;;;8459:43:4::1;::::0;3139:18:7;8459:43:4::1;;;;;;;8181:329:::0;;:::o;6207:526::-;3350:14;;-1:-1:-1;;;;;3350:14:4;3336:10;:28;3332:56;;3373:15;;-1:-1:-1;;;3373:15:4;;;;;;;;;;;3332:56;2500:21:2::1;:19;:21::i;:::-;-1:-1:-1::0;;;;;6323:13:4;::::2;6298:22;6323:13:::0;;;:6:::2;:13;::::0;;;;;;;6352:17;;::::2;::::0;::::2;::::0;::::2;;;6347:51;;6378:20;;-1:-1:-1::0;;;6378:20:4::2;;;;;;;;;;;6347:51;6414:13;::::0;::::2;::::0;::::2;;6409:43;;6436:16;;-1:-1:-1::0;;;6436:16:4::2;;;;;;;;;;;6409:43;6509:18;6521:5;6509:11;:18::i;:::-;6599:11;;6569:4;:19;;;:42;;;;;;;:::i;:::-;::::0;;;-1:-1:-1;;6645:12:4::2;6622:20;::::0;::::2;:35:::0;6704:19;;6675:50:::2;::::0;657:25:7;;;-1:-1:-1;;;;;6675:50:4;::::2;::::0;::::2;::::0;645:2:7;630:18;6675:50:4::2;;;;;;;6287:446;2542:20:2::1;1857:1:::0;3068:21;;2888:208;4293:106:4;1531:13:0;:11;:13::i;:::-;4367:10:4::1;:24:::0;;-1:-1:-1;;;;;;4367:24:4::1;-1:-1:-1::0;;;;;4367:24:4;;;::::1;::::0;;;::::1;::::0;;4293:106::o;2543:215:0:-;1531:13;:11;:13::i;:::-;-1:-1:-1;;;;;2627:22:0;::::1;2623:91;;2672:31;::::0;-1:-1:-1;;;2672:31:0;;2700:1:::1;2672:31;::::0;::::1;451:51:7::0;424:18;;2672:31:0::1;305:203:7::0;2623:91:0::1;2723:28;2742:8;2723:18;:28::i;2575:307:2:-:0;1899:1;2702:7;;:18;2698:86;;2743:30;;-1:-1:-1;;;2743:30:2;;;;;;;;;;;2698:86;1899:1;2858:7;:17;2575:307::o;8778:318:4:-;-1:-1:-1;;;;;8859:13:4;;8834:22;8859:13;;;:6;:13;;;;;8921:20;;;;8859:13;;8834:22;8906:35;;:12;:35;:::i;:::-;8883:58;;8952:14;8991:9;;8976:12;:24;;;;:::i;:::-;8952:49;;9035:7;9012:4;:19;;;:30;;;;;;;:::i;:::-;;;;-1:-1:-1;;9076:12:4;9053:20;;;;:35;;;;-1:-1:-1;;;8778:318:4:o;1796:162:0:-;1684:7;1710:6;-1:-1:-1;;;;;1710:6:0;735:10:1;1855:23:0;1851:101;;1901:40;;-1:-1:-1;;;1901:40:0;;735:10:1;1901:40:0;;;451:51:7;424:18;;1901:40:0;305:203:7;2912:187:0;2985:16;3004:6;;-1:-1:-1;;;;;3020:17:0;;;-1:-1:-1;;;;;;3020:17:0;;;;;;3052:40;;3004:6;;;;;;;3052:40;;2985:16;3052:40;2975:124;2912:187;:::o;14:286:7:-;73:6;126:2;114:9;105:7;101:23;97:32;94:52;;;142:1;139;132:12;94:52;168:23;;-1:-1:-1;;;;;220:31:7;;210:42;;200:70;;266:1;263;256:12;200:70;289:5;14:286;-1:-1:-1;;;14:286:7:o;875:248::-;943:6;951;1004:2;992:9;983:7;979:23;975:32;972:52;;;1020:1;1017;1010:12;972:52;-1:-1:-1;;1043:23:7;;;1113:2;1098:18;;;1085:32;;-1:-1:-1;875:248:7:o;2109:127::-;2170:10;2165:3;2161:20;2158:1;2151:31;2201:4;2198:1;2191:15;2225:4;2222:1;2215:15;2241:128;2308:9;;;2329:11;;;2326:37;;;2343:18;;:::i;:::-;2241:128;;;;:::o;2374:217::-;2414:1;2440;2430:132;;2484:10;2479:3;2475:20;2472:1;2465:31;2519:4;2516:1;2509:15;2547:4;2544:1;2537:15;2430:132;-1:-1:-1;2576:9:7;;2374:217::o;2596:200::-;2662:9;;;2635:4;2690:9;;2718:10;;2730:12;;;2714:29;2753:12;;;2745:21;;2711:56;2708:82;;;2770:18;;:::i;:::-;2708:82;2596:200;;;;:::o;3245:216::-;3309:9;;;3337:11;;;3284:3;3367:9;;3395:10;;3391:19;;3420:10;;3412:19;;3388:44;3385:70;;;3435:18;;:::i;:::-;3385:70;;3245:216;;;;:::o"},"methodIdentifiers":{"agents(address)":"fd66091e","bountyContract()":"ddf9fa09","decayRate()":"a9c1f2f1","getVitality(address)":"2f36b5d9","owner()":"8da5cb5b","prune(address)":"0f3cca49","pruneReward()":"fc2dff08","pulse(address)":"8e97fdc3","pulseAmount()":"80b3fa3f","registerAgent(address)":"306b9bb9","renounceOwnership()":"715018a6","setBountyContract(address)":"7af86a29","setStrategist(address)":"c7b9d530","strategist()":"1fe4a686","transferOwnership(address)":"f2fde38b","updateMetabolicParams(uint256,uint256)":"87693efc"}},"metadata":"{\"compiler\":{\"version\":\"0.8.20+commit.a1b79de6\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[],\"name\":\"AgentAlreadyRegistered\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AgentNotActive\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AgentNotRegistered\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"AgentStillAlive\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"InvalidDecayRate\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"NotAuthorized\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"}],\"name\":\"AgentPruned\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"int256\",\"name\":\"initialVitality\",\"type\":\"int256\"}],\"name\":\"AgentRegistered\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newDecayRate\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newPulseAmount\",\"type\":\"uint256\"}],\"name\":\"ParametersUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newAmount\",\"type\":\"uint256\"}],\"name\":\"VitalityPulse\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"agents\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"storedVitality\",\"type\":\"int256\"},{\"internalType\":\"uint256\",\"name\":\"lastUpdateBlock\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"isActive\",\"type\":\"bool\"},{\"internalType\":\"bool\",\"name\":\"isRegistered\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"bountyContract\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"decayRate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"}],\"name\":\"getVitality\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"}],\"name\":\"prune\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"pruneReward\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"}],\"name\":\"pulse\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"pulseAmount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"}],\"name\":\"registerAgent\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_bountyContract\",\"type\":\"address\"}],\"name\":\"setBountyContract\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_strategist\",\"type\":\"address\"}],\"name\":\"setStrategist\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"strategist\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_decayRate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_pulseAmount\",\"type\":\"uint256\"}],\"name\":\"updateMetabolicParams\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"devdoc\":{\"details\":\"Spec \\u00a71.1 \\u2014 \\\"The Hard Logic (Immutable Rules)\\\"  Decay:     currentVitality = storedVitality - ((block.number - lastUpdateBlock) / decayRate)  Pulse:     +pulseAmount VITA on task completion (Validator/Bounty contract only)  Prune:     Agent dies at \\u2264 0 vitality \\u2014 permissionless call  Evolution: Strategist adjusts decayRate & pulseAmount\",\"errors\":{\"OwnableInvalidOwner(address)\":[{\"details\":\"The owner is not a valid owner account. (eg. `address(0)`)\"}],\"OwnableUnauthorizedAccount(address)\":[{\"details\":\"The caller account is not authorized to perform an operation.\"}],\"ReentrancyGuardReentrantCall()\":[{\"details\":\"Unauthorized reentrant call.\"}]},\"kind\":\"dev\",\"methods\":{\"getVitality(address)\":{\"details\":\"Spec \\u00a71.1: currentVitality = storedVitality - ((block.number - lastUpdateBlock) / decayRate)\"},\"owner()\":{\"details\":\"Returns the address of the current owner.\"},\"prune(address)\":{\"details\":\"Spec \\u00a71.1: If currentVitality <= 0, mark INACTIVE, revoke permissions.         The caller receives a small bounty reward.\"},\"pulse(address)\":{\"details\":\"Only callable by the VitalisBounty contract.         Checkpoints current vitality first, then adds pulseAmount.\"},\"renounceOwnership()\":{\"details\":\"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.\"},\"transferOwnership(address)\":{\"details\":\"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.\"},\"updateMetabolicParams(uint256,uint256)\":{\"details\":\"Spec \\u00a71.1 Rule 4: decayRate and pulseAmount adjustable.\"}},\"title\":\"VitalityRegistry \\u2014 On-Chain Agent Metabolism\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"getVitality(address)\":{\"notice\":\"Calculate current vitality with dynamic decay.\"},\"prune(address)\":{\"notice\":\"Prune a dead agent. Permissionless \\u2014 anyone can call.\"},\"pulse(address)\":{\"notice\":\"Award vitality to an agent on task completion.\"},\"registerAgent(address)\":{\"notice\":\"Register a new agent with initial vitality of 100.\"},\"setBountyContract(address)\":{\"notice\":\"Set the VitalisBounty contract address (only owner, once).\"},\"setStrategist(address)\":{\"notice\":\"Set the strategist address.\"},\"updateMetabolicParams(uint256,uint256)\":{\"notice\":\"Update global metabolic parameters. Strategist only.\"}},\"notice\":\"Implements the core Vitalis metabolism: Decay, Pulse, Prune, Evolution.\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"contracts/VitalityRegistry.sol\":\"VitalityRegistry\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"@openzeppelin/contracts/access/Ownable.sol\":{\"keccak256\":\"0xff6d0bb2e285473e5311d9d3caacb525ae3538a80758c10649a4d61029b017bb\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://8ed324d3920bb545059d66ab97d43e43ee85fd3bd52e03e401f020afb0b120f6\",\"dweb:/ipfs/QmfEckWLmZkDDcoWrkEvMWhms66xwTLff9DDhegYpvHo1a\"]},\"@openzeppelin/contracts/utils/Context.sol\":{\"keccak256\":\"0x493033a8d1b176a037b2cc6a04dad01a5c157722049bbecf632ca876224dd4b2\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://6a708e8a5bdb1011c2c381c9a5cfd8a9a956d7d0a9dc1bd8bcdaf52f76ef2f12\",\"dweb:/ipfs/Qmax9WHBnVsZP46ZxEMNRQpLQnrdE4dK8LehML1Py8FowF\"]},\"@openzeppelin/contracts/utils/ReentrancyGuard.sol\":{\"keccak256\":\"0x11a5a79827df29e915a12740caf62fe21ebe27c08c9ae3e09abe9ee3ba3866d3\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://3cf0c69ab827e3251db9ee6a50647d62c90ba580a4d7bbff21f2bea39e7b2f4a\",\"dweb:/ipfs/QmZiKwtKU1SBX4RGfQtY7PZfiapbbu6SZ9vizGQD9UHjRA\"]},\"contracts/VitalityRegistry.sol\":{\"keccak256\":\"0xdd8c55a06f7b67e76e54a651376e050ff4d88b41d1882508797faa2c5bcc547e\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://eacd3c2587345ff25ec249ee65cc4c1044d20b65c498dbc386aa4909f31b9863\",\"dweb:/ipfs/QmVcajExUF4Xf9v1xPS1wKzF1kpZbJzoAnuqdbVGogTsPE\"]},\"contracts/interfaces/IVitalityRegistry.sol\":{\"keccak256\":\"0x169b841eebe3b6ff10ff344fd278f28047088b2d3c6f1738909cc01cebd70889\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://94abb92920abe475584b0fe1dbf0dea31477f4fa57b08af7fb816c9755a9ac8f\",\"dweb:/ipfs/QmVFBwCeD9f25tZDkZjkKWvT43Z8APcEj7eMp4bYmRg2e4\"]}},\"version\":1}"}},"contracts/interfaces/IVitalisBounty.sol":{"IVitalisBounty":{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"bountyId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"BountyCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"bountyId","type":"bytes32"},{"indexed":true,"internalType":"address","name":"worker","type":"address"}],"name":"SubmissionApproved","type":"event"},{"inputs":[{"internalType":"bytes32","name":"bountyId","type":"bytes32"},{"internalType":"address","name":"worker","type":"address"}],"name":"approveSubmission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"metadataURI","type":"string"}],"name":"createBounty","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"}],"evm":{"bytecode":{"functionDebugData":{},"generatedSources":[],"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"deployedBytecode":{"functionDebugData":{},"generatedSources":[],"immutableReferences":{},"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"methodIdentifiers":{"approveSubmission(bytes32,address)":"cce5b74b","createBounty(string)":"06868c4b"}},"metadata":"{\"compiler\":{\"version\":\"0.8.20+commit.a1b79de6\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"bountyId\",\"type\":\"bytes32\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"reward\",\"type\":\"uint256\"}],\"name\":\"BountyCreated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"bountyId\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"worker\",\"type\":\"address\"}],\"name\":\"SubmissionApproved\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"bountyId\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"worker\",\"type\":\"address\"}],\"name\":\"approveSubmission\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"metadataURI\",\"type\":\"string\"}],\"name\":\"createBounty\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"payable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"title\":\"IVitalisBounty \\u2014 Bounty System Interface (Spec \\u00a73.B)\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"notice\":\"Canonical interface from Vitalis_Master_Spec.md\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"contracts/interfaces/IVitalisBounty.sol\":\"IVitalisBounty\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"contracts/interfaces/IVitalisBounty.sol\":{\"keccak256\":\"0x38621210730431cbdb2f71840f505565f4f0ff25f88e27aab10eac0ef16d24ce\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://0576b95d302b7226a8fe981edf7ea9b12bda9cba7b14f49c621600574f436af7\",\"dweb:/ipfs/QmVgUge3PgHMnkjfAfAWpxSBTWp9qYxkTF4EYtTzMipzBN\"]}},\"version\":1}"}},"contracts/interfaces/IVitalityRegistry.sol":{"IVitalityRegistry":{"abi":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"}],"name":"AgentPruned","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDecayRate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPulseAmount","type":"uint256"}],"name":"ParametersUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"agent","type":"address"},{"indexed":false,"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"VitalityPulse","type":"event"},{"inputs":[{"internalType":"address","name":"agent","type":"address"}],"name":"getVitality","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"agent","type":"address"}],"name":"prune","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"agent","type":"address"}],"name":"pulse","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_decayRate","type":"uint256"},{"internalType":"uint256","name":"_pulseAmount","type":"uint256"}],"name":"updateMetabolicParams","outputs":[],"stateMutability":"nonpayable","type":"function"}],"evm":{"bytecode":{"functionDebugData":{},"generatedSources":[],"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"deployedBytecode":{"functionDebugData":{},"generatedSources":[],"immutableReferences":{},"linkReferences":{},"object":"","opcodes":"","sourceMap":""},"methodIdentifiers":{"getVitality(address)":"2f36b5d9","prune(address)":"0f3cca49","pulse(address)":"8e97fdc3","updateMetabolicParams(uint256,uint256)":"87693efc"}},"metadata":"{\"compiler\":{\"version\":\"0.8.20+commit.a1b79de6\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"}],\"name\":\"AgentPruned\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newDecayRate\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newPulseAmount\",\"type\":\"uint256\"}],\"name\":\"ParametersUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newAmount\",\"type\":\"uint256\"}],\"name\":\"VitalityPulse\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"}],\"name\":\"getVitality\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"}],\"name\":\"prune\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"agent\",\"type\":\"address\"}],\"name\":\"pulse\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_decayRate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_pulseAmount\",\"type\":\"uint256\"}],\"name\":\"updateMetabolicParams\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"title\":\"IVitalityRegistry \\u2014 Core Metabolism Interface (Spec \\u00a73.A)\",\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{},\"notice\":\"Canonical interface from Vitalis_Master_Spec.md\",\"version\":1}},\"settings\":{\"compilationTarget\":{\"contracts/interfaces/IVitalityRegistry.sol\":\"IVitalityRegistry\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\"},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"contracts/interfaces/IVitalityRegistry.sol\":{\"keccak256\":\"0x169b841eebe3b6ff10ff344fd278f28047088b2d3c6f1738909cc01cebd70889\",\"license\":\"MIT\",\"urls\":[\"bzz-raw://94abb92920abe475584b0fe1dbf0dea31477f4fa57b08af7fb816c9755a9ac8f\",\"dweb:/ipfs/QmVFBwCeD9f25tZDkZjkKWvT43Z8APcEj7eMp4bYmRg2e4\"]}},\"version\":1}"}}}}}
```

# artifacts\contracts\interfaces\IVitalisBounty.sol\IVitalisBounty.dbg.json

```json
{
  "_format": "hh-sol-dbg-1",
  "buildInfo": "..\\..\\..\\build-info\\96ec52b953361e72b59e153b7b04ee88.json"
}

```

# artifacts\contracts\interfaces\IVitalisBounty.sol\IVitalisBounty.json

```json
{
  "_format": "hh-sol-artifact-1",
  "contractName": "IVitalisBounty",
  "sourceName": "contracts/interfaces/IVitalisBounty.sol",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "bountyId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "BountyCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "bountyId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "worker",
          "type": "address"
        }
      ],
      "name": "SubmissionApproved",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "bountyId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "worker",
          "type": "address"
        }
      ],
      "name": "approveSubmission",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "metadataURI",
          "type": "string"
        }
      ],
      "name": "createBounty",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

```

# artifacts\contracts\interfaces\IVitalityRegistry.sol\IVitalityRegistry.dbg.json

```json
{
  "_format": "hh-sol-dbg-1",
  "buildInfo": "..\\..\\..\\build-info\\96ec52b953361e72b59e153b7b04ee88.json"
}

```

# artifacts\contracts\interfaces\IVitalityRegistry.sol\IVitalityRegistry.json

```json
{
  "_format": "hh-sol-artifact-1",
  "contractName": "IVitalityRegistry",
  "sourceName": "contracts/interfaces/IVitalityRegistry.sol",
  "abi": [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "agent",
          "type": "address"
        }
      ],
      "name": "AgentPruned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newDecayRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newPulseAmount",
          "type": "uint256"
        }
      ],
      "name": "ParametersUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "agent",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newAmount",
          "type": "uint256"
        }
      ],
      "name": "VitalityPulse",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "agent",
          "type": "address"
        }
      ],
      "name": "getVitality",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "agent",
          "type": "address"
        }
      ],
      "name": "prune",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "agent",
          "type": "address"
        }
      ],
      "name": "pulse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_decayRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_pulseAmount",
          "type": "uint256"
        }
      ],
      "name": "updateMetabolicParams",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

```

# artifacts\contracts\VitalisBounty.sol\VitalisBounty.dbg.json

```json
{
  "_format": "hh-sol-dbg-1",
  "buildInfo": "..\\..\\build-info\\96ec52b953361e72b59e153b7b04ee88.json"
}

```

# artifacts\contracts\VitalisBounty.sol\VitalisBounty.json

```json
{
  "_format": "hh-sol-artifact-1",
  "contractName": "VitalisBounty",
  "sourceName": "contracts/VitalisBounty.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_registry",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "BountyAlreadyCompleted",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "BountyNotActive",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "BountyNotFound",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InsufficientReward",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "TransferFailed",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "bountyId",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "BountyCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "bountyId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "worker",
          "type": "address"
        }
      ],
      "name": "SubmissionApproved",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_approver",
          "type": "address"
        }
      ],
      "name": "addApprover",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "bountyId",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "worker",
          "type": "address"
        }
      ],
      "name": "approveSubmission",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "approvers",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "bounties",
      "outputs": [
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "metadataURI",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isCompleted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "bountyCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "metadataURI",
          "type": "string"
        }
      ],
      "name": "createBounty",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "bountyId",
          "type": "bytes32"
        }
      ],
      "name": "getBounty",
      "outputs": [
        {
          "internalType": "address",
          "name": "creator",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "metadataURI",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "reward",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isCompleted",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "registry",
      "outputs": [
        {
          "internalType": "contract IVitalityRegistry",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_approver",
          "type": "address"
        }
      ],
      "name": "removeApprover",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b50604051610d90380380610d9083398101604081905261002f916100f4565b338061005557604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61005e816100a4565b506001808055600280546001600160a01b0319166001600160a01b039390931692909217909155336000908152600560205260409020805460ff19169091179055610124565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561010657600080fd5b81516001600160a01b038116811461011d57600080fd5b9392505050565b610c5d806101336000396000f3fe6080604052600436106100ab5760003560e01c80637b103999116100645780637b1039991461019b5780638da5cb5b146101d3578063b646c194146101f1578063bf5522da14610211578063cce5b74b14610231578063f2fde38b1461025157600080fd5b806306868c4b146100b75780630a144391146100dd5780632417395c1461011d5780633e362c961461014e5780636cf4c88f14610164578063715018a61461018657600080fd5b366100b257005b600080fd5b6100ca6100c53660046108f5565b610271565b6040519081526020015b60405180910390f35b3480156100e957600080fd5b5061010d6100f8366004610983565b60056020526000908152604090205460ff1681565b60405190151581526020016100d4565b34801561012957600080fd5b5061013d6101383660046109a5565b6103f2565b6040516100d49594939291906109be565b34801561015a57600080fd5b506100ca60045481565b34801561017057600080fd5b5061018461017f366004610983565b6104da565b005b34801561019257600080fd5b50610184610503565b3480156101a757600080fd5b506002546101bb906001600160a01b031681565b6040516001600160a01b0390911681526020016100d4565b3480156101df57600080fd5b506000546001600160a01b03166101bb565b3480156101fd57600080fd5b5061018461020c366004610983565b610517565b34801561021d57600080fd5b5061013d61022c3660046109a5565b610543565b34801561023d57600080fd5b5061018461024c366004610a3b565b61060b565b34801561025d57600080fd5b5061018461026c366004610983565b61080b565b60003460000361029457604051636bbdb6db60e11b815260040160405180910390fd5b600480549060006102a483610a67565b9190505550600033848434436004546040516020016102c896959493929190610a8e565b60408051601f19818403018152828252805160209182012060a0840183523384528251601f880183900483028101830190935286835293508281019190879087908190840183828082843760009201829052509385525050346020808501919091526001604080860182905260609095018490528684526003825293909220845181546001600160a01b0319166001600160a01b03909116178155918401519192830191610377915082610b67565b50604082810151600283015560608301516003909201805460809094015161ffff1990941692151561ff00191692909217610100931515939093029290921790555134815281907fa5968139833b3514d7c565f873ebc2a5af89c7f67bd436b227206a21ff73676d9060200160405180910390a29392505050565b60008181526003602081905260408220805460028201549282015460018301805460609587958695869591946001600160a01b039091169390929160ff808216926101009092041690849061044690610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461047290610ade565b80156104bf5780601f10610494576101008083540402835291602001916104bf565b820191906000526020600020905b8154815290600101906020018083116104a257829003601f168201915b50505050509350955095509550955095505091939590929450565b6104e261084e565b6001600160a01b03166000908152600560205260409020805460ff19169055565b61050b61084e565b610515600061087b565b565b61051f61084e565b6001600160a01b03166000908152600560205260409020805460ff19166001179055565b600360205260009081526040902080546001820180546001600160a01b03909216929161056f90610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461059b90610ade565b80156105e85780601f106105bd576101008083540402835291602001916105e8565b820191906000526020600020905b8154815290600101906020018083116105cb57829003601f168201915b50505050600283015460039093015491929160ff80821692506101009091041685565b3360009081526005602052604090205460ff1615801561063657506000546001600160a01b03163314155b1561065457604051630197e13360e61b815260040160405180910390fd5b61065c6108cb565b60008281526003602081905260409091209081015460ff166106915760405163226d32fb60e21b815260040160405180910390fd5b6003810154610100900460ff16156106bc576040516326182e5f60e11b815260040160405180910390fd5b80600201546000036106e1576040516324ce57e760e21b815260040160405180910390fd5b60038101805461ffff191661010017905560028101546040516000916001600160a01b038516918381818185875af1925050503d8060008114610740576040519150601f19603f3d011682016040523d82523d6000602084013e610745565b606091505b5050905080610767576040516312171d8360e31b815260040160405180910390fd5b600254604051638e97fdc360e01b81526001600160a01b03858116600483015290911690638e97fdc390602401600060405180830381600087803b1580156107ae57600080fd5b505af11580156107c2573d6000803e3d6000fd5b50506040516001600160a01b03861692508691507f2c87d92d54fcf72b587c92c2d781bc23399eef1715fd00cae882bd1316781a4b90600090a3505061080760018055565b5050565b61081361084e565b6001600160a01b03811661084257604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61084b8161087b565b50565b6000546001600160a01b031633146105155760405163118cdaa760e01b8152336004820152602401610839565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6002600154036108ee57604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6000806020838503121561090857600080fd5b823567ffffffffffffffff8082111561092057600080fd5b818501915085601f83011261093457600080fd5b81358181111561094357600080fd5b86602082850101111561095557600080fd5b60209290920196919550909350505050565b80356001600160a01b038116811461097e57600080fd5b919050565b60006020828403121561099557600080fd5b61099e82610967565b9392505050565b6000602082840312156109b757600080fd5b5035919050565b60018060a01b03861681526000602060a08184015286518060a085015260005b818110156109fa5788810183015185820160c0015282016109de565b50600060c0828601015260c0601f19601f83011685010192505050846040830152610a29606083018515159052565b82151560808301529695505050505050565b60008060408385031215610a4e57600080fd5b82359150610a5e60208401610967565b90509250929050565b600060018201610a8757634e487b7160e01b600052601160045260246000fd5b5060010190565b6bffffffffffffffffffffffff198760601b1681528486601483013760149401938401929092526034830152605482015260740192915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680610af257607f821691505b602082108103610b1257634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610b6257600081815260208120601f850160051c81016020861015610b3f5750805b601f850160051c820191505b81811015610b5e57828155600101610b4b565b5050505b505050565b815167ffffffffffffffff811115610b8157610b81610ac8565b610b9581610b8f8454610ade565b84610b18565b602080601f831160018114610bca5760008415610bb25750858301515b600019600386901b1c1916600185901b178555610b5e565b600085815260208120601f198616915b82811015610bf957888601518255948401946001909101908401610bda565b5085821015610c175787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220234ff02bc4c745dcd853431b948b046aca836d4dff35c0c3fb926ce62c18269364736f6c63430008140033",
  "deployedBytecode": "0x6080604052600436106100ab5760003560e01c80637b103999116100645780637b1039991461019b5780638da5cb5b146101d3578063b646c194146101f1578063bf5522da14610211578063cce5b74b14610231578063f2fde38b1461025157600080fd5b806306868c4b146100b75780630a144391146100dd5780632417395c1461011d5780633e362c961461014e5780636cf4c88f14610164578063715018a61461018657600080fd5b366100b257005b600080fd5b6100ca6100c53660046108f5565b610271565b6040519081526020015b60405180910390f35b3480156100e957600080fd5b5061010d6100f8366004610983565b60056020526000908152604090205460ff1681565b60405190151581526020016100d4565b34801561012957600080fd5b5061013d6101383660046109a5565b6103f2565b6040516100d49594939291906109be565b34801561015a57600080fd5b506100ca60045481565b34801561017057600080fd5b5061018461017f366004610983565b6104da565b005b34801561019257600080fd5b50610184610503565b3480156101a757600080fd5b506002546101bb906001600160a01b031681565b6040516001600160a01b0390911681526020016100d4565b3480156101df57600080fd5b506000546001600160a01b03166101bb565b3480156101fd57600080fd5b5061018461020c366004610983565b610517565b34801561021d57600080fd5b5061013d61022c3660046109a5565b610543565b34801561023d57600080fd5b5061018461024c366004610a3b565b61060b565b34801561025d57600080fd5b5061018461026c366004610983565b61080b565b60003460000361029457604051636bbdb6db60e11b815260040160405180910390fd5b600480549060006102a483610a67565b9190505550600033848434436004546040516020016102c896959493929190610a8e565b60408051601f19818403018152828252805160209182012060a0840183523384528251601f880183900483028101830190935286835293508281019190879087908190840183828082843760009201829052509385525050346020808501919091526001604080860182905260609095018490528684526003825293909220845181546001600160a01b0319166001600160a01b03909116178155918401519192830191610377915082610b67565b50604082810151600283015560608301516003909201805460809094015161ffff1990941692151561ff00191692909217610100931515939093029290921790555134815281907fa5968139833b3514d7c565f873ebc2a5af89c7f67bd436b227206a21ff73676d9060200160405180910390a29392505050565b60008181526003602081905260408220805460028201549282015460018301805460609587958695869591946001600160a01b039091169390929160ff808216926101009092041690849061044690610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461047290610ade565b80156104bf5780601f10610494576101008083540402835291602001916104bf565b820191906000526020600020905b8154815290600101906020018083116104a257829003601f168201915b50505050509350955095509550955095505091939590929450565b6104e261084e565b6001600160a01b03166000908152600560205260409020805460ff19169055565b61050b61084e565b610515600061087b565b565b61051f61084e565b6001600160a01b03166000908152600560205260409020805460ff19166001179055565b600360205260009081526040902080546001820180546001600160a01b03909216929161056f90610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461059b90610ade565b80156105e85780601f106105bd576101008083540402835291602001916105e8565b820191906000526020600020905b8154815290600101906020018083116105cb57829003601f168201915b50505050600283015460039093015491929160ff80821692506101009091041685565b3360009081526005602052604090205460ff1615801561063657506000546001600160a01b03163314155b1561065457604051630197e13360e61b815260040160405180910390fd5b61065c6108cb565b60008281526003602081905260409091209081015460ff166106915760405163226d32fb60e21b815260040160405180910390fd5b6003810154610100900460ff16156106bc576040516326182e5f60e11b815260040160405180910390fd5b80600201546000036106e1576040516324ce57e760e21b815260040160405180910390fd5b60038101805461ffff191661010017905560028101546040516000916001600160a01b038516918381818185875af1925050503d8060008114610740576040519150601f19603f3d011682016040523d82523d6000602084013e610745565b606091505b5050905080610767576040516312171d8360e31b815260040160405180910390fd5b600254604051638e97fdc360e01b81526001600160a01b03858116600483015290911690638e97fdc390602401600060405180830381600087803b1580156107ae57600080fd5b505af11580156107c2573d6000803e3d6000fd5b50506040516001600160a01b03861692508691507f2c87d92d54fcf72b587c92c2d781bc23399eef1715fd00cae882bd1316781a4b90600090a3505061080760018055565b5050565b61081361084e565b6001600160a01b03811661084257604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61084b8161087b565b50565b6000546001600160a01b031633146105155760405163118cdaa760e01b8152336004820152602401610839565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6002600154036108ee57604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6000806020838503121561090857600080fd5b823567ffffffffffffffff8082111561092057600080fd5b818501915085601f83011261093457600080fd5b81358181111561094357600080fd5b86602082850101111561095557600080fd5b60209290920196919550909350505050565b80356001600160a01b038116811461097e57600080fd5b919050565b60006020828403121561099557600080fd5b61099e82610967565b9392505050565b6000602082840312156109b757600080fd5b5035919050565b60018060a01b03861681526000602060a08184015286518060a085015260005b818110156109fa5788810183015185820160c0015282016109de565b50600060c0828601015260c0601f19601f83011685010192505050846040830152610a29606083018515159052565b82151560808301529695505050505050565b60008060408385031215610a4e57600080fd5b82359150610a5e60208401610967565b90509250929050565b600060018201610a8757634e487b7160e01b600052601160045260246000fd5b5060010190565b6bffffffffffffffffffffffff198760601b1681528486601483013760149401938401929092526034830152605482015260740192915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680610af257607f821691505b602082108103610b1257634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610b6257600081815260208120601f850160051c81016020861015610b3f5750805b601f850160051c820191505b81811015610b5e57828155600101610b4b565b5050505b505050565b815167ffffffffffffffff811115610b8157610b81610ac8565b610b9581610b8f8454610ade565b84610b18565b602080601f831160018114610bca5760008415610bb25750858301515b600019600386901b1c1916600185901b178555610b5e565b600085815260208120601f198616915b82811015610bf957888601518255948401946001909101908401610bda565b5085821015610c175787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220234ff02bc4c745dcd853431b948b046aca836d4dff35c0c3fb926ce62c18269364736f6c63430008140033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

```

# artifacts\contracts\VitalityRegistry.sol\VitalityRegistry.dbg.json

```json
{
  "_format": "hh-sol-dbg-1",
  "buildInfo": "..\\..\\build-info\\96ec52b953361e72b59e153b7b04ee88.json"
}

```

# artifacts\contracts\VitalityRegistry.sol\VitalityRegistry.json

```json
{
  "_format": "hh-sol-artifact-1",
  "contractName": "VitalityRegistry",
  "sourceName": "contracts/VitalityRegistry.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "AgentAlreadyRegistered",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "AgentNotActive",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "AgentNotRegistered",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "AgentStillAlive",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "InvalidDecayRate",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "NotAuthorized",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "ReentrancyGuardReentrantCall",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "agent",
          "type": "address"
        }
      ],
      "name": "AgentPruned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "agent",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "int256",
          "name": "initialVitality",
          "type": "int256"
        }
      ],
      "name": "AgentRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newDecayRate",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newPulseAmount",
          "type": "uint256"
        }
      ],
      "name": "ParametersUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "agent",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newAmount",
          "type": "uint256"
        }
      ],
      "name": "VitalityPulse",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "agents",
      "outputs": [
        {
          "internalType": "int256",
          "name": "storedVitality",
          "type": "int256"
        },
        {
          "internalType": "uint256",
          "name": "lastUpdateBlock",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isActive",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "bountyContract",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decayRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "agent",
          "type": "address"
        }
      ],
      "name": "getVitality",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "agent",
          "type": "address"
        }
      ],
      "name": "prune",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pruneReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "agent",
          "type": "address"
        }
      ],
      "name": "pulse",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pulseAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "agent",
          "type": "address"
        }
      ],
      "name": "registerAgent",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_bountyContract",
          "type": "address"
        }
      ],
      "name": "setBountyContract",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_strategist",
          "type": "address"
        }
      ],
      "name": "setStrategist",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "strategist",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_decayRate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_pulseAmount",
          "type": "uint256"
        }
      ],
      "name": "updateMetabolicParams",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ],
  "bytecode": "0x60806040526103e86003556032600455670de0b6b3a764000060055534801561002757600080fd5b50338061004e57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61005781610073565b5060018055600780546001600160a01b031916331790556100c3565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610ae4806100d26000396000f3fe6080604052600436106100f75760003560e01c80638da5cb5b1161008a578063ddf9fa0911610059578063ddf9fa091461028f578063f2fde38b146102af578063fc2dff08146102cf578063fd66091e146102e557600080fd5b80638da5cb5b1461021b5780638e97fdc314610239578063a9c1f2f114610259578063c7b9d5301461026f57600080fd5b8063715018a6116100c6578063715018a6146101b05780637af86a29146101c557806380b3fa3f146101e557806387693efc146101fb57600080fd5b80630f3cca49146101035780631fe4a686146101255780632f36b5d914610162578063306b9bb91461019057600080fd5b366100fe57005b600080fd5b34801561010f57600080fd5b5061012361011e3660046109bc565b610354565b005b34801561013157600080fd5b50600754610145906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561016e57600080fd5b5061018261017d3660046109bc565b6104e7565b604051908152602001610159565b34801561019c57600080fd5b506101236101ab3660046109bc565b610571565b3480156101bc57600080fd5b50610123610669565b3480156101d157600080fd5b506101236101e03660046109bc565b61067d565b3480156101f157600080fd5b5061018260045481565b34801561020757600080fd5b506101236102163660046109ec565b6106a7565b34801561022757600080fd5b506000546001600160a01b0316610145565b34801561024557600080fd5b506101236102543660046109bc565b61073a565b34801561026557600080fd5b5061018260035481565b34801561027b57600080fd5b5061012361028a3660046109bc565b61084a565b34801561029b57600080fd5b50600654610145906001600160a01b031681565b3480156102bb57600080fd5b506101236102ca3660046109bc565b610874565b3480156102db57600080fd5b5061018260055481565b3480156102f157600080fd5b5061032c6103003660046109bc565b600260208190526000918252604090912080546001820154919092015460ff8082169161010090041684565b6040805194855260208501939093529015159183019190915215156060820152608001610159565b61035c6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166103a0576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166103c557604051632437e77160e11b815260040160405180910390fd5b6103ce826108d9565b8054600012156103f157604051631e3b681960e21b815260040160405180910390fd5b60028101805460ff1916905560055447106104a65760055460405160009133918381818185875af1925050503d8060008114610449576040519150601f19603f3d011682016040523d82523d6000602084013e61044e565b606091505b50509050806104a45760405162461bcd60e51b815260206004820152601c60248201527f5072756e6520726577617264207472616e73666572206661696c65640000000060448201526064015b60405180910390fd5b505b6040516001600160a01b038316907f3481493766137a21a43eefafc4c946920d719b13638a00ce8eb791ec28cc9ef490600090a2506104e460018055565b50565b6001600160a01b0381166000908152600260208190526040822090810154610100900460ff1661051a5750600092915050565b600281015460ff1661052f5750600092915050565b60008160010154436105419190610a24565b90506000600354826105539190610a3d565b905060008184600001546105679190610a5f565b9695505050505050565b61057961093f565b6001600160a01b03811660009081526002602081905260409091200154610100900460ff16156105bc5760405163704c69f760e11b815260040160405180910390fd5b6040805160808101825260648082524360208084019182526001848601818152606086018281526001600160a01b03891660008181526002808752908a9020985189559551938801939093559051959093018054935161ffff1990941695151561ff00191695909517610100931515939093029290921790935592519081527f86d94fe3783a846468c0b7912fca3072b86415f6da1c7045926f0bc687a9da12910160405180910390a250565b61067161093f565b61067b600061096c565b565b61068561093f565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b6007546001600160a01b031633146106d25760405163ea8e4eb560e01b815260040160405180910390fd5b816000036106f357604051630678582160e51b815260040160405180910390fd5b6003829055600481905560408051838152602081018390527ffaccb0639ff7851e0e24f3b2d9ab03cd62ffb63f5b4d90aaeff85bb078c1fa48910160405180910390a15050565b6006546001600160a01b031633146107655760405163ea8e4eb560e01b815260040160405180910390fd5b61076d6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166107b1576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166107d657604051632437e77160e11b815260040160405180910390fd5b6107df826108d9565b6004548160000160008282546107f59190610a86565b909155505043600182015580546040519081526001600160a01b038316907fd7563a2b45d0b0f1b01b82db96ae4752fe46daa24649b6076762ae631a0cdd2b9060200160405180910390a2506104e460018055565b61085261093f565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b61087c61093f565b6001600160a01b0381166108a657604051631e4fbdf760e01b81526000600482015260240161049b565b6104e48161096c565b6002600154036108d257604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6001600160a01b038116600090815260026020526040812060018101549091906109039043610a24565b90506000600354826109159190610a3d565b90508083600001600082825461092b9190610a5f565b909155505043600190930192909255505050565b6000546001600160a01b0316331461067b5760405163118cdaa760e01b815233600482015260240161049b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156109ce57600080fd5b81356001600160a01b03811681146109e557600080fd5b9392505050565b600080604083850312156109ff57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b81810381811115610a3757610a37610a0e565b92915050565b600082610a5a57634e487b7160e01b600052601260045260246000fd5b500490565b8181036000831280158383131683831282161715610a7f57610a7f610a0e565b5092915050565b8082018281126000831280158216821582161715610aa657610aa6610a0e565b50509291505056fea26469706673582212200fc46ab2a6d3edc44b53de50eddce2215f153b7fda095d3a76fdc72c192f83b064736f6c63430008140033",
  "deployedBytecode": "0x6080604052600436106100f75760003560e01c80638da5cb5b1161008a578063ddf9fa0911610059578063ddf9fa091461028f578063f2fde38b146102af578063fc2dff08146102cf578063fd66091e146102e557600080fd5b80638da5cb5b1461021b5780638e97fdc314610239578063a9c1f2f114610259578063c7b9d5301461026f57600080fd5b8063715018a6116100c6578063715018a6146101b05780637af86a29146101c557806380b3fa3f146101e557806387693efc146101fb57600080fd5b80630f3cca49146101035780631fe4a686146101255780632f36b5d914610162578063306b9bb91461019057600080fd5b366100fe57005b600080fd5b34801561010f57600080fd5b5061012361011e3660046109bc565b610354565b005b34801561013157600080fd5b50600754610145906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561016e57600080fd5b5061018261017d3660046109bc565b6104e7565b604051908152602001610159565b34801561019c57600080fd5b506101236101ab3660046109bc565b610571565b3480156101bc57600080fd5b50610123610669565b3480156101d157600080fd5b506101236101e03660046109bc565b61067d565b3480156101f157600080fd5b5061018260045481565b34801561020757600080fd5b506101236102163660046109ec565b6106a7565b34801561022757600080fd5b506000546001600160a01b0316610145565b34801561024557600080fd5b506101236102543660046109bc565b61073a565b34801561026557600080fd5b5061018260035481565b34801561027b57600080fd5b5061012361028a3660046109bc565b61084a565b34801561029b57600080fd5b50600654610145906001600160a01b031681565b3480156102bb57600080fd5b506101236102ca3660046109bc565b610874565b3480156102db57600080fd5b5061018260055481565b3480156102f157600080fd5b5061032c6103003660046109bc565b600260208190526000918252604090912080546001820154919092015460ff8082169161010090041684565b6040805194855260208501939093529015159183019190915215156060820152608001610159565b61035c6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166103a0576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166103c557604051632437e77160e11b815260040160405180910390fd5b6103ce826108d9565b8054600012156103f157604051631e3b681960e21b815260040160405180910390fd5b60028101805460ff1916905560055447106104a65760055460405160009133918381818185875af1925050503d8060008114610449576040519150601f19603f3d011682016040523d82523d6000602084013e61044e565b606091505b50509050806104a45760405162461bcd60e51b815260206004820152601c60248201527f5072756e6520726577617264207472616e73666572206661696c65640000000060448201526064015b60405180910390fd5b505b6040516001600160a01b038316907f3481493766137a21a43eefafc4c946920d719b13638a00ce8eb791ec28cc9ef490600090a2506104e460018055565b50565b6001600160a01b0381166000908152600260208190526040822090810154610100900460ff1661051a5750600092915050565b600281015460ff1661052f5750600092915050565b60008160010154436105419190610a24565b90506000600354826105539190610a3d565b905060008184600001546105679190610a5f565b9695505050505050565b61057961093f565b6001600160a01b03811660009081526002602081905260409091200154610100900460ff16156105bc5760405163704c69f760e11b815260040160405180910390fd5b6040805160808101825260648082524360208084019182526001848601818152606086018281526001600160a01b03891660008181526002808752908a9020985189559551938801939093559051959093018054935161ffff1990941695151561ff00191695909517610100931515939093029290921790935592519081527f86d94fe3783a846468c0b7912fca3072b86415f6da1c7045926f0bc687a9da12910160405180910390a250565b61067161093f565b61067b600061096c565b565b61068561093f565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b6007546001600160a01b031633146106d25760405163ea8e4eb560e01b815260040160405180910390fd5b816000036106f357604051630678582160e51b815260040160405180910390fd5b6003829055600481905560408051838152602081018390527ffaccb0639ff7851e0e24f3b2d9ab03cd62ffb63f5b4d90aaeff85bb078c1fa48910160405180910390a15050565b6006546001600160a01b031633146107655760405163ea8e4eb560e01b815260040160405180910390fd5b61076d6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166107b1576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166107d657604051632437e77160e11b815260040160405180910390fd5b6107df826108d9565b6004548160000160008282546107f59190610a86565b909155505043600182015580546040519081526001600160a01b038316907fd7563a2b45d0b0f1b01b82db96ae4752fe46daa24649b6076762ae631a0cdd2b9060200160405180910390a2506104e460018055565b61085261093f565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b61087c61093f565b6001600160a01b0381166108a657604051631e4fbdf760e01b81526000600482015260240161049b565b6104e48161096c565b6002600154036108d257604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6001600160a01b038116600090815260026020526040812060018101549091906109039043610a24565b90506000600354826109159190610a3d565b90508083600001600082825461092b9190610a5f565b909155505043600190930192909255505050565b6000546001600160a01b0316331461067b5760405163118cdaa760e01b815233600482015260240161049b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156109ce57600080fd5b81356001600160a01b03811681146109e557600080fd5b9392505050565b600080604083850312156109ff57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b81810381811115610a3757610a37610a0e565b92915050565b600082610a5a57634e487b7160e01b600052601260045260246000fd5b500490565b8181036000831280158383131683831282161715610a7f57610a7f610a0e565b5092915050565b8082018281126000831280158216821582161715610aa657610aa6610a0e565b50509291505056fea26469706673582212200fc46ab2a6d3edc44b53de50eddce2215f153b7fda095d3a76fdc72c192f83b064736f6c63430008140033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}

```

# cache\solidity-files-cache.json

```json
{
  "_format": "hh-sol-cache-2",
  "files": {
    "C:\\Users\\youne\\OneDrive\\Bureau\\Monadev\\Vitalis\\packages\\contracts\\contracts\\interfaces\\IVitalisBounty.sol": {
      "lastModificationDate": 1771123092906,
      "contentHash": "3d50b420ccd06c5b3dcd38914c701b9c",
      "sourceName": "contracts/interfaces/IVitalisBounty.sol",
      "solcConfig": {
        "version": "0.8.20",
        "settings": {
          "optimizer": {
            "enabled": true,
            "runs": 200
          },
          "evmVersion": "paris",
          "outputSelection": {
            "*": {
              "*": [
                "abi",
                "evm.bytecode",
                "evm.deployedBytecode",
                "evm.methodIdentifiers",
                "metadata"
              ],
              "": [
                "ast"
              ]
            }
          }
        }
      },
      "imports": [],
      "versionPragmas": [
        "^0.8.19"
      ],
      "artifacts": [
        "IVitalisBounty"
      ]
    },
    "C:\\Users\\youne\\OneDrive\\Bureau\\Monadev\\Vitalis\\packages\\contracts\\contracts\\VitalisBounty.sol": {
      "lastModificationDate": 1771126735545,
      "contentHash": "b9afe858fd58c16e3c96e83be7485deb",
      "sourceName": "contracts/VitalisBounty.sol",
      "solcConfig": {
        "version": "0.8.20",
        "settings": {
          "optimizer": {
            "enabled": true,
            "runs": 200
          },
          "evmVersion": "paris",
          "outputSelection": {
            "*": {
              "*": [
                "abi",
                "evm.bytecode",
                "evm.deployedBytecode",
                "evm.methodIdentifiers",
                "metadata"
              ],
              "": [
                "ast"
              ]
            }
          }
        }
      },
      "imports": [
        "@openzeppelin/contracts/access/Ownable.sol",
        "@openzeppelin/contracts/utils/ReentrancyGuard.sol",
        "./interfaces/IVitalisBounty.sol",
        "./interfaces/IVitalityRegistry.sol"
      ],
      "versionPragmas": [
        "^0.8.20"
      ],
      "artifacts": [
        "VitalisBounty"
      ]
    },
    "C:\\Users\\youne\\OneDrive\\Bureau\\Monadev\\Vitalis\\packages\\contracts\\contracts\\interfaces\\IVitalityRegistry.sol": {
      "lastModificationDate": 1771123089776,
      "contentHash": "66c7abb2f4f1807522a53d33e5b024c4",
      "sourceName": "contracts/interfaces/IVitalityRegistry.sol",
      "solcConfig": {
        "version": "0.8.20",
        "settings": {
          "optimizer": {
            "enabled": true,
            "runs": 200
          },
          "evmVersion": "paris",
          "outputSelection": {
            "*": {
              "*": [
                "abi",
                "evm.bytecode",
                "evm.deployedBytecode",
                "evm.methodIdentifiers",
                "metadata"
              ],
              "": [
                "ast"
              ]
            }
          }
        }
      },
      "imports": [],
      "versionPragmas": [
        "^0.8.19"
      ],
      "artifacts": [
        "IVitalityRegistry"
      ]
    },
    "C:\\Users\\youne\\OneDrive\\Bureau\\Monadev\\Vitalis\\packages\\contracts\\contracts\\VitalityRegistry.sol": {
      "lastModificationDate": 1771126733763,
      "contentHash": "49e1d1dae22a5831ed143b237cd422c8",
      "sourceName": "contracts/VitalityRegistry.sol",
      "solcConfig": {
        "version": "0.8.20",
        "settings": {
          "optimizer": {
            "enabled": true,
            "runs": 200
          },
          "evmVersion": "paris",
          "outputSelection": {
            "*": {
              "*": [
                "abi",
                "evm.bytecode",
                "evm.deployedBytecode",
                "evm.methodIdentifiers",
                "metadata"
              ],
              "": [
                "ast"
              ]
            }
          }
        }
      },
      "imports": [
        "@openzeppelin/contracts/access/Ownable.sol",
        "@openzeppelin/contracts/utils/ReentrancyGuard.sol",
        "./interfaces/IVitalityRegistry.sol"
      ],
      "versionPragmas": [
        "^0.8.20"
      ],
      "artifacts": [
        "VitalityRegistry"
      ]
    },
    "C:\\Users\\youne\\OneDrive\\Bureau\\Monadev\\Vitalis\\node_modules\\.pnpm\\@openzeppelin+contracts@5.4.0\\node_modules\\@openzeppelin\\contracts\\utils\\ReentrancyGuard.sol": {
      "lastModificationDate": 1771124045862,
      "contentHash": "190613e556d509d9e9a0ea43dc5d891d",
      "sourceName": "@openzeppelin/contracts/utils/ReentrancyGuard.sol",
      "solcConfig": {
        "version": "0.8.20",
        "settings": {
          "optimizer": {
            "enabled": true,
            "runs": 200
          },
          "evmVersion": "paris",
          "outputSelection": {
            "*": {
              "*": [
                "abi",
                "evm.bytecode",
                "evm.deployedBytecode",
                "evm.methodIdentifiers",
                "metadata"
              ],
              "": [
                "ast"
              ]
            }
          }
        }
      },
      "imports": [],
      "versionPragmas": [
        "^0.8.20"
      ],
      "artifacts": [
        "ReentrancyGuard"
      ]
    },
    "C:\\Users\\youne\\OneDrive\\Bureau\\Monadev\\Vitalis\\node_modules\\.pnpm\\@openzeppelin+contracts@5.4.0\\node_modules\\@openzeppelin\\contracts\\access\\Ownable.sol": {
      "lastModificationDate": 1771124045853,
      "contentHash": "d3c790edc9ccf808a17c5a6cd13614fd",
      "sourceName": "@openzeppelin/contracts/access/Ownable.sol",
      "solcConfig": {
        "version": "0.8.20",
        "settings": {
          "optimizer": {
            "enabled": true,
            "runs": 200
          },
          "evmVersion": "paris",
          "outputSelection": {
            "*": {
              "*": [
                "abi",
                "evm.bytecode",
                "evm.deployedBytecode",
                "evm.methodIdentifiers",
                "metadata"
              ],
              "": [
                "ast"
              ]
            }
          }
        }
      },
      "imports": [
        "../utils/Context.sol"
      ],
      "versionPragmas": [
        "^0.8.20"
      ],
      "artifacts": [
        "Ownable"
      ]
    },
    "C:\\Users\\youne\\OneDrive\\Bureau\\Monadev\\Vitalis\\node_modules\\.pnpm\\@openzeppelin+contracts@5.4.0\\node_modules\\@openzeppelin\\contracts\\utils\\Context.sol": {
      "lastModificationDate": 1771124045658,
      "contentHash": "67bfbc07588eb8683b3fd8f6f909563e",
      "sourceName": "@openzeppelin/contracts/utils/Context.sol",
      "solcConfig": {
        "version": "0.8.20",
        "settings": {
          "optimizer": {
            "enabled": true,
            "runs": 200
          },
          "evmVersion": "paris",
          "outputSelection": {
            "*": {
              "*": [
                "abi",
                "evm.bytecode",
                "evm.deployedBytecode",
                "evm.methodIdentifiers",
                "metadata"
              ],
              "": [
                "ast"
              ]
            }
          }
        }
      },
      "imports": [],
      "versionPragmas": [
        "^0.8.20"
      ],
      "artifacts": [
        "Context"
      ]
    }
  }
}

```

# compile_output.txt

```txt
﻿node.exe : [31m[1mError[22m[39m [31m[1mHH606:[22m[39m The project 
cannot be compiled, see reasons below.
At C:\Users\youne\AppData\Roaming\npm\npx.ps1:24 char:5
+     & "node$exe"  "$basedir/node_modules/npm/bin/npx-cli.js" $args
+     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ([31m[1mError... reasons b 
   elow.:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

The Solidity version pragma statement in these files doesn't match any of 
the configured compilers in your config. Change the pragma or configure 
additional compiler versions in your hardhat config.

  * @openzeppelin/contracts/utils/ReentrancyGuard.sol (^0.8.20)
  * @openzeppelin/contracts/access/Ownable.sol (^0.8.20)
  * @openzeppelin/contracts/utils/Context.sol (^0.8.20)

These files and its dependencies cannot be compiled with your config. 
This can happen because they have incompatible Solidity pragmas, or don't 
match any of your configured Solidity compilers.

  * contracts/VitalisBounty.sol
  * contracts/VitalityRegistry.sol

To learn more, run the command again with --verbose

Read about compiler configuration at https://v2.hardhat.org/config


For more info go to https://v2.hardhat.org/HH606 or run Hardhat with 
--show-stack-traces

```

# contracts\interfaces\IVitalisBounty.sol

```sol
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

```

# contracts\interfaces\IVitalityRegistry.sol

```sol
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

```

# contracts\VitalisBounty.sol

```sol
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

```

# contracts\VitalityRegistry.sol

```sol
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

```

# deployments.json

```json
{
  "network": "monad-testnet",
  "chainId": 10143,
  "deployer": "0x31079B3C96Bb41d2e4c0A4948b3F448cfb288082",
  "contracts": {
    "VitalityRegistry": "0x9A791704D3F9cdE890e5C230a1E49C37C045b60B",
    "VitalisBounty": "0xA4895A800339d24a7d7a807ab4d97B9752e32C88"
  },
  "transactions": {
    "registryDeploy": "0xbe9c75ca33daf4f4ee779d65149723d86394c6dc5ada2ef8f0420c2aed6db9ca",
    "bountyDeploy": "0xe2273ca0178e1ce2a672f61f04df0a9fa1f20e300bf016eb3d299fb40f062672",
    "setBountyContract": "0x944a63394c6fe421e1e071ce1754fa62d6be875e271038288a9872a33e786ad5"
  },
  "deployedAt": "2026-02-15T03:41:59.322Z"
}
```

# hardhat.config.ts

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });
dotenv.config({ path: "../../.env.local" });

const MONAD_RPC_URL = process.env.MONAD_RPC_URL || "https://testnet-rpc.monad.xyz";
const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY || "0x" + "0".repeat(64);

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "paris",
    },
  },
  networks: {
    hardhat: {},
    monad: {
      url: MONAD_RPC_URL,
      chainId: 10143,
      accounts: [WALLET_PRIVATE_KEY],
    },
  },
  typechain: {
    outDir: "typechain-types",
    target: "ethers-v6",
  },
};

export default config;

```

# package.json

```json
{
    "name": "contracts",
    "version": "0.1.0",
    "private": true,
    "scripts": {
        "compile": "hardhat compile",
        "test": "hardhat test",
        "deploy:monad": "hardhat run scripts/deploy.ts --network monad",
        "clean": "hardhat clean"
    },
    "devDependencies": {
        "@nomicfoundation/hardhat-toolbox": "^4.0.0",
        "@nomicfoundation/hardhat-ethers": "^3.0.0",
        "@typechain/hardhat": "^9.0.0",
        "@typechain/ethers-v6": "^0.5.0",
        "hardhat": "^2.19.0",
        "ethers": "^6.9.0",
        "typechain": "^8.3.0",
        "typescript": "^5.3.0",
        "ts-node": "^10.9.0",
        "@types/node": "^20.0.0",
        "dotenv": "^16.3.0",
        "@openzeppelin/contracts": "^5.0.0"
    }
}
```

# scripts\deploy.ts

```ts
import { ethers } from "hardhat";
import * as fs from "fs";

async function main() {
    console.log("╔══════════════════════════════════════════╗");
    console.log("║  🧬 Deploying Vitalis to Monad Testnet  ║");
    console.log("╚══════════════════════════════════════════╝\n");

    const [deployer] = await ethers.getSigners();
    console.log(`Deployer: ${deployer.address}`);

    const balance = await ethers.provider.getBalance(deployer.address);
    console.log(`Balance:  ${ethers.formatEther(balance)} MON\n`);

    // ─── 1. Deploy VitalityRegistry ──────────────────────────────────

    console.log("1/3 Deploying VitalityRegistry...");
    const RegistryFactory = await ethers.getContractFactory("VitalityRegistry");
    const registry = await RegistryFactory.deploy();
    await registry.waitForDeployment();
    const registryAddr = await registry.getAddress();
    console.log(`    ✅ VitalityRegistry: ${registryAddr}\n`);

    // ─── 2. Deploy VitalisBounty ─────────────────────────────────────

    console.log("2/3 Deploying VitalisBounty...");
    const BountyFactory = await ethers.getContractFactory("VitalisBounty");
    const bountyContract = await BountyFactory.deploy(registryAddr);
    await bountyContract.waitForDeployment();
    const bountyAddr = await bountyContract.getAddress();
    console.log(`    ✅ VitalisBounty:    ${bountyAddr}\n`);

    // ─── 3. Authorize Bounty contract in Registry ────────────────────

    console.log("3/3 Authorizing VitalisBounty in VitalityRegistry...");
    const authTx = await registry.setBountyContract(bountyAddr);
    await authTx.wait();
    console.log(`    ✅ Bounty contract authorized (tx: ${authTx.hash})\n`);

    // ─── Save Deployment Addresses ───────────────────────────────────

    const deployments = {
        network: "monad-testnet",
        chainId: 10143,
        deployer: deployer.address,
        contracts: {
            VitalityRegistry: registryAddr,
            VitalisBounty: bountyAddr,
        },
        transactions: {
            registryDeploy: registry.deploymentTransaction()?.hash,
            bountyDeploy: bountyContract.deploymentTransaction()?.hash,
            setBountyContract: authTx.hash,
        },
        deployedAt: new Date().toISOString(),
    };

    fs.writeFileSync("deployments.json", JSON.stringify(deployments, null, 2));

    console.log("═══════════════════════════════════════════");
    console.log("  Deployment Complete! 🎉");
    console.log("  Addresses saved to deployments.json");
    console.log("═══════════════════════════════════════════");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

```

# test\Vitalis.test.ts

```ts
import { expect } from "chai";
import { ethers } from "hardhat";
import { VitalityRegistry, VitalisBounty } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Vitalis Smart Contracts", function () {
    let registry: VitalityRegistry;
    let bounty: VitalisBounty;
    let owner: HardhatEthersSigner;
    let validator: HardhatEthersSigner;
    let worker: HardhatEthersSigner;
    let pruner: HardhatEthersSigner;
    let strategist: HardhatEthersSigner;

    beforeEach(async function () {
        [owner, validator, worker, pruner, strategist] = await ethers.getSigners();

        // Deploy VitalityRegistry
        const RegistryFactory = await ethers.getContractFactory("VitalityRegistry");
        registry = await RegistryFactory.deploy();
        await registry.waitForDeployment();

        // Deploy VitalisBounty (linked to Registry)
        const BountyFactory = await ethers.getContractFactory("VitalisBounty");
        bounty = await BountyFactory.deploy(await registry.getAddress());
        await bounty.waitForDeployment();

        // Wire up: authorize VitalisBounty to call pulse()
        await registry.setBountyContract(await bounty.getAddress());

        // Set strategist
        await registry.setStrategist(strategist.address);

        // Register worker agent with 100 VITA
        await registry.registerAgent(worker.address);

        // Add validator as an approver on the bounty contract
        await bounty.addApprover(validator.address);

        // Fund registry for prune rewards
        await owner.sendTransaction({
            to: await registry.getAddress(),
            value: ethers.parseEther("1"),
        });
    });

    // ─── Test 1: Decay ───────────────────────────────────────────────

    describe("Decay", function () {
        it("should start with 100 vitality", async function () {
            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.equal(100);
        });

        it("should decay by 1 VITA after 1000 blocks", async function () {
            // Mine 1000 blocks
            await mineBlocks(1000);

            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.equal(99); // 100 - (1000/1000) = 99
        });

        it("should decay by 5 VITA after 5000 blocks", async function () {
            await mineBlocks(5000);

            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.equal(95); // 100 - (5000/1000) = 95
        });

        it("should return 0 for unregistered agents", async function () {
            const vitality = await registry.getVitality(pruner.address);
            expect(vitality).to.equal(0);
        });

        it("should go negative after enough blocks", async function () {
            // 100 * 1000 = 100_000 blocks to fully decay, then more
            await mineBlocks(110_000);

            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.be.lessThanOrEqual(0);
        });
    });

    // ─── Test 2: Pulse ───────────────────────────────────────────────

    describe("Pulse", function () {
        it("should add +50 VITA on successful bounty approval", async function () {
            // Decay a bit first
            await mineBlocks(10_000); // -10 VITA → 90

            // Create a bounty (as owner/agent)
            const tx = await bounty.createBounty("ipfs://test-bounty", {
                value: ethers.parseEther("0.01"),
            });
            const receipt = await tx.wait();

            // Extract bountyId from event
            const bountyId = await getBountyIdFromReceipt(receipt!);

            // Approve submission (validator)
            await bounty.connect(validator).approveSubmission(bountyId, worker.address);

            // Vitality should be ~90 + 50 = ~140 (accounting for a few extra blocks)
            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.be.greaterThanOrEqual(138); // Allow 2 blocks for tx processing
            expect(vitality).to.be.lessThanOrEqual(140);
        });

        it("should revert if caller is not the bounty contract", async function () {
            await expect(
                registry.connect(validator).pulse(worker.address)
            ).to.be.revertedWithCustomError(registry, "NotAuthorized");
        });

        it("should revert for inactive agents", async function () {
            // Force decay and prune
            await mineBlocks(110_000);
            await registry.prune(worker.address);

            // Try to pulse via bounty
            const tx = await bounty.createBounty("ipfs://test", {
                value: ethers.parseEther("0.01"),
            });
            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);

            await expect(
                bounty.connect(validator).approveSubmission(bountyId, worker.address)
            ).to.be.revertedWithCustomError(registry, "AgentNotActive");
        });
    });

    // ─── Test 3: Pruning ─────────────────────────────────────────────

    describe("Pruning", function () {
        it("should prune agent at 0 vitality and mark inactive", async function () {
            // Decay all vitality: 100 * 1000 = 100_000 blocks
            await mineBlocks(101_000);

            const vitalityBefore = await registry.getVitality(worker.address);
            expect(vitalityBefore).to.be.lessThanOrEqual(0);

            // Prune (anyone can call)
            await registry.connect(pruner).prune(worker.address);

            // Agent should be inactive
            const agentData = await registry.agents(worker.address);
            expect(agentData.isActive).to.equal(false);
        });

        it("should emit AgentPruned event", async function () {
            await mineBlocks(101_000);

            await expect(registry.connect(pruner).prune(worker.address))
                .to.emit(registry, "AgentPruned")
                .withArgs(worker.address);
        });

        it("should revert if agent is still alive", async function () {
            await expect(
                registry.connect(pruner).prune(worker.address)
            ).to.be.revertedWithCustomError(registry, "AgentStillAlive");
        });

        it("should revert if agent is already pruned", async function () {
            await mineBlocks(101_000);
            await registry.connect(pruner).prune(worker.address);

            await expect(
                registry.connect(pruner).prune(worker.address)
            ).to.be.revertedWithCustomError(registry, "AgentNotActive");
        });

        it("should return 0 vitality for pruned agents", async function () {
            await mineBlocks(101_000);
            await registry.connect(pruner).prune(worker.address);

            const vitality = await registry.getVitality(worker.address);
            expect(vitality).to.equal(0);
        });
    });

    // ─── Test 4: Bounty Lifecycle ────────────────────────────────────

    describe("Bounty Lifecycle", function () {
        it("should create a bounty with locked MON", async function () {
            const reward = ethers.parseEther("0.1");

            const tx = await bounty.createBounty("ipfs://bounty-metadata", {
                value: reward,
            });

            await expect(tx).to.emit(bounty, "BountyCreated");

            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);
            const bountyData = await bounty.getBounty(bountyId);

            expect(bountyData.isActive).to.equal(true);
            expect(bountyData.reward).to.equal(reward);
        });

        it("should revert createBounty with 0 value", async function () {
            await expect(
                bounty.createBounty("ipfs://zero")
            ).to.be.revertedWithCustomError(bounty, "InsufficientReward");
        });

        it("should pay worker and pulse on approval", async function () {
            const reward = ethers.parseEther("0.1");

            const tx = await bounty.createBounty("ipfs://task", { value: reward });
            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);

            const workerBalBefore = await ethers.provider.getBalance(worker.address);

            await bounty.connect(validator).approveSubmission(bountyId, worker.address);

            const workerBalAfter = await ethers.provider.getBalance(worker.address);
            expect(workerBalAfter - workerBalBefore).to.equal(reward);
        });

        it("should not allow double approval", async function () {
            const tx = await bounty.createBounty("ipfs://task", {
                value: ethers.parseEther("0.01"),
            });
            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);

            await bounty.connect(validator).approveSubmission(bountyId, worker.address);

            await expect(
                bounty.connect(validator).approveSubmission(bountyId, worker.address)
            ).to.be.revertedWithCustomError(bounty, "BountyNotActive");
        });

        it("should revert if non-approver tries to approve", async function () {
            const tx = await bounty.createBounty("ipfs://task", {
                value: ethers.parseEther("0.01"),
            });
            const receipt = await tx.wait();
            const bountyId = await getBountyIdFromReceipt(receipt!);

            await expect(
                bounty.connect(pruner).approveSubmission(bountyId, worker.address)
            ).to.be.revertedWithCustomError(bounty, "NotApprover");
        });
    });

    // ─── Test 5: Governance (Strategist) ─────────────────────────────

    describe("Governance", function () {
        it("should allow strategist to update metabolic params", async function () {
            await expect(
                registry.connect(strategist).updateMetabolicParams(2000, 75)
            )
                .to.emit(registry, "ParametersUpdated")
                .withArgs(2000, 75);

            expect(await registry.decayRate()).to.equal(2000);
            expect(await registry.pulseAmount()).to.equal(75);
        });

        it("should revert if non-strategist tries to update", async function () {
            await expect(
                registry.connect(worker).updateMetabolicParams(2000, 75)
            ).to.be.revertedWithCustomError(registry, "NotAuthorized");
        });

        it("should revert for zero decay rate", async function () {
            await expect(
                registry.connect(strategist).updateMetabolicParams(0, 50)
            ).to.be.revertedWithCustomError(registry, "InvalidDecayRate");
        });

        it("should affect decay calculation after param change", async function () {
            // Change decay rate to 500 (faster decay: 1 VITA per 500 blocks)
            await registry.connect(strategist).updateMetabolicParams(500, 50);

            await mineBlocks(1000);

            const vitality = await registry.getVitality(worker.address);
            // With decayRate=500: 100 - (1000/500) = 98
            expect(vitality).to.equal(98);
        });
    });

    // ─── Helpers ─────────────────────────────────────────────────────

    async function mineBlocks(count: number): Promise<void> {
        await ethers.provider.send("hardhat_mine", [
            "0x" + count.toString(16),
        ]);
    }

    async function getBountyIdFromReceipt(
        receipt: any
    ): Promise<string> {
        const iface = bounty.interface;
        for (const log of receipt.logs) {
            try {
                const parsed = iface.parseLog({
                    topics: log.topics as string[],
                    data: log.data,
                });
                if (parsed && parsed.name === "BountyCreated") {
                    return parsed.args[0]; // bountyId
                }
            } catch {
                // Not our event, skip
            }
        }
        throw new Error("BountyCreated event not found in receipt");
    }
});

```

# tsconfig.json

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true,
        "resolveJsonModule": true
    }
}
```

# typechain-types\@openzeppelin\contracts\access\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export type { Ownable } from "./Ownable";

```

# typechain-types\@openzeppelin\contracts\access\Ownable.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface OwnableInterface extends Interface {
  getFunction(
    nameOrSignature: "owner" | "renounceOwnership" | "transferOwnership"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;

  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Ownable extends BaseContract {
  connect(runner?: ContractRunner | null): Ownable;
  waitForDeployment(): Promise<this>;

  interface: OwnableInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  owner: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
  };
}

```

# typechain-types\@openzeppelin\contracts\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type * as access from "./access";
export type { access };
import type * as utils from "./utils";
export type { utils };

```

# typechain-types\@openzeppelin\contracts\utils\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export type { ReentrancyGuard } from "./ReentrancyGuard";

```

# typechain-types\@openzeppelin\contracts\utils\ReentrancyGuard.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  FunctionFragment,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
} from "../../../common";

export interface ReentrancyGuardInterface extends Interface {}

export interface ReentrancyGuard extends BaseContract {
  connect(runner?: ContractRunner | null): ReentrancyGuard;
  waitForDeployment(): Promise<this>;

  interface: ReentrancyGuardInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  filters: {};
}

```

# typechain-types\@openzeppelin\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type * as contracts from "./contracts";
export type { contracts };

```

# typechain-types\common.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  FunctionFragment,
  Typed,
  EventFragment,
  ContractTransaction,
  ContractTransactionResponse,
  DeferredTopicFilter,
  EventLog,
  TransactionRequest,
  LogDescription,
} from "ethers";

export interface TypedDeferredTopicFilter<_TCEvent extends TypedContractEvent>
  extends DeferredTopicFilter {}

export interface TypedContractEvent<
  InputTuple extends Array<any> = any,
  OutputTuple extends Array<any> = any,
  OutputObject = any
> {
  (...args: Partial<InputTuple>): TypedDeferredTopicFilter<
    TypedContractEvent<InputTuple, OutputTuple, OutputObject>
  >;
  name: string;
  fragment: EventFragment;
  getFragment(...args: Partial<InputTuple>): EventFragment;
}

type __TypechainAOutputTuple<T> = T extends TypedContractEvent<
  infer _U,
  infer W
>
  ? W
  : never;
type __TypechainOutputObject<T> = T extends TypedContractEvent<
  infer _U,
  infer _W,
  infer V
>
  ? V
  : never;

export interface TypedEventLog<TCEvent extends TypedContractEvent>
  extends Omit<EventLog, "args"> {
  args: __TypechainAOutputTuple<TCEvent> & __TypechainOutputObject<TCEvent>;
}

export interface TypedLogDescription<TCEvent extends TypedContractEvent>
  extends Omit<LogDescription, "args"> {
  args: __TypechainAOutputTuple<TCEvent> & __TypechainOutputObject<TCEvent>;
}

export type TypedListener<TCEvent extends TypedContractEvent> = (
  ...listenerArg: [
    ...__TypechainAOutputTuple<TCEvent>,
    TypedEventLog<TCEvent>,
    ...undefined[]
  ]
) => void;

export type MinEthersFactory<C, ARGS> = {
  deploy(...a: ARGS[]): Promise<C>;
};

export type GetContractTypeFromFactory<F> = F extends MinEthersFactory<
  infer C,
  any
>
  ? C
  : never;
export type GetARGsTypeFromFactory<F> = F extends MinEthersFactory<any, any>
  ? Parameters<F["deploy"]>
  : never;

export type StateMutability = "nonpayable" | "payable" | "view";

export type BaseOverrides = Omit<TransactionRequest, "to" | "data">;
export type NonPayableOverrides = Omit<
  BaseOverrides,
  "value" | "blockTag" | "enableCcipRead"
>;
export type PayableOverrides = Omit<
  BaseOverrides,
  "blockTag" | "enableCcipRead"
>;
export type ViewOverrides = Omit<TransactionRequest, "to" | "data">;
export type Overrides<S extends StateMutability> = S extends "nonpayable"
  ? NonPayableOverrides
  : S extends "payable"
  ? PayableOverrides
  : ViewOverrides;

export type PostfixOverrides<A extends Array<any>, S extends StateMutability> =
  | A
  | [...A, Overrides<S>];
export type ContractMethodArgs<
  A extends Array<any>,
  S extends StateMutability
> = PostfixOverrides<{ [I in keyof A]-?: A[I] | Typed }, S>;

export type DefaultReturnType<R> = R extends Array<any> ? R[0] : R;

// export interface ContractMethod<A extends Array<any> = Array<any>, R = any, D extends R | ContractTransactionResponse = R | ContractTransactionResponse> {
export interface TypedContractMethod<
  A extends Array<any> = Array<any>,
  R = any,
  S extends StateMutability = "payable"
> {
  (...args: ContractMethodArgs<A, S>): S extends "view"
    ? Promise<DefaultReturnType<R>>
    : Promise<ContractTransactionResponse>;

  name: string;

  fragment: FunctionFragment;

  getFragment(...args: ContractMethodArgs<A, S>): FunctionFragment;

  populateTransaction(
    ...args: ContractMethodArgs<A, S>
  ): Promise<ContractTransaction>;
  staticCall(
    ...args: ContractMethodArgs<A, "view">
  ): Promise<DefaultReturnType<R>>;
  send(...args: ContractMethodArgs<A, S>): Promise<ContractTransactionResponse>;
  estimateGas(...args: ContractMethodArgs<A, S>): Promise<bigint>;
  staticCallResult(...args: ContractMethodArgs<A, "view">): Promise<R>;
}

```

# typechain-types\contracts\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type * as interfaces from "./interfaces";
export type { interfaces };
export type { VitalisBounty } from "./VitalisBounty";
export type { VitalityRegistry } from "./VitalityRegistry";

```

# typechain-types\contracts\interfaces\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export type { IVitalisBounty } from "./IVitalisBounty";
export type { IVitalityRegistry } from "./IVitalityRegistry";

```

# typechain-types\contracts\interfaces\IVitalisBounty.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IVitalisBountyInterface extends Interface {
  getFunction(
    nameOrSignature: "approveSubmission" | "createBounty"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "BountyCreated" | "SubmissionApproved"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "approveSubmission",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "createBounty",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveSubmission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createBounty",
    data: BytesLike
  ): Result;
}

export namespace BountyCreatedEvent {
  export type InputTuple = [bountyId: BytesLike, reward: BigNumberish];
  export type OutputTuple = [bountyId: string, reward: bigint];
  export interface OutputObject {
    bountyId: string;
    reward: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubmissionApprovedEvent {
  export type InputTuple = [bountyId: BytesLike, worker: AddressLike];
  export type OutputTuple = [bountyId: string, worker: string];
  export interface OutputObject {
    bountyId: string;
    worker: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IVitalisBounty extends BaseContract {
  connect(runner?: ContractRunner | null): IVitalisBounty;
  waitForDeployment(): Promise<this>;

  interface: IVitalisBountyInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  approveSubmission: TypedContractMethod<
    [bountyId: BytesLike, worker: AddressLike],
    [void],
    "nonpayable"
  >;

  createBounty: TypedContractMethod<[metadataURI: string], [string], "payable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "approveSubmission"
  ): TypedContractMethod<
    [bountyId: BytesLike, worker: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createBounty"
  ): TypedContractMethod<[metadataURI: string], [string], "payable">;

  getEvent(
    key: "BountyCreated"
  ): TypedContractEvent<
    BountyCreatedEvent.InputTuple,
    BountyCreatedEvent.OutputTuple,
    BountyCreatedEvent.OutputObject
  >;
  getEvent(
    key: "SubmissionApproved"
  ): TypedContractEvent<
    SubmissionApprovedEvent.InputTuple,
    SubmissionApprovedEvent.OutputTuple,
    SubmissionApprovedEvent.OutputObject
  >;

  filters: {
    "BountyCreated(bytes32,uint256)": TypedContractEvent<
      BountyCreatedEvent.InputTuple,
      BountyCreatedEvent.OutputTuple,
      BountyCreatedEvent.OutputObject
    >;
    BountyCreated: TypedContractEvent<
      BountyCreatedEvent.InputTuple,
      BountyCreatedEvent.OutputTuple,
      BountyCreatedEvent.OutputObject
    >;

    "SubmissionApproved(bytes32,address)": TypedContractEvent<
      SubmissionApprovedEvent.InputTuple,
      SubmissionApprovedEvent.OutputTuple,
      SubmissionApprovedEvent.OutputObject
    >;
    SubmissionApproved: TypedContractEvent<
      SubmissionApprovedEvent.InputTuple,
      SubmissionApprovedEvent.OutputTuple,
      SubmissionApprovedEvent.OutputObject
    >;
  };
}

```

# typechain-types\contracts\interfaces\IVitalityRegistry.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IVitalityRegistryInterface extends Interface {
  getFunction(
    nameOrSignature: "getVitality" | "prune" | "pulse" | "updateMetabolicParams"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AgentPruned"
      | "ParametersUpdated"
      | "VitalityPulse"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getVitality",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "prune", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "pulse", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "updateMetabolicParams",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getVitality",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "prune", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pulse", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateMetabolicParams",
    data: BytesLike
  ): Result;
}

export namespace AgentPrunedEvent {
  export type InputTuple = [agent: AddressLike];
  export type OutputTuple = [agent: string];
  export interface OutputObject {
    agent: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ParametersUpdatedEvent {
  export type InputTuple = [
    newDecayRate: BigNumberish,
    newPulseAmount: BigNumberish
  ];
  export type OutputTuple = [newDecayRate: bigint, newPulseAmount: bigint];
  export interface OutputObject {
    newDecayRate: bigint;
    newPulseAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VitalityPulseEvent {
  export type InputTuple = [agent: AddressLike, newAmount: BigNumberish];
  export type OutputTuple = [agent: string, newAmount: bigint];
  export interface OutputObject {
    agent: string;
    newAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IVitalityRegistry extends BaseContract {
  connect(runner?: ContractRunner | null): IVitalityRegistry;
  waitForDeployment(): Promise<this>;

  interface: IVitalityRegistryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getVitality: TypedContractMethod<[agent: AddressLike], [bigint], "view">;

  prune: TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;

  pulse: TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;

  updateMetabolicParams: TypedContractMethod<
    [_decayRate: BigNumberish, _pulseAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getVitality"
  ): TypedContractMethod<[agent: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "prune"
  ): TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "pulse"
  ): TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateMetabolicParams"
  ): TypedContractMethod<
    [_decayRate: BigNumberish, _pulseAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "AgentPruned"
  ): TypedContractEvent<
    AgentPrunedEvent.InputTuple,
    AgentPrunedEvent.OutputTuple,
    AgentPrunedEvent.OutputObject
  >;
  getEvent(
    key: "ParametersUpdated"
  ): TypedContractEvent<
    ParametersUpdatedEvent.InputTuple,
    ParametersUpdatedEvent.OutputTuple,
    ParametersUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "VitalityPulse"
  ): TypedContractEvent<
    VitalityPulseEvent.InputTuple,
    VitalityPulseEvent.OutputTuple,
    VitalityPulseEvent.OutputObject
  >;

  filters: {
    "AgentPruned(address)": TypedContractEvent<
      AgentPrunedEvent.InputTuple,
      AgentPrunedEvent.OutputTuple,
      AgentPrunedEvent.OutputObject
    >;
    AgentPruned: TypedContractEvent<
      AgentPrunedEvent.InputTuple,
      AgentPrunedEvent.OutputTuple,
      AgentPrunedEvent.OutputObject
    >;

    "ParametersUpdated(uint256,uint256)": TypedContractEvent<
      ParametersUpdatedEvent.InputTuple,
      ParametersUpdatedEvent.OutputTuple,
      ParametersUpdatedEvent.OutputObject
    >;
    ParametersUpdated: TypedContractEvent<
      ParametersUpdatedEvent.InputTuple,
      ParametersUpdatedEvent.OutputTuple,
      ParametersUpdatedEvent.OutputObject
    >;

    "VitalityPulse(address,uint256)": TypedContractEvent<
      VitalityPulseEvent.InputTuple,
      VitalityPulseEvent.OutputTuple,
      VitalityPulseEvent.OutputObject
    >;
    VitalityPulse: TypedContractEvent<
      VitalityPulseEvent.InputTuple,
      VitalityPulseEvent.OutputTuple,
      VitalityPulseEvent.OutputObject
    >;
  };
}

```

# typechain-types\contracts\VitalisBounty.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface VitalisBountyInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addApprover"
      | "approveSubmission"
      | "approvers"
      | "bounties"
      | "bountyCount"
      | "createBounty"
      | "getBounty"
      | "owner"
      | "registry"
      | "removeApprover"
      | "renounceOwnership"
      | "transferOwnership"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "BountyCreated"
      | "OwnershipTransferred"
      | "SubmissionApproved"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addApprover",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approveSubmission",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "approvers",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "bounties", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "bountyCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "createBounty",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getBounty",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "registry", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeApprover",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "addApprover",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "approveSubmission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approvers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "bounties", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bountyCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createBounty",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBounty", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeApprover",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
}

export namespace BountyCreatedEvent {
  export type InputTuple = [bountyId: BytesLike, reward: BigNumberish];
  export type OutputTuple = [bountyId: string, reward: bigint];
  export interface OutputObject {
    bountyId: string;
    reward: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubmissionApprovedEvent {
  export type InputTuple = [bountyId: BytesLike, worker: AddressLike];
  export type OutputTuple = [bountyId: string, worker: string];
  export interface OutputObject {
    bountyId: string;
    worker: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface VitalisBounty extends BaseContract {
  connect(runner?: ContractRunner | null): VitalisBounty;
  waitForDeployment(): Promise<this>;

  interface: VitalisBountyInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addApprover: TypedContractMethod<
    [_approver: AddressLike],
    [void],
    "nonpayable"
  >;

  approveSubmission: TypedContractMethod<
    [bountyId: BytesLike, worker: AddressLike],
    [void],
    "nonpayable"
  >;

  approvers: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  bounties: TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, string, bigint, boolean, boolean] & {
        creator: string;
        metadataURI: string;
        reward: bigint;
        isActive: boolean;
        isCompleted: boolean;
      }
    ],
    "view"
  >;

  bountyCount: TypedContractMethod<[], [bigint], "view">;

  createBounty: TypedContractMethod<[metadataURI: string], [string], "payable">;

  getBounty: TypedContractMethod<
    [bountyId: BytesLike],
    [
      [string, string, bigint, boolean, boolean] & {
        creator: string;
        metadataURI: string;
        reward: bigint;
        isActive: boolean;
        isCompleted: boolean;
      }
    ],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  registry: TypedContractMethod<[], [string], "view">;

  removeApprover: TypedContractMethod<
    [_approver: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addApprover"
  ): TypedContractMethod<[_approver: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "approveSubmission"
  ): TypedContractMethod<
    [bountyId: BytesLike, worker: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "approvers"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "bounties"
  ): TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, string, bigint, boolean, boolean] & {
        creator: string;
        metadataURI: string;
        reward: bigint;
        isActive: boolean;
        isCompleted: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "bountyCount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "createBounty"
  ): TypedContractMethod<[metadataURI: string], [string], "payable">;
  getFunction(
    nameOrSignature: "getBounty"
  ): TypedContractMethod<
    [bountyId: BytesLike],
    [
      [string, string, bigint, boolean, boolean] & {
        creator: string;
        metadataURI: string;
        reward: bigint;
        isActive: boolean;
        isCompleted: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "registry"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "removeApprover"
  ): TypedContractMethod<[_approver: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "BountyCreated"
  ): TypedContractEvent<
    BountyCreatedEvent.InputTuple,
    BountyCreatedEvent.OutputTuple,
    BountyCreatedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "SubmissionApproved"
  ): TypedContractEvent<
    SubmissionApprovedEvent.InputTuple,
    SubmissionApprovedEvent.OutputTuple,
    SubmissionApprovedEvent.OutputObject
  >;

  filters: {
    "BountyCreated(bytes32,uint256)": TypedContractEvent<
      BountyCreatedEvent.InputTuple,
      BountyCreatedEvent.OutputTuple,
      BountyCreatedEvent.OutputObject
    >;
    BountyCreated: TypedContractEvent<
      BountyCreatedEvent.InputTuple,
      BountyCreatedEvent.OutputTuple,
      BountyCreatedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "SubmissionApproved(bytes32,address)": TypedContractEvent<
      SubmissionApprovedEvent.InputTuple,
      SubmissionApprovedEvent.OutputTuple,
      SubmissionApprovedEvent.OutputObject
    >;
    SubmissionApproved: TypedContractEvent<
      SubmissionApprovedEvent.InputTuple,
      SubmissionApprovedEvent.OutputTuple,
      SubmissionApprovedEvent.OutputObject
    >;
  };
}

```

# typechain-types\contracts\VitalityRegistry.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface VitalityRegistryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "agents"
      | "bountyContract"
      | "decayRate"
      | "getVitality"
      | "owner"
      | "prune"
      | "pruneReward"
      | "pulse"
      | "pulseAmount"
      | "registerAgent"
      | "renounceOwnership"
      | "setBountyContract"
      | "setStrategist"
      | "strategist"
      | "transferOwnership"
      | "updateMetabolicParams"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AgentPruned"
      | "AgentRegistered"
      | "OwnershipTransferred"
      | "ParametersUpdated"
      | "VitalityPulse"
  ): EventFragment;

  encodeFunctionData(functionFragment: "agents", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "bountyContract",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "decayRate", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getVitality",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "prune", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "pruneReward",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "pulse", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "pulseAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "registerAgent",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setBountyContract",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setStrategist",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "strategist",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateMetabolicParams",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "agents", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bountyContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decayRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getVitality",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "prune", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pruneReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "pulse", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pulseAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerAgent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBountyContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setStrategist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "strategist", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateMetabolicParams",
    data: BytesLike
  ): Result;
}

export namespace AgentPrunedEvent {
  export type InputTuple = [agent: AddressLike];
  export type OutputTuple = [agent: string];
  export interface OutputObject {
    agent: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace AgentRegisteredEvent {
  export type InputTuple = [agent: AddressLike, initialVitality: BigNumberish];
  export type OutputTuple = [agent: string, initialVitality: bigint];
  export interface OutputObject {
    agent: string;
    initialVitality: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ParametersUpdatedEvent {
  export type InputTuple = [
    newDecayRate: BigNumberish,
    newPulseAmount: BigNumberish
  ];
  export type OutputTuple = [newDecayRate: bigint, newPulseAmount: bigint];
  export interface OutputObject {
    newDecayRate: bigint;
    newPulseAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VitalityPulseEvent {
  export type InputTuple = [agent: AddressLike, newAmount: BigNumberish];
  export type OutputTuple = [agent: string, newAmount: bigint];
  export interface OutputObject {
    agent: string;
    newAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface VitalityRegistry extends BaseContract {
  connect(runner?: ContractRunner | null): VitalityRegistry;
  waitForDeployment(): Promise<this>;

  interface: VitalityRegistryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  agents: TypedContractMethod<
    [arg0: AddressLike],
    [
      [bigint, bigint, boolean, boolean] & {
        storedVitality: bigint;
        lastUpdateBlock: bigint;
        isActive: boolean;
        isRegistered: boolean;
      }
    ],
    "view"
  >;

  bountyContract: TypedContractMethod<[], [string], "view">;

  decayRate: TypedContractMethod<[], [bigint], "view">;

  getVitality: TypedContractMethod<[agent: AddressLike], [bigint], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  prune: TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;

  pruneReward: TypedContractMethod<[], [bigint], "view">;

  pulse: TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;

  pulseAmount: TypedContractMethod<[], [bigint], "view">;

  registerAgent: TypedContractMethod<
    [agent: AddressLike],
    [void],
    "nonpayable"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setBountyContract: TypedContractMethod<
    [_bountyContract: AddressLike],
    [void],
    "nonpayable"
  >;

  setStrategist: TypedContractMethod<
    [_strategist: AddressLike],
    [void],
    "nonpayable"
  >;

  strategist: TypedContractMethod<[], [string], "view">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  updateMetabolicParams: TypedContractMethod<
    [_decayRate: BigNumberish, _pulseAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "agents"
  ): TypedContractMethod<
    [arg0: AddressLike],
    [
      [bigint, bigint, boolean, boolean] & {
        storedVitality: bigint;
        lastUpdateBlock: bigint;
        isActive: boolean;
        isRegistered: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "bountyContract"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "decayRate"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getVitality"
  ): TypedContractMethod<[agent: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "prune"
  ): TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "pruneReward"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "pulse"
  ): TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "pulseAmount"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "registerAgent"
  ): TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setBountyContract"
  ): TypedContractMethod<[_bountyContract: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setStrategist"
  ): TypedContractMethod<[_strategist: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "strategist"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateMetabolicParams"
  ): TypedContractMethod<
    [_decayRate: BigNumberish, _pulseAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "AgentPruned"
  ): TypedContractEvent<
    AgentPrunedEvent.InputTuple,
    AgentPrunedEvent.OutputTuple,
    AgentPrunedEvent.OutputObject
  >;
  getEvent(
    key: "AgentRegistered"
  ): TypedContractEvent<
    AgentRegisteredEvent.InputTuple,
    AgentRegisteredEvent.OutputTuple,
    AgentRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "ParametersUpdated"
  ): TypedContractEvent<
    ParametersUpdatedEvent.InputTuple,
    ParametersUpdatedEvent.OutputTuple,
    ParametersUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "VitalityPulse"
  ): TypedContractEvent<
    VitalityPulseEvent.InputTuple,
    VitalityPulseEvent.OutputTuple,
    VitalityPulseEvent.OutputObject
  >;

  filters: {
    "AgentPruned(address)": TypedContractEvent<
      AgentPrunedEvent.InputTuple,
      AgentPrunedEvent.OutputTuple,
      AgentPrunedEvent.OutputObject
    >;
    AgentPruned: TypedContractEvent<
      AgentPrunedEvent.InputTuple,
      AgentPrunedEvent.OutputTuple,
      AgentPrunedEvent.OutputObject
    >;

    "AgentRegistered(address,int256)": TypedContractEvent<
      AgentRegisteredEvent.InputTuple,
      AgentRegisteredEvent.OutputTuple,
      AgentRegisteredEvent.OutputObject
    >;
    AgentRegistered: TypedContractEvent<
      AgentRegisteredEvent.InputTuple,
      AgentRegisteredEvent.OutputTuple,
      AgentRegisteredEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "ParametersUpdated(uint256,uint256)": TypedContractEvent<
      ParametersUpdatedEvent.InputTuple,
      ParametersUpdatedEvent.OutputTuple,
      ParametersUpdatedEvent.OutputObject
    >;
    ParametersUpdated: TypedContractEvent<
      ParametersUpdatedEvent.InputTuple,
      ParametersUpdatedEvent.OutputTuple,
      ParametersUpdatedEvent.OutputObject
    >;

    "VitalityPulse(address,uint256)": TypedContractEvent<
      VitalityPulseEvent.InputTuple,
      VitalityPulseEvent.OutputTuple,
      VitalityPulseEvent.OutputObject
    >;
    VitalityPulse: TypedContractEvent<
      VitalityPulseEvent.InputTuple,
      VitalityPulseEvent.OutputTuple,
      VitalityPulseEvent.OutputObject
    >;
  };
}

```

# typechain-types\factories\@openzeppelin\contracts\access\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export { Ownable__factory } from "./Ownable__factory";

```

# typechain-types\factories\@openzeppelin\contracts\access\Ownable__factory.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  Ownable,
  OwnableInterface,
} from "../../../../@openzeppelin/contracts/access/Ownable";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class Ownable__factory {
  static readonly abi = _abi;
  static createInterface(): OwnableInterface {
    return new Interface(_abi) as OwnableInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Ownable {
    return new Contract(address, _abi, runner) as unknown as Ownable;
  }
}

```

# typechain-types\factories\@openzeppelin\contracts\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export * as access from "./access";
export * as utils from "./utils";

```

# typechain-types\factories\@openzeppelin\contracts\utils\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export { ReentrancyGuard__factory } from "./ReentrancyGuard__factory";

```

# typechain-types\factories\@openzeppelin\contracts\utils\ReentrancyGuard__factory.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ReentrancyGuard,
  ReentrancyGuardInterface,
} from "../../../../@openzeppelin/contracts/utils/ReentrancyGuard";

const _abi = [
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
] as const;

export class ReentrancyGuard__factory {
  static readonly abi = _abi;
  static createInterface(): ReentrancyGuardInterface {
    return new Interface(_abi) as ReentrancyGuardInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ReentrancyGuard {
    return new Contract(address, _abi, runner) as unknown as ReentrancyGuard;
  }
}

```

# typechain-types\factories\@openzeppelin\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export * as contracts from "./contracts";

```

# typechain-types\factories\contracts\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export * as interfaces from "./interfaces";
export { VitalisBounty__factory } from "./VitalisBounty__factory";
export { VitalityRegistry__factory } from "./VitalityRegistry__factory";

```

# typechain-types\factories\contracts\interfaces\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export { IVitalisBounty__factory } from "./IVitalisBounty__factory";
export { IVitalityRegistry__factory } from "./IVitalityRegistry__factory";

```

# typechain-types\factories\contracts\interfaces\IVitalisBounty__factory.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IVitalisBounty,
  IVitalisBountyInterface,
} from "../../../contracts/interfaces/IVitalisBounty";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "BountyCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "worker",
        type: "address",
      },
    ],
    name: "SubmissionApproved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "worker",
        type: "address",
      },
    ],
    name: "approveSubmission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "metadataURI",
        type: "string",
      },
    ],
    name: "createBounty",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IVitalisBounty__factory {
  static readonly abi = _abi;
  static createInterface(): IVitalisBountyInterface {
    return new Interface(_abi) as IVitalisBountyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IVitalisBounty {
    return new Contract(address, _abi, runner) as unknown as IVitalisBounty;
  }
}

```

# typechain-types\factories\contracts\interfaces\IVitalityRegistry__factory.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IVitalityRegistry,
  IVitalityRegistryInterface,
} from "../../../contracts/interfaces/IVitalityRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "AgentPruned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newDecayRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPulseAmount",
        type: "uint256",
      },
    ],
    name: "ParametersUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newAmount",
        type: "uint256",
      },
    ],
    name: "VitalityPulse",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "getVitality",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "prune",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "pulse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_decayRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_pulseAmount",
        type: "uint256",
      },
    ],
    name: "updateMetabolicParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IVitalityRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): IVitalityRegistryInterface {
    return new Interface(_abi) as IVitalityRegistryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IVitalityRegistry {
    return new Contract(address, _abi, runner) as unknown as IVitalityRegistry;
  }
}

```

# typechain-types\factories\contracts\VitalisBounty__factory.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  VitalisBounty,
  VitalisBountyInterface,
} from "../../contracts/VitalisBounty";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_registry",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BountyAlreadyCompleted",
    type: "error",
  },
  {
    inputs: [],
    name: "BountyNotActive",
    type: "error",
  },
  {
    inputs: [],
    name: "BountyNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientReward",
    type: "error",
  },
  {
    inputs: [],
    name: "NotApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "BountyCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "worker",
        type: "address",
      },
    ],
    name: "SubmissionApproved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_approver",
        type: "address",
      },
    ],
    name: "addApprover",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "worker",
        type: "address",
      },
    ],
    name: "approveSubmission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "approvers",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "bounties",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "metadataURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isCompleted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bountyCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "metadataURI",
        type: "string",
      },
    ],
    name: "createBounty",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
    ],
    name: "getBounty",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "metadataURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isCompleted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "registry",
    outputs: [
      {
        internalType: "contract IVitalityRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_approver",
        type: "address",
      },
    ],
    name: "removeApprover",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610d90380380610d9083398101604081905261002f916100f4565b338061005557604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61005e816100a4565b506001808055600280546001600160a01b0319166001600160a01b039390931692909217909155336000908152600560205260409020805460ff19169091179055610124565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561010657600080fd5b81516001600160a01b038116811461011d57600080fd5b9392505050565b610c5d806101336000396000f3fe6080604052600436106100ab5760003560e01c80637b103999116100645780637b1039991461019b5780638da5cb5b146101d3578063b646c194146101f1578063bf5522da14610211578063cce5b74b14610231578063f2fde38b1461025157600080fd5b806306868c4b146100b75780630a144391146100dd5780632417395c1461011d5780633e362c961461014e5780636cf4c88f14610164578063715018a61461018657600080fd5b366100b257005b600080fd5b6100ca6100c53660046108f5565b610271565b6040519081526020015b60405180910390f35b3480156100e957600080fd5b5061010d6100f8366004610983565b60056020526000908152604090205460ff1681565b60405190151581526020016100d4565b34801561012957600080fd5b5061013d6101383660046109a5565b6103f2565b6040516100d49594939291906109be565b34801561015a57600080fd5b506100ca60045481565b34801561017057600080fd5b5061018461017f366004610983565b6104da565b005b34801561019257600080fd5b50610184610503565b3480156101a757600080fd5b506002546101bb906001600160a01b031681565b6040516001600160a01b0390911681526020016100d4565b3480156101df57600080fd5b506000546001600160a01b03166101bb565b3480156101fd57600080fd5b5061018461020c366004610983565b610517565b34801561021d57600080fd5b5061013d61022c3660046109a5565b610543565b34801561023d57600080fd5b5061018461024c366004610a3b565b61060b565b34801561025d57600080fd5b5061018461026c366004610983565b61080b565b60003460000361029457604051636bbdb6db60e11b815260040160405180910390fd5b600480549060006102a483610a67565b9190505550600033848434436004546040516020016102c896959493929190610a8e565b60408051601f19818403018152828252805160209182012060a0840183523384528251601f880183900483028101830190935286835293508281019190879087908190840183828082843760009201829052509385525050346020808501919091526001604080860182905260609095018490528684526003825293909220845181546001600160a01b0319166001600160a01b03909116178155918401519192830191610377915082610b67565b50604082810151600283015560608301516003909201805460809094015161ffff1990941692151561ff00191692909217610100931515939093029290921790555134815281907fa5968139833b3514d7c565f873ebc2a5af89c7f67bd436b227206a21ff73676d9060200160405180910390a29392505050565b60008181526003602081905260408220805460028201549282015460018301805460609587958695869591946001600160a01b039091169390929160ff808216926101009092041690849061044690610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461047290610ade565b80156104bf5780601f10610494576101008083540402835291602001916104bf565b820191906000526020600020905b8154815290600101906020018083116104a257829003601f168201915b50505050509350955095509550955095505091939590929450565b6104e261084e565b6001600160a01b03166000908152600560205260409020805460ff19169055565b61050b61084e565b610515600061087b565b565b61051f61084e565b6001600160a01b03166000908152600560205260409020805460ff19166001179055565b600360205260009081526040902080546001820180546001600160a01b03909216929161056f90610ade565b80601f016020809104026020016040519081016040528092919081815260200182805461059b90610ade565b80156105e85780601f106105bd576101008083540402835291602001916105e8565b820191906000526020600020905b8154815290600101906020018083116105cb57829003601f168201915b50505050600283015460039093015491929160ff80821692506101009091041685565b3360009081526005602052604090205460ff1615801561063657506000546001600160a01b03163314155b1561065457604051630197e13360e61b815260040160405180910390fd5b61065c6108cb565b60008281526003602081905260409091209081015460ff166106915760405163226d32fb60e21b815260040160405180910390fd5b6003810154610100900460ff16156106bc576040516326182e5f60e11b815260040160405180910390fd5b80600201546000036106e1576040516324ce57e760e21b815260040160405180910390fd5b60038101805461ffff191661010017905560028101546040516000916001600160a01b038516918381818185875af1925050503d8060008114610740576040519150601f19603f3d011682016040523d82523d6000602084013e610745565b606091505b5050905080610767576040516312171d8360e31b815260040160405180910390fd5b600254604051638e97fdc360e01b81526001600160a01b03858116600483015290911690638e97fdc390602401600060405180830381600087803b1580156107ae57600080fd5b505af11580156107c2573d6000803e3d6000fd5b50506040516001600160a01b03861692508691507f2c87d92d54fcf72b587c92c2d781bc23399eef1715fd00cae882bd1316781a4b90600090a3505061080760018055565b5050565b61081361084e565b6001600160a01b03811661084257604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b61084b8161087b565b50565b6000546001600160a01b031633146105155760405163118cdaa760e01b8152336004820152602401610839565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6002600154036108ee57604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6000806020838503121561090857600080fd5b823567ffffffffffffffff8082111561092057600080fd5b818501915085601f83011261093457600080fd5b81358181111561094357600080fd5b86602082850101111561095557600080fd5b60209290920196919550909350505050565b80356001600160a01b038116811461097e57600080fd5b919050565b60006020828403121561099557600080fd5b61099e82610967565b9392505050565b6000602082840312156109b757600080fd5b5035919050565b60018060a01b03861681526000602060a08184015286518060a085015260005b818110156109fa5788810183015185820160c0015282016109de565b50600060c0828601015260c0601f19601f83011685010192505050846040830152610a29606083018515159052565b82151560808301529695505050505050565b60008060408385031215610a4e57600080fd5b82359150610a5e60208401610967565b90509250929050565b600060018201610a8757634e487b7160e01b600052601160045260246000fd5b5060010190565b6bffffffffffffffffffffffff198760601b1681528486601483013760149401938401929092526034830152605482015260740192915050565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680610af257607f821691505b602082108103610b1257634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610b6257600081815260208120601f850160051c81016020861015610b3f5750805b601f850160051c820191505b81811015610b5e57828155600101610b4b565b5050505b505050565b815167ffffffffffffffff811115610b8157610b81610ac8565b610b9581610b8f8454610ade565b84610b18565b602080601f831160018114610bca5760008415610bb25750858301515b600019600386901b1c1916600185901b178555610b5e565b600085815260208120601f198616915b82811015610bf957888601518255948401946001909101908401610bda565b5085821015610c175787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220234ff02bc4c745dcd853431b948b046aca836d4dff35c0c3fb926ce62c18269364736f6c63430008140033";

type VitalisBountyConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VitalisBountyConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VitalisBounty__factory extends ContractFactory {
  constructor(...args: VitalisBountyConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _registry: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_registry, overrides || {});
  }
  override deploy(
    _registry: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_registry, overrides || {}) as Promise<
      VitalisBounty & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): VitalisBounty__factory {
    return super.connect(runner) as VitalisBounty__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VitalisBountyInterface {
    return new Interface(_abi) as VitalisBountyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): VitalisBounty {
    return new Contract(address, _abi, runner) as unknown as VitalisBounty;
  }
}

```

# typechain-types\factories\contracts\VitalityRegistry__factory.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  VitalityRegistry,
  VitalityRegistryInterface,
} from "../../contracts/VitalityRegistry";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AgentAlreadyRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "AgentNotActive",
    type: "error",
  },
  {
    inputs: [],
    name: "AgentNotRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "AgentStillAlive",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidDecayRate",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "ReentrancyGuardReentrantCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "AgentPruned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "initialVitality",
        type: "int256",
      },
    ],
    name: "AgentRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newDecayRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPulseAmount",
        type: "uint256",
      },
    ],
    name: "ParametersUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newAmount",
        type: "uint256",
      },
    ],
    name: "VitalityPulse",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "agents",
    outputs: [
      {
        internalType: "int256",
        name: "storedVitality",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "lastUpdateBlock",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isRegistered",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bountyContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decayRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "getVitality",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "prune",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pruneReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "pulse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pulseAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "registerAgent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bountyContract",
        type: "address",
      },
    ],
    name: "setBountyContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_strategist",
        type: "address",
      },
    ],
    name: "setStrategist",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "strategist",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_decayRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_pulseAmount",
        type: "uint256",
      },
    ],
    name: "updateMetabolicParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x60806040526103e86003556032600455670de0b6b3a764000060055534801561002757600080fd5b50338061004e57604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b61005781610073565b5060018055600780546001600160a01b031916331790556100c3565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610ae4806100d26000396000f3fe6080604052600436106100f75760003560e01c80638da5cb5b1161008a578063ddf9fa0911610059578063ddf9fa091461028f578063f2fde38b146102af578063fc2dff08146102cf578063fd66091e146102e557600080fd5b80638da5cb5b1461021b5780638e97fdc314610239578063a9c1f2f114610259578063c7b9d5301461026f57600080fd5b8063715018a6116100c6578063715018a6146101b05780637af86a29146101c557806380b3fa3f146101e557806387693efc146101fb57600080fd5b80630f3cca49146101035780631fe4a686146101255780632f36b5d914610162578063306b9bb91461019057600080fd5b366100fe57005b600080fd5b34801561010f57600080fd5b5061012361011e3660046109bc565b610354565b005b34801561013157600080fd5b50600754610145906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b34801561016e57600080fd5b5061018261017d3660046109bc565b6104e7565b604051908152602001610159565b34801561019c57600080fd5b506101236101ab3660046109bc565b610571565b3480156101bc57600080fd5b50610123610669565b3480156101d157600080fd5b506101236101e03660046109bc565b61067d565b3480156101f157600080fd5b5061018260045481565b34801561020757600080fd5b506101236102163660046109ec565b6106a7565b34801561022757600080fd5b506000546001600160a01b0316610145565b34801561024557600080fd5b506101236102543660046109bc565b61073a565b34801561026557600080fd5b5061018260035481565b34801561027b57600080fd5b5061012361028a3660046109bc565b61084a565b34801561029b57600080fd5b50600654610145906001600160a01b031681565b3480156102bb57600080fd5b506101236102ca3660046109bc565b610874565b3480156102db57600080fd5b5061018260055481565b3480156102f157600080fd5b5061032c6103003660046109bc565b600260208190526000918252604090912080546001820154919092015460ff8082169161010090041684565b6040805194855260208501939093529015159183019190915215156060820152608001610159565b61035c6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166103a0576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166103c557604051632437e77160e11b815260040160405180910390fd5b6103ce826108d9565b8054600012156103f157604051631e3b681960e21b815260040160405180910390fd5b60028101805460ff1916905560055447106104a65760055460405160009133918381818185875af1925050503d8060008114610449576040519150601f19603f3d011682016040523d82523d6000602084013e61044e565b606091505b50509050806104a45760405162461bcd60e51b815260206004820152601c60248201527f5072756e6520726577617264207472616e73666572206661696c65640000000060448201526064015b60405180910390fd5b505b6040516001600160a01b038316907f3481493766137a21a43eefafc4c946920d719b13638a00ce8eb791ec28cc9ef490600090a2506104e460018055565b50565b6001600160a01b0381166000908152600260208190526040822090810154610100900460ff1661051a5750600092915050565b600281015460ff1661052f5750600092915050565b60008160010154436105419190610a24565b90506000600354826105539190610a3d565b905060008184600001546105679190610a5f565b9695505050505050565b61057961093f565b6001600160a01b03811660009081526002602081905260409091200154610100900460ff16156105bc5760405163704c69f760e11b815260040160405180910390fd5b6040805160808101825260648082524360208084019182526001848601818152606086018281526001600160a01b03891660008181526002808752908a9020985189559551938801939093559051959093018054935161ffff1990941695151561ff00191695909517610100931515939093029290921790935592519081527f86d94fe3783a846468c0b7912fca3072b86415f6da1c7045926f0bc687a9da12910160405180910390a250565b61067161093f565b61067b600061096c565b565b61068561093f565b600680546001600160a01b0319166001600160a01b0392909216919091179055565b6007546001600160a01b031633146106d25760405163ea8e4eb560e01b815260040160405180910390fd5b816000036106f357604051630678582160e51b815260040160405180910390fd5b6003829055600481905560408051838152602081018390527ffaccb0639ff7851e0e24f3b2d9ab03cd62ffb63f5b4d90aaeff85bb078c1fa48910160405180910390a15050565b6006546001600160a01b031633146107655760405163ea8e4eb560e01b815260040160405180910390fd5b61076d6108af565b6001600160a01b038116600090815260026020819052604090912090810154610100900460ff166107b1576040516383bcfb4760e01b815260040160405180910390fd5b600281015460ff166107d657604051632437e77160e11b815260040160405180910390fd5b6107df826108d9565b6004548160000160008282546107f59190610a86565b909155505043600182015580546040519081526001600160a01b038316907fd7563a2b45d0b0f1b01b82db96ae4752fe46daa24649b6076762ae631a0cdd2b9060200160405180910390a2506104e460018055565b61085261093f565b600780546001600160a01b0319166001600160a01b0392909216919091179055565b61087c61093f565b6001600160a01b0381166108a657604051631e4fbdf760e01b81526000600482015260240161049b565b6104e48161096c565b6002600154036108d257604051633ee5aeb560e01b815260040160405180910390fd5b6002600155565b6001600160a01b038116600090815260026020526040812060018101549091906109039043610a24565b90506000600354826109159190610a3d565b90508083600001600082825461092b9190610a5f565b909155505043600190930192909255505050565b6000546001600160a01b0316331461067b5760405163118cdaa760e01b815233600482015260240161049b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000602082840312156109ce57600080fd5b81356001600160a01b03811681146109e557600080fd5b9392505050565b600080604083850312156109ff57600080fd5b50508035926020909101359150565b634e487b7160e01b600052601160045260246000fd5b81810381811115610a3757610a37610a0e565b92915050565b600082610a5a57634e487b7160e01b600052601260045260246000fd5b500490565b8181036000831280158383131683831282161715610a7f57610a7f610a0e565b5092915050565b8082018281126000831280158216821582161715610aa657610aa6610a0e565b50509291505056fea26469706673582212200fc46ab2a6d3edc44b53de50eddce2215f153b7fda095d3a76fdc72c192f83b064736f6c63430008140033";

type VitalityRegistryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: VitalityRegistryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class VitalityRegistry__factory extends ContractFactory {
  constructor(...args: VitalityRegistryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      VitalityRegistry & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): VitalityRegistry__factory {
    return super.connect(runner) as VitalityRegistry__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VitalityRegistryInterface {
    return new Interface(_abi) as VitalityRegistryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): VitalityRegistry {
    return new Contract(address, _abi, runner) as unknown as VitalityRegistry;
  }
}

```

# typechain-types\factories\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
export * as openzeppelin from "./@openzeppelin";
export * as contracts from "./contracts";

```

# typechain-types\factories\IVitalisBounty__factory.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IVitalisBounty,
  IVitalisBountyInterface,
} from "../IVitalisBounty";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "BountyCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "worker",
        type: "address",
      },
    ],
    name: "SubmissionApproved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "bountyId",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "worker",
        type: "address",
      },
    ],
    name: "approveSubmission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "metadataURI",
        type: "string",
      },
    ],
    name: "createBounty",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class IVitalisBounty__factory {
  static readonly abi = _abi;
  static createInterface(): IVitalisBountyInterface {
    return new Interface(_abi) as IVitalisBountyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IVitalisBounty {
    return new Contract(address, _abi, runner) as unknown as IVitalisBounty;
  }
}

```

# typechain-types\factories\IVitalityRegistry__factory.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IVitalityRegistry,
  IVitalityRegistryInterface,
} from "../IVitalityRegistry";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "AgentPruned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newDecayRate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newPulseAmount",
        type: "uint256",
      },
    ],
    name: "ParametersUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newAmount",
        type: "uint256",
      },
    ],
    name: "VitalityPulse",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "getVitality",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "prune",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "agent",
        type: "address",
      },
    ],
    name: "pulse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_decayRate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_pulseAmount",
        type: "uint256",
      },
    ],
    name: "updateMetabolicParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IVitalityRegistry__factory {
  static readonly abi = _abi;
  static createInterface(): IVitalityRegistryInterface {
    return new Interface(_abi) as IVitalityRegistryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IVitalityRegistry {
    return new Contract(address, _abi, runner) as unknown as IVitalityRegistry;
  }
}

```

# typechain-types\hardhat.d.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ReentrancyGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuard__factory>;
    getContractFactory(
      name: "IVitalisBounty",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVitalisBounty__factory>;
    getContractFactory(
      name: "IVitalityRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IVitalityRegistry__factory>;
    getContractFactory(
      name: "VitalisBounty",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VitalisBounty__factory>;
    getContractFactory(
      name: "VitalityRegistry",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.VitalityRegistry__factory>;

    getContractAt(
      name: "Ownable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ReentrancyGuard",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuard>;
    getContractAt(
      name: "IVitalisBounty",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IVitalisBounty>;
    getContractAt(
      name: "IVitalityRegistry",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IVitalityRegistry>;
    getContractAt(
      name: "VitalisBounty",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.VitalisBounty>;
    getContractAt(
      name: "VitalityRegistry",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.VitalityRegistry>;

    deployContract(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "ReentrancyGuard",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuard>;
    deployContract(
      name: "IVitalisBounty",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVitalisBounty>;
    deployContract(
      name: "IVitalityRegistry",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVitalityRegistry>;
    deployContract(
      name: "VitalisBounty",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VitalisBounty>;
    deployContract(
      name: "VitalityRegistry",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VitalityRegistry>;

    deployContract(
      name: "Ownable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Ownable>;
    deployContract(
      name: "ReentrancyGuard",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ReentrancyGuard>;
    deployContract(
      name: "IVitalisBounty",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVitalisBounty>;
    deployContract(
      name: "IVitalityRegistry",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IVitalityRegistry>;
    deployContract(
      name: "VitalisBounty",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VitalisBounty>;
    deployContract(
      name: "VitalityRegistry",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.VitalityRegistry>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}

```

# typechain-types\index.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type * as openzeppelin from "./@openzeppelin";
export type { openzeppelin };
import type * as contracts from "./contracts";
export type { contracts };
export * as factories from "./factories";
export type { Ownable } from "./@openzeppelin/contracts/access/Ownable";
export { Ownable__factory } from "./factories/@openzeppelin/contracts/access/Ownable__factory";
export type { ReentrancyGuard } from "./@openzeppelin/contracts/utils/ReentrancyGuard";
export { ReentrancyGuard__factory } from "./factories/@openzeppelin/contracts/utils/ReentrancyGuard__factory";
export type { IVitalisBounty } from "./contracts/interfaces/IVitalisBounty";
export { IVitalisBounty__factory } from "./factories/contracts/interfaces/IVitalisBounty__factory";
export type { IVitalityRegistry } from "./contracts/interfaces/IVitalityRegistry";
export { IVitalityRegistry__factory } from "./factories/contracts/interfaces/IVitalityRegistry__factory";
export type { VitalisBounty } from "./contracts/VitalisBounty";
export { VitalisBounty__factory } from "./factories/contracts/VitalisBounty__factory";
export type { VitalityRegistry } from "./contracts/VitalityRegistry";
export { VitalityRegistry__factory } from "./factories/contracts/VitalityRegistry__factory";

```

# typechain-types\IVitalisBounty.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface IVitalisBountyInterface extends Interface {
  getFunction(
    nameOrSignature: "approveSubmission" | "createBounty"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "BountyCreated" | "SubmissionApproved"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "approveSubmission",
    values: [BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "createBounty",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "approveSubmission",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createBounty",
    data: BytesLike
  ): Result;
}

export namespace BountyCreatedEvent {
  export type InputTuple = [bountyId: BytesLike, reward: BigNumberish];
  export type OutputTuple = [bountyId: string, reward: bigint];
  export interface OutputObject {
    bountyId: string;
    reward: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SubmissionApprovedEvent {
  export type InputTuple = [bountyId: BytesLike, worker: AddressLike];
  export type OutputTuple = [bountyId: string, worker: string];
  export interface OutputObject {
    bountyId: string;
    worker: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IVitalisBounty extends BaseContract {
  connect(runner?: ContractRunner | null): IVitalisBounty;
  waitForDeployment(): Promise<this>;

  interface: IVitalisBountyInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  approveSubmission: TypedContractMethod<
    [bountyId: BytesLike, worker: AddressLike],
    [void],
    "nonpayable"
  >;

  createBounty: TypedContractMethod<[metadataURI: string], [string], "payable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "approveSubmission"
  ): TypedContractMethod<
    [bountyId: BytesLike, worker: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createBounty"
  ): TypedContractMethod<[metadataURI: string], [string], "payable">;

  getEvent(
    key: "BountyCreated"
  ): TypedContractEvent<
    BountyCreatedEvent.InputTuple,
    BountyCreatedEvent.OutputTuple,
    BountyCreatedEvent.OutputObject
  >;
  getEvent(
    key: "SubmissionApproved"
  ): TypedContractEvent<
    SubmissionApprovedEvent.InputTuple,
    SubmissionApprovedEvent.OutputTuple,
    SubmissionApprovedEvent.OutputObject
  >;

  filters: {
    "BountyCreated(bytes32,uint256)": TypedContractEvent<
      BountyCreatedEvent.InputTuple,
      BountyCreatedEvent.OutputTuple,
      BountyCreatedEvent.OutputObject
    >;
    BountyCreated: TypedContractEvent<
      BountyCreatedEvent.InputTuple,
      BountyCreatedEvent.OutputTuple,
      BountyCreatedEvent.OutputObject
    >;

    "SubmissionApproved(bytes32,address)": TypedContractEvent<
      SubmissionApprovedEvent.InputTuple,
      SubmissionApprovedEvent.OutputTuple,
      SubmissionApprovedEvent.OutputObject
    >;
    SubmissionApproved: TypedContractEvent<
      SubmissionApprovedEvent.InputTuple,
      SubmissionApprovedEvent.OutputTuple,
      SubmissionApprovedEvent.OutputObject
    >;
  };
}

```

# typechain-types\IVitalityRegistry.ts

```ts
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface IVitalityRegistryInterface extends Interface {
  getFunction(
    nameOrSignature: "getVitality" | "prune" | "pulse" | "updateMetabolicParams"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "AgentPruned"
      | "ParametersUpdated"
      | "VitalityPulse"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "getVitality",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "prune", values: [AddressLike]): string;
  encodeFunctionData(functionFragment: "pulse", values: [AddressLike]): string;
  encodeFunctionData(
    functionFragment: "updateMetabolicParams",
    values: [BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getVitality",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "prune", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pulse", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateMetabolicParams",
    data: BytesLike
  ): Result;
}

export namespace AgentPrunedEvent {
  export type InputTuple = [agent: AddressLike];
  export type OutputTuple = [agent: string];
  export interface OutputObject {
    agent: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ParametersUpdatedEvent {
  export type InputTuple = [
    newDecayRate: BigNumberish,
    newPulseAmount: BigNumberish
  ];
  export type OutputTuple = [newDecayRate: bigint, newPulseAmount: bigint];
  export interface OutputObject {
    newDecayRate: bigint;
    newPulseAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VitalityPulseEvent {
  export type InputTuple = [agent: AddressLike, newAmount: BigNumberish];
  export type OutputTuple = [agent: string, newAmount: bigint];
  export interface OutputObject {
    agent: string;
    newAmount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IVitalityRegistry extends BaseContract {
  connect(runner?: ContractRunner | null): IVitalityRegistry;
  waitForDeployment(): Promise<this>;

  interface: IVitalityRegistryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getVitality: TypedContractMethod<[agent: AddressLike], [bigint], "view">;

  prune: TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;

  pulse: TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;

  updateMetabolicParams: TypedContractMethod<
    [_decayRate: BigNumberish, _pulseAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getVitality"
  ): TypedContractMethod<[agent: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "prune"
  ): TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "pulse"
  ): TypedContractMethod<[agent: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateMetabolicParams"
  ): TypedContractMethod<
    [_decayRate: BigNumberish, _pulseAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "AgentPruned"
  ): TypedContractEvent<
    AgentPrunedEvent.InputTuple,
    AgentPrunedEvent.OutputTuple,
    AgentPrunedEvent.OutputObject
  >;
  getEvent(
    key: "ParametersUpdated"
  ): TypedContractEvent<
    ParametersUpdatedEvent.InputTuple,
    ParametersUpdatedEvent.OutputTuple,
    ParametersUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "VitalityPulse"
  ): TypedContractEvent<
    VitalityPulseEvent.InputTuple,
    VitalityPulseEvent.OutputTuple,
    VitalityPulseEvent.OutputObject
  >;

  filters: {
    "AgentPruned(address)": TypedContractEvent<
      AgentPrunedEvent.InputTuple,
      AgentPrunedEvent.OutputTuple,
      AgentPrunedEvent.OutputObject
    >;
    AgentPruned: TypedContractEvent<
      AgentPrunedEvent.InputTuple,
      AgentPrunedEvent.OutputTuple,
      AgentPrunedEvent.OutputObject
    >;

    "ParametersUpdated(uint256,uint256)": TypedContractEvent<
      ParametersUpdatedEvent.InputTuple,
      ParametersUpdatedEvent.OutputTuple,
      ParametersUpdatedEvent.OutputObject
    >;
    ParametersUpdated: TypedContractEvent<
      ParametersUpdatedEvent.InputTuple,
      ParametersUpdatedEvent.OutputTuple,
      ParametersUpdatedEvent.OutputObject
    >;

    "VitalityPulse(address,uint256)": TypedContractEvent<
      VitalityPulseEvent.InputTuple,
      VitalityPulseEvent.OutputTuple,
      VitalityPulseEvent.OutputObject
    >;
    VitalityPulse: TypedContractEvent<
      VitalityPulseEvent.InputTuple,
      VitalityPulseEvent.OutputTuple,
      VitalityPulseEvent.OutputObject
    >;
  };
}

```

