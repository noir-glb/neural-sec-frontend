"use client"

import { Navigation } from "@/components/navigation"
import VideoStream from "@/components/video-stream"
import { AlertLog } from "@/components/alert-log"
import { MonitoringHeader } from "@/components/monitoring-header"
import { MonitoringFooter } from "@/components/monitoring-footer"
import { useState } from "react"

export default function LiveMonitoring() {
  const [isActive, setIsActive] = useState(true) // Auto-start with toggle control

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <MonitoringHeader />

      <div className="flex h-[calc(100vh-128px)]"> {/* Adjusted calc assuming Navigation + Header ~128px; tweak as needed */}
        {/* Camera Grid */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-6 h-full">
            {/* Single Device Webcam */}
            <div className="h-full">
              <VideoStream 
                cameraId="1" 
                isActive={isActive} // Controlled by parent state
                onToggle={setIsActive} // Enables click toggle
              />
            </div>
          </div>
        </div>

        {/* Alert Log */}
        <div className="w-80 border-l border-slate-700 bg-slate-900 p-4 flex flex-col">
          <AlertLog />
        </div>
      </div>
    </div>
  )
}