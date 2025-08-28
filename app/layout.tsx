import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import CosmicBackground from "@/components/CosmicBackground";
import ClientFooter from "@/components/ClientFooterGate";

export const metadata: Metadata = {
  title: "No Country | Showcase",
  description: "Discover top-performing multidisciplinary teams from our remote labor simulation",
  generator: "v0.dev",
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      {/* 👇 importante: variable + font-sans para mapear a DM Sans */}
      <body className={`${dmSans.variable} font-sans antialiased`}>
        <CosmicBackground />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>
            {children}
            <ClientFooter />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}