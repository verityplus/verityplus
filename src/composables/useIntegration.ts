/**
 * Composable to handle third-party integrations (GA, AdSense)
 * dynamically based on site settings.
 */
export function useIntegration() {
  const init = async () => {
    // Only run in browser
    if (typeof window === 'undefined') return

    const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID
    const adsensePubId = import.meta.env.VITE_ADSENSE_PUB_ID

    // Initialize Google Analytics
    if (gaId && gaId !== 'G-XXXXXXXXXX') {
      injectGA(gaId)
    }

    // Initialize Google AdSense
    if (adsensePubId && adsensePubId !== 'ca-pub-XXXXXXXXXXXXXXXX') {
      injectAdSense(adsensePubId)
    }
  }

  const injectGA = (id: string) => {
    if (document.getElementById('ga-script')) return

    const script = document.createElement('script')
    script.id = 'ga-script'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(script)

    const inlineScript = document.createElement('script')
    inlineScript.id = 'ga-inline-script'
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${id}');
    `
    document.head.appendChild(inlineScript)
  }

  const injectAdSense = (pubId: string) => {
    if (document.getElementById('adsense-script')) return

    const script = document.createElement('script')
    script.id = 'adsense-script'
    script.async = true
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)
  }

  return { init }
}
