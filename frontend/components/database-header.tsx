"use client"

import { useRouter } from "next/navigation"

export function DatabaseHeader() {
  const router = useRouter()

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-8xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-bold text-white flex-shrink-0">Criminal Database</h1>

        <div className="flex items-center gap-4 flex-nowrap">
          {/* Filter Dropdown */}
          <select className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors">
            <option>Filter</option>
            <option>By Date</option>
            <option>By Name</option>
          </select>

          <button
            onClick={() => router.push("/database/detect")}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}