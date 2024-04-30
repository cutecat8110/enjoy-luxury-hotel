<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/stores/common'
const commonStore = useCommonStore()

const { width } = useWindowSize()
onMounted(() => {
  watch(
    width,
    () => {
      commonStore.isMobile = width.value <= 1200
    },
    {
      immediate: true
    }
  )
  commonStore.isClient = true
})
</script>

<style>
html,
body {
  @apply bg-system-background;
}

body {
  @apply relative;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.075s ease-in-out !important;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.075s ease-in-out !important;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
