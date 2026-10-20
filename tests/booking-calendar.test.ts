import { flushPromises, mount } from '@vue/test-utils'
import VCalendar from 'v-calendar'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import BookingCalendar from '../components/UI/UIBookingCalendar.vue'
import { stayNights, validStay } from '../utils/booking'

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-10-20T00:00:00Z'))
  // jsdom has no layout observer; layout is checked in the browser round.
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  )
})

afterEach(() => {
  vi.useRealTimers()
})

const calendar = () =>
  mount(BookingCalendar, {
    props: { modelValue: { start: '2026/11/10', end: '2026/11/12' } },
    attrs: { 'initial-page': { year: 2026, month: 11 }, transition: 'none', locale: 'zh-TW' },
    global: { plugins: [VCalendar] }
  })

describe('booking calendar controls', () => {
  it.each(['Enter', ' '])('%s activates the month arrow only once', async (key) => {
    const wrapper = calendar()
    await flushPromises()
    expect(wrapper.find('.vc-title').text()).toBe('11月 2026')
    const next = wrapper.find('button.vc-next')
    expect(next.text()).toBe('下一組月份')

    // jsdom does not synthesize the browser's default button click.
    // Dispatch keydown then click to reproduce real keyboard activation.
    await next.trigger('keydown', { key })
    await flushPromises()
    expect(wrapper.find('.vc-title').text()).toBe('11月 2026')
    await next.trigger('click')
    await flushPromises()
    expect(wrapper.find('.vc-title').text()).toBe('12月 2026')
    wrapper.unmount()
  })

  it('labels year navigation without replacing the calendar controls', async () => {
    const wrapper = calendar()
    await flushPromises()
    await wrapper.find('button.vc-title').trigger('click')
    await flushPromises()
    expect(wrapper.find('button.vc-nav-arrow.is-left').text()).toBe('上一組年份')
    expect(wrapper.find('button.vc-nav-arrow.is-right').text()).toBe('下一組年份')
    wrapper.unmount()
  })

  it('emits the original string range when choosing booking dates', async () => {
    const wrapper = calendar()
    await flushPromises()
    await wrapper.find('[aria-label="2026年11月15日星期日"]').trigger('click')
    await wrapper.find('[aria-label="2026年11月17日星期二"]').trigger('click')
    await flushPromises()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([
      { start: '2026/11/15', end: '2026/11/17' }
    ])
    wrapper.unmount()
  })
})

describe('calendar date boundaries', () => {
  it('counts nights across months, years and leap days without local DST offsets', () => {
    expect(stayNights('2026/10/31', '2026/11/02')).toBe(2)
    expect(stayNights('2026/12/31', '2027/01/02')).toBe(2)
    expect(stayNights('2028/02/28', '2028/03/01')).toBe(2)
    expect(stayNights('2027/02/28', '2027/03/01')).toBe(1)
  })

  it('uses the hotel timezone when the visitor is still on the previous day', () => {
    const now = new Date('2026-10-20T17:00:00Z')
    expect(validStay('2026/10/20', '2026/10/22', now)).toBe(false)
    expect(validStay('2026/10/21', '2026/10/22', now)).toBe(true)
  })
})
