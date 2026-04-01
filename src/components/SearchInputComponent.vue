<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const router = useRouter()

const submitSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <form @submit.prevent="submitSearch" class="relative w-full max-w-xs sm:max-w-sm group">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <i class="bi bi-search text-text-muted group-focus-within:text-primary transition-colors"></i>
    </div>

    <input
      v-model="searchQuery"
      type="text"
      class="block w-full py-2 pl-10 pr-10 text-sm text-text-primary bg-surface-muted border border-transparent rounded-[var(--radius-lg)] outline-none transition-all duration-300 placeholder-text-muted focus:bg-surface focus:border-primary focus:ring-4 focus:ring-primary/15"
      placeholder="Cari artikel..."
    />

    <button
      v-show="searchQuery.length > 0"
      type="button"
      @click="clearSearch"
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-text-primary focus:outline-none transition-colors cursor-pointer"
      aria-label="Hapus pencarian"
    >
      <i class="bi bi-x-lg text-sm"></i>
    </button>
  </form>
</template>
