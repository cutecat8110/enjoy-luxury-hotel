<template>
  <button :class="[cssColor, props.block ? 'flex w-full' : ' inline-flex']" :type="props.type">
    {{ props.text }}
    <div v-if="props.icon" class="flex h-6 w-6 items-center justify-center">
      <Icon class="" :name="props.icon"></Icon>
    </div>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String as () => 'button' | 'submit' | 'reset' | undefined,
    default: 'button'
  },
  text: {
    type: String,
    default: 'Button'
  },
  icon: {
    type: String,
    default: ''
  },
  variant: {
    type: String as () => 'primary' | 'secondary' | 'ghost' | 'text',
    default: 'primary'
  },
  block: Boolean
})

const cssColor = computed<string>(() => {
  return {
    primary:
      'text-nowrap select-none items-center justify-center gap-1 rounded-lg bg-system-primary-100 px-8 py-4 text-sub-title xl:text-title text-white transition-colors hover:bg-system-primary-120 disabled:bg-system-gray-40 disabled:text-system-gray-60',
    secondary:
      'text-nowrap select-none items-center justify-center gap-1 rounded-lg border border-system-primary-100 bg-white px-8 py-4 text-sub-title xl:text-title text-system-primary-100 transition-colors hover:border-system-primary-120 hover:bg-system-primary-10 hover:text-system-primary-120 disabled:border-system-gray-60 disabled:text-system-gray-60 disabled:bg-white',
    ghost:
      'text-nowrap select-none items-center justify-center gap-1 rounded-lg px-8 py-4 text-sub-title xl:text-title text-white transition-colors hover:text-system-primary-100 disabled:text-system-gray-60',
    text: 'text-nowrap select-none items-center justify-center gap-1 rounded-lg text-sub-title xl:text-title text-system-primary-100 underline transition-colors hover:text-system-primary-120 disabled:text-system-gray-60'
  }[props.variant]
})
</script>
