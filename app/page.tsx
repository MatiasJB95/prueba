import { CompaniesHero } from "@/components/companies/companies-hero"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
  <div className="min-h-screen">
      <Header />
      <main>
        <CompaniesHero />
      </main>
      <Footer />
    </div>
  )
}
