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
          <div
            class={[
              'overflow-hidden shrink-0',
              isHorizontal ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video',
            ]}
          >
            <img
              src={props.article.coverImage}
              alt={props.article.title}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {!isHorizontal && (
              <div class="absolute top-3 left-3">
                <RouterLink
                  to={{ name: 'category', params: { slug: props.article.category.slug } }}
                  class="pointer-events-auto no-underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <BaseBadge
                    bgColor={props.article.category.bgColor}
                    textColor={props.article.category.color}
                  >
                    {props.article.category.name}
                  </BaseBadge>
                </RouterLink>
              </div>
            )}
          </div>

          {/* Content Container */}
          <div class={['flex flex-col flex-1 p-5', isHorizontal ? 'md:w-1/2 justify-center' : '']}>
            {isHorizontal && (
              <RouterLink
                to={{ name: 'category', params: { slug: props.article.category.slug } }}
                class="no-underline"
                onClick={(e) => e.stopPropagation()}
              >
                <BaseBadge
                  bgColor={props.article.category.bgColor}
                  textColor={props.article.category.color}
                  class="mb-3 w-fit"
                >
                  {props.article.category.name}
                </BaseBadge>
              </RouterLink>
            )}

            <h3
              class={[
                'font-bold text-text-primary group-hover:text-primary transition-colors leading-tight mb-2',
                isHorizontal ? 'text-xl md:text-2xl' : 'text-base line-clamp-2',
              ]}
            >
              {props.article.title}
            </h3>

            <p
              class={[
                'text-text-muted leading-relaxed mb-4',
                isHorizontal ? 'text-sm md:text-base line-clamp-2' : 'text-sm line-clamp-3',
              ]}
            >
              {props.article.excerpt}
            </p>

            <div class="mt-auto flex justify-end items-center pt-4">
              {!isHorizontal && (
                <div class="absolute top-3 left-3">
                  <RouterLink
                    to={{ name: 'category', params: { slug: props.article.category.slug } }}
                    class="pointer-events-auto no-underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BaseBadge
                      bgColor={props.article.category.bgColor}
                      textColor={props.article.category.color}
                    >
                      {props.article.category.name}
                    </BaseBadge>
                  </RouterLink>
                </div>
              )}
            </div>
          </div>
        </RouterLink>
      </article>
    )
  },
})
