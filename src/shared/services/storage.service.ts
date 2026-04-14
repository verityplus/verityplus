import { apiClient } from './apiClient'

export const StorageService = {
  /**
   * Orchestrates the file upload flow directly to the backend
   * @param file The file object from input change event
   * @returns The final public URL of the uploaded file
   */
  async upload(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)

    // We send multipart/form-data.
    const { data, error } = await apiClient.POST('/api/v1/storage/upload', {
      body: formData as unknown as never,
      headers: {
        'Content-Type': undefined,
      },
    })

    if (error) {
      const message = error?.message || 'Upload failed on server'
      console.error('Upload error details:', error)
      throw new Error(message)
    }

    if (!data?.url) {
      throw new Error('Failed to get public URL after upload')
    }

    return data.url
  },
}
