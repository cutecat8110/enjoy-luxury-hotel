<template>
  <section v-if="news" class="section-container relative bg-system-primary-10">
    <!-- 點狀裝飾 -->
    <NuxtImg
      class="absolute right-6 top-10 z-0 xl:right-[11.25rem] xl:top-[6.25rem]"
      src="/img/dot.png"
      sizes="100px xl:200px"
    />
    <NuxtImg
      class="absolute -bottom-[3.75rem] left-6 z-0 xl:-bottom-20 xl:left-[12.5rem]"
      src="/img/dot.png"
      sizes="100px xl:200px"
    />

    <!-- 區塊容器 -->
    <div class="container relative flex flex-col gap-10 xl:flex-row xl:gap-20">
      <!-- 大標題 -->
      <div class="w-[8.75rem] space-y-6 xl:space-y-10">
        <h2 class="space-y-1 text-nowrap text-h3 text-system-primary-100 xl:text-h1">
          <div>最新</div>
          <div>消息</div>
        </h2>
        <div class="h-[0.125rem] rounded-full bg-gradient-to-r from-system-primary-100 to-white" />
      </div>

      <!-- 內容容器 -->
      <ul class="space-y-10">
        <li
          v-for="(newItem, index) in news"
          :key="index"
          class="group flex flex-col gap-6 xl:flex-row"
          @click="openNew(index)"
        >
          <!-- 圖片 -->
          <NuxtImg
            class="shrink-0 cursor-pointer rounded-lg object-cover transition-opacity group-hover:opacity-85"
            :src="newItem.image"
            sizes="xl:474px"
          />

          <div class="flex cursor-pointer flex-col items-start justify-center gap-2 xl:gap-6">
            <!-- 標題 -->
            <h3 class="relative text-h4 xl:text-h3">
              {{ newItem.title }}
              <div
                class="absolute -bottom-[0.125rem] h-[0.125rem] w-full rounded-full bg-transparent transition-colors group-hover:bg-system-background xl:-bottom-2"
              />
            </h3>

            <!-- 描述 -->
            <p class="text-body-2 xl:text-body">
              {{ newItem.description }}
            </p>
          </div>
        </li>
        <UIModal v-model="newOpen">
          <div class="bg-system-primary-10">
            <div class="flex items-center justify-between p-4">
              <CTitle :title="news[currentNew].title" />

              <!-- 彈窗關閉按鈕 -->
              <button
                class="flex h-6 w-6 items-center justify-center text-icon-24 transition-colors hover:text-system-primary-100"
                type="button"
                @click="newOpen = false"
              >
                <Icon name="ic:baseline-close" />
              </button>
            </div>
            <div class="space-y-4 p-4 pt-0">
              <div class="aspect-[5/4] overflow-hidden rounded-lg xl:aspect-video">
                <NuxtImg
                  ref="fluidImageRefs"
                  class="h-full w-full object-cover"
                  :src="news[currentNew].image"
                  sizes="xl:474px"
                />
              </div>
              <p class="text-body-2 xl:text-body">
                {{ news[currentNew].description }}
              </p>
            </div>
          </div>
        </UIModal>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { NewResponse } from '@/types'

const newOpen = ref(false)

const currentNew = ref(0)

const openNew = (index: number) => {
  currentNew.value = index
  newOpen.value = true
}

/* api */
const { getNewsApi } = useApi()

// api: 取得最新消息
const { data: news }: { data: Ref<NewResponse[] | null> } = await getNewsApi({
  transform(res: any): NewResponse[] {
    return res.result
  }
})
</script>
