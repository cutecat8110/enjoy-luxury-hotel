import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import Address from '../components/c/CAddress.vue'
import Birthday from '../components/c/CBirthday.vue'
import RequestState from '../components/c/CRequestState.vue'
import Button from '../components/UI/UIButton.vue'
import GuestCount from '../components/UI/UIGuestCount.vue'
import Modal from '../components/UI/UIModal.vue'
import Select from '../components/UI/UISelect.vue'
import { cities, districtsForCity, findDistrict, formatAddress } from '../utils/address'
import { emptyOrder, stayNights, validStay } from '../utils/booking'
import { lockModal, unlockModal } from '../utils/modal'
const stubs = { Icon: true, VField: true, VErrorMessage: true, UIInput: true }
afterEach(() => {
  document.body.innerHTML = ''
})
describe('booking invariants', () => {
  it('rejects empty, equal, reversed, past and impossible calendar dates', () => {
    const now = new Date('2026-10-08T00:00:00Z')
    for (const [a, b] of [
      ['', ''],
      ['2026/10/09', '2026/10/09'],
      ['2026/10/10', '2026/10/09'],
      ['2026/10/07', '2026/10/09'],
      ['2027/2/30', '2027/3/2']
    ])
      expect(validStay(a, b, now)).toBe(false)
    expect(validStay('2026/10/08', '2026/10/10', now)).toBe(true)
    expect(stayNights('2027/3/13', '2027/3/15')).toBe(2)
  })
  it('reset returns independent guest/address objects', () => {
    const a = emptyOrder()
    a.userInfo.address.detail = 'previous guest'
    expect(emptyOrder().userInfo.address.detail).toBe('')
  })
  it('clamps guests when selecting a smaller room', async () => {
    const wrapper = mount(GuestCount, { props: { max: 4, modelValue: 4 }, global: { stubs } })
    await wrapper.setProps({ max: 2 })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([2])
    wrapper.unmount()
  })
})
describe('registration and member address', () => {
  it('resolves the same zipcode dataset used by API validation', () => {
    expect(cities).toContain('臺北市')
    expect(districtsForCity('臺北市')).toContainEqual({
      zipcode: 100,
      city: '臺北市',
      district: '中正區'
    })
    expect(findDistrict('100')?.city).toBe('臺北市')
    expect(formatAddress({ zipcode: 100, detail: '測試 1 號' })).toBe('臺北市中正區測試 1 號')
  })
  it('changing city clears an incompatible district and supports populated member addresses', async () => {
    const address = { zipcode: 100, detail: '測試' }
    const wrapper = mount(Address, {
      props: { modelValue: address, disabled: false },
      global: { stubs, components: { UISelect: Select } }
    })
    expect(wrapper.findAll('select')[0].element.value).toBe('臺北市')
    await wrapper.findAll('select')[0].setValue('高雄市')
    expect(address.zipcode).toBe(0)
    expect(wrapper.findAll('select')[1].findAll('option').length).toBeGreaterThan(1)
    await wrapper.setProps({ modelValue: { zipcode: 104, detail: '更新' } })
    expect(wrapper.findAll('select')[0].element.value).toBe('臺北市')
    wrapper.unmount()
  })
  it('switching from a 31-day month to February clamps the day', async () => {
    const wrapper = mount(Birthday, {
      props: { modelValue: '2000-1-31' },
      global: { stubs, components: { UISelect: Select } }
    })
    await wrapper.findAll('select')[1].setValue('2')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['2000-2-29'])
    wrapper.unmount()
  })
})
describe('modal interaction', () => {
  it('closing one modal keeps another modal scroll locked', () => {
    const a = Symbol('first')
    const b = Symbol('second')
    lockModal(a)
    lockModal(b)
    unlockModal(a)
    expect(document.body.style.overflow).toBe('hidden')
    unlockModal(b)
    expect(document.body.style.overflow).toBe('')
  })
  it('inside clicks keep dialog open; Escape closes and unmount restores scroll', async () => {
    const wrapper = mount(Modal, {
      props: { modelValue: true },
      attachTo: document.body,
      slots: { default: '<button>測試按鈕</button>' },
      global: { stubs }
    })
    await nextTick()
    ;(document.querySelector('[role=dialog] button') as HTMLElement).click()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([false])
    wrapper.unmount()
    expect(document.body.style.overflow).toBe('')
  })
})

describe('unavailable data recovery', () => {
  const global = {
    components: { UIButton: Button },
    stubs: { Icon: true, NuxtLink: { props: ['to'], template: '<a :href="to"><slot /></a>' } }
  }
  it('loading does not mislead the member into thinking the order list is empty', () => {
    const wrapper = mount(RequestState, { props: { pending: true, resource: '訂單' }, global })
    expect(wrapper.text()).toContain('載入中')
    expect(wrapper.find('a').exists()).toBe(false)
    expect(wrapper.find('button').exists()).toBe(false)
    wrapper.unmount()
  })
  it('a missing order offers the order list without retrying a nonexistent record', () => {
    const wrapper = mount(RequestState, {
      props: {
        error: { statusCode: 404 },
        resource: '訂單',
        returnTo: '/user/orders',
        returnLabel: '返回我的訂單'
      },
      global
    })
    expect(wrapper.text()).toContain('找不到此訂單')
    expect(wrapper.find('a').attributes('href')).toBe('/user/orders')
    expect(wrapper.text()).not.toContain('重新載入')
    wrapper.unmount()
  })
  it('a service failure can be retried and the loading state prevents repeated clicks', async () => {
    const wrapper = mount(RequestState, {
      props: { error: { statusCode: 503 }, resource: '房型' },
      global
    })
    expect(wrapper.text()).toContain('暫時無法載入房型')
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('retry')).toHaveLength(1)
    await wrapper.setProps({ pending: true })
    expect(wrapper.find('button').exists()).toBe(false)
    wrapper.unmount()
  })
})
