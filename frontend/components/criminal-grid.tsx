"use client"

import { useState, useEffect } from "react"

interface Criminal {
  id: number
  name: string
  date: string
  status: "Active" | "Inactive"
}

interface CriminalGridProps {
  onSelectCriminal: (id: number) => void
}

export function CriminalGrid({ onSelectCriminal }: CriminalGridProps) {
  const [criminals, setCriminals] = useState<Criminal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fake criminals for now (comment out fetchCriminals() in useEffect and uncomment setCriminals(fakeCriminals) below when ready)
  const fakeCriminals: Criminal[] = [
    { id: 1, name: "John Doe", date: "Oct 22, 2025", status: "Active" },
    { id: 2, name: "Jane Smith", date: "Oct 21, 2025", status: "Active" },
    { id: 3, name: "Mike Johnson", date: "Oct 20, 2025", status: "Inactive" },
    { id: 4, name: "Sarah Williams", date: "Oct 19, 2025", status: "Active" },
    { id: 5, name: "Robert Brown", date: "Oct 18, 2025", status: "Active" },
    { id: 6, name: "Emily Davis", date: "Oct 17, 2025", status: "Active" },
  ]

  const fetchCriminals = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/criminals')
      if (!response.ok) {
        throw new Error('Failed to fetch criminals')
      }
      const data: Criminal[] = await response.json()
      setCriminals(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // For now, use fake data - uncomment fetchCriminals() below when backend is ready
    setCriminals(fakeCriminals)
    setLoading(false)

    // fetchCriminals() // Uncomment this line and comment the setCriminals above when backend is ready
  }, [])

  const handleRefresh = () => {
    // For now, refreshes fake data - update to fetchCriminals() when backend ready
    setCriminals(fakeCriminals)
    // fetchCriminals() // Uncomment when backend ready
  }

  const handleCardClick = (id: number) => {
    onSelectCriminal(id)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden animate-pulse h-40 flex"
          >
            {/* Image Skeleton */}
            <div className="w-40 bg-slate-700" />
            {/* Info Skeleton */}
            <div className="p-3 flex-1 space-y-2">
              <div className="h-4 bg-slate-700 rounded w-full" />
              <div className="h-3 bg-slate-700 rounded w-3/4" />
              <div className="flex items-center justify-between">
                <div className="h-4 bg-slate-700 rounded w-1/4" />
                <div className="h-6 w-12 bg-slate-700 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-red-400 mb-4">Error: {error}</p>
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {criminals.length === 0 ? (
        <div className="col-span-full text-center py-8 text-gray-400">
          No criminals found
        </div>
      ) : (
        criminals.map((criminal) => (
          <div
            key={criminal.id}
            onClick={() => handleCardClick(criminal.id)}
            role="button"
            tabIndex={0}
            className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-red-500 transition-all hover:shadow-lg hover:shadow-red-500/20 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 h-40 flex"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleCardClick(criminal.id)
              }
            }}
          >
            {/* Image - Left Side (Wider) */}
            <div className="w-48 bg-linear-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden relative shrink-0">
              <div className="w-full h-full bg-slate-700 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/50 transition-colors" />
            </div>

            {/* Info - Right Side */}
            <div className="p-3 flex-1 flex flex-col justify-center">
              <h3 className="font-semibold text-white text-sm mb-1 truncate">{criminal.name}</h3>
              <p className="text-xs text-gray-400 mb-2">{criminal.date}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    criminal.status === "Active" ? "bg-red-600/20 text-red-400" : "bg-gray-600/20 text-gray-400"
                  }`}
                >
                  {criminal.status}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectCriminal(criminal.id)
                  }}
                  className="text-xs px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}