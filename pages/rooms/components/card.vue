<template>
  <div
    class="overflow-hidden rounded-[1.25rem] bg-white transition-shadow hover:shadow-md xl:grid xl:grid-cols-12"
  >
    <!-- 房型預覽 -->
    <div class="flex aspect-video xl:col-span-7 xl:aspect-auto">
      <Swiper
        class="room-swiper flex-1"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false
        }"
        :loop="true"
        :modules="[SwiperPagination, SwiperAutoplay, SwiperNavigation]"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }"
        :pagination="{
          clickable: true
        }"
      >
        <!-- 房型圖片 -->
        <SwiperSlide v-for="(slide, index) in props.room.imageUrlList" :key="index">
          <div class="flex h-full">
            <NuxtImg class="flex-1 object-cover" :src="slide" />
          </div>
        </SwiperSlide>

        <!-- 房型選擇按鈕 -->
        <div
          class="swiper-button-prev !left-6 !-mt-7 !hidden !h-14 !w-14 place-items-center rounded-full bg-white !text-system-gray-80 opacity-75 transition-opacity after:hidden hover:opacity-100 xl:!flex"
        >
          <Icon
            class="!h-auto !w-auto !object-none text-[2.5rem]"
            name="ic:baseline-keyboard-arrow-left"
          />
        </div>
        <div
          class="swiper-button-next !right-6 !-mt-7 !hidden !h-14 !w-14 place-items-center rounded-full bg-white !text-system-gray-80 opacity-75 transition-opacity after:hidden hover:opacity-100 xl:!flex"
        >
          <Icon
            class="!h-auto !w-auto !object-none text-[2.5rem]"
            name="ic:baseline-keyboard-arrow-right"
          />
        </div>
      </Swiper>
    </div>

    <!-- 房型資訊 -->
    <div class="space-y-6 p-4 xl:col-span-5 xl:space-y-10 xl:p-10">
      <!-- 房名與描述 -->
      <div class="space-y-2">
        <h3 class="text-h4 xl:text-h2">{{ props.room.name }}</h3>
        <p class="text-body-2 text-system-gray-80 xl:text-body">{{ props.room.description }}</p>
      </div>

      <!-- 房型基本資訊 -->
      <CRoomInfo
        :area-info="props.room.areaInfo"
        :bed-info="props.room.bedInfo"
        :max-people="props.room.maxPeople"
        border
      />

      <!-- 分隔線 -->
      <UILine class="!h-[0.125rem]" color="primary" />

      <div class="flex items-center justify-between py-4">
        <!-- 房型價格 -->
        <p class="text-title text-system-primary-100 xl:text-h5">
          {{ useFormatCurrency(props.room.price) }}
        </p>

        <!-- 連結: 房型詳細頁 -->
        <NuxtLink :to="`/room/${props.room._id}`">
          <div
            class="flex h-6 w-6 cursor-pointer items-center justify-center text-[1.25rem] text-system-primary-100 transition-colors hover:text-system-primary-120"
          >
            <Icon name="mdi:arrow-right" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'

/* props */
const props = defineProps({
  room: {
    type: Object as PropType<RoomResponse>,
    required: true
  }
})
</script>

<style lang="scss" scoped>
:deep(.room-swiper) {
  .swiper-pagination {
    @apply bottom-6 flex justify-center gap-2;
  }

  .swiper-pagination-bullet {
    @apply m-0 block h-1 w-8 rounded-full bg-system-primary-40 opacity-100 transition-colors hover:bg-system-primary-100;

    &.swiper-pagination-bullet-active {
      @apply w-[3.75rem]  bg-system-primary-100;
    }
  }
}
</style>
