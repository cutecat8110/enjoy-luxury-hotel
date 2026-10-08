<template>
  <img
    v-if="image"
    v-bind="$attrs"
    :src="image.src"
    :alt="alt"
    :height="height || image.height"
    :sizes="sizes"
    :srcset="image.srcset"
    :width="width || image.width"
    decoding="async"
    :loading="loading"
  />
  <NuxtImg
    v-else
    v-bind="$attrs"
    :src="src"
    :alt="alt"
    :height="height"
    :width="width"
    decoding="async"
    format="webp"
    quality="82"
    sizes="320:100vw 640:100vw 960:100vw 1440:100vw 1920:100vw"
    :loading="loading"
  />
</template>

<script lang="ts" setup>
import { getOptimizedImage } from '@/utils/optimizedImage'

defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    sizes?: string
    width?: number
    height?: number
    loading?: 'lazy' | 'eager'
    preload?: boolean
  }>(),
  { alt: '', sizes: '100vw', loading: 'lazy', preload: false, width: undefined, height: undefined }
)
const image = computed(() => getOptimizedImage(props.src))
// The preload uses the same responsive candidates as the img, avoiding a second download.
useHead(() => ({
  link:
    props.preload && image.value
      ? [
          {
            rel: 'preload',
            as: 'image',
            href: image.value.src,
            imagesrcset: image.value.srcset,
            imagesizes: props.sizes,
            fetchpriority: 'high'
          }
        ]
      : []
}))
</script>
