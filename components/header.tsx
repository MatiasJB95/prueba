"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      {/* Shell responsivo con paddings fijos: 36 arriba / 16 abajo */}
      <div
        className="
          mx-auto w-full
          max-w-[375px]  px-10  pt-[36px] pb-[16px]
          md:max-w-[768px]  md:px-10  md:pt-[36px] md:pb-[16px]
          lg:max-w-[1024px] lg:px-[60px] lg:pt-[36px] lg:pb-[16px]
          xl:max-w-[1440px] xl:px-20   xl:pt-[36px] xl:pb-[16px]
          min-[1920px]:max-w-[1920px] min-[1920px]:px-20 min-[1920px]:pt-[36px] min-[1920px]:pb-[16px]
          flex flex-col md:flex-row md:items-center md:justify-between
          gap-y-0 md:gap-x-3
        "
      >
        {/* Izquierda: Logo (altura 28px) */}
        <Link href="/" className="flex items-center">
          <img
            src="/nocountry-logo.png"
            alt="NoCountry Logo"
            width={143}
            height={28}
            className="w-[143px] h-[28px] shrink-0"
          />
        </Link>

        {/* Derecha: Discord + CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://discord.gg/5MTzmsNXvx"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2
              text-sm font-medium text-foreground/90 hover:text-primary transition-colors
              h-6 shrink-0
              min-[1920px]:w-[143.004px]
              leading-none
            "
            aria-label="Discord"
            title="Discord"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            <span className="hidden sm:inline leading-none">Discord</span>
          </a>

          <a
            href="https://tally.so/r/3EEp02"
            target="_blank"
            rel="noopener noreferrer"
            className="
              rounded-md px-6 py-1.5 text-sm font-medium text-white shadow-lg
              bg-gradient-to-r from-sky-600 to-fuchsia-600 hover:opacity-90 transition text-center
              leading-none
            "
          >
            Contanos sobre tu proyecto
          </a>
        </div>
      </div>
    </header>
  );
}
