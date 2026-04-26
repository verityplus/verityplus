import { API_BASE_ORIGIN } from '../services/apiClient';

/**
 * Resolves an asset path to a full URL.
 * If the path is already a full URL or a relative path not starting with /uploads, it returns it as is.
 * Otherwise, it prepends the API_BASE_ORIGIN.
 */
export function resolveAssetUrl(path: string | null | undefined): string {
  if (!path) return '';
  
  let resolved = path;

  // If it's already a full URL (external), or special scheme, return as is
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
    resolved = path;
  } else if (path.startsWith('/uploads/')) {
    // If it's a relative path starting with /uploads, prepend Supabase Storage public URL
    const filename = path.replace('/uploads/', '');
    resolved = `${API_BASE_ORIGIN}/storage/v1/object/public/uploads/${filename}`;
  } else if (path.startsWith('/')) {
    // If it's an absolute path within the app (starts with /), prepend BASE_URL
    const baseUrl = import.meta.env.BASE_URL;
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    resolved = `${normalizedBase}${path.substring(1)}`;
  }
  
  // Mixed Content Prevention: If on HTTPS, ensure asset URL is also HTTPS
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && resolved.startsWith('http:')) {
    return resolved.replace('http:', 'https:');
  }

  return resolved;
}
