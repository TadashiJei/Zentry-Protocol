"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount } from "wagmi";

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  date: string;
  network: string;
  impact: "positive" | "neutral" | "negative";
}

export function OnChainActivityCard() {
  const { address } = useAccount();
  
  // Sample activity data - in a real app, this would come from the Rivalz ADCS module
  const activities: ActivityItem[] = [
    {
      id: "1",
      type: "DAO Vote",
      description: "Voted on proposal ENS-10: Treasury Diversification",
      date: "2025-04-30",
      network: "Ethereum",
      impact: "positive",
    },
    {
      id: "2",
      type: "DeFi",
      description: "Supplied 5 ETH to Aave lending pool",
      date: "2025-04-28",
      network: "Ethereum",
      impact: "positive",
    },
    {
      id: "3",
      type: "NFT",
      description: "Purchased Bored Ape #8765",
      date: "2025-04-25",
      network: "Ethereum",
      impact: "neutral",
    },
    {
      id: "4",
      type: "Bridge",
      description: "Bridged 1000 USDC from Ethereum to Polygon",
      date: "2025-04-22",
      network: "Polygon",
      impact: "neutral",
    },
    {
      id: "5",
      type: "Swap",
      description: "Swapped 2 ETH for 3000 UNI on Uniswap",
      date: "2025-04-20",
      network: "Ethereum",
      impact: "neutral",
    },
  ];

  // Filter activities by type
  const daoActivities = activities.filter(activity => activity.type === "DAO Vote");
  const defiActivities = activities.filter(activity => activity.type === "DeFi");
  const nftActivities = activities.filter(activity => activity.type === "NFT");
  const otherActivities = activities.filter(activity => 
    !['DAO Vote', 'DeFi', 'NFT'].includes(activity.type)
  );

  // Get impact badge color
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>On-Chain Activity</CardTitle>
        <CardDescription>Your blockchain activity across networks</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="dao">DAO</TabsTrigger>
            <TabsTrigger value="defi">DeFi</TabsTrigger>
            <TabsTrigger value="nft">NFT</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 pt-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState />
            )}
          </TabsContent>
          
          <TabsContent value="dao" className="space-y-4 pt-4">
            {daoActivities.length > 0 ? (
              daoActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState type="DAO" />
            )}
          </TabsContent>
          
          <TabsContent value="defi" className="space-y-4 pt-4">
            {defiActivities.length > 0 ? (
              defiActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState type="DeFi" />
            )}
          </TabsContent>
          
          <TabsContent value="nft" className="space-y-4 pt-4">
            {nftActivities.length > 0 ? (
              nftActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState type="NFT" />
            )}
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4 pt-4">
            {otherActivities.length > 0 ? (
              otherActivities.map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            ) : (
              <EmptyState type="other" />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Activity item component
function ActivityItem({ activity }: { activity: ActivityItem }) {
  return (
    <div className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{activity.type}</Badge>
          <Badge variant="secondary">{activity.network}</Badge>
          <Badge className={getImpactColor(activity.impact)}>
            {activity.impact.charAt(0).toUpperCase() + activity.impact.slice(1)} Impact
          </Badge>
        </div>
        <p className="text-sm">{activity.description}</p>
        <p className="text-xs text-muted-foreground">{activity.date}</p>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState({ type = "activity" }: { type?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-muted p-3 mb-3">
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="text-sm font-medium">No {type} activity found</p>
      <p className="text-xs text-muted-foreground">
        Connect more wallets or interact with {type.toLowerCase()} protocols to build your reputation.
      </p>
    </div>
  );
}
