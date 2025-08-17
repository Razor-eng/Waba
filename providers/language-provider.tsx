"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "it"

type LanguageProviderProps = {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}

type LanguageProviderState = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.chat": "Chat",
    "nav.templates": "Templates",
    "nav.contacts": "Contacts",
    "nav.settings": "Settings",

    // Authentication
    "auth.welcome": "Welcome back",
    "auth.signIn": "Sign in to your account to continue",
    "auth.createAccount": "Create account",
    "auth.signUp": "Sign up to get started with Waba",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.fullName": "Full Name",
    "auth.signInButton": "Sign In",
    "auth.createAccountButton": "Create Account",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.signUpLink": "Sign up",
    "auth.signInLink": "Sign in",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Customize your Waba experience",
    "settings.theme": "Theme",
    "settings.themeDescription": "Choose your preferred color theme",
    "settings.language": "Language",
    "settings.languageDescription": "Select your preferred language",
    "settings.preview": "Preview",
    "settings.previewDescription": "See how your settings will look",
    "settings.currentSettings": "Current Settings",
    "settings.save": "Save Settings",

    // Themes
    "theme.oceanBlue": "Ocean Blue",
    "theme.forestGreen": "Forest Green",
    "theme.royalPurple": "Royal Purple",
    "theme.sunsetOrange": "Sunset Orange",

    // Common
    "common.welcome": "Welcome to Waba",
    "common.subtitle": "Streamlining your workflow with grace.",
  },
  it: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.chat": "Chat",
    "nav.templates": "Modelli",
    "nav.contacts": "Contatti",
    "nav.settings": "Impostazioni",

    // Authentication
    "auth.welcome": "Bentornato",
    "auth.signIn": "Accedi al tuo account per continuare",
    "auth.createAccount": "Crea account",
    "auth.signUp": "Registrati per iniziare con Waba",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Conferma Password",
    "auth.fullName": "Nome Completo",
    "auth.signInButton": "Accedi",
    "auth.createAccountButton": "Crea Account",
    "auth.noAccount": "Non hai un account?",
    "auth.hasAccount": "Hai già un account?",
    "auth.signUpLink": "Registrati",
    "auth.signInLink": "Accedi",

    // Settings
    "settings.title": "Impostazioni",
    "settings.subtitle": "Personalizza la tua esperienza Waba",
    "settings.theme": "Tema",
    "settings.themeDescription": "Scegli il tuo tema di colore preferito",
    "settings.language": "Lingua",
    "settings.languageDescription": "Seleziona la tua lingua preferita",
    "settings.preview": "Anteprima",
    "settings.previewDescription": "Vedi come appariranno le tue impostazioni",
    "settings.currentSettings": "Impostazioni Attuali",
    "settings.save": "Salva Impostazioni",

    // Themes
    "theme.oceanBlue": "Blu Oceano",
    "theme.forestGreen": "Verde Foresta",
    "theme.royalPurple": "Viola Reale",
    "theme.sunsetOrange": "Arancione Tramonto",

    // Common
    "common.welcome": "Benvenuto in Waba",
    "common.subtitle": "Semplificare il tuo flusso di lavoro con eleganza.",
  },
}

const initialState: LanguageProviderState = {
  language: "en",
  setLanguage: () => null,
  t: () => "",
}

const LanguageProviderContext = createContext<LanguageProviderState>(initialState)

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "waba-ui-language",
  ...props
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  useEffect(() => {
    const storedLanguage = localStorage.getItem(storageKey) as Language
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "it")) {
      setLanguage(storedLanguage)
    }
  }, [storageKey])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const value = {
    language,
    setLanguage: (language: Language) => {
      localStorage.setItem(storageKey, language)
      setLanguage(language)
    },
    t,
  }

  return (
    <LanguageProviderContext.Provider {...props} value={value}>
      {children}
    </LanguageProviderContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageProviderContext)

  if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider")

  return context
}
