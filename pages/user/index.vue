<template>
  <div v-if="user && !error" class="col-sm-container">
    <!-- 修改密碼-->
    <ChangePwd v-if="user" class="xl:col-span-5" :user="user" />

    <!-- 基本資料 -->
    <changeInfo v-if="user" class="xl:col-span-7" :user="user" @get-user-refresh="getUserRefresh" />
  </div>
  <CRequestState
    v-else
    :error="error"
    :pending="pending"
    resource="會員資料"
    return-label="返回首頁"
    return-to="/"
    @retry="getUserRefresh()"
  />
</template>

<script lang="ts" setup>
import ChangePwd from './components/changePwd.vue'
import changeInfo from './components/changeInfo.vue'
import type { UserResponse } from '@/types'

/* PageMeta */
definePageMeta({
  layout: 'user',
  middleware: 'auth'
})

/* api */
const { getUserApi } = useApi()

// api: 取得會員資料
const {
  data: user,
  refresh: getUserRefresh,
  pending,
  error
} = await getUserApi({
  server: false,
  transform(res: any): UserResponse {
    return res.result
  }
})
</script>
