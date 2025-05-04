"use client";

import { useAccount } from "wagmi";
import { WalletConnectButton } from "./connect-button";
import { WalletInfo } from "./wallet-info";
import { WalletSelector } from "./wallet-selector";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function WalletDashboard() {
  const { isConnected } = useAccount();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Wallet</h2>
        <div className="flex items-center gap-2">
          {isConnected && <WalletSelector />}
          <WalletConnectButton />
        </div>
      </div>

      {isConnected ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <WalletInfo />
          
          {/* Reputation Score Card - Placeholder for future implementation */}
          <Card>
            <CardHeader>
              <CardTitle>Reputation Score</CardTitle>
              <CardDescription>Your current reputation metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-4">
                <div className="relative h-24 w-24 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">85</span>
                  </div>
                  <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-muted-foreground/20 stroke-current"
                      strokeWidth="8"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary stroke-current"
                      strokeWidth="8"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray="251.2"
                      strokeDashoffset="37.68"
                    />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">Excellent</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Trustworthiness</span>
                  <span className="font-medium">92/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Governance Influence</span>
                  <span className="font-medium">78/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Technical Expertise</span>
                  <span className="font-medium">85/100</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Identity Verification Card - Placeholder for future implementation */}
          <Card>
            <CardHeader>
              <CardTitle>Identity Verification</CardTitle>
              <CardDescription>Linked accounts and verification status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>GitHub</span>
                  </div>
                  <span className="text-sm text-green-500">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span>Twitter/X</span>
                  </div>
                  <span className="text-sm text-green-500">Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>LinkedIn</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Not Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                    <span>StackOverflow</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Not Verified</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" x2="6" y1="1" y2="5" />
              <line x1="10" x2="10" y1="1" y2="5" />
              <line x1="14" x2="14" y1="1" y2="5" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Connect your wallet to access your reputation profile and identity verification features.
          </p>
          <WalletConnectButton />
        </div>
      )}
    </div>
  );
}
