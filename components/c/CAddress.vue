<template>
  <div class="space-y-2">
    <label :class="[blackhead ? 'text-black' : 'text-white', 'text-sub-title  xl:text-title']"
      >地址</label
    >

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <UISelect
        v-model="city"
        placeholder="--縣市--"
        :error="props.zipcodeError"
        :options="citys"
        :disabled="props.disabled"
      />
      <UISelect
        id="zipcode"
        v-model="address.zipcode"
        label="district"
        value="zip_code"
        placeholder="--地區--"
        :error="props.zipcodeError"
        :options="districts"
        :placeholder-value="0"
        :disabled="props.disabled"
      />
    </div>
    <VField v-model.trim="address.zipcode" class="hidden" name="zipcode" label="縣市、地區" />
    <VErrorMessage
      class="block text-sub-title text-system-error-120 xl:text-title"
      name="zipcode"
    />
    <UIInput
      v-model="address.detail"
      name="detail"
      label="詳細地址"
      placeholder="請輸入詳細地址"
      :error="props.detailError"
      headless
      :disabled="props.disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Address } from '@/types'

/* props */
const props = defineProps({
  zipcodeError: {
    type: String,
    default: ''
  },
  detailError: {
    type: String,
    default: ''
  },
  blackhead: Boolean,
  disabled: {
    type: Boolean,
    default: true
  }
})

/* 地址 */
const address = defineModel<Address>({
  default: { zipcode: 0, detail: '' }
})

/* 縣市 */
const city = ref('')

/* api */
const { getCitysApi, getDistrictApi } = useApi()

// api: 取得縣市
const { data: citys } = await getCitysApi({
  transform(input) {
    return input.data
  }
})

// api: 取得地區
const { data: districts } = await getDistrictApi({
  query: { city },
  immediate: false,
  transform(input) {
    return input.data
  },
  onResponse({ response }) {
    // zipcode 不在地區列表中時，重設 zipcode 為 0
    if (
      response.status === 200 &&
      response._data.data.every((item: any) => {
        return item.zip_code !== address.value.zipcode.toString()
      })
    ) {
      address.value.zipcode = 0
    }
  }
})

// zipcode 變動時，取得縣市地區
watch(
  () => address.value.zipcode,
  () => {
    //  zipcode 0 不處理
    if (address.value.zipcode === 0) return

    getDistrictApi({
      query: { zip_code: address.value.zipcode },
      onResponse({ response }) {
        if (response.status === 200) {
          city.value = response._data.data[0].city
        }
      }
    })
  },
  { immediate: true }
)
</script>
