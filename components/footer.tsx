import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import Logo from "@/components/logo"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 border-t-4 border-[#4AFA7B]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-gray-400">AI-Powered Reputation & Identity Layer for Web3</p>
            <div className="flex space-x-4 mt-6">
              <Link href="https://github.com" target="_blank" className="hover:text-[#4AFA7B]">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com" target="_blank" className="hover:text-[#4AFA7B]">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="hover:text-[#4AFA7B]">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="mailto:info@zentry.io" className="hover:text-[#4AFA7B]">
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-[#4AFA7B]">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-gray-400 hover:text-[#4AFA7B]">
                  Explorer
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="text-gray-400 hover:text-[#4AFA7B]">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-gray-400 hover:text-[#4AFA7B]">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Developers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-gray-400 hover:text-[#4AFA7B]">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-gray-400 hover:text-[#4AFA7B]">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/docs/sdk" className="text-gray-400 hover:text-[#4AFA7B]">
                  SDK
                </Link>
              </li>
              <li>
                <Link href="/docs/examples" className="text-gray-400 hover:text-[#4AFA7B]">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#4AFA7B]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-[#4AFA7B]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-[#4AFA7B]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#4AFA7B]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 Zentry. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-[#4AFA7B]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 text-sm hover:text-[#4AFA7B]">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 text-sm hover:text-[#4AFA7B]">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
