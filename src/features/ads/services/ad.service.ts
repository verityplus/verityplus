/**
 * Service: AdService
 * Manages Google AdSense slot ID definitions.
 * Note: Actual slot IDs are primarily managed via CMS Settings in the database.
 * The AD_SLOTS object here serves as a mapping for component-level overrides if needed.
 */
export const AD_SLOTS = {
  HOME_HEADER: '',
  HOME_SIDEBAR: '',
  HOME_FOOTER: '',
  ARTICLE_SIDEBAR_LEFT: '',
  ARTICLE_SIDEBAR_RIGHT: '',
  ARTICLE_INLINE: '',
  CATEGORY_TOP: '',
  SEARCH_RESULTS: '',
}

export const AdService = {
  getSlot(name: keyof typeof AD_SLOTS) {
    return AD_SLOTS[name]
  },
  
  /**
   * Checks if AdSense is enabled.
   * Now primarily checks if a Publisher ID is configured in the settings.
   */
  isEnabled(pubId?: string) {
    return !!pubId && pubId !== 'ca-pub-XXXXXXXXXXXXXXXX'
  }
}
