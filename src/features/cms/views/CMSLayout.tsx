import { defineComponent, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { CMSSidebar } from '../components/Sidebar'
import { useAuthStore } from '../store/auth.store'
import { BaseButton } from '@/components/ui/Button'

/**
 * CMS Layout: Main structural shell for the administrative dashboard.
 */
export default defineComponent({
  name: 'CMSLayout',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const sidebarCollapsed = ref(false)

    const handleLogout = () => {
      authStore.logout()
      router.push('/cms/login')
    }

    return () => (
      <div class="cms-layout bg-slate-50 min-h-screen text-slate-800">
        <CMSSidebar collapsed={sidebarCollapsed.value} />

        <div
          class={[
            'cms-content min-h-screen flex flex-col transition-all duration-300',
            sidebarCollapsed.value ? 'ml-20' : 'ml-64',
          ]}
        >
          <header class="h-16 border-b border-slate-200 bg-white sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">
            <div class="flex items-center gap-4">
              <button
                onClick={() => {
                  sidebarCollapsed.value = !sidebarCollapsed.value
                }}
                class="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition cursor-pointer border-none"
                title={sidebarCollapsed.value ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <i
                  class={[
                    'bi text-slate-600 transition-transform duration-300',
                    sidebarCollapsed.value ? 'bi-list' : 'bi-list',
                  ]}
                ></i>
              </button>
              <h2 class="text-sm font-semibold uppercase tracking-widest text-slate-400">
                VERITY+ Administration
              </h2>
            </div>

            <div class="flex items-center gap-4">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-slate-900 leading-none">
                  {authStore.currentUser?.username}
                </p>
              </div>
              <BaseButton
                onClick={handleLogout}
                variant="ghost"
                title="Logout"
                class="px-3 py-1.5 text-sm rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                Logout <i class="bi bi-box-arrow-right ml-1.5" />
              </BaseButton>
              <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                {authStore.currentUser?.username.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          <main class="flex-grow p-8">
            <RouterView />
          </main>

          <footer class="p-8 border-t border-slate-200 bg-white/50 text-slate-400 text-xs flex justify-between">
            <p>&copy; 2026 VERITY+ Administrative Suite. All rights reserved.</p>
            <p class="font-medium tracking-widest uppercase">Version 1.0.0-beta</p>
          </footer>
        </div>
      </div>
    )
  },
})
