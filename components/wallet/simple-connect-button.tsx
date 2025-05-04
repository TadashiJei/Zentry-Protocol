"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function SimpleConnectButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're running on the client
  useEffect(() => {
    setIsClient(true);
    // Check if already connected
    checkConnection();
  }, []);

  // Check if wallet is already connected
  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  };

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Handle connect wallet
  const handleConnect = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert("Please install MetaMask or another Ethereum wallet");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Handle disconnect wallet
  const handleDisconnect = async () => {
    setAccount(null);
  };

  // If not on client yet, render a placeholder
  if (!isClient) {
    return (
      <Button
        disabled={true}
        className="font-medium"
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <div>
      {account ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="font-medium"
          >
            {formatAddress(account)}
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDisconnect}
            disabled={isConnecting}
            size="icon"
          >
            <span className="sr-only">Disconnect wallet</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" x2="6" y1="1" y2="5" />
              <line x1="10" x2="10" y1="1" y2="5" />
              <line x1="14" x2="14" y1="1" y2="5" />
            </svg>
          </Button>
        </div>
      ) : (
        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="font-bold bg-[#4AFA7B] text-black hover:bg-[#3DE96A] border-0"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
}

// Add TypeScript declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
