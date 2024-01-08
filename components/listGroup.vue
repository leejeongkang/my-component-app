<template>
    <div style="width: 300px;">
        <ul>
        <li v-for="option in options" :key="option.value" @click="handleSelect(option)">
          {{ option[labelKey] }}
        </li>
      </ul>
    </div>
    
  </template>

<script lang="ts">
import { defineComponent } from 'vue';
import { selectComposition } from '@/components/composables/selectComposition';

export default defineComponent({
  props: ['labelKey', 'valueKey', 'disabled', 'options'],
  setup(props, { emit }) {
    const { selectedValue, handleSelect, toggleList, isShowBox } = selectComposition({
      ...props,  // props를 넘겨줌
      onSelect: (value: string | number) => {
        emit("select", value);
      },
    });

    return {
      selectedValue,
      handleSelect,
      toggleList,
      isShowBox,
    };
  },
});
</script>