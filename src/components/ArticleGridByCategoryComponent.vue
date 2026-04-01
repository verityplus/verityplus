<script setup lang="ts">
import SubTopBarComponent from '@/components/SubTopBarComponent.vue'
import { useArticleStore } from '@/stores/articleStore'

const store = useArticleStore()
const gridArticles = store.gridArticles
</script>

<template>
  <SubTopBarComponent />
  <section class="bg-background-alt py-12">
    <div class="container-page">
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-extrabold text-text-primary sm:text-4xl">Jelajahi Artikel</h2>
        <p class="mt-3 text-lg text-text-muted">Wawasan terbaru seputar teknologi, bisnis, dan gaya hidup.</p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <article
          v-for="article in gridArticles"
          :key="article.id"
          class="card group flex flex-col"
        >
          <RouterLink :to="{ name: 'read', params: { slug: article.slug } }" class="flex flex-col h-full">
            <div class="relative aspect-video overflow-hidden">
              <img
                :src="article.coverImage"
                :alt="article.title"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute top-3 left-3">
                <span :class="['badge backdrop-blur-sm shadow-sm', article.category.bgColor, article.category.color]">
                  {{ article.category.name }}
                </span>
              </div>
            </div>

            <div class="flex flex-1 flex-col p-5">
              <div class="flex items-center gap-2 mb-3 text-xs text-text-muted">
                <time>{{ article.publishedAt }}</time>
                <span>•</span>
                <span>{{ article.readTimeMinutes }} min</span>
              </div>

              <h3 class="mb-2 text-base font-bold leading-tight text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                {{ article.title }}
              </h3>

              <p class="mb-5 text-sm leading-relaxed text-text-secondary line-clamp-3">
                {{ article.excerpt }}
              </p>

              <div class="mt-auto flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img
                    :src="article.author.avatar"
                    :alt="article.author.name"
                    class="h-7 w-7 rounded-full object-cover border border-border"
                  />
                  <span class="text-xs font-medium text-text-secondary">{{ article.author.name }}</span>
                </div>

                <span class="text-primary group-hover:translate-x-1 transition-transform">
                  <i class="bi bi-arrow-right"></i>
                </span>
              </div>
            </div>
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>
