"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Language, translations } from "@/lib/i18n/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isHydrated, setIsHydrated] = useState(false)

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)

    // Load language preference from localStorage on mount
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "es", "pt"].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (["en", "es", "pt"].includes(browserLang)) {
        setLanguage(browserLang)
      }
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("language", language)
    }
  }, [language, isHydrated])

  // Translation function
  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    return value
  }

  // Provide default values during SSR
  if (!isHydrated) {
    return <LanguageContext.Provider value={{ language: "en", setLanguage, t }}>{children}</LanguageContext.Provider>
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
