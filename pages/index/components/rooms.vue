<template>
  <section class="relative py-20">
    <!-- 背景圖 -->
    <data class="absolute inset-0 z-0 flex xl:items-end">
      <NuxtImg src="/img/desktop/bg.png" width="100vw" />
    </data>

    <div class="relative grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-20">
      <!-- 房型預覽 -->
      <div class="container relative xl:z-0 xl:max-w-full xl:pl-0 xl:pr-5">
        <Swiper
          class="rooms-swiper aspect-[10/8] rounded-lg xl:aspect-square xl:rounded-l-none"
          :autoplay="{
            delay: 7000,
            disableOnInteraction: false
          }"
          :effect="'fade'"
          :loop="true"
          :modules="[SwiperPagination, SwiperEffectFade, SwiperAutoplay]"
          :pagination="{
            clickable: true
          }"
        >
          <SwiperSlide v-for="(slide, index) in rooms[currentRoom].imageUrlList" :key="index">
            <div class="flex h-full">
              <NuxtImg class="flex-1 object-cover" :src="slide" width="50vw" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- 波浪背景 -->
      <div class="absolute -top-[6.5rem] left-1/4 xl:relative xl:left-auto xl:top-auto">
        <div class="w-[120vw] xl:-ml-[8.75rem] xl:w-[56vw] xl:pt-[3.75rem]">
          <NuxtImg src="/img/desktop/line3.png" width="100vw" />
        </div>
      </div>

      <!-- 房間資訊 -->
      <div class="pointer-events-none xl:absolute xl:inset-0">
        <div class="container xl:grid xl:h-full xl:grid-cols-2 xl:gap-20">
          <div
            class="pointer-events-auto col-start-2 flex flex-col justify-end gap-6 text-white xl:gap-10"
          >
            <!-- 房名與描述 -->
            <div class="space-y-2">
              <h3 class="text-h4 xl:text-h2">{{ rooms[currentRoom].name }}</h3>
              <p class="text-body-2 xl:text-body">{{ rooms[currentRoom].description }}</p>
            </div>

            <!-- 價格 -->
            <div class="text-h5 xl:text-h3">
              {{ formatCurrency(rooms[currentRoom].price) }}
            </div>

            <!-- 查看按鈕 -->
            <UIHeroButton text="查看更多" />

            <!-- 上下按鈕 -->
            <div class="flex justify-end">
              <button
                class="flex h-14 w-14 items-center justify-center p-4 text-2xl text-system-primary-100 transition-colors hover:text-system-primary-120"
                type="button"
                @click="changeRoom('prev')"
              >
                <Icon class="shrink-0" name="ic:baseline-keyboard-arrow-left"></Icon>
              </button>
              <button
                class="flex h-14 w-14 items-center justify-center p-4 text-2xl text-system-primary-100 transition-colors hover:text-system-primary-120"
                type="button"
                @click="changeRoom('next')"
              >
                <Icon class="shrink-0" name="ic:baseline-keyboard-arrow-right"></Icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const rooms = ref([
  {
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
  },
  {
    name: '景觀雙人房',
    description: '景觀雙人房擁有絕美的高雄市景觀，讓您在舒適的環境中欣賞城市之美。',
    price: 10000,
    imageUrlList: [
      '/img/desktop/room3-1.png',
      '/img/desktop/room3-2.png',
      '/img/desktop/room3-3.png',
      '/img/desktop/room3-4.png',
      '/img/desktop/room3-5.png'
    ]
  },
  {
    name: '豪華雅緻房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    price: 10000,
    imageUrlList: [
      '/img/desktop/room4-1.png',
      '/img/desktop/room4-2.png',
      '/img/desktop/room4-3.png',
      '/img/desktop/room4-4.png',
      '/img/desktop/room4-5.png'
    ]
  },
  {
    name: '景觀尊榮家庭房',
    description: '景觀尊榮家庭房不僅有寬敞的空間，還有絕美的市景視野，是帶給家庭最尊榮的待遇。',
    price: 10000,
    imageUrlList: [
      '/img/desktop/room5-1.png',
      '/img/desktop/room5-2.png',
      '/img/desktop/room5-3.png',
      '/img/desktop/room5-4.png',
      '/img/desktop/room5-5.png'
    ]
  }
])

const currentRoom = ref(0)

const changeRoom = (direction: string) => {
  if (direction === 'prev') {
    currentRoom.value = (currentRoom.value - 1 + rooms.value.length) % rooms.value.length
  } else if (direction === 'next') {
    currentRoom.value = (currentRoom.value + 1) % rooms.value.length
  }
}
</script>

<style lang="scss" scoped>
:deep(.rooms-swiper) {
  .swiper-pagination {
    @apply bottom-6 flex justify-center gap-2;
  }

  .swiper-pagination-bullet {
    @apply m-0 block h-1 w-8 rounded-full bg-system-primary-40 opacity-100 transition-colors hover:bg-system-primary-100;

    &.swiper-pagination-bullet-active {
      @apply w-[3.75rem]  bg-system-primary-100;
    }
  }

  img {
    @apply scale-[1.1] transition-all duration-[8000ms] ease-linear;
  }

  .swiper-slide-active,
  .swiper-slide-prev {
    img {
      @apply scale-100;
    }
  }
}
</style>
