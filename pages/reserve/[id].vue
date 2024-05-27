<template>
  <div class="bg-system-primary-10">
    <VForm
      v-slot="{ errors }"
      class="section-container container space-y-10"
      :validation-schema="schema"
      @submit="submit"
    >
      <NuxtLink
        class="inline-flex items-center gap-2 text-h5 transition-colors hover:text-system-primary-120 xl:text-h3"
        :to="{
          name: 'room-id',
          params: { id: route.params.id },
          query: {
            start: route.query.start,
            end: route.query.end,
            peopleNum: route.query.peopleNum
          }
        }"
      >
        <Icon class="text-icon-24 xl:text-icon-40" name="ic:baseline-keyboard-arrow-left" />
        確認訂房資訊
      </NuxtLink>

      <div class="col-md-container container">
        <div class="space-y-10 xl:col-span-7">
          <section class="space-y-8 xl:space-y-10">
            <h3 class="text-h6 xl:text-h4">訂房資訊</h3>

            <ul class="space-y-6">
              <li class="flex items-center justify-between">
                <div class="space-y-2">
                  <CTitle title="選擇房型" size="md" />
                  <p class="text-body">
                    {{ room.name }}
                  </p>
                </div>
                <UIButton text="編輯" variant="text-black" />
              </li>

              <li class="flex items-center justify-between">
                <div class="space-y-2">
                  <CTitle title="訂房日期" size="md" />
                  <div class="space-y-3">
                    <p class="text-body">
                      {{ `入住：${$dayjs(orders.checkInDate).format('M 月 D 日dddd')}` }}
                    </p>
                    <p class="text-body">
                      {{ `退房：${$dayjs(orders.checkOutDate).format('M 月 D 日dddd')}` }}
                    </p>
                  </div>
                </div>
                <UIButton text="編輯" variant="text-black" />
              </li>

              <li class="flex items-center justify-between">
                <div class="space-y-2">
                  <CTitle title="房客人數" size="md" />
                  <p class="text-body">
                    {{ `${orders.peopleNum} 人` }}
                  </p>
                </div>
                <UIButton text="編輯" variant="text-black" />
              </li>
            </ul>
          </section>

          <UILine color="darkGray" />

          <section class="space-y-8 xl:space-y-10">
            <h3 class="text-h6 xl:text-h4">訂房人資訊</h3>

            <div class="space-y-6">
              <UIInput
                v-model="orders.userInfo.name"
                name="name"
                label="姓名"
                placeholder="請輸入姓名"
                :error="errors.name"
                blackhead
              />
              <UIInput
                v-model="orders.userInfo.phone"
                name="phone"
                label="手機號碼"
                placeholder="請輸入手機號碼"
                :error="errors.phone"
                blackhead
              />
              <UIInput
                v-model="orders.userInfo.email"
                name="email"
                label="電子信箱"
                placeholder="請輸入電子信箱"
                :error="errors.email"
                blackhead
              />
              <CAddress v-model="orders.userInfo.address" :error="errors.address" blackhead />
            </div>
          </section>

          <UILine color="darkGray" />

          <section class="space-y-8 xl:space-y-10">
            <h3 class="text-h4">房間資訊</h3>

            <ul class="space-y-6">
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="房型基本資訊" />
                <CRoomInfo
                  :area-info="room.areaInfo"
                  :bed-info="room.bedInfo"
                  :max-people="room.maxPeople"
                />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="房間格局" />
                <CRoomDetail :details="roomLayout" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="房內設備" />
                <CRoomDetail :details="room.facilityInfo" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="備品提供" />
                <CRoomDetail :details="room.amenityInfo" />
              </li>
            </ul>
          </section>
        </div>
        <div class="xl:col-span-5">
          <div class="card">
            <div class="flex h-[17rem] overflow-hidden rounded-lg">
              <NuxtImg class="flex-1 object-cover" :src="room.imageUrl" />
            </div>

            <div class="space-y-6">
              <div class="text-h4">價格詳情</div>

              <div class="flex justify-between text-body">
                <p>
                  {{ `${useFormatCurrency(room.price)} × ${totalDays} 晚` }}
                </p>
                <p>
                  {{ useFormatCurrency(room.price * totalDays) }}
                </p>
              </div>

              <UILine color="lightGrey" />

              <div class="flex justify-between text-title">
                <p>總價</p>
                <p>{{ useFormatCurrency(room.price * totalDays) }}</p>
              </div>
            </div>

            <NuxtLink
              class="block"
              :to="{
                name: 'confirmation-id',
                params: { id: '6533f0ef4cdf5b7f762747b0' }
              }"
            >
              <UIButton block text="確認訂房" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

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
const {
  params: { id },
  query: { start, end, peopleNum }
} = route
const { $dayjs } = useNuxtApp()

const orders = ref({
  roomId: id.toString(),
  checkInDate: useFormatData(start ? start.toString() : $dayjs()),
  checkOutDate: useFormatData(end ? end.toString() : $dayjs().add(1, 'day')),
  peopleNum,
  userInfo: {
    address: {
      zipcode: '',
      detail: ''
    },
    name: '',
    phone: '',
    email: ''
  }
})

const totalDays = computed(() =>
  $dayjs(orders.value.checkOutDate).diff($dayjs(orders.value.checkInDate), 'day')
)

const schema = { name: 'required', phone: 'required', email: 'required|email' }

const submit = () => {
  console.log('submit')
}
</script>
