import type { UseFetchOptions } from 'nuxt/app'

const userAPI = {
  loginApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.post('/api/v1/user/login', options)
  },
  signupApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.post('/api/v1/user/signup', options)
  },
  forgotPwdApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.post('/api/v1/user/forgot', options)
  },
  checkLoginApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.get('/api/v1/user/check', options)
  },
  getUserApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.get('/api/v1/user', options)
  },
  updateUserApi: <T = any>(options: UseFetchOptions<T>) => {
    return useHttp.post('/api/v1/user', options)
  }
}

export default userAPI
