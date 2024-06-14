<template>
  <div class="card">
    <!-- 標題 -->
    <h2 class="border-b border-system-gray-40 pb-4 text-h5">預訂房型</h2>

    <!-- 房名與描述 -->
    <div class="space-y-4">
      <h3 class="text-h2">尊爵雙人房</h3>
      <p class="text-body">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>
    </div>

    <div class="space-y-4">
      <!-- 日期區間選擇 -->
      <Datepicker />

      <!-- 人數選擇 -->
      <div class="flex items-center justify-between">
        人數
        <UIGuestCount v-model="orderStore.order.peopleNum" :max="props.room.maxPeople" />
      </div>
    </div>

    <!-- 售價 -->
    <p class="text-h5 text-system-primary-100">
      {{ useFormatCurrency(props.room.price) }}
    </p>

    <!-- 連結: 預約房型 -->
    <NuxtLink
      class="block"
      :to="{
        name: 'reserve-id',
        params: { id: props.room._id }
      }"
      @click="saveRoomId"
    >
      <UIButton
        :text="orderStore.isConfirmedDate ? '立即預訂' : '確定日期'"
        block
        :disabled="!orderStore.isConfirmedDate"
      />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import Datepicker from './datepicker.vue'
import type { RoomResponse } from '@/types'

/* 全局屬性 */
const orderStore = useOrderStore()

/* props */
const props = defineProps({
  room: {
    type: Object as PropType<RoomResponse>,
    required: true
  }
})

/* 儲存客戶預訂房間 */
const saveRoomId = () => {
  orderStore.order.roomId = props.room._id
}
</script>
