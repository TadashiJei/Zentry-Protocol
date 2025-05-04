"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Share2, Download, Shield, Award, Users, Activity, Database, Settings } from "lucide-react"

export default function ReputationExplorer() {
  const [connected, setConnected] = useState(false)

  const handleConnect = () => {
    setConnected(true)
  }

  return (
    <div className="bg-white border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      {!connected ? (
        <div className="p-12 text-center">
          <div className="w-24 h-24 bg-[#FFDE59] rounded-full border-4 border-black flex items-center justify-center mx-auto mb-6">
            <Wallet size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-4">Connect Your Wallet</h3>
          <p className="text-lg mb-8 max-w-md mx-auto">
            Connect your wallet to view your Zentry Score and manage your Web3 identity.
          </p>
          <Button
            onClick={handleConnect}
            className="bg-black text-white text-lg px-8 py-6 rounded-md border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
          >
            Connect Wallet
          </Button>
        </div>
      ) : (
        <div>
          <div className="bg-[#4AFA7B] p-6 border-b-4 border-black">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 bg-white rounded-full border-4 border-black flex items-center justify-center mr-4">
                  <div className="w-6 h-6 rounded-full bg-[#FFDE59]"></div>
                </div>
                <div>
                  <h3 className="text-black font-bold">0x7Fc...3A9b</h3>
                  <p className="text-black opacity-80 text-sm">Connected: Ethereum Mainnet</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-transparent text-black border-2 border-black hover:bg-white hover:text-black"
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-black border-2 border-black hover:bg-white hover:text-black"
                >
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#4AFA7B] p-4 border-4 border-black rounded-lg text-center">
                <h4 className="font-bold">OVERALL SCORE</h4>
                <p className="text-4xl font-black">87</p>
              </div>
              <div className="bg-white p-4 border-4 border-black rounded-lg text-center">
                <Shield className="mx-auto mb-1" />
                <h4 className="font-bold">TRUST</h4>
                <p className="text-2xl font-bold">92</p>
              </div>
              <div className="bg-white p-4 border-4 border-black rounded-lg text-center">
                <Award className="mx-auto mb-1" />
                <h4 className="font-bold">EXPERTISE</h4>
                <p className="text-2xl font-bold">78</p>
              </div>
              <div className="bg-white p-4 border-4 border-black rounded-lg text-center">
                <Users className="mx-auto mb-1" />
                <h4 className="font-bold">GOVERNANCE</h4>
                <p className="text-2xl font-bold">83</p>
              </div>
            </div>

            <Tabs defaultValue="activity">
              <TabsList className="w-full bg-[#F0F0F0] p-1 border-4 border-black rounded-lg mb-4">
                <TabsTrigger
                  value="activity"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-black rounded-md"
                >
                  <Activity className="mr-2 h-4 w-4" /> Activity
                </TabsTrigger>
                <TabsTrigger
                  value="data-sources"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-black rounded-md"
                >
                  <Database className="mr-2 h-4 w-4" /> Data Sources
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:border-2 data-[state=active]:border-black rounded-md"
                >
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Recent Activity</h3>
                  <div className="space-y-2">
                    {[
                      { type: "DAO Vote", platform: "Uniswap", date: "2 days ago", impact: "+3" },
                      { type: "DeFi Transaction", platform: "Aave", date: "5 days ago", impact: "+2" },
                      { type: "NFT Purchase", platform: "OpenSea", date: "1 week ago", impact: "+1" },
                      { type: "GitHub Commit", platform: "Ethereum", date: "2 weeks ago", impact: "+5" },
                      { type: "Social Verification", platform: "Twitter", date: "3 weeks ago", impact: "+4" },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="p-3 border-2 border-black rounded-md flex justify-between items-center"
                      >
                        <div>
                          <h4 className="font-bold">{activity.type}</h4>
                          <p className="text-sm">
                            {activity.platform} • {activity.date}
                          </p>
                        </div>
                        <div className="bg-[#FFDE59] px-2 py-1 rounded-md border-2 border-black font-bold">
                          {activity.impact}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="data-sources">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Connected Data Sources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { name: "Ethereum", status: "Connected", score: 92 },
                      { name: "GitHub", status: "Connected", score: 78 },
                      { name: "Twitter", status: "Connected", score: 85 },
                      { name: "DAO Votes", status: "Connected", score: 83 },
                      { name: "Polygon", status: "Not Connected", score: 0 },
                      { name: "LinkedIn", status: "Not Connected", score: 0 },
                    ].map((source, index) => (
                      <div
                        key={index}
                        className={`p-4 border-2 border-black rounded-md flex justify-between items-center ${source.status === "Connected" ? "bg-white" : "bg-gray-100"}`}
                      >
                        <div>
                          <h4 className="font-bold">{source.name}</h4>
                          <p
                            className={`text-sm ${source.status === "Connected" ? "text-green-600" : "text-gray-500"}`}
                          >
                            {source.status}
                          </p>
                        </div>
                        {source.status === "Connected" ? (
                          <div className="bg-[#4AFA7B] text-black px-2 py-1 rounded-md border-2 border-black font-bold">
                            {source.score}
                          </div>
                        ) : (
                          <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white">
                            Connect
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Identity Settings</h3>
                  <div className="p-4 border-4 border-black rounded-md space-y-4">
                    <div>
                      <h4 className="font-bold mb-2">Privacy Controls</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span>Make profile public</span>
                          <div className="w-12 h-6 bg-[#4AFA7B] rounded-full border-2 border-black relative">
                            <div className="absolute right-0 top-0 w-5 h-5 bg-white rounded-full border-2 border-black transform -translate-y-0.5 translate-x-0.5"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Allow data sharing with dApps</span>
                          <div className="w-12 h-6 bg-[#4AFA7B] rounded-full border-2 border-black relative">
                            <div className="absolute right-0 top-0 w-5 h-5 bg-white rounded-full border-2 border-black transform -translate-y-0.5 translate-x-0.5"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Show activity feed</span>
                          <div className="w-12 h-6 bg-gray-300 rounded-full border-2 border-black relative">
                            <div className="absolute left-0 top-0 w-5 h-5 bg-white rounded-full border-2 border-black transform -translate-y-0.5 -translate-x-0.5"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">Export Options</h4>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white">
                          <Download className="mr-2 h-4 w-4" /> JSON
                        </Button>
                        <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white">
                          <Download className="mr-2 h-4 w-4" /> PDF Report
                        </Button>
                        <Button variant="outline" className="border-2 border-black hover:bg-black hover:text-white">
                          <Download className="mr-2 h-4 w-4" /> NFT Badge
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}
