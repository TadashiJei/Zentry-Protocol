import type { Metadata } from "next"
import { ArrowRight, Database, Cpu, HardDrive, Shield, Zap, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "How It Works | Zentry - AI-Powered Reputation & Identity Layer for Web3",
  description:
    "Learn how Zentry uses Rivalz's Autonomous Decentralized Compute Stack to create a comprehensive reputation system for Web3 users.",
}

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#4AFA7B] px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">How Zentry Works</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Zentry uses Rivalz's Autonomous Decentralized Compute Stack to create a comprehensive reputation system
              for Web3 users.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black border-t-4 border-[#4AFA7B]"></div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Architecture Overview
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Zentry's architecture is built on three core components that work together to create a comprehensive
              reputation system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#4AFA7B]">
              <div className="bg-white w-16 h-16 rounded-full border-4 border-black dark:border-white flex items-center justify-center mb-4">
                <Database className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Data Collection</h3>
              <p className="text-black">
                ADCS Fetchers collect on-chain and off-chain data from multiple sources to build a comprehensive
                identity profile.
              </p>
            </div>

            <div className="relative p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#4AFA7B]">
              <div className="hidden md:block absolute top-1/2 -left-12 transform -translate-y-1/2">
                <ArrowRight size={32} />
              </div>
              <div className="bg-white w-16 h-16 rounded-full border-4 border-black dark:border-white flex items-center justify-center mb-4">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">AI Processing</h3>
              <p className="text-black">
                rC Agents process the collected data using advanced AI models to compute multi-dimensional reputation
                scores.
              </p>
            </div>

            <div className="relative p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#4AFA7B]">
              <div className="hidden md:block absolute top-1/2 -left-12 transform -translate-y-1/2">
                <ArrowRight size={32} />
              </div>
              <div className="bg-white w-16 h-16 rounded-full border-4 border-black dark:border-white flex items-center justify-center mb-4">
                <HardDrive className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Storage & Access</h3>
              <p className="text-black">
                rD Agents securely store and manage reputation scores with cross-chain compatibility and user-controlled
                access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 -rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Data Sources
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Zentry aggregates data from multiple sources to create a comprehensive identity and reputation profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">On-Chain Data</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">Transaction History</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Analysis of transaction patterns, frequency, and counterparties across multiple chains.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">DAO Participation</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Governance voting history, proposal submissions, and community engagement metrics.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">DeFi Activity</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Lending, borrowing, and liquidity provision history across DeFi protocols.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">NFT Ownership</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Digital asset collections and community participation through NFT ownership.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Off-Chain Data</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">GitHub Contributions</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Code commits, pull requests, and open-source project contributions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">Social Media</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Verified accounts, engagement metrics, and community standing across platforms.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">Professional Credentials</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Verified skills, endorsements, and professional history from platforms like LinkedIn.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">Community Forums</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Participation in technical discussions, help forums, and community support.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Models */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              AI Models
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Zentry uses advanced AI models to analyze data and compute reputation scores across multiple dimensions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-16">
            <h3 className="text-2xl font-bold mb-6 dark:text-white">Reputation Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-black dark:border-white">
                <div className="bg-[#4AFA7B] w-12 h-12 rounded-full flex items-center justify-center mb-4 border-2 border-black dark:border-white">
                  <Shield className="w-6 h-6 text-black" />
                </div>
                <h4 className="font-bold text-lg mb-2 dark:text-white">Trustworthiness</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Measures reliability, consistency, and integrity of actions across platforms.
                </p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-black dark:border-white">
                <div className="bg-[#4AFA7B] w-12 h-12 rounded-full flex items-center justify-center mb-4 border-2 border-black dark:border-white">
                  <Layers className="w-6 h-6 text-black" />
                </div>
                <h4 className="font-bold text-lg mb-2 dark:text-white">Expertise</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Evaluates technical knowledge, skills, and domain expertise.
                </p>
              </div>
              <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-black dark:border-white">
                <div className="bg-[#4AFA7B] w-12 h-12 rounded-full flex items-center justify-center mb-4 border-2 border-black dark:border-white">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h4 className="font-bold text-lg mb-2 dark:text-white">Governance</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Assesses participation and influence in community governance.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 dark:text-white">AI Processing Pipeline</h3>
              <ol className="space-y-6">
                <li className="flex">
                  <div className="bg-[#4AFA7B] w-8 h-8 rounded-full flex items-center justify-center mr-4 border-2 border-black dark:border-white">
                    <span className="font-bold text-black">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 dark:text-white">Data Collection & Normalization</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Raw data is collected and normalized into standardized formats for processing.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-[#4AFA7B] w-8 h-8 rounded-full flex items-center justify-center mr-4 border-2 border-black dark:border-white">
                    <span className="font-bold text-black">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 dark:text-white">Feature Extraction</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Key features and patterns are extracted from the normalized data.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-[#4AFA7B] w-8 h-8 rounded-full flex items-center justify-center mr-4 border-2 border-black dark:border-white">
                    <span className="font-bold text-black">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 dark:text-white">Model Processing</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      AI models analyze the features to compute reputation scores across dimensions.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-[#4AFA7B] w-8 h-8 rounded-full flex items-center justify-center mr-4 border-2 border-black dark:border-white">
                    <span className="font-bold text-black">4</span>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 dark:text-white">Verification & Validation</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Results are verified for accuracy and validated against known benchmarks.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Privacy & Security</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">Zero-Knowledge Proofs</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Verify reputation without revealing underlying data.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">User-Controlled Access</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Users decide which applications can access their reputation data.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-[#4AFA7B] p-2 rounded-full mr-4 mt-1">
                    <Shield className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 dark:text-white">Decentralized Storage</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Data is stored across a decentralized network for security and resilience.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#4AFA7B]">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to Explore Zentry?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Connect your wallet to view your reputation score and start building your Web3 identity.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-black text-white text-lg px-8 py-6 rounded-md border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
              Connect Wallet
            </Button>
            <Button
              variant="outline"
              className="bg-white text-black text-lg px-8 py-6 rounded-md border-4 border-black hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
