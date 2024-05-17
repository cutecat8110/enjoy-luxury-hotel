<template>
  <div
    class="overflow-hidden rounded-[1.25rem] bg-white transition-shadow hover:shadow-md xl:grid xl:grid-cols-12"
  >
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
        <SwiperSlide v-for="(slide, index) in props.room.imageUrlList" :key="index">
          <div class="flex h-full">
            <NuxtImg class="flex-1 object-cover" :src="slide" width="50vw" />
          </div>
        </SwiperSlide>
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
    <div class="space-y-6 p-4 xl:col-span-5 xl:space-y-10 xl:p-10">
      <div class="space-y-2">
        <h3 class="text-h4 xl:text-h2">{{ props.room.name }}</h3>
        <p class="text-body-2 text-system-gray-80 xl:text-body">{{ props.room.description }}</p>
      </div>
      <ul class="inline-grid grid-cols-3 gap-4">
        <li
          v-for="(box, index) in boxes"
          :key="index"
          class="flex aspect-square flex-1 flex-col justify-center rounded-lg border border-system-primary-100 px-4"
        >
          <div class="space-y-2">
            <div class="flex h-6 w-6 items-center justify-center">
              <Icon class="text-[1.25rem] text-system-primary-100" :name="box.icon" />
            </div>
            <p class="text-nowrap text-sub-title text-system-gray-80 xl:text-title">
              {{ box.name }}
            </p>
          </div>
        </li>
      </ul>
      <div
        class="h-[0.125rem] flex-1 rounded-full bg-white bg-gradient-to-r from-system-primary-100 to-white"
      />
      <div class="flex items-center justify-between py-4">
        <p class="text-title text-system-primary-100 xl:text-h5">
          {{ formatCurrency(props.room.price) }}
        </p>

        <div
          class="flex h-6 w-6 cursor-pointer items-center justify-center text-[1.25rem] text-system-primary-100 transition-colors hover:text-system-primary-120"
        >
          <Icon name="mdi:arrow-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  room: {
    type: Object,
    default: () => ({
      name: '尊爵雙人房',
      description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
      price: 10000,
      imageUrlList: [
        '/img/desktop/room2-1.png',
        '/img/desktop/room2-2.png',
        '/img/desktop/room2-3.png',
        '/img/desktop/room2-4.png',
        '/img/desktop/room2-5.png'
      ]
    })
  }
})

const boxes = computed(() => [
  { icon: 'IconSize', name: props.room.areaInfo },
  { icon: 'ic:baseline-bed', name: props.room.bedInfo },
  { icon: 'ic:baseline-person', name: `2-${props.room.maxPeople}人` }
])
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
