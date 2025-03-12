import Aura from "@primeuix/themes/aura";
export default defineNuxtConfig({
  compatibilityDate: "2025-03-11",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@primevue/nuxt-module"],
  css: ["primeicons/primeicons.css"],
  primevue: {
    options: {
      ripple: true, // Bật hiệu ứng Ripple
      inputVariant: "filled", // Kiểu input mặc định
        theme: {
            preset: Aura,
            options: {
                prefix: "p", // Prefix class CSS
                darkModeSelector: "system", // Hỗ trợ dark mode tự động
                cssLayer: false
            }
        }
    },
    autoImport: true, // Tự động import components
},


});