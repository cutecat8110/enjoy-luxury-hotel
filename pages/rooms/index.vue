<template>
  <div>
    <CBanner rooms />
    <div class="bg-system-primary-10 py-10 xl:pb-[10.5rem] xl:pt-[7.5rem]">
      <div class="container space-y-10 xl:space-y-20">
        <div class="space-x-2 xl:space-y-4">
          <p class="text-sub-title text-system-gray-80 xl:text-h6">房型選擇</p>
          <p class="text-h3 text-system-primary-100 xl:text-h1">各種房型，任您挑選</p>
        </div>
        <ol class="space-y-6 xl:space-y-12">
          <li v-for="(room, index) in rooms" :key="index">
            <Card :room="room" />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from './components/card.vue'

const rooms = ref([
  {
    name: '尊爵雙人房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    price: 10000,
    imageUrlList: [
      '/img/desktop/room2-1.png',
      '/img/desktop/room2-2.png',
      '/img/desktop/room2-3.png',
      '/img/desktop/room2-4.png',
      '/img/desktop/room2-5.png'
    ],
    areaInfo: '24坪',
    bedInfo: '一張大床',
    maxPeople: 4
  },
  {
    name: '景觀雙人房',
    description: '景觀雙人房擁有絕美的高雄市景觀，讓您在舒適的環境中欣賞城市之美。',
    price: 10000,
    imageUrlList: [
      '/img/desktop/room3-1.png',
      '/img/desktop/room3-2.png',
      '/img/desktop/room3-3.png',
      '/img/desktop/room3-4.png',
      '/img/desktop/room3-5.png'
    ],
    areaInfo: '24坪',
    bedInfo: '一張大床',
    maxPeople: 4
  },
  {
    name: '豪華雅緻房',
    description: '享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。',
    price: 10000,
    imageUrlList: [
      '/img/desktop/room4-1.png',
      '/img/desktop/room4-2.png',
      '/img/desktop/room4-3.png',
      '/img/desktop/room4-4.png',
      '/img/desktop/room4-5.png'
    ],
    areaInfo: '24坪',
    bedInfo: '一張大床',
    maxPeople: 4
  },
  {
    name: '景觀尊榮家庭房',
    description: '景觀尊榮家庭房不僅有寬敞的空間，還有絕美的市景視野，是帶給家庭最尊榮的待遇。',
    price: 10000,
    imageUrlList: [
      '/img/desktop/room5-1.png',
      '/img/desktop/room5-2.png',
      '/img/desktop/room5-3.png',
      '/img/desktop/room5-4.png',
      '/img/desktop/room5-5.png'
    ],
    areaInfo: '24坪',
    bedInfo: '一張大床',
    maxPeople: 4
  }
])
</script>
