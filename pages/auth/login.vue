<template>
  <VForm
    ref="formRefs"
    v-slot="{ errors }"
    class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0"
    :validation-schema="schema"
    @submit="loginRefresh"
  >
    <!-- 表頭 -->
    <CAuthTitle text="立即開始旅程" />

    <div class="space-y-4">
      <!-- 表單: 電子信箱．密碼 -->
      <UIInput
        v-model="formData.email"
        name="email"
        label="電子信箱"
        placeholder="hello@exsample.com"
        :error="errors.email"
        :disabled="pending"
      />
      <UIInput
        v-model="formData.password"
        name="password"
        label="密碼"
        type="password"
        placeholder="請輸入密碼"
        :error="errors.password"
        :disabled="pending"
      />

      <div class="flex justify-between">
        <UICheckbox v-model="remember" name="remember" text="記住帳號" :disabled="pending" />

        <Forgot />
      </div>
    </div>

    <!-- 按鈕: 登入 -->
    <UIButton type="submit" block text="會員登入" :disabled="pending" :loading="pending" />

    <div class="flex gap-2">
      <p class="text-body-2 text-white xl:text-body">沒有會員嗎？</p>
      <!-- 連結: 註冊頁 -->
      <NuxtLink class="hot-link-wrapper" to="/auth/signup">
        <UIButton text="前往註冊" variant="text" />
      </NuxtLink>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import Forgot from './components/forgot.vue'
import type { LoginPayload } from '@/types'

/* 全局屬性 */
const authStore = useAuthStore()
const useCommon = useCommonStore()

/* PageMeta */
definePageMeta({
  middleware: 'record',
  layout: 'auth'
})

/* 登入表單 */
const formRefs = ref<HTMLFormElement | null>(null)
const formData = ref<LoginPayload>({ email: '', password: '' })

// 表單: 規則
const schema = { email: 'required|email', password: 'required' }

// 記住帳號
const remember = ref(false)

// 客戶端初始化
onMounted(() => {
  formData.value.email = authStore.email
  remember.value = authStore.email !== ''
})

/* api */
const { loginApi } = useApi()

// api: 登入
const { pending, refresh: loginRefresh } = await loginApi({
  body: formData,
  immediate: false,
  watch: false,
  async onResponse({ response }) {
    if (response.status === 200) {
      authStore.userName = response._data.result.name
      authStore.token = response._data.token
      authStore.email = remember.value ? formData.value.email : ''
      await navigateTo(useCommon.routerGuide || '/')
    }
  },
  onResponseError({ response }) {
    switch (response._data?.message) {
      case '此使用者不存在':
        formRefs.value?.setFieldError('email', '電子信箱 不存在')
        break
      case '密碼錯誤':
      case '密碼需至少 8 碼以上':
      case '密碼不能只有英文':
      case '密碼不能只有數字':
      case '密碼需至少 8 碼以上，並英數混合':
        formRefs.value?.setFieldError('password', '密碼 錯誤')
        break
      default:
        break
    }
  }
})
pending.value = false
</script>
