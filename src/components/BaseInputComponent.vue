<template>
  <div class="w-full max-w-sm">
    <label v-if="label" :for="inputId" class="block mb-2 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <div class="relative">
      <input :id="inputId" :type="type" v-model="model" v-bind="$attrs"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        :class="{ 'pr-10': $slots['end-icon'] }" :placeholder="placeholder" />

      <div v-if="$slots['end-icon']"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <slot name="end-icon"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue';

defineOptions({
  inheritAttrs: false
});

const model = defineModel<string>();

interface Props {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';
}

withDefaults(defineProps<Props>(), {
  placeholder: "Ketik di sini...",
  type: "text"
});

const inputId = useId();
</script>
