"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Clock } from "lucide-react"

interface DetectAlert {
  id: number
  criminal: string
  time: string
  type: "Detected" | "Alert"
}

export function DatabaseDetectLog() {
  const [alerts, setAlerts] = useState<DetectAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fake alerts for now (comment out fetchAlerts() in useEffect and uncomment setAlerts(fakeAlerts) below when ready)
  const fakeAlerts: DetectAlert[] = [
    { id: 1, criminal: "John Doe", time: "2 mins ago", type: "Detected" },
    { id: 2, criminal: "Jane Smith", time: "5 mins ago", type: "Detected" },
    { id: 3, criminal: "Mike Johnson", time: "12 mins ago", type: "Alert" },
    { id: 4, criminal: "Sarah Williams", time: "18 mins ago", type: "Detected" },
    { id: 5, criminal: "Robert Brown", time: "25 mins ago", type: "Alert" },
  ]

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/detect-alerts')
      if (!response.ok) {
        throw new Error('Failed to fetch alerts')
      }
      const data: DetectAlert[] = await response.json()
      setAlerts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // For now, use fake data - uncomment fetchAlerts() below when backend is ready
    setAlerts(fakeAlerts)
    setLoading(false)

    // fetchAlerts() // Uncomment this line and comment the setAlerts above when backend is ready
  }, [])

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 px-4 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" />
            Alert Log
          </h2>
        </div>

        {/* Loading Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-6 h-6 border-2 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto mb-2" />
            <p className="text-gray-400">Loading alerts...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 px-4 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertCircle size={20} className="text-red-500" />
            Alert Log
          </h2>
        </div>

        {/* Error Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <p className="text-red-400 mb-4">Error: {error}</p>
            <button
              onClick={() => fetchAlerts()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <AlertCircle size={20} className="text-red-500" />
          Alert Log
        </h2>
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-slate-800">
          {alerts.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No alerts yet
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="px-4 py-3 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div
                      className={`w-2 h-2 rounded-full ${alert.type === "Detected" ? "bg-red-500" : "bg-yellow-500"}`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{alert.criminal}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={12} className="text-gray-500" />
                      <p className="text-xs text-gray-400">{alert.time}</p>
                    </div>
                    <p className={`text-xs mt-1 ${alert.type === "Detected" ? "text-red-400" : "text-yellow-400"}`}>
                      {alert.type}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}