import { createI18n } from 'vue-i18n'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './types'
import type { Locale, MessageSchema } from './types'
import id from './locales/id'
import en from './locales/en'
import zh from './locales/zh'

function detectLocale(): Locale {
  const path = window.location.pathname
  const segments = path.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment as Locale)) {
    return firstSegment as Locale
  }
  const browserLang = navigator.language.split('-')[0]
  return SUPPORTED_LOCALES.includes(browserLang as Locale)
    ? (browserLang as Locale)
    : DEFAULT_LOCALE
}


export const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: { id, en, zh } as any,
})


export { SUPPORTED_LOCALES, DEFAULT_LOCALE }
export type { Locale } from './types'
