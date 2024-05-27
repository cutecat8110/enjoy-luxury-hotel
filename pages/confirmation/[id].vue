<template>
  <div>
    <div class="section-container col-md-container container">
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
          <NuxtLink class="block xl:inline-block" to="/user/orders">
            <UIButton block text="前往我的訂單" />
          </NuxtLink>
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
      <CRecentOrder class="xl:col-span-5" :order="result"></CRecentOrder>
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
</script>
