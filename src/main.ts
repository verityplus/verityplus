import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from '@/App'
import router from '@/router'
import { i18n } from '@/i18n'
import { initAnalyticsTracking } from '@/composables/useAnalytics'
import { useIntegration } from '@/composables/useIntegration'
import '@/styles/main.css'

const { init: initIntegrations } = useIntegration()
initIntegrations()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(i18n)

initAnalyticsTracking(router)

app.mount('#app')
