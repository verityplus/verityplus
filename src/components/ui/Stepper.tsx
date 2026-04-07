import { defineComponent, type PropType } from 'vue'

export const Stepper = defineComponent({
  name: 'Stepper',
  props: {
    steps: {
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
      <div class="w-full">
        <div class="flex items-center justify-between mb-8 relative">
          <div class="absolute left-0 top-3 w-full h-1 bg-surface-border -z-10 rounded-full"></div>
          <div 
            class="absolute left-0 top-3 h-1 bg-primary -z-10 rounded-full transition-all duration-300"
            style={{ width: `${(props.modelValue / (props.steps.length - 1)) * 100}%` }}
          ></div>
          {props.steps.map((step, index) => {
            const isActive = index === props.modelValue
            const isCompleted = index < props.modelValue
            
            return (
              <div 
                key={index} 
                class="flex flex-col items-center cursor-pointer group"
                onClick={() => emit('update:modelValue', index)}
              >
                <div 
                  class={[
                    'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4',
                    isActive 
                      ? 'bg-primary text-white border-primary/30 shadow-lg scale-110' 
                      : isCompleted 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-surface border-surface-border text-text-muted group-hover:border-primary/50 group-hover:text-primary z-10'
                  ]}
                >
                  {isCompleted ? (
                    <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span 
                  class={[
                    'mt-2 text-xs md:text-sm font-medium transition-colors duration-300 px-2 py-0.5 rounded-full',
                    isActive ? 'text-primary bg-primary/10' : 'text-text-muted'
                  ]}
                >
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
})
