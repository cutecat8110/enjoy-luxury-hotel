<template>
  <section v-if="news" class="section-container relative bg-system-primary-10">
    <NuxtImg
      class="absolute right-6 top-10 z-0 xl:right-[11.25rem] xl:top-[6.25rem]"
      src="/img/desktop/dot.png"
      sizes="100px xl:200px"
    />
    <NuxtImg
      class="absolute -bottom-[3.75rem] left-6 z-0 xl:-bottom-20 xl:left-[12.5rem]"
      src="/img/desktop/dot.png"
      sizes="100px xl:200px"
    />
    <div class="container relative flex flex-col gap-10 xl:flex-row xl:gap-20">
      <div class="w-[8.75rem] space-y-6 xl:space-y-10">
        <h2 class="space-y-1 text-nowrap text-h3 text-system-primary-100 xl:text-h1">
          <div>最新</div>
          <div>消息</div>
        </h2>
        <div class="h-[0.125rem] rounded-full bg-gradient-to-r from-system-primary-100 to-white" />
      </div>
      <ul class="space-y-10">
        <li
          v-for="(newItem, index) in news"
          :key="index"
          class="group flex flex-col gap-6 xl:flex-row"
        >
          <NuxtImg
            class="shrink-0 cursor-pointer rounded-lg object-cover transition-opacity group-hover:opacity-85"
            :src="newItem.image"
            sizes="xl:474px"
          />
          <div class="flex cursor-pointer flex-col items-start justify-center gap-2 xl:gap-6">
            <h3 class="relative text-h4 xl:text-h3">
              {{ newItem.title }}

              <div
                class="absolute -bottom-[0.125rem] h-[0.125rem] w-full rounded-full bg-transparent transition-colors group-hover:bg-system-background xl:-bottom-2"
              ></div>
            </h3>
            <p class="text-body-2 xl:text-body">
              {{ newItem.description }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { newsPayload } from '@/types'

/* api */
const { getNewsApi } = useApi()

// api: 取得最新消息
const { data: news }: { data: Ref<newsPayload[] | null> } = await getNewsApi({
  transform(input: any) {
    return input.result
  }
})
</script>
