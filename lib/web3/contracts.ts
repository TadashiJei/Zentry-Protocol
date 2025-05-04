/**
 * Smart Contract Interfaces
 * 
 * This file provides TypeScript interfaces and utility functions for interacting with
 * the reputation system smart contracts.
 */

import { ethers } from 'ethers';

// Contract ABIs (Application Binary Interfaces)
// These would normally be generated from the Solidity contracts using a tool like hardhat or truffle
// For now, we'll define simplified versions manually

// ReputationVerifier ABI
const ReputationVerifierABI = [
  // View functions
  'function getReputationScore(address user) external view returns (uint256 overallScore, uint256 trustworthinessScore, uint256 governanceScore, uint256 technicalScore, uint256 communityScore, uint256 timestamp, bytes32 proofHash, bool isVerified)',
  'function verifyReputationThreshold(address user, uint256 threshold) external view returns (bool)',
  'function verifyComponentThreshold(address user, uint8 componentType, uint256 threshold) external view returns (bool)',
  
  // State-changing functions
  'function updateReputationScore(address user, uint256 overallScore, uint256 trustworthinessScore, uint256 governanceScore, uint256 technicalScore, uint256 communityScore, bytes32 proofHash) external',
  
  // Admin functions
  'function addVerifier(address verifier) external',
  'function removeVerifier(address verifier) external',
  'function transferOwnership(address newOwner) external',
  
  // Events
  'event ReputationUpdated(address indexed user, uint256 overallScore, bytes32 proofHash)',
];

// ReputationGate ABI
const ReputationGateABI = [
  // View functions
  'function checkAccess(address user, bytes32 gateId) external view returns (bool)',
  'function getGateDetails(bytes32 gateId) external view returns (string memory name, uint256 overallThreshold, uint8 componentType, uint256 componentThreshold, bool isActive)',
  'function getGateCount() external view returns (uint256)',
  
  // State-changing functions
  'function createGate(string memory name, uint256 overallThreshold, uint8 componentType, uint256 componentThreshold) external returns (bytes32 gateId)',
  'function updateGate(bytes32 gateId, uint256 overallThreshold, uint8 componentType, uint256 componentThreshold) external',
  'function setGateStatus(bytes32 gateId, bool isActive) external',
  
  // Events
  'event GateCreated(bytes32 indexed gateId, string name, uint256 overallThreshold)',
  'event GateUpdated(bytes32 indexed gateId, uint256 overallThreshold)',
  'event GateStatusChanged(bytes32 indexed gateId, bool isActive)',
];

// ReputationVoting ABI
const ReputationVotingABI = [
  // View functions
  'function getProposal(uint256 proposalId) external view returns (tuple(uint256 id, string title, string description, uint256 startTime, uint256 endTime, uint256 forVotes, uint256 againstVotes, bool executed))',
  'function getVote(uint256 proposalId, address voter) external view returns (bool hasVoted, bool support, uint256 weight)',
  'function calculateVoteWeight(address voter) public view returns (uint256)',
  
  // State-changing functions
  'function createProposal(string memory title, string memory description, uint256 duration) external returns (uint256 proposalId)',
  'function castVote(uint256 proposalId, bool support) external',
  'function executeProposal(uint256 proposalId) external returns (bool success)',
  
  // Events
  'event ProposalCreated(uint256 indexed proposalId, address creator, string title)',
  'event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight)',
  'event ProposalExecuted(uint256 indexed proposalId)',
];

// ReputationAirdrop ABI
const ReputationAirdropABI = [
  // View functions
  'function getCampaign(uint256 campaignId) external view returns (tuple(uint256 id, string name, address tokenAddress, uint256 baseAmount, uint256 minReputationScore, bool useReputationMultiplier, uint256 startTime, uint256 endTime, bool isActive, uint256 remainingTokens))',
  'function hasClaimed(uint256 campaignId, address claimer) external view returns (bool)',
  'function calculateAirdropAmount(uint256 campaignId, address user) external view returns (uint256 amount)',
  
  // State-changing functions
  'function createCampaign(string memory name, address tokenAddress, uint256 baseAmount, uint256 minReputationScore, bool useReputationMultiplier, uint256 duration) external returns (uint256 campaignId)',
  'function claimAirdrop(uint256 campaignId) external',
  
  // Events
  'event CampaignCreated(uint256 indexed campaignId, string name, address tokenAddress)',
  'event AirdropClaimed(uint256 indexed campaignId, address indexed claimer, uint256 amount)',
];

// Contract addresses
// These would be set based on the deployed contract addresses for each network
const CONTRACT_ADDRESSES = {
  // Ethereum Mainnet
  1: {
    ReputationVerifier: '',
    ReputationGate: '',
    ReputationVoting: '',
    ReputationAirdrop: '',
  },
  // Ethereum Sepolia Testnet
  11155111: {
    ReputationVerifier: '',
    ReputationGate: '',
    ReputationVoting: '',
    ReputationAirdrop: '',
  },
  // Polygon Mainnet
  137: {
    ReputationVerifier: '',
    ReputationGate: '',
    ReputationVoting: '',
    ReputationAirdrop: '',
  },
  // Arbitrum One
  42161: {
    ReputationVerifier: '',
    ReputationGate: '',
    ReputationVoting: '',
    ReputationAirdrop: '',
  },
};

/**
 * Get contract instance based on contract name and chain ID
 * @param contractName Name of the contract
 * @param chainId Chain ID of the network
 * @param provider Ethers provider
 * @param signer Optional signer for write operations
 * @returns Contract instance
 */
export function getContract(contractName: string, chainId: number, provider: any, signer?: any) {
  const addresses = CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES];
  if (!addresses) {
    throw new Error(`Unsupported chain ID: ${chainId}`);
  }
  
  const address = addresses[contractName as keyof typeof addresses];
  if (!address) {
    throw new Error(`Contract ${contractName} not deployed on chain ID ${chainId}`);
  }
  
  let abi;
  switch (contractName) {
    case 'ReputationVerifier':
      abi = ReputationVerifierABI;
      break;
    case 'ReputationGate':
      abi = ReputationGateABI;
      break;
    case 'ReputationVoting':
      abi = ReputationVotingABI;
      break;
    case 'ReputationAirdrop':
      abi = ReputationAirdropABI;
      break;
    default:
      throw new Error(`Unknown contract name: ${contractName}`);
  }
  
  return new ethers.Contract(address, abi, signer || provider);
}

/**
 * ReputationVerifier interface
 */
export class ReputationVerifierInterface {
  private contract: any;
  
  constructor(chainId: number, provider: any, signer?: any) {
    this.contract = getContract('ReputationVerifier', chainId, provider, signer);
  }
  
  /**
   * Get a user's reputation score
   * @param address User address
   * @returns Reputation score components
   */
  async getReputationScore(address: string) {
    const result = await this.contract.getReputationScore(address);
    return {
      overallScore: Number(result.overallScore),
      trustworthinessScore: Number(result.trustworthinessScore),
      governanceScore: Number(result.governanceScore),
      technicalScore: Number(result.technicalScore),
      communityScore: Number(result.communityScore),
      timestamp: Number(result.timestamp),
      proofHash: result.proofHash,
      isVerified: result.isVerified,
    };
  }
  
  /**
   * Verify if a user's reputation score is above a threshold
   * @param address User address
   * @param threshold Minimum score required
   * @returns True if the user's score is at or above the threshold
   */
  async verifyReputationThreshold(address: string, threshold: number) {
    return await this.contract.verifyReputationThreshold(address, threshold);
  }
  
  /**
   * Verify if a user's component score is above a threshold
   * @param address User address
   * @param componentType 1=trustworthiness, 2=governance, 3=technical, 4=community
   * @param threshold Minimum score required
   * @returns True if the user's component score is at or above the threshold
   */
  async verifyComponentThreshold(address: string, componentType: number, threshold: number) {
    return await this.contract.verifyComponentThreshold(address, componentType, threshold);
  }
  
  /**
   * Update a user's reputation score (requires verifier role)
   * @param userAddress User address
   * @param scores Reputation score components
   * @param proofHash Hash of the proof data stored off-chain
   * @returns Transaction receipt
   */
  async updateReputationScore(
    userAddress: string,
    scores: {
      overallScore: number;
      trustworthinessScore: number;
      governanceScore: number;
      technicalScore: number;
      communityScore: number;
    },
    proofHash: string
  ) {
    const tx = await this.contract.updateReputationScore(
      userAddress,
      scores.overallScore,
      scores.trustworthinessScore,
      scores.governanceScore,
      scores.technicalScore,
      scores.communityScore,
      proofHash
    );
    return await tx.wait();
  }
}

/**
 * ReputationGate interface
 */
export class ReputationGateInterface {
  private contract: any;
  
  constructor(chainId: number, provider: any, signer?: any) {
    this.contract = getContract('ReputationGate', chainId, provider, signer);
  }
  
  /**
   * Check if a user passes a specific gate
   * @param userAddress User address
   * @param gateId Gate ID
   * @returns True if the user passes the gate requirements
   */
  async checkAccess(userAddress: string, gateId: string) {
    return await this.contract.checkAccess(userAddress, gateId);
  }
  
  /**
   * Get gate details
   * @param gateId Gate ID
   * @returns Gate configuration details
   */
  async getGateDetails(gateId: string) {
    const result = await this.contract.getGateDetails(gateId);
    return {
      name: result.name,
      overallThreshold: Number(result.overallThreshold),
      componentType: Number(result.componentType),
      componentThreshold: Number(result.componentThreshold),
      isActive: result.isActive,
    };
  }
  
  /**
   * Create a new reputation gate (requires owner role)
   * @param name Name of the gate
   * @param overallThreshold Minimum overall reputation score required
   * @param componentType Type of component score to check (0=none, 1-4=specific component)
   * @param componentThreshold Minimum component score required
   * @returns Transaction receipt and gate ID
   */
  async createGate(
    name: string,
    overallThreshold: number,
    componentType: number,
    componentThreshold: number
  ) {
    const tx = await this.contract.createGate(
      name,
      overallThreshold,
      componentType,
      componentThreshold
    );
    const receipt = await tx.wait();
    
    // Extract gate ID from event
    const event = receipt.events?.find((e: any) => e.event === 'GateCreated');
    const gateId = event?.args?.gateId;
    
    return { receipt, gateId };
  }
}

/**
 * ReputationVoting interface
 */
export class ReputationVotingInterface {
  private contract: any;
  
  constructor(chainId: number, provider: any, signer?: any) {
    this.contract = getContract('ReputationVoting', chainId, provider, signer);
  }
  
  /**
   * Create a new proposal
   * @param title Title of the proposal
   * @param description Description of the proposal
   * @param duration Duration of the voting period in seconds
   * @returns Transaction receipt and proposal ID
   */
  async createProposal(title: string, description: string, duration: number) {
    const tx = await this.contract.createProposal(title, description, duration);
    const receipt = await tx.wait();
    
    // Extract proposal ID from event
    const event = receipt.events?.find((e: any) => e.event === 'ProposalCreated');
    const proposalId = event?.args?.proposalId;
    
    return { receipt, proposalId };
  }
  
  /**
   * Cast a vote on a proposal
   * @param proposalId ID of the proposal
   * @param support True for supporting the proposal, false for voting against
   * @returns Transaction receipt
   */
  async castVote(proposalId: number, support: boolean) {
    const tx = await this.contract.castVote(proposalId, support);
    return await tx.wait();
  }
  
  /**
   * Get proposal details
   * @param proposalId ID of the proposal
   * @returns Proposal information
   */
  async getProposal(proposalId: number) {
    const result = await this.contract.getProposal(proposalId);
    return {
      id: Number(result.id),
      title: result.title,
      description: result.description,
      startTime: Number(result.startTime),
      endTime: Number(result.endTime),
      forVotes: Number(result.forVotes),
      againstVotes: Number(result.againstVotes),
      executed: result.executed,
    };
  }
  
  /**
   * Calculate a user's vote weight based on their reputation scores
   * @param address User address
   * @returns Calculated vote weight
   */
  async calculateVoteWeight(address: string) {
    const weight = await this.contract.calculateVoteWeight(address);
    return Number(weight);
  }
}

/**
 * ReputationAirdrop interface
 */
export class ReputationAirdropInterface {
  private contract: any;
  
  constructor(chainId: number, provider: any, signer?: any) {
    this.contract = getContract('ReputationAirdrop', chainId, provider, signer);
  }
  
  /**
   * Get campaign details
   * @param campaignId ID of the campaign
   * @returns Campaign information
   */
  async getCampaign(campaignId: number) {
    const result = await this.contract.getCampaign(campaignId);
    return {
      id: Number(result.id),
      name: result.name,
      tokenAddress: result.tokenAddress,
      baseAmount: Number(result.baseAmount),
      minReputationScore: Number(result.minReputationScore),
      useReputationMultiplier: result.useReputationMultiplier,
      startTime: Number(result.startTime),
      endTime: Number(result.endTime),
      isActive: result.isActive,
      remainingTokens: Number(result.remainingTokens),
    };
  }
  
  /**
   * Check if an address has claimed from a campaign
   * @param campaignId ID of the campaign
   * @param address Address to check
   * @returns True if the address has claimed
   */
  async hasClaimed(campaignId: number, address: string) {
    return await this.contract.hasClaimed(campaignId, address);
  }
  
  /**
   * Calculate the amount a user would receive from a campaign
   * @param campaignId ID of the campaign
   * @param address Address of the user
   * @returns Amount of tokens the user would receive, 0 if not eligible
   */
  async calculateAirdropAmount(campaignId: number, address: string) {
    const amount = await this.contract.calculateAirdropAmount(campaignId, address);
    return Number(amount);
  }
  
  /**
   * Claim tokens from an airdrop campaign
   * @param campaignId ID of the campaign
   * @returns Transaction receipt
   */
  async claimAirdrop(campaignId: number) {
    const tx = await this.contract.claimAirdrop(campaignId);
    return await tx.wait();
  }
}
