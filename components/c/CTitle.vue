<template>
  <div class="flex gap-3">
    <div class="w-1 rounded-full bg-system-primary-100" />
    <h2 class="text-title xl:text-h5">{{ title }}</h2>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>
