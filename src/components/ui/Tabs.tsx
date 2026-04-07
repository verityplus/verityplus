import { defineComponent, type PropType } from 'vue'

export const Tabs = defineComponent({
  name: 'Tabs',
  props: {
    tabs: {
      type: Array as PropType<string[]>,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => (
      <div class="w-full border-b border-surface-border mb-8">
        <div class="flex items-center gap-6 overflow-x-auto">
          {props.tabs.map((tab, index) => {
            const isActive = index === props.modelValue
            
            return (
              <button
                key={index}
                class={[
                  'pb-3 font-bold text-sm transition-colors relative whitespace-nowrap',
                  isActive 
                    ? 'text-primary' 
                    : 'text-text-muted hover:text-text-primary'
                ]}
                onClick={() => emit('update:modelValue', index)}
                type="button"
              >
                {tab}
                {isActive && (
                  <div class="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }
})
