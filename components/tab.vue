<template>
  <div>
    <div class="flex-container">
      <div
        v-for="(item, index) in data"
        @click="
          handleMoveItem(getValueBasedOnType(item[props.valueKey], index))
        "
        class="flex-tab"
      >
        <div>
          <span
            :class="{
              'current-tab': classCurrentTab(item[props.valueKey], index),
            }"
          >
            {{ item[labelKey] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// defineProps, emit 찾아보기
import { navigationComposition } from "@/components/composables/navigationComposition.ts";
import { NavigationItemEnum } from "@/components/types/navigationItemEnum";
import { ComparisonOperator } from "@/components/types/comparisonOperator";
import type { PropType } from "vue";
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
    type: [Number, String],
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
handleMoveItem(props.currentItem);

/**
 * currentItemType 이 String 일 경우 에는 EQUAL 사용 권장
 * @param value
 * @param index
 */
const classCurrentTab = (value: string, index: number): boolean => {
  let clickedItem: string | number = getValueBasedOnType(value, index);
  let comparison: ComparisonOperator;
  if (props.currentItemType === NavigationItemEnum.Number) {
    comparison = props.comparison as ComparisonOperator;
  } else {
    comparison = ComparisonOperator.EQUAL;
  }
  // NOTE: as number -> 컴파일 시 변수를 num 으로 강제 변환
  return compareValues(props.currentItem, clickedItem, comparison);
};
</script>

<style>
.flex-container {
  display: flex;
  /* Add your flex container styles here */
}

.flex-tab {
  cursor: pointer;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: #f5f5f5;
  /* Add your tab styles here */
}

.current-tab {
  color: deepskyblue;
  border: 5px;
}
</style>
<!--TODO: activeItem 자체를 변경하고 바로 프롭스로 변경하기 class fucntion도-->
<!--내부에서-->
