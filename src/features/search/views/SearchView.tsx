import { defineComponent, ref, computed, watchEffect } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useHead } from '@/composables/useHead'
import { useArticleStore } from '@/features/article/store/article.store'
import { AdDisplay } from '@/features/ads/components/AdDisplay'
import { BaseBadge } from '@/components/ui/Badge'
import { BaseButton } from '@/components/ui/Button'
import type { Article } from '@/shared/types'

/**
 * Page View: SearchView
 * Dynamic search results with category overview.
 */
export default defineComponent({
  name: 'SearchView',
  setup() {
    const route = useRoute()
    const store = useArticleStore()

    const query = ref((route.query.q as string) || '')
    const results = ref<Article[]>([])

    const search = async () => {
      results.value = await store.search(query.value)
    }

    watchEffect(() => {
      query.value = (route.query.q as string) || ''
      search()
    })

    useHead({
      title: computed(() =>
        query.value ? `Pencarian: "${query.value}" — Verity+` : 'Pencarian — Verity+',
      ),
      meta: [
        {
          name: 'description',
          content: computed(() => `Hasil pencarian untuk "${query.value}" di Verity+.`),
        },
      ],
    })

    const categoriesWithCount = computed(() => store.getCategoryWithCount)

    return () => (
      <section class="bg-background min-h-screen py-12">
        <div class="container-page">
          {/* Search Header Area */}
          <div class="mb-12 border-b border-border pb-10">
            <h1 class="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
              Hasil Pencarian
            </h1>
            <p class="text-lg text-text-secondary mb-6">
              Menampilkan hasil untuk: <span class="font-bold text-primary">"{query.value}"</span>
            </p>

            <div class="max-w-2xl relative">
              <input
                value={query.value}
                onInput={(e) => {
                  query.value = (e.target as HTMLInputElement).value
                  search()
                }}
                type="text"
                placeholder="Cari artikel lainnya..."
                class="w-full pl-12 pr-4 py-4 rounded-xl bg-surface border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition duration-300 text-text-primary"
              />
              <i class="bi bi-search text-text-muted absolute left-4 top-1/2 -translate-y-1/2 text-lg"></i>
            </div>
          </div>

          <div class="flex flex-col lg:flex-row gap-12">
            {/* Main Result Area */}
            <div class="flex-grow space-y-6">
              {results.value.map((article: Article) => (
                <article key={article.id} class="group">
                  <RouterLink
                    to={{ name: 'read', params: { slug: article.slug } }}
                    class="flex flex-col md:flex-row gap-6 p-4 rounded-xl hover:bg-surface-hover transition duration-300 border border-transparent hover:border-border"
                  >
                    <div class="w-full md:w-64 h-44 shrink-0 overflow-hidden rounded-lg bg-surface-muted">
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>

                    <div class="flex flex-col justify-center flex-1">
                      <div class="flex items-center gap-3 mb-2 text-sm">
                        <RouterLink
                          to={{ name: 'category', params: { slug: article.category.slug } }}
                          class="no-underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <BaseBadge
                            bgColor={article.category.bgColor}
                            textColor={article.category.color}
                          >
                            {article.category.name}
                          </BaseBadge>
                        </RouterLink>
                        <span class="text-text-muted">{article.publishedAt}</span>
                      </div>
                      <h2 class="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition leading-tight">
                        {article.title}
                      </h2>
                      <p class="text-text-secondary line-clamp-2 mb-4 text-sm leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div class="flex items-center gap-2 text-xs font-bold text-text-primary uppercase tracking-wide group/link">
                        Baca Selengkapnya
                        <i class="bi bi-arrow-right group-hover/link:translate-x-1 transition-transform"></i>
                      </div>
                    </div>
                  </RouterLink>
                </article>
              ))}

              {results.value.length === 0 && (
                <div class="text-center py-24 bg-surface rounded-xl border border-border shadow-sm">
                  <i class="bi bi-search text-5xl text-text-muted mb-4 block"></i>
                  <p class="text-text-muted text-xl font-bold">Tidak ada artikel yang ditemukan.</p>
                  <p class="text-text-muted text-sm mt-1">
                    Coba kata kunci lain atau periksa tipografi Anda.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar Overview Area */}
            <aside class="w-full lg:w-80 space-y-8">
              {/* Category Count Overview */}
              <div>
                <div class="section-header">
                  <span class="section-header-title">Kategori Populer</span>
                </div>
                <ul class="space-y-1">
                  {categoriesWithCount.value.map((catInfo) => (
                    <li
                      key={catInfo.category.id}
                      class="flex justify-between items-center p-3 rounded-lg hover:bg-surface-hover transition group"
                    >
                      <RouterLink
                        to={{ name: 'category', params: { slug: catInfo.category.slug } }}
                        class="no-underline w-full flex justify-between items-center"
                      >
                        <span class="text-text-secondary font-medium group-hover:text-primary transition">
                          {catInfo.category.name}
                        </span>
                        <span class="text-xs font-bold bg-surface-muted px-2.5 py-1 rounded-md text-text-muted">
                          {catInfo.count}
                        </span>
                      </RouterLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Call-to-Action */}
              <div class="bg-text-primary p-8 rounded-xl text-text-inverse relative overflow-hidden">
                <div class="relative z-10">
                  <h3 class="text-xl font-bold mb-3 leading-tight">Berlangganan Newsletter</h3>
                  <p class="text-white/50 text-sm mb-6 leading-relaxed">
                    Dapatkan update mingguan eksklusif langsung di inbox Anda.
                  </p>
                  <input
                    type="email"
                    placeholder="Email Anda"
                    class="w-full px-4 py-3 rounded-lg bg-white/10 border-none text-white focus:ring-2 focus:ring-primary mb-3 outline-none transition placeholder-white/40 text-sm"
                  />
                  <BaseButton fullWidth variant="primary">
                    Gabung Sekarang
                  </BaseButton>
                </div>
                <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              </div>

              <AdDisplay size="sidebar" label="Promo Samping" />
            </aside>
          </div>
        </div>
      </section>
    )
  },
})
