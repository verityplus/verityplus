/**
 * fix-openapi-paths.mjs
 *
 * Post-processes the generated openapi.ts to:
 * 1. Strip the double `/api/api/v1/` prefix → `/api/v1/`
 * 2. Strip trailing slashes from collection resource paths
 *    (e.g. "/api/v1/articles/" → "/api/v1/articles") so they match
 *    the path strings used in the frontend service calls.
 */

import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const filePath = resolve('src/shared/types/openapi.ts')
let content = readFileSync(filePath, 'utf8')

// 1. Replace double prefix (kept for safety if someone reverts the backend)
content = content.replaceAll('"/api/api/v1/', '"/api/v1/')

// 2. Strip trailing slashes from collection resource paths
//    Matches: "/api/v1/articles/": , "/api/v1/categories/": , etc.
content = content.replace(/("\/api\/v1\/[^{"]+)\/(":\s*{)/g, '$1$2')

writeFileSync(filePath, content, 'utf8')
console.log('✅ openapi.ts paths fixed successfully.')

