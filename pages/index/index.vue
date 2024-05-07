<template>
  <main class="flex-1 overflow-x-hidden">
    <Banner />

    <!-- 最新消息 -->
    <section class="relative bg-system-primary-10">
      <NuxtImg
        class="absolute right-6 top-10 z-0 xl:right-[11.25rem] xl:top-[6.25rem]"
        src="/img/desktop/dot.png"
        sizes="100px xl:200px"
      />
      <NuxtImg
        class="absolute -bottom-[3.75rem] left-6 z-0 xl:-bottom-20 xl:left-[12.5rem]"
        src="/img/desktop/dot.png"
        sizes="100px xl:200px"
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
            class="group flex flex-col gap-6 xl:flex-row"
          >
            <NuxtImg
              class="flex-1 cursor-pointer rounded-lg object-cover transition-opacity group-hover:opacity-85"
              :src="newItem.image"
              sizes="xl:474px"
            />
            <div class="flex cursor-pointer flex-col items-start justify-center gap-2 xl:gap-6">
              <h3 class="relative text-h4 xl:text-h3">
                {{ newItem.title }}

                <div
                  class="absolute -bottom-[0.125rem] h-[0.125rem] w-full rounded-full bg-transparent transition-colors group-hover:bg-system-background xl:-bottom-2"
                ></div>
              </h3>
              <p class="text-body-2 xl:text-body">
                {{ newItem.description }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 關於我們 -->
    <section class="pb-[7.5rem] pt-20 xl:pb-[12.5rem] xl:pt-[7.5rem]">
      <div class="relative">
        <NuxtImg
          class="absolute inset-0 h-full w-full object-cover"
          src="/img/desktop/about.png"
          width="100vw"
        />

        <div class="container relative flex flex-row-reverse px-5 xl:px-3">
          <div
            class="ml-5 translate-y-10 space-y-10 rounded-l-[2.5rem] rounded-tr-[2.5rem] bg-gradient-to-b from-system-background/80 to-system-primary-100/80 p-6 text-white xl:ml-0 xl:w-4/5 xl:translate-y-20 xl:space-y-20 xl:rounded-l-[5rem] xl:rounded-tr-[5rem] xl:p-20"
          >
            <div class="flex max-w-[19rem] items-center gap-10">
              <h2 class="space-y-1 text-nowrap text-h3 xl:text-h1">
                <div>關於</div>
                <div>我們</div>
              </h2>

              <div class="h-[0.125rem] flex-1 rounded-full bg-white" />
            </div>

            <div class="space-y-4 text-body-2 xl:space-y-10 xl:text-body">
              <p>
                享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。<br />
                我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
              </p>

              <p>
                我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。<br />
                我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。
              </p>

              <p>
                在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
              </p>

              <p>
                享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 房型介紹 -->
    <Rooms />

    <div class="container">
      <div class="h-[2000px] border"></div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Banner from './components/banner.vue'
import Rooms from './components/rooms.vue'

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
