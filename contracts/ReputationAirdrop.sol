// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./ReputationVerifier.sol";

/**
 * @title ReputationAirdrop
 * @dev Smart contract for Sybil-resistant airdrops based on reputation scores
 */
contract ReputationAirdrop {
    // Reference to the ReputationVerifier contract
    ReputationVerifier public reputationVerifier;
    
    // Owner of the contract
    address public owner;
    
    // ERC20 token interface
    interface IERC20 {
        function transfer(address to, uint256 amount) external returns (bool);
        function balanceOf(address account) external view returns (uint256);
    }
    
    // Airdrop campaign structure
    struct AirdropCampaign {
        string name;
        address tokenAddress;
        uint256 baseAmount;
        uint256 minReputationScore;
        bool useReputationMultiplier;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        mapping(address => bool) claimed;
    }
    
    // Public campaign info structure (for returning campaign data without mappings)
    struct CampaignInfo {
        uint256 id;
        string name;
        address tokenAddress;
        uint256 baseAmount;
        uint256 minReputationScore;
        bool useReputationMultiplier;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        uint256 remainingTokens;
    }
    
    // Campaigns storage
    mapping(uint256 => AirdropCampaign) public campaigns;
    uint256 public campaignCount;
    
    // Events
    event CampaignCreated(uint256 indexed campaignId, string name, address tokenAddress);
    event AirdropClaimed(uint256 indexed campaignId, address indexed claimer, uint256 amount);
    event CampaignUpdated(uint256 indexed campaignId);
    
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
     * @dev Create a new airdrop campaign
     * @param name Name of the campaign
     * @param tokenAddress Address of the ERC20 token to distribute
     * @param baseAmount Base amount of tokens to distribute per eligible address
     * @param minReputationScore Minimum reputation score required to be eligible
     * @param useReputationMultiplier Whether to multiply the base amount by reputation score
     * @param duration Duration of the campaign in seconds
     * @return campaignId ID of the created campaign
     */
    function createCampaign(
        string memory name,
        address tokenAddress,
        uint256 baseAmount,
        uint256 minReputationScore,
        bool useReputationMultiplier,
        uint256 duration
    ) external onlyOwner returns (uint256 campaignId) {
        require(bytes(name).length > 0, "Name cannot be empty");
        require(tokenAddress != address(0), "Invalid token address");
        require(baseAmount > 0, "Base amount must be greater than 0");
        require(minReputationScore <= 100, "Score must be between 0 and 100");
        require(duration > 0, "Duration must be greater than 0");
        
        // Create the campaign
        campaignId = campaignCount;
        AirdropCampaign storage campaign = campaigns[campaignId];
        campaign.name = name;
        campaign.tokenAddress = tokenAddress;
        campaign.baseAmount = baseAmount;
        campaign.minReputationScore = minReputationScore;
        campaign.useReputationMultiplier = useReputationMultiplier;
        campaign.startTime = block.timestamp;
        campaign.endTime = block.timestamp + duration;
        campaign.isActive = true;
        
        campaignCount++;
        
        emit CampaignCreated(campaignId, name, tokenAddress);
        return campaignId;
    }
    
    /**
     * @dev Claim tokens from an airdrop campaign
     * @param campaignId ID of the campaign
     */
    function claimAirdrop(uint256 campaignId) external {
        require(campaignId < campaignCount, "Campaign does not exist");
        AirdropCampaign storage campaign = campaigns[campaignId];
        
        require(campaign.isActive, "Campaign is not active");
        require(block.timestamp >= campaign.startTime, "Campaign has not started");
        require(block.timestamp <= campaign.endTime, "Campaign has ended");
        require(!campaign.claimed[msg.sender], "Already claimed");
        
        // Check reputation score
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
        require(overallScore >= campaign.minReputationScore, "Insufficient reputation score");
        
        // Calculate token amount
        uint256 amount = campaign.baseAmount;
        if (campaign.useReputationMultiplier) {
            // Scale amount by reputation score (0-100%)
            amount = amount * overallScore / 100;
        }
        
        // Mark as claimed
        campaign.claimed[msg.sender] = true;
        
        // Transfer tokens
        IERC20 token = IERC20(campaign.tokenAddress);
        require(token.balanceOf(address(this)) >= amount, "Insufficient token balance");
        require(token.transfer(msg.sender, amount), "Token transfer failed");
        
        emit AirdropClaimed(campaignId, msg.sender, amount);
    }
    
    /**
     * @dev Update an existing campaign
     * @param campaignId ID of the campaign
     * @param minReputationScore New minimum reputation score
     * @param useReputationMultiplier New multiplier setting
     * @param isActive New active status
     */
    function updateCampaign(
        uint256 campaignId,
        uint256 minReputationScore,
        bool useReputationMultiplier,
        bool isActive
    ) external onlyOwner {
        require(campaignId < campaignCount, "Campaign does not exist");
        AirdropCampaign storage campaign = campaigns[campaignId];
        require(minReputationScore <= 100, "Score must be between 0 and 100");
        
        campaign.minReputationScore = minReputationScore;
        campaign.useReputationMultiplier = useReputationMultiplier;
        campaign.isActive = isActive;
        
        emit CampaignUpdated(campaignId);
    }
    
    /**
     * @dev Extend the duration of a campaign
     * @param campaignId ID of the campaign
     * @param additionalDuration Additional duration in seconds
     */
    function extendCampaign(uint256 campaignId, uint256 additionalDuration) external onlyOwner {
        require(campaignId < campaignCount, "Campaign does not exist");
        AirdropCampaign storage campaign = campaigns[campaignId];
        require(campaign.isActive, "Campaign is not active");
        require(block.timestamp <= campaign.endTime, "Campaign has already ended");
        
        campaign.endTime += additionalDuration;
        
        emit CampaignUpdated(campaignId);
    }
    
    /**
     * @dev Get campaign details
     * @param campaignId ID of the campaign
     * @return Campaign information
     */
    function getCampaign(uint256 campaignId) external view returns (CampaignInfo memory) {
        require(campaignId < campaignCount, "Campaign does not exist");
        AirdropCampaign storage campaign = campaigns[campaignId];
        
        IERC20 token = IERC20(campaign.tokenAddress);
        uint256 remainingTokens = token.balanceOf(address(this));
        
        return CampaignInfo({
            id: campaignId,
            name: campaign.name,
            tokenAddress: campaign.tokenAddress,
            baseAmount: campaign.baseAmount,
            minReputationScore: campaign.minReputationScore,
            useReputationMultiplier: campaign.useReputationMultiplier,
            startTime: campaign.startTime,
            endTime: campaign.endTime,
            isActive: campaign.isActive,
            remainingTokens: remainingTokens
        });
    }
    
    /**
     * @dev Check if an address has claimed from a campaign
     * @param campaignId ID of the campaign
     * @param claimer Address to check
     * @return True if the address has claimed
     */
    function hasClaimed(uint256 campaignId, address claimer) external view returns (bool) {
        require(campaignId < campaignCount, "Campaign does not exist");
        return campaigns[campaignId].claimed[claimer];
    }
    
    /**
     * @dev Calculate the amount a user would receive from a campaign
     * @param campaignId ID of the campaign
     * @param user Address of the user
     * @return amount Amount of tokens the user would receive, 0 if not eligible
     */
    function calculateAirdropAmount(uint256 campaignId, address user) external view returns (uint256 amount) {
        require(campaignId < campaignCount, "Campaign does not exist");
        AirdropCampaign storage campaign = campaigns[campaignId];
        
        if (campaign.claimed[user] || !campaign.isActive) {
            return 0;
        }
        
        // Check reputation score
        (
            uint256 overallScore,
            ,
            ,
            ,
            ,
            ,
            ,
            bool isVerified
        ) = reputationVerifier.getReputationScore(user);
        
        if (!isVerified || overallScore < campaign.minReputationScore) {
            return 0;
        }
        
        // Calculate token amount
        amount = campaign.baseAmount;
        if (campaign.useReputationMultiplier) {
            // Scale amount by reputation score (0-100%)
            amount = amount * overallScore / 100;
        }
        
        return amount;
    }
    
    /**
     * @dev Withdraw tokens from the contract (for emergency use)
     * @param tokenAddress Address of the token to withdraw
     * @param amount Amount to withdraw
     */
    function withdrawTokens(address tokenAddress, uint256 amount) external onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) >= amount, "Insufficient balance");
        require(token.transfer(owner, amount), "Transfer failed");
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
