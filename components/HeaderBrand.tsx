"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

export function ShowcaseHeader({ shareTitle }: { shareTitle?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const shareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") setShareUrl(window.location.href);
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setIsShareOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 💬 Mensaje dinámico
  const shareMsg = shareTitle
    ? `Mirá "${shareTitle}" en el Showcase de No Country`
    : "Mirá este showcase de No Country";

  const encodedUrl = encodeURIComponent(shareUrl || "");
  const encodedText = encodeURIComponent(shareMsg);

  const openTab = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer"); // pestaña nueva
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsShareOpen(false);
    } catch {}
  };

  const handleMobileShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: shareMsg, text: shareMsg, url });
      } else {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodedText}`,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch {}
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-gradient-to-b from-background/70 via-background/30 to-transparent">
      {/* ... (todo tu fondo/branding igual) ... */}

      <div className="nc-shell relative z-10 flex items-center justify-between pt-9 pb-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/nocountry-logo.png" alt="NoCountry Logo" width={143} height={24} className="w-[143px] h-[24px] shrink-0" />
        </Link>

        {/* DERECHA (desktop): Compartir + CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Compartir */}
          <div className="relative" ref={shareRef}>
            <button
              type="button"
              onClick={() => setIsShareOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={isShareOpen}
              className="inline-flex items-center gap-3 rounded-md px-4 py-2 font-['DM Sans'] text-[20px] font-medium leading-[1.05] tracking-[-0.2px] text-white hover:text-white hover:bg-white/10 transition"
            >
              Compartir
              {/* tu SVG a la derecha */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
                <path d="M8 1V12.7M8 1L11.5 4.6M8 1L4.5 4.6M1 10V17.2C1 17.6774 1.18437 18.1352 1.51256 18.4728C1.84075 18.8104 2.28587 19 2.75 19H13.25C13.7141 19 14.1592 18.8104 14.4874 18.4728C14.8156 18.1352 15 17.6774 15 17.2V10" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {isShareOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md border border-white/10 bg-black/80 backdrop-blur-sm shadow-xl p-1 z-50">
                <button
                  onClick={() => openTab(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`)}
                  className="w-full text-left px-3 py-2 text-sm text-white/90 hover:bg-white/10 rounded"
                >
                  Twitter (X)
                </button>
                <button
                  onClick={() => openTab(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)}
                  className="w-full text-left px-3 py-2 text-sm text-white/90 hover:bg-white/10 rounded"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => openTab(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}
                  className="w-full text-left px-3 py-2 text-sm text-white/90 hover:bg-white/10 rounded"
                >
                  Facebook
                </button>
                <button onClick={copyLink} className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm text-white/90 hover:bg-white/10 rounded">
                  <LinkIcon className="w-4 h-4" />
                  Copiar enlace
                </button>
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href="https://tally.so/r/3EEp02"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-6 py-1.5 text-sm font-medium text-white shadow-lg bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center"
          >
            Contanos sobre tu proyecto
          </a>
        </div>

        {/* Mobile: compartir + menú */}
        <div className="md:hidden relative z-10 flex items-center gap-1">
          <button className="p-2 rounded-md hover:bg-white/10 transition" onClick={handleMobileShare} aria-label="Compartir" title="Compartir">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 16 20" fill="none" aria-hidden="true">
              <path d="M8 1V12.7M8 1L11.5 4.6M8 1L4.5 4.6M1 10V17.2C1 17.6774 1.18437 18.1352 1.51256 18.4728C1.84075 18.8104 2.28587 19 2.75 19H13.25C13.7141 19 14.1592 18.8104 14.4874 18.4728C14.8156 18.1352 15 17.6774 15 17.2V10" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="p-2 rounded-md hover:bg-white/10 transition" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú" title="Menú">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* menú mobile (sin Discord) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 relative z-10">
          <div className="bg-[hsl(220,70%,3.9%)]/90">
            <div
              className={`
                mx-auto w-full
                max-w-[375px]  px-10  pt-4 pb-4
                md:max-w-[768px]  md:px-10
                lg:max-w-[1024px] lg:px-[60px]
                xl:max-w-[1440px] xl:px-20
                min-[1920px]:max-w-[1920px] min-[1920px]:px-20
                flex flex-col gap-3
              `}
            >
              <button onClick={() => openTab(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`)} className="flex items-center gap-2 py-2 hover:text-primary transition-colors">
                Twitter (X)
              </button>
              <button onClick={() => openTab(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)} className="flex items-center gap-2 py-2 hover:text-primary transition-colors">
                LinkedIn
              </button>
              <button onClick={() => openTab(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)} className="flex items-center gap-2 py-2 hover:text-primary transition-colors">
                Facebook
              </button>
              <button onClick={copyLink} className="flex items-center gap-2 py-2 hover:text-primary transition-colors">
                <LinkIcon className="w-4 h-4" />
                Copiar enlace
              </button>

              <a
                href="https://tally.so/r/3EEp02"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex justify-center rounded-md px-6 py-2 font-medium text-white shadow-lg bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center shadow-black/30"
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
