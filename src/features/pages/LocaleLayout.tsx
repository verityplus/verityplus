import { defineComponent, onMounted, type VNode } from 'vue'
import { RouterView } from 'vue-router'
import { AppHeader } from '@/components/layout/Header'
import { AppFooter } from '@/components/layout/Footer'
import { useArticleStore } from '@/features/article/store/article.store'

/**
 * Locale Layout Component
 * Wraps all public-facing locale-prefixed routes with Header and Footer.
 */
export default defineComponent({
  name: 'LocaleLayout',
  setup() {
    const store = useArticleStore()

    onMounted(async () => {
      if (store.articles.length === 0) {
        await store.initStore()
      }
    })

    return () => (
      <div
        id="app-portal"
        class="min-h-screen flex flex-col font-sans text-text-primary selection:bg-primary/20 bg-background antialiased"
      >
        <AppHeader />

        <div class="grow">
          <RouterView
            v-slots={{
              default: ({ Component }: { Component: VNode }) => (
                <transition name="fade" mode="out-in">
                  {Component ? Component : null}
                </transition>
              ),
            }}
          />
        </div>

        <AppFooter />
      </div>
    )
  },
})
