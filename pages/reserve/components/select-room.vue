<template>
  <div>
    <!-- 按鈕: 編輯房型 -->
    <UIButton text="編輯" variant="text-black" @click="toggleModal('show')" />

    <!-- 彈窗: 編輯房型 -->
    <UIModal v-if="rooms" v-model="isModalShow">
      <!-- 彈窗: 頁首 -->
      <template #header> 選擇房型 </template>

      <template #form>
        <VForm ref="formRefs" @submit="submit">
          <div class="p-4">
            <UISelect v-model="room" label="name" value="_id" :options="rooms" :disabled="false" />
          </div>

          <div
            class="flex flex-wrap items-center justify-end gap-4 border-t border-system-gray-40 p-3"
          >
            <UIButton text="取消" variant="secondary" @click="toggleModal('close')" />
            <UIButton type="submit" text="確認" />
          </div>
        </VForm>
      </template>
    </UIModal>
  </div>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'

const props = defineProps({ roomId: { type: String, required: true } })

/* 彈窗開關 */
const isModalShow = ref(false)
const toggleModal = (event: string) => {
  if (event === 'show') {
    isModalShow.value = true
  } else if (event === 'close') {
    isModalShow.value = false
  }
}

const room = ref(props.roomId)

const submit = () => {
  if (room.value !== props.roomId) {
    navigateTo(`/reserve/${room.value}`)
  }
}

/* api */
const { getRoomsApi } = useApi()

// api: 取得所有房型
const { data: rooms }: { data: Ref<RoomResponse[] | null> } = await getRoomsApi({
  transform(res: any): RoomResponse[] {
    return res.result
  }
})
</script>
