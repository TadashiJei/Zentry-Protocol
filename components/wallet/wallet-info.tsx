"use client";

import { useAccount, useBalance } from "wagmi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function WalletInfo() {
  const { address, isConnected, chain } = useAccount();
  const { data: balance } = useBalance({
    address,
  });

  if (!isConnected || !address) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>Wallet Information</CardTitle>
          <Badge variant="outline">{chain?.name || "Unknown Network"}</Badge>
        </div>
        <CardDescription>Your connected wallet details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
            <p className="mt-1 font-mono text-sm break-all">{address}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Balance</h3>
            <p className="mt-1 text-sm">
              {balance ? (
                <span>
                  {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                </span>
              ) : (
                "Loading..."
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
