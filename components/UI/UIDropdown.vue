<template>
  <div :class="[chosen ? 'text-black' : 'text-system-gray-80', 'relative text-body']">
    <select
      v-model="input"
      :class="[
        chosen ? 'border-black' : 'border-transparent',
        'w-full appearance-none rounded-lg border p-4 pr-12 outline-none focus-visible:border-system-primary-100'
      ]"
    >
      <option value="" disabled>請選擇</option>
      <option v-for="(option, index) in props.options" :key="index" :value="option">
        {{ option }}
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
    type: Array,
    default: () => ['Title', 'Title', 'Title']
  }
})

const input = defineModel<string | number>()

const chosen = computed(() => {
  return input.value !== ''
})
</script>

<style lang="scss" scoped>
.ui-dropdown {
  @apply relative;
}
</style>
