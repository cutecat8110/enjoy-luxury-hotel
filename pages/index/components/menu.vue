<template>
  <section v-if="menu" class="section-container relative bg-system-primary-10">
    <!-- 條紋裝飾 -->
    <NuxtImg class="absolute left-10 top-14 hidden w-[11.5rem] xl:block" src="/img/line.png" />

    <!-- 點狀裝飾 -->
    <NuxtImg
      class="absolute -top-10 right-20 z-0 hidden xl:block"
      src="/img/dot.png"
      sizes="200px"
    />

    <!-- 區塊容器 -->
    <div class="container relative space-y-20">
      <!-- 大標題 -->
      <UITitle text1="佳餚" text2="美饌" />

      <!-- 輪播容器 -->
      <Swiper class="menu-swiper" :slides-per-view="view" :space-between="24">
        <SwiperSlide
          v-for="(food, index) in menu"
          :key="index"
          class="group relative flex aspect-[4/6] overflow-hidden rounded-lg"
        >
          <!-- 背景圖片 -->
          <NuxtImg
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.1]"
            :src="food.image"
            width="75vw md:50vw xl:25vw"
          />

          <!-- 內容容器 -->
          <div
            class="absolute inset-x-0 bottom-0 space-y-6 bg-gradient-to-t from-system-background from-25% p-6 text-white backdrop-blur-[1.25rem]"
          >
            <!-- 標題 -->
            <div class="flex items-center justify-between">
              <h3 class="text-h5">{{ food.title }}</h3>
              <div class="text-body-2 text-system-gray-40 xl:text-body">
                {{ food.diningTime }}
              </div>
            </div>

            <!-- 描述 -->
            <p class="text-body-2 xl:text-body">
              {{ food.description }}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { MenuResponse } from '@/types'
import UITitle from './UI/UITitle.vue'

/* 輪播 */
// RWD 顯示數量
const { width } = useWindowSize()
const view = computed(() => {
  if (width.value > 992) return 3

  if (width.value > 768) return 2
  return 1.2
})

/* api */
const { getDelicaciesApi } = useApi()

// api: 取得所有房型
const { data: menu }: { data: Ref<MenuResponse[] | null> } = await getDelicaciesApi({
  transform(res: any): MenuResponse[] {
    return res.result
  }
})
</script>

<style lang="scss" scoped>
:deep(.menu-swiper) {
  @apply overflow-visible;
}
</style>
