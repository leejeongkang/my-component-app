<template>
  <VueFinalModal
    :class="modalClass"
    :content-class="contentClass"
    :modal-id="modalId"
    :display-directive="displayDirective"
    :hide-overlay="hideOverlay"
    :overlay-transition="overlayTransition"
    :content-transition="contentTransition"
    :overlay-class="overlayClass"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
    :background="background"
    :lock-scroll="lockScroll"
    :swipe-to-close="swipeToClose"
    @clickOutside="$emit('click-outside')"
    @before-open="$emit('before-open')"
    @opened="$emit('open')"
    @before-close="$emit('before-close')"
    @closed="$emit('closed')"
  >
    <ClientOnly v-if="dragAndResize">
      <VueDragResize
        :is-active="true"
        :w="elementPosition.width"
        :h="elementPosition.height"
        class="bg-100"
        @resizing="dragResize"
        @dragging="dragResize"
      >
        <header class="modal-header">
          <slot name="head"> </slot>
        </header>
        <body class="modal-body">
          <slot name="body"></slot>
        </body>
        <footer class="modal-footer">
          <slot name="foot"> </slot>
        </footer>
        <p>{{ elementPosition.top }} х {{ elementPosition.left }}</p>
        <p>{{ elementPosition.width }} х {{ elementPosition.height }}</p>
      </VueDragResize>
    </ClientOnly>
    <template v-if="!dragAndResize">
      <header class="modal-header">
        <slot name="head"> </slot>
      </header>
      <body class="modal-body">
        <slot name="body"></slot>
      </body>
      <footer class="modal-footer">
        <slot name="foot"> </slot>
      </footer>
    </template>
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import type { PropType } from "vue";

const props = defineProps({
  modalId: {
    type: String,
  },
  modalClass: {
    type: String,
    default: "custom-modal",
  },
  displayDirective: {
    type: String as PropType<"if" | "show" | "visible">,
    default: "if",
  },
  hideOverlay: {
    type: Boolean,
  },
  overlayTransition: {
    type: String as PropType<
      | string
      | "vfm-fade"
      | "vfm-slide-down"
      | "vfm-slide-up"
      | "vfm-slide-right"
      | "vfm-slide-left"
    >,
  },
  contentTransition: {
    type: String as PropType<
      | string
      | "vfm-fade"
      | "vfm-slide-down"
      | "vfm-slide-up"
      | "vfm-slide-right"
      | "vfm-slide-left"
    >,
  },
  overlayClass: {
    type: [Object, Array, String] as unknown as PropType<any>,
  },
  contentClass: {
    type: [Object, Array, String] as unknown as PropType<any>,
    default: "content-modal",
  },
  clickToClose: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  escToClose: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  background: {
    type: String as PropType<"interactive" | "non-interactive">,
    default: "non-interactive",
  },
  lockScroll: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  swipeToClose: {
    type: String as PropType<"none" | "up" | "right" | "down" | "left">,
    default: "none",
  },
  dragAndResize: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  modalElementPosition: {
    type: Object as PropType<Rect>,
    default: {
      width: 300,
      height: 300,
      top: 0,
      left: 0,
    },
  },
});
const emit = defineEmits<{
  (e: "click-outside"): void;
  (e: "before-open"): void;
  (e: "open"): void;
  (e: "before-close"): void;
  (e: "closed"): void;
}>();
interface Rect {
  left: number;
  top: number;
  width: number;
  height: number;
}
const elementPosition: Rect = reactive({
  width: 300,
  height: 300,
  top: 0,
  left: 0,
});

if (props.modalElementPosition) {
  Object.assign(props.modalElementPosition, elementPosition);
}
function dragResize(newRect: Rect) {
  elementPosition.width = newRect.width;
  elementPosition.height = newRect.height;
  elementPosition.top = newRect.top;
  elementPosition.left = newRect.left;
}
</script>

<style>
.custom-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-modal {
  display: flex;
  flex-direction: column;
  max-width: 28rem; /* Tailwind의 max-w-xl은 28rem입니다. */
  margin-left: 1rem; /* Tailwind의 mx-4은 왼쪽/오른쪽 여백에 1rem을 사용합니다. */
  margin-right: 1rem;
  padding: 1rem; /* Tailwind의 p-4는 모든 방향의 padding에 1rem을 사용합니다. */
  background-color: #fff; /* Tailwind의 bg-white는 #fff입니다. */
  border: 1px solid #e5e7eb; /* Tailwind의 border는 1px의 solid #e5e7eb입니다. */
  border-radius: 0.375rem; /* Tailwind의 rounded-lg는 border-radius: 0.375rem입니다. */
  gap: 0.5rem; /* Tailwind의 space-y-2는 요소들 사이의 간격을 0.5rem으로 설정합니다. */
}
.button {
  margin-top: 0.25rem; /* Tailwind의 mt-1은 0.25rem입니다. */
  margin-left: auto; /* Tailwind의 ml-auto는 왼쪽 여백을 자동으로 설정합니다. */
  padding-left: 0.5rem; /* Tailwind의 px-2는 좌우 padding에 0.5rem을 사용합니다. */
  padding-right: 0.5rem;
  border-width: 1px; /* Tailwind의 border는 1px의 테두리를 가집니다. */
  border-style: solid; /* Tailwind의 border는 solid 스타일을 가집니다. */
  border-radius: 0.375rem; /* Tailwind의 rounded-lg는 border-radius: 0.375rem입니다. */
}
.modal-header {
  background-color: deepskyblue; /* 연보라색 배경색 설정 */
  padding: 10px;
}
.modal-body {
  background-color: white; /* 검정색 텍스트 색상 설정 */
}
.modal-footer {
  background-color: deepskyblue; /* 연보라색 배경색 설정 */
  padding: 10px;
}
/* 추가로 헤더와 푸터에 흰색 텍스트 색상을 설정합니다 */
.modal-header h5,
.modal-footer h3 {
  color: #ffffff; /* 흰색 텍스트 색상 설정 */
}
</style>
