/* eslint-disable vue/one-component-per-file -- Separate mount harnesses for independent forms. */
import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import demoAccount from '../data/demo-account.json'
import ChangePwd from '../pages/user/components/changePwd.vue'
import { isDemoAccount } from '../utils/demoAccount'

let wrapper: ReturnType<typeof mount>
afterEach(() => wrapper?.unmount())

async function render(email: string) {
  const refresh = vi.fn()
  vi.stubGlobal('useNuxtApp', () => ({ $Swal: { fire: vi.fn() }, $validator: {} }))
  vi.stubGlobal('useStyleStore', () => ({}))
  vi.stubGlobal('useApi', () => ({
    updateUserApi: () => Promise.resolve({ pending: ref(false), refresh })
  }))
  wrapper = mount(
    defineComponent({
      components: { ChangePwd },
      setup: () => ({ user: { _id: 'demo', email } }),
      template: '<Suspense><ChangePwd :user="user" /></Suspense>'
    }),
    {
      global: {
        stubs: {
          VForm: {
            template: '<form @submit.prevent="$emit(\'submit\')"><slot :errors="{}" /></form>'
          },
          UIButton: { props: ['text'], template: '<button type="button">{{ text }}</button>' },
          UIInput: { template: '<input />' },
          CUserData: true
        }
      }
    }
  )
  await flushPromises()
  return refresh
}

it('locks the demo credential form and ignores direct submit events', async () => {
  const refresh = await render(demoAccount.email)
  expect(wrapper.text()).toContain('展示帳號無法修改帳密')
  expect(wrapper.find('button').exists()).toBe(false)
  await wrapper.get('form').trigger('submit')
  expect(refresh).not.toHaveBeenCalled()
  expect(isDemoAccount(' ' + demoAccount.email.toUpperCase() + ' ')).toBe(true)
})

it('ordinary members retain the reset action and credential form', async () => {
  await render('member@example.com')
  expect(wrapper.text()).not.toContain('展示帳號無法修改帳密')
  await wrapper.get('button').trigger('click')
  expect(wrapper.findAll('input')).toHaveLength(3)
  expect(wrapper.text()).toContain('儲存設定')
})

it('blocks demo password recovery and displays the reason in the active form', async () => {
  const { default: Forgot } = await import('../pages/auth/components/forgot.vue')
  const { default: UIInput } = await import('../components/UI/UIInput.vue')
  const { Form, Field, ErrorMessage } = await import('vee-validate')
  const refresh = vi.fn()
  vi.stubGlobal('useNuxtApp', () => ({
    $Swal: { fire: vi.fn() },
    $validator: { isEmail: (value: string) => /^[^@]+@[^@]+\.[^@]+$/.test(value) }
  }))
  vi.stubGlobal('useStyleStore', () => ({}))
  vi.stubGlobal('useApi', () => ({
    checkEmailApi: () => Promise.resolve({ pending: ref(false), refresh }),
    forgotPwdApi: () => Promise.resolve({ pending: ref(false), refresh }),
    getEmailCodeApi: vi.fn()
  }))
  wrapper = mount(
    defineComponent({ components: { Forgot }, template: '<Suspense><Forgot /></Suspense>' }),
    {
      global: {
        components: { VForm: Form, VField: Field, VErrorMessage: ErrorMessage, UIInput },
        stubs: {
          UIModal: {
            props: ['modelValue'],
            template: '<div v-if="modelValue"><slot name="header"/><slot name="form"/></div>'
          },
          UIButton: {
            props: ['text', 'type'],
            template: '<button :type="type || \'button\'">{{ text }}</button>'
          }
        }
      }
    }
  )
  await flushPromises()
  await wrapper.get('button').trigger('click')
  await wrapper.get('input').setValue(demoAccount.email)
  await flushPromises()
  await vi.waitFor(() => expect(wrapper.text()).toContain('展示帳號無法修改帳密'))
  await wrapper.get('form').trigger('submit')
  await wrapper.findComponent(Form).vm.validate()
  await flushPromises()
  expect(refresh).not.toHaveBeenCalled()
  expect(wrapper.text()).toContain('展示帳號無法修改帳密')
  await wrapper.get('input').setValue('member@example.com')
  await wrapper.get('form').trigger('submit')
  await vi.waitFor(() => expect(refresh).toHaveBeenCalledTimes(1))
  expect(wrapper.text()).not.toContain('展示帳號無法修改帳密')
})
