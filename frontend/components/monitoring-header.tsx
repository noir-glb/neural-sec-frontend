"use client"

import { useState, useEffect } from "react"
import { Pause, Maximize2, Filter, Download } from "lucide-react"

interface AlertLogEntry {
  id: number
  timestamp: string
  name: string
  confidence: string
  location: string
}

export function MonitoringHeader() {
  const [alerts, setAlerts] = useState<AlertLogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fake alerts for now (comment out fetchAlerts() in useEffect and uncomment setAlerts(fakeAlerts) below when ready)
  const fakeAlerts: AlertLogEntry[] = [
    { id: 1, timestamp: "2025-10-23 14:32:15", name: "John Doe", confidence: "95%", location: "Camera 1, Lobby" },
    { id: 2, timestamp: "2025-10-23 14:28:42", name: "Jane Smith", confidence: "87%", location: "Camera 3, Hallway" },
    { id: 3, timestamp: "2025-10-23 14:25:10", name: "Mike Johnson", confidence: "92%", location: "Camera 2, Entrance" },
  ]

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/alerts')
      if (!response.ok) {
        throw new Error('Failed to fetch alerts')
      }
      const data: AlertLogEntry[] = await response.json()
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
    if (alerts.length === 0) {
      alert('No alerts to download')
      return
    }
    // Generate Pdf from current alerts (fake or real)
    const pdfContent = [
      ['ID', 'Timestamp', 'Name', 'Confidence', 'Location'],
      ...alerts.map(alert => [alert.id, alert.timestamp, alert.name, alert.confidence, alert.location])
    ].map(row => row.join(',')).join('\n')
    const blob = new Blob([pdfContent], { type: 'text/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `alert-logs-${new Date().toISOString().split('T')[0]}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-8xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Live Criminal Monitoring</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors text-sm">
              <option>Filter Alerts</option>
              <option>By Name</option>
              <option>By Date</option>
            </select>
          </div>
          <button
            onClick={handleDownload}
            disabled={alerts.length === 0 || loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:cursor-not-allowed text-white rounded-lg transition-colors text-sm"
          >
            <Download size={18} />
            Download Report
          </button>
        </div>
      </div>
    </div>
  )
}