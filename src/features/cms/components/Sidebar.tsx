import { defineComponent, type PropType } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { AppLogo } from '@/components/ui/Logo'

/**
 * CMS Sidebar: Primary navigation for the administrative area.
 */
export const CMSSidebar = defineComponent({
  name: 'CMSSidebar',
  props: {
    collapsed: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute()

    const navItems = [
      { name: 'Dashboard', path: '/cms', icon: 'bi bi-speedometer2', exact: true },
      { name: 'Articles', path: '/cms/articles', icon: 'bi bi-journal-text' },
      { name: 'Characters', path: '/cms/characters', icon: 'bi bi-people' },
      { name: 'Categories', path: '/cms/categories', icon: 'bi bi-tags' },
      { name: 'Users', path: '/cms/users', icon: 'bi bi-person-gear' },
      { name: 'Settings', path: '/cms/settings', icon: 'bi bi-gear-fill' },
    ]

    const externalLinks = [
      { name: 'Analytics', path: '#', icon: 'bi bi-graph-up', title: 'Google Analytics' },
      { name: 'AdSense', path: '#', icon: 'bi bi-cash-stack', title: 'Google AdSense' },
    ]

    const isActive = (path: string, exact: boolean = false) => {
      if (exact) return route.path === path
      return route.path.startsWith(path)
    }

    const renderLink = (item: any, isExternal = false) => {
      const commonClass = [
        'flex items-center gap-3 rounded-lg transition duration-200 group no-underline',
        props.collapsed ? 'justify-center py-3 px-2' : 'px-4 py-3',
        !isExternal && isActive(item.path, item.exact)
          ? 'bg-primary text-white shadow-lg shadow-primary/20'
          : 'text-slate-400 hover:bg-slate-800 hover:text-white',
      ]

      const content = (
        <>
          <i class={[item.icon, 'text-lg']} />
          {!props.collapsed && <span class="font-medium">{item.name}</span>}
        </>
      )

      if (isExternal) {
        return (
          <a
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            key={item.name}
            class={commonClass}
            title={props.collapsed ? (item.title || item.name) : ''}
          >
            {content}
          </a>
        )
      }

      return (
        <RouterLink
          to={item.path}
          key={item.name}
          class={commonClass}
          title={props.collapsed ? item.name : ''}
        >
          {content}
        </RouterLink>
      )
    }

    return () => (
      <aside
        class={[
          'bg-slate-900 text-white h-screen fixed left-0 top-0 z-50 flex flex-col shadow-2xl transition-all duration-300',
          props.collapsed ? 'w-20' : 'w-64',
        ]}
      >
        <div
          class={[
            'border-b border-slate-800 flex items-center justify-center',
            props.collapsed ? 'p-4' : 'p-6',
          ]}
        >
          <RouterLink to="/" class="no-underline">
            <AppLogo class="h-8" />
          </RouterLink>
        </div>

        <nav class={['flex-1 space-y-1 overflow-y-auto custom-scrollbar', props.collapsed ? 'p-2' : 'p-4']}>
          {navItems.map((item) => renderLink(item))}

          <div class={['my-4 border-t border-slate-800/50', props.collapsed ? 'mx-2' : 'mx-4']} />
          {!props.collapsed && (
            <div class="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              Services
            </div>
          )}

          {externalLinks.map((item) => renderLink(item, true))}
        </nav>

        <div
          class={[
            props.collapsed ? 'p-2 border-t border-slate-800' : 'p-4 border-t border-slate-800',
          ]}
        >
          <RouterLink
            to="/"
            class={[
              'flex items-center gap-3 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition no-underline',
              props.collapsed ? 'justify-center py-3 px-2' : 'px-4 py-3 font-medium',
            ]}
            title={props.collapsed ? 'Exit to Site' : ''}
          >
            <i class="bi bi-box-arrow-left text-lg" />
            {!props.collapsed && <span>Exit to Site</span>}
          </RouterLink>
        </div>
      </aside>
    )
  },
})
