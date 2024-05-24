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
  gray: Boolean
})

const size = computed(() => (props.base ? 'text-sub-title xl:text-title' : 'text-title xl:text-h5'))
</script>
