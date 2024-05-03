<template>
  <section class="banner-wrapper">
    <Swiper
      class="banner-swiper"
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
      <SwiperSlide v-for="(slide, index) in 5" :key="slide">
        <div class="flex h-full">
          <NuxtImg class="flex-1 object-cover" :src="`/img/desktop/banner${index}.png`" />
          <div class="absolute inset-0 bg-black/30" />
          <div class="absolute inset-0 flex py-[4.5rem] xl:py-[7.5rem]">
            <div class="container flex flex-1 px-5 pt-10 xl:max-w-full xl:px-20 xl:pt-[7.5rem]">
              <!-- 主要內容 -->
              <div
                class="flex flex-1 flex-col items-center gap-10 xl:flex-row xl:items-stretch xl:gap-[12.5rem]"
              >
                <div
                  class="flex flex-1 flex-col items-center justify-normal text-system-primary-100 xl:items-start xl:justify-center"
                >
                  <h1 class="select-none text-h4 xl:text-h2">享樂酒店</h1>
                  <div class="mt-2 select-none text-title xl:text-h5">Enjoyment Luxury Hotel</div>
                  <div
                    class="mt-5 w-[0.125rem] flex-1 rounded-full bg-gradient-to-b from-system-primary-100 to-white xl:mt-10 xl:h-[0.125rem] xl:w-full xl:flex-initial xl:bg-gradient-to-r"
                  />
                </div>

                <div
                  class="ml-12 flex h-2/3 items-center rounded-[2.5rem] border-r border-t bg-gradient-to-t from-white/30 backdrop-blur-[1.25rem] xl:h-auto xl:w-1/2 xl:rounded-[5rem]"
                >
                  <div class="-ml-10 pr-10 text-white xl:-ml-12 xl:pr-12">
                    <div class="select-none text-h1 xl:text-display">高雄</div>
                    <div class="mt-2 select-none text-nowrap text-h1 xl:text-display">
                      豪華住宿之選
                    </div>
                    <div class="mt-6 select-none text-title xl:text-h3">
                      我們致力於為您提供無與倫比的奢華體驗與優質服務
                    </div>
                    <UIHeroButton class="mt-[3.75rem] xl:mt-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style lang="scss" scoped>
:deep(.banner-swiper) {
  @apply relative h-screen;
  .swiper-pagination {
    @apply bottom-8 flex justify-center gap-2;
    @include xl {
      @apply bottom-6;
    }
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
