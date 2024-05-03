<template>
  <main class="flex-1 overflow-x-hidden">
    <Banner />

    <!-- 最新消息 -->
    <section class="relative bg-system-primary-10">
      <NuxtImg
        class="absolute right-6 top-10 z-0 h-[6.25rem] w-[6.25rem] xl:right-[11.25rem] xl:top-[6.25rem] xl:h-[12.5rem] xl:w-[12.5rem]"
        src="/img/desktop/dot.png"
      />
      <NuxtImg
        class="absolute -bottom-[3.75rem] left-6 z-0 h-[6.25rem] w-[6.25rem] xl:-bottom-20 xl:left-[12.5rem] xl:h-[12.5rem] xl:w-[12.5rem]"
        src="/img/desktop/dot.png"
      />
      <div
        class="container relative flex flex-col gap-10 py-20 xl:flex-row xl:gap-20 xl:py-[7.5rem]"
      >
        <div class="w-[8.75rem] space-y-6 xl:space-y-10">
          <h2 class="space-y-1 text-nowrap text-h3 text-system-primary-100 xl:text-h1">
            <div>最新</div>
            <div>消息</div>
          </h2>
          <div
            class="h-[0.125rem] rounded-full bg-gradient-to-r from-system-primary-100 to-white"
          />
        </div>
        <ul class="space-y-10">
          <li
            v-for="(newItem, index) in news"
            :key="index"
            class="flex flex-col-reverse gap-6 xl:flex-row-reverse xl:items-center"
          >
            <div class="peer cursor-pointer space-y-2 xl:space-y-6">
              <h3 class="text-h4 xl:text-h3">{{ newItem.title }}</h3>
              <p class="text-body-2 xl:text-body">
                {{ newItem.description }}
              </p>
            </div>
            <NuxtImg
              class="flex-1 cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-85 peer-hover:opacity-85"
              :src="newItem.image"
            />
          </li>
        </ul>
      </div>
    </section>
    <div class="container">
      <div class="h-[2000px] border"></div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Banner from './components/banner.vue'

const news = ref([
  {
    title: '秋季旅遊，豪華享受方案',
    image: '/img/desktop/news1.png',
    description:
      '秋天就是要來場豪華的旅遊！我們為您準備了一系列的秋季特別方案，包括舒適的住宿、美食饗宴，以及精彩的活動。不論您是想來一趟浪漫之旅，還是想和家人共度美好時光，都能在這裡找到最適合的方案。'
  },
  {
    title: '輕鬆住房專案',
    image: '/img/desktop/news2.png',
    description:
      '我們知道，有時候您只是需要一個舒適的地方放鬆心情。因此，我們推出了「輕鬆住房專案」，讓您無壓力地享受住宿。不管是短期的休息，還是長期的住宿，我們都會以最貼心的服務，讓您感到賓至如歸。'
  },
  {
    title: '耶誕快樂，住房送禮',
    image: '/img/desktop/news3.png',
    description:
      '聖誕節來臨，我們為您準備了特別的禮物！在聖誕期間訂房，不僅有特別優惠，還會送上我們精心準備的聖誕禮物。讓我們一起慶祝這個溫馨的節日吧！'
  }
])
</script>
