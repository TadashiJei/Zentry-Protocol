import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import ReputationExplorer from "@/components/reputation-explorer"

export const metadata: Metadata = {
  title: "Reputation Explorer | Zentry - AI-Powered Reputation & Identity Layer for Web3",
  description: "Connect your wallet to view your Zentry Score and manage your Web3 identity.",
}

export default function ExplorerPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#4AFA7B] px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">Reputation Explorer</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Connect your wallet to view your Zentry Score and manage your Web3 identity.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black border-t-4 border-[#4AFA7B]"></div>
      </section>

      {/* Explorer Section */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <ReputationExplorer />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Explorer Features
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Discover the powerful features of the Zentry Reputation Explorer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Multi-Dimensional Scores</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                View your reputation across multiple dimensions including trustworthiness, expertise, and governance
                influence.
              </p>
              <Button className="w-full bg-[#4AFA7B] text-black border-4 border-black dark:border-white hover:bg-white hover:text-black transition-all">
                Learn More
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Data Source Management</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Connect and manage your data sources to enhance your reputation profile and improve your scores.
              </p>
              <Button className="w-full bg-[#4AFA7B] text-black border-4 border-black dark:border-white hover:bg-white hover:text-black transition-all">
                Connect Sources
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-bold mb-4 dark:text-white">Export & Share</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Export your reputation as verifiable credentials or share your profile with dApps and services.
              </p>
              <Button className="w-full bg-[#4AFA7B] text-black border-4 border-black dark:border-white hover:bg-white hover:text-black transition-all">
                Export Options
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
