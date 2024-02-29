// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ["vue-datepicker-next"],
  },
  plugins: [
    // your other plugins...
    { src: "~/plugins/vue-datepicker", mode: "client" }, // 파일명 및 경로는 실제로 사용하는 파일에 맞게 수정
    { src: "~/plugins/vue-final-modal", mode: "client" },
    { src: "~/plugins/vue-drag-resize", mode: "client" },
  ],
  modules: ["dayjs-nuxt", "@nuxtjs/strapi"],
  strapi: {
    url: "http://localhost:1337",
  },
  dayjs: {
    plugins: ["isBetween", "isSameOrBefore", "isSameOrAfter"],
  },
  css: ["vue-final-modal/style.css"],
});
