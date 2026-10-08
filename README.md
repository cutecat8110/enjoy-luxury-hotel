# 享樂酒店 - 旅館訂房網

> `portfolio/qa` 保留原設計與流程，修正註冊、會員、訂房、圖片及 RWD 缺陷。完整問題與驗證範圍見 [QA_CHANGELOG.md](QA_CHANGELOG.md)。

## QA 分支本機預覽

```sh
nvm use
npm ci
cp .env.example .env
# 將 NUXT_PUBLIC_API_BASE 設為後端網址，例如 http://127.0.0.1:3005
npm run dev
```

正式建置驗證：`npm run typecheck`、`npm test`、`npm run build`，接著以 `NUXT_PUBLIC_API_BASE=http://127.0.0.1:3005 npm start` 預覽。Node 固定 22 LTS。隔離 API 使用相鄰私人後端專案的 `tests/preview.ts`；不連接正式 MongoDB，不寄出真實郵件。

## 部署與既有限制

- 本作品使用 Nuxt SSR、圖片處理及 `/citys`、`/district` 路由，沿用 Render Docker Web Service，網址不變；不切換成純 GitHub Pages。
- Render 前後端來源使用各自的 `portfolio/qa`。先發布後端並驗證，再發布前端；既有資料庫、環境變數與免費方案保留。
- 前端必要環境變數為 `NUXT_PUBLIC_API_BASE`；它是公開 API 網址，不應放入資料庫或寄信密碼。
- 免費 Render 會休眠，請求等待上限 90 秒，寫入操作不自動重送。若訂房連線逾時，先查會員訂單再決定是否重試。
- 忘記密碼原本依賴 Gmail SMTP；Render 免費方案封鎖 SMTP，尚未啟用替代寄信服務。失敗會保留表單並顯示錯誤，不會誤報成功。
- 原作未實作庫存、付款與訂房通知郵件；成功頁的寄信文字是原有展示內容。

以下保留原作介紹。

![Node](https://img.shields.io/badge/Node.js-v22_LTS-brightgreen.svg)
![Vue](https://img.shields.io/badge/Vue.js-v3-blue.svg)
![Nuxt3](https://img.shields.io/badge/Nuxt-v3-dodgerblue.svg)
![Tailwindcss](https://img.shields.io/badge/Tailwindcss-v3-deepskyblue.svg)

> 這是一個豪華的旅館訂房網站，專為顧客提供舒適的住宿環境。您可以輕鬆查詢房型與設施，並快速完成訂房流程，享受無與倫比的服務與體驗。

![](https://cutecat8110.github.io/enjoy-luxury-hotel/img/demo.png)

## 📋 專案概述

此專案旨在練習 TypeScript，使用 Nuxt 3 和 Tailwind CSS 進行開發。<br/>整個專案涵蓋切版、API 串接等前端工作，並專注於展示豪華的住宿體驗。網站提供詳細的房型資訊、設施介紹，並具備簡便的訂房流程，旨在提升前端開發能力和技術熟練度，打造直覺易用且吸引人的使用者介面。

- [設計稿](https://www.figma.com/design/JfhEX5JHpFTzJphireJols/%E9%85%92%E5%BA%97%E8%A8%82%E6%88%BF%E7%B6%B2%E7%AB%99?node-id=0-1&t=WolCT4gcKPy5eVyD-1)
- [API](https://enjoy-luxury-hotel-back.onrender.com/swagger/)
- [Demo](https://enjoy-luxury-hotel.onrender.com/)

## 🌸 啟動指南

```bash
# 取得專案
git clone https://github.com/cutecat8110/enjoy-luxury-hotel.git

# 設定環境
# 複製 .env.example 改為 .env
cp .env.example .env

# 安裝依賴
npm install

# 啟動開發環境
npm run dev
```

## 🔨 核心技術

<table>
    <tbody>
    <tr>
        <td>
        <a href="https://vuejs.org/"> Vue 3 </a>
        </td>
        <td>JavaScript 框架</td>
    </tr>
    <tr>
        <td>
        <a href="https://www.typescriptlang.org/"> TypeScript </a>
        </td>
        <td>JavaScript 的超集</td>
    </tr>
    <tr>
        <td>
        <a href="https://tailwindcss.com/"> Tailwind CSS </a>
        </td>
        <td>CSS 框架</td>
    </tr>
    </tbody>
</table>

<br />

## 🛠️ 擴展套件

<table>
    <tbody>
        <tr>
            <td>
                <a href="https://www.npmjs.com/package/@googlemaps/js-api-loader"> Google Maps </a>
            </td>
            <td>簡化地圖功能的載入，提升使用者體驗。</td>
        </tr>
        <tr>
            <td>
                <a href="https://vee-validate.logaretm.com/v4/"> vee-validate </a>
            </td>
            <td>簡化表單驗證的 Vue.js 庫，提升表單安全性和可靠性。</td>
        </tr>
        <tr>
            <td>
                <a href="https://day.js.org/"> dayjs </a>
            </td>
            <td>輕量級的日期處理庫，簡化日期操作。</td>
        </tr>
        <tr>
            <td>
                <a href="https://greensock.com/gsap/"> GSAP </a>
            </td>
            <td>高效動畫庫，能創建流暢的動畫效果。</td>
        </tr>
        <tr>
            <td>
                <a href="https://swiperjs.com/"> nuxt-swiper </a>
            </td>
            <td>用於在 Nuxt 應用中實現輪播/滑動組件。</td>
        </tr>
        <tr>
            <td>
                <a href="https://sweetalert.js.org/"> SweetAlert </a>
            </td>
            <td>用於創建美觀的提示框，改善用戶互動。</td>
        </tr>
        <tr>
            <td>
                <a href="https://vcalendar.io/"> v-calendar </a>
            </td>
            <td>功能豐富的日曆和日期選擇組件，便於管理日期。</td>
        </tr>
        <tr>
            <td>
                <a href="https://github.com/validator/validator.js"> Validator </a>
            </td>
            <td>驗證用戶輸入的數據，保證數據完整性。</td>
        </tr>
        <tr>
            <td>
                <a href="https://github.com/shenxianliang/vue-easy-lightbox"> vue-easy-lightbox </a>
            </td>
            <td>輕鬆實現圖片燈箱效果的組件。</td>
        </tr>
        <tr>
            <td>
                <a href="https://vueuse.org/"> VueUse </a>
            </td>
            <td>Vue 3 Composition API 的實用函數庫，提供多種實用功能。</td>
        </tr>
    </tbody>
</table>
