// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ReputationVerifier
 * @dev Smart contract for verifying and storing reputation scores on-chain
 */
contract ReputationVerifier {
    // Owner of the contract
    address public owner;
    
    // Reputation data structure
    struct ReputationScore {
        uint256 overallScore;
        uint256 trustworthinessScore;
        uint256 governanceScore;
        uint256 technicalScore;
        uint256 communityScore;
        uint256 timestamp;
        bytes32 proofHash;
        bool isVerified;
    }
    
    // Mapping from user address to their reputation score
    mapping(address => ReputationScore) public reputationScores;
    
    // Authorized verifiers who can update reputation scores
    mapping(address => bool) public authorizedVerifiers;
    
    // Events
    event ReputationUpdated(address indexed user, uint256 overallScore, bytes32 proofHash);
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    
    /**
     * @dev Constructor sets the owner of the contract
     */
    constructor() {
        owner = msg.sender;
        authorizedVerifiers[msg.sender] = true;
    }
    
    /**
     * @dev Modifier to restrict function access to the owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /**
     * @dev Modifier to restrict function access to authorized verifiers
     */
    modifier onlyVerifier() {
        require(authorizedVerifiers[msg.sender], "Only authorized verifiers can call this function");
        _;
    }
    
    /**
     * @dev Add a new authorized verifier
     * @param verifier Address of the verifier to add
     */
    function addVerifier(address verifier) external onlyOwner {
        require(verifier != address(0), "Invalid verifier address");
        authorizedVerifiers[verifier] = true;
        emit VerifierAdded(verifier);
    }
    
    /**
     * @dev Remove an authorized verifier
     * @param verifier Address of the verifier to remove
     */
    function removeVerifier(address verifier) external onlyOwner {
        require(authorizedVerifiers[verifier], "Address is not a verifier");
        authorizedVerifiers[verifier] = false;
        emit VerifierRemoved(verifier);
    }
    
    /**
     * @dev Update a user's reputation score
     * @param user Address of the user
     * @param overallScore Overall reputation score
     * @param trustworthinessScore Trustworthiness component score
     * @param governanceScore Governance component score
     * @param technicalScore Technical expertise component score
     * @param communityScore Community contribution component score
     * @param proofHash Hash of the proof data stored off-chain
     */
    function updateReputationScore(
        address user,
        uint256 overallScore,
        uint256 trustworthinessScore,
        uint256 governanceScore,
        uint256 technicalScore,
        uint256 communityScore,
        bytes32 proofHash
    ) external onlyVerifier {
        require(user != address(0), "Invalid user address");
        require(overallScore <= 100, "Score must be between 0 and 100");
        require(trustworthinessScore <= 100, "Score must be between 0 and 100");
        require(governanceScore <= 100, "Score must be between 0 and 100");
        require(technicalScore <= 100, "Score must be between 0 and 100");
        require(communityScore <= 100, "Score must be between 0 and 100");
        
        reputationScores[user] = ReputationScore({
            overallScore: overallScore,
            trustworthinessScore: trustworthinessScore,
            governanceScore: governanceScore,
            technicalScore: technicalScore,
            communityScore: communityScore,
            timestamp: block.timestamp,
            proofHash: proofHash,
            isVerified: true
        });
        
        emit ReputationUpdated(user, overallScore, proofHash);
    }
    
    /**
     * @dev Get a user's reputation score
     * @param user Address of the user
     * @return The user's reputation score components
     */
    function getReputationScore(address user) external view returns (
        uint256 overallScore,
        uint256 trustworthinessScore,
        uint256 governanceScore,
        uint256 technicalScore,
        uint256 communityScore,
        uint256 timestamp,
        bytes32 proofHash,
        bool isVerified
    ) {
        ReputationScore memory score = reputationScores[user];
        return (
            score.overallScore,
            score.trustworthinessScore,
            score.governanceScore,
            score.technicalScore,
            score.communityScore,
            score.timestamp,
            score.proofHash,
            score.isVerified
        );
    }
    
    /**
     * @dev Verify if a user's reputation score is above a threshold
     * @param user Address of the user
     * @param threshold Minimum score required
     * @return True if the user's score is at or above the threshold
     */
    function verifyReputationThreshold(address user, uint256 threshold) external view returns (bool) {
        require(threshold <= 100, "Threshold must be between 0 and 100");
        return reputationScores[user].isVerified && reputationScores[user].overallScore >= threshold;
    }
    
    /**
     * @dev Verify if a user's component score is above a threshold
     * @param user Address of the user
     * @param componentType 1=trustworthiness, 2=governance, 3=technical, 4=community
     * @param threshold Minimum score required
     * @return True if the user's component score is at or above the threshold
     */
    function verifyComponentThreshold(
        address user,
        uint8 componentType,
        uint256 threshold
    ) external view returns (bool) {
        require(threshold <= 100, "Threshold must be between 0 and 100");
        require(componentType >= 1 && componentType <= 4, "Invalid component type");
        
        if (!reputationScores[user].isVerified) {
            return false;
        }
        
        if (componentType == 1) {
            return reputationScores[user].trustworthinessScore >= threshold;
        } else if (componentType == 2) {
            return reputationScores[user].governanceScore >= threshold;
        } else if (componentType == 3) {
            return reputationScores[user].technicalScore >= threshold;
        } else {
            return reputationScores[user].communityScore >= threshold;
        }
    }
    
    /**
     * @dev Transfer ownership of the contract
     * @param newOwner Address of the new owner
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid owner address");
        owner = newOwner;
    }
}
