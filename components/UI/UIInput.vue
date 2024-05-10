<template>
  <label class="block w-full min-w-[280px] space-y-2" :for="props.label">
    <div
      v-if="props.label"
      class="flex items-center justify-between text-sub-title text-white xl:text-title"
    >
      <span>
        {{ props.label }}
      </span>
      <span v-if="props.required" class="text-system-primary-100">必填</span>
    </div>
    <input
      :id="props.label"
      v-model="input"
      :class="cssColor"
      :name="props.label"
      type="text"
      :placeholder="props.placeholder"
    />
    <div v-if="props.error" class="text-start text-sub-title text-system-error-120 xl:text-title">
      {{ props.error }}
    </div>
  </label>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  required: Boolean,
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

const input = defineModel<string>()

const cssColor = computed<string>(() => {
  return props.error
    ? 'w-full rounded-lg border border-system-error-100 bg-white p-4 text-body-2 xl:text-body text-system-gray-80 caret-system-error-100 placeholder:text-system-gray-60 focus:border-system-error-100 focus:outline focus:outline-4 focus:outline-system-error-100/10'
    : 'w-full rounded-lg border border-system-gray-40 bg-white p-4 text-body-2 xl:text-body text-system-gray-80 caret-system-primary-100 placeholder:text-system-gray-60 focus:border-system-primary-100 focus:outline focus:outline-4 focus:outline-system-primary-100/10'
})
</script>
