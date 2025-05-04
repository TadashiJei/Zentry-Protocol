import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider } from "@/lib/web3/wallet-provider"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import LoadingScreen from "@/components/loading-screen"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zentry - AI-Powered Reputation & Identity Layer for Web3",
  description:
    "Decentralized, AI-enhanced identity and reputation infrastructure for Web3 users, built on Rivalz's Autonomous Decentralized Compute Stack.",
  keywords: "Web3, blockchain, identity, reputation, AI, decentralized, Rivalz, crypto, DAO, DeFi, NFT, trust layer",
  authors: [{ name: "Hacktivators Team" }],
  creator: "Zentry",
  publisher: "Zentry",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zentry.hacktivators.com",
    title: "Zentry - AI-Powered Reputation & Identity Layer for Web3",
    description: "Decentralized, AI-enhanced identity and reputation infrastructure for Web3 users, built on Rivalz.",
    siteName: "Zentry",
    images: [
      {
        url: "/images/zentry-og.png",
        width: 1200,
        height: 630,
        alt: "Zentry - AI-Powered Reputation & Identity Layer for Web3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentry - AI-Powered Reputation & Identity Layer for Web3",
    description: "Decentralized, AI-enhanced identity and reputation infrastructure for Web3 users, built on Rivalz.",
    images: ["/images/zentry-og.png"],
    creator: "@zentryprotocol",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL("https://zentry.hacktivators.com"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <WalletProvider>
            <LoadingScreen />
            <Navigation />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
