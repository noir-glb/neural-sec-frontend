"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Targeted Detection", href: "/targeted-detection" },
    { label: "Live Monitoring", href: "/live-monitoring" },
    { label: "Database", href: "/database" },
  ]

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Text - Far Left */}
          <div className="shrink-0 flex items-center gap-2">
            {/* Logo Image */}
            <Link href="/">
              <Image
                src="/logo.svg" // Replace with your logo path in /public
                alt="Neural Security Logo"
                width={32}
                height={32}
                className="rounded"
                priority // Loads fast for above-the-fold
              />
            </Link>
            <Link href="/" className="text-xl font-bold text-white">
              Neural Security
            </Link>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Navigation - Far Right */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href ? "text-red-500" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}