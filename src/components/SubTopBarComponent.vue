<template>
  <div
    :class="[getActiveBg(), 'sticky top-16 z-100 transition-all lg:px-48! px-2 w-full backdrop-blur-sm bg-white/50']">
    <div class="max-w-7xl mx-auto px-4">
      <nav class="flex items-center space-x-6 h-9 overflow-x-auto no-scrollbar">

        <button v-for="cat in categories" :key="cat.id" @click="activeId = cat.id" :class="[
          'h-full text-xs font-medium transition-all duration-200 whitespace-nowrap border-b-2 tracking-wide',
          activeId === cat.id
            ? `${cat.color} opacity-100`
            : 'border-transparent text-gray-500 hover:text-gray-700 opacity-80'
        ]">
          {{ cat.name }}
        </button>

      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeId = ref('all')

const categories = [
  { id: 'all', name: 'Semua', color: 'border-gray-500 text-gray-900', bg: 'bg-gray-50' },
  { id: 'ele', name: 'Elektronik', color: 'border-blue-500 text-blue-700', bg: 'bg-blue-50' },
  { id: 'fas', name: 'Fashion', color: 'border-pink-500 text-pink-700', bg: 'bg-pink-50' },
  { id: 'kec', name: 'Kecantikan', color: 'border-purple-500 text-purple-700', bg: 'bg-purple-50' },
  { id: 'rum', name: 'Rumah Tangga', color: 'border-green-500 text-green-700', bg: 'bg-green-50' },
]

// Mencari warna background yang aktif
const getActiveBg = () => categories.find(c => c.id === activeId.value)?.bg || 'bg-white'
</script>
