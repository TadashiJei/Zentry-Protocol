"use client";

import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface ConnectedWallet {
  id: string;
  name: string;
  address: string;
}

export function WalletSelector() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [connectedWallets, setConnectedWallets] = useState<ConnectedWallet[]>([]);

  // Simulate multiple connected wallets for demo purposes
  // In a real app, you would track actual connected wallets
  useEffect(() => {
    if (isConnected && address && connector) {
      // Check if this wallet is already in our list
      const exists = connectedWallets.some(wallet => wallet.address === address);
      
      if (!exists) {
        setConnectedWallets(prev => [
          ...prev,
          {
            id: `${connector.id}-${address}`, // Make ID unique by combining connector ID and address
            name: connector.name,
            address: address,
          },
        ]);
      }
    }
  }, [isConnected, address, connector]);

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected || connectedWallets.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Switch Wallet</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Connected Wallets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {connectedWallets.map((wallet) => (
          <DropdownMenuItem
            key={wallet.address}
            className={`flex justify-between items-center ${wallet.address === address ? 'bg-muted' : ''}`}
            onClick={() => {
              // In a real implementation, you would switch to this wallet
              // This is a simplified example
              console.log(`Switching to wallet: ${wallet.address}`);
            }}
          >
            <div className="flex flex-col">
              <span>{wallet.name}</span>
              <span className="text-xs text-muted-foreground">
                {formatAddress(wallet.address)}
              </span>
            </div>
            {wallet.address === address && (
              <span className="text-xs text-primary">Active</span>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            // Disconnect current wallet
            disconnect();
          }}
          className="text-destructive focus:text-destructive"
        >
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
