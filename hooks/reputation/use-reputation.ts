/**
 * useReputation Hook
 * 
 * This hook provides access to the reputation system functionality.
 */

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { RivalzService, ReputationScore, ReputationProfile } from '@/lib/services/rivalz';

export function useReputation() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reputationProfile, setReputationProfile] = useState<ReputationProfile | null>(null);
  const [reputationScore, setReputationScore] = useState<ReputationScore | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  // Initialize Rivalz service
  const rivalzService = new RivalzService();

  // Fetch reputation data when wallet is connected
  useEffect(() => {
    if (isConnected && address) {
      fetchReputationData();
    } else {
      // Reset state when wallet disconnects
      setReputationProfile(null);
      setReputationScore(null);
      setActivities([]);
      setRecommendations([]);
      setError(null);
    }
  }, [isConnected, address]);

  // Fetch reputation data
  const fetchReputationData = async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const { profile, activities, recommendations } = await rivalzService.initializeReputationSystem(address);
      
      setReputationProfile(profile);
      setReputationScore(profile.reputationScore);
      setActivities(activities);
      setRecommendations(recommendations);
    } catch (err) {
      console.error('Error fetching reputation data:', err);
      setError('Failed to fetch reputation data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update reputation score
  const updateReputationScore = async () => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const updatedScore = await rivalzService.updateReputationScore(address);
      setReputationScore(updatedScore);
      
      // Update the profile with the new score
      if (reputationProfile) {
        setReputationProfile({
          ...reputationProfile,
          reputationScore: updatedScore,
          lastUpdated: new Date().toISOString(),
        });
      }

      return updatedScore;
    } catch (err) {
      console.error('Error updating reputation score:', err);
      setError('Failed to update reputation score. Please try again later.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify identity
  const verifyIdentity = async (source: string, identifier: string) => {
    if (!address) return false;

    setIsLoading(true);
    setError(null);

    try {
      const success = await rivalzService.verifyIdentity(address, source, identifier);
      
      if (success && reputationProfile) {
        // Update the identities list with the new verification
        const updatedIdentities = reputationProfile.identities.map(identity => 
          identity.source === source 
            ? { ...identity, verified: true, verifiedAt: new Date().toISOString() } 
            : identity
        );

        setReputationProfile({
          ...reputationProfile,
          identities: updatedIdentities,
          lastUpdated: new Date().toISOString(),
        });

        // Refresh reputation score after verification
        await updateReputationScore();
      }

      return success;
    } catch (err) {
      console.error(`Error verifying ${source} identity:`, err);
      setError(`Failed to verify ${source} identity. Please try again later.`);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Generate verifiable credential
  const generateVerifiableCredential = async () => {
    if (!address) return null;

    setIsLoading(true);
    setError(null);

    try {
      const credential = await rivalzService.generateVerifiableCredential(address);
      return credential;
    } catch (err) {
      console.error('Error generating verifiable credential:', err);
      setError('Failed to generate verifiable credential. Please try again later.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    reputationProfile,
    reputationScore,
    activities,
    recommendations,
    fetchReputationData,
    updateReputationScore,
    verifyIdentity,
    generateVerifiableCredential,
  };
}
