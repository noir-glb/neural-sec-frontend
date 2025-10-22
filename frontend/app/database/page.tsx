"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { DatabaseHeader } from "@/components/database-header"
import { CriminalGrid } from "@/components/criminal-grid"
import { CriminalModal } from "@/components/criminal-modal"

export default function Database() {
  const [selectedCriminal, setSelectedCriminal] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <DatabaseHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CriminalGrid onSelectCriminal={setSelectedCriminal} />
      </div>

      {selectedCriminal !== null && (
        <CriminalModal criminalId={selectedCriminal} onClose={() => setSelectedCriminal(null)} />
      )}
    </div>
  )
}
