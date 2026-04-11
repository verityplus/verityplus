import type { Router } from 'vue-router'
import { useAnalyticsStore } from '@/features/analytics/store/analytics.store'

let pageEnterTime = Date.now()

export function initAnalyticsTracking(router: Router) {
  const store = useAnalyticsStore()
  store.init()

  router.afterEach((to) => {
    const now = Date.now()
    const duration = now - pageEnterTime
    pageEnterTime = now

    if (store.isTracking) {
      store.track(to.path, (to.meta.title as string) || document.title)
    }

    if (duration > 1000 && store.isTracking) {
      store.trackEngagement(duration)
    }
  })
}
