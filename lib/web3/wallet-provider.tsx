"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { type Chain, mainnet, sepolia, polygon, arbitrum } from 'wagmi/chains';
import { ReactNode, useEffect, useState } from 'react';

// Define supported chains
const chains: [Chain, ...Chain[]] = [mainnet, sepolia, polygon, arbitrum];

// Get projectId from environment variable
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Create wagmi config using the web3modal helper
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata: {
    name: 'Zentry',
    description: 'AI-Powered Reputation & Identity System',
    url: 'https://zentry.hacktivators.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  },
});

// Create a client for React Query
const queryClient = new QueryClient();

// Initialize Web3Modal on the client side only
let initialized = false;

function initializeWeb3Modal() {
  if (typeof window !== 'undefined' && !initialized) {
    createWeb3Modal({
      wagmiConfig,
      projectId,
      themeMode: 'dark',
      themeVariables: {
        '--w3m-accent': '#7C3AED', // Purple accent color
        '--w3m-border-radius-master': '8px',
      },
    });
    initialized = true;
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Ensure provider is only rendered on the client and Web3Modal is initialized
  useEffect(() => {
    initializeWeb3Modal();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
