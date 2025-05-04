"use client"
import { motion } from "framer-motion"

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-full">
      {/* Background grid */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="border-2 border-black opacity-10"></div>
        ))}
      </div>

      {/* Identity card */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-64 h-80 bg-[#111] text-white rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="bg-[#4AFA7B] h-16 border-b-4 border-black flex items-center justify-center">
          <h3 className="text-black font-bold text-xl">IDENTITY</h3>
        </div>
        <div className="p-4">
          <div className="w-16 h-16 rounded-full bg-[#4AFA7B] border-4 border-black mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 border-2 border-black"></div>
          <div className="h-4 bg-gray-200 rounded mb-2 border-2 border-black w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 border-2 border-black w-1/2"></div>
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 bg-[#4AFA7B] rounded border-2 border-black"></div>
            <div className="h-8 bg-[#4AFA7B] rounded border-2 border-black"></div>
            <div className="h-8 bg-[#4AFA7B] rounded border-2 border-black"></div>
            <div className="h-8 bg-gray-200 rounded border-2 border-black"></div>
          </div>
        </div>
      </motion.div>

      {/* Reputation score */}
      <motion.div
        className="absolute top-[10%] right-[10%] w-40 h-40 bg-[#4AFA7B] rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="text-center">
          <h3 className="text-black font-bold">REPUTATION</h3>
          <p className="text-black text-4xl font-black">87</p>
        </div>
      </motion.div>

      {/* Data points */}
      <motion.div
        className="absolute bottom-[15%] right-[20%] w-48 h-48 bg-[#4AFA7B] rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="font-bold mb-2">DATA SOURCES</h3>
        <div className="space-y-2">
          <div className="h-6 bg-white rounded border-2 border-black flex items-center px-2">
            <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
            <span className="text-sm">Ethereum</span>
          </div>
          <div className="h-6 bg-white rounded border-2 border-black flex items-center px-2">
            <div className="w-4 h-4 bg-black rounded-full mr-2"></div>
            <span className="text-sm">GitHub</span>
          </div>
          <div className="h-6 bg-white rounded border-2 border-black flex items-center px-2">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Twitter</span>
          </div>
          <div className="h-6 bg-white rounded border-2 border-black flex items-center px-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm">DAO Votes</span>
          </div>
        </div>
      </motion.div>

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <motion.path
          d="M120,180 C180,220 240,150 300,200"
          stroke="#000000"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.path
          d="M300,200 C350,240 380,280 350,320"
          stroke="#000000"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </svg>
    </div>
  )
}
