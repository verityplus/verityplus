import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiClient } from '@/shared/services/apiClient'

interface SiteSettings {
  adsense_pub_id?: string
  adsense_account_id?: string
  ga_measurement_id?: string
  [key: string]: string | undefined
}

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<SiteSettings>({})
  const isLoading = ref(false)

  async function fetchSettings() {
    isLoading.value = true
    try {
      const { data } = await apiClient.GET('/api/v1/settings/', {})
      settings.value = (data as unknown as SiteSettings) || {}
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function updateSettings(updates: Record<string, string>) {
    isLoading.value = true
    try {
      await apiClient.PUT('/api/v1/settings/', {
        body: updates
      })
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
    updateSettings
  }
})
