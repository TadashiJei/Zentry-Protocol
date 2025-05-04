import { ArrowRight, Github, Layers, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroAnimation from "@/components/hero-animation"
import FeatureCard from "@/components/feature-card"
import HowItWorks from "@/components/how-it-works"
import ReputationExplorer from "@/components/reputation-explorer"
import UseCases from "@/components/use-cases"
import DeveloperSection from "@/components/developer-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zentry - AI-Powered Reputation & Identity for Web3",
  description:
    "Zentry aggregates on-chain activity and off-chain social signals to compute verifiable reputation scores for Web3 users.",
  keywords: "Web3, Reputation, Identity, Blockchain, AI, Decentralized Identity, Rivalz, Trust Layer",
  openGraph: {
    title: "Zentry - AI-Powered Reputation & Identity for Web3",
    description:
      "Zentry aggregates on-chain activity and off-chain social signals to compute verifiable reputation scores for Web3 users.",
    images: [
      {
        url: "/images/zentry-pitch.png",
        width: 1200,
        height: 630,
        alt: "Zentry - AI-Powered Reputation & Identity Layer for Web3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentry - AI-Powered Reputation & Identity for Web3",
    description:
      "Zentry aggregates on-chain activity and off-chain social signals to compute verifiable reputation scores for Web3 users.",
    images: ["/images/zentry-pitch.png"],
  },
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#4AFA7B] px-4 py-20 md:py-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-white px-4 py-2 mb-4 rotate-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-lg font-bold">Built on Rivalz</h2>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                AI-Powered <span className="text-white">Identity</span> & <span className="text-black">Reputation</span>{" "}
                for Web3
              </h1>
              <p className="text-xl mb-8 max-w-lg">
                Zentry aggregates on-chain activity and off-chain social signals to compute verifiable reputation scores
                for Web3 users.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-black text-white text-lg px-8 py-6 rounded-md border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                  Connect Wallet <ArrowRight className="ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="bg-white text-black text-lg px-8 py-6 rounded-md border-4 border-black hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <HeroAnimation />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black border-t-4 border-[#4AFA7B]"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 rotate-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Key Features
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Zentry creates a global trust layer for Web3, enabling autonomous, privacy-respecting reputation systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layers />}
              title="Decentralized Identity Aggregation"
              description="Links on-chain behavior and off-chain social signals into a single cryptographic identity profile."
              color="#4AFA7B"
            />
            <FeatureCard
              icon={<Zap />}
              title="AI-Driven Reputation Modeling"
              description="Uses rC agents to analyze data and compute multi-dimensional reputation scores."
              color="#4AFA7B"
            />
            <FeatureCard
              icon={<Shield />}
              title="Verifiable and Portable Identity"
              description="Leverages rD agents to securely store and manage scores with cross-chain compatibility."
              color="#4AFA7B"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-[#F0F0F0] dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 -rotate-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              How It Works
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Zentry uses Rivalz's Autonomous Decentralized Compute Stack to create a comprehensive reputation system.
            </p>
          </div>

          <HowItWorks />
        </div>
      </section>

      {/* Reputation Explorer */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 rotate-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Reputation Explorer
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Connect your wallet to view your Zentry Score and manage your Web3 identity.
            </p>
          </div>

          <ReputationExplorer />
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 bg-[#4AFA7B]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-black text-white px-6 py-3 text-3xl md:text-4xl font-bold mb-6 -rotate-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]">
              Use Cases
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Discover how Zentry can transform Web3 applications with trust and reputation.
            </p>
          </div>

          <UseCases />
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 px-4 bg-[#F0F0F0] dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 rotate-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              For Developers
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              Integrate Zentry into your dApps with our developer tools and resources.
            </p>
          </div>

          <DeveloperSection />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 -rotate-1 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
                About Zentry
              </h2>
              <p className="text-xl mb-6">
                Our vision is to create a global trust layer for Web3, enabling autonomous, privacy-respecting
                reputation systems that help users prove who they are, what they've done, and what they're trusted
                for—without sacrificing decentralization or user control.
              </p>
              <p className="text-xl mb-6">
                Built entirely on Rivalz's decentralized AI stack, Zentry uses ADCS Fetchers, rC agents, and rD agents
                to create a comprehensive identity and reputation infrastructure.
              </p>
              <div className="flex gap-4">
                <Button className="bg-white text-black text-lg px-6 py-4 rounded-md border-4 border-black hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
                  Contact Us
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white text-lg px-6 py-4 rounded-md border-4 border-white hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]"
                >
                  <Github className="mr-2" /> GitHub
                </Button>
              </div>
            </div>
            <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-md">
              <h3 className="text-2xl font-bold mb-4 text-black">Stay Updated</h3>
              <p className="text-black mb-4">Join our newsletter to get the latest updates on Zentry.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border-4 border-black rounded-md focus:outline-none"
                />
                <Button className="bg-black text-white px-6 py-3 rounded-md border-4 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
