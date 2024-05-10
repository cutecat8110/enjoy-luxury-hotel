// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  typescript: {
    typeCheck: true
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'nuxt-swiper'
  ],

  css: ['@/assets/scss/main.scss'],

  vite: {
    vue: {
      script: {
        defineModel: true
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/scss/_variable.scss";'
        }
      }
    }
  },

  build: {
    transpile: ['@googlemaps/js-api-loader']
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      mapApiKey: process.env.MAP_API_KEY
    }
  },

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', file: 'en.json', iso: 'en-US', name: 'English' },
      { code: 'zh', file: 'zh.json', iso: 'zh-TW', name: '繁體中文' }
    ],
    lazy: true,
    defaultLocale: 'zh',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.js'
  },

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VForm',
      Field: 'VField',
      FieldArray: 'VFieldArray',
      ErrorMessage: 'VErrorMessage'
    }
  },

  image: {
    screens: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      '2xl': 1400
    }
  }
})
