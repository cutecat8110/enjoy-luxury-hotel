<template>
  <button :class="cssColor" type="button">
    {{ props.text }}
    <div v-if="props.icon" class="flex h-6 w-6 items-center justify-center">
      <Icon class="" :name="props.icon"></Icon>
    </div>
  </button>
</template>

<script lang="ts" setup>
type ButtonType = 'primary' | 'secondary' | 'ghost' | 'text'

const props = defineProps({
  text: {
    type: String,
    default: 'Button'
  },
  icon: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'primary'
  }
})

const cssColor = computed<string>(() => {
  return {
    primary:
      'text-nowrap inline-flex select-none items-center gap-1 rounded-lg bg-system-primary-100 px-8 py-4 text-title text-white transition-colors hover:bg-system-primary-120 disabled:bg-system-gray-40 disabled:text-system-gray-60',
    secondary:
      'text-nowrap inline-flex select-none items-center gap-1 rounded-lg border border-system-primary-100 bg-white px-8 py-4 text-title text-system-primary-100 transition-colors hover:border-system-primary-120 hover:bg-system-primary-10 hover:text-system-primary-120 disabled:border-system-gray-60 disabled:text-system-gray-60 disabled:bg-white',
    ghost:
      'text-nowrap inline-flex select-none items-center gap-1 rounded-lg px-8 py-4 text-title text-white transition-colors hover:text-system-primary-100 disabled:text-system-gray-60',
    text: 'text-nowrap inline-flex select-none items-center gap-1 rounded-lg text-title text-system-primary-100 underline transition-colors hover:text-system-primary-120 disabled:text-system-gray-60'
  }[props.type]
})
</script>
