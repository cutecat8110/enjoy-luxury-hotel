<template>
  <Transition name="scroll-top">
    <div v-if="scrollTopIsShow" class="ui-scroll-top" @click="scrollTop()">
      <Icon name="ic:baseline-keyboard-arrow-up" />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
/* 至頂 */
const { height } = useWindowSize()
const { y } = useWindowScroll({ behavior: 'smooth' })
const scrollTop = () => {
  y.value = 0
}

// 至頂: 按鈕顯示
const scrollTopIsShow = computed(() => y.value > height.value / 4)
</script>

<style lang="scss" scoped>
.ui-scroll-top {
  @apply fixed bottom-4 right-4 z-30 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/20 text-icon-24 text-white transition-all hover:bg-black/40 hover:shadow xl:bottom-10 xl:right-10 xl:h-14 xl:w-14 xl:text-icon-40;
}

.scroll-top-enter-active {
  transition: all 0.2s ease-out;
}

.scroll-top-leave-active {
  transition: all 0.15s ease-in;
}

.scroll-top-enter-from {
  opacity: 0;
  transform: translateY(-1.5rem);
}

.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(-1.5rem);
}
</style>
