<template>
  <div class="relative text-body text-black">
    <select
      v-model="input"
      class="w-full appearance-none rounded-lg border border-black p-4 pr-12 outline-none focus-visible:border-system-primary-100"
    >
      <option value="" disabled>請選擇</option>
      <option
        v-for="(option, index) in props.options"
        :key="index"
        :value="OptionShow(option, props.value)"
      >
        {{ OptionShow(option, props.label) }}
      </option>
    </select>
    <div
      class="pointer-events-none absolute inset-y-1/2 right-4 flex h-6 w-6 -translate-y-1/2 items-center justify-center"
    >
      <Icon name="ic:baseline-keyboard-arrow-down"></Icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  options: {
    type: Array as () => (string | number | Record<string, unknown>)[],
    default: () => ['Title', 'Title', 'Title']
  },
  label: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  }
})

const input = defineModel<string | number>()

const OptionShow = (option: string | number | Record<string, unknown>, show: string) => {
  if (typeof option === 'object' && show) {
    return option[show] || ''
  }
  return option
}
</script>
