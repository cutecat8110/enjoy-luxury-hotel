<template>
  <div>
    <div
      class="container space-y-[3.75rem] py-10 xl:grid xl:grid-cols-12 xl:gap-[4.5rem] xl:space-y-0 xl:pb-[4.5rem] xl:pt-[7.5rem]"
    >
      <div class="space-y-10 text-white xl:col-span-7 xl:space-y-20">
        <div class="space-y-8 xl:space-y-10">
          <div class="flex flex-wrap items-center gap-4 xl:gap-10">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-full bg-system-success-100"
            >
              <Icon class="text-icon-40" name="ic:baseline-check" />
            </div>
            <h1 class="flex flex-col gap-2 text-h3 xl:text-h1">
              <span>{{ `恭喜，${result.userInfo.name}!` }}</span>
              <span>您已預訂成功</span>
            </h1>
          </div>

          <p class="text-body text-system-gray-40">
            我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
          </p>
        </div>

        <UILine color="lightGrey" />

        <div class="space-y-6 xl:space-y-10">
          <p class="text-title xl:text-h5">立即查看您的訂單紀錄</p>
          <UIButton class="flex w-full xl:inline-flex xl:!w-auto" text="前往我的訂單" />
        </div>

        <UILine color="lightGrey" />

        <div class="space-y-8 xl:space-y-10">
          <h2 class="text-h5">訂房人資訊</h2>

          <ul class="space-y-6">
            <li class="space-y-2">
              <p class="text-body text-system-gray-40">姓名</p>
              <p class="text-title">{{ result.userInfo.name }}</p>
            </li>
            <li class="space-y-2">
              <p class="text-body text-system-gray-40">手機號碼</p>
              <p class="text-title">{{ result.userInfo.phone }}</p>
            </li>
            <li class="space-y-2">
              <p class="text-body text-system-gray-40">電子信箱</p>
              <p class="text-title">{{ result.userInfo.email }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-5">
        <div class="space-y-6 rounded-[1.25rem] bg-white p-4 xl:space-y-10 xl:p-10">
          <div class="space-y-2">
            <p class="text-body-2 text-system-gray-80 xl:text-body">
              {{ `預訂參考編號： ${result._id}` }}
            </p>
            <p class="text-title text-black xl:text-h5">即將來的行程</p>
          </div>

          <div class="flex h-[9.375rem] overflow-hidden rounded-lg xl:h-[17rem]">
            <NuxtImg class="flex-1 object-cover" :src="result.roomId.imageUrl" />
          </div>

          <div class="space-y-6 text-system-gray-80">
            <div
              class="flex flex-wrap items-center gap-x-4 gap-y-2 text-nowrap text-sub-title xl:text-h6"
            >
              {{ `${result.roomId.name}，${totalDays} 晚` }}
              <UILine class="h-4" col color="darkGray" />
              {{ `住宿人數：${result.peopleNum} 位` }}
            </div>

            <div class="space-y-2">
              <CTitle
                :title="`入住：${$dayjs(result.checkInDate).format('M 月 D 日dddd')}，15:00 可入住`"
                base
              />
              <CTitle
                :title="`退房：${$dayjs(result.checkOutDate).format('M 月 D 日dddd')}，12:00 前退房`"
                base
                gray
              />
            </div>

            <p class="text-sub-title xl:text-title">
              {{ useFormatCurrency(result.roomId.price * totalDays) }}
            </p>
          </div>

          <UILine color="lightGrey" />

          <div class="space-y-6">
            <CTitle title="房內設備" base />
            <CRoomDetail :details="result.roomId.facilityInfo" auto border />
          </div>

          <div class="space-y-6">
            <CTitle title="備品提供" base />
            <CRoomDetail :details="result.roomId.amenityInfo" auto border />
          </div>
        </div>
      </div>
    </div>
    <CWave />
  </div>
</template>

<script lang="ts" setup>
const result = ref({
  userInfo: {
    address: {
      zipcode: 802,
      detail: '文山路23號'
    },
    name: 'Joanne Chen',
    phone: '0912345678',
    email: 'example@gmail.com'
  },
  _id: '653e335a13831c2ac8c389bb',
  roomId: {
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
  },
  checkInDate: '2023-06-17T16:00:00.000Z',
  checkOutDate: '2023-06-18T16:00:00.000Z',
  peopleNum: 2,
  orderUserId: '6533f0ef4cdf5b7f762747b0',
  status: 0,
  createdAt: '2023-10-29T10:26:34.498Z',
  updatedAt: '2023-10-29T10:26:34.498Z'
})
const { $dayjs } = useNuxtApp()

const totalDays = computed(() =>
  $dayjs(result.value.checkOutDate).diff($dayjs(result.value.checkInDate), 'day')
)
</script>
