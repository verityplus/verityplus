import { defineComponent, type PropType } from 'vue'
import { RouterLink } from 'vue-router'
import type { Article } from '@/shared/types'
import { BaseBadge } from '@/components/ui/Badge'

/**
 * Feature Component: ArticleCard
 * Reusable card for displaying article summaries in lists or grids.
 */
export const ArticleCard = defineComponent({
  name: 'ArticleCard',
  props: {
    /**
     * Complete article data object.
     */
    article: {
      type: Object as PropType<Article>,
      required: true,
    },
    /**
     * Determines whether to show horizontal (list) or vertical (grid) layout.
     */
    layout: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'vertical',
    },
    /**
     * Optional custom classes for the container.
     */
    class: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const isHorizontal = props.layout === 'horizontal'

    return () => (
      <article class={['group card h-full relative', props.class]}>
        {/* Main Article Link */}
        <RouterLink 
          to={{ name: 'read', params: { slug: props.article.slug } }}
          class={['flex h-full no-underline', isHorizontal ? 'flex-col md:flex-row' : 'flex-col']}
        >
          {/* Cover Image Container */}
          <div class={[
            'overflow-hidden shrink-0',
            isHorizontal ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'
          ]}>
            <img 
              src={props.article.coverImage} 
              alt={props.article.title}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {!isHorizontal && (
              <div class="absolute top-3 left-3 pointer-events-none">
                <BaseBadge 
                  bgColor={props.article.category.bgColor} 
                  textColor={props.article.category.color}
                >
                  {props.article.category.name}
                </BaseBadge>
              </div>
            )}
          </div>

          {/* Content Container */}
          <div class={['flex flex-col flex-1 p-5', isHorizontal ? 'md:w-1/2 justify-center' : '']}>
            {isHorizontal && (
              <BaseBadge 
                bgColor={props.article.category.bgColor} 
                textColor={props.article.category.color}
                class="mb-3 w-fit"
              >
                {props.article.category.name}
              </BaseBadge>
            )}

            <h3 class={[
              'font-bold text-text-primary group-hover:text-primary transition-colors leading-tight mb-2',
              isHorizontal ? 'text-xl md:text-2xl' : 'text-base line-clamp-2'
            ]}>
              {props.article.title}
            </h3>

            <p class={[
              'text-text-muted leading-relaxed mb-4',
              isHorizontal ? 'text-sm md:text-base line-clamp-2' : 'text-sm line-clamp-3'
            ]}>
              {props.article.excerpt}
            </p>

            <div class="mt-auto flex justify-between items-center pt-4">
               {/* Spacer for author link positioning */}
               <div class="flex-1"></div>
               
               {!isHorizontal && (
                 <i class="bi bi-arrow-right text-primary group-hover:translate-x-1 transition-transform"></i>
               )}
            </div>
          </div>
        </RouterLink>

        {/* Absolute Filter for Author Link to avoid nesting RouterLinks */}
        <div class="absolute bottom-5 left-5 z-10 transition-transform">
          <RouterLink 
            to={{ name: 'author', params: { id: props.article.author.id } }}
            class="flex items-center gap-2 hover:opacity-80 transition group/author"
          >
            <img 
              src={props.article.author.avatar} 
              alt={props.article.author.name}
              class="h-7 w-7 rounded-full object-cover border border-border"
            />
            <div class="flex flex-col">
              <span class="text-xs font-bold text-text-secondary group-hover/author:text-primary transition-colors">
                {props.article.author.name}
              </span>
              <div class="flex items-center text-[10px] text-text-muted">
                <span>{props.article.publishedAt}</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </article>
    )
  },
})
