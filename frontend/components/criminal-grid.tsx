"use client"

export function CriminalGrid({ onSelectCriminal }: { onSelectCriminal: (id: number) => void }) {
  const criminals = [
    { id: 1, name: "John Doe", date: "Oct 22, 2025", status: "Active" },
    { id: 2, name: "Jane Smith", date: "Oct 21, 2025", status: "Active" },
    { id: 3, name: "Mike Johnson", date: "Oct 20, 2025", status: "Inactive" },
    { id: 4, name: "Sarah Williams", date: "Oct 19, 2025", status: "Active" },
    { id: 5, name: "Robert Brown", date: "Oct 18, 2025", status: "Active" },
    { id: 6, name: "Emily Davis", date: "Oct 17, 2025", status: "Inactive" },
  ]

  const handleCardClick = (id: number) => {
    onSelectCriminal(id)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {criminals.map((criminal) => (
        <div
          key={criminal.id}
          onClick={() => handleCardClick(criminal.id)}
          role="button"
          tabIndex={0}
          className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-red-500 transition-all hover:shadow-lg hover:shadow-red-500/20 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleCardClick(criminal.id)
            }
          }}
        >
          {/* Image */}
          <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden relative">
            <div className="w-full h-full bg-slate-700 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 border-2 border-red-500/0 group-hover:border-red-500/50 transition-colors" />
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-semibold text-white text-sm mb-1 truncate">{criminal.name}</h3>
            <p className="text-xs text-gray-400 mb-3">{criminal.date}</p>
            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-2 py-1 rounded ${
                  criminal.status === "Active" ? "bg-red-600/20 text-red-400" : "bg-gray-600/20 text-gray-400"
                }`}
              >
                {criminal.status}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectCriminal(criminal.id)
                }}
                className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors"
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}