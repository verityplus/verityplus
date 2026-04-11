import { apiClient } from './apiClient'

export const StorageService = {
  /**
   * Orchestrates the file upload flow directly to the backend
   * @param file The file object from input change event
   * @returns The final public URL of the uploaded file
   */
  async upload(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    // We send multipart/form-data. The apiClient will bypass JSON stringification for FormData.
    const result = await apiClient.post<{ url: string }>('/storage/upload', formData);
    
    if (!result || !result.url) {
      throw new Error('Failed to get public URL after upload');
    }

    return result.url;
  },
}
