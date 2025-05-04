"use client"

import { motion } from "framer-motion"
import { Database, Cpu, HardDrive, ArrowRight } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <Database />,
      title: "ADCS Fetchers",
      description: "Collect on-chain and off-chain data from multiple sources",
      color: "#4AFA7B",
    },
    {
      icon: <Cpu />,
      title: "rC Agents",
      description: "Process data with AI models to compute reputation scores",
      color: "#4AFA7B",
    },
    {
      icon: <HardDrive />,
      title: "rD Agents",
      description: "Store and manage scores with cross-chain compatibility",
      color: "#4AFA7B",
    },
  ]

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div
              className="p-6 border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-full"
              style={{ backgroundColor: step.color }}
            >
              <div className="bg-white w-16 h-16 rounded-full border-4 border-black flex items-center justify-center mb-4">
                <div className="w-8 h-8">{step.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">{step.title}</h3>
              <p className="text-black">{step.description}</p>
            </div>

            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-white w-8 h-8 rounded-full border-4 border-black flex items-center justify-center">
                  <ArrowRight size={16} />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-2xl font-bold mb-4">Reputation Score Calculation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold mb-2">Input Data Sources:</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>On-chain transactions & interactions</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>DAO voting history & governance</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>DeFi lending & borrowing behavior</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>GitHub contributions & activity</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>Social media engagement & verification</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Output Reputation Dimensions:</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>Trustworthiness Score (0-100)</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>Governance Influence Rating</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>Technical Expertise Level</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>Community Contribution Index</span>
              </li>
              <li className="flex items-center">
                <div className="w-3 h-3 bg-[#4AFA7B] rounded-full mr-2"></div>
                <span>Overall Zentry Score</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
