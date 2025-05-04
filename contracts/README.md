# Zentry Smart Contract Integration

This directory contains the smart contracts for the Zentry AI-Powered Reputation & Identity System. These contracts enable on-chain verification of reputation scores and provide various use cases for reputation-based access control, governance, and token distribution.

## Contract Overview

### ReputationVerifier.sol

The core contract that stores and verifies reputation scores on-chain.

**Key Features:**
- Store reputation scores with multiple components (trustworthiness, governance, technical, community)
- Verify if a user's reputation meets a minimum threshold
- Cryptographic proof verification for score authenticity
- Access control for authorized verifiers

### ReputationGate.sol

A contract for gating access to features based on reputation scores.

**Key Features:**
- Create gates with specific reputation requirements
- Check if a user passes a gate's requirements
- Support for both overall and component-specific thresholds
- Gate management (create, update, activate/deactivate)

### ReputationVoting.sol

A contract for reputation-weighted governance voting.

**Key Features:**
- Create governance proposals
- Cast votes with weight based on reputation scores
- Configurable weighting for different reputation components
- Proposal execution based on voting results

### ReputationAirdrop.sol

A contract for Sybil-resistant token airdrops based on reputation scores.

**Key Features:**
- Create airdrop campaigns with reputation requirements
- Distribute tokens based on reputation scores
- Optional reputation multiplier for token amounts
- Claim verification to prevent double-claiming

## Integration with Rivalz

These contracts integrate with the Rivalz platform through the following mechanism:

1. Reputation data is computed off-chain using Rivalz's Autonomous Decentralized Compute Stack (ADCS)
2. The data is stored in Rivalz's decentralized storage (rD)
3. Cryptographic proofs are generated to verify the authenticity of the data
4. Authorized verifiers submit the reputation scores to the ReputationVerifier contract
5. Other contracts query the ReputationVerifier to access the verified scores

## Frontend Integration

The frontend interacts with these contracts through the following components:

- `lib/web3/contracts.ts`: TypeScript interfaces for the contracts
- `hooks/contracts/use-reputation-contracts.ts`: React hooks for contract interaction
- `components/reputation/contract-verification-card.tsx`: UI for reputation verification
- `components/reputation/voting-card.tsx`: UI for reputation-based governance
- `components/reputation/airdrop-card.tsx`: UI for reputation-based airdrops
- `app/contracts/page.tsx`: Page that combines all contract interactions

## Deployment

These contracts are designed to be deployed on EVM-compatible networks such as Ethereum, Polygon, Arbitrum, or other L2 solutions. The contract addresses should be configured in the `lib/web3/contracts.ts` file after deployment.

## Security Considerations

- The contracts implement access control to restrict sensitive functions to authorized addresses
- Reputation updates require cryptographic proofs to prevent unauthorized modifications
- Input validation is performed to prevent invalid data
- The contracts follow the checks-effects-interactions pattern to prevent reentrancy attacks

## Future Enhancements

- Integration with more complex governance mechanisms (e.g., quadratic voting)
- Support for reputation delegation
- Time-weighted reputation scoring
- Integration with decentralized identity solutions (DIDs)
- Cross-chain reputation verification
