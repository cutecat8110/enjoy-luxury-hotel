<template>
  <VForm
    v-slot="{ errors }"
    class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0"
    :validation-schema="schema"
    @submit="submit"
  >
    <UITitle text="立即開始旅程" />
    <div class="space-y-4">
      <UIInput
        v-model="userAuth.email"
        name="email"
        label="電子信箱"
        placeholder="hello@exsample.com"
        :error="errors.email"
      />
      <UIInput
        v-model="userAuth.password"
        name="password"
        label="密碼"
        type="password"
        placeholder="請輸入密碼"
        :error="errors.password"
      />
      <div class="flex justify-between">
        <UICheckbox id="remember" label="記住帳號" />
        <UIButton text="忘記密碼?" variant="text" />
      </div>
    </div>
    <UIButton type="submit" block text="會員登入" />
    <div class="flex gap-2">
      <p class="text-body-2 text-white xl:text-body">沒有會員嗎？</p>
      <NuxtLink class="hot-link-wrapper" to="/auth/signup">
        <UIButton text="前往註冊" variant="text" />
      </NuxtLink>
    </div>
  </VForm>
</template>

<script lang="ts" setup>
import UITitle from './components/UI/UITitle.vue'

definePageMeta({
  layout: 'auth'
})

const userAuth = ref({ email: '', password: '' })
const schema = { email: 'required|email', password: 'required' }

const submit = () => {
  console.log('submit')
}
</script>
