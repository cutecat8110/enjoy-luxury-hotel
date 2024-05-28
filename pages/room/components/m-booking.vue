<template>
  <Teleport v-if="rendered" to="#default-layout">
    <div class="sticky bottom-0 z-20 border-t border-system-gray-40 bg-white py-3 xl:hidden">
      <div class="container flex items-center justify-between">
        <template v-if="progress === 0">
          <p class="truncate text-body-2 text-system-gray-80">
            {{ `${useFormatCurrency(props.room.price)} / 晚` }}
          </p>
          <UIButton text="查看可訂日期" @click="toggleModal" />
        </template>
        <template v-else>
          <div
            class="cursor-pointer space-y-1 transition-opacity hover:opacity-85"
            @click="toggleProgress(0), toggleModal()"
          >
            <p class="truncate text-body-2 text-system-gray-80">
              {{ `${useFormatCurrency(props.room.price)} / ${totalDays} / ${peopleNum} 人` }}
            </p>
            <p class="truncate text-sub-title underline">{{ rangeStr }}</p>
          </div>

          <NuxtLink
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
            <UIButton text="立即預訂" />
          </NuxtLink>
        </template>
      </div>
    </div>
  </Teleport>

  <!-- Mobile: 選單彈窗 -->
  <Teleport to="body">
    <transition name="modal">
      <div
        v-if="modalShow"
        class="ui-datepicker fixed inset-0 z-[60] flex flex-col justify-end bg-black/40 backdrop-blur-[1.25rem]"
      >
        <div class="rounded-t-lg bg-white">
          <!-- header -->
          <div class="container space-y-4 py-4">
            <!-- 彈窗關閉按鈕 -->
            <button
              class="flex h-6 w-6 items-center justify-center text-icon-24 transition-colors hover:text-system-primary-100"
              type="button"
              @click="toggleModal"
            >
              <Icon name="ic:baseline-close" />
            </button>

            <!-- 日助時間/提示 -->
            <div class="flex items-center gap-4">
              {{ totalDays }}
              <span class="text-system-gray-80">
                {{ rangeStr }}
              </span>
            </div>
          </div>

          <!-- 日期選擇器 -->
          <template v-if="progress === 0">
            <div class="border-t border-system-gray-40 py-6">
              <div class="container">
                <VDatePicker
                  ref="datePicker"
                  v-model.range="rangeObj"
                  :min-date="$dayjs().toDate()"
                  :rows="2"
                  borderless
                  color="black"
                  expanded
                  mode="date"
                  title-position="left"
                />
              </div>
            </div>

            <!-- 按鈕組 -->
            <div class="border-t border-system-gray-40 py-3">
              <div class="container grid grid-cols-2 gap-4">
                <UIButton block text="清除日期" variant="ghost-light" @click="resetDate" />
                <UIButton block text="確定日期" @click="toggleProgress(1)" />
              </div>
            </div>
          </template>

          <!-- 人數選擇 -->
          <template v-if="progress === 1">
            <div class="border-t border-system-gray-40 py-6">
              <div class="container space-y-4">
                <div class="scroll-py-1">
                  <p class="text-title">選擇人數</p>
                  <p class="text-body-2">此房型最多供 4 人居住，不接受寵物入住。</p>
                </div>

                <UIGuestCount v-model="peopleNum" :max="props.room.maxPeople" />
              </div>
            </div>

            <!-- 按鈕組 -->
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
                  :disabled="!(rangeStr && totalDays)"
                  @click="toggleProgress(3), toggleModal()"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </transition>
  </Teleport>
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

/* 進度狀態 */
const progress = ref(0)
const toggleProgress = (val: number) => {
  progress.value = val
}

/* 確認 Teleport 目標已建立 */
const rendered = ref(false)
onMounted(() => {
  watchEffect(() => {
    const targetElement = document.getElementById('default-layout')
    if (targetElement) {
      rendered.value = true
    }
  })
})

/* 日期選擇器 */
const { $dayjs } = useNuxtApp()
const rangeObj = defineModel<{ start: Date; end: Date }>('rangeObj', {
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
const formatData = (val: Date) => {
  return $dayjs(val).format('YYYY/MM/DD')
}
// 日期重置
const resetDate = () => {
  rangeObj.value = {
    start: $dayjs().toDate(),
    end: $dayjs().add(1, 'day').toDate()
  }
}

/* 控制彈窗顯示 */
const modalShow = ref(false)
const toggleModal = () => {
  modalShow.value = !modalShow.value
  if (windowLock) {
    windowLock.value = !windowLock.value
  }
}
// 設定滾輪控制器
let windowLock: { value: boolean } | undefined
onMounted(() => {
  windowLock = useScrollLock(document.body)
})

/* 人數 */
const peopleNum = defineModel<number>('peopleNum', { default: 1 })
</script>
