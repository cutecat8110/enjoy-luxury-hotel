<template>
  <VDatePicker
    ref="calendar"
    v-bind="$attrs"
    v-model.range.string="range"
    :masks="{ modelValue: 'YYYY/M/DD' }"
    :min-date="$dayjs().format('YYYY/M/DD')"
    borderless
    color="black"
    mode="date"
    @keydown.capture="useNativeArrowActivation"
  >
    <template v-for="arrow in arrows" :key="arrow.slot" #[arrow.slot]>
      <span class="sr-only">{{ arrow.label }}</span>
      <svg
        class="vc-base-icon"
        aria-hidden="true"
        height="24"
        stroke-linecap="round"
        stroke-linejoin="round"
        viewBox="0 0 24 24"
        width="24"
      >
        <polyline :points="arrow.previous ? '15 18 9 12 15 6' : '9 18 15 12 9 6'" />
      </svg>
    </template>
  </VDatePicker>
</template>

<script lang="ts" setup>
import type { DatePicker } from 'v-calendar'

defineOptions({ inheritAttrs: false })
const range = defineModel<{ start: string; end: string } | null>({ default: null })
const calendar = ref<InstanceType<typeof DatePicker> | null>(null)
const { $dayjs } = useNuxtApp()
const arrows = [
  { slot: 'header-prev-button', label: '上一組月份', previous: true },
  { slot: 'header-next-button', label: '下一組月份', previous: false },
  { slot: 'nav-prev-button', label: '上一組年份', previous: true },
  { slot: 'nav-next-button', label: '下一組年份', previous: false }
]

// v-calendar 3 handles keydown as well as the native button click.
// Let the native click run once; retain the calendar's arrow-key/day navigation.
const useNativeArrowActivation = (event: KeyboardEvent) => {
  if (
    (event.key === 'Enter' || event.key === ' ') &&
    event.target instanceof HTMLElement &&
    event.target.closest('button.vc-arrow')
  ) {
    event.stopPropagation()
  }
}

defineExpose({
  move: (date: string) => calendar.value?.move(date)
})
</script>
