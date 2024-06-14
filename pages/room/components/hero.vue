<template>
  <section class="hero xl:p-20">
    <!-- Desktop: 格線預覽 -->
    <div class="relative hidden grid-cols-12 gap-2 overflow-hidden rounded-[1.25rem] xl:grid">
      <!-- 主預覽圖 -->
      <div class="col-span-7 flex aspect-video">
        <NuxtImg class="flex-1 object-cover" :src="props.images[0]" />
      </div>

      <!-- 四格預覽小圖 -->
      <ol class="col-span-5 grid grid-cols-2 place-content-stretch gap-2">
        <li v-for="(image, index) in props.images.slice(1)" :key="index" class="flex">
          <NuxtImg class="flex-1 object-cover" :src="image" />
        </li>
      </ol>

      <!-- 按鈕: 開啟燈箱 -->
      <UIButton
        class="absolute bottom-10 right-10"
        text="看更多"
        variant="secondary"
        @click="show"
      />
    </div>

    <!-- Mobile: 輪播預覽 -->
    <div v-show="commonStore.isMobile" class="flex aspect-video">
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
        <!-- 預覽圖 -->
        <SwiperSlide v-for="(slide, index) in props.images" :key="index">
          <div class="flex h-full">
            <NuxtImg class="flex-1 object-cover" :src="slide" />
          </div>
        </SwiperSlide>

        <!-- 按鈕: 開啟燈箱 -->
        <ClientOnly>
          <Teleport to=".swiper-pagination">
            <UIButton class="ml-auto" text="看更多" variant="secondary" @click="show" />
          </Teleport>
        </ClientOnly>
      </Swiper>
    </div>

    <!-- 燈箱: 圖片預覽 -->
    <vue-easy-lightbox :imgs="images" :visible="lightboxShow" loop @hide="close" />
  </section>
</template>

<script lang="ts" setup>
/* props */
const props = defineProps({
  images: {
    type: Array as PropType<string[]>,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

/* 全局屬性 */
const commonStore = useCommonStore()

/* 圖片預覽 */
const lightboxShow = ref(false)
const images = computed(() =>
  props.images.map((src, i) => ({ src, title: `${props.name} - ${i + 1}` }))
)
const show = () => (lightboxShow.value = true)
const close = () => (lightboxShow.value = false)
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

<style lang="scss" scoped>
:deep(.vel-modal) {
  @apply bg-black/40 backdrop-blur-[1.25rem];
}
</style>
