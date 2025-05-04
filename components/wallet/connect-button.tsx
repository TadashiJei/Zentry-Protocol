"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useDisconnect, useConnect } from "wagmi";
import { useState, useEffect } from "react";


export function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Ensure we're running on the client
  useEffect(() => {
    setIsClient(true);
  }, []);
  
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

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Handle connect wallet
  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Use the first available connector
      const availableConnector = connectors.find(c => c.id === 'injected');
      if (availableConnector) {
        await connect({ connector: availableConnector });
      } else {
        console.error("No injected wallet found. Please install MetaMask or another wallet.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle disconnect wallet
  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await disconnect();
    } catch (error) {
      console.error("Disconnect error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isConnected ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleDisconnect}
            className="font-medium"
          >
            {formatAddress(address || "")}
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleDisconnect}
            disabled={isLoading}
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
          disabled={isLoading}
          className="font-medium"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
