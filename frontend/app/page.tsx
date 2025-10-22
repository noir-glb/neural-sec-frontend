import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <HeroSection />
    </div>
  )
}
