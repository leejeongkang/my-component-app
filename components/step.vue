<template>
  <h3>현재 스텝 {{ data[currentItem][labelKey] }} Index : {{ currentItem }}</h3>
  <div class="step-container">
    <div
      v-for="(item, index) in data"
      @click="moveStep(index)"
      class="flex-item"
    >
      <div>
        <span
          :class="{
            'current-step': classCurrentStep(data[props.valueKey], index),
          }"
        >
          {{ item[labelKey] }}
        </span>
      </div>
    </div>
    <slot v-for="slot in slots" :name="slot"></slot>
    <div v-if="showBtn">
      <button
        @click="handleMoveItem(currentItem - 1)"
        :disabled="currentItem === 0"
      >
        이전</button
      ><button
        @click="handleMoveItem(currentItem + 1)"
        :disabled="currentItem + 1 >= data.length"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { defineProps } from "vue";
import { navigationComposition } from "@/components/composables/navigationComposition.ts";
import { NavigationItemEnum } from "@/components/types/navigationItemEnum";
import { ComparisonOperator } from "@/components/types/comparisonOperator";

const props = defineProps({
  data: {
    type: Array,
  },
  slots: {
    type: Array,
  },
  showBtn: {
    type: Boolean,
    default: true,
  },
  labelKey: {
    type: String,
    default: "label",
  },
  valueKey: {
    type: String,
    default: "value",
  },
  iconKey: {
    type: String,
    default: "icon",
  },
  currentItem: {
    type: Number,
    default: 0,
  },
  currentItemType: {
    type: Number as PropType<NavigationItemEnum>,
    default: NavigationItemEnum.Number,
  },
  comparison: {
    type: Number as PropType<ComparisonOperator>,
    default: ComparisonOperator.EQUAL,
  },
});
const emit = defineEmits<{ (e: "change", item: number | string): void }>();

const { getValueBasedOnType, compareValues, handleMoveItem } =
  navigationComposition({
    ...props,
    onChange(item: number | string): void {
      emit("change", item);
    },
  });
function moveStep(idx: number): void {
  if (props.currentItem < idx) return;
  return handleMoveItem(idx);
}

/**
 * currentItemType 이 String 일 경우 에는 EQUAL 사용 권장
 * TODO: String 일 경우에 index param 넣어서 모든 부등호 사용 가능 하도록 개발
 * @param value
 * @param index
 */
const classCurrentStep = (value: string, index: number): boolean => {
  let clickedItem: string | number = getValueBasedOnType(value, index);
  let comparison: ComparisonOperator;
  if (typeof clickedItem === "number") {
    comparison = props.comparison as ComparisonOperator;
  } else {
    comparison = ComparisonOperator.EQUAL;
  }
  return compareValues(props.currentItem, clickedItem, comparison);
};
</script>

<style>
.step-container {
  display: inline-block;
  margin-right: 30px;
}

.flex-item {
  display: inline-block;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 50%; /* 둥근 테두리를 만듭니다. */
  cursor: pointer;
  transition: background-color 0.3s ease; /* 배경 색상 전환에 애니메이션을 추가합니다. */
}
.current-step {
  color: orange; /* 현재 스텝에 대한 글자 색상을 여기에 지정 */
}
</style>
