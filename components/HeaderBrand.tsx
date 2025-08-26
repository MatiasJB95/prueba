"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleShare() {
    const shareData = {
      title: document.title || "NoCountry",
      text: "Mirá este proyecto en NoCountry",
      url: typeof window !== "undefined" ? window.location.href : "/",
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copiado al portapapeles");
      } else {
        window.prompt("Copiá el link:", shareData.url);
      }
    } catch {}
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-b from-background/70 via-background/30 to-transparent">
      {/* Fondo animado (suave) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 -top-24 w-72 h-72 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-0 -bottom-24 w-64 h-64 bg-gradient-radial from-pink-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Contenido - 56px de alto */}
      <div className="container relative z-10 flex h-14 items-center justify-between">
        {/* Logo + Discord (pegado) */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/nocountry-logo.png"
              alt="NoCountry Logo"
              className="h-7 w-auto"
            />
          </Link>

          {/* Discord (solo desktop para no apretar mobile) */}
          <a
            href="https://discord.gg/5MTzmsNXvx"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1 text-xs px-2 py-1 rounded border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label="Discord"
            title="Discord"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span className="hidden lg:inline">Discord</span>
          </a>
        </div>

        {/* Acciones desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="h-8 px-3 text-foreground/80 hover:bg-foreground/10"
            onClick={handleShare}
            aria-label="Compartir"
            title="Compartir"
          >
            <span className="hidden lg:inline">Compartir</span>
            <Share2 className="ml-0 lg:ml-2 h-4 w-4" />
          </Button>

          <a
            href="https://tally.so/r/3EEp02"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-6 py-1.5 text-sm font-medium text-white shadow-lg
                       bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center"
          >
            Contanos sobre tu proyecto
          </a>
        </div>

        {/* Toggle mobile */}
        <button
          className="md:hidden relative z-10"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          title="Menú"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menú mobile */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 relative z-10">
          <div className="bg-[hsl(220,70%,3.9%)]/90">
            <div className="container py-4 flex flex-col gap-3">
              <Button
                variant="ghost"
                className="justify-start text-foreground/80 hover:bg-foreground/10"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleShare();
                }}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>

              {/* Discord en mobile */}
              <a
                href="https://discord.gg/5MTzmsNXvx"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-2 hover:text-primary transition-colors"
                aria-label="Discord"
                title="Discord"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Discord Community
              </a>

              <a
                href="https://tally.so/r/3EEp02"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex justify-center rounded-md px-6 py-2 font-medium text-white shadow-lg
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
  );
}
