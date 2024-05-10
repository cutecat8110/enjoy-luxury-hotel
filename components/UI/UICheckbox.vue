<template>
  <div class="group flex items-center gap-2">
    <div class="relative inline-block h-6 w-6">
      <input
        :id="props.id"
        class="peer h-6 w-6 cursor-pointer appearance-none rounded border border-system-gray-40 bg-white transition-colors checked:border-system-primary-100 checked:bg-system-primary-100 hover:outline hover:outline-4 hover:outline-system-primary-100/10 group-hover:checked:hover:bg-system-primary-120"
        type="checkbox"
        checked
      />
      <div
        class="pointer-events-none absolute left-0 top-0 flex h-6 w-6 items-center justify-center text-white opacity-0 transition-opacity peer-checked:opacity-100"
      >
        <Icon name="ic:baseline-check" />
      </div>
    </div>
    <label class="text-sub-title text-white xl:text-title" for="remember">{{ props.label }}</label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})
</script>
