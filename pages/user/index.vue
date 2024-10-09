<template>
  <!-- 區塊容器 -->
  <div class="col-sm-container">
    <!-- 修改密碼區塊 -->

    <ChangePwd v-if="user" class="xl:col-span-5" :user="user" />

    <section class="xl:col-span-7">
      <!-- <div class="card">
        <h2 class="text-h6 xl:textz-h5">基本資料</h2>

        <ul class="space-y-6">
          <li class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">姓名</label>
            <p class="text-sub-title xl:text-title">{{ authStore.user!.name }}</p>
          </li>
          <li class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">手機號碼</label>
            <p class="text-sub-title xl:text-title">{{ authStore.user!.phone }}</p>
          </li>
          <li class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">生日</label>
            <p class="text-sub-title xl:text-title">
              {{ $dayjs(authStore.user!.birthday).format('YYYY 年 M 月 D 日') }}
            </p>
          </li>
          <li class="space-y-2">
            <label class="text-body-2 text-system-gray-80 xl:text-body">地址</label>
            <p class="text-sub-title xl:text-title">{{ address }}</p>
          </li>
        </ul>

        <UIButton text="編輯" variant="secondary" />
      </div> -->
    </section>
  </div>
</template>

<script lang="ts" setup>
import ChangePwd from './components/changePwd.vue'
import type { UserResponse } from '@/types'

/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

/* api */
const { getUserApi } = useApi()

// api: 取得會員資料
const { data: user, refresh } = await getUserApi({
  server: false,
  transform(res: any): UserResponse {
    return res.result
  }
})
onMounted(() => {
  refresh()
})

// const address = computed(() => {
//   const { detail, county, city } = authStore.user!.address
//   return `${county}${city}${detail}`
// })
</script>
