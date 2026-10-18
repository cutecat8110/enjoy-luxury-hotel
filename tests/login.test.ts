import { email, required } from '@vee-validate/rules'
import { flushPromises, mount } from '@vue/test-utils'
import { ErrorMessage, Field, Form, defineRule } from 'vee-validate'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { defineComponent, ref } from 'vue'
import Button from '../components/UI/UIButton.vue'
import Input from '../components/UI/UIInput.vue'
import demoAccount from '../data/demo-account.json'
import Login from '../pages/auth/login.vue'

vi.mock('../pages/auth/components/forgot.vue', () => ({
  default: { template: '<button type="button">忘記密碼</button>' }
}))
defineRule('required', required)
defineRule('email', email)

let wrapper: ReturnType<typeof mount>
let hooks: any
let pending: ReturnType<typeof ref<boolean>>
let refresh: ReturnType<typeof vi.fn>
let navigate: ReturnType<typeof vi.fn>
let auth: { email: string; userName: string; token: string; id: string }

beforeEach(() => {
  pending = ref(false)
  refresh = vi.fn()
  navigate = vi.fn()
  auth = { email: '', userName: '', token: '', id: '' }
  vi.stubGlobal('definePageMeta', vi.fn())
  vi.stubGlobal('useAuthStore', () => auth)
  vi.stubGlobal('useCommonStore', () => ({ routerGuide: '/user/orders' }))
  vi.stubGlobal('navigateTo', navigate)
  vi.stubGlobal('useApi', () => ({
    loginApi: (options: any) => {
      hooks = options
      return Promise.resolve({ pending, refresh })
    }
  }))
})
afterEach(() => wrapper?.unmount())

async function renderLogin() {
  wrapper = mount(
    defineComponent({ components: { Login }, template: '<Suspense><Login /></Suspense>' }),
    {
      global: {
        components: {
          VForm: Form,
          VField: Field,
          VErrorMessage: ErrorMessage,
          UIInput: Input,
          UIButton: Button
        },
        stubs: {
          CAuthTitle: true,
          UICheckbox: true,
          NuxtLink: { template: '<a><slot /></a>' },
          Icon: true
        }
      }
    }
  )
  await flushPromises()
}

it('fills the dedicated account without submitting and clears previous field errors', async () => {
  await renderLogin()
  hooks.onResponseError({ response: { _data: { message: '此使用者不存在' } } })
  await flushPromises()
  expect(wrapper.text()).toContain('電子信箱 不存在')
  const emailField = wrapper.get('input[type="email"]')
  expect(emailField.attributes('aria-invalid')).toBe('true')
  const errorId = emailField.attributes('aria-describedby')
  expect(wrapper.get(`[id="${errorId}"]`).text()).toBe('電子信箱 不存在')
  await wrapper.get('button[aria-label="帶入帳密"]').trigger('click')
  await flushPromises()
  expect((wrapper.get('input[type="email"]').element as HTMLInputElement).value).toBe(
    demoAccount.email
  )
  expect((wrapper.get('input[type="password"]').element as HTMLInputElement).value).toBe(
    demoAccount.password
  )
  expect(wrapper.text()).not.toContain('電子信箱 不存在')
  expect(emailField.attributes('aria-invalid')).toBeUndefined()
  expect(emailField.attributes('aria-describedby')).toBeUndefined()
  expect(refresh).not.toHaveBeenCalled()
  expect(wrapper.get('[role="status"]').text()).toBe('已帶入帳密')
  expect(wrapper.find('label button').exists()).toBe(false)
})

it('locks the preset and fields during login without changing typed credentials', async () => {
  await renderLogin()
  await wrapper.get('input[type="email"]').setValue('visitor@example.com')
  pending.value = true
  await flushPromises()
  expect(wrapper.get('button[aria-label="帶入帳密"]').attributes('disabled')).toBeDefined()
  expect(wrapper.get('input[type="email"]').attributes('disabled')).toBeDefined()
  expect(wrapper.get('button[type="submit"]').attributes('disabled')).toBeDefined()
  await wrapper.get('button[aria-label="帶入帳密"]').trigger('click')
  expect(hooks.body.value.email).toBe('visitor@example.com')
  expect(refresh).not.toHaveBeenCalled()
})

it('submits the filled account and preserves the requested member destination', async () => {
  await renderLogin()
  await wrapper.get('button[aria-label="帶入帳密"]').trigger('click')
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  await vi.waitFor(() => expect(refresh).toHaveBeenCalledTimes(1))
  expect(hooks.body.value).toEqual(demoAccount)
  await hooks.onResponse({
    response: {
      status: 200,
      _data: { token: 'test-token', result: { name: '展示旅人', _id: 'demo-id' } }
    }
  })
  expect(auth).toEqual({ email: '', userName: '展示旅人', token: 'test-token', id: 'demo-id' })
  expect(navigate).toHaveBeenCalledWith('/user/orders')
})
