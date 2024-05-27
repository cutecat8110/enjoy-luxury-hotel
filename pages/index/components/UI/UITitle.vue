<template>
  <div class="flex max-w-[19rem] items-center gap-10">
    <h2
      :class="[
        props.white ? 'text-white' : ' text-system-primary-100',
        'space-y-1 text-wrap text-h3 xl:text-h1'
      ]"
    >
      <div>{{ props.text1 }}</div>
      <div>{{ props.text2 }}</div>
    </h2>
    <div
      :class="[
        props.white ? 'bg-white' : 'bg-gradient-to-r from-system-primary-100 to-white',
        'h-[0.125rem] flex-1 rounded-full bg-white'
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  white: Boolean,
  text1: {
    type: String,
    default: '我是'
  },
  text2: {
    type: String,
    default: '標題'
  }
})
</script>
