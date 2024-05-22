<template>
  <div class="space-y-10 rounded-lg bg-white p-10">
    <h2 class="border-b border-system-gray-40 pb-4 text-h5">預訂房型</h2>

    <div class="space-y-4">
      <h3 class="text-h2">尊爵雙人房</h3>
      <p class="text-body">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
    </div>

    <div class="space-y-4">
      <UIDatepicker v-model="rangeObj" />
      <div class="flex items-center justify-between">
        人數
        <UIGuestCount v-model="peopleNum" :max="props.room.maxPeople" />
      </div>
    </div>

    <p class="text-h5 text-system-primary-100">
      {{ formatCurrency(props.room.price) }}
    </p>

    <NuxtLink
      class="block"
      :to="{
        name: 'reserve-id',
        params: { id: props.room._id },
        query: {
          start: $dayjs(rangeObj.start).format('YYYY-MM-DD'),
          end: $dayjs(rangeObj.end).format('YYYY-MM-DD'),
          peopleNum: peopleNum
        }
      }"
    >
      <UIButton block text="立即預訂" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  room: {
    type: Object,
    default: () => ({
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
  }
})

/* 人數 */
const peopleNum = defineModel<number>('peopleNum', { default: 1 })

/* 日期 */
const rangeObj = defineModel<{ start: Date; end: Date }>('rangeObj', {
  default: {
    start: new Date(),
    end: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
  }
})
</script>
