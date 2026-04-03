import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

/**
 * Feature Component: SearchInput
 * Handles article search functionality.
 */
export const SearchInput = defineComponent({
  name: 'SearchInput',
  setup() {
    const { t } = useI18n()
    const searchQuery = ref('')
    const router = useRouter()

    const submitSearch = () => {
      if (searchQuery.value.trim()) {
        router.push({
          name: 'search',
          query: { q: searchQuery.value },
        })
      }
    }

    const clearSearch = () => {
      searchQuery.value = ''
    }

    return () => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitSearch()
        }}
        class="relative w-full max-w-xs sm:max-w-sm group"
      >
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <i class="bi bi-search text-text-muted group-focus-within:text-primary transition-colors"></i>
        </div>

        <input
          value={searchQuery.value}
          onInput={(e) => {
            searchQuery.value = (e.target as HTMLInputElement).value
          }}
          type="text"
          class="block w-full py-2 pl-10 pr-10 text-sm text-text-primary bg-surface-muted border border-transparent rounded-lg outline-none transition-all duration-300 placeholder-text-muted focus:bg-surface focus:border-primary focus:ring-4 focus:ring-primary/15"
          placeholder={t('common.searchPlaceholder')}
        />

        {searchQuery.value.length > 0 && (
          <button
            type="button"
            onClick={clearSearch}
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-primary focus:outline-none transition-colors cursor-pointer"
            aria-label={t('common.clearSearch')}
          >
            <i class="bi bi-x-lg text-sm"></i>
          </button>
        )}
      </form>
    )
  },
})
