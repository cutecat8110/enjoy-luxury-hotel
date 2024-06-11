<template>
  <div>
    <!-- 全屏輪播 -->
    <CBanner rooms />

    <div v-if="rooms" class="section-container bg-system-primary-10">
      <!-- 區塊容器 -->
      <div class="container space-y-10 xl:space-y-20">
        <!-- 大標題 -->
        <div class="space-x-2 xl:space-y-4">
          <p class="text-sub-title text-system-gray-80 xl:text-h6">房型選擇</p>
          <p class="text-h3 text-system-primary-100 xl:text-h1">各種房型，任您挑選</p>
        </div>

        <!-- 房型列表 -->
        <ol class="space-y-6 xl:space-y-12">
          <li v-for="(room, index) in rooms" :key="index">
            <!-- 房型卡片 -->
            <Card :room="room" />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'
import Card from './components/card.vue'

/* layout */
definePageMeta({
  layout: 'landing'
})

/* api */
const { getRoomsApi } = useApi()

// api: 取得所有房型
const { data: rooms }: { data: Ref<RoomResponse[] | null> } = await getRoomsApi({
  transform(res: any): RoomResponse[] {
    return res.result
  }
})
</script>
