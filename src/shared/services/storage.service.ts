import { gql } from '@apollo/client/core'
import { apolloClient } from './apollo'

const GET_SIGNED_URL = gql`
  mutation GetSignedUrl($filename: String!, $mimetype: String!) {
    getSignedUrl(filename: $filename, mimetype: $mimetype) {
      signedUrl
      publicUrl
      key
    }
  }
`

export interface SignedUrlResponse {
  signedUrl: string
  publicUrl: string
  key: string
}

export const StorageService = {
  /**
   * Orchestrates the file upload flow to Cloudflare R2
   * @param file The file object from input change event
   * @returns The final public URL of the uploaded file
   */
  async upload(file: File): Promise<string> {
    // 1. Get pre-signed URL from API
    const result = await apolloClient.mutate<{ getSignedUrl: SignedUrlResponse }>({
      mutation: GET_SIGNED_URL,
      variables: {
        filename: file.name,
        mimetype: file.type,
      },
    })

    if (!result.data?.getSignedUrl) {
      throw new Error('Failed to get signed upload URL')
    }

    const { signedUrl, publicUrl } = result.data.getSignedUrl

    // 2. Upload file directly to R2
    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.statusText}`)
    }

    return publicUrl
  },
}
