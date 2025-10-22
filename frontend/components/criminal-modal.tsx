"use client"

import { useState, useEffect } from "react"
import { X, Download, Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react"

interface CriminalData {
  name: string
  age: string
  lastSeen: string
  confidence: string
  location: string
}

interface CriminalModalProps {
  criminalId: number
  onClose: () => void
}

export function CriminalModal({ criminalId, onClose }: CriminalModalProps) {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
  const [criminalData, setCriminalData] = useState<CriminalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fake data for now (comment out fetchCriminal below when ready)
  const fakeCriminalData: CriminalData = {
    name: "John Doe",
    age: "35",
    lastSeen: "Oct 22, 2025 - 14:30 UTC",
    confidence: "95%",
    location: "Camera 1, Lobby",
  }

  const fetchCriminal = async () => {
    try {
      setLoading(true)
      setError(null)
      // API endpoint
      const response = await fetch(`/api/criminals/${criminalId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch criminal details')
      }
      const data: CriminalData = await response.json()
      setCriminalData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // For now, use fake data - uncomment fetchCriminal() below when backend is ready
    setCriminalData(fakeCriminalData)
    setLoading(false)

    // fetchCriminal() // Uncomment this line and comment the setCriminalData above when backend is ready
  }, [criminalId])

  const handleRefresh = () => {
    // For now, refreshes fake data - update to fetchCriminal() when backend ready
    setCriminalData(fakeCriminalData)
    // fetchCriminal() // Uncomment when backend ready
  }

  const accordionItems = criminalData ? [
    { id: "name", label: "Name", value: criminalData.name },
    { id: "age", label: "Age", value: criminalData.age },
    { id: "lastSeen", label: "Last Seen", value: criminalData.lastSeen },
    { id: "confidence", label: "Confidence", value: criminalData.confidence },
    { id: "location", label: "Location", value: criminalData.location },
  ] : []

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Criminal Details</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 rounded transition-colors text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 flex items-center justify-center">
            <p className="text-gray-400">Loading details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !criminalData) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Criminal Details</h2>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 rounded transition-colors text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 text-center">
            <p className="text-red-400 mb-4">{error || "No data available"}</p>
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Criminal Details</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Image */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg aspect-square flex items-center justify-center relative w-32 h-32 mx-auto">
            <div className="w-full h-full bg-slate-700 rounded-lg" />
            <div className="absolute inset-0 border-2 border-red-500/50 rounded-lg" />
          </div>

          {/* Accordion */}
          <div className="space-y-1">
            {accordionItems.map((item) => (
              <div key={item.id} className="border border-slate-700 rounded">
                <button
                  onClick={() => setExpandedAccordion(expandedAccordion === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 transition-colors text-left"
                >
                  <span className="font-medium text-white text-sm">{item.label}</span>
                  {expandedAccordion === item.id ? (
                    <ChevronUp size={16} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400" />
                  )}
                </button>
                {expandedAccordion === item.id && (
                  <div className="p-3 bg-slate-900 text-gray-300 border-t border-slate-700 text-sm">{item.value}</div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <button className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors text-xs">
              <Download size={14} />
              <span>Report</span>
            </button>
            <button className="flex items-center justify-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded transition-colors text-xs">
              <Edit2 size={14} />
              <span>Edit</span>
            </button>
            <button className="flex items-center justify-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors text-xs">
              <Trash2 size={14} />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}