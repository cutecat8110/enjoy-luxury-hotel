<template>
  <div class="space-y-2">
    <label class="text-sub-title text-white xl:text-title">生日</label>

    <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
      <UIDropdown v-model="birthday.YYYY" :options="YYYY" />
      <UIDropdown v-model="birthday.MM" :options="MM" />
      <UIDropdown v-model="birthday.DD" :options="DD" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $dayjs } = useNuxtApp()
const emit = defineEmits(['update-birthday'])

// 當下日期
const now = $dayjs()

const birthday = ref({
  YYYY: now.year(),
  MM: now.month() + 1, // 月份需要加 1，$dayjs 月份從 0 開始
  DD: now.date()
})

// 當前日期
watch(
  birthday,
  () => {
    emit('update-birthday', `${birthday.value.YYYY}-${birthday.value.MM}-${birthday.value.DD}`)
  },
  { immediate: true, deep: true }
)

// 選項計算
const YYYY = computed(() => {
  const currentYear = now.year()
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
