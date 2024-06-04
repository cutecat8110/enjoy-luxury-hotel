<template>
  <div class="space-y-2">
    <label class="text-sub-title text-white xl:text-title">生日</label>

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
      <UISelect v-model="birthday.YYYY" :options="YYYY" :disabled="props.disabled" />
      <UISelect v-model="birthday.MM" :options="MM" :disabled="props.disabled" />
      <UISelect v-model="birthday.DD" :options="DD" :disabled="props.disabled" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const { $dayjs } = useNuxtApp()

const formatBirthday = defineModel<string>({
  default: new Date().toISOString().split('T')[0]
})

const birthday = ref({
  YYYY: $dayjs(formatBirthday.value).year(),
  MM: $dayjs(formatBirthday.value).month() + 1, // 月份需要加 1，$dayjs 月份從 0 開始
  DD: $dayjs(formatBirthday.value).date()
})

// 當前日期
watch(
  birthday,
  () => {
    formatBirthday.value = `${birthday.value.YYYY}-${birthday.value.MM}-${birthday.value.DD}`
  },
  { immediate: true, deep: true }
)

// 選項計算
const YYYY = computed(() => {
  const currentYear = $dayjs().year()
  return Array.from({ length: 100 }, (_, i) => currentYear - i)
})
const MM = computed(() => Array.from({ length: 12 }, (_, i) => 1 + i))
const DD = computed(() => {
  const { YYYY, MM, DD } = birthday.value
  const daysInMonth = $dayjs(`${YYYY}-${MM}`).daysInMonth()
  if (DD > daysInMonth) {
    birthday.value.DD = daysInMonth
  }
  return Array.from({ length: daysInMonth }, (_, i) => 1 + i)
})
</script>
