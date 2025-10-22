"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export function ResultPanel() {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const accordionItems = [
    { id: "name", label: "Name", value: "John Doe" },
    { id: "lastSeen", label: "Last Seen", value: "October 22, 2025 - 14:30 UTC" },
    { id: "description", label: "Description", value: "Male, 35 years old, brown hair, 6'0\" tall" },
  ]

  return (
    <div className="space-y-4">
      {showResult ? (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 animate-fade-in">
          {/* Match Result */}
          <div className="mb-6">
            <div className="relative bg-slate-800 rounded-lg overflow-hidden aspect-square mb-4">
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-slate-600 rounded-full mx-auto mb-4" />
                  <p className="text-gray-400">Placeholder Image</p>
                </div>
              </div>
              <div className="absolute inset-0 border-4 border-red-500/50 rounded-lg" />
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Match: 95% Confidence
              </div>
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {accordionItems.map((item) => (
              <div key={item.id} className="border border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedAccordion(expandedAccordion === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <span className="font-semibold text-white">{item.label}</span>
                  {expandedAccordion === item.id ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </button>
                {expandedAccordion === item.id && (
                  <div className="p-4 bg-slate-900 text-gray-300 border-t border-slate-700">{item.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
          <p className="text-gray-400">Upload a sketch to see results</p>
        </div>
      )}

      {/* Toggle for demo */}
      <button
        onClick={() => setShowResult(!showResult)}
        className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm"
      >
        {showResult ? "Clear Results" : "Show Sample Result"}
      </button>
    </div>
  )
}
