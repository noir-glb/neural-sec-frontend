"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-balance">Criminal Detection System</h1>
        <p className="text-xl text-gray-300 mb-8 text-balance">
          Advanced sketch-based criminal detection with real-time monitoring and comprehensive database management
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/targeted-detection"
            className="inline-flex items-center justify-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </Link>
          <Link
            href="/live-monitoring"
            className="inline-flex items-center justify-center px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors border border-slate-700"
          >
            Live Monitoring
          </Link>
        </div>
      </div>
    </div>
  )
}
