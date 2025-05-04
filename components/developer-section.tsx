"use client"

import { motion } from "framer-motion"
import { Code, Terminal, BookOpen, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DeveloperSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Tabs defaultValue="javascript">
          <TabsList className="w-full bg-[#F0F0F0] p-1 border-4 border-black rounded-lg mb-4">
            <TabsTrigger
              value="javascript"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-black rounded-md"
            >
              JavaScript
            </TabsTrigger>
            <TabsTrigger
              value="solidity"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-black rounded-md"
            >
              Solidity
            </TabsTrigger>
            <TabsTrigger
              value="python"
              className="flex-1 data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-black rounded-md"
            >
              Python
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="javascript"
            className="p-6 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h3 className="text-xl font-bold mb-4">JavaScript SDK Example</h3>
            <div className="bg-[#1E1E1E] p-4 rounded-md font-mono text-sm text-white overflow-x-auto">
              <pre>{`// Initialize Zentry SDK
import { Zentry } from '@zentry/sdk';

const zentry = new Zentry({
  apiKey: process.env.ZENTRY_API_KEY,
  network: 'mainnet'
});

// Get user's reputation score
async function getUserReputation(address) {
  try {
    const score = await zentry.getReputationScore(address);
    
    console.log('Overall Score:', score.overall);
    console.log('Trust Score:', score.dimensions.trust);
    console.log('Expertise Score:', score.dimensions.expertise);
    console.log('Governance Score:', score.dimensions.governance);
    
    return score;
  } catch (error) {
    console.error('Error fetching reputation:', error);
  }
}

// Implement access control based on reputation
async function checkAccess(address, requiredScore = 70) {
  const score = await getUserReputation(address);
  return score.overall >= requiredScore;
}

// Example usage in a Next.js API route
export async function POST(request) {
  const { address } = await request.json();
  const hasAccess = await checkAccess(address);
  
  return Response.json({ hasAccess });
}`}</pre>
            </div>
          </TabsContent>

          <TabsContent
            value="solidity"
            className="p-6 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h3 className="text-xl font-bold mb-4">Solidity Integration Example</h3>
            <div className="bg-[#1E1E1E] p-4 rounded-md font-mono text-sm text-white overflow-x-auto">
              <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@zentry/contracts/IZentryOracle.sol";

contract ReputationGatedAccess {
    IZentryOracle public zentryOracle;
    uint256 public requiredScore;
    
    constructor(address _oracleAddress, uint256 _requiredScore) {
        zentryOracle = IZentryOracle(_oracleAddress);
        requiredScore = _requiredScore;
    }
    
    modifier onlyTrustedUsers() {
        uint256 score = zentryOracle.getReputationScore(msg.sender);
        require(score >= requiredScore, "Insufficient reputation score");
        _;
    }
    
    function premiumFunction() external onlyTrustedUsers {
        // Function only accessible to users with sufficient reputation
    }
    
    function updateRequiredScore(uint256 _newScore) external {
        // Admin function to update required score
        requiredScore = _newScore;
    }
}`}</pre>
            </div>
          </TabsContent>

          <TabsContent
            value="python"
            className="p-6 bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <h3 className="text-xl font-bold mb-4">Python SDK Example</h3>
            <div className="bg-[#1E1E1E] p-4 rounded-md font-mono text-sm text-white overflow-x-auto">
              <pre>{`# Initialize Zentry SDK
from zentry import ZentryClient

zentry = ZentryClient(
    api_key="YOUR_API_KEY",
    network="mainnet"
)

# Get user's reputation score
async def get_user_reputation(address):
    try:
        score = await zentry.get_reputation_score(address)
        
        print(f"Overall Score: {score.overall}")
        print(f"Trust Score: {score.dimensions.trust}")
        print(f"Expertise Score: {score.dimensions.expertise}")
        print(f"Governance Score: {score.dimensions.governance}")
        
        return score
    except Exception as e:
        print(f"Error fetching reputation: {e}")
        return None

# Implement access control based on reputation
async def check_access(address, required_score=70):
    score = await get_user_reputation(address)
    if not score:
        return False
    return score.overall >= required_score

# Example usage in a FastAPI endpoint
@app.post("/check-access")
async def check_user_access(request: AccessRequest):
    has_access = await check_access(request.address)
    return {"has_access": has_access}`}</pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-6">
        <motion.div
          className="p-6 bg-[#4AFA7B] text-black border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center mb-4">
            <Code className="text-black" />
          </div>
          <h3 className="text-xl font-bold mb-2">Developer Resources</h3>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              <span>API Documentation</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              <span>SDK Reference</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              <span>Smart Contract Examples</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              <span>Integration Guides</span>
            </li>
          </ul>
          <Button className="w-full bg-white text-black border-2 border-black hover:bg-black hover:text-white">
            <BookOpen className="mr-2 h-4 w-4" /> View Docs
          </Button>
        </motion.div>

        <motion.div
          className="p-6 bg-[#4AFA7B] text-black border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white w-12 h-12 rounded-full border-4 border-black flex items-center justify-center mb-4">
            <Terminal className="text-black" />
          </div>
          <h3 className="text-xl font-bold mb-2">Get Started</h3>
          <div className="bg-black p-3 rounded-md font-mono text-sm mb-4 border-2 border-white">
            <pre className="text-white">npm install @zentry/sdk</pre>
          </div>
          <Button className="w-full bg-white text-black border-2 border-black hover:bg-black hover:text-white">
            <Github className="mr-2 h-4 w-4" /> GitHub Repo
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
