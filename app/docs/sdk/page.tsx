"use client"

import Link from "next/link"
import { Code, FileText, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SdkPage() {
  return (
    <div>
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
                    <Link href="#python" className="text-[#4AFA7B] hover:underline">
                      Python
                    </Link>
                  </li>
                  <li>
                    <Link href="#react" className="text-[#4AFA7B] hover:underline">
                      React
                    </Link>
                  </li>
                  <li>
                    <Link href="#solidity" className="text-[#4AFA7B] hover:underline">
                      Solidity
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
                    <Link href="/docs/guides/migration" className="text-gray-600 dark:text-gray-300 hover:text-[#4AFA7B] dark:hover:text-[#4AFA7B]">
                      Migration Guide
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
                    Zentry provides official SDKs for multiple programming languages and frameworks to make it easy to integrate reputation and identity features into your applications.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    All SDKs provide a consistent API surface across platforms, with language-specific idioms where appropriate.
                  </p>
                </div>
              </div>

              <div id="javascript">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">JavaScript / TypeScript</h2>
                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Installation</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-6">
                    <pre className="dark:text-white">
                      npm install @zentry/sdk
                    </pre>
                  </div>

                  <h3 className="text-xl font-bold mb-4 dark:text-white">Usage</h3>
                  <Tabs defaultValue="node" className="mb-6">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="node" className="data-[state=active]:bg-[#4AFA7B] data-[state=active]:text-black">
                        <div className="flex items-center">
                          <Terminal className="w-4 h-4 mr-2" />
                          Node.js
                        </div>
                      </TabsTrigger>
                      <TabsTrigger value="browser" className="data-[state=active]:bg-[#4AFA7B] data-[state=active]:text-black">
                        <div className="flex items-center">
                          <Code className="w-4 h-4 mr-2" />
                          Browser
                        </div>
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="node" className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                      <pre className="dark:text-white">
                        {`// ESM
import { Zentry } from '@zentry/sdk';

// CommonJS
const { Zentry } = require('@zentry/sdk');

// Initialize the SDK
const zentry = new Zentry({
  apiKey: process.env.ZENTRY_API_KEY,
  network: 'mainnet'
});

// Get reputation score for an address
const reputation = await zentry.reputation.getScore('0x7Fc...3A9b');
console.log(reputation.overall_score); // 87

// Verify identity
const identity = await zentry.identity.verify('0x7Fc...3A9b');
console.log(identity.verified); // true`}
                      </pre>
                    </TabsContent>
                    <TabsContent value="browser" className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                      <pre className="dark:text-white">
                        {`// Import the SDK
import { Zentry } from '@zentry/sdk';

// Initialize the SDK
const zentry = new Zentry({
  apiKey: 'YOUR_PUBLIC_API_KEY', // Use public API key only
  network: 'mainnet'
});

// Connect to wallet
const connect = async () => {
  await zentry.wallet.connect();
  const address = zentry.wallet.getAddress();
  
  // Get reputation score
  const reputation = await zentry.reputation.getScore(address);
  console.log(reputation.overall_score);
};`}
                      </pre>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end">
                    <Link href="/docs/references/javascript" className="text-[#4AFA7B] hover:underline flex items-center">
                      View full JavaScript SDK reference
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div id="python">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Python</h2>
                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Installation</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-6">
                    <pre className="dark:text-white">
                      pip install zentry-sdk
                    </pre>
                  </div>

                  <h3 className="text-xl font-bold mb-4 dark:text-white">Usage</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-6">
                    <pre className="dark:text-white">
                      {`from zentry import Zentry

# Initialize the SDK
zentry = Zentry(
    api_key="YOUR_API_KEY",
    network="mainnet"
)

# Get reputation score for an address
reputation = zentry.reputation.get_score("0x7Fc...3A9b")
print(reputation.overall_score)  # 87

# Verify identity
identity = zentry.identity.verify("0x7Fc...3A9b")
print(identity.verified)  # True`}
                    </pre>
                  </div>

                  <div className="flex justify-end">
                    <Link href="/docs/references/python" className="text-[#4AFA7B] hover:underline flex items-center">
                      View full Python SDK reference
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div id="react">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">React</h2>
                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Installation</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-6">
                    <pre className="dark:text-white">
                      npm install @zentry/react
                    </pre>
                  </div>

                  <h3 className="text-xl font-bold mb-4 dark:text-white">Usage</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-6">
                    <pre className="dark:text-white">
                      {`import { ZentryProvider, useZentry, useReputation } from '@zentry/react';

function App() {
  return (
    <ZentryProvider apiKey="YOUR_PUBLIC_API_KEY" network="mainnet">
      <YourApp />
    </ZentryProvider>
  );
}

function YourApp() {
  const { wallet } = useZentry();
  const { score, loading } = useReputation(wallet.address);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Your Reputation Score: {score.overall_score}</h1>
      <button onClick={wallet.connect}>Connect Wallet</button>
    </div>
  );
}`}
                    </pre>
                  </div>

                  <div className="flex justify-end">
                    <Link href="/docs/references/react" className="text-[#4AFA7B] hover:underline flex items-center">
                      View full React SDK reference
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div id="solidity">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Solidity</h2>
                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">Installation</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-6">
                    <pre className="dark:text-white">
                      npm install @zentry/contracts
                    </pre>
                  </div>

                  <h3 className="text-xl font-bold mb-4 dark:text-white">Usage</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-6">
                    <pre className="dark:text-white">
                      {`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@zentry/contracts/ReputationGate.sol";

contract MyContract {
    ReputationGate private reputationGate;
    
    constructor(address _reputationGateAddress) {
        reputationGate = ReputationGate(_reputationGateAddress);
    }
    
    function restrictedFunction() external {
        // Require a minimum reputation score of 70
        require(
            reputationGate.checkReputation(msg.sender) >= 70,
            "Insufficient reputation score"
        );
        
        // Function logic here
    }
}`}
                    </pre>
                  </div>

                  <div className="flex justify-end">
                    <Link href="/docs/references/solidity" className="text-[#4AFA7B] hover:underline flex items-center">
                      View full Solidity contracts reference
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
