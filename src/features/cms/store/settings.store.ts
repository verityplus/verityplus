import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '@/shared/services/apiClient'

interface SiteSettings {
  adsense_pub_id?: string
  adsense_account_id?: string
  ga_measurement_id?: string
  adsense_auto_ads_enabled?: string // 'true' or 'false' stored as string in DB usually
  openai_api_key?: string
  openai_base_url?: string
  openai_model?: string
  [key: string]: string | undefined
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<SiteSettings>({})
  const isLoading = ref(false)

  /**
   * Fetches full settings (including sensitive keys like openai_api_key).
   * Calls the authenticated /all endpoint — should only be used in CMS context.
   */
  async function fetchSettings() {
    isLoading.value = true
    try {
      // /all returns every setting including sensitive AI keys (requires auth).
      // The path is not yet in the generated OpenAPI types; escape via unknown until types are regenerated.
      const { data } = await (apiClient.GET as unknown as (path: string, opts: object) => Promise<{ data: unknown }>)('/api/v1/settings/all', { credentials: 'include' })
      settings.value = (data as unknown as SiteSettings) || {}
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetches only public-safe settings (no AI API keys).
   * Safe to call without authentication (e.g. analytics IDs).
   */
  async function fetchPublicSettings() {
    isLoading.value = true
    try {
      const { data } = await apiClient.GET('/api/v1/settings', {})
      settings.value = (data as unknown as SiteSettings) || {}
    } catch (error) {
      console.error('Failed to fetch public settings:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function updateSettings(updates: Record<string, string>) {
    isLoading.value = true
    try {
      await apiClient.PUT('/api/v1/settings', { body: updates })
      // Re-fetch full settings after update
      await fetchSettings()
    } catch (error) {
      console.error('Failed to update settings:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    settings,
    isLoading,
    fetchSettings,
    fetchPublicSettings,
    updateSettings,
  }
})
