// components/footer-gradient.tsx
import Image from "next/image"
import { Linkedin, Instagram } from "lucide-react"

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515...zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419..."/>
    </svg>
  )
}

export default function FooterGradient() {
  return (
    <footer className="relative z-[60] isolate w-full bg-transparent text-white pl-[59px] pr-[22px] py-8 mt-6">
      {/* mismo fondo que el hero, pero sólo detrás del footer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-10 -top-24 w-96 h-96 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"/>
        <div className="absolute right-0 top-1/3 w-80 h-80 bg-gradient-radial from-pink-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl"/>
        <div className="absolute left-1/3 bottom-0 w-72 h-72 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"/>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Showcase</h4>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Plataforma</h4>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-white/80">
              <li className="text-xs">contacto@nocountry.io</li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Compañía</h4>
            <ul className="space-y-2 text-white/80">
              <li className="text-xs">Términos y condiciones</li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Seguinos</h4>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/nocountrytalent" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/nocountry.tech/?hl=es" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://discord.com/invite/eFQ5DZM7DV" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="hover:text-primary transition-colors">
                <DiscordIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <a
            href="https://tally.so/r/3EEp02"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-md px-6 py-2 font-medium text-white shadow-lg
                       bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center mb-6"
          >
            Contanos sobre tu proyecto
          </a>

          <div className="flex items-center gap-4 shrink-0">
            <Image src="/nocountry-logo.png" alt="No Country" width={90} height={30} className="h-8 w-auto"/>
            <div className="h-12 w-px bg-white/25"/>
            <span className="text-xs leading-tight text-white/70 whitespace-pre-line">
              Evidenciamos{"\n"}el valor del{"\n"}talento digital
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/15 text-xs text-white/60 text-center md:text-left">
          © {new Date().getFullYear()} No Country — Todos los derechos reservados
        </div>
      </div>
    </footer>
  )
}
