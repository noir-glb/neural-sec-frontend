"use client"

export function MonitoringFooter() {
  return (
    <div className="bg-slate-900 border-t border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
          <span className="text-white font-semibold">3 New Alerts</span>
        </div>
        <button className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors">
          Go to Database
        </button>
      </div>
    </div>
  )
}
