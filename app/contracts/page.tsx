import { Metadata } from "next";
import { ContractVerificationCard } from "@/components/reputation/contract-verification-card";
import { VotingCard } from "@/components/reputation/voting-card";
import { AirdropCard } from "@/components/reputation/airdrop-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Smart Contracts | Zentry",
  description: "Interact with reputation-based smart contracts",
};

export default function ContractsPage() {
  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Contract Integration</h1>
        <p className="text-muted-foreground mt-2">
          Interact with reputation-based smart contracts for verification, governance, and token distribution.
        </p>
      </div>

      <Tabs defaultValue="verification" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="verification">Verification</TabsTrigger>
          <TabsTrigger value="voting">Governance</TabsTrigger>
          <TabsTrigger value="airdrops">Airdrops</TabsTrigger>
        </TabsList>
        
        <TabsContent value="verification" className="space-y-6">
          <ContractVerificationCard />
        </TabsContent>
        
        <TabsContent value="voting" className="space-y-6">
          <VotingCard />
        </TabsContent>
        
        <TabsContent value="airdrops" className="space-y-6">
          <AirdropCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
