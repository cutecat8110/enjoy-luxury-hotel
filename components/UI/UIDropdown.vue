<template>
  <div
    ref="dropdownWrapperRefs"
    class="relative"
    @focusout="onFocusOut"
    @keydown.esc="open = false"
  >
    <div @click="open = !open">
      <slot />
    </div>
    <transition name="dropdown">
      <div
        v-if="open"
        ref="dropdownRefs"
        class="absolute -bottom-4 right-0 w-[16.25rem] translate-y-full overflow-hidden rounded-[1.25rem] bg-white py-3 shadow-md"
      >
        <slot name="item" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
const dropdownRefs = ref<null | HTMLElement>(null)
const dropdownWrapperRefs = ref<null | HTMLElement>(null)

const open = defineModel<boolean>({
  default: false
})

const outsideClose = (event: MouseEvent) => {
  if (open.value && !dropdownWrapperRefs.value?.contains(event.target as Node)) {
    open.value = false
  }
}

const onFocusOut = (event: FocusEvent) => {
  if (!dropdownWrapperRefs.value?.contains(event.relatedTarget as Node)) open.value = false
}

onMounted(() => {
  document.addEventListener('click', outsideClose)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', outsideClose)
})
</script>
