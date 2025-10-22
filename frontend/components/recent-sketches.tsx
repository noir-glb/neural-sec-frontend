"use client"

export function RecentSketches() {
  const recentSketches = [
    { id: 1, name: "Sketch 1", date: "Oct 22, 2025" },
    { id: 2, name: "Sketch 2", date: "Oct 21, 2025" },
    { id: 3, name: "Sketch 3", date: "Oct 20, 2025" },
    { id: 4, name: "Sketch 4", date: "Oct 19, 2025" },
  ]

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Sketches</h3>
      <div className="space-y-3">
        {recentSketches.map((sketch) => (
          <div
            key={sketch.id}
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{sketch.name}</p>
                <p className="text-xs text-gray-400">{sketch.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
