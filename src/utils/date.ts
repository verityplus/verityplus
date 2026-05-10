/**
 * Date Utilities
 */

/**
 * Formats an ISO date string into a human-readable format.
 * @param dateStr ISO date string
 * @param locale Current locale
 * @param useRelative Whether to use relative time for dates within the last 7 days
 * @returns Formatted date string
 */
export function formatDate(
  dateStr: string | undefined | null,
  locale: string = 'en-US',
  useRelative: boolean = false
): string {
  if (!dateStr) return ''

  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr

    if (useRelative) {
      const now = new Date()
      const diffInMs = now.getTime() - date.getTime()
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

      // Only use relative time if it's within the last 7 days and not in the future
      if (diffInMs >= 0 && diffInDays <= 7) {
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

        if (diffInDays === 0) {
          const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
          if (diffInHours > 0) return rtf.format(-diffInHours, 'hour')

          const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
          if (diffInMinutes > 0) return rtf.format(-diffInMinutes, 'minute')

          return rtf.format(0, 'second')
        }

        return rtf.format(-diffInDays, 'day')
      }
    }

    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date)
  } catch {
    return dateStr
  }
}
