import { LoadingPlugin, ActiveLoader, useLoading } from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { defineNuxtPlugin } from "nuxt/app";
import { ref, h } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(LoadingPlugin);

  const count = ref(0);
  let load: ActiveLoader | null;
  let timerId: number = 0;

  const loading = useLoading({});

  function start(isFullPage: boolean): void {
    if (count.value === 0) {
      if (!load) {
        load = loading.show(
          {
            isFullPage: isFullPage,
            // canCancel: true, // default false
            // color: "#000000",
            // loader: "spinner",
            // width: 64,
            // height: 64,
            // backgroundColor: "#ffffff",
            // opacity: 0.5,
            // zIndex: 999,
          },
          {
            // default: h("your-custom-loader-component"),
          },
        );
      }
    }
    count.value++;
  }

  function finish(): void {
    count.value--;
    if (count.value > 0) {
      return;
    }

    if (timerId) {
      clearTimeout(timerId);
    }
    // @ts-ignore
    timerId = setTimeout(() => {
      if (load) {
        load!.hide();
        load = null;
      }
      count.value = 0;
    }, 900);
  }

  const loader: object = {
    loading,
    start,
    finish,
  };

  return {
    //  custom- object return 할 경우 에는 provide 항목에 제공
    provide: {
      loader,
    },
  };
});
