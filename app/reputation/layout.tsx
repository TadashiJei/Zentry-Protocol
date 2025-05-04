"use client";

import { WalletProvider } from "@/lib/web3/wallet-provider";

export default function ReputationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WalletProvider>{children}</WalletProvider>;
}
