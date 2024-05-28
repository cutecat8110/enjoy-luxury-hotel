<template>
  <Teleport to="body">
    <transition name="modal">
      <div
        v-if="modalShow"
        class="fixed inset-0 z-[60] overflow-y-auto bg-black/40 backdrop-blur-[1.25rem]"
        @click="close"
      >
        <div :class="[wrapperStyle, 'min-h-full']">
          <div
            ref="modalRefs"
            :class="[
              props.fullscreen ? 'min-h-screen' : modalStyle,
              props.black ? ' bg-system-background' : ' bg-white'
            ]"
          >
            <div
              v-if="$slots.header"
              class="flex items-center justify-between border-b border-system-gray-40 p-3"
            >
              <h2 class="text-h6 xl:text-h5">
                <slot name="header"> </slot>
              </h2>

              <!-- 彈窗關閉按鈕 -->
              <button
                class="flex h-6 w-6 items-center justify-center text-icon-24 transition-colors hover:text-system-primary-100"
                type="button"
                @click="toggleModal"
              >
                <Icon name="ic:baseline-close" />
              </button>
            </div>

            <slot />

            <div
              v-if="$slots.footer"
              :class="[footerStyle, 'flex items-center gap-4 border-t border-system-gray-40 p-3']"
            >
              <slot name="footer"> </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps({
  position: {
    type: String as () => 'center' | 'bottom',
    default: 'center'
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  black: {
    type: Boolean,
    default: false
  }
})

const wrapperStyle = computed(() => {
  return (
    !props.fullscreen &&
    {
      center: 'flex items-center justify-center p-3',
      bottom: 'flex flex-col justify-end'
    }[props.position]
  )
})

const modalStyle = computed(() => {
  return (
    !props.fullscreen &&
    {
      center: 'rounded-[1.25rem] sm:max-w-[26rem] container px-0',
      bottom: 'rounded-t-[1.25rem]'
    }[props.position]
  )
})

const footerStyle = computed(() => {
  return {
    center: 'justify-end',
    bottom: 'justify-between'
  }[props.position]
})

/* 控制彈窗顯示 */
const modalShow = defineModel<Boolean>({
  default: false
})
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
