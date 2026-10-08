<template>
  <div class="min-w-0 space-y-2 [overflow-wrap:anywhere]">
    <label class="text-body-2 text-system-gray-80 xl:text-body">{{ props.title }}</label>
    <p class="text-sub-title xl:text-title">{{ props.text }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
</script>
