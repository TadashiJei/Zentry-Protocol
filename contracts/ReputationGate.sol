// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ReputationVerifier.sol";

/**
 * @title ReputationGate
 * @dev Smart contract for gating access to features based on reputation scores
 */
contract ReputationGate {
    // Reference to the ReputationVerifier contract
    ReputationVerifier public reputationVerifier;
    
    // Owner of the contract
    address public owner;
    
    // Gate configuration structure
    struct GateConfig {
        string name;
        uint256 overallThreshold;
        uint8 componentType; // 0=none, 1=trustworthiness, 2=governance, 3=technical, 4=community
        uint256 componentThreshold;
        bool isActive;
    }
    
    // Mapping from gate ID to gate configuration
    mapping(bytes32 => GateConfig) public gates;
    
    // List of gate IDs
    bytes32[] public gateIds;
    
    // Events
    event GateCreated(bytes32 indexed gateId, string name, uint256 overallThreshold);
    event GateUpdated(bytes32 indexed gateId, uint256 overallThreshold);
    event GateStatusChanged(bytes32 indexed gateId, bool isActive);
    
    /**
     * @dev Constructor sets the owner and reputation verifier contract
     * @param _reputationVerifier Address of the ReputationVerifier contract
     */
    constructor(address _reputationVerifier) {
        require(_reputationVerifier != address(0), "Invalid verifier address");
        owner = msg.sender;
        reputationVerifier = ReputationVerifier(_reputationVerifier);
    }
    
    /**
     * @dev Modifier to restrict function access to the owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /**
     * @dev Create a new reputation gate
     * @param name Name of the gate
     * @param overallThreshold Minimum overall reputation score required
     * @param componentType Type of component score to check (0=none, 1-4=specific component)
     * @param componentThreshold Minimum component score required
     * @return gateId Unique identifier for the gate
     */
    function createGate(
        string memory name,
        uint256 overallThreshold,
        uint8 componentType,
        uint256 componentThreshold
    ) external onlyOwner returns (bytes32 gateId) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(overallThreshold <= 100, "Threshold must be between 0 and 100");
        require(componentThreshold <= 100, "Threshold must be between 0 and 100");
        require(componentType <= 4, "Invalid component type");
        
        // Generate a unique ID for the gate
        gateId = keccak256(abi.encodePacked(name, block.timestamp, gateIds.length));
        
        // Create the gate configuration
        gates[gateId] = GateConfig({
            name: name,
            overallThreshold: overallThreshold,
            componentType: componentType,
            componentThreshold: componentThreshold,
            isActive: true
        });
        
        // Add the gate ID to the list
        gateIds.push(gateId);
        
        emit GateCreated(gateId, name, overallThreshold);
        return gateId;
    }
    
    /**
     * @dev Update an existing gate configuration
     * @param gateId ID of the gate to update
     * @param overallThreshold New overall threshold
     * @param componentType New component type
     * @param componentThreshold New component threshold
     */
    function updateGate(
        bytes32 gateId,
        uint256 overallThreshold,
        uint8 componentType,
        uint256 componentThreshold
    ) external onlyOwner {
        require(gates[gateId].isActive, "Gate does not exist or is inactive");
        require(overallThreshold <= 100, "Threshold must be between 0 and 100");
        require(componentThreshold <= 100, "Threshold must be between 0 and 100");
        require(componentType <= 4, "Invalid component type");
        
        gates[gateId].overallThreshold = overallThreshold;
        gates[gateId].componentType = componentType;
        gates[gateId].componentThreshold = componentThreshold;
        
        emit GateUpdated(gateId, overallThreshold);
    }
    
    /**
     * @dev Activate or deactivate a gate
     * @param gateId ID of the gate
     * @param isActive New status for the gate
     */
    function setGateStatus(bytes32 gateId, bool isActive) external onlyOwner {
        require(bytes(gates[gateId].name).length > 0, "Gate does not exist");
        gates[gateId].isActive = isActive;
        emit GateStatusChanged(gateId, isActive);
    }
    
    /**
     * @dev Check if a user passes a specific gate
     * @param user Address of the user
     * @param gateId ID of the gate
     * @return True if the user passes the gate requirements
     */
    function checkAccess(address user, bytes32 gateId) external view returns (bool) {
        GateConfig memory gate = gates[gateId];
        require(gate.isActive, "Gate is not active");
        
        // Check overall threshold
        (
            uint256 overallScore,
            uint256 trustworthinessScore,
            uint256 governanceScore,
            uint256 technicalScore,
            uint256 communityScore,
            ,
            ,
            bool isVerified
        ) = reputationVerifier.getReputationScore(user);
        
        if (!isVerified || overallScore < gate.overallThreshold) {
            return false;
        }
        
        // Check component threshold if specified
        if (gate.componentType == 0) {
            return true; // No component check needed
        } else if (gate.componentType == 1) {
            return trustworthinessScore >= gate.componentThreshold;
        } else if (gate.componentType == 2) {
            return governanceScore >= gate.componentThreshold;
        } else if (gate.componentType == 3) {
            return technicalScore >= gate.componentThreshold;
        } else if (gate.componentType == 4) {
            return communityScore >= gate.componentThreshold;
        }
        
        return false;
    }
    
    /**
     * @dev Get the total number of gates
     * @return Number of gates
     */
    function getGateCount() external view returns (uint256) {
        return gateIds.length;
    }
    
    /**
     * @dev Get gate details
     * @param gateId ID of the gate
     * @return Gate configuration details
     */
    function getGateDetails(bytes32 gateId) external view returns (
        string memory name,
        uint256 overallThreshold,
        uint8 componentType,
        uint256 componentThreshold,
        bool isActive
    ) {
        GateConfig memory gate = gates[gateId];
        return (
            gate.name,
            gate.overallThreshold,
            gate.componentType,
            gate.componentThreshold,
            gate.isActive
        );
    }
    
    /**
     * @dev Transfer ownership of the contract
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid owner address");
        owner = newOwner;
    }
    
    /**
     * @dev Update the reputation verifier contract address
     * @param _reputationVerifier New address of the ReputationVerifier contract
     */
    function updateReputationVerifier(address _reputationVerifier) external onlyOwner {
        require(_reputationVerifier != address(0), "Invalid verifier address");
        reputationVerifier = ReputationVerifier(_reputationVerifier);
    }
}
