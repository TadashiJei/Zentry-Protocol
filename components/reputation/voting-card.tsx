"use client";

import { useState } from "react";
import { useReputationVoting } from "@/hooks/contracts/use-reputation-contracts";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";

export function VotingCard() {
  const { address, isConnected } = useAccount();
  const { 
    loading, 
    error,
    createProposal,
    castVote,
    getProposal,
    calculateVoteWeight
  } = useReputationVoting();

  const [activeTab, setActiveTab] = useState("view");
  const [proposalId, setProposalId] = useState("");
  const [proposal, setProposal] = useState<any>(null);
  const [voteWeight, setVoteWeight] = useState<number | null>(null);
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [proposalDuration, setProposalDuration] = useState(86400); // 1 day in seconds
  
  const [isCreating, setIsCreating] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Load proposal details
  const handleLoadProposal = async () => {
    if (!isConnected || !proposalId) return;
    
    try {
      setIsLoading(true);
      setActionError(null);
      const id = parseInt(proposalId);
      if (isNaN(id)) {
        setActionError("Invalid proposal ID");
        return;
      }
      
      const result = await getProposal(id);
      setProposal(result);
      
      // Also get the user's vote weight
      const weight = await calculateVoteWeight();
      setVoteWeight(weight);
    } catch (err: any) {
      console.error("Error loading proposal:", err);
      setActionError(err.message || "Failed to load proposal");
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new proposal
  const handleCreateProposal = async () => {
    if (!isConnected || !proposalTitle || !proposalDescription || !proposalDuration) return;
    
    try {
      setIsCreating(true);
      setActionError(null);
      setActionSuccess(null);
      
      const result = await createProposal(proposalTitle, proposalDescription, proposalDuration);
      
      setActionSuccess(`Proposal created successfully! Proposal ID: ${result.proposalId}`);
      setProposalId(result.proposalId.toString());
      setActiveTab("view");
      
      // Reset form
      setProposalTitle("");
      setProposalDescription("");
    } catch (err: any) {
      console.error("Error creating proposal:", err);
      setActionError(err.message || "Failed to create proposal");
    } finally {
      setIsCreating(false);
    }
  };

  // Cast a vote on a proposal
  const handleCastVote = async (support: boolean) => {
    if (!isConnected || !proposal) return;
    
    try {
      setIsVoting(true);
      setActionError(null);
      setActionSuccess(null);
      
      await castVote(proposal.id, support);
      
      setActionSuccess(`Vote cast successfully! You voted ${support ? "for" : "against"} the proposal.`);
      
      // Refresh proposal data
      const refreshedProposal = await getProposal(proposal.id);
      setProposal(refreshedProposal);
    } catch (err: any) {
      console.error("Error casting vote:", err);
      setActionError(err.message || "Failed to cast vote");
    } finally {
      setIsVoting(false);
    }
  };

  // Format timestamp to readable date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  // Check if voting is active
  const isVotingActive = (proposal: any) => {
    const now = Math.floor(Date.now() / 1000);
    return now >= proposal.startTime && now <= proposal.endTime;
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reputation-Based Voting</CardTitle>
          <CardDescription>
            Connect your wallet to participate in reputation-weighted governance
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
        <CardTitle>Reputation-Based Voting</CardTitle>
        <CardDescription>
          Create and vote on proposals with reputation-weighted voting power
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="view">View Proposals</TabsTrigger>
            <TabsTrigger value="create">Create Proposal</TabsTrigger>
          </TabsList>
          
          {/* View Proposals Tab */}
          <TabsContent value="view" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-6">
              <div className="sm:col-span-3">
                <Label htmlFor="proposalId">Proposal ID</Label>
                <Input
                  id="proposalId"
                  value={proposalId}
                  onChange={(e) => setProposalId(e.target.value)}
                  placeholder="Enter proposal ID"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleLoadProposal} 
                  disabled={loading || isLoading || !proposalId || !isConnected}
                  className="w-full"
                >
                  Load Proposal
                </Button>
              </div>
            </div>
            
            {proposal ? (
              <div className="space-y-6 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{proposal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Proposal ID: {proposal.id}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant={proposal.executed ? "secondary" : isVotingActive(proposal) ? "default" : "outline"}>
                        {proposal.executed ? "Executed" : isVotingActive(proposal) ? "Active" : "Closed"}
                      </Badge>
                      {voteWeight !== null && (
                        <span className="text-sm">Your voting power: <strong>{voteWeight}</strong></span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted rounded-md">
                    <p className="whitespace-pre-wrap">{proposal.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-medium">Start Time</p>
                      <p className="text-sm">{formatDate(proposal.startTime)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">End Time</p>
                      <p className="text-sm">{formatDate(proposal.endTime)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-2">Voting Results</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">For</span>
                          <Badge variant="outline">{proposal.forVotes}</Badge>
                        </div>
                      </div>
                      <div className="p-4 bg-muted rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Against</span>
                          <Badge variant="outline">{proposal.againstVotes}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {isVotingActive(proposal) && (
                    <div className="mt-6">
                      <h4 className="text-lg font-medium mb-2">Cast Your Vote</h4>
                      <div className="flex gap-4">
                        <Button 
                          onClick={() => handleCastVote(true)} 
                          disabled={loading || isVoting || !isConnected}
                          className="flex-1"
                          variant="default"
                        >
                          Vote For
                        </Button>
                        <Button 
                          onClick={() => handleCastVote(false)} 
                          disabled={loading || isVoting || !isConnected}
                          className="flex-1"
                          variant="outline"
                        >
                          Vote Against
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : isLoading ? (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Loading proposal data...</p>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">Enter a proposal ID and click "Load Proposal" to view details</p>
              </div>
            )}
          </TabsContent>
          
          {/* Create Proposal Tab */}
          <TabsContent value="create" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="proposalTitle">Proposal Title</Label>
                <Input
                  id="proposalTitle"
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  placeholder="Enter a clear and concise title"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="proposalDescription">Proposal Description</Label>
                <Textarea
                  id="proposalDescription"
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                  placeholder="Describe your proposal in detail"
                  className="mt-1 min-h-[150px]"
                />
              </div>
              
              <div>
                <Label htmlFor="proposalDuration">Voting Duration (in seconds)</Label>
                <Input
                  id="proposalDuration"
                  type="number"
                  min="3600"
                  value={proposalDuration}
                  onChange={(e) => setProposalDuration(parseInt(e.target.value))}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  {Math.floor(proposalDuration / 86400)} days, {Math.floor((proposalDuration % 86400) / 3600)} hours
                </p>
              </div>
              
              <Button 
                onClick={handleCreateProposal} 
                disabled={loading || isCreating || !proposalTitle || !proposalDescription || !proposalDuration || !isConnected}
                className="w-full mt-2"
              >
                {isCreating ? "Creating Proposal..." : "Create Proposal"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
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
