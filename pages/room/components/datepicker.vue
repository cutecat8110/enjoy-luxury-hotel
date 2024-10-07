<template>
  <div class="grid grid-cols-2 gap-2">
    <!-- 按鈕組: 開啟日期選擇彈窗 -->
    <UIDataButton title="入住" :date="orderStore.order.checkInDate" @click="toggleModal('show')" />
    <UIDataButton title="退房" :date="orderStore.order.checkOutDate" @click="toggleModal('show')" />

    <!-- 彈窗: 日期選擇 -->
    <UIModal v-model="isModalShow" size="auto">
      <div class="space-y-10 p-[2rem]">
        <div class="flex items-center gap-20">
          <div class="space-y-2">
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

          <!-- 按鈕組: 前往該選擇日期 -->
          <div class="grid flex-1 grid-cols-2 gap-2">
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
        <VDatePicker
          ref="datePicker"
          v-model.range.string="checkInOutDate"
          class="ui-datepicker"
          :columns="2"
          :masks="{
            modelValue: 'YYYY/M/DD'
          }"
          :min-date="$dayjs().format('YYYY/M/DD')"
          borderless
          color="black"
          mode="date"
        />

        <!-- 按鈕: 清除選擇/關閉彈窗 -->
        <div class="flex justify-end">
          <UIButton text="清除日期" variant="ghost-light" @click="reset" />
          <UIButton text="確定日期" @click="toggleModal('close')" />
        </div>
      </div>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
import type { DatePicker } from 'v-calendar'

/* 全局屬性 */
const orderStore = useOrderStore()

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
const datePicker = ref<typeof DatePicker | null>(null)

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
