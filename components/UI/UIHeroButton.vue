<template>
  <button
    class="group flex w-full items-center justify-end gap-[.625rem] text-nowrap rounded-lg bg-white p-5 text-title text-black transition-colors hover:bg-system-primary-100 hover:text-white xl:p-10 xl:text-h5"
    type="button"
  >
    {{ props.text }}
    <div
      class="h-[1px] max-w-20 flex-1 bg-black transition-colors group-hover:bg-white xl:max-w-[9.375rem]"
    ></div>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Button'
  }
})
</script>
