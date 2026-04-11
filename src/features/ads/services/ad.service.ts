/**
 * Service: AdService
 * Manages Google AdSense slot IDs and configuration.
 */
export const AD_SLOTS = {
  HOME_HEADER: import.meta.env.VITE_ADSENSE_SLOT_HOME_HEADER || '',
  HOME_SIDEBAR: import.meta.env.VITE_ADSENSE_SLOT_HOME_SIDEBAR || '',
  HOME_FOOTER: import.meta.env.VITE_ADSENSE_SLOT_HOME_FOOTER || '',
  ARTICLE_SIDEBAR_LEFT: import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_SIDEBAR_LEFT || '',
  ARTICLE_SIDEBAR_RIGHT: import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_SIDEBAR_RIGHT || '',
  ARTICLE_INLINE: import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_INLINE || '',
  CATEGORY_TOP: import.meta.env.VITE_ADSENSE_SLOT_CATEGORY_TOP || '',
  SEARCH_RESULTS: import.meta.env.VITE_ADSENSE_SLOT_SEARCH_RESULTS || '',
}

export const AdService = {
  getSlot(name: keyof typeof AD_SLOTS) {
    return AD_SLOTS[name]
  },
  
  /**
   * Checks if AdSense is enabled via environment variables.
   */
  isEnabled() {
    return !!import.meta.env.VITE_ADSENSE_PUB_ID
  }
}
