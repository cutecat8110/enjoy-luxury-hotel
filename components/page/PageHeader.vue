<template>
  <header
    v-show="commonStore.isClient"
    ref="pageHeaderRefs"
    :class="[bgBlack && ' bg-system-background', 'transition-colors duration-300']"
  >
    <div
      class="container flex items-center justify-between overflow-hidden py-4 xl:max-w-full xl:px-20 xl:py-6"
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
        v-if="commonStore.isMobile"
        class="flex h-10 w-10 items-center justify-center text-2xl text-white transition-colors hover:text-system-primary-100"
        type="button"
        @click="toggleModal"
      >
        <Icon name="ic:round-menu"></Icon>
      </button>
      <!-- Desktop: 導航列 -->
      <nav v-else class="space-x-4">
        <UIButton text="客房旅宿" variant="ghost" />
        <NuxtLink to="/auth/login">
          <UIButton text="會員登入" variant="ghost" />
        </NuxtLink>

        <UIButton text="立即訂房" />
      </nav>
    </div>

    <!-- Mobile: 選單彈窗 -->
    <Teleport to="body">
      <transition name="modal">
        <div
          v-if="modalShow"
          class="fixed left-0 top-0 z-[60] flex h-full w-full items-center justify-center bg-system-background px-5"
        >
          <button
            class="absolute right-5 top-5 flex h-16 w-16 items-center justify-center text-5xl text-white transition-colors hover:text-system-primary-100"
            type="button"
            @click="toggleModal"
          >
            <Icon name="ic:baseline-close" />
          </button>
          <nav class="flex-1 space-y-10">
            <NuxtLink class="block" to="/">
              <UIButton block text="客房旅宿" variant="ghost" />
            </NuxtLink>
            <NuxtLink class="block" to="/auth/login">
              <UIButton block text="會員登入" variant="ghost" />
            </NuxtLink>
            <NuxtLink class="block" to="/">
              <UIButton block text="立即訂房" />
            </NuxtLink>
          </nav>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/stores/common'
const commonStore = useCommonStore()

/* 計算 Logo 尺寸 */
const svgSize = computed(() => ({
  height: commonStore.isMobile ? 40 : 72,
  width: commonStore.isMobile ? 109.76 : 196
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
let windowLock: { value: boolean } | undefined
// RWD 自動關閉彈窗
onMounted(() => {
  windowLock = useScrollLock(document.body)
  watch(
    () => commonStore.isMobile,
    () => {
      if (!commonStore.isMobile && modalShow.value) {
        toggleModal()
      }
    }
  )
})

/* 滾動黑底 */
const { height } = useWindowSize()
const { y } = useWindowScroll()
const bgBlack = ref(false)
onMounted(() => {
  watch(y, () => {
    bgBlack.value = height.value / 4 < y.value
  })
})
</script>

<style lang="scss" scoped>
.modal-enter-active {
  transition: all 0.3s ease-in;
}

.modal-leave-active {
  transition: all 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
