import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ApiReferencePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#4AFA7B] px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">API Reference</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Comprehensive API documentation for integrating Zentry into your applications.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black border-t-4 border-[#4AFA7B]"></div>
      </section>

      {/* API Overview */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold mb-4 dark:text-white">API Reference</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="#authentication" className="text-[#4AFA7B] hover:underline">
                      Authentication
                    </Link>
                  </li>
                  <li>
                    <Link href="#reputation" className="text-[#4AFA7B] hover:underline">
                      Reputation Endpoints
                    </Link>
                  </li>
                  <li>
                    <Link href="#identity" className="text-[#4AFA7B] hover:underline">
                      Identity Endpoints
                    </Link>
                  </li>
                  <li>
                    <Link href="#data-sources" className="text-[#4AFA7B] hover:underline">
                      Data Sources
                    </Link>
                  </li>
                  <li>
                    <Link href="#webhooks" className="text-[#4AFA7B] hover:underline">
                      Webhooks
                    </Link>
                  </li>
                  <li>
                    <Link href="#rate-limits" className="text-[#4AFA7B] hover:underline">
                      Rate Limits
                    </Link>
                  </li>
                </ul>

                <h3 className="text-xl font-bold mt-8 mb-4 dark:text-white">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/docs/guides/api-quickstart" className="text-gray-600 dark:text-gray-300 hover:text-[#4AFA7B] dark:hover:text-[#4AFA7B]">
                      API Quick Start
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/guides/authentication" className="text-gray-600 dark:text-gray-300 hover:text-[#4AFA7B] dark:hover:text-[#4AFA7B]">
                      Authentication Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/examples/api" className="text-gray-600 dark:text-gray-300 hover:text-[#4AFA7B] dark:hover:text-[#4AFA7B]">
                      API Examples
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
              <div id="authentication">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Authentication</h2>
                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">API Keys</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    All API requests must include your API key in the Authorization header.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm mb-4">
                    <pre className="dark:text-white">
                      Authorization: Bearer YOUR_API_KEY
                    </pre>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    You can generate API keys in your <Link href="/dashboard/settings" className="text-[#4AFA7B] hover:underline">dashboard settings</Link>.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-xl font-bold mb-4 dark:text-white">JWT Authentication</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    For client-side applications, you can use JWT authentication.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                    <pre className="dark:text-white">
                      {`// Request a JWT token
POST /api/v1/auth/token
{
  "wallet_address": "0x...",
  "signature": "0x..."
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div id="reputation">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Reputation Endpoints</h2>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#4AFA7B] px-3 py-1 rounded-md text-black font-bold mr-3">GET</div>
                      <code className="font-mono dark:text-white">/api/v1/reputation/{"{address}"}</code>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Get the reputation score for a specific wallet address.
                    </p>
                    <h4 className="font-bold mb-2 dark:text-white">Parameters</h4>
                    <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
                      <li><code className="font-mono">address</code> - Wallet address to query</li>
                    </ul>
                    <h4 className="font-bold mb-2 dark:text-white">Response</h4>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                      <pre className="dark:text-white">
                        {`{
  "address": "0x7Fc...3A9b",
  "overall_score": 87,
  "dimensions": {
    "trust": 92,
    "expertise": 78,
    "governance": 83
  },
  "last_updated": "2025-04-01T12:34:56Z"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#4AFA7B] px-3 py-1 rounded-md text-black font-bold mr-3">GET</div>
                      <code className="font-mono dark:text-white">/api/v1/reputation/{"{address}"}/history</code>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Get the historical reputation data for a specific wallet address.
                    </p>
                    <h4 className="font-bold mb-2 dark:text-white">Parameters</h4>
                    <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
                      <li><code className="font-mono">address</code> - Wallet address to query</li>
                      <li><code className="font-mono">from</code> (optional) - Start date (ISO format)</li>
                      <li><code className="font-mono">to</code> (optional) - End date (ISO format)</li>
                    </ul>
                    <h4 className="font-bold mb-2 dark:text-white">Response</h4>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                      <pre className="dark:text-white">
                        {`{
  "address": "0x7Fc...3A9b",
  "history": [
    {
      "timestamp": "2025-04-01T12:34:56Z",
      "overall_score": 87,
      "dimensions": {
        "trust": 92,
        "expertise": 78,
        "governance": 83
      }
    },
    {
      "timestamp": "2025-03-01T12:34:56Z",
      "overall_score": 85,
      "dimensions": {
        "trust": 90,
        "expertise": 78,
        "governance": 80
      }
    }
  ]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div id="identity">
                <h2 className="text-3xl font-bold mb-6 dark:text-white">Identity Endpoints</h2>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#4AFA7B] px-3 py-1 rounded-md text-black font-bold mr-3">GET</div>
                      <code className="font-mono dark:text-white">/api/v1/identity/{"{address}"}</code>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Get the identity profile for a specific wallet address.
                    </p>
                    <h4 className="font-bold mb-2 dark:text-white">Parameters</h4>
                    <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
                      <li><code className="font-mono">address</code> - Wallet address to query</li>
                    </ul>
                    <h4 className="font-bold mb-2 dark:text-white">Response</h4>
                    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md font-mono text-sm">
                      <pre className="dark:text-white">
                        {`{
  "address": "0x7Fc...3A9b",
  "identity": {
    "name": "Alex Johnson",
    "verified": true,
    "verification_level": "high",
    "linked_accounts": [
      {
        "platform": "github",
        "username": "alexj",
        "verified": true
      },
      {
        "platform": "twitter",
        "username": "alexj_web3",
        "verified": true
      }
    ]
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
