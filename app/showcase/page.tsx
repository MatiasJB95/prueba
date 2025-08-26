import ShowcaseSection from "@/components/showcase-section"
import { ShowcaseHeader } from "@/components/showcase-header"

export default function ShowcasePage() {
  return (
    <div className="min-h-screen flex flex-col">
    <ShowcaseHeader />
      <main className="flex-1">
        <ShowcaseSection />
      </main>
    </div>
  )
}