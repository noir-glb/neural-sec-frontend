"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { DatabaseDetectHeader } from "@/components/database-detect-header"
import { DatabaseDetectFeed } from "@/components/database-detect-feed"
import { DatabaseDetectLog } from "@/components/database-detect-log"

export default function DatabaseDetect() {
  const [currentCamera, setCurrentCamera] = useState(1)

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navigation />
      <DatabaseDetectHeader />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-6 lg:p-8">
          {/* Video Feed (70%) */}
          <div className="lg:col-span-2">
            <DatabaseDetectFeed 
              currentCamera={currentCamera} 
              onCameraChange={setCurrentCamera} 
            />
          </div>

          {/* Alert Log (30%) */}
          <div className="lg:col-span-1">
            <DatabaseDetectLog />
          </div>
        </div>
      </div>
    </div>
  )
}