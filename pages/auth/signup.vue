<template>
  <VForm
    ref="formRefs"
    v-slot="{ errors }"
    class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0"
    :validation-schema="schema[progress]"
    @submit="submit"
  >
    <!-- 表頭 -->
    <CAuthTitle text="立即註冊" />

    <!-- 步驟進度 -->
    <UIStepper
      v-model="progress"
      :steps="['輸入信箱及密碼', '填寫基本資料']"
      :disabled="apiPending"
    />

    <!-- 表單 -->
    <Transition name="modal" mode="out-in">
      <!-- 步驟: 0．信箱．密碼 -->
      <div v-if="progress === 0" class="space-y-4">
        <UIInput
          v-model="formData.email"
          name="email"
          label="電子信箱"
          placeholder="hello@exsample.com"
          :error="errors.email"
          :disabled="apiPending"
        />
        <UIInput
          v-model="formData.password"
          name="password"
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
          :error="errors.password"
          :disabled="apiPending"
        />
        <UIInput
          v-model="formCtrl.confirmPassword"
          name="confirmPassword"
          label="確認密碼"
          type="password"
          placeholder="請再輸入一次密碼"
          :error="errors.confirmPassword"
          :disabled="apiPending"
        />
      </div>

      <!-- 步驟: 1．姓名．手機．生日．地址 -->
      <div v-else class="space-y-4">
        <UIInput
          v-model="formData.name"
          name="name"
          label="姓名"
          placeholder="請輸入姓名"
          :error="errors.name"
          :disabled="apiPending"
        />

        <UIInput
          v-model="formData.phone"
          name="phone"
          label="手機號碼"
          placeholder="請輸入手機號碼"
          :error="errors.phone"
          :disabled="apiPending"
        />

        <CBirthday v-model="formData.birthday" :error="errors.birthday" :disabled="apiPending" />

        <CAddress
          v-model="formData.address"
          :detail-error="errors.detail"
          :zipcode-error="errors.zipcode"
          :disabled="apiPending"
        />

        <UICheckbox
          v-model="formCtrl.isAgree"
          name="agree"
          label="網站個資使用規範"
          :error="errors.agree"
          text="我已閱讀並同意本網站個資使用規範"
          :disabled="apiPending"
        />
      </div>
    </Transition>

    <div class="space-y-4">
      <!-- 按鈕: 提交 -->
      <UIButton
        type="submit"
        :text="progress == 0 ? '下一步' : '完成註冊'"
        block
        :disabled="apiPending"
        :loading="apiPending"
      />

      <!-- 連結: 登入頁 -->
      <div class="flex gap-2">
        <p class="text-body-2 text-white xl:text-body">已經有會員了嗎？</p>
        <NuxtLink class="hot-link-wrapper" to="/auth/login">
          <UIButton text="立即登入" variant="text" />
        </NuxtLink>
      </div>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import type { SignupPayload } from '@/types'

/* 全局屬性 */
const authStore = useAuthStore()
const styleStore = useStyleStore()
const commonStore = useCommonStore()
const { $Swal, $dayjs, $validator } = useNuxtApp()

/* layout */
definePageMeta({
  layout: 'auth'
})

/* 註冊表單 */
const formRefs = ref<HTMLFormElement | null>(null)
const formData = reactive<SignupPayload>({
  email: '',
  password: '',
  name: '',
  phone: '',
  birthday: '',
  address: {
    zipcode: 0,
    detail: ''
  }
})
const formCtrl = ref({ confirmPassword: '', isAgree: false })

// 表單: 規則
const schema = [
  {
    email: 'required|email',
    password: (val: string) => {
      if (!val) return '密碼 為必填'
      if (!$validator.isLength(val, { min: 8 })) return '密碼需至少 8 碼以上'
      if ($validator.isAlpha(val)) return '密碼不能只有英文'
      if ($validator.isNumeric(val)) return '密碼不能只有數字'
      if (!$validator.isAlphanumeric(val)) return '密碼需至少 8 碼以上，並英數混合'
      return {}
    },
    confirmPassword: 'required|confirmed:@password'
  },
  {
    name: 'required|min:2',
    phone: (val: string) => {
      if (!val) return '手機號碼 為必填'
      if (!/^09\d{8}$/.test(val)) return '請輸入有效的 10 位數手機號碼'
      return {}
    },
    birthday: (val: string) => {
      return $dayjs(val, 'YYYY-M-D', true).isValid() ? {} : '生日 為必填'
    },
    zipcode: 'required',
    detail: 'required',
    agree: (val: Boolean) => {
      return !val ? '請閱讀並同意本網站個資使用規範' : {}
    }
  }
]

// 表單: 進度
const progress = ref(0)

// 表單: 送出
const submit = () => {
  if (progress.value === 0) {
    ceRefresh()
    return
  }
  sRefresh()
}

/* api */
const { signupApi, checkEmailApi } = useApi()
const apiPending = computed(() => cePending.value || sPending.value)

// api: 驗證信箱是否已註冊
const { pending: cePending, refresh: ceRefresh } = await checkEmailApi({
  body: computed(() => ({
    email: formData.email
  })),
  immediate: false,
  watch: false,
  onResponse({ response }) {
    if (response.status === 200) {
      if (response._data.result.isEmailExists) {
        formRefs.value?.setFieldError('email', '電子信箱 已存在')
        return
      }
      progress.value = 1
    }
  }
})
cePending.value = false

// api: 註冊
const { pending: sPending, refresh: sRefresh } = await signupApi({
  body: formData,
  immediate: false,
  watch: false,
  onResponse({ response }) {
    if (response.status === 200) {
      authStore.userName = response._data.result.name
      authStore.token = response._data.token
      $Swal?.fire({
        title: '註冊成功!',
        text: '開始您的享樂旅行',
        icon: 'success',
        confirmButtonText: '前往',
        confirmButtonColor: styleStore.confirmButtonColor,
        willClose: async () => {
          await navigateTo(commonStore.routerGuide || '/')
        }
      })
    }
  }
})
sPending.value = false
</script>
