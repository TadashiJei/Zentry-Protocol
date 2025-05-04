import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Book, Code, FileText, Terminal, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Documentation | Zentry - AI-Powered Reputation & Identity Layer for Web3",
  description: "Technical documentation, guides, and resources for integrating Zentry into your Web3 applications.",
}

export default function DocsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#4AFA7B] px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">Documentation</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Technical documentation, guides, and resources for integrating Zentry into your Web3 applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-black text-white text-lg px-8 py-6 rounded-md border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                Quick Start Guide
              </Button>
              <Button
                variant="outline"
                className="bg-white text-black text-lg px-8 py-6 rounded-md border-4 border-black hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
              >
                API Reference
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black border-t-4 border-[#4AFA7B]"></div>
      </section>

      {/* Documentation Categories */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/docs/guides" className="block">
              <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full transition-transform hover:-translate-y-2">
                <div className="bg-[#4AFA7B] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-black dark:border-white">
                  <Book className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Guides</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Step-by-step tutorials and guides to help you get started with Zentry.
                </p>
                <div className="flex items-center text-[#4AFA7B] font-bold">
                  Explore Guides <ArrowRight className="ml-2" />
                </div>
              </div>
            </Link>

            <Link href="/docs/api" className="block">
              <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full transition-transform hover:-translate-y-2">
                <div className="bg-[#4AFA7B] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-black dark:border-white">
                  <Code className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">API Reference</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Comprehensive API documentation for integrating Zentry into your applications.
                </p>
                <div className="flex items-center text-[#4AFA7B] font-bold">
                  View API Docs <ArrowRight className="ml-2" />
                </div>
              </div>
            </Link>

            <Link href="/docs/sdk" className="block">
              <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full transition-transform hover:-translate-y-2">
                <div className="bg-[#4AFA7B] w-16 h-16 rounded-full flex items-center justify-center mb-6 border-4 border-black dark:border-white">
                  <Terminal className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">SDK</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Client libraries and SDKs for different programming languages and frameworks.
                </p>
                <div className="flex items-center text-[#4AFA7B] font-bold">
                  Explore SDKs <ArrowRight className="ml-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Documentation */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Popular Documentation
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Explore our most frequently accessed documentation resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2 text-[#4AFA7B]" />
                <h3 className="font-bold dark:text-white">Quick Start Guide</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Get started with Zentry in just a few minutes with our quick start guide.
              </p>
              <Link href="/docs/guides/quick-start" className="text-[#4AFA7B] font-bold text-sm">
                Read Guide
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2 text-[#4AFA7B]" />
                <h3 className="font-bold dark:text-white">JavaScript SDK Installation</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Learn how to install and configure the Zentry JavaScript SDK.
              </p>
              <Link href="/docs/sdk/javascript/installation" className="text-[#4AFA7B] font-bold text-sm">
                Read Guide
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2 text-[#4AFA7B]" />
                <h3 className="font-bold dark:text-white">Reputation Score API</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                API reference for retrieving and using reputation scores in your applications.
              </p>
              <Link href="/docs/api/reputation-score" className="text-[#4AFA7B] font-bold text-sm">
                Read Guide
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg">
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 mr-2 text-[#4AFA7B]" />
                <h3 className="font-bold dark:text-white">Smart Contract Integration</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Learn how to integrate Zentry reputation scores into your smart contracts.
              </p>
              <Link href="/docs/guides/smart-contract-integration" className="text-[#4AFA7B] font-bold text-sm">
                Read Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Search */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-[#4AFA7B] p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-black">Can't find what you're looking for?</h2>
                <p className="text-black mb-6">
                  Search our documentation or reach out to our support team for assistance.
                </p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full px-4 py-3 border-4 border-black rounded-md focus:outline-none"
                  />
                  <Button className="absolute right-2 top-2 bg-black text-white px-4 py-1 rounded-md">Search</Button>
                </div>
              </div>
              <div className="bg-white p-6 border-4 border-black rounded-lg">
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="mb-4">
                  Our support team is available to help you with any questions or issues you may have.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all">
                    <Zap className="mr-2 h-4 w-4" /> Discord Community
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-black hover:bg-black hover:text-white transition-all"
                  >
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 -rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Documentation Categories
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Browse our documentation by category to find what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/docs/guides" className="block">
              <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg transition-transform hover:-translate-y-1">
                <h3 className="font-bold mb-2 dark:text-white">Getting Started</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Introduction, installation, and basic concepts.
                </p>
              </div>
            </Link>

            <Link href="/docs/guides/integration" className="block">
              <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg transition-transform hover:-translate-y-1">
                <h3 className="font-bold mb-2 dark:text-white">Integration Guides</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Step-by-step guides for integrating Zentry.</p>
              </div>
            </Link>

            <Link href="/docs/api" className="block">
              <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg transition-transform hover:-translate-y-1">
                <h3 className="font-bold mb-2 dark:text-white">API Reference</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Detailed API documentation and endpoints.</p>
              </div>
            </Link>

            <Link href="/docs/sdk" className="block">
              <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg transition-transform hover:-translate-y-1">
                <h3 className="font-bold mb-2 dark:text-white">SDK Documentation</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Client libraries for different languages.</p>
              </div>
            </Link>

            <Link href="/docs/examples" className="block">
              <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg transition-transform hover:-translate-y-1">
                <h3 className="font-bold mb-2 dark:text-white">Examples</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Code examples and sample applications.</p>
              </div>
            </Link>

            <Link href="/docs/faq" className="block">
              <div className="bg-white dark:bg-gray-800 p-6 border-2 border-black dark:border-white rounded-lg transition-transform hover:-translate-y-1">
                <h3 className="font-bold mb-2 dark:text-white">FAQ</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Frequently asked questions and troubleshooting.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
