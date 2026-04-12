/**
 * Date Utilities
 */

/**
 * Formats an ISO date string into a human-readable format.
 * @param dateStr ISO date string
 * @param locale Current locale
 * @returns Formatted date string
 */
export function formatDate(dateStr: string | undefined | null, locale: string = 'en-US'): string {
  if (!dateStr) return ''
  
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  } catch (e) {
    return dateStr
  }
}
