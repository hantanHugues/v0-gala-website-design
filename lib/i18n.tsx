"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { translations, TranslationKey, Language } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load from local storage on mount
    const saved = localStorage.getItem("gala-language") as Language
    if (saved && (saved === "fr" || saved === "en")) {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("gala-language", lang)
    document.documentElement.lang = lang
  }

  const t = (key: TranslationKey): string => {
    // Fallback to French if the key is missing in English (though TS should catch it)
    return translations[language][key] || translations["fr"][key] || key
  }

  // Prevent hydration mismatch by not rendering until mounted
  // We wrap it in a div with visibility hidden to prevent flashes, 
  // but it MUST be inside the Provider to avoid context errors on SSR.
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {!mounted ? (
        <div style={{ visibility: "hidden", display: "contents" }}>{children}</div>
      ) : (
        children
      )}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
