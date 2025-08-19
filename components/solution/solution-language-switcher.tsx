"use client"

import { useSolutionLanguage } from "@/contexts/solution-language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import type { SolutionLanguage } from "@/lib/i18n/solution-translations"

const languageNames: Record<SolutionLanguage, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
}

const languageFlags: Record<SolutionLanguage, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  pt: "🇧🇷",
}

export function SolutionLanguageSwitcher() {
  const { language, setLanguage } = useSolutionLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full bg-background/80 backdrop-blur-sm border border-border/50"
        >
          <span className="mr-2">{languageFlags[language]}</span>
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as SolutionLanguage)}
            className={language === code ? "bg-accent" : ""}
          >
            <span className="mr-2">{languageFlags[code as SolutionLanguage]}</span>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
