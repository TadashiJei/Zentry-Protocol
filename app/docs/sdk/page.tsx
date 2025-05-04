"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { Code, FileText, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "SDK Documentation | Zentry - AI-Powered Reputation & Identity Layer for Web3",
  description:
    "Client libraries and SDKs for different programming languages and frameworks to integrate Zentry into your applications.",
}

export default function SdkPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#4AFA7B] px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">SDK Documentation</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Client libraries and SDKs for different programming languages and frameworks.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black border-t-4 border-[#4AFA7B]"></div>
      </section>

      {/* SDK Overview */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold mb-4 dark:text-white">SDK Libraries</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#javascript" className="text-[#4AFA7B] hover:underline">
                      JavaScript / TypeScript
                    </Link>
                  </li>
                  <li>
                    <Link href="#solidity" className="text-[#4AFA7B] hover:underline">
                      Solidity
                    </Link>
                  </li>
                  <li>
                    <Link href="#python" className="text-[#4AFA7B] hover:underline">
                      Python
                    </Link>
                  </li>
                  <li>
                    <Link href="#other" className="text-[#4AFA7B] hover:underline">
                      Other Languages
                    </Link>
                  </li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4 dark:text-white">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/docs/guides/sdk-quickstart" className="text-gray-600 dark:text-gray-300 hover:text-[#4AFA7B] dark:hover:text-[#4AFA7B]">
                      SDK Quick Start
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/examples/sdk" className="text-gray-600 dark:text-gray-300 hover:text-[#4AFA7B] dark:hover:text-[#4AFA7B]">
                      SDK Examples
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/zentry-io/sdk" className="text-gray-600 dark:text-gray-300 hover:text-[#4AFA7B] dark:hover:text-[#4AFA7B]">
                      GitHub Repository
                    </Link>
                  </li>
                </ul>

                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h4 className="font-bold mb-2 dark:text-white">Need Help?</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Can't find what you're looking for or need assistance?
                  </p>
                  <Button className="w-full bg-[#4AFA7B] text-black border-2 border-black dark:border-white hover:bg-white hover:text-black transition-all">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 dark:text-white">SDK Overview</h2>
                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Zentry provides SDKs for various programming languages and frameworks to make it easy to integrate reputation and identity features into your applications.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our SDKs provide a simple and consistent interface for accessing Zentry's API, handling authentication, and managing reputation data.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-center">
                      <Terminal className="mx-auto mb-2 text-[#4AFA7B]" />
                      <h4 className="font-bold dark:text-white">Easy Integration</h4>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-center">
                      <Code className="mx-auto mb-2 text-[#4AFA7B]" />
                      <h4 className="font-bold dark:text-white">Type Safety</h4>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-center">
                      <FileText className="mx-auto mb-2 text-[#4AFA7B]" />
                      <h4 className="font-bold dark:text-white">Comprehensive Docs</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div id="javascript">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">JavaScript / TypeScript SDK</h2>
                
                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Installation</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-4">
                    <pre className="dark:text-white">
                      npm install @zentry/sdk
                    </pre>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Or with yarn:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mt-2">
                    <pre className="dark:text-white">
                      yarn add @zentry/sdk
                    </pre>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Basic Usage</h3>
                  <Tabs defaultValue="typescript">
                    <TabsList className="mb-4">
                      <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    </TabsList>
                    <TabsContent value="typescript">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                        <pre className="dark:text-white">
                          {`import { Zentry } from '@zentry/sdk';

// Initialize the SDK
const zentry = new Zentry({
  apiKey: process.env.ZENTRY_API_KEY,
  network: 'mainnet'
});

// Get reputation score for an address
async function getReputationScore(address: string) {
  try {
    const score = await zentry.getReputationScore(address);
    console.log('Overall Score:', score.overall);
    console.log('Trust Score:', score.dimensions.trust);
    return score;
  } catch (error) {
    console.error('Error fetching reputation:', error);
  }
}`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="javascript">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                        <pre className="dark:text-white">
                          {`const { Zentry } = require('@zentry/sdk');

// Initialize the SDK
const zentry = new Zentry({
  apiKey: process.env.ZENTRY_API_KEY,
  network: 'mainnet'
});

// Get reputation score for an address
async function getReputationScore(address) {
  try {
    const score = await zentry.getReputationScore(address);
    console.log('Overall Score:', score.overall);
    console.log('Trust Score:', score.dimensions.trust);
    return score;
  } catch (error) {
    console.error('Error fetching reputation:', error);
  }
}`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Framework Integration</h3>
                  <Tabs defaultValue="nextjs">
                    <TabsList className="mb-4">
                      <TabsTrigger value="nextjs">Next.js</TabsTrigger>
                      <TabsTrigger value="react">React</TabsTrigger>
                    </TabsList>
                    <TabsContent value="nextjs">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                        <pre className="dark:text-white">
                          {`// app/api/reputation/[address]/route.ts
import { Zentry } from '@zentry/sdk';
import { NextResponse } from 'next/server';

const zentry = new Zentry({
  apiKey: process.env.ZENTRY_API_KEY,
  network: 'mainnet'
});

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    const address = params.address;
    const score = await zentry.getReputationScore(address);
    
    return NextResponse.json(score);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reputation score' },
      { status: 500 }
    );
  }
}`}
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="react">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                        <pre className="dark:text-white">
                          {`// hooks/useZentry.ts
import { useState, useEffect } from 'react';
import { Zentry } from '@zentry/sdk';

const zentry = new Zentry({
  apiKey: process.env.NEXT_PUBLIC_ZENTRY_API_KEY,
  network: 'mainnet'
});

export function useReputationScore(address: string) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchScore() {
      try {
        const result = await zentry.getReputationScore(address);
        setScore(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    if (address) {
      fetchScore();
    }
  }, [address]);

  return { score, loading, error };
}`}
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              <div id="solidity">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Solidity SDK</h2>
                
                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Installation</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-4">
                    <pre className="dark:text-white">
                      npm install @zentry/contracts
                    </pre>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Or with Foundry:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mt-2">
                    <pre className="dark:text-white">
                      forge install zentry-io/contracts
                    </pre>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Basic Usage</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                    <pre className="dark:text-white">
                      {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@zentry/contracts/IZentryOracle.sol";

contract ReputationGatedAccess {
    IZentryOracle public zentryOracle;
    uint256 public requiredScore;
    
    constructor(address _oracleAddress, uint256 _requiredScore) {
        zentryOracle = IZentryOracle(_oracleAddress);
        requiredScore = _requiredScore;
    }
    
    modifier onlyTrustedUsers() {
        uint256 score = zentryOracle.getReputationScore(msg.sender);
        require(score >= requiredScore, "Insufficient reputation score");
        _;
    }
    
    function premiumFunction() external onlyTrustedUsers {
        // Function only accessible to users with sufficient reputation
    }
    
    function updateRequiredScore(uint256 _newScore) external {
        // Admin function to update required score
        requiredScore = _newScore;
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div id="python">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Python SDK</h2>
                
                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Installation</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                    <pre className="dark:text-white">
                      pip install zentry-sdk
                    </pre>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Basic Usage</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                    <pre className="dark:text-white">
                      {`from zentry import ZentryClient

# Initialize the client
zentry = ZentryClient(
    api_key="YOUR_API_KEY",
    network="mainnet"
)

# Get reputation score for an address
async def get_reputation_score(address):
    try:
        score = await zentry.get_reputation_score(address)
        print(f"Overall Score: {score.overall}")
        print(f"Trust Score: {score.dimensions.trust}")
        return score
    except Exception as e:
        print(f"Error fetching reputation: {e}")
        return None

# Example usage in a FastAPI endpoint
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app
