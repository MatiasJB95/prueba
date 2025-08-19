import { ShowcaseSection } from "@/components/showcase-section"
import { Footer } from "@/components/footer"

export default function ShowcasePage() {
  return (
    <div className="min-h-screen">
      <main className="flex-1">
        <ShowcaseSection />
      </main>
      <Footer />
    </div>
  )
}
