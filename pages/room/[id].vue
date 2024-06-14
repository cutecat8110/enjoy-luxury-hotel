<template>
  <div v-if="room" class="bg-system-primary-10">
    <!-- 房型預覽 -->
    <Hero :name="room.name" :images="room.imageUrlList" />

    <div class="section-container col-md-container container">
      <!-- 房型資訊 -->
      <div class="space-y-6 xl:col-span-7 xl:space-y-20">
        <!-- 房名與描述 -->
        <div class="space-y-4">
          <h1 class="text-h3 xl:text-h1">{{ room.name }}</h1>
          <p class="text-body-2 xl:text-body">{{ room.description }}</p>
        </div>

        <!-- 房型基本資訊 -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="房型基本資訊" />
          <CRoomInfo
            :area-info="room.areaInfo"
            :bed-info="room.bedInfo"
            :max-people="room.maxPeople"
          />
        </section>

        <!-- 房間格局 -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="房間格局" />
          <CRoomDetail :details="room.layoutInfo" />
        </section>

        <!-- 房內設備 -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="房內設備" />
          <CRoomDetail :details="room.facilityInfo" />
        </section>

        <!-- 備品提供 -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="備品提供" />
          <CRoomDetail :details="room.amenityInfo" />
        </section>

        <!-- 訂房須知 -->
        <section class="space-y-4 xl:space-y-6">
          <CTitle title="訂房須知" />
          <Terms />
        </section>
      </div>

      <!-- Desktop: 預定選項 -->
      <div class="hidden xl:col-span-5 xl:block">
        <Booking class="sticky top-[10rem] z-20" :room="room" />
      </div>

      <!-- Mobile: 預定選項 -->
      <MBooking :room="room" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'
import Hero from './components/hero.vue'
import Terms from './components/terms.vue'
import Booking from './components/booking.vue'
import MBooking from './components/m-booking.vue'

/* 全局屬性 */
const route = useRoute()

/* api */
const { getRoomApi } = useApi()

// api: 取得房型
const { data: room }: { data: Ref<RoomResponse | null> } = await getRoomApi(
  route.params.id as string,
  {
    transform(res: any): RoomResponse {
      return res.result
    }
  }
)
</script>
