<template>
  <div>
    <div v-if="result">
      <!-- 區塊容器 -->
      <div class="section-container col-md-container container">
        <!-- 訂單資訊區塊 -->
        <div class="space-y-10 text-white xl:col-span-7 xl:space-y-20">
          <!-- 預定成功區塊 -->
          <div class="space-y-8 xl:space-y-10">
            <!-- 成功訊息 -->
            <div class="flex flex-wrap items-center gap-4 xl:gap-10">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-full bg-system-success-100"
              >
                <Icon class="text-icon-40" name="ic:baseline-check" />
              </div>
              <h1 class="flex flex-col gap-2 text-h3 xl:text-h1">
                <span>{{ `恭喜，${authStore.userName}!` }}</span>
                <span>您已預訂成功</span>
              </h1>
            </div>

            <!-- 提示訊息 -->
            <p class="text-body text-system-gray-40">
              我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
            </p>
          </div>

          <!-- 分隔線 -->
          <UILine color="lightGrey" />

          <!-- 導引區塊 -->
          <div class="space-y-6 xl:space-y-10">
            <p class="text-title xl:text-h5">立即查看您的訂單紀錄</p>
            <NuxtLink class="block xl:inline-block" to="/user/orders">
              <UIButton block text="前往我的訂單" />
            </NuxtLink>
          </div>

          <!-- 分隔線 -->
          <UILine color="lightGrey" />

          <!-- 訂房人資訊區塊 -->
          <div class="space-y-8 xl:space-y-10">
            <h2 class="text-h5">訂房人資訊</h2>
            <ul class="space-y-6">
              <!-- 姓名 -->
              <li class="space-y-2">
                <p class="text-body text-system-gray-40">姓名</p>
                <p class="text-title">{{ result.userInfo.name }}</p>
              </li>

              <!-- 手機號碼 -->
              <li class="space-y-2">
                <p class="text-body text-system-gray-40">手機號碼</p>
                <p class="text-title">{{ result.userInfo.phone }}</p>
              </li>

              <!-- 電子信箱 -->
              <li class="space-y-2">
                <p class="text-body text-system-gray-40">電子信箱</p>
                <p class="text-title">{{ result.userInfo.email }}</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- 房間資訊區塊 -->
        <CRecentOrder class="xl:col-span-5" :order="result" />
      </div>

      <!-- 條紋裝飾 -->
      <CWave />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { OrderResponse } from '@/types'

/* PageMeta */
definePageMeta({
  middleware: 'auth'
})

/* 全局屬性 */
const route = useRoute()
const authStore = useAuthStore()

/* 房型 id */
const {
  params: { id }
} = route

/* api */
const { getOrderApi } = useApi()

//  api: 取得訂單資訊
const {
  data: result,
  refresh
}: {
  data: Ref<OrderResponse | null>
  refresh: (opts?: { dedupe?: 'cancel' | 'defer' }) => Promise<void>
} = await getOrderApi(id as string, {
  immediate: false,
  transform(res: any): OrderResponse {
    return res.result
  }
})

onMounted(() => {
  refresh()
})
</script>
