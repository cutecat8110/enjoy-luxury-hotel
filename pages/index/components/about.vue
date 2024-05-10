<template>
  <section class="section-container bg-system-background !pb-[7.5rem] xl:!pb-[12.5rem]">
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
          <UITitle text1="關於" text2="我們" white />

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
</template>

<script lang="ts" setup>
import UITitle from './UI/UITitle.vue'
</script>
