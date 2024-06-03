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
      <!-- 表單 -->
      <UIInput
        v-model="userAuth.email"
        name="email"
        label="電子信箱"
        placeholder="hello@exsample.com"
        :error="errors.email"
        :disabled="pending"
      />
      <UIInput
        v-model="userAuth.password"
        name="password"
        label="密碼"
        type="password"
        placeholder="請輸入密碼"
        :error="errors.password"
        :disabled="pending"
      />

      <div class="flex justify-between">
        <UICheckbox name="remember" text="記住帳號" />

        <!-- 按鈕: 忘記密碼 -->
        <UIButton text="忘記密碼?" variant="text" @click="isOpen = true" />
        <!-- 彈窗: 忘記密碼 -->
        <UIModal v-model="isOpen">
          <template #header> 忘記密碼 </template>
          <div class="p-4">
            <UIInput
              v-model="userAuth.email"
              name="email"
              label="電子信箱"
              placeholder="hello@exsample.com"
              :error="errors.email"
              blackhead
            />
          </div>
          <template #footer>
            <UIButton text="取消" variant="secondary" />

            <UIButton text="驗證" />
          </template>
        </UIModal>
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
/* layout */
definePageMeta({
  layout: 'auth'
})

const formRefs = ref<HTMLFormElement | null>(null)
const userAuth = ref({ email: 'cutecat8110@gmail.com', password: 'Vul3xm4000000' })
const schema = { email: 'required|email', password: 'required' }

const { loginApi } = useApi()

const { pending, refresh: loginRefresh } = await loginApi({
  params: userAuth,
  immediate: false,
  watch: false,
  onResponse({ response }) {
    console.log('0', response)
    if (response.status === 200) {
      console.log('1', response)
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
        formRefs.value?.setFieldError('password', '密碼錯誤')
        break
      default:
        break
    }
  }
})
pending.value = false

const isOpen = ref(false)
</script>
