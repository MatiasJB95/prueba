"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type SolutionLanguage, solutionTranslations } from "@/lib/i18n/solution-translations"

interface SolutionLanguageContextType {
  language: SolutionLanguage
  setLanguage: (language: SolutionLanguage) => void
  t: (key: string) => any
}

const SolutionLanguageContext = createContext<SolutionLanguageContextType | undefined>(undefined)

export function SolutionLanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SolutionLanguage>("es") // Default to Spanish
  const [isHydrated, setIsHydrated] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)

    // Load language preference from localStorage on mount
    const savedLanguage = localStorage.getItem("solutionLanguage") as SolutionLanguage
    if (savedLanguage && ["en", "es", "pt"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // Default to Spanish if no saved preference
      setLanguage("es")
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("solutionLanguage", language)
    }
  }, [language, isHydrated])

  // Translation function
  const t = (key: string): any => {
    const keys = key.split(".")
    let value: any = solutionTranslations[language]

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k]
      } else {
        console.warn(`Solution translation key not found: ${key}`)
        return key
      }
    }

    return value
  }

  // Provide default values during SSR
  if (!isHydrated) {
    return (
      <SolutionLanguageContext.Provider value={{ language: "es", setLanguage, t }}>
        {children}
      </SolutionLanguageContext.Provider>
    )
  }

  return (
    <SolutionLanguageContext.Provider value={{ language, setLanguage, t }}>{children}</SolutionLanguageContext.Provider>
  )
}

export function useSolutionLanguage() {
  const context = useContext(SolutionLanguageContext)
  if (context === undefined) {
    throw new Error("useSolutionLanguage must be used within a SolutionLanguageProvider")
  }
  return context
}
