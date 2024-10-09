<template>
  <div v-if="room" class="bg-system-primary-10">
    <VForm
      v-slot="{ errors }"
      class="section-container container space-y-10"
      :validation-schema="schema"
      @invalid-submit="invalidSubmit"
      @submit="addOrderRefresh"
    >
      <!-- 連結: 房型詳細 -->
      <NuxtLink
        class="inline-flex items-center gap-2 text-h5 transition-colors hover:text-system-primary-120 xl:text-h3"
        :to="{
          name: 'room-id',
          params: { id: room._id }
        }"
      >
        <Icon class="text-icon-24 xl:text-icon-40" name="ic:baseline-keyboard-arrow-left" />
        確認訂房資訊
      </NuxtLink>

      <!-- 區塊容器 -->
      <div class="col-md-container container">
        <!-- 訂房資訊區塊 -->
        <div class="space-y-10 xl:col-span-7">
          <!-- 訂房資訊區塊 -->
          <ClientOnly>
            <section class="space-y-8 xl:space-y-10">
              <h3 class="text-h6 xl:text-h4">訂房資訊</h3>

              <!-- 選擇房型 -->
              <div class="space-y-6">
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="選擇房型" size="md" />
                    <p class="text-body">
                      {{ room.name }}
                    </p>
                  </div>
                  <SelectRoom :room-id="id ? (id as string) : ''" />
                </div>

                <!-- 訂房日期 -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="訂房日期" size="md" />
                    <div
                      v-if="orderStore.order.checkInDate && orderStore.order.checkOutDate"
                      class="space-y-3"
                    >
                      <p class="text-body">
                        {{
                          `入住：${$dayjs(orderStore.order.checkInDate).format('M 月 D 日dddd')}`
                        }}
                      </p>
                      <p class="text-body">
                        {{
                          `退房：${$dayjs(orderStore.order.checkOutDate).format('M 月 D 日dddd')}`
                        }}
                      </p>
                    </div>
                  </div>
                  <Datepicker />
                </div>

                <!-- 房客人數 -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="房客人數" size="md" />
                    <p class="text-body">
                      {{ `${orderStore.order.peopleNum} 人` }}
                    </p>
                  </div>
                  <SelectPeople :room="room" />
                </div>
              </div>
            </section>
          </ClientOnly>

          <!-- 分隔線 -->
          <UILine color="darkGray" />

          <!-- 訂房人資訊區塊 -->
          <ClientOnly>
            <section class="space-y-8 xl:space-y-10">
              <div class="flex items-center justify-between">
                <h3 class="text-h6 xl:text-h4">訂房人資訊</h3>
                <UIButton text="套用會員資料" variant="text" @click="getUserRefresh" />
              </div>

              <div class="space-y-6">
                <!-- 姓名 -->
                <UIInput
                  v-model="orderStore.order.userInfo.name"
                  name="name"
                  label="姓名"
                  placeholder="請輸入姓名"
                  :error="errors.name"
                  blackhead
                  :disabled="apiPending"
                />

                <!-- 手機號碼 -->
                <UIInput
                  v-model="orderStore.order.userInfo.phone"
                  name="phone"
                  label="手機號碼"
                  placeholder="請輸入手機號碼"
                  :error="errors.phone"
                  blackhead
                  :disabled="apiPending"
                />

                <!-- 電子信箱 -->
                <UIInput
                  v-model="orderStore.order.userInfo.email"
                  name="email"
                  label="電子信箱"
                  placeholder="請輸入電子信箱"
                  :error="errors.email"
                  blackhead
                  :disabled="apiPending"
                />

                <!-- 地址 -->
                <CAddress
                  v-model="orderStore.order.userInfo.address"
                  :detail-error="errors.detail"
                  :zipcode-error="errors.zipcode"
                  blackhead
                  :disabled="apiPending"
                />
              </div>
            </section>
          </ClientOnly>

          <!-- 分隔線 -->
          <UILine color="darkGray" />

          <!-- 房間資訊區塊 -->
          <section class="space-y-8 xl:space-y-10">
            <h3 class="text-h4">房間資訊</h3>

            <ul class="space-y-6">
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="房型基本資訊" />
                <CRoomInfo
                  :area-info="room.areaInfo"
                  :bed-info="room.bedInfo"
                  :max-people="room.maxPeople"
                />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="房間格局" />
                <CRoomDetail :details="room.layoutInfo" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="房內設備" />
                <CRoomDetail :details="room.facilityInfo" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="備品提供" />
                <CRoomDetail :details="room.amenityInfo" />
              </li>
            </ul>
          </section>
        </div>

        <!-- 價格詳細區塊 -->
        <div class="xl:col-span-5">
          <div class="card xl:sticky xl:top-[10rem] xl:z-20">
            <div class="h-[17rem] overflow-hidden rounded-lg">
              <NuxtImg class="h-full w-full object-cover" :src="room.imageUrl" />
            </div>

            <ClientOnly>
              <div class="space-y-6">
                <div class="text-h4">價格詳情</div>

                <div class="flex justify-between text-body">
                  <p>
                    {{ `${useFormatCurrency(room.price)} × ${orderStore.totalNights} 晚` }}
                  </p>
                  <p>
                    {{ useFormatCurrency(room.price * orderStore.totalNights) }}
                  </p>
                </div>

                <UILine color="lightGrey" />

                <div class="flex justify-between text-title">
                  <p>總價</p>
                  <p>{{ useFormatCurrency(room.price * orderStore.totalNights) }}</p>
                </div>
              </div>
            </ClientOnly>

            <UIButton
              type="submit"
              block
              text="確認訂房"
              :disabled="apiPending"
              :loading="apiPending"
            />
          </div>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'
import SelectRoom from './components/select-room.vue'
import Datepicker from './components/datepicker.vue'
import SelectPeople from './components/select-people.vue'

/* PageMeta */
definePageMeta({
  middleware: 'auth'
})

/* 全局屬性 */
const route = useRoute()
const { $dayjs } = useNuxtApp()
const orderStore = useOrderStore()

/* 房型 id */
const {
  params: { id }
} = route

/* 訂單 */
// 訂房人資訊: 規則
const schema = {
  name: 'required|min:2',
  phone: (val: string) => {
    if (!val) return '手機號碼 為必填'
    if (!/^09\d{8}$/.test(val)) return '請輸入有效的 10 位數手機號碼'
    return {}
  },
  email: 'required|email',
  zipcode: (val: number) => {
    if (val === 0) return '縣市地區 為必填'
    return {}
  },
  detail: 'required'
}

// 訂單: 無效提交
const invalidSubmit = (event: any) => {
  const errorElement = document.getElementById(Object.keys(event.errors)[0])
  errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  errorElement?.focus()
}

/* api */
const { getRoomApi, getUserApi, addOrderApi } = useApi()
const apiPending = computed(() => grPending.value || guPending.value || aoPending.value)

// api: 取得房型
const {
  data: room,
  pending: grPending
}: { data: Ref<RoomResponse | null>; pending: Ref<boolean> } = await getRoomApi(id as string, {
  transform(res: any): RoomResponse {
    return res.result
  }
})

// api: 套用會員資料
const { refresh: getUserRefresh, pending: guPending } = await getUserApi({
  immediate: false,
  onResponse({ response }) {
    if (response.status === 200) {
      const { name, phone, email, address } = response._data.result
      orderStore.order.userInfo = { ...orderStore.order.userInfo, name, phone, email, address }
    }
  }
})
guPending.value = false

// api: 新增訂單
const { pending: aoPending, refresh: addOrderRefresh } = await addOrderApi({
  body: orderStore.order,
  immediate: false,
  watch: false,
  async onResponse({ response }) {
    if (response.status === 200) {
      await navigateTo(`/confirmation/${response._data.result._id}`)
    }
  }
})
aoPending.value = false
</script>
