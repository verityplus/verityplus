/**
 * fix-openapi-paths.mjs
 *
 * Post-processes the generated openapi.ts to:
 * 1. Strip the double `/api/api/v1/` prefix → `/api/v1/`
 * 2. Add trailing slashes to collection resource paths (articles, categories, authors, settings)
 *    so they match the path strings used throughout the codebase.
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const filePath = resolve('src/shared/types/openapi.ts')
let content = readFileSync(filePath, 'utf8')

// 1. Replace double prefix
content = content.replaceAll('"/api/api/v1/', '"/api/v1/')

// 2. Add trailing slashes to collection paths (non-parameterized)
content = content
  .replaceAll('"/api/v1/articles":', '"/api/v1/articles/":', )
  .replaceAll('"/api/v1/categories":', '"/api/v1/categories/":', )
  .replaceAll('"/api/v1/authors":', '"/api/v1/authors/":', )
  .replaceAll('"/api/v1/settings":', '"/api/v1/settings/":', )

writeFileSync(filePath, content, 'utf8')
console.log('✅ openapi.ts paths fixed successfully.')
