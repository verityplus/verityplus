import { defineComponent, onMounted, type VNode } from 'vue'
import { RouterView } from 'vue-router'
import { AppHeader } from '@/components/layout/Header'
import { AppFooter } from '@/components/layout/Footer'
import { useArticleStore } from '@/features/article/store/article.store'

/**
 * Global App Shell Component
 * Composition of Layout (Header, Footer) and dynamic RouterView.
 */
export default defineComponent({
  name: 'App',
  setup() {
    const store = useArticleStore()

    onMounted(async () => {
      // Pre-initialize basic data structure on load
      await store.initStore()
    })

    return () => (
      <div id="app-portal" class="min-h-screen flex flex-col font-sans text-text-primary selection:bg-primary/20 bg-background antialiased">
        <AppHeader />
        
        <div class="flex-grow">
          <RouterView v-slots={{
            default: ({ Component }: { Component: VNode }) => (
              <transition name="fade" mode="out-in">
                {Component ? Component : null}
              </transition>
            )
          }} />
        </div>

        <AppFooter />
      </div>
    )
  }
})
