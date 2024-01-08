<template>
  <div style="width: 300px;">
    <input v-model="searchInput" @input="filterOptions" placeholder="Search..." @click="toggleList">
    <ul v-show="isShowBox">
      <li v-for="option in filteredOptions" :key="option[valueKey]" @click="handleSelect(option)">
        {{ option[labelKey] }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { selectComposition } from '@/components/composables/selectComposition';

interface Option {
  [key: string]: string | number; // 또는 필요한 타입으로 변경
}

export default defineComponent({
  props: ['labelKey', 'valueKey', 'disabled', 'options'],
  setup(props, { emit }) {
    const { selectedLabel, selectedValue, handleSelect, toggleList, isShowBox } = selectComposition({
      ...props,  // props를 넘겨줌
      onSelect: (value: string | number) => {
        emit("select", value);
      },
    });

    const searchInput = ref<string>("");

    // computed를 사용하여 동적으로 필터된 옵션을 반환
    const filteredOptions = computed<Option[]>(() =>
      props.options.filter((option: Option) =>
        String(option[props.labelKey]).toLowerCase().includes(searchInput.value.toLowerCase())
      )
    );

    // filterOptions 메소드 정의
    const filterOptions = () => {
      // 아무것도 하지 않아도 될 것 같지만, 나중에 필요한 로직이 추가될 수 있습니다.
    };

    return {
      searchInput,
      handleSelect,
      toggleList,
      isShowBox,
      filteredOptions,
      filterOptions,
    };
  },
});
</script>
