/**
 * Rivalz Services Index
 * 
 * This file exports all the Rivalz services and provides a unified interface
 * for interacting with the Rivalz platform.
 */

import { ADCSService } from './adcs-service';
import { RCService } from './rc-service';
import { RDService } from './rd-service';
import { RivalzClientService } from './rivalz-client-service';

// Export all services
export { ADCSService } from './adcs-service';
export { RCService } from './rc-service';
export { RDService } from './rd-service';
export { RivalzClientService } from './rivalz-client-service';

// Export types
// Export types
export type { OnChainActivity, DaoActivity, DefiActivity, NftActivity } from './adcs-service';
export type { ReputationScore } from './rc-service';
export type { IdentityVerification, ReputationProfile } from './rd-service';

// Import types for internal use
import { OnChainActivity } from './adcs-service';
import { ReputationScore } from './rc-service';
import { ReputationProfile } from './rd-service';

/**
 * Rivalz Service
 * 
 * A unified service that combines all Rivalz services for easier access.
 */
export class RivalzService {
  public adcs: ADCSService;
  public rc: RCService;
  public rd: RDService;
  public client: RivalzClientService;
  private useRealClient: boolean;

  constructor(useRealClient = false) {
    this.adcs = new ADCSService();
    this.rc = new RCService();
    this.rd = new RDService();
    this.client = new RivalzClientService();
    this.useRealClient = useRealClient;
  }

  /**
   * Initialize the reputation system for a user
   * This method fetches data, calculates scores, and stores the results
   */
  async initializeReputationSystem(address: string): Promise<{
    profile: ReputationProfile;
    activities: OnChainActivity[];
    recommendations: any[];
  }> {
    try {
      // Use the real client implementation if requested
      if (this.useRealClient) {
        return await this.client.initializeReputationSystem(address);
      }
      
      // Otherwise, use the mock implementation
      // 1. Fetch on-chain activities
      const activities = await this.adcs.getOnChainActivities(address);
      
      // 2. Fetch off-chain social data
      const socialData = await this.adcs.getOffChainSocialData(address);
      
      // 3. Calculate reputation score
      const reputationScore = await this.rc.calculateReputationScore(address);
      
      // 4. Get reputation factors
      const reputationFactors = await this.rc.getReputationFactors(address);
      
      // 5. Get improvement recommendations
      const recommendations = await this.rc.getReputationRecommendations(address);
      
      // 6. Store reputation score
      const storageResult = await this.rd.storeReputationScore(address, reputationScore);
      
      // 7. Get or create reputation profile
      let profile = await this.rd.getReputationProfile(address);
      
      if (!profile) {
        // Create a new profile if one doesn't exist
        profile = {
          address,
          identities: [],
          reputationScore,
          proofHash: storageResult.proofHash,
          lastUpdated: new Date().toISOString(),
        };
      }
      
      return {
        profile,
        activities,
        recommendations,
      };
    } catch (error) {
      console.error('Error initializing reputation system:', error);
      throw error;
    }
  }

  /**
   * Update reputation score for a user
   */
  async updateReputationScore(address: string): Promise<ReputationScore> {
    try {
      // Use the real client implementation if requested
      if (this.useRealClient) {
        return await this.client.updateReputationScore(address);
      }
      
      // Otherwise, use the mock implementation
      // 1. Calculate new reputation score
      const reputationScore = await this.rc.calculateReputationScore(address);
      
      // 2. Store updated score
      await this.rd.storeReputationScore(address, reputationScore);
      
      return reputationScore;
    } catch (error) {
      console.error('Error updating reputation score:', error);
      throw error;
    }
  }

  /**
   * Verify a user's identity for a given source
   */
  async verifyIdentity(address: string, source: string, identifier: string): Promise<boolean> {
    try {
      // Use the real client implementation if requested
      if (this.useRealClient) {
        return await this.client.verifyIdentity(address, source, identifier);
      }
      
      // Otherwise, use the mock implementation
      const result = await this.rd.verifyIdentity(address, source, identifier);
      return result.success;
    } catch (error) {
      console.error('Error verifying identity:', error);
      return false;
    }
  }

  /**
   * Generate a verifiable credential for a user's reputation
   */
  async generateVerifiableCredential(address: string): Promise<string | null> {
    try {
      // Use the real client implementation if requested
      if (this.useRealClient) {
        return await this.client.generateVerifiableCredential(address);
      }
      
      // Otherwise, use the mock implementation
      const result = await this.rd.exportReputationCredential(address);
      return result?.credential || null;
    } catch (error) {
      console.error('Error generating verifiable credential:', error);
      return null;
    }
  }

  /**
   * Get AI-powered explanation for reputation score
   */
  async getReputationExplanation(address: string, question: string): Promise<string> {
    try {
      // Use the real client implementation if requested
      if (this.useRealClient) {
        return await this.client.getReputationExplanation(address, question);
      }
      
      // Otherwise, return a mock explanation
      return `Here's an explanation for your question about ${address}'s reputation: ${question}

The reputation score is calculated based on on-chain activity and off-chain social signals. The user has demonstrated consistent positive behavior in DeFi protocols and active participation in DAO governance.`;
    } catch (error) {
      console.error('Error getting reputation explanation:', error);
      return 'Error getting explanation. Please try again later.';
    }
  }
}
