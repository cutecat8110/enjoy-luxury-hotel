<template>
  <div class="flex items-center justify-between gap-2 text-title">
    <template v-for="(title, index) in props.steps" :key="index">
      <div
        :class="[
          props.current >= index ? 'text-white' : 'text-system-gray-60',
          'flex flex-col  items-center gap-1'
        ]"
      >
        <div
          :class="[
            props.current >= index ? 'bg-system-primary-80' : 'border',
            'flex h-8 w-8 items-center justify-center rounded-full '
          ]"
        >
          <Icon v-if="index < props.current" name="ic:baseline-check" />
          <template v-else>
            {{ index + 1 }}
          </template>
        </div>
        {{ title }}
      </div>
      <div
        v-if="index + 1 !== props.steps.length"
        :class="[props.current > index ? 'bg-white' : 'bg-system-gray-60', 'h-[2px] flex-1 ']"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  steps: {
    type: Array,
    default: () => ['Title', 'Title', 'Title']
  },
  current: {
    type: Number,
    default: 0
  }
})
</script>
