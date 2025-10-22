"use client"

import { useState, useEffect } from "react"
import { ChevronDown, Download } from "lucide-react"

interface Alert {
  id: number
  timestamp: string
  name: string
  confidence: string
  location: string
}

export function AlertLog() {
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fake alerts for now (comment out fetchAlerts() in useEffect and uncomment setAlerts(fakeAlerts) below when ready)
  const fakeAlerts: Alert[] = [
    {
      id: 1,
      timestamp: "2025-10-22 14:32:15",
      name: "John Doe",
      confidence: "95%",
      location: "Camera 1, Lobby",
    },
    {
      id: 2,
      timestamp: "2025-10-22 14:28:42",
      name: "Jane Smith",
      confidence: "87%",
      location: "Camera 3, Hallway",
    },
    {
      id: 3,
      timestamp: "2025-10-22 14:25:10",
      name: "Mike Johnson",
      confidence: "92%",
      location: "Camera 2, Entrance",
    },
    {
      id: 4,
      timestamp: "2025-10-22 14:20:45",
      name: "Sarah Williams",
      confidence: "78%",
      location: "Camera 4, Exit",
    },
  ]

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/alerts')
      if (!response.ok) {
        throw new Error('Failed to fetch alerts')
      }
      const data: Alert[] = await response.json()
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

  const handleRefresh = () => {
    // For now, refreshes fake data - update to fetchAlerts() when backend ready
    setAlerts(fakeAlerts)
    // fetchAlerts() // Uncomment when backend ready
  }

  const handleDownload = () => {
    // Implement download logic - e.g., generate CSV or call API for export
    if (alerts.length === 0) {
      alert('No alerts to download')
      return
    }
    // Example: Simple CSV download
    const csvContent = [
      ['ID', 'Timestamp', 'Name', 'Confidence', 'Location'],
      ...alerts.map(alert => [alert.id, alert.timestamp, alert.name, alert.confidence, alert.location])
    ].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `alerts-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg h-full flex flex-col">
        <div className="px-4 py-3 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">Alert Log</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Loading alerts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg h-full flex flex-col">
        <div className="px-4 py-3 border-b border-slate-800">
          <h3 className="text-lg font-semibold text-white">Alert Log</h3>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-400">Error: {error}</p>
        </div>
        <div className="border-t border-slate-800 p-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded transition-colors w-full"
          >
            <ChevronDown size={16} className="rotate-180" />
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800">
        <h3 className="text-lg font-semibold text-white">Alert Log</h3>
      </div>

      {/* Scrollable Alert List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-slate-800">
          {alerts.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              No alerts yet
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="p-3 hover:bg-slate-800/50 transition-colors">
                <button
                  onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{alert.name}</p>
                      <p className="text-xs text-gray-400">{alert.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded">{alert.confidence}</span>
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform ${expandedAlert === alert.id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {expandedAlert === alert.id && (
                    <div className="mt-3 pt-3 border-t border-slate-700 space-y-2">
                      <div className="text-xs">
                        <p className="text-gray-400">Location:</p>
                        <p className="text-white">{alert.location}</p>
                      </div>
                      <div className="text-xs">
                        <p className="text-gray-400">Confidence:</p>
                        <p className="text-white">{alert.confidence}</p>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-3">
        <div className="flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded transition-colors flex-1"
          >
            <ChevronDown size={16} className="rotate-180" />
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}