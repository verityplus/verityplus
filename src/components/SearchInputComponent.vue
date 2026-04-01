<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Hapus ini jika tidak pakai vue-router

const searchQuery = ref('')
const router = useRouter() // Hapus ini jika tidak pakai vue-router

const submitSearch = () => {
  // Pastikan input tidak kosong sebelum redirect
  if (searchQuery.value.trim()) {

    // OPSI 1: Menggunakan Vue Router (Rekomendasi)
    router.push({ path: '/search', query: { q: searchQuery.value } })

    // OPSI 2: Menggunakan Vanilla JS (Buka komentar di bawah jika tidak pakai Vue Router)
    // window.location.href = `/search?q=${encodeURIComponent(searchQuery.value)}`

    // Opsional: bersihkan input setelah enter
    // searchQuery.value = ''
  }
}

const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <form @submit.prevent="submitSearch" class="relative w-full max-w-sm sm:max-w-md group">

    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <i class="bi bi-search text-gray-400 group-focus-within:text-gray-600 transition-colors"></i>
    </div>

    <input v-model="searchQuery" type="text"
      class="block w-full py-2 pl-10 pr-10 text-sm text-gray-900 bg-gray-100 border border-transparent rounded-full outline-none transition-all duration-300 placeholder-gray-500 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
      placeholder="Cari sesuatu lalu tekan Enter..." />

    <button v-show="searchQuery.length > 0" type="button" @click="clearSearch"
      class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-700 focus:outline-none transition-colors"
      aria-label="Clear search">
      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </form>
</template>
