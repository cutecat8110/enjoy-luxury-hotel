<template>
  <div class="space-y-2">
    <label :class="[blackhead ? 'text-black' : 'text-white', 'text-sub-title  xl:text-title']"
      >地址</label
    >

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <UIDropdown v-model="city" :options="citys" :disabled="props.disabled" />
      <UIDropdown
        v-model="address.zipcode"
        label="district"
        value="zip_code"
        :options="districts"
        :disabled="props.disabled"
      />
    </div>
    <UIInput
      v-model="address.detail"
      name="address"
      label="地址"
      placeholder="請輸入詳細地址"
      :error="props.error"
      headless
      :disabled="props.disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Address } from '@/types'

const props = defineProps({
  error: {
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
  default: { zipcode: undefined, detail: '' }
})

const city = ref('')

const { getCitysApi, getDistrictApi } = useApi()
const { data: citys, refresh: citysRefresh } = await getCitysApi({
  immediate: false,
  transform(input) {
    return input.data
  },
  onResponse({ response }) {
    if (response.status === 200) {
      city.value = response._data.data[0]
    }
  }
})
citysRefresh()

const { data: districts } = await getDistrictApi({
  query: { city },
  immediate: false,
  transform(input) {
    return input.data
  },
  onResponse({ response }) {
    if (response.status === 200) {
      address.value.zipcode = Number(response._data.data[0].zip_code)
    }
  }
})
</script>
