import { defineComponent, type VNode, Transition } from 'vue'
import { RouterView } from 'vue-router'
import { SkipToContent } from '@/components/ui/SkipToContent'

/**
 * Global App Shell Component
 * Simple shell that delegates to RouterView.
 * LocaleLayout handles Header/Footer for public routes.
 * CMSLayout handles its own layout for admin routes.
 */
export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div class="app-shell">
        <SkipToContent />
        <RouterView
          v-slots={{
            default: ({ Component }: { Component: VNode }) => (
              <Transition name="fade" mode="out-in">
                {Component ? Component : null}
              </Transition>
            ),
          }}
        />
      </div>
    )
  },
})
