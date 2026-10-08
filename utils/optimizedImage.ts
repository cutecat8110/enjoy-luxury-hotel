import manifest from '../data/optimized-images.json'

type ImageAsset = {
  width: number
  height: number
  variants: { width: number; url: string; bytes: number }[]
}

export function getOptimizedImage(source?: string) {
  if (!source) return null
  const url = source.replace(/^\/?imgur\//, 'https://i.imgur.com/')
  const asset = (manifest as Record<string, ImageAsset>)[url]
  if (!asset) return null
  return {
    width: asset.width,
    height: asset.height,
    src: asset.variants[asset.variants.length - 1].url,
    srcset: asset.variants.map((image) => `${image.url} ${image.width}w`).join(', ')
  }
}
