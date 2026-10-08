import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { vi } from 'vitest'
import * as Vue from 'vue'
dayjs.extend(customParseFormat)
for (const [key, value] of Object.entries(Vue)) vi.stubGlobal(key, value)
vi.stubGlobal('useNuxtApp', () => ({
  $dayjs: dayjs,
  $gsap: { to: vi.fn(), killTweensOf: vi.fn() }
}))
