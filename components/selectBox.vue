// src/components/SelectBox.vue
<template>
  <div style="width: 300px; height: 30px">
    <button @click="handleToggleList" style="width: 100%; height: 100%">
      {{ selectedLabel }}
    </button>
    <ul v-show="isShowBox">
      <li
        v-for="option in options"
        :key="option[valueKey]"
        @click="handleSelect(option)"
      >
        {{ option[labelKey] }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { selectComposition } from "@/components/composables/selectComposition.ts";

export default defineComponent({
  props: ["labelKey", "valueKey", "disabled", "options"],
  setup(props, { emit }) {
    // select 공통 composition
    const {
      selectedLabel,
      selectedValue,
      handleSelect,
      handleToggleList,
      isShowBox,
    } = selectComposition({
      ...props, // props를 넘겨줌
      onSelect: (value: string | number) => {
        emit("select", value);
      },
      // 공통 Composition API에서는 컴포넌트의 기본 기능을 제공하지만,
      // 기본 기능으로 부족할 시에는 여기서 따로 개발한다.
      // 이 기능 따로 컴포넌트 전용 Composition API로 개발한다.
      // toggleList(isShowBox) {
      //   // 기능 재정의
      // },
    });

    return {
      selectedLabel,
      selectedValue,
      handleSelect,
      handleToggleList,
      isShowBox,
    };
  },
});
</script>
