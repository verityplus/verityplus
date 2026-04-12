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
    
    // We send multipart/form-data.
    const { data, error } = await (apiClient as any).POST('/storage/upload', {
      body: formData,
      // Since it's FormData, we don't want the default application/json header
      headers: {
        'Content-Type': undefined 
      }
    });
    
    if (error || !data?.url) {
      throw new Error('Failed to get public URL after upload');
    }

    return data.url;
  },
}
