"use client"

import type { Metadata } from "next"
import Link from "next/link"
import { Code, FileText, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "SDK Documentation | Zentry - AI-Powered Reputation & Identity Layer for Web3",
  description:
    "Client libraries and SDKs for different programming languages and frameworks to integrate Zentry into your applications.",
}

export default function SdkPage() {
  return (
    <div className="sdk-documentation-page">
      {/* Hero Section */}
      <section className="relative bg-[#4AFA7B] px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">SDK Documentation</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Client libraries and SDKs for different programming languages and frameworks.
            </p>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-6">SDK Documentation</h2>
          <p className="mb-4">
            Our SDK documentation is currently being updated. Please check back soon for complete documentation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-center">
              <Terminal className="mx-auto mb-2 text-[#4AFA7B]" />
              <h4 className="font-bold dark:text-white">Easy Integration</h4>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-center">
              <Code className="mx-auto mb-2 text-[#4AFA7B]" />
              <h4 className="font-bold dark:text-white">Type Safety</h4>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md text-center">
              <FileText className="mx-auto mb-2 text-[#4AFA7B]" />
              <h4 className="font-bold dark:text-white">Comprehensive Docs</h4>
            </div>
          </div>
          <div className="mt-8">
            <Button className="bg-[#4AFA7B] text-black font-bold border-2 border-black hover:bg-white">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
