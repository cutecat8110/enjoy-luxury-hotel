<template>
  <div>
    <!-- 按鈕: 編輯人數 -->
    <UIButton text="編輯" variant="text-black" @click="toggleModal('show')" />

    <!-- 彈窗: 編輯房型 -->
    <UIModal v-model="isModalShow">
      <!-- 彈窗: 頁首 -->
      <template #header> 選擇房型 </template>

      <template #form>
        <VForm ref="formRefs">
          <div class="flex items-center justify-between p-4">
            人數
            <ClientOnly>
              <UIGuestCount v-model="orderStore.order.peopleNum" :max="props.room.maxPeople" />
            </ClientOnly>
          </div>
        </VForm>
      </template>
    </UIModal>
  </div>
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

/* 彈窗開關 */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  if (event === 'show') {
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}
</script>
