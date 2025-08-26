// components/Footer.tsx
import { Linkedin, Instagram, Facebook, MessageCircle } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer
      className="
        relative z-[60] isolate
        w-full
        bg-[hsl(220,70%,3.9%)]
        text-white
        pl-[59px]   /* padding izquierdo = 34px */
        pr-[22px]   /* padding derecho = 22px */
        py-8 mt-6
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* Fila principal (todo alineado en la misma altura) */}
        <div className="flex flex-wrap items-start justify-between gap-8">
          {/* Showcase */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Showcase</h4>
          </div>

          {/* Plataforma */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Plataforma</h4>
          </div>

          {/* Contacto */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-white/80">
              <li className="text-xs">contacto@nocountry.io</li>
            </ul>
          </div>

          {/* Compañía */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Compañía</h4>
            <ul className="space-y-2 text-white/80">
              <li className="text-xs">Términos y condiciones</li>
            </ul>
          </div>

          {/* Seguinos */}
          <div className="flex flex-col">
            <h4 className="font-semibold mb-3">Seguinos</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Discord">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Logo + lema */}
          <div className="flex items-center gap-4 shrink-0">
            <Image
              src="/nocountry-logo.png"
              alt="No Country"
              width={90}
              height={30}
              className="h-8 w-auto"
            />
            <div className="h-12 w-px bg-white/25" />
            <span className="text-xs leading-tight text-white/70 whitespace-pre-line">
              Evidenciamos{"\n"}el valor del{"\n"}talento digital
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 border-t border-white text-xs text-white/60 text-center md:text-left">
          © {new Date().getFullYear()} No Country — Todos los derechos reservados
        </div>
      </div>
    </footer>
  )
}
