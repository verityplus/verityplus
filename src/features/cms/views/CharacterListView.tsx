import { defineComponent, ref, computed } from 'vue'
import { useArticleStore } from '@/features/article/store/article.store'
import { useCMSContentStore } from '@/features/cms/store/cms-content.store'
import { BaseButton } from '@/components/ui/Button'
import { useLocalizedField } from '@/composables/useLocalizedField'
import { appConfirm } from '@/utils/dialog'

/**
 * CMS View: CharacterListView
 * Management table for all authors/characters.
 */
export default defineComponent({
  name: 'CharacterListView',
  setup() {
    const articleStore = useArticleStore()
    const cmsContentStore = useCMSContentStore()
    const { getLocalizedField } = useLocalizedField()
    const searchQuery = ref('')

    const filteredCharacters = computed(() => {
      const q = searchQuery.value.toLowerCase().trim()
      if (!q) return articleStore.authors
      return articleStore.authors.filter(
        (a) =>
          a.name.toLowerCase().includes(q) || getLocalizedField(a, 'bio').toLowerCase().includes(q),
      )
    })

    const deleteCharacter = async (id: string) => {
      if (
        await appConfirm(
          'Are you sure you want to delete this character? All their articles will still remain but may lack an author reference.',
          'Confirm Deletion'
        )
      ) {
        cmsContentStore.deleteAuthor(id)
      }
    }

    return () => (
      <div class="space-y-6">
        <header class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex flex-col">
            <h1 class="text-3xl font-black text-slate-900 tracking-tight">Character Management</h1>
            <p class="text-slate-400 font-medium">
              Manage the identities and personas that publish content on VERITY+.
            </p>
          </div>
          <router-link to="/cms/characters/new">
            <BaseButton
              variant="primary"
              class="shadow-lg shadow-primary/20 px-8 py-4 uppercase font-black tracking-widest text-xs"
            >
              <i class="bi bi-person-plus mr-2"></i> Register Character
            </BaseButton>
          </router-link>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.value.map((char) => (
            <div
              key={char.id}
              class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:shadow-lg hover:border-primary/20 hover:scale-105 transition-all duration-300"
            >
              <div class="relative mb-4 group/avatar">
                <img
                  src={char.avatar}
                  class="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white group-hover/avatar:border-primary/20 group-hover/avatar:scale-110 transition duration-500"
                />
                <div class="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover/avatar:opacity-100 transition flex items-center justify-center">
                  <i class="bi bi-person-badge text-white text-3xl drop-shadow-lg"></i>
                </div>
              </div>

              <h3 class="text-xl font-black text-slate-900 leading-tight group-hover:text-primary transition">
                {char.name}
              </h3>
              <p class="text-xs font-medium text-slate-400 mt-2 mb-6 border-b border-slate-50 pb-4 flex-grow line-clamp-3 italic">
                "{getLocalizedField(char, 'bio') || 'No biography provided for this character.'}"
              </p>

              <div class="flex items-center gap-2 w-full pt-4 border-t border-slate-50">
                <router-link
                  to={`/cms/characters/${char.id}/edit`}
                  class="flex-1 py-2.5 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition no-underline"
                >
                  Edit Identity
                </router-link>
                <button
                  onClick={() => deleteCharacter(char.id)}
                  class="w-10 h-10 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition cursor-pointer border-none"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))}

          {filteredCharacters.value.length === 0 && (
            <div class="col-span-full py-24 text-center">
              <i class="bi bi-person-x text-5xl text-slate-200 mb-4 block" />
              <p class="text-slate-400 font-bold italic uppercase tracking-widest">
                No matching characters found.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  },
})
