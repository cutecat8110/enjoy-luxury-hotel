<template>
  <div class="space-y-2">
    <p class="text-system-primary-100 xl:text-sub-title">享樂酒店，誠摯歡迎</p>
    <h2 class="text-h3 text-white xl:text-h1">{{ props.text }}</h2>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>
