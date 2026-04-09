import { defineComponent, ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCMSStore } from '../store/cms.store'
import type { CMSUser } from '@/shared/types'
import { BaseButton } from '@/components/ui/Button'

/**
 * CMS View: UserEditorView
 * Detailed form to manage administrative user accounts.
 */
export default defineComponent({
  name: 'UserEditorView',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useCMSStore()

    const isEdit = computed(() => route.params.id !== undefined)

    const form = ref<CMSUser>({
      id: `u-${Date.now()}`,
      username: '',
      email: '',
      password: '',
      role: 'admin',
    })

    const loadData = () => {
      if (isEdit.value) {
        const found = store.users.find((u) => u.id === (route.params.id as string))
        if (found) {
          form.value = { ...found }
        }
      }
    }

    watchEffect(() => {
      loadData()
    })

    const save = async () => {
      if (!form.value.username || !form.value.email) return

      try {
        if (isEdit.value) {
          await store.updateUser(form.value)
        } else {
          await store.addUser(form.value)
        }
        router.push('/cms/users')
      } catch (err) {
        console.error('Save user failed:', err)
        alert('Failed to save user. Please ensure you have administrative privileges.')
      }
    }

    return () => (
      <div class="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-500 max-w-4xl mx-auto">
        <header class="flex justify-between items-center bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex flex-col">
            <h1 class="text-2xl font-black text-slate-900 tracking-tight">
              {isEdit.value ? 'Modify Access' : 'Create Access'}
            </h1>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1 italic">
              Security Protocol Identity Form
            </p>
          </div>
          <BaseButton
            onClick={save}
            variant="primary"
            class="shadow-lg shadow-primary/20 px-10 py-3.5 uppercase font-black tracking-widest text-xs"
          >
            Grant Access
          </BaseButton>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div class="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            <div class="flex flex-col items-center justify-center p-8 border-4 border-dashed border-slate-100 rounded-3xl group hover:border-primary/20 transition duration-300">
              <div class="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-black shadow-xl mb-4 bg-indigo-600">
                {form.value.username ? form.value.username.charAt(0).toUpperCase() : '?'}
              </div>
              <p class="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">
                Administrator Identity Profile
              </p>
            </div>

            <div class="space-y-6">
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Username Reference
                </label>
                <input
                  value={form.value.username}
                  onInput={(e) => {
                    form.value.username = (e.target as HTMLInputElement).value
                  }}
                  type="text"
                  placeholder="e.g. admin_jane"
                  class="w-full text-lg font-black p-3 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl outline-none text-slate-900 transition"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Administrative Email
                </label>
                <input
                  value={form.value.email}
                  onInput={(e) => {
                    form.value.email = (e.target as HTMLInputElement).value
                  }}
                  type="email"
                  placeholder="e.g. jane@verityplus.com"
                  class="w-full text-lg font-bold p-3 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl outline-none text-slate-700 transition"
                />
              </div>
              <div class="space-y-2">
                <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Credential Security (Password)
                </label>
                <input
                  value={form.value.password}
                  onInput={(e) => {
                    form.value.password = (e.target as HTMLInputElement).value
                  }}
                  type="password"
                  placeholder="Minimum 8 characters..."
                  class="w-full text-lg font-bold p-3 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 rounded-xl outline-none text-slate-700 transition"
                />
              </div>
            </div>
          </div>

          <div class="bg-slate-900 p-12 rounded-2xl text-white relative overflow-hidden flex flex-col justify-center min-h-[400px] shadow-2xl">
            <div class="relative z-10 space-y-6">
              <i class="bi bi-shield-check text-6xl text-emerald-400 opacity-80 drop-shadow-xl" />
              <h3 class="text-3xl font-black leading-tight border-b border-white/20 pb-4">
                Authorization Security Architecture
              </h3>
              <p class="text-slate-100/70 text-sm leading-relaxed">
                VERITY+ Administrative access tiers define the capabilities of each user.
                Administrators have full architectural control, while Editors focus on content
                creation and publication.
              </p>
              <div class="space-y-3 pt-4">
                <div class="flex items-center gap-3">
                  <i class="bi bi-patch-check-fill text-emerald-400" />
                  <span class="text-xs font-black uppercase tracking-widest">
                    Multi-Auth Integration Ready
                  </span>
                </div>
                <div class="flex items-center gap-3">
                  <i class="bi bi-patch-check-fill text-emerald-400" />
                  <span class="text-xs font-black uppercase tracking-widest">
                    Activity Auditing Protocol Active
                  </span>
                </div>
              </div>
            </div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    )
  },
})
