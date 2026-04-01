<script lang="ts" setup>
import { useArticleStore } from '@/stores/articleStore'

const store = useArticleStore()
const latestNews = store.latest
</script>

<template>
  <div class="border border-border rounded-[var(--radius-xl)] p-6 mt-6 bg-surface">
    <div class="section-header border-b border-border pb-3 mb-6">
      <span class="section-header-title">Artikel Terbaru</span>
    </div>

    <div class="space-y-8">
      <article v-for="news in latestNews" :key="news.id" class="group cursor-pointer">
        <RouterLink :to="{ name: 'read', params: { slug: news.slug } }" class="flex flex-col md:flex-row gap-6">
          <div class="md:w-1/2 overflow-hidden rounded-[var(--radius-lg)]">
            <img
              :src="news.coverImage"
              :alt="news.title"
              class="w-full h-48 md:h-full object-cover group-hover:scale-105 transition duration-500"
            />
          </div>
          <div class="md:w-1/2 flex flex-col justify-center">
            <span :class="['badge mb-3 w-fit', news.category.bgColor, news.category.color]">
              {{ news.category.name }}
            </span>
            <h3 class="text-xl font-bold leading-tight text-text-primary group-hover:text-primary mb-3 transition">
              {{ news.title }}
            </h3>
            <p class="text-text-muted text-sm line-clamp-2 mb-4">
              {{ news.excerpt }}
            </p>
            <div class="flex items-center text-xs text-text-secondary font-medium uppercase tracking-widest">
              <span>{{ news.author.name }}</span>
              <span class="mx-2">•</span>
              <span>{{ news.publishedAt }}</span>
            </div>
          </div>
        </RouterLink>
      </article>

      <div class="w-full flex flex-col items-end">
        <button class="btn-primary">
          Lihat Semua Artikel
          <i class="bi bi-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  </div>
</template>
