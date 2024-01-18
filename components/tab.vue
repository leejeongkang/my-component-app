<template>
  <div>
    <div class="flex-container">
      <div
        v-for="(item, index) in data"
        @click="moveItem(item[props.valueKey], index)"
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

const { activeCurrentItem, compareValues, handleMoveItem } =
  navigationComposition({
    ...props,
    onChange(item: number | string): void {
      emit("change", item);
    },
  });
function moveItem(value: string, index: number): void {
  if (props.currentItemType === NavigationItemEnum.Number) {
    handleMoveItem(index);
  } else if (props.currentItemType === NavigationItemEnum.String) {
    handleMoveItem(value);
  }
}
handleMoveItem(props.currentItem);

/**
 * currentItemType 이 String 일 경우 에는 EQUAL 사용 권장
 * @param value
 * @param index
 */
const classCurrentTab = (value: string, index: number): boolean => {
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
