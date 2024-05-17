<template>
  <section class="hero xl:p-20">
    <div class="relative hidden grid-cols-12 gap-2 overflow-hidden rounded-[1.25rem] xl:grid">
      <div class="col-span-7 flex aspect-video">
        <NuxtImg class="flex-1 object-cover" :src="images[0]" />
      </div>
      <ol class="col-span-5 grid grid-cols-2 place-content-stretch gap-2">
        <li v-for="(image, index) in images.slice(1)" :key="index" class="flex">
          <NuxtImg class="flex-1 object-cover" :src="image" />
        </li>
      </ol>
      <UIButton class="absolute bottom-10 right-10" text="看更多" variant="secondary" />
    </div>
    <div class="flex aspect-video xl:!hidden">
      <Swiper
        class="room-swiper flex-1"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false
        }"
        :effect="'fade'"
        :loop="true"
        :modules="[SwiperPagination, SwiperAutoplay, SwiperEffectFade]"
        :pagination="{
          clickable: true
        }"
      >
        <SwiperSlide v-for="(slide, index) in images" :key="index">
          <div class="flex h-full">
            <NuxtImg class="flex-1 object-cover" :src="slide" />
          </div>
        </SwiperSlide>

        <Teleport v-if="isMounted" to=".swiper-pagination">
          <UIButton class="ml-auto" text="看更多" variant="secondary" />
        </Teleport>
      </Swiper>
    </div>
  </section>
</template>

<script lang="ts" setup>
defineProps({
  images: {
    type: Array as PropType<string[]>,
    default: () => [
      '/img/desktop/room2-1.png',
      '/img/desktop/room2-2.png',
      '/img/desktop/room2-3.png',
      '/img/desktop/room2-4.png',
      '/img/desktop/room2-5.png'
    ]
  }
})
const isMounted = ref(false)
onMounted(() => {
  nextTick(() => {
    isMounted.value = true
  })
})
</script>

<style lang="scss" scoped>
:deep(.room-swiper) {
  .swiper-pagination {
    @apply container inset-x-0 bottom-6 flex  items-end justify-center gap-2;
  }

  .swiper-pagination-bullet {
    @apply m-0 block h-1 w-8 rounded-full bg-system-primary-40 opacity-100 transition-colors hover:bg-system-primary-100;

    &.swiper-pagination-bullet-active {
      @apply w-[3.75rem]  bg-system-primary-100;
    }
  }
  img {
    @apply scale-[1.1] transition-all duration-[6000ms] ease-linear;
  }

  .swiper-slide-active,
  .swiper-slide-prev {
    img {
      @apply scale-100;
    }
  }
}
</style>
