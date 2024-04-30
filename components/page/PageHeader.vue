<template>
  <header v-show="isWindowCheck">
    <div
      class="container flex items-center justify-between overflow-hidden py-4 xl:max-w-full xl:px-20 2xl:py-6"
    >
      <NuxtLink to="/">
        <PageLogo
          class="shrink-0 transition-colors hover:text-system-primary-100"
          :size="svgSize"
          white
        />
      </NuxtLink>

      <!-- Mobile: 選單按鈕 -->
      <button
        v-if="isMobile"
        class="flex h-10 w-10 items-center justify-center text-2xl text-white transition-colors hover:text-system-primary-100"
        type="button"
        @click="toggleModal"
      >
        <Icon name="ic:round-menu"></Icon>
      </button>
      <!-- Desktop: 導航列 -->
      <nav v-else class="space-x-4">
        <UIButton type="ghost" text="客房旅宿" />
        <UIButton type="ghost" text="會員登入" />
        <UIButton text="立即訂房" />
      </nav>
    </div>

    <!-- Mobile: 選單彈窗 -->
    <Teleport to="body">
      <div
        v-if="modalShow"
        class="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-system-background px-5"
      >
        <button
          class="absolute right-5 top-5 flex h-16 w-16 items-center justify-center text-5xl text-white transition-colors hover:text-system-primary-100"
          type="button"
          @click="toggleModal"
        >
          <Icon name="ic:baseline-close" />
        </button>
        <nav class="flex-1 space-y-10">
          <UIButton type="ghost" block text="客房旅宿" />
          <UIButton type="ghost" block text="會員登入" />
          <UIButton block text="立即訂房" />
        </nav>
      </div>
    </Teleport>
  </header>
</template>

<script lang="ts" setup>
/* 檢查是否為 Mobile */
const isMobile = ref(true)
const { width } = useWindowSize()
onMounted(() => {
  watch(
    width,
    () => {
      isMobile.value = width.value <= 1200
    },
    {
      immediate: true
    }
  )
  isWindowCheck.value = true
})

/* 計算 Logo 尺寸 */
const svgSize = computed(() => ({
  height: isMobile.value ? 40 : 72,
  width: isMobile.value ? 109.76 : 196
}))

/* 彈窗開關 */
const modalShow = ref(false)
const toggleModal = () => {
  modalShow.value = !modalShow.value
  if (windowLock) {
    windowLock.value = !windowLock.value
  }
}
// 滾輪鎖定
const isWindowCheck = ref(false)
let windowLock: { value: boolean } | undefined
// RWD 自動關閉彈窗
onMounted(() => {
  windowLock = useScrollLock(document.body)
  watch(width, () => {
    if (width.value >= 1200 && modalShow.value) {
      toggleModal()
    }
  })
})
</script>
