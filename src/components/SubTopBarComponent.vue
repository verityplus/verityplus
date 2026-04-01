<template>
  <nav class="sticky top-16 z-40 bg-surface/80 backdrop-blur-md border-b border-border">
    <div class="container-page">
      <div class="flex items-center h-10 overflow-x-auto no-scrollbar gap-1">
        <button
          v-for="cat in navCategories"
          :key="cat.id"
          @click="activeSlug = cat.slug"
          :class="[
            'h-full px-4 text-xs font-semibold transition-all duration-200 whitespace-nowrap border-b-2 tracking-wide cursor-pointer',
            activeSlug === cat.slug
              ? `${cat.borderColor} ${cat.color}`
              : 'border-transparent text-text-muted hover:text-text-secondary'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { CATEGORIES } from '@/data/mock'

const activeSlug = ref('all')

// "Semua" + real blog categories
const navCategories = computed(() => [
  {
    id: 'cat-all',
    name: 'Semua',
    slug: 'all',
    color: 'text-text-primary',
    borderColor: 'border-primary',
    bgColor: '',
  },
  ...CATEGORIES,
])
</script>
