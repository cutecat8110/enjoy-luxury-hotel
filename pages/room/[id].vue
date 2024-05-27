<template>
  <div class="bg-system-primary-10">
    <Hero :images="room.imageUrlList" />
    <div class="section-container col-md-container container">
      <div class="space-y-6 xl:col-span-7 xl:space-y-20">
        <div class="space-y-4">
          <h1 class="text-h3 xl:text-h1">{{ room.name }}</h1>
          <p class="text-body-2 xl:text-body">{{ room.description }}</p>
        </div>

        <section class="space-y-4 xl:space-y-6">
          <CTitle title="房型基本資訊" />
          <CRoomInfo
            :area-info="room.areaInfo"
            :bed-info="room.bedInfo"
            :max-people="room.maxPeople"
          />
        </section>

        <section class="space-y-4 xl:space-y-6">
          <CTitle title="房間格局" />
          <CRoomDetail :details="roomLayout" />
        </section>

        <section class="space-y-4 xl:space-y-6">
          <CTitle title="房內設備" />
          <CRoomDetail :details="room.facilityInfo" />
        </section>

        <section class="space-y-4 xl:space-y-6">
          <CTitle title="備品提供" />
          <CRoomDetail :details="room.amenityInfo" />
        </section>

        <section class="space-y-4 xl:space-y-6">
          <CTitle title="訂房須知" />
          <ol class="list-inside list-decimal text-body-2 text-system-gray-80 xl:text-body">
            <li v-for="(item, index) in guideline" :key="index">{{ item }}</li>
          </ol>
        </section>
      </div>

      <div class="col-span-5 hidden xl:block">
        <Booking v-model:peopleNum="peopleNum" v-model:rangeObj="rangeObj" :room="room" />
      </div>
      <MBooking v-model:peopleNum="peopleNum" v-model:rangeObj="rangeObj" :room="room" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Hero from './components/hero.vue'
import Booking from './components/booking.vue'
import MBooking from './components/m-booking.vue'

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
    },
    {
      title: '吹風機',
      isProvide: true
    },
    {
      title: '冰箱',
      isProvide: true
    },
    {
      title: '熱水壺',
      isProvide: true
    },
    {
      title: '檯燈',
      isProvide: true
    },
    {
      title: '衣櫃',
      isProvide: true
    },
    {
      title: '除濕機',
      isProvide: true
    },
    {
      title: '浴缸',
      isProvide: true
    },
    {
      title: '書桌',
      isProvide: true
    },
    {
      title: '音響',
      isProvide: true
    }
  ],
  amenityInfo: [
    {
      title: '衛生紙',
      isProvide: true
    },
    {
      title: '拖鞋',
      isProvide: true
    },
    {
      title: '沐浴用品',
      isProvide: true
    },
    {
      title: '清潔用品',
      isProvide: true
    },
    {
      title: '刮鬍刀',
      isProvide: true
    },
    {
      title: '吊衣架',
      isProvide: true
    },
    {
      title: '浴巾',
      isProvide: true
    },
    {
      title: '刷牙用品',
      isProvide: true
    },
    {
      title: '罐裝水',
      isProvide: true
    },
    {
      title: '梳子',
      isProvide: true
    }
  ],
  _id: '653e4661336cdccc752127a0',
  createdAt: '2023-10-29T11:47:45.641Z',
  updatedAt: '2023-10-29T11:47:45.641Z'
})

const roomLayout = ref([
  {
    title: '市景',
    isProvide: true
  },
  {
    title: '獨立衛浴',
    isProvide: true
  },
  {
    title: '客廳',
    isProvide: true
  },
  {
    title: '書房',
    isProvide: true
  },
  {
    title: '樓層電梯',
    isProvide: true
  }
])

const guideline = ref([
  '入住時間為下午3點，退房時間為上午12點。',
  '如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。',
  '請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。',
  '若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。',
  '請愛惜我們的房間與公共空間，並保持整潔。',
  '如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。',
  '我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。',
  '請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。',
  '我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。',
  '為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。'
])

const peopleNum = ref(1)
const { $dayjs } = useNuxtApp()
const rangeObj = ref({
  start: $dayjs().toDate(),
  end: $dayjs().add(1, 'day').toDate()
})
</script>
