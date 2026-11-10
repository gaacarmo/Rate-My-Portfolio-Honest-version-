"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";
import { Language, TranslationSchema, translations } from "@/i18n/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}

const STORAGE_KEY = "rmp-language";
const CHANGE_EVENT = "rmp-language-change";
const DEFAULT_LANGUAGE: Language = "pt";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Last explicit choice in this tab — keeps the toggle working even when storage is blocked.
let sessionLanguage: Language | null = null;

function readLanguage(): Language {
  if (sessionLanguage) return sessionLanguage;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pt") return stored;
  } catch {
    // Storage blocked (private mode etc.) — fall through to browser language.
  }
  const browser = typeof navigator !== "undefined" ? navigator.language.toLowerCase() : "";
  return browser && !browser.startsWith("pt") ? "en" : DEFAULT_LANGUAGE;
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, readLanguage, () => DEFAULT_LANGUAGE);

  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-BR" : "en";
  }, [language]);

  function setLanguage(lang: Language) {
    sessionLanguage = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore — sessionLanguage still carries the choice for this tab.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
