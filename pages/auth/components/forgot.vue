<template>
  <!-- 按鈕: 忘記密碼 -->
  <UIButton text="忘記密碼?" variant="text" @click="openForgot()" />

  <!-- 彈窗: 忘記密碼 -->
  <UIModal v-model="forgotIsOpen" focus>
    <!-- 彈窗: 頁首 -->
    <template #header> 忘記密碼 </template>

    <template #form>
      <VForm ref="formRefs" v-slot="{ errors }" :validation-schema="schema.forgot" @submit="submit">
        <!-- 彈窗: 內容 -->
        <div class="p-4">
          <UIInput
            v-model="formData.email"
            name="email"
            label="電子信箱"
            placeholder="hello@exsample.com"
            :error="errors.email"
            blackhead
            :disabled="apiPending"
          />
        </div>

        <div
          class="flex flex-wrap items-center justify-end gap-4 border-t border-system-gray-40 p-3"
        >
          <!-- 彈窗: 頁尾 -->
          <UIButton
            text="取消"
            variant="secondary"
            :disabled="apiPending"
            @click="forgotIsOpen = false"
          />
          <UIButton type="submit" text="驗證" :disabled="apiPending" :loading="apiPending" />
        </div>
      </VForm>
    </template>
  </UIModal>

  <!-- 彈窗: 重設密碼 -->
  <UIModal v-model="resetIsOpen" focus>
    <!-- 彈窗: 頁首 -->
    <template #header> 重設密碼 </template>

    <template #form>
      <VForm ref="formRefs" v-slot="{ errors }" :validation-schema="schema.reset" @submit="submit">
        <!-- 彈窗: 內容 -->
        <div class="space-y-4 p-4">
          <UIInput
            v-model="formData.email"
            name="email"
            label="電子信箱"
            placeholder="hello@exsample.com"
            :error="errors.email"
            blackhead
            disabled
          />
          <UIInput
            v-model="formData.code"
            name="code"
            label="驗證碼"
            :error="errors.code"
            blackhead
            :disabled="apiPending"
          />
          <UIInput
            v-model="formData.newPassword"
            name="newPassword"
            label="新密碼"
            type="password"
            :error="errors.newPassword"
            blackhead
            :disabled="apiPending"
          />
        </div>

        <div
          class="flex flex-wrap items-center justify-end gap-4 border-t border-system-gray-40 p-3"
        >
          <!-- 彈窗: 頁尾 -->
          <UIButton
            text="取消"
            variant="secondary"
            :disabled="apiPending"
            @click="resetIsOpen = false"
          />
          <UIButton type="submit" text="驗證" :disabled="apiPending" :loading="apiPending" />
        </div>
      </VForm>
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import type { ForgotPayload } from '@/types'

/* 全局屬性 */
const { $Swal, $validator } = useNuxtApp()
const styleStore = useStyleStore()

/* 彈窗開關 */
const forgotIsOpen = ref(false)
const resetIsOpen = ref(false)

// 忘記密碼:開啟
const openForgot = () => {
  Object.assign(formData, {
    email: '',
    code: '',
    newPassword: ''
  })
  forgotIsOpen.value = true
}

/* 驗證表單 */
const formRefs = ref<HTMLFormElement | null>(null)
const formData = reactive<ForgotPayload>({ email: '', code: '', newPassword: '' })

// 表單: 規則
const schema = ref({
  forgot: { email: 'required|email' },
  reset: {
    email: 'required',
    code: 'required',
    newPassword: (val: string) => {
      if (!val) return '密碼 為必填'
      if (!$validator.isLength(val, { min: 8 })) return '密碼需至少 8 碼以上'
      if ($validator.isAlpha(val)) return '密碼不能只有英文'
      if ($validator.isNumeric(val)) return '密碼不能只有數字'
      if (!$validator.isAlphanumeric(val)) return '密碼需至少 8 碼以上，並英數混合'
      return {}
    }
  }
})

// 表單: 送出
const submit = () => {
  if (forgotIsOpen.value) {
    ceRefresh()
  } else {
    fpRefresh()
  }
}

/* api */
const { checkEmailApi, getEmailCodeApi, forgotPwdApi } = useApi()
const apiPending = computed(() => cePending.value || fpPending.value)

// api: 驗證信箱是否已註冊
const { pending: cePending, refresh: ceRefresh } = await checkEmailApi({
  body: computed(() => ({
    email: formData.email
  })),
  immediate: false,
  watch: false,
  async onResponse({ response }) {
    if (response.status === 200) {
      if (response._data.result.isEmailExists) {
        const { data } = await getEmailCodeApi({
          body: computed(() => ({
            email: formData.email
          }))
        })
        if (data) {
          forgotIsOpen.value = false
          $Swal?.fire({
            title: '驗證碼發送成功',
            icon: 'success',
            confirmButtonText: '確認',
            confirmButtonColor: styleStore.confirmButtonColor,
            willClose: () => {
              resetIsOpen.value = true
            }
          })
        }
      } else {
        formRefs.value?.setFieldError('email', '電子信箱 不存在')
      }
    }
  }
})
cePending.value = false

// api: 更新密碼
const { pending: fpPending, refresh: fpRefresh } = await forgotPwdApi({
  body: formData,
  immediate: false,
  watch: false,
  onResponse({ response }) {
    if (response.status === 200) {
      resetIsOpen.value = false
      $Swal?.fire({
        title: '密碼重設成功',
        icon: 'success',
        confirmButtonText: '確認',
        confirmButtonColor: styleStore.confirmButtonColor
      })
    }
  },
  onResponseError() {
    formRefs.value?.setFieldError('code', '驗證碼 錯誤，請至 Email 確認')
  }
})
fpPending.value = false
</script>
