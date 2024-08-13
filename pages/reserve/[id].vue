<template>
  <div v-if="room" class="bg-system-primary-10">
    <VForm
      v-slot="{ errors }"
      class="section-container container space-y-10"
      :validation-schema="schema"
      @submit="submit"
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
        <div class="space-y-10 xl:col-span-7">
          <!-- 訂房資訊區塊 -->
          <section class="space-y-8 xl:space-y-10">
            <h3 class="text-h6 xl:text-h4">訂房資訊</h3>

            <ul class="space-y-6">
              <li class="flex items-center justify-between">
                <div class="space-y-2">
                  <CTitle title="選擇房型" size="md" />
                  <p class="text-body">
                    {{ room.name }}
                  </p>
                </div>
                <SelectRoom :room-id="id ? (id as string) : ''" />
              </li>

              <li class="flex items-center justify-between">
                <div v-if="orderStore.isConfirmedDate" class="space-y-2">
                  <CTitle title="訂房日期" size="md" />
                  <div class="space-y-3">
                    <p class="text-body">
                      {{ `入住：${$dayjs(orderStore.order.checkInDate).format('M 月 D 日dddd')}` }}
                    </p>
                    <p class="text-body">
                      {{ `退房：${$dayjs(orderStore.order.checkOutDate).format('M 月 D 日dddd')}` }}
                    </p>
                  </div>
                </div>
                <UIButton text="編輯" variant="text-black" />
              </li>

              <li class="flex items-center justify-between">
                <div class="space-y-2">
                  <CTitle title="房客人數" size="md" />
                  <p class="text-body">
                    {{ `${orderStore.order.peopleNum} 人` }}
                  </p>
                </div>
                <UIButton text="編輯" variant="text-black" />
              </li>
            </ul>
          </section>

          <UILine color="darkGray" />

          <!-- 訂房人資訊區塊 -->
          <section class="space-y-8 xl:space-y-10">
            <h3 class="text-h6 xl:text-h4">訂房人資訊</h3>

            <div class="space-y-6">
              <UIInput
                v-model="orders.userInfo.name"
                name="name"
                label="姓名"
                placeholder="請輸入姓名"
                :error="errors.name"
                blackhead
              />
              <UIInput
                v-model="orders.userInfo.phone"
                name="phone"
                label="手機號碼"
                placeholder="請輸入手機號碼"
                :error="errors.phone"
                blackhead
              />
              <UIInput
                v-model="orders.userInfo.email"
                name="email"
                label="電子信箱"
                placeholder="請輸入電子信箱"
                :error="errors.email"
                blackhead
              />
              <CAddress v-model="orders.userInfo.address" :error="errors.address" blackhead />
            </div>
          </section>

          <UILine color="darkGray" />

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
        <div class="xl:col-span-5">
          <div class="card xl:sticky xl:top-[10rem] xl:z-20">
            <div class="h-[17rem] overflow-hidden rounded-lg">
              <NuxtImg class="h-full w-full object-cover" :src="room.imageUrl" />
            </div>

            <div class="space-y-6">
              <div class="text-h4">價格詳情</div>

              <div class="flex justify-between text-body">
                <p>
                  {{ `${useFormatCurrency(room.price)} × ${totalDays} 晚` }}
                </p>
                <p>
                  {{ useFormatCurrency(room.price * totalDays) }}
                </p>
              </div>

              <UILine color="lightGrey" />

              <div class="flex justify-between text-title">
                <p>總價</p>
                <p>{{ useFormatCurrency(room.price * totalDays) }}</p>
              </div>
            </div>

            <NuxtLink
              class="block"
              :to="{
                name: 'confirmation-id',
                params: { id: '6533f0ef4cdf5b7f762747b0' }
              }"
            >
              <UIButton block text="確認訂房" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </VForm>
  </div>
</template>

<script lang="ts" setup>
import type { RoomResponse } from '@/types'
import SelectRoom from './components/select-room.vue'

/* PageMeta */
definePageMeta({
  middleware: 'auth'
})

/* 全局屬性 */
const route = useRoute()
const { $dayjs } = useNuxtApp()
const orderStore = useOrderStore()

/* api */
const { getRoomApi } = useApi()

// api: 取得房型
const { data: room }: { data: Ref<RoomResponse | null> } = await getRoomApi(
  route.params.id as string,
  {
    transform(res: any): RoomResponse {
      return res.result
    }
  }
)

const {
  params: { id },
  query: { start, end, peopleNum }
} = route

const orders = ref({
  roomId: id.toString(),
  checkInDate: useFormatData(start ? start.toString() : $dayjs()),
  checkOutDate: useFormatData(end ? end.toString() : $dayjs().add(1, 'day')),
  peopleNum,
  userInfo: {
    address: {
      zipcode: 0,
      detail: ''
    },
    name: '',
    phone: '',
    email: ''
  }
})

const totalDays = computed(() =>
  $dayjs(orders.value.checkOutDate).diff($dayjs(orders.value.checkInDate), 'day')
)

const schema = { name: 'required', phone: 'required', email: 'required|email' }

const submit = () => {
  console.log('submit')
}
</script>
