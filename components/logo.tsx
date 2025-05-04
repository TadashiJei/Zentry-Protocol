"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface LogoProps {
  variant?: "default" | "large"
}

export default function Logo({ variant = "default" }: LogoProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={variant === "large" ? "w-40 h-40" : "w-10 h-10"} />
  }

  if (variant === "large") {
    return (
      <div className="relative w-40 h-40">
        <Image src="/images/logo.svg" alt="Zentry Logo" fill priority className="object-contain" />
      </div>
    )
  }

  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-10 h-10 mr-2">
        <Image src="/images/logo.svg" alt="Zentry Logo" fill priority className="object-contain" />
      </div>
      <span className="text-2xl font-black">Zentry</span>
    </Link>
  )
}
