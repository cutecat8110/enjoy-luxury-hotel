<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UIScrollTop />
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

/* 切換頁至頂 */
const { y } = useWindowScroll()
const route = useRoute()
watch(
  () => route.name,
  () => {
    y.value = 0
  }
)
</script>
