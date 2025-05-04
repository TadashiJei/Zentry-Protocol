/**
 * Reputation Contract Hooks
 * 
 * This file provides React hooks for interacting with the reputation system smart contracts.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, usePublicClient, useWalletClient, useChainId } from 'wagmi';
import { ethers } from 'ethers';
import {
  ReputationVerifierInterface,
  ReputationGateInterface,
  ReputationVotingInterface,
  ReputationAirdropInterface
} from '@/lib/web3/contracts';

/**
 * Hook for interacting with the ReputationVerifier contract
 */
export function useReputationVerifier() {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [reputationScore, setReputationScore] = useState<{
    overallScore: number;
    trustworthinessScore: number;
    governanceScore: number;
    technicalScore: number;
    communityScore: number;
    timestamp: number;
    proofHash: string;
    isVerified: boolean;
  } | null>(null);

  // Create provider and signer
  const provider = useMemo(() => {
    if (!publicClient) return null;
    // Create ethers provider from publicClient
    return new ethers.BrowserProvider(publicClient as any);
  }, [publicClient]);

  const signer = useMemo(() => {
    if (!walletClient || !provider) return null;
    // Create ethers signer from walletClient
    return provider.getSigner(address);
  }, [walletClient, provider, address]);

  // Create contract interface
  const verifierContract = useMemo(() => {
    if (!provider || !chainId) return null;
    try {
      return new ReputationVerifierInterface(chainId, provider, signer);
    } catch (err) {
      console.error('Failed to create ReputationVerifier contract:', err);
      return null;
    }
  }, [provider, signer, chainId]);

  // Load reputation score
  const loadReputationScore = useCallback(async (userAddress?: string) => {
    if (!verifierContract) return null;
    try {
      setLoading(true);
      setError(null);
      const targetAddress = userAddress || address;
      if (!targetAddress) throw new Error('No address provided');
      
      const score = await verifierContract.getReputationScore(targetAddress);
      setReputationScore(score);
      return score;
    } catch (err: any) {
      console.error('Failed to load reputation score:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [verifierContract, address]);

  // Verify reputation threshold
  const verifyThreshold = useCallback(async (threshold: number, userAddress?: string) => {
    if (!verifierContract) return false;
    try {
      setLoading(true);
      setError(null);
      const targetAddress = userAddress || address;
      if (!targetAddress) throw new Error('No address provided');
      
      return await verifierContract.verifyReputationThreshold(targetAddress, threshold);
    } catch (err: any) {
      console.error('Failed to verify reputation threshold:', err);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [verifierContract, address]);

  // Verify component threshold
  const verifyComponentThreshold = useCallback(async (
    componentType: number,
    threshold: number,
    userAddress?: string
  ) => {
    if (!verifierContract) return false;
    try {
      setLoading(true);
      setError(null);
      const targetAddress = userAddress || address;
      if (!targetAddress) throw new Error('No address provided');
      
      return await verifierContract.verifyComponentThreshold(targetAddress, componentType, threshold);
    } catch (err: any) {
      console.error('Failed to verify component threshold:', err);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [verifierContract, address]);

  // Update reputation score (for verifiers only)
  const updateReputationScore = useCallback(async (
    userAddress: string,
    scores: {
      overallScore: number;
      trustworthinessScore: number;
      governanceScore: number;
      technicalScore: number;
      communityScore: number;
    },
    proofHash: string
  ) => {
    if (!verifierContract || !signer) throw new Error('Contract or signer not available');
    try {
      setLoading(true);
      setError(null);
      
      const receipt = await verifierContract.updateReputationScore(userAddress, scores, proofHash);
      return receipt;
    } catch (err: any) {
      console.error('Failed to update reputation score:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [verifierContract, signer]);

  // Load score on mount if address is available
  useEffect(() => {
    if (address && verifierContract && !reputationScore) {
      loadReputationScore();
    }
  }, [address, verifierContract, reputationScore, loadReputationScore]);

  return {
    reputationScore,
    loading,
    error,
    loadReputationScore,
    verifyThreshold,
    verifyComponentThreshold,
    updateReputationScore,
    contract: verifierContract,
  };
}

/**
 * Hook for interacting with the ReputationGate contract
 */
export function useReputationGate() {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Create provider and signer
  const provider = useMemo(() => {
    if (!publicClient) return null;
    return new ethers.BrowserProvider(publicClient as any);
  }, [publicClient]);

  const signer = useMemo(() => {
    if (!walletClient || !provider) return null;
    return provider.getSigner(address);
  }, [walletClient, provider, address]);

  // Create contract interface
  const gateContract = useMemo(() => {
    if (!provider || !chainId) return null;
    try {
      return new ReputationGateInterface(chainId, provider, signer);
    } catch (err) {
      console.error('Failed to create ReputationGate contract:', err);
      return null;
    }
  }, [provider, signer, chainId]);

  // Check access to a gate
  const checkAccess = useCallback(async (gateId: string, userAddress?: string) => {
    if (!gateContract) return false;
    try {
      setLoading(true);
      setError(null);
      const targetAddress = userAddress || address;
      if (!targetAddress) throw new Error('No address provided');
      
      return await gateContract.checkAccess(targetAddress, gateId);
    } catch (err: any) {
      console.error('Failed to check gate access:', err);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [gateContract, address]);

  // Get gate details
  const getGateDetails = useCallback(async (gateId: string) => {
    if (!gateContract) return null;
    try {
      setLoading(true);
      setError(null);
      
      return await gateContract.getGateDetails(gateId);
    } catch (err: any) {
      console.error('Failed to get gate details:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [gateContract]);

  // Create a new gate (owner only)
  const createGate = useCallback(async (
    name: string,
    overallThreshold: number,
    componentType: number,
    componentThreshold: number
  ) => {
    if (!gateContract || !signer) throw new Error('Contract or signer not available');
    try {
      setLoading(true);
      setError(null);
      
      const result = await gateContract.createGate(
        name,
        overallThreshold,
        componentType,
        componentThreshold
      );
      return result;
    } catch (err: any) {
      console.error('Failed to create gate:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [gateContract, signer]);

  return {
    loading,
    error,
    checkAccess,
    getGateDetails,
    createGate,
    contract: gateContract,
  };
}

/**
 * Hook for interacting with the ReputationVoting contract
 */
export function useReputationVoting() {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Create provider and signer
  const provider = useMemo(() => {
    if (!publicClient) return null;
    return new ethers.BrowserProvider(publicClient as any);
  }, [publicClient]);

  const signer = useMemo(() => {
    if (!walletClient || !provider) return null;
    return provider.getSigner(address);
  }, [walletClient, provider, address]);

  // Create contract interface
  const votingContract = useMemo(() => {
    if (!provider || !chainId) return null;
    try {
      return new ReputationVotingInterface(chainId, provider, signer);
    } catch (err) {
      console.error('Failed to create ReputationVoting contract:', err);
      return null;
    }
  }, [provider, signer, chainId]);

  // Create a new proposal
  const createProposal = useCallback(async (
    title: string,
    description: string,
    duration: number
  ) => {
    if (!votingContract || !signer) throw new Error('Contract or signer not available');
    try {
      setLoading(true);
      setError(null);
      
      const result = await votingContract.createProposal(title, description, duration);
      return result;
    } catch (err: any) {
      console.error('Failed to create proposal:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [votingContract, signer]);

  // Cast a vote on a proposal
  const castVote = useCallback(async (proposalId: number, support: boolean) => {
    if (!votingContract || !signer) throw new Error('Contract or signer not available');
    try {
      setLoading(true);
      setError(null);
      
      const receipt = await votingContract.castVote(proposalId, support);
      return receipt;
    } catch (err: any) {
      console.error('Failed to cast vote:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [votingContract, signer]);

  // Get proposal details
  const getProposal = useCallback(async (proposalId: number) => {
    if (!votingContract) return null;
    try {
      setLoading(true);
      setError(null);
      
      return await votingContract.getProposal(proposalId);
    } catch (err: any) {
      console.error('Failed to get proposal:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [votingContract]);

  // Calculate vote weight
  const calculateVoteWeight = useCallback(async (userAddress?: string) => {
    if (!votingContract) return 0;
    try {
      setLoading(true);
      setError(null);
      const targetAddress = userAddress || address;
      if (!targetAddress) throw new Error('No address provided');
      
      return await votingContract.calculateVoteWeight(targetAddress);
    } catch (err: any) {
      console.error('Failed to calculate vote weight:', err);
      setError(err);
      return 0;
    } finally {
      setLoading(false);
    }
  }, [votingContract, address]);

  return {
    loading,
    error,
    createProposal,
    castVote,
    getProposal,
    calculateVoteWeight,
    contract: votingContract,
  };
}

/**
 * Hook for interacting with the ReputationAirdrop contract
 */
export function useReputationAirdrop() {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Create provider and signer
  const provider = useMemo(() => {
    if (!publicClient) return null;
    return new ethers.BrowserProvider(publicClient as any);
  }, [publicClient]);

  const signer = useMemo(() => {
    if (!walletClient || !provider) return null;
    return provider.getSigner(address);
  }, [walletClient, provider, address]);

  // Create contract interface
  const airdropContract = useMemo(() => {
    if (!provider || !chainId) return null;
    try {
      return new ReputationAirdropInterface(chainId, provider, signer);
    } catch (err) {
      console.error('Failed to create ReputationAirdrop contract:', err);
      return null;
    }
  }, [provider, signer, chainId]);

  // Get campaign details
  const getCampaign = useCallback(async (campaignId: number) => {
    if (!airdropContract) return null;
    try {
      setLoading(true);
      setError(null);
      
      return await airdropContract.getCampaign(campaignId);
    } catch (err: any) {
      console.error('Failed to get campaign:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [airdropContract]);

  // Check if user has claimed from a campaign
  const hasClaimed = useCallback(async (campaignId: number, userAddress?: string) => {
    if (!airdropContract) return false;
    try {
      setLoading(true);
      setError(null);
      const targetAddress = userAddress || address;
      if (!targetAddress) throw new Error('No address provided');
      
      return await airdropContract.hasClaimed(campaignId, targetAddress);
    } catch (err: any) {
      console.error('Failed to check if claimed:', err);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [airdropContract, address]);

  // Calculate airdrop amount
  const calculateAirdropAmount = useCallback(async (campaignId: number, userAddress?: string) => {
    if (!airdropContract) return 0;
    try {
      setLoading(true);
      setError(null);
      const targetAddress = userAddress || address;
      if (!targetAddress) throw new Error('No address provided');
      
      return await airdropContract.calculateAirdropAmount(campaignId, targetAddress);
    } catch (err: any) {
      console.error('Failed to calculate airdrop amount:', err);
      setError(err);
      return 0;
    } finally {
      setLoading(false);
    }
  }, [airdropContract, address]);

  // Claim airdrop
  const claimAirdrop = useCallback(async (campaignId: number) => {
    if (!airdropContract || !signer) throw new Error('Contract or signer not available');
    try {
      setLoading(true);
      setError(null);
      
      const receipt = await airdropContract.claimAirdrop(campaignId);
      return receipt;
    } catch (err: any) {
      console.error('Failed to claim airdrop:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [airdropContract, signer]);

  return {
    loading,
    error,
    getCampaign,
    hasClaimed,
    calculateAirdropAmount,
    claimAirdrop,
    contract: airdropContract,
  };
}
