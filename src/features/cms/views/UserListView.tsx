import { useCMSStore } from '../store/cms.store'
import { useAuthStore } from '../store/auth.store'
import { BaseButton } from '@/components/ui/Button'
import { appAlert, appConfirm } from '@/utils/dialog'
import { defineComponent, ref, computed } from 'vue'

/**
 * CMS View: UserListView
 * Management table for administrative users.
 */
export default defineComponent({
  name: 'UserListView',
  setup() {
    const store = useCMSStore()
    const authStore = useAuthStore()
    const searchQuery = ref('')

    const filteredUsers = computed(() => {
      const q = searchQuery.value.toLowerCase().trim()
      if (!q) return store.users
      return store.users.filter(
        (u) => u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
      )
    })

    const deleteUser = async (id: string) => {
      if (id === authStore.currentUser?.id) {
        await appAlert('You cannot delete yourself while logged in.', 'Permission Denied')
        return
      }
      if (
        await appConfirm(
          'Are you sure you want to delete this administrative user? They will lose all access to the CMS.',
          'Confirm Deletion'
        )
      ) {
        store.deleteUser(id)
      }
    }

    return () => (
      <div class="space-y-6">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex flex-col">
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Access Control</h1>
            <p class="text-slate-400 font-medium">
              Manage the administrative users and access roles for the VERITY+ environment.
            </p>
          </div>
          <router-link to="/cms/users/new">
            <BaseButton
              variant="primary"
              class="shadow-lg shadow-primary/20 px-8 py-4 uppercase font-black tracking-widest text-xs"
            >
              <i class="bi bi-shield-plus mr-2"></i> Register Administrator
            </BaseButton>
          </router-link>
        </header>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div class="overflow-x-auto min-h-[400px]">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th class="px-6 py-4">User Identity</th>
                  <th class="px-6 py-4">Email Channel</th>
                  <th class="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium text-sm">
                {filteredUsers.value.map((user) => (
                  <tr key={user.id} class="hover:bg-slate-50/50 transition group">
                    <td class="px-6 py-5">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-black shadow-lg bg-indigo-600">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div class="flex flex-col">
                          <span class="text-slate-900 font-bold leading-tight group-hover:text-primary transition">
                            {user.username}
                          </span>
                          <span class="text-[10px] text-slate-400 mt-0.5 tracking-tighter uppercase font-medium">
                            Administrator
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-5">
                      <span class="text-slate-500 font-bold text-xs">{user.email}</span>
                    </td>
                    <td class="px-6 py-5 text-right">
                      <div class="flex items-center justify-end gap-2 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
                        <router-link
                          to={`/cms/users/${user.id}/edit`}
                          class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-slate-900 hover:text-white transition cursor-pointer no-underline"
                        >
                          <i class="bi bi-person-gear text-xs" />
                        </router-link>
                        <button
                          onClick={() => deleteUser(user.id)}
                          class="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer border-none"
                        >
                          <i class="bi bi-person-dash text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.value.length === 0 && (
              <div class="py-24 flex flex-col items-center justify-center text-center">
                <i class="bi bi-shield-slash text-5xl text-slate-200 mb-4" />
                <p class="text-slate-400 font-bold italic uppercase tracking-widest">
                  No administrative identities found.
                </p>
              </div>
            )}
          </div>

          <footer class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 px-6">
            <p>Total {filteredUsers.value.length} Administrators Active</p>
            <p>Security Audit Mode Active</p>
          </footer>
        </div>
      </div>
    )
  },
})
