<template>
  <div class="col-sm-container">
    <section class="xl:col-span-5">
      <div class="card">
        <h2 class="text-h6 xl:text-h5">修改密碼</h2>

        <ul class="space-y-6">
          <li class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">電子信箱</label>
            <p class="text-sub-title xl:text-title">{{ authStore.user.email }}</p>
          </li>
          <li class="flex items-center justify-between">
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
            <UIButton text="重設" variant="text" />
          </li>
        </ul>
      </div>
    </section>
    <section class="xl:col-span-7">
      <div class="card">
        <h2 class="text-h6 xl:text-h5">基本資料</h2>

        <ul class="space-y-6">
          <li class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">姓名</label>
            <p class="text-sub-title xl:text-title">{{ authStore.user.name }}</p>
          </li>
          <li class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">手機號碼</label>
            <p class="text-sub-title xl:text-title">{{ authStore.user.phone }}</p>
          </li>
          <li class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">生日</label>
            <p class="text-sub-title xl:text-title">
              {{ $dayjs(authStore.user.birthday).format('YYYY 年 M 月 D 日') }}
            </p>
          </li>
          <li class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">地址</label>
            <p class="text-sub-title xl:text-title">{{ address }}</p>
          </li>
        </ul>

        <UIButton text="編輯" variant="secondary" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

definePageMeta({
  layout: 'user'
})

const password = ref({
  oldPassword: '舊密碼',
  newPassword: '新密碼'
})

const address = computed(() => {
  const { detail, county, city } = authStore.user.address
  return `${county}${city}${detail}`
})
</script>
