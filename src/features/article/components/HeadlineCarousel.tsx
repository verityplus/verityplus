import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useArticleStore } from '../store/article.store'
import { BaseBadge } from '@/components/ui/Badge'
import type { Article } from '@/shared/types'

/**
 * Feature Component: HeadlineCarousel
 * Featured article slider for high-impact visual discovery.
 */
export const HeadlineCarousel = defineComponent({
  name: 'HeadlineCarousel',
  setup() {
    const store = useArticleStore()
    const currentIndex = ref(0)
    let timer: ReturnType<typeof setInterval> | null = null

    const featuredArticles = computed(() => store.featured)

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % featuredArticles.value.length
    }

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + featuredArticles.value.length) % featuredArticles.value.length
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

    return () => (
      <div 
        class="w-full h-full relative group" 
        onMouseenter={stopAutoplay} 
        onMouseleave={startAutoplay}
      >
        <div class="overflow-hidden rounded-xl bg-surface shadow-card h-full">
          <div 
            class="flex h-full transition-transform duration-700 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex.value * 100}%)` }}
          >
            {featuredArticles.value.map((item: Article) => (
              <div 
                key={item.id} 
                class="w-full h-full flex-shrink-0 relative overflow-hidden hero-height"
              >
                <RouterLink 
                  to={{ name: 'read', params: { slug: item.slug } }} 
                  class="block w-full h-full relative focus:outline-none focus:ring-4 focus:ring-primary/40 focus:ring-inset"
                >
                  <img 
                    src={item.coverImage} 
                    alt={item.title} 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  
                  {/* Gradient Overlay */}
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Content Overlay */}
                  <div class="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                    <BaseBadge 
                      bgColor={item.category.bgColor} 
                      textColor={item.category.color}
                      class="mb-3"
                    >
                      {item.category.name}
                    </BaseBadge>
                    
                    <h2 class="text-3xl md:text-4xl font-extrabold mb-3 leading-tight max-w-2xl">
                      {item.title}
                    </h2>
                    
                    <p class="text-white/70 text-sm md:text-base line-clamp-2 max-w-xl">
                      {item.excerpt}
                    </p>
                  </div>
                </RouterLink>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 transition-opacity opacity-0 group-hover:opacity-100 duration-300">
          {featuredArticles.value.map((_: Article, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              class={[
                'w-8 h-1 transition-all duration-300 rounded-full focus:outline-none',
                currentIndex.value === index ? 'bg-primary w-12' : 'bg-white/40 hover:bg-white/60'
              ]}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          class="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 duration-300 cursor-pointer"
          aria-label="Sebelumnya"
        >
          <i class="bi bi-chevron-left text-xl"></i>
        </button>

        <button
          onClick={nextSlide}
          class="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 duration-300 cursor-pointer"
          aria-label="Selanjutnya"
        >
          <i class="bi bi-chevron-right text-xl"></i>
        </button>
      </div>
    )
  },
})
