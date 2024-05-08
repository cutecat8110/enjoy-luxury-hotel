<template>
  <section class="section-container bg-system-primary-10">
    <NuxtImg
      class="absolute left-10 top-14 hidden w-[11.5rem] xl:block"
      src="/img/desktop/line.png"
    />
    <NuxtImg
      class="absolute -top-10 right-20 z-0 hidden xl:block"
      src="/img/desktop/dot.png"
      sizes="200px"
    />
    <div class="container relative space-y-20">
      <UITitle text1="佳餚" text2="美饌" />
      <Swiper class="menu-swiper" :slides-per-view="view" :space-between="24">
        <SwiperSlide
          v-for="(food, index) in menu"
          :key="index"
          class="group relative flex aspect-[4/6] cursor-pointer overflow-hidden rounded-lg"
        >
          <NuxtImg
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.1]"
            :src="food.image"
            width="75vw md:50vw xl:25vw"
          />

          <div
            class="absolute inset-x-0 bottom-0 space-y-6 bg-gradient-to-t from-system-background from-25% p-6 text-white backdrop-blur-[1.25rem]"
          >
            <div class="flex items-center justify-between">
              <h3 class="text-h5">{{ food.title }}</h3>
              <div class="text-body-2 text-system-gray-40 xl:text-body">
                {{ food.diningTime }}
              </div>
            </div>
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
import UITitle from './UI/UITitle.vue'
const { width } = useWindowSize()

const menu = ref([
  {
    title: '海霸',
    description:
      '以新鮮海產料理聞名，我們的專業廚師選用高雄當地的海鮮，每一道菜都充滿海洋的鮮美與清甜。無論是烤魚、蒸蝦還是煮蛤蜊，都能讓您品嚐到最新鮮的海洋風味。',
    diningTime: 'SUN-MON 11:00-20:30',
    image: '/img/desktop/food1.png'
  },
  {
    title: '日食',
    description:
      '為您提供優質的牛排，每一塊肉都來自頂級的牛肉，經過專業廚師的巧手烹調，口感豐滿、風味絕佳。搭配我們的特製醬料，讓您的味蕾享受一場美味的盛宴。',
    diningTime: 'SUN-MON 17:00-22:00',
    image: '/img/desktop/food2.png'
  },
  {
    title: '山臻',
    description:
      '帶您進入一次辣味與鮮香兼具的川菜美食之旅。我們的廚師掌握正宗的川菜烹調技巧，從麻辣鍋到口水雞，每一道菜都有其獨特的風味，讓您回味無窮。',
    diningTime: 'SUN-MON 11:30-20:30',
    image: '/img/desktop/food3.png'
  },
  {
    title: '月永',
    description:
      '從鮮美的海鮮、經典的牛排，到各國的特色美食，我們都一應俱全。在這裡，您可以品嚐到世界各地的美食，每一道菜都由專業廚師用心製作，讓您在享受美食的同時，也能感受到我們的熱情與用心。',
    diningTime: 'SUN-MON 11:00-20:00',
    image: '/img/desktop/food4.png'
  },
  {
    title: '天潮',
    description:
      '我們提供各種精緻甜點與糕點，無論您喜歡的是巧克力蛋糕、法式馬卡龍，還是台灣傳統的糕點，都能在這裡找到。讓我們的甜點帶您進入一場繽紛的甜蜜旅程。',
    diningTime: 'SUN-MON 14:00-19:30',
    image: '/img/desktop/food5.png'
  }
])

const view = computed(() => {
  if (width.value > 992) return 3

  if (width.value > 768) return 2
  return 1.2
})
</script>

<style lang="scss" scoped>
:deep(.menu-swiper) {
  @apply overflow-visible;
}
</style>
