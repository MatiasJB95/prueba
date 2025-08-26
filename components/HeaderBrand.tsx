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
      {/* Fondo animado similar al ShowcaseHeader */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-10 -top-24 w-72 h-72 bg-gradient-radial from-purple-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-0 -bottom-24 w-64 h-64 bg-gradient-radial from-pink-500/15 via-purple-500/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-radial from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Contenido */}
      <div className="container relative z-10 flex h-16 md:h-20 items-center justify-between">
        {/* Brand + logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/nocountry-logo.png"
              alt="NoCountry Logo"
              className="h-8 md:h-9" // mismo tamaño que ShowcaseHeader
            />
          </Link>
        </div>

        {/* Acciones desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-foreground/80 hover:bg-foreground/10"
            onClick={handleShare}
          >
            Compartir <Share2 className="ml-2 h-4 w-4" />
          </Button>

    <a
  href="https://tally.so/r/3EEp02"
  target="_blank"
  rel="noopener noreferrer"
  className="self-center md:self-end w-full md:w-auto rounded-md px-10 py-2 font-medium text-white shadow-lg
             bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center"
>
  Contanos sobre tu proyecto
</a>
        </div>

        {/* Toggle mobile */}
        <button
          className="md:hidden relative z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Menú mobile */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border relative z-10">
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
              Share
            </Button>

            <Link href="/contanos" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-sky-500 hover:bg-sky-600">
                Contanos sobre tu proyecto
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}