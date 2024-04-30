<template>
  <div class="home">
    <div class="relative h-screen bg-black">
      <div class="absolute left-0 top-0 z-10 h-full w-full pt-[4.5rem] xl:pt-[7.5rem]">
        <div
          class="container h-full px-5 pb-6 pt-10 xl:pb-8 xl:pt-[7.25rem] 2xl:max-w-full 2xl:px-20"
        >
          <div class="flex h-full flex-col gap-10 xl:gap-16">
            <div class="flex flex-1 gap-[200px]">
              <div
                v-if="!commonStore.isMobile"
                class="flex w-1/3 flex-col justify-center text-system-primary-100"
              >
                <h1 class="text-h2">享樂酒店</h1>
                <div class="mb-10 text-h5">Enjoyment Luxury Hotel</div>
                <div
                  class="h-[2px] rounded-full bg-gradient-to-r from-system-primary-100 to-white"
                ></div>
              </div>
              <div
                class="flex flex-1 items-center rounded-[5rem] border-r border-t bg-gradient-to-t from-white/30 text-white backdrop-blur-[1.25rem]"
              >
                <div class="-ml-12">
                  <div class="mb-2 text-display">高雄<br />豪華住宿之選</div>
                  <div class="mb-[3.75rem] text-h3">
                    我們致力於為您提供無與倫比的奢華體驗與優質服務
                  </div>
                  <UIHeroButton />
                </div>
              </div>
            </div>

            <div class="h-1 bg-white"></div>
          </div>
        </div>
      </div>
      <NuxtImg class="h-full w-full object-cover opacity-40" src="/img/desktop/banner.png" />
    </div>
    <div class="container">
      <div class="h-[2000px] border">
        <button
          class="rounded border px-4 py-2"
          type="button"
          @click="commonStore.test = !commonStore.test"
        >
          {{ `pinia: ${commonStore.test}` }}
        </button>
        <div>pos: {{ x }}, {{ y }}</div>
        <Icon name="uil:github" color="black" />
        <div class="test-color h-4 w-4"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/stores/common'
const commonStore = useCommonStore()
const { x, y } = useMouse()
</script>
