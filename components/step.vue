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

const { activeCurrentItem, compareValues, handleMoveItem } =
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
 * @param value
 * @param index
 */
const classCurrentStep = (value: string, index: number): boolean => {
  let activeItem: string | number = activeCurrentItem(value, index);
  let type: ComparisonOperator;
  if (typeof activeItem === "number") {
    type = props.comparison as ComparisonOperator;
  } else {
    type = ComparisonOperator.EQUAL;
  }
  return compareValues(props.currentItem, activeItem as number, type);
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
