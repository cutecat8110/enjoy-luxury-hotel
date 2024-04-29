<template>
  <div :class="[chosen ? 'text-black' : 'text-system-gray-80', 'relative grid text-body']">
    <VField
      v-model="input"
      :class="[
        chosen ? 'border-black' : 'border-transparent',
        'col-start-1 row-start-1 appearance-none rounded-lg border  p-4 pr-12 outline-none focus-visible:border-system-primary-100'
      ]"
      name="field"
      as="select"
    >
      <option value="" disabled>請選擇</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </VField>
    <div
      class="pointer-events-none absolute inset-y-1/2 right-4 col-start-1 row-start-1 flex h-6 w-6 -translate-y-1/2 items-center justify-center"
    >
      <Icon name="ic:baseline-keyboard-arrow-down"></Icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
const input = defineModel<string>({ default: '' })

const chosen = computed(() => {
  return input.value !== ''
})
</script>

<style lang="scss" scoped>
.ui-dropdown {
  @apply relative;
}
</style>
