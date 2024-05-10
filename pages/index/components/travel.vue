<template>
  <section class="section-container space-y-10 !pb-0 xl:space-y-20">
    <div class="container space-y-10 xl:space-y-20">
      <UITitle text1="交通" text2="方式" />
      <div class="space-y-6 text-white xl:space-y-10">
        <div class="space-y-4">
          <div class="text-body">台灣台中市南區復興路三段362號</div>
          <!-- <iframe
            referrerpolicy="no-referrer-when-downgrade"
            class="rounded-lg border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1530.8838746121326!2d120.68030449128133!3d24.133969272075962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d1042abccf9%3A0x71ee765369fc0909!2z5paH5YyW6YOo5paH5YyW6LOH55Si5ZyS5Y2A!5e0!3m2!1szh-TW!2sjp!4v1715244995646!5m2!1szh-TW!2sjp"
            height="360"
            width="100%"
            loading="lazy"
          /> -->
          <!-- <ClientOnly>
            <Suspense>
              <GMapMap
                class="h-[22.5rem] w-full overflow-hidden rounded-lg"
                :center="{ lat: 24.133459091186523, lng: 120.68169403076172 }"
                :options="options"
                :zoom="18"
              />
            </Suspense>
          </ClientOnly> -->
          <div
            id="GOOGLE_MAP"
            ref="mapRefs"
            class="h-[22.5rem] w-full overflow-hidden rounded-lg"
          />
        </div>

        <ul class="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <li v-for="(travel, index) in travels" :key="index">
            <div class="flex h-12 w-12 items-center justify-center xl:h-20 xl:w-20">
              <Icon
                class="text-[2.25rem] text-system-primary-100 xl:text-[3.75rem]"
                :name="travel.icon"
              />
            </div>
            <h3 class="mt-2 text-title xl:mt-4 xl:text-h5">{{ travel.name }}</h3>
            <p class="mt-2 text-body-2 xl:text-body">{{ travel.description }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="flex min-h-[5.25rem]">
      <NuxtImg class="flex-1 object-cover" src="/img/desktop/line2.png" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Loader } from '@googlemaps/js-api-loader'
import googleMap from './google-map.json'
import UITitle from './UI/UITitle.vue'

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

const mapRefs = ref<HTMLElement | null>(null)

onMounted(() => {
  const location = { lat: 24.133459091186523, lng: 120.68169403076172 }

  const runtimeConfig = useRuntimeConfig()
  const loader = new Loader({
    apiKey: runtimeConfig.public.mapApiKey,
    version: 'weekly'
  })

  loader.load().then(async () => {
    const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = new Map(mapRefs.value as HTMLElement, {
      center: location,
      zoom: 17,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      styles: googleMap
    })
  })
})
</script>

<style lang="scss" scoped>
.section-container {
  @apply bg-system-background;
}
</style>
