"use client"

import { Pause, Maximize2, Filter } from "lucide-react"

export function MonitoringHeader() {
  return (
    <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Live Criminal Monitoring</h1>
        <div className="flex items-center gap-3">
          {/* <button className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
            <Pause size={20} />
          </button> */}
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
            <Maximize2 size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select className="bg-slate-800 text-white px-3 py-2 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors text-sm">
              <option>Filter Alerts</option>
              <option>By Name</option>
              <option>By Date</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
