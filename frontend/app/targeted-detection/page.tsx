"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { SketchUploadZone } from "@/components/sketch-upload-zone"
import { Play, Save, RotateCcw } from "lucide-react"

export default function TargetedDetection() {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isLiveFeedActive, setIsLiveFeedActive] = useState(false)
  const router = useRouter()

  const handleConfirm = () => {
    setIsConfirmed(true)
  }

  const handleReset = () => {
    setIsConfirmed(false)
    setIsLiveFeedActive(false)
  }

  const handleLiveFeedClick = () => {
    if (!isLiveFeedActive) {
      // Redirect to live streaming page when starting live feed
      router.push('/live-monitoring')
    } else {
      // Optional: Handle stop logic if needed (e.g., API call to stop stream)
      setIsLiveFeedActive(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-24">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Targeted Sketch Detection</h1>
          <p className="text-gray-400">Upload a sketch to search for matching criminals in the database</p>
        </div>

        {/* Main Layout */}
        <div className="space-y-6">
          <SketchUploadZone onConfirm={handleConfirm} />
        </div>
      </div>

      {isConfirmed && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={handleLiveFeedClick}
              className={`flex items-center justify-center px-6 py-2 font-semibold rounded-lg transition-all ${
                isLiveFeedActive
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              <Play size={18} className="mr-2" />
              {isLiveFeedActive ? "Stop Live Feed" : "Start Live Feed"}
            </button>
            {/* <button className="flex items-center justify-center px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors">
              <Save size={18} className="mr-2" />
              Save to Database
            </button>
            <button
              onClick={handleReset}
              className="flex items-center justify-center px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
            >
              <RotateCcw size={18} className="mr-2" />
              New Search
            </button> */}
          </div>
        </div>
      )}
    </div>
  )
}