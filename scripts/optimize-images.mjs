import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

// Run deliberately when source images change, never on a visitor's request or deployment.
const sources = JSON.parse(await readFile(new URL('./image-sources.json', import.meta.url)))
const output = new URL('../public/optimized-images/', import.meta.url)
const cache = new URL('../.cache/image-originals/', import.meta.url)
await mkdir(output, { recursive: true })
await mkdir(cache, { recursive: true })
const manifest = {}
let cursor = 0
await Promise.all(Array.from({ length: 3 }, async () => {
  while (cursor < sources.length) {
    const source = sources[cursor++]
    const filename = new URL(source).pathname.slice(1)
    let original
    try { original = await readFile(new URL(filename, cache)) } catch {
      const response = await fetch(source, { signal: AbortSignal.timeout(60000) })
      if (!response.ok) throw new Error(`${source}: HTTP ${response.status}`)
      original = Buffer.from(await response.arrayBuffer())
      await writeFile(new URL(filename, cache), original)
    }
    const metadata = await sharp(original).metadata()
    if (!metadata.width || !metadata.height) throw new Error(`Invalid image: ${source}`)
    const widths = [...new Set([480, 960, 1920].map(width => Math.min(width, metadata.width)))]
    const variants = []
    for (const width of widths) {
      const result = await sharp(original).rotate().resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 }).toBuffer({ resolveWithObject: true })
      const hash = createHash('sha256').update(result.data).digest('hex').slice(0, 16)
      const name = `${hash}-${result.info.width}.webp`
      await writeFile(new URL(name, output), result.data)
      variants.push({ width: result.info.width, url: `/optimized-images/${name}`, bytes: result.data.length })
    }
    manifest[source] = { width: metadata.width, height: metadata.height, originalBytes: original.length, variants }
  }
}))
await mkdir(new URL('../data/', import.meta.url), { recursive: true })
await writeFile(new URL('../data/optimized-images.json', import.meta.url),
  JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2) + '\n')
console.log(`Prepared ${sources.length} original images as responsive WebP assets.`)
