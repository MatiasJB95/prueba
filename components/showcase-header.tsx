"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

export function ShowcaseHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-b from-background/70 via-background/30 to-transparent">
      {/* fondo animado */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 -top-24 w-72 h-72 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-0 -bottom-24 w-64 h-64 bg-gradient-radial from-pink-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
        {[...Array(30)].map((_, i) => {
          const colors = ["#ffffff", "#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#f472b6"]
          const glows = [
            "rgba(255,255,255,.85)",
            "rgba(96,165,250,.85)",
            "rgba(167,139,250,.85)",
            "rgba(52,211,153,.85)",
            "rgba(251,191,36,.85)",
            "rgba(244,114,182,.85)",
          ]
          return (
            <motion.span
              key={i}
              className="absolute block rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: "2px",
                height: "2px",
                background: colors[i % 6],
                boxShadow: `0 0 6px ${glows[i % 6]}`,
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.15, 0.7] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 1.5 }}
            />
          )
        })}
      </div>

      {/* CONTENIDO */}
      <div
        className="
          nc-shell relative z-10
          flex items-center justify-between
          h-[100px] min-[1384px]:h-[100px] min-[1440px]:h-[120px]
          pt-4 pb-2 min-[1384px]:pt-9 min-[1384px]:pb-4 min-[1440px]:pt-9 min-[1440px]:pb-4
        "
      >
        {/* IZQUIERDA: Logo (28px alto) */}
<Link href="/" className="flex items-center gap-2">
  <img
    src="/nocountry-logo.png"
    alt="NoCountry Logo"
    className="h-[32px] min-[1440px]:h-[40px] 2xl:h-[48px] w-auto shrink-0"
  />
</Link>

        {/* DERECHA: CTA (desktop) */}
        <div className="hidden md:flex items-center">
          {/* CTA principal */}
          <a
            href="https://tally.so/r/3EEp02"
            target="_blank"
            rel="noopener noreferrer"
            className="self-stretch px-4 py-2 min-[1384px]:px-6 min-[1384px]:py-1.5 min-[1440px]:px-5 min-[1440px]:py-2.5 2xl:px-6 2xl:py-3 bg-gradient-to-l from-cyan-500 via-indigo-500 to-pink-600 rounded-md inline-flex justify-center items-center gap-2 min-[1440px]:gap-2.5 2xl:gap-2.5 text-stone-50 text-base min-[1384px]:text-sm min-[1440px]:text-lg 2xl:text-xl font-semibold leading-snug shadow-black/30"
          >
            Contanos sobre tu proyecto
          </a>
        </div>

        {/* Mobile: botón menú (derecha) */}
        <div className="md:hidden relative z-10">
          <button
            className="p-1.5 min-[1440px]:p-2 rounded-md hover:bg-white/10 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
            title="Menú"
          >
            {isMenuOpen ? <X className="w-5 h-5 min-[1440px]:w-6 min-[1440px]:h-6" /> : <Menu className="w-5 h-5 min-[1440px]:w-6 min-[1440px]:h-6" />}
          </button>
        </div>
      </div>

      {/* menú mobile */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 relative z-10">
          <div className="bg-[hsl(220,70%,3.9%)]/90">
            <div
              className="
                mx-auto w-full
                max-w-[375px]  px-6  pt-3 pb-3
                md:max-w-[768px]  md:px-8
                lg:max-w-[1024px] lg:px-12
                min-[1440px]:max-w-[1440px] min-[1440px]:px-20 min-[1440px]:pt-4 min-[1440px]:pb-4
                min-[1920px]:max-w-[1920px] min-[1920px]:px-20
                flex flex-col gap-3
              "
            >
              <a
                href="https://tally.so/r/3EEp02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-md px-6 py-2 font-medium text-white shadow-lg
                           bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center
                           shadow-black/30"
                onClick={() => setIsMenuOpen(false)}
              >
                Contanos sobre tu proyecto
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
