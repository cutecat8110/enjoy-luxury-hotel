<template>
  <section
    class="container space-y-6 px-5 py-20 text-center text-white"
    aria-live="polite"
    role="status"
  >
    <h1 class="text-h5">{{ title }}</h1>
    <p v-if="pending" class="text-body text-system-gray-40">請稍候。</p>
    <p v-else-if="error" class="text-body text-system-gray-40">
      {{ missing ? '請返回列表選擇其他資料。' : '請稍後重試，或返回列表。' }}
    </p>
    <div v-if="!pending" class="flex flex-wrap justify-center gap-4">
      <UIButton v-if="error && !missing" text="重新載入" @click="$emit('retry')" />
      <NuxtLink :to="returnTo"><UIButton :text="returnLabel" variant="secondary" /></NuxtLink>
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps({
  pending: Boolean,
  error: {
    type: Object as PropType<{ statusCode?: number; status?: number } | null>,
    default: null
  },
  resource: { type: String, default: '資料' },
  emptyText: { type: String, default: '目前沒有可顯示的資料' },
  returnTo: { type: String, default: '/rooms' },
  returnLabel: { type: String, default: '返回房型列表' }
})
defineEmits(['retry'])
const missing = computed(() =>
  [400, 404].includes(props.error?.statusCode || props.error?.status || 0)
)
const title = computed(() => {
  if (props.pending) return '載入中…'
  if (props.error)
    return missing.value ? `找不到此${props.resource}` : `暫時無法載入${props.resource}`
  return props.emptyText
})
</script>
