"use client"

import { createContext, useContext, ReactNode } from 'react'
import { ja } from '@/lib/translations/ja'

type TranslationValue = string | { [key: string]: TranslationValue }

type Translations = {
  [key: string]: TranslationValue
}

// 日本語のみを使う固定翻訳
const translations: Translations = ja

type TranslationsContextType = {
  t: (key: string) => string
  locale: string
}

const TranslationsContext = createContext<TranslationsContextType | null>(null)

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const locale = 'ja'

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: TranslationValue = translations

    for (const k of keys) {
      if (value === undefined) return key
      value = typeof value === 'object' ? value[k] : key
    }

    return typeof value === 'string' ? value : key
  }

  return (
    <TranslationsContext.Provider value={{ t, locale }}>
      {children}
    </TranslationsContext.Provider>
  )
}

export function useTranslations() {
  const context = useContext(TranslationsContext)
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationsProvider')
  }
  return context
}