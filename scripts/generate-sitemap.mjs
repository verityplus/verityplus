import fs from 'fs'
import path from 'path'

async function generate() {
  const apiUrl = process.env.VITE_API_URL || 'http://localhost:54321/functions/v1/api'
  const distDir = path.resolve('dist')

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true })
  }

  console.log(`[sitemap] Fetching sitemap and robots from backend: ${apiUrl}`)

  // 1. Fetch sitemap.xml
  try {
    const sitemapRes = await fetch(`${apiUrl}/api/v1/seo/sitemap.xml`)
    if (sitemapRes.ok) {
      const xml = await sitemapRes.text()
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8')
      console.log('✅ [sitemap] Successfully wrote dist/sitemap.xml')
    } else {
      console.warn(`⚠️ [sitemap] Failed to fetch sitemap: ${sitemapRes.status} ${sitemapRes.statusText}`)
      writeFallbackSitemap(distDir)
    }
  } catch (err) {
    console.warn('⚠️ [sitemap] Error fetching sitemap from backend:', err.message)
    writeFallbackSitemap(distDir)
  }

  // 2. Fetch robots.txt
  try {
    const robotsRes = await fetch(`${apiUrl}/api/v1/seo/robots.txt`)
    if (robotsRes.ok) {
      const txt = await robotsRes.text()
      fs.writeFileSync(path.join(distDir, 'robots.txt'), txt, 'utf8')
      console.log('✅ [sitemap] Successfully wrote dist/robots.txt')
    } else {
      console.warn(`⚠️ [sitemap] Failed to fetch robots: ${robotsRes.status} ${robotsRes.statusText}`)
      writeFallbackRobots(distDir)
    }
  } catch (err) {
    console.warn('⚠️ [sitemap] Error fetching robots from backend:', err.message)
    writeFallbackRobots(distDir)
  }
}

function writeFallbackSitemap(distDir) {
  const baseUrl = 'https://verityplus.com'
  const locales = ['id', 'en', 'zh']
  const defaultLocale = 'id'
  const staticPages = ['', 'about-us', 'contact', 'advertise', 'privacy-policy', 'terms-and-conditions', 'articles']

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`

  staticPages.forEach((pagePath) => {
    locales.forEach((locale) => {
      const url = pagePath ? `${baseUrl}/${locale}/${pagePath}` : `${baseUrl}/${locale}`
      xml += `\n  <url>`
      xml += `\n    <loc>${url}</loc>`
      
      locales.forEach((altLocale) => {
        const altUrl = pagePath ? `${baseUrl}/${altLocale}/${pagePath}` : `${baseUrl}/${altLocale}`
        xml += `\n    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${altUrl}"/>`
      })

      const defaultUrl = pagePath ? `${baseUrl}/${defaultLocale}/${pagePath}` : `${baseUrl}/${defaultLocale}`
      xml += `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}"/>`
      
      xml += `\n    <changefreq>weekly</changefreq>`
      xml += `\n    <priority>${pagePath === '' ? '1.0' : '0.8'}</priority>`
      xml += `\n  </url>`
    })
  })

  xml += `\n</urlset>`
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8')
  console.log('⚠️ [sitemap] Wrote fallback static sitemap.xml')
}

function writeFallbackRobots(distDir) {
  const robots = `User-agent: *\nAllow: /\nSitemap: https://verityplus.com/sitemap.xml\n`
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robots, 'utf8')
  console.log('⚠️ [sitemap] Wrote fallback static robots.txt')
}

generate()
