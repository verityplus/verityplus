<template>
  <article class="bg-background min-h-screen">
    <!-- Reading progress bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-border z-50">
      <div class="h-full bg-primary transition-all duration-150" :style="{ width: readingProgress + '%' }"></div>
    </div>

    <!-- Floating controls -->
    <div class="fixed bottom-8 right-8 flex flex-col gap-3 z-40">
      <button
        @click="toggleSpeech"
        :class="isSpeaking ? 'bg-red-500 shadow-red-200' : 'bg-primary shadow-primary-200'"
        class="w-14 h-14 rounded-full text-text-inverse shadow-xl flex items-center justify-center hover:scale-110 transition cursor-pointer"
        title="Baca Artikel"
      >
        <i :class="isSpeaking ? 'bi bi-stop-fill' : 'bi bi-volume-up-fill'" class="text-xl"></i>
      </button>

      <div class="bg-surface border border-border rounded-full shadow-[var(--shadow-card)] p-2 flex flex-col gap-2">
        <button @click="fontSize += 2" class="w-10 h-10 rounded-full hover:bg-surface-hover font-bold text-text-secondary text-lg cursor-pointer transition">A+</button>
        <button @click="fontSize -= 2" class="w-10 h-10 rounded-full hover:bg-surface-hover font-bold text-text-secondary text-sm cursor-pointer transition">A-</button>
      </div>
    </div>

    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8 pt-8 pb-24">

      <!-- Left Ad -->
      <aside class="w-full xl:w-72 shrink-0 order-1">
        <div class="sticky top-20">
          <AdDisplayComponent size="inline" label="Iklan Kiri" class="h-40 xl:h-[600px]" />
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 w-full max-w-4xl mx-auto order-2">

        <header class="pb-10 mb-10 border-b border-border">
          <div class="max-w-3xl mx-auto text-center">
            <div class="flex items-center justify-center gap-3 mb-6">
              <span :class="['badge', article.category.bgColor, article.category.color]">
                {{ article.category.name }}
              </span>
              <span class="text-text-muted text-sm">{{ article.readTimeMinutes }} menit baca</span>
            </div>

            <h1 class="text-4xl sm:text-5xl font-extrabold text-text-primary leading-tight mb-8">
              {{ article.title }}
            </h1>

            <div class="flex items-center justify-center gap-4 pt-4 max-w-sm mx-auto">
              <img :src="article.author.avatar" :alt="article.author.name" class="w-12 h-12 rounded-full border-2 border-surface shadow-sm object-cover" />
              <div class="text-left">
                <p class="text-text-primary font-bold leading-none mb-1">{{ article.author.name }}</p>
                <p class="text-text-muted text-sm">{{ article.publishedAt }}</p>
              </div>
            </div>
          </div>
        </header>

        <!-- Cover Image -->
        <div class="mb-12">
          <div class="aspect-video rounded-[var(--radius-2xl)] overflow-hidden shadow-[var(--shadow-elevated)]">
            <img :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover" />
          </div>
          <p v-if="article.coverImageCaption" class="text-center text-sm text-text-muted mt-4 italic">
            {{ article.coverImageCaption }}
          </p>
        </div>

        <!-- Article Body -->
        <div class="max-w-3xl mx-auto relative">
          <div
            id="markdown-content"
            class="markdown-body prose prose-blue max-w-none text-text-secondary transition-all duration-200"
            :style="{ fontSize: fontSize + 'px' }"
            v-html="outputHtml"
          ></div>

          <!-- Tags -->
          <div class="mt-16 pt-8 border-t border-border">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="px-3 py-1 bg-surface-muted text-text-secondary text-sm rounded-[var(--radius-lg)] hover:bg-surface-active cursor-pointer transition"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
        </div>

      </main>

      <!-- Right Ad -->
      <aside class="w-full xl:w-72 shrink-0 order-3">
        <div class="sticky top-20">
          <AdDisplayComponent size="inline" label="Iklan Kanan" class="h-40 xl:h-[600px]" />
        </div>
      </aside>

    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useArticleStore } from '@/stores/articleStore'
import AdDisplayComponent from '@/components/AdDisplayComponent.vue'

const route = useRoute()
const store = useArticleStore()

// Get article from store by slug, fallback to article id 15 (the full content one)
const article = computed(() => {
  const slug = route.params.slug as string
  return store.findBySlug(slug) ?? store.findBySlug('evolusi-desain-web')!
})

// Markdown rendering
const outputHtml = computed(() => {
  return marked.parse(article.value.content || article.value.excerpt)
})

// Text zoom
const fontSize = ref(18)

// Speech synthesis
const isSpeaking = ref(false)
const toggleSpeech = () => {
  if (isSpeaking.value) {
    window.speechSynthesis.cancel()
    isSpeaking.value = false
    return
  }

  const rawText = document.getElementById('markdown-content')!.innerText
  const fullText = `${article.value.title}. ${rawText}`
  const utterance = new SpeechSynthesisUtterance(fullText)
  utterance.lang = 'id-ID'
  utterance.onend = () => (isSpeaking.value = false)
  window.speechSynthesis.speak(utterance)
  isSpeaking.value = true
}

// Scroll progress
const readingProgress = ref(0)
const handleScroll = () => {
  const total = document.documentElement.scrollHeight - window.innerHeight
  readingProgress.value = total ? (window.scrollY / total) * 100 : 0
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.speechSynthesis.cancel()
})
</script>
