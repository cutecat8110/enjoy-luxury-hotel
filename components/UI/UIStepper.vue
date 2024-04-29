<template>
  <div class="flex items-center justify-between gap-2 text-title">
    <template v-for="(title, index) in stepper" :key="index">
      <div
        :class="[
          currentIndex >= index ? 'text-white' : 'text-system-gray-60',
          'flex flex-col  items-center gap-1'
        ]"
      >
        <div
          :class="[
            currentIndex >= index ? 'bg-system-primary-80' : 'border',
            'flex h-8 w-8 items-center justify-center rounded-full '
          ]"
        >
          {{ index + 1 }}
        </div>
        {{ title }}
      </div>
      <div
        v-if="index + 1 !== stepper.length"
        :class="[currentIndex > index ? 'bg-white' : 'bg-system-gray-60', 'h-[2px] flex-1 ']"
      ></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const stepper = ['Title', 'Title', 'Title']
const currentIndex = 0
</script>
