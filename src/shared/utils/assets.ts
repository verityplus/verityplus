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
  
  // If it's a relative path starting with /uploads, prepend origin
  if (path.startsWith('/uploads/')) {
    return `${API_BASE_ORIGIN}${path}`;
  }
  
  return path;
}
