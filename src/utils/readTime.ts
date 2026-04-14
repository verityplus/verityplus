/**
 * Utility to calculate estimated reading time in minutes.
 * Handles both word-based (EN, ID) and character-based (ZH) content.
 */

export function calculateReadTime(content: string, isChinese: boolean = false): number {
  if (!content) return 0;

  // Remove markdown/HTML if possible (basic stripping)
  const plainText = content.replace(/[#*`>]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');

  if (isChinese) {
    // Chinese characters counting
    const charCount = plainText.replace(/[^\u4e00-\u9fa5]/g, '').length;
    // Other characters (latin etc) in Chinese text
    const latinWords = plainText.replace(/[\u4e00-\u9fa5]/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    
    // Average 300 characters per minute for Chinese + 225 wpm for latin words
    const minutes = (charCount / 300) + (latinWords / 225);
    return Math.max(1, Math.ceil(minutes));
  } else {
    // Word count for EN, ID
    const words = plainText.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 225));
  }
}

/**
 * Calculate read time for multiple fields if necessary, or detect language.
 */
export function getReadTime(obj: Record<string, any>, currentLocale: string = 'en'): number {
  const contentKey = `content${currentLocale.charAt(0).toUpperCase()}${currentLocale.slice(1)}`;
  const content = obj[contentKey] || obj.contentEn || obj.contentId || '';
  
  return calculateReadTime(content, currentLocale === 'zh');
}
