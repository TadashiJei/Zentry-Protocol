# Zentry: AI-Powered Reputation & Identity System

<div align="center">
  <img src="public/logo.svg" alt="Zentry Logo" width="200" />
  <h3>Decentralized Reputation for Web3</h3>
  <p>A comprehensive platform for on-chain reputation verification and identity management</p>
  
  [![Website](https://img.shields.io/badge/Website-zentry.hacktivators.com-4AFA7B?style=for-the-badge)](https://zentry.hacktivators.com)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
</div>

## 🌟 Overview

Zentry is a cutting-edge AI-powered reputation and identity system designed for the Web3 ecosystem. It provides a comprehensive solution for verifying on-chain reputation, managing digital identity, and enabling reputation-based access to various decentralized applications and services.

The platform leverages artificial intelligence to analyze on-chain activities, social connections, and verified credentials to generate a holistic reputation score that can be used for various use cases, including access control, governance voting, airdrops, and lending.

## ✨ Key Features

### 🔐 Reputation Verification
- **On-chain Verification**: Cryptographically verify reputation scores on the blockchain
- **Smart Contract Integration**: Use reputation scores for access control and other on-chain activities
- **Reputation Components**: Detailed breakdown of reputation into Trustworthiness, Governance Influence, and Technical Expertise

### 👤 Identity Management
- **Account Linking**: Connect and verify multiple social accounts (GitHub, Twitter, LinkedIn, etc.)
- **Sybil Resistance**: Prevent fake accounts and identity fraud
- **Privacy-Preserving**: Control what aspects of your identity are shared

### 💼 Use Cases
- **ReputationGate**: Control access to exclusive content or communities based on reputation
- **ReputationVoting**: Weight governance votes based on reputation scores
- **ReputationAirdrop**: Distribute tokens to users with verified reputation
- **ReputationLending**: Provide under-collateralized loans based on reputation

### 📊 Dashboard
- **Reputation Metrics**: View and track your reputation score and components
- **Activity Monitoring**: Track your on-chain activities and verification status
- **Wallet Integration**: Seamlessly connect your Web3 wallet

## 🛠️ Technology Stack

### Frontend
- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Strongly typed JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI components
- **Wagmi**: React hooks for Ethereum
- **Web3Modal**: Wallet connection library

### Smart Contracts
- **Solidity**: Smart contract programming language
- **Hardhat**: Ethereum development environment
- **Ethers.js**: Ethereum library and wallet implementation

### Backend & APIs
- **Rivalz API**: AI-powered reputation scoring and analysis
- **Node.js**: JavaScript runtime for the backend
- **TanStack Query**: Data fetching and caching library

## 📋 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Yarn or npm
- MetaMask or another Ethereum wallet

### Installation

1. Clone the repository
```bash
git clone https://github.com/hacktivators/zentry.git
cd zentry
```

2. Install dependencies
```bash
yarn install
# or
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Edit `.env.local` with your API keys and configuration.

4. Run the development server
```bash
yarn dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Deployment

Zentry can be deployed to various platforms:

### Vercel (Recommended)
```bash
vercel
```

### Traditional Hosting
```bash
yarn build
yarn start
```

## 🧪 Testing

### Smart Contracts
```bash
cd contracts
npx hardhat test
```

### Frontend
```bash
yarn test
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

- **TadashiJei** - Lead Developer - [GitHub](https://github.com/tadashijei)

## 🔗 Official Links

- **Website**: [zentry.hacktivators.com](https://zentry.hacktivators.com)
- **Documentation**: [docs.zentry.hacktivators.com](https://docs.zentry.hacktivators.com)
- **GitHub**: [github.com/hacktivators/zentry](https://github.com/hacktivators/zentry)

## 📞 Contact

For inquiries, please contact us at [contact@hacktivators.com](mailto:contact@hacktivators.com)

---

<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/tadashijei">TadashiJei</a> and the Hacktivators team</p>
  <p>© 2025 Hacktivators. All rights reserved.</p>
</div>
