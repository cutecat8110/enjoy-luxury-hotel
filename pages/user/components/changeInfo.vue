<template>
  <section>
    <VForm
      ref="formRefs"
      v-slot="{ errors }"
      class="card"
      :validation-schema="schema"
      @submit="refresh"
    >
      <h2 class="text-h6 xl:text-h5">基本資料</h2>

      <div class="space-y-6">
        <!-- 基本資料 -->
        <template v-if="!isFormShow">
          <!-- 姓名 -->
          <CUserData title="姓名" :text="props.user.name" />

          <!-- 手機號碼 -->
          <CUserData title="手機號碼" :text="props.user.phone" />

          <!-- 生日 -->
          <CUserData
            title="生日"
            :text="$dayjs(props.user.birthday).format('YYYY 年 MM 月 DD 日')"
          />

          <!-- 地址 -->
          <CUserData title="地址" :text="address" />

          <!-- 按鈕: 編輯基本資料 -->
          <UIButton text="編輯" variant="secondary" @click="toggleForm('show')" />
        </template>

        <!-- 表單: 編輯基本資料 -->
        <template v-else>
          <!-- 姓名 -->
          <UIInput
            v-model="formData.name"
            name="name"
            label="姓名"
            placeholder="請輸入姓名"
            :error="errors.name"
            blackhead
            :disabled="pending"
          />

          <!-- 手機號碼 -->
          <UIInput
            v-model="formData.phone"
            name="phone"
            label="手機號碼"
            type="tel"
            placeholder="請輸入手機號碼"
            :error="errors.phone"
            blackhead
            :disabled="pending"
          />

          <!-- 生日 -->
          <CBirthday
            v-model="formData.birthday"
            :error="errors.birthday"
            blackhead
            :disabled="pending"
          />

          <!-- 地址 -->
          <CAddress
            v-model="formData.address"
            :detail-error="errors.detail"
            :zipcode-error="errors.zipcode"
            blackhead
            :disabled="pending"
          />

          <!-- 按鈕組: 取消編輯/儲存設定 -->
          <div class="flex gap-2">
            <UIButton
              class="flex w-full xl:inline-flex xl:w-auto"
              type="button"
              text="取消編輯"
              variant="secondary"
              :disabled="pending"
              @click="cancelEdit()"
            />

            <UIButton
              class="flex w-full xl:inline-flex xl:w-auto"
              type="submit"
              text="儲存設定"
              :disabled="pending"
              :loading="pending"
            />
          </div>
        </template>
      </div>
    </VForm>
  </section>
</template>

<script lang="ts" setup>
import type { UserResponse } from '@/types'

/* props */
const props = defineProps({
  user: {
    type: Object as PropType<UserResponse>,
    required: true
  }
})

/* emit */
const emit = defineEmits(['getUserRefresh'])

/* 全局屬性 */
const { $Swal, $dayjs } = useNuxtApp()
const authStore = useAuthStore()
const styleStore = useStyleStore()

/* 地址 */
const address = ref('台中市南區復興路362號')

/* 表單 */
const formData = reactive({
  name: props.user.name,
  phone: props.user.phone,
  birthday: props.user.birthday,
  address: {
    zipcode: props.user.address.zipcode,
    detail: props.user.address.detail
  }
})
const formRefs = ref<HTMLFormElement | null>(null)

// 表單: 規則
const schema = {
  name: 'required|min:2',
  phone: (val: string) => {
    if (!val) return '手機號碼 為必填'
    if (!/^09\d{8}$/.test(val)) return '請輸入有效的 10 位數手機號碼'
    return {}
  },
  birthday: (val: string) => {
    return $dayjs(val, 'YYYY-M-D', true).isValid() ? {} : '生日 為必填'
  },
  zipcode: (val: number) => {
    if (val === 0) return '縣市地區 為必填'
    return {}
  },
  detail: 'required'
}

// 表單: 開關
const isFormShow = ref(false)
const toggleForm = (event: string) => {
  if (event === 'show') {
    isFormShow.value = true
  } else if (event === 'close') {
    isFormShow.value = false
  }
}

const cancelEdit = (data = props.user) => {
  formData.name = data.name
  formData.phone = data.phone
  formData.birthday = data.birthday
  formData.address.zipcode = data.address.zipcode
  formData.address.detail = data.address.detail
  toggleForm('close')
}

/* api */
const { updateUserApi, getDistrictApi } = useApi()

// api: 編輯基本資料
const { pending, refresh } = await updateUserApi({
  body: computed(() => ({
    userId: props.user._id,
    ...formData
  })),
  watch: false,
  immediate: false,
  onResponse({ response }) {
    if (response.status === 200) {
      $Swal?.fire({
        title: '基本資料編輯成功',
        icon: 'success',
        confirmButtonText: '確認',
        confirmButtonColor: styleStore.confirmButtonColor,
        willClose: () => {
          emit('getUserRefresh')
          authStore.userName = response._data.result.name
          cancelEdit(response._data.result)
        }
      })
    }
  }
})
pending.value = false

// api: 取得地址地區
watch(
  () => props.user.address,
  () => {
    //  zipcode 0 不處理
    if (props.user.address.zipcode === 0) return

    getDistrictApi({
      query: { zip_code: props.user.address.zipcode },
      onResponse({ response }) {
        if (response.status === 200) {
          const { city, district } = response._data.data[0]
          address.value = `${city}${district}${props.user.address.detail}`
        }
      }
    })
  },
  { immediate: true }
)
</script>
