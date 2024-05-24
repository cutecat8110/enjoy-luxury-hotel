<template>
  <div :class="[bg, props.col ? ' w-[1px]' : 'h-[1px]']" />
</template>

<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: 'black'
  },
  col: Boolean
})

const bg = computed(() => {
  return {
    black: 'bg-black',
    darkGray: 'bg-system-gray-60',
    lightGrey: 'bg-system-gray-40'
  }[props.color]
})
</script>
