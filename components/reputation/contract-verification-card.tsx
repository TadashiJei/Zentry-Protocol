"use client";

import { useState } from "react";
import { useReputationVerifier, useReputationGate } from "@/hooks/contracts/use-reputation-contracts";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export function ContractVerificationCard() {
  const { address, isConnected } = useAccount();
  const { 
    reputationScore, 
    loading: verifierLoading, 
    error: verifierError,
    loadReputationScore,
    verifyThreshold
  } = useReputationVerifier();
  const { 
    checkAccess, 
    loading: gateLoading, 
    error: gateError 
  } = useReputationGate();

  const [threshold, setThreshold] = useState(70);
  const [gateId, setGateId] = useState("");
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [gateResult, setGateResult] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [checkingGate, setCheckingGate] = useState(false);

  const loading = verifierLoading || gateLoading || verifying || checkingGate;
  const error = verifierError || gateError;

  // Verify reputation threshold
  const handleVerifyThreshold = async () => {
    if (!isConnected || !address) return;
    
    try {
      setVerifying(true);
      const result = await verifyThreshold(threshold);
      setVerificationResult(result);
    } catch (err) {
      console.error("Error verifying threshold:", err);
      setVerificationResult(false);
    } finally {
      setVerifying(false);
    }
  };

  // Check access to a gate
  const handleCheckGate = async () => {
    if (!isConnected || !address || !gateId) return;
    
    try {
      setCheckingGate(true);
      const result = await checkAccess(gateId);
      setGateResult(result);
    } catch (err) {
      console.error("Error checking gate access:", err);
      setGateResult(false);
    } finally {
      setCheckingGate(false);
    }
  };

  // Refresh reputation score
  const handleRefreshScore = () => {
    if (!isConnected || !address) return;
    loadReputationScore();
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>On-Chain Reputation Verification</CardTitle>
          <CardDescription>
            Connect your wallet to verify your reputation on-chain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wallet not connected</AlertTitle>
            <AlertDescription>
              Please connect your wallet to use this feature.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>On-Chain Reputation Verification</CardTitle>
        <CardDescription>
          Verify your reputation score on-chain and check access to gated features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Reputation Score Display */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Your Reputation Score</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefreshScore} 
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
          
          {reputationScore ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Overall</p>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-lg px-3 py-1">
                    {reputationScore.overallScore}
                  </Badge>
                  <Badge variant={reputationScore.isVerified ? "default" : "destructive"}>
                    {reputationScore.isVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Trustworthiness</p>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {reputationScore.trustworthinessScore}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Governance</p>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {reputationScore.governanceScore}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Technical</p>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {reputationScore.technicalScore}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Community</p>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  {reputationScore.communityScore}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm">
                  {reputationScore.timestamp > 0 
                    ? new Date(reputationScore.timestamp * 1000).toLocaleString() 
                    : "Never"}
                </p>
              </div>
            </div>
          ) : loading ? (
            <p className="text-sm text-muted-foreground">Loading reputation data...</p>
          ) : (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No reputation data</AlertTitle>
              <AlertDescription>
                No on-chain reputation data found for your address. This could be because your reputation hasn't been verified yet.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Threshold Verification */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Verify Reputation Threshold</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="sm:col-span-2">
              <Label htmlFor="threshold">Minimum Reputation Score</Label>
              <Input
                id="threshold"
                type="number"
                min="0"
                max="100"
                value={threshold}
                onChange={(e) => setThreshold(parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleVerifyThreshold} 
                disabled={loading || !isConnected}
                className="w-full"
              >
                Verify
              </Button>
            </div>
          </div>
          
          {verificationResult !== null && (
            <Alert variant={verificationResult ? "default" : "destructive"}>
              {verificationResult ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Verification Successful</AlertTitle>
                  <AlertDescription>
                    Your reputation score meets or exceeds the threshold of {threshold}.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Verification Failed</AlertTitle>
                  <AlertDescription>
                    Your reputation score does not meet the threshold of {threshold}.
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}
        </div>

        {/* Gate Access Check */}
        <div className="space-y-4 pt-4 border-t">
          <h3 className="text-lg font-medium">Check Gate Access</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            <div className="sm:col-span-2">
              <Label htmlFor="gateId">Gate ID</Label>
              <Input
                id="gateId"
                value={gateId}
                onChange={(e) => setGateId(e.target.value)}
                placeholder="Enter gate ID"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleCheckGate} 
                disabled={loading || !gateId || !isConnected}
                className="w-full"
              >
                Check Access
              </Button>
            </div>
          </div>
          
          {gateResult !== null && (
            <Alert variant={gateResult ? "default" : "destructive"}>
              {gateResult ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Access Granted</AlertTitle>
                  <AlertDescription>
                    You have access to this gated feature.
                  </AlertDescription>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Access Denied</AlertTitle>
                  <AlertDescription>
                    You do not have access to this gated feature.
                  </AlertDescription>
                </>
              )}
            </Alert>
          )}
        </div>
      </CardContent>
      
      {error && (
        <CardFooter>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message || "An error occurred while interacting with the smart contract."}
            </AlertDescription>
          </Alert>
        </CardFooter>
      )}
    </Card>
  );
}
