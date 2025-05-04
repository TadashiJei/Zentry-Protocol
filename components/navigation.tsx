"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Github, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/logo"
import { motion, AnimatePresence } from "framer-motion"
import { SimpleConnectButton } from "./wallet/simple-connect-button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "Explorer", path: "/explorer" },
    { name: "Use Cases", path: "/use-cases" },
    { name: "Contracts", path: "/contracts" },
    { name: "Docs", path: "/docs" },
    { name: "About", path: "/about" },
  ]

  return (
    <header
      className="sticky top-0 z-40 w-full bg-white dark:bg-black border-b-4 border-black dark:border-white shadow-md"
    >
      <div className="container mx-auto max-w-6xl py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative font-bold text-base transition-transform hover:scale-105 ${
                  pathname === item.path
                    ? "text-black dark:text-white bg-[#4AFA7B] px-4 py-2 rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                    : "bg-white dark:bg-black px-4 py-2 rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <button className="bg-white dark:bg-black p-2 rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <ThemeToggle />
              </button>
              
              <Link 
                href="https://github.com" 
                target="_blank" 
                className="bg-white dark:bg-black p-2 rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors flex items-center justify-center"
              >
                <Github className="h-5 w-5" />
              </Link>
              
              <div className="bg-white dark:bg-black rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
                <SimpleConnectButton />
              </div>
            </div>
            <button
              className="md:hidden flex items-center justify-center bg-white dark:bg-black p-2 rounded-md border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-black border-t-4 border-black dark:border-white shadow-lg"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`font-extrabold text-lg py-3 px-4 rounded-md transition-transform hover:scale-105 ${
                    pathname === item.path
                      ? "text-black dark:text-white bg-[#4AFA7B] border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                      : "border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-5 mt-2 border-t-4 border-black dark:border-white">
                <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] p-1">
                  <ThemeToggle />
                </div>
                <Link 
                  href="https://github.com" 
                  target="_blank"
                  className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] p-2"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] overflow-hidden">
                  <SimpleConnectButton />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
