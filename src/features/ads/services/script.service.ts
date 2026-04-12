/**
 * Service: AdSense Script Loader
 * Loads the AdSense base script without auto-ad triggers.
 */
export function loadAdSenseScript() {
  if (document.getElementById('adsense-script')) return

  const script = document.createElement('script')
  script.id = 'adsense-script'
  script.async = true
  // Loading the script without ?client=... parameter disables Google's Auto Ads 
  // while still allowing manual <ins> slots that have data-ad-client to work.
  script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
  script.crossOrigin = 'anonymous'
  document.head.appendChild(script)
}
