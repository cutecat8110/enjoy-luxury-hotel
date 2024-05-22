<template>
  <div class="grid grid-cols-2 gap-2">
    <UIDataButton title="入住" :date="formatData(rangeObj?.start)" @click="toggleModal" />
    <UIDataButton title="退房" :date="formatData(rangeObj?.end)" @click="toggleModal" />
  </div>
  <!-- Mobile: 選單彈窗 -->
  <Teleport to="body">
    <transition name="modal">
      <div
        v-if="modalShow"
        class="ui-datepicker fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-[1.25rem]"
        @click="close"
      >
        <div ref="modalRefs" class="space-y-10 rounded-[1.25rem] bg-white p-[2rem]">
          <div class="flex items-center gap-20">
            <div class="space-y-2">
              <p class="text-h5">{{ totalDays }}</p>
              <p class="text-body">
                {{ rangeStr }}
              </p>
            </div>

            <div class="grid flex-1 grid-cols-2 gap-2">
              <UIDataButton
                title="入住"
                :date="formatData(rangeObj?.start)"
                @click="datePickerMove(rangeObj?.start)"
              />
              <UIDataButton
                title="退房"
                :date="formatData(rangeObj?.end)"
                @click="datePickerMove(rangeObj?.end)"
              />
            </div>
          </div>

          <VDatePicker
            ref="datePicker"
            v-model.range="rangeObj"
            :columns="2"
            :min-date="$dayjs().toDate()"
            borderless
            color="black"
            mode="date"
          />

          <div class="flex justify-end">
            <UIButton text="清除日期" variant="ghost-light" @click="reset" />

            <UIButton text="確定日期" @click="toggleModal" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import type { DatePicker } from 'v-calendar'
const { $dayjs } = useNuxtApp()

const rangeObj = defineModel<{ start: Date; end: Date }>({
  default: {
    start: new Date(),
    end: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000)
  }
})

const totalDays = computed(() =>
  rangeObj.value ? `${$dayjs(rangeObj.value.end).diff(rangeObj.value.start, 'day')} 晚` : ''
)
const rangeStr = computed(() =>
  rangeObj.value ? `${formatData(rangeObj.value.start)} - ${formatData(rangeObj.value.end)}` : ''
)
// 日期格式化
const formatData = (val: Date | undefined) => {
  return val ? $dayjs(val).format('YYYY/MM/DD') : ''
}
// 日期重置
const reset = () => {
  rangeObj.value = {
    start: $dayjs().toDate(),
    end: $dayjs().add(1, 'day').toDate()
  }
}
// 移動至指定日期
const datePicker = ref<typeof DatePicker | null>(null)
const datePickerMove = (val: Date | undefined) => {
  val && datePicker.value?.move(val)
}

/* 控制彈窗顯示 */
const modalShow = ref(false)
const toggleModal = () => {
  modalShow.value = !modalShow.value
  if (windowLock) {
    windowLock.value = !windowLock.value
  }
}
// 點擊遮罩關閉談窗
const modalRefs = ref(null)
const { isOutside } = useMouseInElement(modalRefs)
const close = () => {
  if (isOutside.value) {
    toggleModal()
  }
}
// 設定滾輪控制器
let windowLock: { value: boolean } | undefined
onMounted(() => {
  windowLock = useScrollLock(document.body)
})
</script>

<style lang="scss" scoped>
.ui-datepicker {
  :deep(.vc-focus:focus-within) {
    box-shadow: 0 0 0 2px rgb(75, 75, 75, 0.4);
  }
  :deep(.vc-pane-layout) {
    gap: 3.75rem;
  }
}
</style>
