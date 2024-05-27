<template>
  <div class="flex gap-3">
    <div :class="[gray ? 'bg-system-gray-60' : 'bg-system-primary-100', 'w-1 rounded-full ']" />
    <h2 :class="size">{{ title }}</h2>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  base: Boolean,
  gray: Boolean,
  size: {
    type: String as () => 'sm' | 'md' | 'lg',
    default: 'lg'
  }
})

const size = computed(() => {
  return {
    sm: 'text-body-2 xl:text-body',
    md: 'text-sub-title xl:text-title',
    lg: 'text-title xl:text-h5'
  }[props.size]
})
</script>
