"use client";

import { useState } from "react";
import { useReputation } from "@/hooks/reputation/use-reputation";
import { ReputationScoreCard } from "@/components/reputation/reputation-score-card";
import { IdentityVerificationCard } from "@/components/reputation/identity-verification-card";
import { OnChainActivityCard } from "@/components/reputation/on-chain-activity-card";
import { ContractVerificationCard } from "@/components/reputation/contract-verification-card";
import { WalletConnectButton } from "@/components/wallet/connect-button";
import { useAccount } from "wagmi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ReputationDashboard() {
  const { address, isConnected } = useAccount();
  const {
    isLoading,
    error,
    reputationProfile,
    reputationScore,
    activities,
    recommendations,
    fetchReputationData,
    updateReputationScore,
    verifyIdentity,
    generateVerifiableCredential,
  } = useReputation();

  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Handle reputation score update
  const handleUpdateScore = async () => {
    if (!isConnected) return;
    
    setIsUpdating(true);
    try {
      await updateReputationScore();
    } catch (error) {
      console.error("Error updating reputation score:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle credential generation
  const handleGenerateCredential = async () => {
    if (!isConnected) return;
    
    try {
      const credential = await generateVerifiableCredential();
      if (credential) {
        // In a real app, you would offer to download the credential
        console.log("Generated credential:", credential);
        alert("Credential generated successfully!");
      }
    } catch (error) {
      console.error("Error generating credential:", error);
    }
  };

  if (!isConnected) {
    return (
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
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Reputation Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleUpdateScore}
            disabled={isLoading || isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Score"}
          </Button>
          <Button
            variant="outline"
            onClick={handleGenerateCredential}
            disabled={isLoading}
          >
            Export Credential
          </Button>
          <WalletConnectButton />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <>
                <Skeleton className="h-[350px] w-full" />
                <Skeleton className="h-[350px] w-full" />
              </>
            ) : (
              <>
                <ReputationScoreCard 
                  overallScore={reputationScore?.overallScore || 0}
                  trustworthinessScore={reputationScore?.trustworthinessScore || 0}
                  governanceScore={reputationScore?.governanceScore || 0}
                  technicalScore={reputationScore?.technicalScore || 0}
                  communityScore={reputationScore?.communityScore || 0}
                />
                
                <IdentityVerificationCard />
              </>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          {isLoading ? (
            <Skeleton className="h-[500px] w-full" />
          ) : (
            <OnChainActivityCard />
          )}
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          {isLoading ? (
            <Skeleton className="h-[400px] w-full" />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recommendations?.map((recommendation, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                      <Badge variant={recommendation.potentialImpact === 'high' ? 'default' : 'secondary'}>
                        {recommendation.potentialImpact.charAt(0).toUpperCase() + recommendation.potentialImpact.slice(1)} Impact
                      </Badge>
                    </div>
                    <CardDescription>{recommendation.category.charAt(0).toUpperCase() + recommendation.category.slice(1)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{recommendation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="contracts" className="space-y-4">
          {isLoading ? (
            <Skeleton className="h-[500px] w-full" />
          ) : (
            <ContractVerificationCard />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
