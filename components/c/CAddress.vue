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
        v-model="address.zipcode"
        label="district"
        value="zip_code"
        placeholder="--地區--"
        :error="props.zipcodeError"
        :options="districts"
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

const address = defineModel<Address>({
  default: { zipcode: '', detail: '' }
})

const city = ref('')

const { getCitysApi, getDistrictApi } = useApi()
const { data: citys, refresh: citysRefresh } = await getCitysApi({
  immediate: false,
  transform(input) {
    return input.data
  }
})
citysRefresh()

const { data: districts } = await getDistrictApi({
  query: { city },
  immediate: false,
  transform(input) {
    return input.data
  }
})

if (address.value.zipcode) {
  const { data } = await getDistrictApi({
    query: { zip_code: address.value.zipcode },
    transform(input) {
      return input.data
    }
  })
  city.value = data.value[0].city
}
</script>
