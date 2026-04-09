import { defineComponent } from 'vue'

/**
 * Feature Component: InstagramEmbed
 * Displays Instagram profile/posts in an iframe.
 */
export const InstagramEmbed = defineComponent({
  name: 'InstagramEmbed',
  setup() {
    const mockPosts = [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=300&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80',
    ]

    return () => (
      <div class="rounded-xl border border-border overflow-hidden bg-surface h-full flex flex-col shadow-sm">
        <div class="p-4 border-b border-border flex items-center justify-between bg-surface-muted">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shrink-0 relative">
              <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent"></div>
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=150&q=80" alt="verityplus" class="w-full h-full object-cover" />
            </div>
            <div>
              <h4 class="font-bold text-sm text-text-primary leading-none mb-1">verityplus</h4>
              <p class="text-[10px] text-text-muted">Tech & Lifestyle</p>
            </div>
          </div>
          <button class="px-4 py-1.5 bg-primary text-text-inverse font-bold text-xs rounded-lg hover:bg-primary-600 transition shadow-sm border-none cursor-pointer">
            Follow
          </button>
        </div>
        <div class="p-3 grid grid-cols-2 gap-2 flex-grow overflow-y-auto no-scrollbar bg-surface h-[360px]">
          {mockPosts.map((post, i) => (
            <div key={i} class="aspect-square relative group rounded-lg overflow-hidden cursor-pointer bg-surface-muted">
              <img src={post} alt="Instagram Post" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 text-white">
                <span class="flex items-center gap-1.5 text-xs font-bold drop-shadow-md">
                  <i class="bi bi-heart-fill text-red-500"></i> {Math.floor(Math.random() * 500) + 100}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div class="p-4 border-t border-border bg-surface-muted flex justify-center">
          <button class="text-xs font-bold text-primary hover:text-primary-600 transition flex items-center gap-2 border-none bg-transparent cursor-pointer">
            View on Instagram <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    )
  },
})
