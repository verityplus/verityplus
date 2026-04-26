import { defineComponent, ref, computed } from 'vue'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import { BaseButton } from '@/components/ui/Button'
import { useLocalizedField } from '@/composables/useLocalizedField'
import { appConfirm } from '@/utils/dialog'
import { BaseImage } from '@/components/ui/Image'


/**
 * CMS View: AuthorListView
 * Management table for all authors.
 */
export default defineComponent({
  name: 'AuthorListView',
  setup() {
    const articleStore = useArticleStore()
    const cmsContentStore = useCMSContentStore()
    const { getLocalizedField } = useLocalizedField()
    const searchQuery = ref('')

    const filteredAuthors = computed(() => {
      const q = searchQuery.value.toLowerCase().trim()
      if (!q) return articleStore.authors
      return articleStore.authors.filter(
        (a) =>
          a.name.toLowerCase().includes(q) || getLocalizedField(a, 'bio').toLowerCase().includes(q),
      )
    })

    const deleteAuthor = async (id: string) => {
      if (
        await appConfirm(
          'Are you sure you want to delete this author? All their articles will still remain but may lack an author reference.',
          'Confirm Deletion'
        )
      ) {
        await cmsContentStore.deleteAuthor(id)
      }
    }

    return () => (
      <div class="space-y-6">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex flex-col">
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Author Management</h1>
            <p class="text-slate-400 font-medium">
              Manage the identities and personas that publish content on VERITY+.
            </p>
          </div>
          <router-link to="/cms/authors/new">
            <BaseButton
              variant="primary"
              class="shadow-lg shadow-primary/20 px-8 py-4 uppercase font-black tracking-widest text-xs"
            >
              <i class="bi bi-person-plus mr-2"></i> Register Author
            </BaseButton>
          </router-link>
        </header>

        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div class="p-4 border-b border-slate-100 bg-slate-50/50">
            <div class="relative max-w-md w-full">
              <input
                value={searchQuery.value}
                onInput={(e) => (searchQuery.value = (e.target as HTMLInputElement).value)}
                type="text"
                placeholder="Search authors by name or bio..."
                class="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition text-sm font-medium"
              />
              <i class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
          </div>

          <div class="overflow-x-auto min-h-[400px]">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th class="px-6 py-4">Identity</th>
                  <th class="px-6 py-4">Biography Summary</th>
                  <th class="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-medium text-sm">
                {filteredAuthors.value.map((char) => (
                  <tr key={char.id} class="hover:bg-slate-50/50 transition group">
                    <td class="px-6 py-5 min-w-[200px]">
                      <div class="flex items-center gap-3">
                        <BaseImage
                          src={char.avatar}
                          isProfile
                          class="w-10 h-10 rounded-full object-cover shadow-sm bg-slate-100"
                        />

                        <div class="flex flex-col">
                          <span class="text-slate-900 font-bold leading-tight group-hover:text-primary transition">
                            {char.name}
                          </span>
                          <span class="text-[10px] text-slate-400 mt-0.5 tracking-tighter uppercase font-medium">
                            VERITY+ Network
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-5">
                      <p class="text-xs text-slate-500 line-clamp-2 max-w-lg italic font-medium">
                        "{getLocalizedField(char, 'bio') || 'No biography provided.'}"
                      </p>
                    </td>
                    <td class="px-6 py-5 text-right w-32">
                      <div class="flex items-center justify-end gap-2 translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-300">
                        <router-link
                          to={`/cms/authors/${char.id}/edit`}
                          class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-slate-900 hover:text-white transition cursor-pointer no-underline"
                        >
                          <i class="bi bi-pencil-fill text-xs" />
                        </router-link>
                        <button
                          onClick={() => deleteAuthor(char.id)}
                          class="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition cursor-pointer border-none"
                        >
                          <i class="bi bi-trash text-xs" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredAuthors.value.length === 0 && (
              <div class="py-24 flex flex-col items-center justify-center text-center">
                <i class="bi bi-person-x text-5xl text-slate-200 mb-4 block" />
                <p class="text-slate-400 font-bold italic uppercase tracking-widest">
                  No matching authors found.
                </p>
              </div>
            )}
          </div>
          
          <footer class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] font-black text-slate-400 px-6">
            <p>
              Showing {filteredAuthors.value.length} of {articleStore.authors.length} authors
            </p>
            <p>VERITY+ Identities</p>
          </footer>
        </div>
      </div>
    )
  },
})
