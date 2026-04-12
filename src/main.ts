import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from '@/App'
import router from '@/router'
import { i18n } from '@/i18n'
import { useSettingsStore } from '@/features/cms/store/settings.store'
import '@/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)
app.use(i18n)

const settingsStore = useSettingsStore()

// Initialize settings
settingsStore.fetchSettings()

app.mount('#app')
