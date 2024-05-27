<template>
  <div class="space-y-2">
    <label class="text-sub-title text-white xl:text-title">地址</label>

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <UIDropdown v-model="city" :options="citys" />
      <UIDropdown
        v-model="address.zipcode"
        label="district"
        value="zip_code"
        :options="districts"
      />
    </div>
    <UIInput
      v-model="address.detail"
      name="address"
      label="地址"
      placeholder="請輸入詳細地址"
      :error="props.error"
      headless
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update-address'])

const city = ref('')

const address = ref({ zipcode: '', detail: '' })

watch(
  address,
  () => {
    emit('update-address', address.value)
  },
  { immediate: true, deep: true }
)

const { data: citys, refresh: citysRefresh } = await useFetch('/citys', {
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

const { data: districts } = await useFetch('/district', {
  query: { city },
  immediate: false,
  transform(input) {
    return input.data
  },
  onResponse({ response }) {
    if (response.status === 200) {
      address.value.zipcode = response._data.data[0].zip_code
    }
  }
})
</script>
