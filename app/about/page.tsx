import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About | Zentry - AI-Powered Reputation & Identity Layer for Web3",
  description:
    "Learn about Zentry's mission, vision, and the team behind the AI-powered reputation and identity layer for Web3.",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#4AFA7B] px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">About Zentry</h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Learn about our mission, vision, and the team behind Zentry.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-black border-t-4 border-[#4AFA7B]"></div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Our Mission</h2>
              <p className="text-xl mb-6 dark:text-gray-300">
                To enable a trust-driven Web3 ecosystem by transforming fragmented digital footprints into verifiable,
                privacy-preserving reputation profiles through decentralized AI agents.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We believe that trust should be earned through actions and contributions, not just through token
                ownership or financial resources.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Our Vision</h2>
              <p className="text-xl mb-6 dark:text-gray-300">
                To become the universal trust layer for the decentralized internet—where every wallet, builder, and
                community member can access opportunity, governance, and value based on who they've proven themselves to
                be, not just what they own.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                We envision a Web3 ecosystem where reputation is portable, verifiable, and user-controlled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Our Team
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">Meet the talented individuals behind Zentry.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {[
              {
                name: "Andrea Faith B. Alimorong",
                role: "Co-Founder & CEO",
                bio: "Blockchain expert with 8+ years of experience in decentralized identity systems.",
                image: "https://dafi.hacktivators.com/team/dev2.jpg?height=400&width=400",
              },
              {
                name: "Java Jay J. Bartolome",
                role: "Co-Founder & CTO",
                bio: "AI researcher specializing in reputation systems and privacy-preserving machine learning.",
                image: "https://dafi.hacktivators.com/team/dev1.jpg?height=400&width=400",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border-4 border-black dark:border-white rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                <div className="relative h-64 w-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 dark:text-white">{member.name}</h3>
                  <p className="text-[#4AFA7B] font-bold mb-4">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="inline-block bg-[#4AFA7B] text-black px-6 py-3 text-3xl md:text-4xl font-bold mb-6 -rotate-1 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              Our Partners
            </h2>
            <p className="text-xl max-w-2xl mx-auto dark:text-white">
              We're proud to work with leading organizations in the Web3 ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((partner) => (
              <div
                key={partner}
                className="bg-white dark:bg-gray-800 p-6 border-4 border-black dark:border-white rounded-lg flex items-center justify-center h-32"
              >
                <div className="relative h-16 w-full">
                  <Image
                    src={`https://rivalz.ai/_next/image?url=%2Fnew-landings%2Fnew-logo_v3.png&w=384&q=75`}
                    alt={`Partner ${partner}`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 px-4 bg-[#4AFA7B]">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-black">Join Our Team</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-black">
            We're always looking for talented individuals to join our team and help build the future of Web3 identity
            and reputation.
          </p>
          <Button className="bg-black text-white text-lg px-8 py-6 rounded-md border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
            View Open Positions
          </Button>
        </div>
      </section>
    </>
  )
}
