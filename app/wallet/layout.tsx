"use client";

import { WalletProvider } from "@/lib/web3/wallet-provider";

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WalletProvider>{children}</WalletProvider>;
}
