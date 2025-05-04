"use client"

import { motion } from "framer-motion"
import { CreditCard, Vote, Shield, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UseCases() {
  const useCases = [
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Reputation-Based Lending",
      description:
        "DeFi protocols can assess borrower trust without centralized credit scores, enabling under-collateralized loans based on on-chain reputation.",
      color: "#4AFA7B",
    },
    {
      icon: <Vote className="h-8 w-8" />,
      title: "DAO Governance & Voting",
      description:
        "Weight votes or eligibility based on verified reputation, not just token holding, creating more equitable governance systems.",
      color: "#4AFA7B",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Sybil Resistance",
      description:
        "Reduce abuse in airdrops and campaigns by validating identity integrity and past behavior across multiple chains.",
      color: "#4AFA7B",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Secure Access Control",
      description:
        "Gate certain features to only users with high community reputation or verified backgrounds, enhancing security.",
      color: "#4AFA7B",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Digital Resume for Web3",
      description:
        "Users can export and showcase their reputation scores in NFT form or integrate into decentralized social graphs.",
      color: "#4AFA7B",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {useCases.map((useCase, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 border-black"
            style={{ backgroundColor: useCase.color }}
          >
            {useCase.icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
          <p className="mb-4">{useCase.description}</p>
          <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white">
            Learn More
          </Button>
        </motion.div>
      ))}

      <motion.div
        className="md:col-span-2 bg-black text-white p-8 border-4 border-[#4AFA7B] rounded-lg shadow-[8px_8px_0px_0px_rgba(74,250,123,0.5)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Ready to integrate Zentry into your dApp?</h3>
            <p className="mb-6">
              Our developer-friendly API and smart contract toolkit make it easy to add reputation-based features to
              your Web3 application.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-black border-2 border-white hover:bg-transparent hover:text-white">
                Get Started
              </Button>
              <Button variant="outline" className="border-2 border-white hover:bg-white hover:text-black">
                View Documentation
              </Button>
            </div>
          </div>
          <div className="bg-[#4AFA7B] p-6 border-4 border-white rounded-lg text-black">
            <h4 className="font-bold mb-2">Integration Example</h4>
            <div className="bg-black p-4 rounded-md border-2 border-white font-mono text-sm">
              <pre className="text-white">
                {`// Check user reputation
const score = await zentry.getScore(
  userAddress, 
  { dimension: "trust" }
);

// Apply access control
if (score > 80) {
  // Grant premium access
}`}
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
