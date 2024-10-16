// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  typescript: {
    typeCheck: false
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
    head: {
      title: '享樂酒店', // 網站標題
      htmlAttrs: {
        lang: 'zh-Hant' // 設定語言
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }], // 網站圖示

      meta: [
        { charset: 'utf-8' }, // 字符編碼
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }, // 響應式設計
        {
          name: 'description',
          content: '這是一個關於享樂酒店的豪華住宿預訂網站，提供獨特的房型選擇。'
        }, // 網站描述
        { name: 'keywords', content: '享樂酒店, 酒店預訂, 豪華住宿, 房型' }, // 關鍵字
        { name: 'author', content: 'Hao' }, // 作者
        { name: 'robots', content: 'index, follow' }, // 搜尋引擎索引
        { property: 'og:title', content: '享樂酒店' }, // Open Graph 標題
        {
          property: 'og:description',
          content: '這是一個關於享樂酒店的豪華住宿預訂網站，提供獨特的房型選擇。'
        }, // Open Graph 描述
        { property: 'og:image', content: '你的網站封面圖像URL' }, // Open Graph 圖片
        { property: 'og:url', content: 'https://enjoy-luxury-hotel.onrender.com/' }, // Open Graph 網址
        { property: 'og:type', content: 'website' } // Open Graph 類型
      ]
    },
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
    domains: ['i.imgur.com'],
    alias: {
      imgur: 'https://i.imgur.com'
    },
    screens: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      '2xl': 1400
    }
  }
})
