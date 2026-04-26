import { API_BASE_ORIGIN } from '../services/apiClient';

/**
 * Resolves an asset path to a full URL.
 * If the path is already a full URL or a relative path not starting with /uploads, it returns it as is.
 * Otherwise, it prepends the API_BASE_ORIGIN.
 */
export function resolveAssetUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  
  // If it's a relative path starting with /uploads, prepend Supabase Storage public URL
  if (path.startsWith('/uploads/')) {
    const filename = path.replace('/uploads/', '');
    return `${API_BASE_ORIGIN}/storage/v1/object/public/uploads/${filename}`;
  }

  // If it's an absolute path within the app (starts with /), prepend BASE_URL
  if (path.startsWith('/')) {
    const baseUrl = import.meta.env.BASE_URL;
    // Remove leading slash from path and trailing slash from baseUrl if present to avoid double slashes,
    // though Vite BASE_URL usually ends with / and we usually pass /path.
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${normalizedBase}${path.substring(1)}`;
  }
  
  return path;
}
