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
        :options="cities"
        :disabled="props.disabled"
      />
      <UISelect
        id="zipcode"
        v-model="address.zipcode"
        label="district"
        value="zipcode"
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
import { cities, districtsForCity, findDistrict } from '@/utils/address'
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
  default: () => ({ zipcode: 0, detail: '' })
})

/* Keep city/zipcode synchronized without network requests or late responses. */
const city = ref(findDistrict(address.value.zipcode)?.city ?? '')
const districts = computed(() => districtsForCity(city.value))
watch(
  () => address.value.zipcode,
  (zipcode) => {
    const district = findDistrict(zipcode)
    if (district) city.value = district.city
  },
  { immediate: true }
)
watch(city, (value) => {
  if (!districtsForCity(value).some((item) => item.zipcode === Number(address.value.zipcode))) {
    address.value.zipcode = 0
  }
})
</script>
