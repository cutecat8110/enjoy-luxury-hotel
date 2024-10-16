<template>
  <div class="bg-system-primary-10">
    <div v-if="room" class="section-container space-y-10">
      <!-- 連結: 房型詳細 -->
      <div class="container">
        <NuxtLink
          class="inline-flex items-center gap-2 text-h5 transition-colors hover:text-system-primary-120 xl:text-h3"
          to="/user/orders"
        >
          <Icon class="text-icon-24 xl:text-icon-40" name="ic:baseline-keyboard-arrow-left" />

          行程詳情
        </NuxtLink>
      </div>

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
                      {{ room.roomId.name }}
                    </p>
                  </div>
                </div>

                <!-- 訂房日期 -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="訂房日期" size="md" />
                    <div v-if="room.checkInDate && room.checkOutDate" class="space-y-3">
                      <p class="text-body">
                        {{ `入住：${$dayjs(room.checkInDate).format('M 月 D 日dddd')}` }}
                      </p>
                      <p class="text-body">
                        {{ `退房：${$dayjs(room.checkOutDate).format('M 月 D 日dddd')}` }}
                      </p>
                    </div>
                  </div>
                </div>

                <!-- 房客人數 -->
                <div class="flex items-center justify-between">
                  <div class="space-y-2">
                    <CTitle title="房客人數" size="md" />
                    <p class="text-body">
                      {{ `${room.peopleNum} 人` }}
                    </p>
                  </div>
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
              </div>

              <div class="space-y-6">
                <!-- 姓名 -->
                <UIInput
                  v-model="room.userInfo.name"
                  name="name"
                  label="姓名"
                  placeholder="請輸入姓名"
                  blackhead
                  disabled
                />

                <!-- 手機號碼 -->
                <UIInput
                  v-model="room.userInfo.phone"
                  name="phone"
                  label="手機號碼"
                  placeholder="請輸入手機號碼"
                  blackhead
                  disabled
                />

                <!-- 電子信箱 -->
                <UIInput
                  v-model="room.userInfo.email"
                  name="email"
                  label="電子信箱"
                  placeholder="請輸入電子信箱"
                  blackhead
                  disabled
                />

                <!-- 地址 -->
                <CAddress v-model="room.userInfo.address" blackhead disabled />
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
                  :area-info="room.roomId.areaInfo"
                  :bed-info="room.roomId.bedInfo"
                  :max-people="room.roomId.maxPeople"
                />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="房間格局" />
                <CRoomDetail :details="room.roomId.layoutInfo" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="房內設備" />
                <CRoomDetail :details="room.roomId.facilityInfo" />
              </li>
              <li class="space-y-4 xl:space-y-6">
                <CTitle title="備品提供" />
                <CRoomDetail :details="room.roomId.amenityInfo" />
              </li>
            </ul>
          </section>
        </div>

        <!-- 價格詳細區塊 -->
        <div class="xl:col-span-5">
          <div class="card xl:sticky xl:top-[10rem] xl:z-20">
            <div class="h-[17rem] overflow-hidden rounded-lg">
              <NuxtImg class="h-full w-full object-cover" :src="room.roomId.imageUrl" />
            </div>

            <ClientOnly>
              <div class="space-y-6">
                <div class="text-h4">價格詳情</div>

                <div class="flex justify-between text-body">
                  <p>
                    {{
                      `${useFormatCurrency(room.roomId.price)} × ${$dayjs(room.checkOutDate).diff($dayjs(room.checkInDate), 'day')} 晚`
                    }}
                  </p>
                  <p>
                    {{
                      useFormatCurrency(
                        room.roomId.price *
                          $dayjs(room.checkOutDate).diff($dayjs(room.checkInDate), 'day')
                      )
                    }}
                  </p>
                </div>

                <UILine color="lightGrey" />

                <div class="flex justify-between text-title">
                  <p>總價</p>
                  <p>
                    {{
                      useFormatCurrency(
                        room.roomId.price *
                          $dayjs(room.checkOutDate).diff($dayjs(room.checkInDate), 'day')
                      )
                    }}
                  </p>
                </div>
              </div>
            </ClientOnly>

            <NuxtLink class="block" to="/user/orders">
              <UIButton type="submit" block text="返回訂單" />
            </NuxtLink>
          </div>
        </div>
      </div>
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
const { $dayjs } = useNuxtApp()

/* 房型 id */
const {
  params: { id }
} = route

/* api */
const { getOrderApi } = useApi()

// api: 取得房型
const { data: room } = await getOrderApi(id as string, {
  server: false,
  transform(res: any): OrderResponse {
    console.log(res.result)
    return res.result
  }
})
</script>
