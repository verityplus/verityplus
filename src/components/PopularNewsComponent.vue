<script lang="ts" setup>
import { useArticleStore } from '@/stores/articleStore'

const store = useArticleStore()
const popularNews = store.popular
</script>

<template>
  <div class="rounded-[var(--radius-xl)] bg-surface border border-border p-5">
    <div class="section-header">
      <span class="section-header-title">Populer</span>
    </div>
    <div class="space-y-5">
      <RouterLink
        v-for="(item, index) in popularNews"
        :key="item.id"
        :to="{ name: 'read', params: { slug: item.slug } }"
        class="flex gap-4 group cursor-pointer"
      >
        <span class="text-3xl font-black text-surface-muted group-hover:text-primary transition leading-none tabular-nums">
          {{ String(index + 1).padStart(2, '0') }}
        </span>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-bold leading-snug text-text-primary group-hover:text-primary transition line-clamp-2">
            {{ item.title }}
          </h4>
          <span class="text-xs text-text-muted mt-1 block">{{ item.readTimeMinutes }} min</span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
