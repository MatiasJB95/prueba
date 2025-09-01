"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    // color igual que tus secciones: hsl(220,70%,3.9%)
    <footer className="relative z-[60] isolate w-full bg-[hsl(220,70%,3.9%)] text-stone-50 mt-0">
      {/* shell centrado y ancho máx 1920 */}
      <div className="mx-auto w-full max-w-[1920px] px-6 md:px-10 xl:px-28 pt-20 pb-10 inline-flex flex-col items-center gap-8">
        {/* bloque superior */}
        <div className="w-full flex flex-col gap-11">
          {/* fila: columnas izq + derecha */}
          <div className="w-full flex flex-col xl:flex-row justify-between items-start gap-10">
            {/* izquierda (máx ~847px en figma): 3 columnas */}
            <div className="w-full xl:max-w-[847px] flex flex-col sm:flex-row justify-between items-start gap-10">
              {/* col 1: Showcase */}
              <div className="w-48 inline-flex flex-col items-start gap-6">
                <div className="text-2xl font-bold font-['DM_Sans'] leading-7">Showcase</div>
                <Link href="#" className="text-base font-normal font-['DM_Sans'] leading-none hover:text-white/80">
                  Proyecto Destacado
                </Link>
                <Link href="/showcase" className="text-base font-normal font-['DM_Sans'] leading-none hover:text-white/80">
                  Ver todos los proyectos
                </Link>
                <Link href="/showcase?tab=tipos" className="text-base font-normal font-['DM_Sans'] leading-none hover:text-white/80">
                  Tipos de proyectos
                </Link>
                <Link href="/showcase?tab=sectores" className="text-base font-normal font-['DM_Sans'] leading-none hover:text-white/80">
                  Sectores de negocio
                </Link>
              </div>

              {/* col 2: Plataforma + Compañia */}
              <div className="w-48 inline-flex flex-col items-start gap-6">
                {/* Plataforma */}
                <div className="w-full flex flex-col items-start gap-6">
                  <div className="text-2xl font-bold font-['DM_Sans'] leading-7">Plataforma</div>
                  <Link
                    href="https://talent.nocountry.tech/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-normal font-['DM_Sans'] leading-none hover:text-white/80"
                  >
                    Talento
                  </Link>
                  <Link
                    href="https://talent.nocountry.tech/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-normal font-['DM_Sans'] leading-none hover:text-white/80"
                  >
                    Empresas
                  </Link>
                </div>

                {/* Compañia */}
                <div className="w-full flex flex-col items-start gap-6">
                  <div className="text-2xl font-bold font-['DM_Sans'] leading-7">Compañia</div>
                  <Link href="#" className="text-base font-normal font-['DM_Sans'] leading-none hover:text-white/80">
                    Términos y condiciones
                  </Link>
                </div>
              </div>

              {/* col 3: Contacto + Seguinos */}
              <div className="flex flex-col justify-between items-start gap-10 sm:gap-6">
                {/* Contacto */}
                <div className="flex flex-col items-start gap-6">
                  <div className="text-2xl font-bold font-['DM_Sans'] leading-7">Contacto</div>
                  <a
                    href="mailto:contacto@nocountry.io"
                    className="text-base font-medium font-['DM_Sans'] leading-none hover:text-white/80"
                  >
                    contacto@nocountry.io
                  </a>
                </div>

                {/* Seguinos */}
                <div className="w-40 flex flex-col items-start gap-6">
                  <div className="text-2xl font-bold font-['DM_Sans'] leading-7">Seguinos</div>
                  {/* orden y gap exactos */}
                  <div className="inline-flex items-center gap-6">
                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="hover:text-white transition"
                    >
                      <Linkedin className="w-6 h-6" aria-hidden="true" />
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="hover:text-white transition"
                    >
                      <Instagram className="w-6 h-6" aria-hidden="true" />
                    </a>

                    {/* Discord (SVG inline) */}
                    <a
                      href="https://discord.gg/5MTzmsNXvx"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Discord"
                      className="hover:text-white transition"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="hover:text-white transition"
                    >
                      <Facebook className="w-6 h-6" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* derecha: CTA + logo + lema */}
            <div className="w-full xl:w-auto inline-flex flex-col justify-between items-center gap-6">
              {/* CTA degradé */}
              <Link
                href="https://tally.so/r/3EEp02"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-md inline-flex justify-center items-center gap-2.5 hover:brightness-110 transition
                           bg-[linear-gradient(90deg,#02BEED_0%,#646EF6_50%,#FF0094_100%)]"
              >
                <span className="text-base font-semibold font-['DM_Sans'] leading-none">
                  Contanos sobre tu proyecto
                </span>
              </Link>

              {/* logo + lema */}
              <div className="inline-flex items-center gap-3">
                <div className="flex items-center pr-3">
                  <Image src="/nocountry-logo.png" alt="No Country" width={90} height={30} className="h-8 w-auto" />
                </div>
                <div className="pl-5 pr-4 py-4 border-l border-stone-50 flex items-center">
                  <div className="w-28 text-base font-semibold font-['DM_Sans'] leading-none">
                    Evidenciemos el valor del talento digital
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="w-full h-px bg-zinc-700" />

          {/* copyright */}
          <div className="w-full text-base font-normal font-['DM_Sans'] leading-none">
            Copyright © {new Date().getFullYear()} Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
}
