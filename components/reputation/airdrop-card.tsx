"use client";

import { useState } from "react";
import { useReputationAirdrop } from "@/hooks/contracts/use-reputation-contracts";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";
import { ethers } from "ethers";

export function AirdropCard() {
  const { address, isConnected } = useAccount();
  const { 
    loading, 
    error,
    getCampaign,
    hasClaimed,
    calculateAirdropAmount,
    claimAirdrop
  } = useReputationAirdrop();

  const [campaignId, setCampaignId] = useState("");
  const [campaign, setCampaign] = useState<any>(null);
  const [claimableAmount, setClaimableAmount] = useState<number | null>(null);
  const [hasUserClaimed, setHasUserClaimed] = useState<boolean | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Load campaign details
  const handleLoadCampaign = async () => {
    if (!isConnected || !campaignId) return;
    
    try {
      setIsLoading(true);
      setActionError(null);
      const id = parseInt(campaignId);
      if (isNaN(id)) {
        setActionError("Invalid campaign ID");
        return;
      }
      
      const result = await getCampaign(id);
      setCampaign(result);
      
      // Check if user has claimed and calculate claimable amount
      if (address) {
        const claimed = await hasClaimed(id, address);
        setHasUserClaimed(claimed);
        
        if (!claimed) {
          const amount = await calculateAirdropAmount(id, address);
          setClaimableAmount(amount);
        } else {
          setClaimableAmount(0);
        }
      }
    } catch (err: any) {
      console.error("Error loading campaign:", err);
      setActionError(err.message || "Failed to load campaign");
    } finally {
      setIsLoading(false);
    }
  };

  // Claim airdrop tokens
  const handleClaimAirdrop = async () => {
    if (!isConnected || !campaign) return;
    
    try {
      setIsClaiming(true);
      setActionError(null);
      setActionSuccess(null);
      
      await claimAirdrop(campaign.id);
      
      setActionSuccess("Tokens claimed successfully!");
      setHasUserClaimed(true);
      setClaimableAmount(0);
    } catch (err: any) {
      console.error("Error claiming airdrop:", err);
      setActionError(err.message || "Failed to claim airdrop");
    } finally {
      setIsClaiming(false);
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  // Format token amount with symbol
  const formatTokenAmount = (amount: number, decimals: number = 18) => {
    return ethers.formatUnits(amount.toString(), decimals);
  };

  // Check if campaign is active
  const isCampaignActive = (campaign: any) => {
    const now = Math.floor(Date.now() / 1000);
    return campaign.isActive && now >= campaign.startTime && now <= campaign.endTime;
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reputation-Based Airdrops</CardTitle>
          <CardDescription>
            Connect your wallet to view and claim reputation-gated airdrops
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
        <CardTitle>Reputation-Based Airdrops</CardTitle>
        <CardDescription>
          Claim tokens from airdrops based on your reputation score
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-6">
          <div className="sm:col-span-3">
            <Label htmlFor="campaignId">Campaign ID</Label>
            <Input
              id="campaignId"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
              placeholder="Enter campaign ID"
              className="mt-1"
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleLoadCampaign} 
              disabled={loading || isLoading || !campaignId || !isConnected}
              className="w-full"
            >
              Load Campaign
            </Button>
          </div>
        </div>
        
        {campaign ? (
          <div className="space-y-6 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{campaign.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Campaign ID: {campaign.id}
                  </p>
                </div>
                <Badge variant={isCampaignActive(campaign) ? "default" : "outline"}>
                  {isCampaignActive(campaign) ? "Active" : "Inactive"}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm font-medium">Token</p>
                  <p className="text-sm font-mono">{campaign.tokenAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Remaining Tokens</p>
                  <p className="text-sm">{formatTokenAmount(campaign.remainingTokens)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Start Time</p>
                  <p className="text-sm">{formatDate(campaign.startTime)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">End Time</p>
                  <p className="text-sm">{formatDate(campaign.endTime)}</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-md">
                <h4 className="text-lg font-medium mb-2">Eligibility Requirements</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Minimum Reputation Score:</span>
                    <Badge variant="outline">{campaign.minReputationScore}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Base Token Amount:</span>
                    <Badge variant="outline">{formatTokenAmount(campaign.baseAmount)}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Uses Reputation Multiplier:</span>
                    <Badge variant={campaign.useReputationMultiplier ? "default" : "outline"}>
                      {campaign.useReputationMultiplier ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-lg font-medium mb-2">Your Claim Status</h4>
                {hasUserClaimed !== null ? (
                  <div className="space-y-4">
                    <Alert variant={hasUserClaimed ? "default" : "outline"}>
                      {hasUserClaimed ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          <AlertTitle>Already Claimed</AlertTitle>
                          <AlertDescription>
                            You have already claimed tokens from this campaign.
                          </AlertDescription>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4" />
                          <AlertTitle>Not Claimed</AlertTitle>
                          <AlertDescription>
                            {claimableAmount && claimableAmount > 0 ? (
                              <>You are eligible to claim {formatTokenAmount(claimableAmount)} tokens.</>
                            ) : (
                              <>You are not eligible for this airdrop based on your reputation score.</>
                            )}
                          </AlertDescription>
                        </>
                      )}
                    </Alert>
                    
                    {!hasUserClaimed && claimableAmount && claimableAmount > 0 && isCampaignActive(campaign) && (
                      <Button 
                        onClick={handleClaimAirdrop} 
                        disabled={loading || isClaiming || !isConnected}
                        className="w-full"
                      >
                        {isClaiming ? "Claiming..." : "Claim Tokens"}
                      </Button>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Loading your claim status...</p>
                )}
              </div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Loading campaign data...</p>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Enter a campaign ID and click "Load Campaign" to view details</p>
          </div>
        )}
      </CardContent>
      
      {(actionError || actionSuccess || error) && (
        <CardFooter>
          {actionError && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{actionError}</AlertDescription>
            </Alert>
          )}
          
          {error && !actionError && (
            <Alert variant="destructive" className="w-full">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message || "An error occurred while interacting with the smart contract."}
              </AlertDescription>
            </Alert>
          )}
          
          {actionSuccess && (
            <Alert variant="default" className="w-full">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{actionSuccess}</AlertDescription>
            </Alert>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
