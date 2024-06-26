module.exports = {
  env: {
    browser: true,
    es2023: true
  },
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier'],
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module'
  },
  plugins: ['prettier'],
  rules: {
    'vue/no-multiple-template-root': 'off',
    'no-undef': 'off',
    'import/order': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto' // 自動檢測並設置換行符
      }
    ]
  }
}
