<template>
  <section>
    <VForm
      ref="formRefs"
      v-slot="{ errors }"
      class="card"
      :validation-schema="schema"
      @submit="refresh"
    >
      <h2 class="text-h6 xl:text-h5">修改密碼</h2>

      <div class="space-y-6">
        <!-- 電子信箱 -->
        <CUserData title="電子信箱" :text="props.user.email" />

        <!-- 密碼 -->
        <div v-if="!isFormShow" class="flex items-center justify-between">
          <div class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">密碼</label>
            <div class="space-x-2 py-2">
              <span
                v-for="(_, index) in 10"
                :key="index"
                class="inline-block h-2 w-2 rounded-full bg-black"
              />
            </div>
          </div>

          <!-- 按鈕: 開啟修改密碼 -->
          <UIButton text="重設" variant="text" @click="toggleForm('show')" />
        </div>

        <!-- 表單: 修改密碼 -->
        <template v-else>
          <!-- 舊密碼 -->
          <UIInput
            v-model="formData.oldPassword"
            name="oldPassword"
            label="舊密碼"
            type="password"
            placeholder="請輸入舊密碼"
            :error="errors.oldPassword"
            blackhead
            :disabled="pending"
          />

          <!-- 新密碼 -->
          <UIInput
            v-model="formData.newPassword"
            name="newPassword"
            label="新密碼"
            type="password"
            placeholder="請輸入新密碼"
            :error="errors.newPassword"
            blackhead
            :disabled="pending"
          />

          <!-- 確認密碼 -->
          <UIInput
            v-model="formData.confirmPassword"
            name="confirmPassword"
            label="確認密碼"
            type="password"
            placeholder="請再輸入一次新密碼"
            :error="errors.confirmPassword"
            blackhead
            :disabled="pending"
          />

          <!-- 按鈕組: 取消編輯/儲存設定 -->
          <div class="flex gap-2">
            <UIButton
              class="flex w-full xl:inline-flex xl:w-auto"
              type="button"
              text="取消編輯"
              variant="secondary"
              :disabled="pending"
              @click="cancelEdit"
            />
            <UIButton
              class="flex w-full xl:inline-flex xl:w-auto"
              type="submit"
              text="儲存設定"
              :disabled="pending"
              :loading="pending"
            />
          </div>
        </template>
      </div>
    </VForm>
  </section>
</template>

<script lang="ts" setup>
import type { UserResponse } from '@/types'

/* props */
const props = defineProps({
  user: {
    type: Object as PropType<UserResponse>,
    required: true
  }
})

/* 全局屬性 */
const { $Swal, $validator } = useNuxtApp()
const styleStore = useStyleStore()

/* 表單 */
const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})
const formRefs = ref<HTMLFormElement | null>(null)

// 表單: 規則
const schema = {
  oldPassword: (val: string) => {
    if (!val) return '舊密碼 為必填'
    if (!$validator.isLength(val, { min: 8 })) return '舊密碼需至少 8 碼以上'
    if ($validator.isAlpha(val)) return '舊密碼不能只有英文'
    if ($validator.isNumeric(val)) return '舊密碼不能只有數字'
    if (!$validator.isAlphanumeric(val)) return '舊密碼需至少 8 碼以上，並英數混合'
    return {}
  },
  newPassword: (val: string) => {
    if (!val) return '新密碼 為必填'
    if (!$validator.isLength(val, { min: 8 })) return '新密碼需至少 8 碼以上'
    if ($validator.isAlpha(val)) return '新密碼不能只有英文'
    if ($validator.isNumeric(val)) return '新密碼不能只有數字'
    if (!$validator.isAlphanumeric(val)) return '新密碼需至少 8 碼以上，並英數混合'
    return {}
  },
  confirmPassword: 'required|confirmed:@newPassword'
}

// 表單: 開關
const isFormShow = ref(false)
const toggleForm = (event: string) => {
  if (event === 'show') {
    isFormShow.value = true
  } else if (event === 'close') {
    isFormShow.value = false
  }
}

const cancelEdit = () => {
  formData.oldPassword = ''
  formData.newPassword = ''
  formData.confirmPassword = ''

  toggleForm('close')
}

/* api */
const { updateUserApi } = useApi()

// api: 更新密碼
const { pending, refresh } = await updateUserApi({
  body: computed(() => ({
    userId: props.user._id,
    oldPassword: formData.oldPassword,
    newPassword: formData.newPassword
  })),
  watch: false,
  immediate: false,
  onResponse({ response }) {
    if (response.status === 200) {
      $Swal?.fire({
        title: '密碼修改成功',
        icon: 'success',
        confirmButtonText: '確認',
        confirmButtonColor: styleStore.confirmButtonColor,
        willClose: () => {
          cancelEdit()
        }
      })
    }
  },
  onResponseError({ response }) {
    if (response._data?.message === '密碼錯誤') {
      formRefs.value?.setFieldError('oldPassword', '舊密碼 錯誤')
    }
  }
})
pending.value = false
</script>
