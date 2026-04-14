import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from '@/App'
import router from '@/router'
import { i18n } from '@/i18n'
import { useSettingsStore } from '@/features/cms/store/settings.store'
import { useAuthStore } from '@/features/cms/store/auth.store'
import { head } from '@/composables/useHead'
import '@/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(head)
app.use(router)
app.use(VueQueryPlugin)
app.use(i18n)

const settingsStore = useSettingsStore()
const authStore = useAuthStore()

// Initialize settings and check auth
settingsStore.fetchSettings()
authStore.checkSession()

app.mount('#app')
