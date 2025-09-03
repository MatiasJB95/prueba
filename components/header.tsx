"use client";

import Link from "next/link";

export default function Header() {
  return (
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div
          className="
            mx-auto w-full
            max-w-[375px]  px-8  pt-[36px] pb-[16px]
            md:max-w-[768px]  md:px-10  md:pt-[36px] md:pb-[16px]
            lg:max-w-[1024px] lg:px-[60px] lg:pt-[36px] lg:pb-[16px]
            xl:max-w-[1440px] xl:px-20   xl:pt-[36px] xl:pb-[16px]
            min-[1920px]:max-w-[1920px] min-[1920px]:px-20 min-[1920px]:pt-[36px] min-[1920px]:pb-[16px]
            flex flex-row items-center justify-between
            gap-y-0 md:gap-x-3
          "
        >
          <Link href="/" className="flex items-center">
            <img
              src="/nocountry-logo.png"
              alt="NoCountry Logo"
              width={143}
              height={28}
              className="w-[143px] h-[28px] shrink-0"
            />
          </Link>

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
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515..."></path>
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
