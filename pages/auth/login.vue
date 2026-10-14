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
        type="email"
        placeholder="hello@example.com"
        :error="errors.email"
        autocomplete="username"
        :disabled="pending"
      >
        <template #suffix>
          <button
            :class="{ 'tip-dismissed': tipDismissed }"
            class="demo-fill absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-system-primary-100 transition-colors hover:bg-system-primary-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-primary-100 disabled:cursor-wait disabled:opacity-50"
            type="button"
            aria-label="帶入帳密"
            :disabled="pending"
            @click="fillDemoCredentials"
            @focus="tipDismissed = false"
            @keydown.esc="tipDismissed = true"
            @mouseenter="tipDismissed = false"
          >
            <svg
              aria-hidden="true"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.8"
              viewBox="0 0 24 24"
              width="24"
            >
              <circle cx="7.5" cy="12" r="4.5" />
              <path d="M12 12h9m-3 0v3m-3-3v2" />
            </svg>
            <span class="demo-fill-tip" aria-hidden="true">帶入帳密</span>
          </button>
        </template>
      </UIInput>
      <UIInput
        v-model="formData.password"
        name="password"
        label="密碼"
        type="password"
        placeholder="請輸入密碼"
        :error="errors.password"
        autocomplete="current-password"
        :disabled="pending"
      />

      <div class="flex justify-between">
        <UICheckbox v-model="remember" name="remember" text="記住帳號" :disabled="pending" />

        <Forgot />
      </div>
    </div>
    <span class="sr-only" role="status">{{ fillFeedback }}</span>

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
import demoAccount from '@/data/demo-account.json'

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
const tipDismissed = ref(false)
const fillFeedback = ref('')

function fillDemoCredentials() {
  if (pending.value) return
  formData.value = { ...demoAccount }
  formRefs.value?.setErrors({ email: undefined, password: undefined })
  fillFeedback.value = '已帶入帳密'
}

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
      authStore.id = response._data.result._id
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

<style scoped>
.demo-fill-tip {
  position: absolute;
  right: 0;
  bottom: calc(100% + 8px);
  border-radius: 4px;
  background: #272727;
  color: white;
  padding: 6px 10px;
  font-size: 12px;
  line-height: 1.5;
  white-space: nowrap;
  pointer-events: none;
  visibility: hidden;
  opacity: 0;
}
.demo-fill:not(.tip-dismissed):is(:hover, :focus-visible) .demo-fill-tip {
  visibility: visible;
  opacity: 1;
}
</style>
