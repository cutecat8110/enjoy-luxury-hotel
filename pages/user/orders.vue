<template>
  <div class="grid gap-6 xl:grid-cols-12 xl:gap-10">
    <section class="xl:col-span-7">
      <CRecentOrder :order="recentOrder">
        <div class="flex gap-4">
          <UIButton v-if="canCheckout" class="flex-1" lock text="取消預訂" variant="secondary" />
          <UIButton class="flex-1" block text="查看詳情" />
        </div>
      </CRecentOrder>
    </section>

    <section class="xl:col-span-5">
      <div class="space-y-6 rounded-[1.25rem] bg-white p-10 xl:space-y-10">
        <p class="text-title xl:text-h5">歷史訂單</p>

        <template v-for="(order, index) in historyOrder" :key="index">
          <div class="flex flex-col gap-6 xl:flex-row xl:gap-10">
            <NuxtImg
              class="h-[5rem] w-[7.5rem] rounded-lg object-cover"
              :src="order.roomId.imageUrl"
            />

            <div class="space-y-4 text-system-gray-80">
              <p class="text-body-2 xl:text-body">
                {{ `預訂參考編號： ${order.roomId._id}` }}
              </p>

              <p class="text-sub-title xl:text-h6">{{ order.roomId.name }}</p>

              <div class="space-y-2">
                <p class="text-body-2 xl:text-body">
                  {{
                    `住宿天數： ${$dayjs(order.checkOutDate).diff($dayjs(order.checkInDate), 'day')} 晚`
                  }}
                </p>
                <p class="text-body-2 xl:text-body">
                  {{ `住宿人數： ${order.peopleNum} 位` }}
                </p>
              </div>

              <div class="space-y-2">
                <CTitle
                  :title="`入住：${$dayjs(order.checkInDate).format('M 月 D 日dddd')}`"
                  base
                />
                <CTitle
                  :title="`退房：${$dayjs(order.checkOutDate).format('M 月 D 日dddd')}`"
                  base
                  gray
                />
              </div>

              <p class="text-sub-title xl:text-title">
                {{ useFormatCurrency(order.roomId.price) }}
              </p>
            </div>
          </div>

          <UILine v-if="index + 1 !== historyOrder.length" color="lightGrey" />
        </template>

        <UIButton
          v-if="!more"
          block
          icon="ic:baseline-keyboard-arrow-down"
          text="查看更多"
          variant="secondary"
          @click="more = true"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'user'
})

const orderList = ref(
  Array(10).fill({
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
)

const recentOrder = computed(() => orderList.value[0])

const { $dayjs } = useNuxtApp()
const canCheckout = computed(() => $dayjs().isBefore($dayjs(recentOrder.value.checkInDate)))

const more = ref(false)

const historyOrder = computed(() => (more.value ? orderList.value : orderList.value.slice(0, 3)))
</script>
