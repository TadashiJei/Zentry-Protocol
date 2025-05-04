import type { Metadata } from "next"
import { CreditCard, Vote } from "lucide-react"
import { Button } from "@/components/ui/button"
import UseCases from "@/components/use-cases"

export const metadata: Metadata = {
  title: "Use Cases | Zentry - AI-Powered Reputation & Identity Layer for Web3",
  description: "Discover how Zentry can transform Web3 applications with trust and reputation.",
}

export default function UseCasesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#4AFA7B] px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">Use Cases</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Discover how Zentry can transform Web3 applications with trust and reputation.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black border-t-4 border-[#4AFA7B]"></div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <UseCases />
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Case Studies
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Real-world examples of how organizations are using Zentry to enhance their Web3 applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center mb-6">
                <div className="bg-[#4AFA7B] w-12 h-12 rounded-full flex items-center justify-center mr-4 border-2 border-black dark:border-white">
                  <CreditCard className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold dark:text-white">DeFi Lending Protocol</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A leading DeFi protocol implemented Zentry to enable under-collateralized loans based on borrowers'
                reputation scores, reducing capital inefficiency by 40%.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4AFA7B] rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">40% reduction in collateral requirements</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4AFA7B] rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">
                    95% repayment rate for reputation-based loans
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4AFA7B] rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">3x increase in new borrowers</span>
                </li>
              </ul>
              <Button className="w-full bg-[#4AFA7B] text-black border-4 border-black dark:border-white hover:bg-white hover:text-black transition-all">
                Read Full Case Study
              </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center mb-6">
                <div className="bg-[#4AFA7B] w-12 h-12 rounded-full flex items-center justify-center mr-4 border-2 border-black dark:border-white">
                  <Vote className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold dark:text-white">Governance DAO</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                A major DAO implemented Zentry to weight votes based on reputation rather than just token holdings,
                resulting in more equitable governance and higher quality proposals.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4AFA7B] rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">60% increase in proposal quality</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4AFA7B] rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">50% more community members participating</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-[#4AFA7B] rounded-full mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">Reduced influence of whale token holders</span>
                </li>
              </ul>
              <Button className="w-full bg-[#4AFA7B] text-black border-4 border-black dark:border-white hover:bg-white hover:text-black transition-all">
                Read Full Case Study
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
