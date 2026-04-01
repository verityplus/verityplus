<template>
  <div
    :class="[
      'w-full flex items-center justify-center text-text-muted font-bold tracking-widest uppercase text-xs border-2 border-dashed border-border rounded-[var(--radius-xl)] bg-surface-muted/50',
      sizeClass
    ]"
  >
    <div class="flex flex-col items-center gap-1 opacity-50">
      <i class="bi bi-megaphone text-lg"></i>
      <span>{{ label || 'Ruang Iklan' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { AdSize } from '@/types'

const props = withDefaults(defineProps<{
  size?: AdSize
  label?: string
}>(), {
  size: 'banner',
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'leaderboard': return 'h-24'
    case 'banner': return 'h-32'
    case 'sidebar': return 'h-64'
    case 'inline': return 'h-40'
    default: return 'h-32'
  }
})
</script>
