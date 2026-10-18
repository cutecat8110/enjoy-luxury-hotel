# 享樂酒店｜旅館訂房

![Node](https://img.shields.io/badge/Node.js-v22_LTS-brightgreen.svg)
![Vue](https://img.shields.io/badge/Vue.js-v3-blue.svg)
![Nuxt3](https://img.shields.io/badge/Nuxt-v3-dodgerblue.svg)
![Tailwindcss](https://img.shields.io/badge/Tailwindcss-v3-deepskyblue.svg)

房型瀏覽、會員管理與訂房流程，使用 Nuxt 3 串接後端 API。

**[Demo](https://enjoy-luxury-hotel.onrender.com/)** · [會員登入](https://enjoy-luxury-hotel.onrender.com/auth/login) · [設計稿](https://www.figma.com/design/JfhEX5JHpFTzJphireJols/%E9%85%92%E5%BA%97%E8%A8%82%E6%88%BF%E7%B6%B2%E7%AB%99?node-id=0-1&t=WolCT4gcKPy5eVyD-1) · [API 文件](https://enjoy-luxury-hotel-back.onrender.com/swagger/)

![享樂酒店首頁與訂房入口](public/demo.png)

<details>
<summary>使用說明</summary>

鑰匙可帶入測試帳號。共用帳號的帳密固定，請勿填入個人資訊。

免費服務冷啟動可能需要等待；訂房逾時請先查看會員訂單。忘記密碼寄信目前不可用；未提供庫存控管、付款或訂房通知郵件。

</details>

<details>
<summary>開發、測試與部署</summary>

```sh
nvm use
npm ci
cp .env.example .env
# 將 NUXT_PUBLIC_API_BASE 設為後端網址，例如 http://127.0.0.1:3005
npm run dev
```

正式建置驗證：`npm run typecheck`、`npm test`、`npm run build`，接著以 `NUXT_PUBLIC_API_BASE=http://127.0.0.1:3005 npm start` 預覽。Node 固定 22 LTS。隔離 API 使用後端專案的 `tests/preview.ts`；不連接正式 MongoDB，不寄出真實郵件。

### 圖片載入

- 原有照片預先轉成多尺寸 WebP，放在 `public/optimized-images/`，以內容雜湊檔名提供一年快取；部署和瀏覽時不重新下載或轉檔。
- `CImage` 使用實際尺寸的原生 srcset；主視覺使用相同候選預載入，其他圖片預設 lazy。新增的 API 圖片若沒有對應資產，仍使用 Nuxt Image，不改資料庫內容。
- 更新原圖時，調整 `scripts/image-sources.json` 後執行 `npm run images:optimize`；提交更新的 `data/optimized-images.json` 與圖片資產。腳本保留原圖比例、不放大、不裁切，原始下載快取在已忽略的 `.cache/image-originals/`。來源網址相同而內容更新時，先移除對應本機快取再重跑。
- `npm test` 會驗證所有候選檔案存在、WebP 格式與 srcset 像素寬度一致；圖片前後大小與瀏覽器驗證見 QA_CHANGELOG。

### 部署

- 本作品使用 Nuxt SSR、圖片處理及 `/citys`、`/district` 路由，沿用 Render Docker Web Service，網址不變；不切換成純 GitHub Pages。
- Render 前後端來源使用各自的 `main`。先發布後端並驗證，再發布前端；既有資料庫、環境變數與免費方案保留。
- 前端必要環境變數為 `NUXT_PUBLIC_API_BASE`；它是公開 API 網址，不應放入資料庫或寄信密碼。
- 免費 Render 會休眠，請求等待上限 90 秒，寫入操作不自動重送。若訂房連線逾時，先查會員訂單再決定是否重試。
- 忘記密碼原本依賴 Gmail SMTP；Render 免費方案封鎖 SMTP，尚未啟用替代寄信服務。失敗會保留表單並顯示錯誤，不會誤報成功。
- 原作未實作庫存、付款與訂房通知郵件；成功頁的寄信文字是原有展示內容。

</details>

<details>
<summary>技術與套件</summary>

[Vue 3](https://vuejs.org/) · [TypeScript](https://www.typescriptlang.org/) · [Tailwind CSS](https://tailwindcss.com/) · [Google Maps](https://www.npmjs.com/package/@googlemaps/js-api-loader) · [vee-validate](https://vee-validate.logaretm.com/v4/) · [dayjs](https://day.js.org/) · [GSAP](https://greensock.com/gsap/) · [nuxt-swiper](https://swiperjs.com/) · [SweetAlert](https://sweetalert.js.org/) · [v-calendar](https://vcalendar.io/) · [Validator](https://github.com/validator/validator.js) · [vue-easy-lightbox](https://github.com/shenxianliang/vue-easy-lightbox) · [VueUse](https://vueuse.org/)

</details>

[QA 紀錄](QA_CHANGELOG.md) · [介面設計規範](DESIGN_GUIDELINES.md)
