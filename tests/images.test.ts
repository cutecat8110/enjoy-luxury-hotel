import { mount } from '@vue/test-utils'
import { readFile } from 'node:fs/promises'
import sharp from 'sharp'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Image from '../components/c/CImage.vue'
import manifest from '../data/optimized-images.json'
import { getOptimizedImage } from '../utils/optimizedImage'

const heads: any[] = []
vi.stubGlobal('useHead', (input: () => unknown) => heads.push(input()))
afterEach(() => {
  heads.length = 0
})

describe('responsive image delivery', () => {
  it('reuses one asset for aliases, but never substitutes a changed or unknown source', () => {
    expect(getOptimizedImage('/imgur/SAbetYU.jpg')).toEqual(
      getOptimizedImage('https://i.imgur.com/SAbetYU.jpg')
    )
    expect(getOptimizedImage('imgur/SAbetYU.jpg')).toEqual(getOptimizedImage('/imgur/SAbetYU.jpg'))
    expect(getOptimizedImage('https://i.imgur.com/new-upload.jpg')).toBeNull()
    expect(getOptimizedImage('')).toBeNull()
    expect(getOptimizedImage()).toBeNull()
    expect(getOptimizedImage('https://i.imgur.com/SAbetYU.jpg?v=new')).toBeNull()
  })
  it('ships every srcset candidate with its actual width and a valid WebP payload', async () => {
    for (const asset of Object.values(manifest)) {
      for (const variant of asset.variants) {
        const buffer = await readFile(new URL('../public' + variant.url, import.meta.url))
        const metadata = await sharp(buffer).metadata()
        expect(metadata.format).toBe('webp')
        expect(metadata.width).toBe(variant.width)
        expect(buffer.byteLength).toBe(variant.bytes)
      }
    }
  })
  it('preloads the exact hero candidates while leaving secondary pictures lazy', () => {
    const wrapper = mount(Image, {
      props: { src: 'imgur/SAbetYU.jpg', preload: true, loading: 'eager', sizes: '100vw' }
    })
    expect(heads[0].link[0].imagesrcset).toBe(wrapper.attributes('srcset'))
    expect(heads[0].link[0].imagesizes).toBe(wrapper.attributes('sizes'))
    expect(wrapper.attributes('loading')).toBe('eager')
    wrapper.unmount()
    const secondary = mount(Image, { props: { src: 'imgur/SAbetYU.jpg' } })
    expect(secondary.attributes('loading')).toBe('lazy')
    expect(heads[1].link).toEqual([])
    secondary.unmount()
  })
  it('keeps newly uploaded API pictures working through the existing image provider', () => {
    const wrapper = mount(Image, {
      props: { src: 'https://i.imgur.com/new-upload.jpg', alt: '新房型' },
      global: {
        stubs: { NuxtImg: { props: ['src', 'alt'], template: '<img :src="src" :alt="alt" />' } }
      }
    })
    expect(wrapper.attributes('src')).toBe('https://i.imgur.com/new-upload.jpg')
    expect(wrapper.attributes('alt')).toBe('新房型')
    wrapper.unmount()
  })
})
