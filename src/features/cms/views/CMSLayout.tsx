import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { CMSSidebar } from '../components/Sidebar'
import { useCMSStore } from '../store/cms.store'

/**
 * CMS Layout: Main structural shell for the administrative dashboard.
 */
export default defineComponent({
  name: 'CMSLayout',
  setup() {
    const store = useCMSStore()

    return () => (
      <div class="cms-layout bg-slate-50 min-h-screen text-slate-800">
        <CMSSidebar />

        <div class="cms-content ml-64 min-h-screen flex flex-col">
          <header class="h-16 border-b border-slate-200 bg-white sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">
            <h2 class="text-sm font-semibold uppercase tracking-widest text-slate-400">Verity+ Administration</h2>
            
            <div class="flex items-center gap-4">
               <div class="text-right hidden sm:block">
                 <p class="text-sm font-bold text-slate-900 leading-none">{store.currentUser?.username}</p>
                 <span class="text-xs text-slate-400 font-medium uppercase tracking-tighter">{store.currentUser?.role}</span>
               </div>
               <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-black shadow-lg shadow-primary/20">
                 {store.currentUser?.username.charAt(0).toUpperCase()}
               </div>
            </div>
          </header>

          <main class="flex-grow p-8">
            <RouterView />
          </main>

          <footer class="p-8 border-t border-slate-200 bg-white/50 text-slate-400 text-xs flex justify-between">
            <p>&copy; 2026 Verity+ Administrative Suite. All rights reserved.</p>
            <p class="font-medium tracking-widest uppercase">Version 1.0.0-beta</p>
          </footer>
        </div>
      </div>
    )
  }
})
