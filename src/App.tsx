import { defineComponent, type VNode } from 'vue'
import { RouterView } from 'vue-router'

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
      <RouterView
        v-slots={{
          default: ({ Component }: { Component: VNode }) => (
            <transition name="fade" mode="out-in">
              {Component ? Component : null}
            </transition>
          ),
        }}
      />
    )
  },
})
