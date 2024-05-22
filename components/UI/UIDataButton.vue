<template>
  <button
    class="rounded-lg border border-black p-4 text-left transition-colors hover:bg-system-gray-10"
    type="button"
  >
    <p class="text-tiny">{{ title }}</p>
    <p class="truncate text-body">{{ date }}</p>
  </button>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
</script>
