<template>
  <div class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0">
    <div class="space-y-2">
      <p class="text-system-primary-100 xl:text-sub-title">享樂酒店，誠摯歡迎</p>
      <h2 class="text-h3 text-white xl:text-h1">立即開始旅程</h2>
    </div>
    <div class="space-y-4">
      <UIInput v-model="userAuth.email" label="電子信箱" placeholder="hello@exsample.com" />
      <UIInput v-model="userAuth.password" label="密碼" placeholder="請輸入密碼" />
      <div class="flex justify-between">
        <UICheckbox id="remember" label="記住帳號" />
        <UIButton type="text" text="忘記密碼?" />
      </div>
    </div>
    <UIButton block text="會員登入" />
    <div class="flex gap-2">
      <p class="text-body-2 text-white xl:text-body">沒有會員嗎？</p>
      <UIButton type="text" text="忘記密碼?" />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'auth'
})

const userAuth = ref({ email: 'timmothy.ramos@example.com', password: 'Dirt5528295' })
</script>
