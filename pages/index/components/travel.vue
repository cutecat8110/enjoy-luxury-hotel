<template>
  <section class="section-container">
    <div class="container space-y-10 xl:space-y-20">
      <!-- 大標題 -->
      <UITitle text1="交通" text2="方式" />

      <div class="space-y-6 text-white xl:space-y-10">
        <div class="space-y-4">
          <!-- 地址 -->
          <div class="text-body">台灣台中市南區復興路三段362號</div>

          <!-- google 地圖 -->
          <div
            id="GOOGLE_MAP"
            ref="mapRefs"
            class="h-[22.5rem] w-full overflow-hidden rounded-lg"
          />
        </div>

        <!-- 交通方式 -->
        <ul class="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <li v-for="(travel, index) in travels" :key="index">
            <!-- 圖示 -->
            <Icon
              class="text-icon-48 text-system-primary-100 xl:text-icon-80"
              :name="travel.icon"
            />

            <!-- 名稱 -->
            <h3 class="mt-2 text-title xl:mt-4 xl:text-h5">{{ travel.name }}</h3>

            <!-- 描述 -->
            <p class="mt-2 text-body-2 xl:text-body">{{ travel.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Loader } from '@googlemaps/js-api-loader'
import googleMapStyles from './google-map-styles.json'
import UITitle from './UI/UITitle.vue'

/* 交通方式 */
const travels = [
  {
    icon: 'ic:baseline-directions-car',
    name: '自行開車',
    description:
      '如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。'
  },
  {
    icon: 'ic:baseline-train',
    name: '高鐵/火車',
    description:
      '如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。'
  },
  {
    icon: 'IconLuxuryCar',
    name: '禮賓車服務',
    description:
      '承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567'
  }
]

/* google 地圖 */
const mapRefs = ref<HTMLElement | null>(null)

// 座標
const location = { lat: 24.133459091186523, lng: 120.68169403076172 }

// ApiKey
const runtimeConfig = useRuntimeConfig()
const loader = new Loader({
  apiKey: runtimeConfig.public.mapApiKey,
  version: 'weekly'
})

// 實例化
onMounted(() => {
  loader.importLibrary('maps').then(async () => {
    const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = new Map(mapRefs.value as HTMLElement, {
      center: location,
      zoom: 18,
      disableDefaultUI: true,
      styles: googleMapStyles
    })
  })
})
</script>

<style lang="scss" scoped>
.section-container {
  @apply bg-system-background;
}
</style>
