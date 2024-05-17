<template>
  <div class="bg-system-primary-10">
    <Hero :images="room.imageUrlList" />
    <section class="container pb-[4.5rem] pt-[7.5rem]">
      <div class="grid h-[500px] grid-cols-12 gap-[4.5rem]">
        <div class="col-span-7 border"></div>
        <div class="col-span-5 border"></div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Hero from './components/hero.vue'

const room = ref({
  name: '尊爵雙人房',
  description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
  imageUrl: '/img/desktop/room2-1.png',
  imageUrlList: [
    '/img/desktop/room2-1.png',
    '/img/desktop/room2-2.png',
    '/img/desktop/room2-3.png',
    '/img/desktop/room2-4.png',
    '/img/desktop/room2-5.png'
  ],
  areaInfo: '24坪',
  bedInfo: '一張大床',
  maxPeople: 4,
  price: 10000,
  status: 1,
  facilityInfo: [
    {
      title: '平面電視',
      isProvide: true
    }
  ],
  amenityInfo: [
    {
      title: '衛生紙',
      isProvide: true
    }
  ],
  _id: '653e4661336cdccc752127a0',
  createdAt: '2023-10-29T11:47:45.641Z',
  updatedAt: '2023-10-29T11:47:45.641Z'
})
</script>
