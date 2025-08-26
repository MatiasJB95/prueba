import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/language-context";
import CosmicBackground from "@/components/CosmicBackground";
import ClientFooter from "@/components/ClientFooterGate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "No Country | Showcase",
  description:
    "Discover top-performing multidisciplinary teams from our remote labor simulation",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <CosmicBackground />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>
            {children}
            <ClientFooter /> {/* se oculta solo en "/" */}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}