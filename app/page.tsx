import { CompaniesHero } from "@/components/companies/companies-hero";
import { ShowcaseHeader } from "@/components/showcase-header";
import Footer from "@/components/footer"; // 👈

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo global del landing */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 -top-24 w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/3 w-80 h-80 bg-gradient-radial from-pink-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <ShowcaseHeader />
      <main className="">
        <CompaniesHero />
      </main>
      <Footer />
    </div>
  );
}