// src/components/SelectBox.vue
<template>
  <div style="width: 300px; height: 30px;">
    <button @click="toggleList" style="width: 100%; height: 100%">{{ selectedLabel }}</button>
    <ul v-show="isShowBox" style="position: absolute; z-index: 100;">
      <li v-for="option in options" :key="option[valueKey]" @click="handleSelect(option)">
        {{ option[labelKey] }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { selectComposition } from '@/components/composables/selectComposition.ts';

export default defineComponent({
  props: ['labelKey', 'valueKey', 'disabled', 'options'],
  setup(props, { emit }) {
    const { selectedLabel, selectedValue, handleSelect, toggleList, isShowBox } = selectComposition({
      ...props,  // props를 넘겨줌
      onSelect: (value: string | number) => {
        emit("select", value);
      },
    });

    return {
      selectedLabel,
      selectedValue,
      handleSelect,
      toggleList,
      isShowBox,
    };
  },
});
</script>
