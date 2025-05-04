// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ReputationVerifier.sol";

/**
 * @title ReputationVoting
 * @dev Smart contract for DAO voting with reputation-weighted votes
 */
contract ReputationVoting {
    // Reference to the ReputationVerifier contract
    ReputationVerifier public reputationVerifier;
    
    // Owner of the contract
    address public owner;
    
    // Proposal structure
    struct Proposal {
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
        mapping(address => Vote) votes;
    }
    
    // Vote structure
    struct Vote {
        bool hasVoted;
        bool support;
        uint256 weight;
    }
    
    // Public proposal info structure (for returning proposal data without mappings)
    struct ProposalInfo {
        uint256 id;
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
    }
    
    // Reputation weight configuration
    struct WeightConfig {
        bool useOverallScore;
        bool useTrustworthinessScore;
        bool useGovernanceScore;
        bool useTechnicalScore;
        bool useCommunityScore;
        uint8 overallWeight;
        uint8 trustworthinessWeight;
        uint8 governanceWeight;
        uint8 technicalWeight;
        uint8 communityWeight;
    }
    
    // Proposals storage
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    
    // Weight configuration
    WeightConfig public weightConfig;
    
    // Minimum reputation score required to create proposals
    uint256 public minProposalScore;
    
    // Events
    event ProposalCreated(uint256 indexed proposalId, address creator, string title);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId);
    event WeightConfigUpdated();
    
    /**
     * @dev Constructor sets the owner and reputation verifier contract
     * @param _reputationVerifier Address of the ReputationVerifier contract
     */
    constructor(address _reputationVerifier) {
        require(_reputationVerifier != address(0), "Invalid verifier address");
        owner = msg.sender;
        reputationVerifier = ReputationVerifier(_reputationVerifier);
        
        // Default weight configuration
        weightConfig = WeightConfig({
            useOverallScore: true,
            useTrustworthinessScore: false,
            useGovernanceScore: true,
            useTechnicalScore: false,
            useCommunityScore: false,
            overallWeight: 50,
            trustworthinessWeight: 0,
            governanceWeight: 50,
            technicalWeight: 0,
            communityWeight: 0
        });
        
        minProposalScore = 70; // Default minimum score to create proposals
    }
    
    /**
     * @dev Modifier to restrict function access to the owner
     */
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    /**
     * @dev Create a new proposal
     * @param title Title of the proposal
     * @param description Description of the proposal
     * @param duration Duration of the voting period in seconds
     * @return proposalId ID of the created proposal
     */
    function createProposal(
        string memory title,
        string memory description,
        uint256 duration
    ) external returns (uint256 proposalId) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(duration > 0, "Duration must be greater than 0");
        
        // Check if the creator has sufficient reputation
        (
            uint256 overallScore,
            ,
            ,
            ,
            ,
            ,
            ,
            bool isVerified
        ) = reputationVerifier.getReputationScore(msg.sender);
        
        require(isVerified, "Reputation not verified");
        require(overallScore >= minProposalScore, "Insufficient reputation score");
        
        // Create the proposal
        proposalId = proposalCount;
        Proposal storage proposal = proposals[proposalId];
        proposal.title = title;
        proposal.description = description;
        proposal.startTime = block.timestamp;
        proposal.endTime = block.timestamp + duration;
        
        proposalCount++;
        
        emit ProposalCreated(proposalId, msg.sender, title);
        return proposalId;
    }
    
    /**
     * @dev Cast a vote on a proposal
     * @param proposalId ID of the proposal
     * @param support True for supporting the proposal, false for voting against
     */
    function castVote(uint256 proposalId, bool support) external {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp >= proposal.startTime, "Voting has not started");
        require(block.timestamp <= proposal.endTime, "Voting has ended");
        require(!proposal.votes[msg.sender].hasVoted, "Already voted");
        
        // Calculate vote weight based on reputation
        uint256 weight = calculateVoteWeight(msg.sender);
        require(weight > 0, "No voting weight");
        
        // Record the vote
        proposal.votes[msg.sender] = Vote({
            hasVoted: true,
            support: support,
            weight: weight
        });
        
        // Update vote tallies
        if (support) {
            proposal.forVotes += weight;
        } else {
            proposal.againstVotes += weight;
        }
        
        emit VoteCast(proposalId, msg.sender, support, weight);
    }
    
    /**
     * @dev Calculate a user's vote weight based on their reputation scores
     * @param voter Address of the voter
     * @return weight Calculated vote weight
     */
    function calculateVoteWeight(address voter) public view returns (uint256) {
        (
            uint256 overallScore,
            uint256 trustworthinessScore,
            uint256 governanceScore,
            uint256 technicalScore,
            uint256 communityScore,
            ,
            ,
            bool isVerified
        ) = reputationVerifier.getReputationScore(voter);
        
        if (!isVerified) {
            return 0;
        }
        
        uint256 totalWeight = 0;
        uint256 weightSum = 0;
        
        if (weightConfig.useOverallScore) {
            totalWeight += overallScore * weightConfig.overallWeight;
            weightSum += weightConfig.overallWeight;
        }
        
        if (weightConfig.useTrustworthinessScore) {
            totalWeight += trustworthinessScore * weightConfig.trustworthinessWeight;
            weightSum += weightConfig.trustworthinessWeight;
        }
        
        if (weightConfig.useGovernanceScore) {
            totalWeight += governanceScore * weightConfig.governanceWeight;
            weightSum += weightConfig.governanceWeight;
        }
        
        if (weightConfig.useTechnicalScore) {
            totalWeight += technicalScore * weightConfig.technicalWeight;
            weightSum += weightConfig.technicalWeight;
        }
        
        if (weightConfig.useCommunityScore) {
            totalWeight += communityScore * weightConfig.communityWeight;
            weightSum += weightConfig.communityWeight;
        }
        
        if (weightSum == 0) {
            return 0;
        }
        
        return totalWeight / weightSum;
    }
    
    /**
     * @dev Execute a proposal after voting has ended
     * @param proposalId ID of the proposal
     * @return success True if the proposal passed and was executed
     */
    function executeProposal(uint256 proposalId) external returns (bool success) {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        
        require(block.timestamp > proposal.endTime, "Voting has not ended");
        require(!proposal.executed, "Proposal already executed");
        
        proposal.executed = true;
        
        bool passed = proposal.forVotes > proposal.againstVotes;
        
        if (passed) {
            // In a real implementation, this would execute the proposal's actions
            // For this example, we just emit an event
            emit ProposalExecuted(proposalId);
        }
        
        return passed;
    }
    
    /**
     * @dev Get proposal details
     * @param proposalId ID of the proposal
     * @return Proposal information
     */
    function getProposal(uint256 proposalId) external view returns (ProposalInfo memory) {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        
        return ProposalInfo({
            id: proposalId,
            title: proposal.title,
            description: proposal.description,
            startTime: proposal.startTime,
            endTime: proposal.endTime,
            forVotes: proposal.forVotes,
            againstVotes: proposal.againstVotes,
            executed: proposal.executed
        });
    }
    
    /**
     * @dev Check if a user has voted on a proposal
     * @param proposalId ID of the proposal
     * @param voter Address of the voter
     * @return hasVoted True if the user has voted
     * @return support True if the user voted in support
     * @return weight The weight of the user's vote
     */
    function getVote(uint256 proposalId, address voter) external view returns (
        bool hasVoted,
        bool support,
        uint256 weight
    ) {
        require(proposalId < proposalCount, "Proposal does not exist");
        Vote memory vote = proposals[proposalId].votes[voter];
        return (vote.hasVoted, vote.support, vote.weight);
    }
    
    /**
     * @dev Update the weight configuration
     * @param _useOverallScore Whether to use overall score
     * @param _useTrustworthinessScore Whether to use trustworthiness score
     * @param _useGovernanceScore Whether to use governance score
     * @param _useTechnicalScore Whether to use technical score
     * @param _useCommunityScore Whether to use community score
     * @param _overallWeight Weight for overall score
     * @param _trustworthinessWeight Weight for trustworthiness score
     * @param _governanceWeight Weight for governance score
     * @param _technicalWeight Weight for technical score
     * @param _communityWeight Weight for community score
     */
    function updateWeightConfig(
        bool _useOverallScore,
        bool _useTrustworthinessScore,
        bool _useGovernanceScore,
        bool _useTechnicalScore,
        bool _useCommunityScore,
        uint8 _overallWeight,
        uint8 _trustworthinessWeight,
        uint8 _governanceWeight,
        uint8 _technicalWeight,
        uint8 _communityWeight
    ) external onlyOwner {
        // Ensure at least one score is used
        require(
            _useOverallScore || _useTrustworthinessScore || _useGovernanceScore || 
            _useTechnicalScore || _useCommunityScore,
            "At least one score must be used"
        );
        
        weightConfig.useOverallScore = _useOverallScore;
        weightConfig.useTrustworthinessScore = _useTrustworthinessScore;
        weightConfig.useGovernanceScore = _useGovernanceScore;
        weightConfig.useTechnicalScore = _useTechnicalScore;
        weightConfig.useCommunityScore = _useCommunityScore;
        weightConfig.overallWeight = _overallWeight;
        weightConfig.trustworthinessWeight = _trustworthinessWeight;
        weightConfig.governanceWeight = _governanceWeight;
        weightConfig.technicalWeight = _technicalWeight;
        weightConfig.communityWeight = _communityWeight;
        
        emit WeightConfigUpdated();
    }
    
    /**
     * @dev Update the minimum reputation score required to create proposals
     * @param _minProposalScore New minimum score
     */
    function updateMinProposalScore(uint256 _minProposalScore) external onlyOwner {
        require(_minProposalScore <= 100, "Score must be between 0 and 100");
        minProposalScore = _minProposalScore;
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
