import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/ko.es";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("DatePicker", DatePicker);
});
