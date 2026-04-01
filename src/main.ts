import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from '@/App'
import router from '@/router'
import '@/styles/main.css'

/**
 * Main Application Bootstrapper
 * Mounts the TSX-based App entry point with Pinia, Router, and Vue Query.
 */
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
