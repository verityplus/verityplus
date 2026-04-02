import { defineComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { AppLogo } from '@/components/ui/Logo'

/**
 * CMS Sidebar: Primary navigation for the administrative area.
 */
export const CMSSidebar = defineComponent({
  name: 'CMSSidebar',
  setup() {
    const route = useRoute()

    const navItems = [
      { name: 'Dashboard', path: '/cms', icon: 'bi bi-speedometer2', exact: true },
      { name: 'Articles', path: '/cms/articles', icon: 'bi bi-journal-text' },
      { name: 'Characters', path: '/cms/characters', icon: 'bi bi-people' },
      { name: 'Categories', path: '/cms/categories', icon: 'bi bi-tags' },
      { name: 'Users', path: '/cms/users', icon: 'bi bi-person-gear' },
    ]

    const isActive = (path: string, exact: boolean = false) => {
      if (exact) return route.path === path
      return route.path.startsWith(path)
    }

    return () => (
      <aside class="w-64 bg-slate-900 text-white h-screen fixed left-0 top-0 z-50 flex flex-col shadow-2xl">
        <div class="p-6 border-b border-slate-800 flex items-center justify-center">
          <RouterLink to="/" class="no-underline">
            <AppLogo class="h-8" />
          </RouterLink>
        </div>

        <nav class="flex-grow p-4 space-y-1">
          {navItems.map((item) => (
            <RouterLink
              to={item.path}
              key={item.name}
              class={[
                'flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 group no-underline',
                isActive(item.path, item.exact)
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white',
              ]}
            >
              <i class={[item.icon, 'text-lg']} />
              <span class="font-medium">{item.name}</span>
            </RouterLink>
          ))}
        </nav>

        <div class="p-4 border-t border-slate-800">
          <RouterLink
            to="/"
            class="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition no-underline font-medium"
          >
            <i class="bi bi-box-arrow-left text-lg" />
            <span>Exit to Site</span>
          </RouterLink>
        </div>
      </aside>
    )
  },
})
