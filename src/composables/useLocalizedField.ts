import { useI18n } from 'vue-i18n'
import type { Locale } from '@/i18n'

/**
 * Returns the localized variant of a key based on the current locale.
 * @param obj The object containing localized properties (e.g. titleId, titleEn, titleZh)
 * @param baseKey The base name of the field (e.g. 'title')
 * @returns The value of the localized field, falling back to 'Id' if undefined or the field doesn't exist
 */
export function useLocalizedField() {
  const { locale } = useI18n()


  const getLocalizedField = (obj: any, baseKey: string, fallbackToId: boolean = true): string => {
    const currentLocale = locale.value as Locale
    const suffix = currentLocale.charAt(0).toUpperCase() + currentLocale.slice(1)
    const localizedKey = `${baseKey}${suffix}`

    if (obj && localizedKey in obj && obj[localizedKey] !== undefined && obj[localizedKey] !== '') {
      return obj[localizedKey] as string
    }

    if (fallbackToId) {
      const idKey = `${baseKey}Id`
      return obj[idKey] as string
    }

    return ''
  }

  return {
    getLocalizedField,
    locale,
  }
}
