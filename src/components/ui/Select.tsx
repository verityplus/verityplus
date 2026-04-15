import { defineComponent, ref, type PropType } from 'vue'
import { useClickOutside } from '@/composables/useClickOutside'

export interface SelectOption {
  value: string | number
  label: string
}

export const BaseSelect = defineComponent({
  name: 'BaseSelect',
  props: {
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Select an option',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
      default: '',
    },
    error: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const isOpen = ref(false)
    const selectRef = ref<HTMLElement | null>(null)

    const toggleDropdown = () => {
      if (!props.disabled) {
        isOpen.value = !isOpen.value
      }
    }

    const selectOption = (option: SelectOption) => {
      emit('update:modelValue', option.value)
      emit('change', option.value)
      isOpen.value = false
    }

    useClickOutside(selectRef, () => {
      isOpen.value = false
    })

    const selectedOption = () => {
      return props.options.find(opt => opt.value === props.modelValue)
    }

    return () => (
      <div ref={selectRef} class="relative w-full group">
        <div
          onClick={toggleDropdown}
          class={[
            'flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all duration-300 cursor-pointer outline-none select-none',
            props.disabled ? 'bg-slate-50 opacity-60 cursor-not-allowed' : 'bg-slate-50/50 hover:bg-white',
            isOpen.value ? 'bg-white border-primary shadow-[0_0_0_4px_rgba(var(--primary-rgb),0.1)]' : 'border-slate-100',
            props.error ? 'border-red-200' : 'focus-within:border-primary/40',
            props.class,
          ]}
        >
          <span class={[
            'text-sm font-bold truncate',
            selectedOption() ? 'text-slate-900' : 'text-slate-400'
          ]}>
            {selectedOption() ? selectedOption()?.label : props.placeholder}
          </span>
          <i 
            class={[
              'bi bi-chevron-down text-slate-400 transition-transform duration-300 text-xs',
              isOpen.value ? 'rotate-180 transform' : ''
            ]}
          />
        </div>

        {isOpen.value && (
          <div 
            class="absolute z-[100] w-full mt-2 py-2 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-[0_12px_48px_-12px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200 origin-top"
          >
            <div class="max-h-[240px] overflow-y-auto custom-scrollbar">
              {props.options.length > 0 ? (
                props.options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => selectOption(option)}
                    class={[
                      'px-4 py-2.5 text-xs font-bold transition-all cursor-pointer flex items-center justify-between',
                      option.value === props.modelValue 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    ]}
                  >
                    <span>{option.label}</span>
                    {option.value === props.modelValue && (
                      <i class="bi bi-check2 text-primary"></i>
                    )}
                  </div>
                ))
              ) : (
                <div class="px-4 py-8 text-center text-slate-400 italic text-[10px] uppercase tracking-widest font-black">
                  No options available
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  },
})
