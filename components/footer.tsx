import { Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css"; // 👈 CSS Module (sin styled-jsx)

export default function Footer() {
  return (
    <footer className="relative z-[60] isolate w-full bg-[hsl(220,70%,3.9%)] text-white mt-6">
      {/* Shell: padding/altura por breakpoint */}
      <div className={styles.footerShell}>
        {/* Inner: anchos útiles por breakpoint + columna + gap */}
        <div className={styles.footerInner}>
{/* Fila principal: grid en mobile, flex desde md */}
<div className="w-full grid grid-cols-2 gap-8 items-start md:flex md:flex-wrap md:items-start md:justify-between">
  {/* Showcase → col 1, fila 1 */}
  <div className="flex flex-col max-[764px]:col-start-1 max-[764px]:row-start-1 max-[764px]:justify-self-start">
    <h4 className="font-semibold mb-3">
      <Link
        href="/showcase"
        className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
      >
        Showcase
      </Link>
    </h4>
  </div>

  {/* Plataforma → col 2, fila 1 (alineada con Compañía en col 2) */}
  <div className="flex flex-col max-[764px]:col-start-2 max-[764px]:row-start-1 max-[764px]:justify-self-start">
    <h4 className="font-semibold mb-3">
      <a
        href="https://talent.nocountry.tech/dashboard"
        className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
        target="_blank"
        rel="noopener noreferrer"
      >
        Plataforma
      </a>
    </h4>
  </div>

  {/* Contacto → col 1, fila 2 */}
  <div className="flex flex-col max-[764px]:col-start-1 max-[764px]:row-start-2 max-[764px]:justify-self-start">
    <h4 className="font-semibold mb-3">Contacto</h4>
    <ul className="space-y-2 text-white/80">
      <li className="text-xs break-words">contacto@nocountry.io</li>
    </ul>
  </div>

  {/* Compañía → col 2, fila 2 (misma columna que Plataforma) */}
  <div className="flex flex-col max-[764px]:col-start-2 max-[764px]:row-start-2 max-[764px]:justify-self-start">
    <h4 className="font-semibold mb-3">Compañía</h4>
    <ul className="space-y-2 text-white/80">
      <li className="text-xs">Términos y condiciones</li>
    </ul>
  </div>

  {/* Seguinos → col 1, fila 3 */}
  <div className="flex flex-col max-[764px]:col-start-1 max-[764px]:row-start-3 max-[764px]:justify-self-start">
    <h4 className="font-semibold mb-3">Seguinos</h4>
    <div className="flex gap-4">
      {/* tus íconos */}
    </div>
  </div>

  {/* CTA + Logo + lema → ancho completo en mobile (2 columnas), fila 4 */}
  <div className="flex flex-col items-start md:items-center gap-3 shrink-0 w-full sm:w-auto max-[764px]:col-span-2 max-[764px]:row-start-4 max-[764px]:justify-self-stretch">
    <a
      href="https://tally.so/r/3EEp02"
      target="_blank"
      rel="noopener noreferrer"
      className="w-full sm:w-auto rounded-md px-6 py-2 font-medium text-white shadow-lg
                 bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center
                 mb-6 md:mb-8"
    >
      Contanos sobre tu proyecto
    </a>

    <div className="flex items-center gap-4">
      <Image src="/nocountry-logo.png" alt="No Country" width={90} height={30} className="h-8 w-auto" />
      <div className="h-12 w-px bg-white/25" />
      <span className="text-xs leading-tight text-white/70 whitespace-pre-line">
        Evidenciamos{"\n"}el valor del{"\n"}talento digital
      </span>
    </div>
  </div>
</div>

          {/* Copyright */}
          <div className="w-full mt-6 pt-4 border-t border-white text-xs text-white/60 text-center md:text-left">
            © {new Date().getFullYear()} No Country — Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
}
