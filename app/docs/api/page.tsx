import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "API Reference | Zentry Documentation",
  description: "Comprehensive API documentation for integrating Zentry into your applications.",
}

export default function ApiReferencePage() {
  return (
    <div className="api-reference-page">
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
      </section>
      
      {/* Content Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-6">API Documentation</h2>
          <p className="mb-4">
            Our API documentation is currently being updated. Please check back soon for complete documentation.
          </p>
          <Button className="bg-[#4AFA7B] text-black font-bold border-2 border-black hover:bg-white">
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  )
}
