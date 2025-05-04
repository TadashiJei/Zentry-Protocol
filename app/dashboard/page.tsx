"use client";

import { useAccount } from "wagmi";
import { SimpleConnectButton } from "@/components/wallet/simple-connect-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ContractVerificationCard } from "@/components/reputation/contract-verification-card";
import { VotingCard } from "@/components/reputation/voting-card";
import { AirdropCard } from "@/components/reputation/airdrop-card";
import { useEffect, useState } from "react";
import { Activity, Award, BarChart3, Clock, CreditCard, DollarSign, Github, Layers, Link, Shield, Twitter, Users } from "lucide-react";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering wallet-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Format address for display
  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Mock data for the dashboard
  const reputationScore = 85;
  const reputationMetrics = [
    { name: "Trustworthiness", value: 92 },
    { name: "Governance Influence", value: 78 },
    { name: "Technical Expertise", value: 85 },
  ];

  const recentActivity = [
    { type: "Verification", description: "Verified GitHub account", time: "2 hours ago", status: "completed" },
    { type: "Transaction", description: "Sent 0.1 ETH to 0x1234...", time: "1 day ago", status: "completed" },
    { type: "Governance", description: "Voted on proposal #42", time: "3 days ago", status: "completed" },
    { type: "Airdrop", description: "Claimed 100 ZNT tokens", time: "1 week ago", status: "completed" },
  ];

  const identityVerifications = [
    { platform: "GitHub", status: "verified", icon: <Github className="h-4 w-4" /> },
    { platform: "Twitter/X", status: "verified", icon: <Twitter className="h-4 w-4" /> },
    { platform: "LinkedIn", status: "pending", icon: <Users className="h-4 w-4" /> },
    { platform: "StackOverflow", status: "not_verified", icon: <Layers className="h-4 w-4" /> },
  ];

  if (!mounted) return null;

  // If not connected, show connect prompt
  if (!isConnected) {
    return (
      <div className="container mx-auto py-10 space-y-8">
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>
                Connect your wallet to access your reputation dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <SimpleConnectButton />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white dark:bg-black p-6 rounded-md border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-base font-medium mt-1">
            Welcome back, {formatAddress(address || "")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white dark:bg-black rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
            <SimpleConnectButton />
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] p-1 w-full sm:w-auto">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#4AFA7B] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black font-bold">Overview</TabsTrigger>
          <TabsTrigger value="reputation" className="data-[state=active]:bg-[#4AFA7B] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black font-bold">Reputation</TabsTrigger>
          <TabsTrigger value="contracts" className="data-[state=active]:bg-[#4AFA7B] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black font-bold">Contracts</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-[#4AFA7B] data-[state=active]:text-black data-[state=active]:border-2 data-[state=active]:border-black font-bold">Activity</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black dark:border-white">
                <CardTitle className="text-base font-bold">Reputation Score</CardTitle>
                <Award className="h-5 w-5 text-[#4AFA7B]" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{reputationScore}/100</div>
                <p className="text-sm font-medium text-green-600">+5% from last month</p>
                <Progress value={reputationScore} className="mt-3 h-2 bg-gray-200 dark:bg-gray-700" indicatorClassName="bg-[#4AFA7B]" />
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black dark:border-white">
                <CardTitle className="text-base font-bold">Wallet Balance</CardTitle>
                <CreditCard className="h-5 w-5 text-[#4AFA7B]" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">0.0000 ETH</div>
                <p className="text-sm font-medium">On Ethereum Mainnet</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black dark:border-white">
                <CardTitle className="text-base font-bold">Verifications</CardTitle>
                <Shield className="h-5 w-5 text-[#4AFA7B]" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">2/4</div>
                <p className="text-sm font-medium">Verified accounts</p>
                <div className="flex gap-2 mt-3">
                  {identityVerifications.map((verification) => (
                    <Badge key={verification.platform} 
                      className={`font-medium border ${verification.status === "verified" ? "bg-[#4AFA7B] text-black border-black" : "bg-white text-black border-black"}`}>
                      {verification.icon}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b-2 border-black dark:border-white">
                <CardTitle className="text-base font-bold">Recent Activity</CardTitle>
                <Activity className="h-5 w-5 text-[#4AFA7B]" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{recentActivity.length}</div>
                <p className="text-sm font-medium">Actions in the last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Reputation Metrics</CardTitle>
                <CardDescription>
                  Your reputation score breakdown
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-4">
                  {reputationMetrics.map((metric) => (
                    <div key={metric.name} className="flex items-center">
                      <div className="w-1/3">
                        <div className="text-sm font-medium">{metric.name}</div>
                      </div>
                      <div className="w-2/3 flex items-center gap-2">
                        <Progress value={metric.value} className="h-2" />
                        <span className="text-sm font-medium">{metric.value}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Identity Verification</CardTitle>
                <CardDescription>
                  Linked accounts and verification status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {identityVerifications.map((verification) => (
                    <div key={verification.platform} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {verification.icon}
                        <span className="text-sm font-medium">{verification.platform}</span>
                      </div>
                      <Badge variant={verification.status === "verified" ? "default" : 
                                  verification.status === "pending" ? "outline" : "secondary"}>
                        {verification.status === "verified" ? "Verified" : 
                         verification.status === "pending" ? "Pending" : "Not Verified"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" size="sm">
                  <Link className="h-4 w-4 mr-2" />
                  Link More Accounts
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your recent on-chain and verification activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="rounded-full p-2 bg-muted">
                        {activity.type === "Verification" ? <Shield className="h-4 w-4" /> :
                         activity.type === "Transaction" ? <DollarSign className="h-4 w-4" /> :
                         activity.type === "Governance" ? <BarChart3 className="h-4 w-4" /> :
                         <Award className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.type}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{activity.status}</Badge>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" size="sm">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Reputation Tab */}
        <TabsContent value="reputation" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Overall Score</CardTitle>
                <CardDescription>Your reputation score across all metrics</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-6">
                <div className="relative h-40 w-40 flex items-center justify-center">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted-foreground stroke-current"
                      strokeWidth="8"
                      strokeLinecap="round"
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
                      strokeDasharray={`${reputationScore * 2.51} 251.2`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-bold">{reputationScore}</span>
                    <span className="text-sm text-muted-foreground">Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {reputationMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader>
                  <CardTitle>{metric.name}</CardTitle>
                  <CardDescription>Score: {metric.value}/100</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={metric.value} className="h-2" />
                  <div className="mt-4 text-sm">
                    <p>This metric evaluates your {metric.name.toLowerCase()} based on your on-chain activity and verified accounts.</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ContractVerificationCard />
            <VotingCard />
            <AirdropCard />
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
              <CardDescription>Your on-chain and verification activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                        {activity.type === "Verification" ? <Shield className="h-5 w-5" /> :
                         activity.type === "Transaction" ? <DollarSign className="h-5 w-5" /> :
                         activity.type === "Governance" ? <BarChart3 className="h-5 w-5" /> :
                         <Award className="h-5 w-5" />}
                      </div>
                      <div className="w-px h-full bg-border mt-2" />
                    </div>
                    <div className="pb-8">
                      <div className="text-sm font-medium">{activity.description}</div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                      <div className="mt-2 text-sm">
                        <Badge variant="outline">{activity.status}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
