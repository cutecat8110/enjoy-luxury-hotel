<template>
  <VForm
    v-slot="{ errors }"
    class="container space-y-10 px-5 py-20 sm:max-w-[26rem] sm:px-0"
    :validation-schema="schema[current]"
    @submit="submit"
  >
    <UITitle text="立即註冊" />
    <UIStepper :current="1" :steps="['輸入信箱及密碼', '填寫基本資料']" />
    <div class="space-y-4">
      <template v-if="current === 0">
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
        <UIInput
          v-model="userAuth.confirmPassword"
          name="confirmPassword"
          label="確認密碼"
          type="confirmPassword"
          placeholder="請再輸入一次密碼"
          :error="errors.confirmPassword"
        />
      </template>
      <template v-else>
        <UIInput
          v-model="userAuth.name"
          name="name"
          label="姓名"
          placeholder="請輸入姓名"
          :error="errors.name"
        />
        <UIInput
          v-model="userAuth.phone"
          name="phone"
          label="手機號碼"
          placeholder="請輸入手機號碼"
          :error="errors.phone"
        />
        <Birthday @updateBirthday="updateBirthday" />
      </template>
    </div>
    <div class="space-y-4">
      <UIButton type="submit" block text="下一步" />
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
import UITitle from './components/UI/UITitle.vue'
import Birthday from './components/birthday.vue'

definePageMeta({
  layout: 'auth'
})

const userAuth = ref({
  email: 'test@test.com',
  password: 'test',
  confirmPassword: 'test',
  name: '',
  phone: '',
  birthday: '',
  address: {
    zipcode: 802,
    detail: '文山路23號'
  }
})
const schema = [
  { email: 'required|email', password: 'required', confirmPassword: 'required' },
  {
    name: 'required',
    phone: 'required'
  }
]

const current = ref(1)

const submit = () => {
  if (current.value === 0) {
    current.value = 1
  }
}

const updateBirthday = (data: string) => {
  userAuth.value.birthday = data
}
</script>
