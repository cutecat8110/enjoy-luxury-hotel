<template>
  <div class="grid grid-cols-2 gap-2">
    <!-- 按鈕組: 開啟日期選擇彈窗 -->
    <UIDataButton title="入住" :date="orderStore.order.checkInDate" @click="toggleModal('show')" />
    <UIDataButton title="退房" :date="orderStore.order.checkOutDate" @click="toggleModal('show')" />

    <!-- 彈窗: 日期選擇 -->
    <UIModal v-model="isModalShow" label="選擇訂房日期" size="auto">
      <div class="space-y-6 p-3 sm:p-8">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 space-y-2">
            <!-- 提示訊息 -->
            <p v-if="!orderStore.isConfirmedDate" class="text-h5">選擇入住日期</p>

            <!-- 住宿晚數/選擇日期範圍 -->
            <template v-else>
              <p class="text-h5">
                {{ `${orderStore.totalNights} 晚` }}
              </p>
              <p class="text-body">
                {{ orderStore.dateRange }}
              </p>
            </template>
          </div>

          <button
            class="ui-dialog-close"
            type="button"
            aria-label="關閉日期視窗"
            @click="toggleModal('close')"
          >
            <Icon name="ic:baseline-close" />
          </button>
        </div>
        <div>
          <!-- 按鈕組: 前往該選擇日期 -->
          <div class="grid w-full grid-cols-2 gap-2 md:flex-1">
            <UIDataButton
              title="入住"
              :date="orderStore.order.checkInDate"
              :disabled="!orderStore.isConfirmedDate"
              @click="datePickerMove(orderStore.order.checkInDate)"
            />

            <UIDataButton
              title="退房"
              :date="orderStore.order.checkOutDate"
              :disabled="!orderStore.isConfirmedDate"
              @click="datePickerMove(orderStore.order.checkOutDate)"
            />
          </div>
        </div>

        <!-- 日期區間選擇器 -->
        <UIBookingCalendar
          ref="datePicker"
          v-model="checkInOutDate"
          class="ui-datepicker"
          :columns="isWide ? 2 : 1"
        />

        <!-- 按鈕: 清除選擇/關閉彈窗 -->
        <div class="flex justify-end">
          <UIButton text="清除日期" variant="ghost-light" @click="reset" />
          <UIButton
            text="確定日期"
            :disabled="!orderStore.isConfirmedDate"
            @click="toggleModal('close')"
          />
        </div>
      </div>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
import type BookingCalendar from '@/components/UI/UIBookingCalendar.vue'

/* 全局屬性 */
const orderStore = useOrderStore()
const isWide = useMediaQuery('(min-width: 768px)')

/* 彈窗 */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  if (event === 'show') {
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}

/* 日期區間選擇器 */
const datePicker = ref<InstanceType<typeof BookingCalendar> | null>(null)

// 日期區間
const checkInOutDate = computed({
  get() {
    return { start: orderStore.order.checkInDate, end: orderStore.order.checkOutDate }
  },
  set(value) {
    if (value) {
      orderStore.order.checkInDate = value.start
      orderStore.order.checkOutDate = value.end
    }
  }
})

// 重置日期
const reset = () => {
  orderStore.order.checkInDate = ''
  orderStore.order.checkOutDate = ''
}

// 移動至指定日期
const datePickerMove = (val: string) => {
  val && datePicker.value?.move(val)
}
</script>
