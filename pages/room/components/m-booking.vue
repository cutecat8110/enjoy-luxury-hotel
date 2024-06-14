<template>
  <Teleport v-if="isDefaultLayoutLoaded" to="#default-layout">
    <!-- 固定在視窗底部 -->
    <div class="sticky bottom-0 z-20 border-t border-system-gray-40 bg-white py-3 xl:hidden">
      <!-- 內容容器 -->
      <div class="container flex items-center justify-between">
        <!-- 尚未選擇日期 -->
        <template v-if="!orderStore.isConfirmedDate">
          <!-- 每晚價格 -->
          <p class="truncate text-body-2 text-system-gray-80">
            {{ `${useFormatCurrency(props.room.price)} / 晚` }}
          </p>

          <!-- 按鈕: 開啟彈窗 -->
          <UIButton text="查看可訂日期" @click="toggleModal('show')" />
        </template>

        <!-- 已選擇日期 -->
        <template v-else>
          <div class="space-y-1">
            <!-- 價格．晚數．人數 -->
            <p class="truncate text-body-2 text-system-gray-80">
              {{
                `${useFormatCurrency(props.room.price * orderStore.totalNights)} / ${orderStore.totalNights} 晚 / ${orderStore.order.peopleNum} 人`
              }}
            </p>
            <p
              class="cursor-pointer truncate text-sub-title underline transition-opacity hover:opacity-85"
              @click="toggleModal('show')"
            >
              {{ orderStore.dateRange }}
            </p>
          </div>

          <!-- 連結: 預約房型 -->
          <NuxtLink
            :to="{
              name: 'reserve-id',
              params: { id: props.room._id }
            }"
            @click="saveRoomId"
          >
            <UIButton text="立即預訂" />
          </NuxtLink>
        </template>
      </div>

      <!-- 彈窗 -->
      <UIModal v-model="isModalShow" position="bottom">
        <div class="rounded-t-lg bg-white">
          <!-- 彈窗: 頁首 -->
          <div class="border-b border-system-gray-40 bg-system-gray-40">
            <div class="container flex items-center justify-between py-4">
              <!-- 提示訊息 -->
              <h2 v-if="!orderStore.isConfirmedDate" class="text-h5">選擇入住日期</h2>

              <!-- 住宿晚數．選擇日期範圍 -->
              <template v-else>
                <div class="flex items-center gap-4">
                  <p class="text-h5">
                    {{ `${orderStore.totalNights} 晚` }}
                  </p>
                  <p class="text-body text-system-gray-80">
                    {{ orderStore.dateRange }}
                  </p>
                </div>
              </template>

              <!-- 彈窗關閉按鈕 -->
              <button
                class="flex h-6 w-6 items-center justify-center text-icon-24 transition-colors hover:text-system-primary-100"
                type="button"
                @click="toggleModal('close')"
              >
                <Icon name="ic:baseline-close" />
              </button>
            </div>
          </div>

          <!-- 步驟: 0．日期選擇器 -->
          <template v-if="progress === 0">
            <div class="border-t border-system-gray-40 py-6">
              <div class="container">
                <VDatePicker
                  ref="datePicker"
                  v-model.range.string="checkInOutDate"
                  :masks="{
                    modelValue: 'YYYY/M/DD'
                  }"
                  :min-date="$dayjs().format('YYYY/M/DD')"
                  :rows="2"
                  borderless
                  color="black"
                  expanded
                  mode="date"
                  title-position="left"
                />
              </div>
            </div>

            <!-- 按鈕組: 清除日期．確定日期 -->
            <div class="border-t border-system-gray-40 py-3">
              <div class="container grid grid-cols-2 gap-4">
                <UIButton block text="清除日期" variant="ghost-light" @click="reset" />
                <UIButton
                  block
                  text="確定日期"
                  :disabled="!orderStore.isConfirmedDate"
                  @click="toggleProgress(1)"
                />
              </div>
            </div>
          </template>

          <!-- 步驟: 1．人數選擇 -->
          <template v-if="progress === 1">
            <div class="border-t border-system-gray-40 py-6">
              <div class="container space-y-4">
                <!-- 描述 -->
                <div class="space-y-1">
                  <p class="text-title">選擇人數</p>
                  <p class="text-body-2">此房型最多供 4 人居住，不接受寵物入住。</p>
                </div>

                <!-- 人數選擇 -->
                <UIGuestCount v-model="orderStore.order.peopleNum" :max="props.room.maxPeople" />
              </div>
            </div>

            <!-- 按鈕組: 返回日期選擇．儲存 -->
            <div class="border-t border-system-gray-40 py-3">
              <div class="container grid grid-cols-2 gap-4">
                <UIButton
                  block
                  text="重新選擇日期"
                  variant="ghost-light"
                  @click="toggleProgress(0)"
                />
                <UIButton
                  block
                  text="儲存"
                  :disabled="!orderStore.isConfirmedDate"
                  @click="toggleModal('close')"
                />
              </div>
            </div>
          </template>
        </div>
      </UIModal>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
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

/* 確認 #default-layout 已渲染 */
const isDefaultLayoutLoaded = ref(false)
onMounted(() => {
  watchEffect(() => {
    const layoutElement = document.getElementById('default-layout')
    if (layoutElement) {
      isDefaultLayoutLoaded.value = true
    }
  })
})

/* 控制彈窗顯示 */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  toggleProgress(0)
  if (event === 'show') {
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}
// 進度狀態
const progress = ref(0)
const toggleProgress = (val: number) => {
  progress.value = val
}

/* 日期選擇器 */
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

/* 儲存客戶預訂房間 */
const saveRoomId = () => {
  orderStore.order.roomId = props.room._id
}
</script>
