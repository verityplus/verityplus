import { computed } from 'vue'
import { useRouter, useRoute, type RouteLocationRaw, type RouteParams } from 'vue-router'
import { DEFAULT_LOCALE } from '@/i18n'

export function useLocaleRoute() {
  const router = useRouter()
  const route = useRoute()
  const locale = computed(() => (route.params.locale as string) || DEFAULT_LOCALE)

  function push(to: RouteLocationRaw) {
    if (typeof to === 'string') {
      return router.push(`/${locale.value}${to}`)
    }
    const params: RouteParams = {
      locale: locale.value,
      ...(to as { params?: RouteParams }).params,
    }
    return router.push({ params, ...(to as { params?: RouteParams }) })
  }

  function resolve(to: RouteLocationRaw) {
    if (typeof to === 'string') {
      return `/${locale.value}${to}`
    }
    const params: RouteParams = {
      locale: locale.value,
      ...(to as { params?: RouteParams }).params,
    }
    return { params, ...(to as { params?: RouteParams }) }
  }

  return { push, resolve, locale }
}
