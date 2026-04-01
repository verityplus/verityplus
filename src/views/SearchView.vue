<template>
  <section class="bg-background min-h-screen py-12">
    <div class="container-page">

      <!-- Search Header -->
      <div class="mb-12 border-b border-border pb-10">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
          Hasil Pencarian
        </h1>
        <p class="text-lg text-text-secondary mb-6">
          Menampilkan hasil untuk: <span class="font-bold text-primary">"{{ searchQuery }}"</span>
        </p>

        <div class="max-w-2xl relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari artikel lainnya..."
            class="w-full pl-12 pr-4 py-4 rounded-[var(--radius-xl)] bg-surface border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition duration-300 text-text-primary"
          />
          <i class="bi bi-search text-text-muted absolute left-4 top-1/2 -translate-y-1/2 text-lg"></i>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Results -->
        <div class="flex-grow space-y-6">
          <article
            v-for="article in results"
            :key="article.id"
            class="group"
          >
            <RouterLink
              :to="{ name: 'read', params: { slug: article.slug } }"
              class="flex flex-col md:flex-row gap-6 p-4 rounded-[var(--radius-xl)] hover:bg-surface-hover transition duration-300 border border-transparent hover:border-border"
            >
              <div class="w-full md:w-64 h-44 flex-shrink-0 overflow-hidden rounded-[var(--radius-lg)] bg-surface-muted">
                <img
                  :src="article.coverImage"
                  :alt="article.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div class="flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-2 text-sm">
                  <span :class="['badge', article.category.bgColor, article.category.color]">
                    {{ article.category.name }}
                  </span>
                  <span class="text-text-muted">{{ article.publishedAt }}</span>
                </div>
                <h2 class="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition">
                  {{ article.title }}
                </h2>
                <p class="text-text-secondary line-clamp-2 mb-4 text-sm leading-relaxed">
                  {{ article.excerpt }}
                </p>
                <div class="flex items-center gap-2 text-xs font-bold text-text-primary uppercase tracking-wide group/link">
                  Baca Selengkapnya
                  <i class="bi bi-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </RouterLink>
          </article>

          <div v-if="results.length === 0" class="text-center py-20">
            <i class="bi bi-search text-4xl text-text-muted mb-4 block"></i>
            <p class="text-text-muted text-lg">Tidak ada artikel yang ditemukan.</p>
            <p class="text-text-muted text-sm mt-2">Coba kata kunci lain.</p>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="w-full lg:w-80 space-y-8">
          <!-- Categories -->
          <div>
            <div class="section-header">
              <span class="section-header-title">Kategori</span>
            </div>
            <ul class="space-y-1">
              <li
                v-for="cat in categoriesWithCount"
                :key="cat.category.id"
                class="flex justify-between items-center p-3 rounded-[var(--radius-lg)] hover:bg-surface-hover transition cursor-pointer group"
              >
                <span class="text-text-secondary font-medium group-hover:text-primary transition">{{ cat.category.name }}</span>
                <span class="text-xs font-bold bg-surface-muted px-2.5 py-1 rounded-[var(--radius-md)] text-text-muted">{{ cat.count }}</span>
              </li>
            </ul>
          </div>

          <!-- Newsletter CTA -->
          <div class="bg-text-primary p-8 rounded-[var(--radius-xl)] text-text-inverse relative overflow-hidden">
            <div class="relative z-10">
              <h3 class="text-xl font-bold mb-3">Newsletter</h3>
              <p class="text-white/50 text-sm mb-6">Dapatkan update mingguan langsung di inbox Anda.</p>
              <input
                type="email"
                placeholder="Email Anda"
                class="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-white/10 border-none text-white focus:ring-2 focus:ring-primary mb-3 outline-none transition placeholder-white/40 text-sm"
              />
              <button class="btn-primary w-full">Gabung</button>
            </div>
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/articleStore'

const route = useRoute()
const store = useArticleStore()

const searchQuery = ref((route.query.q as string) || '')

// Reactive search results from store
const results = computed(() => {
  if (!searchQuery.value.trim()) return store.articles
  return store.search(searchQuery.value)
})

const categoriesWithCount = computed(() => store.getCategoryWithCount())

// Sync query param to search
watch(() => route.query.q, (newQ) => {
  if (newQ && typeof newQ === 'string') {
    searchQuery.value = newQ
  }
})
</script>
