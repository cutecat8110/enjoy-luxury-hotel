<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UIScrollTop />
</template>

<script lang="ts" setup>
/* 全局屬性 */
const commonStore = useCommonStore()
const { $Swal } = useNuxtApp()

/* 儲存全局屬型 */
const { width } = useWindowSize()
onMounted(() => {
  watch(
    width,
    () => {
      // 判斷: 是否手機板
      commonStore.isMobile = width.value < 1200
    },
    {
      immediate: true
    }
  )
  // 判斷: 是否客戶端
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

/* Process one alert at a time, including errors added while a dialog is open. */
onMounted(() => {
  let showing = false
  watch(
    () => commonStore.sweetalertList.length,
    async () => {
      if (showing) return
      showing = true
      try {
        while (commonStore.sweetalertList.length) {
          await $Swal?.fire(commonStore.sweetalertList[0])
          commonStore.sweetalertList.shift()
        }
      } finally {
        showing = false
      }
    },
    { immediate: true }
  )
})
</script>
