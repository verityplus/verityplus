<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useArticleStore } from '@/stores/articleStore'
import type { Article } from '@/types'

const store = useArticleStore()
const newsItems = store.featured as Article[]

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % newsItems.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + newsItems.length) % newsItems.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  timer = setInterval(nextSlide, 5000)
}

const stopAutoplay = () => {
  if (timer) clearInterval(timer)
}

onMounted(() => startAutoplay())
onUnmounted(() => stopAutoplay())
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col gap-3" @mouseenter="stopAutoplay" @mouseleave="startAutoplay">

      <div class="relative group">
        <div class="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-[var(--shadow-card)]">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
          >
            <div
              v-for="item in newsItems"
              :key="item.id"
              class="w-full flex-shrink-0 relative h-[400px] md:h-[450px]"
            >
              <RouterLink
                :to="{ name: 'read', params: { slug: item.slug } }"
                class="block w-full h-full relative overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:ring-inset"
              >
                <img :src="item.coverImage" :alt="item.title" class="object-cover w-full h-full" />

                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <span class="badge bg-primary-100 text-primary-700 mb-3">
                    {{ item.category.name }}
                  </span>
                  <h2 class="text-2xl md:text-3xl font-bold text-text-inverse mb-2 leading-tight">
                    {{ item.title }}
                  </h2>
                  <p class="text-white/70 line-clamp-2 md:w-3/4">
                    {{ item.excerpt }}
                  </p>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>

        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-surface text-text-secondary hover:text-text-primary rounded-full shadow-[var(--shadow-card)] border border-border transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/80 cursor-pointer"
          aria-label="Sebelumnya"
        >
          <i class="bi bi-chevron-left"></i>
        </button>

        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-surface text-text-secondary hover:text-text-primary rounded-full shadow-[var(--shadow-card)] border border-border transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/80 cursor-pointer"
          aria-label="Selanjutnya"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      <ul class="flex justify-center items-center gap-2 m-0 p-0 list-none">
        <li v-for="(item, index) in newsItems" :key="'indicator-' + item.id">
          <button
            @click="goToSlide(index)"
            :class="[
              'w-8 h-1 rounded-full transition-colors duration-200 border-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2',
              currentIndex === index ? 'bg-primary' : 'bg-surface-muted hover:bg-border-hover'
            ]"
            :aria-label="`Slide ${index + 1}`"
            :aria-current="currentIndex === index"
          ></button>
        </li>
      </ul>

    </div>
  </div>
</template>
