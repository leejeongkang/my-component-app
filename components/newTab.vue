<template>
  <div class="flex-container">
    <div
      v-for="(item, index) in data"
      @click="moveItem(index)"
      class="flex-tab"
    >
      <div>
        <span :class="{ 'current-step': changeCurrentTabClass(index) }">
          {{ item[labelKey] }}
        </span>
      </div>
    </div>
  </div>
  <slot :name="data[currentIdx][valueKey]"></slot>
</template>

<script lang="ts" setup>
// defineProps, emit 찾아보기
import { ComparisonOperator } from "@/components/types/comparisonOperator";
import { ref } from "vue";
const INDEX = "index";
const VALUE = "value";
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
  /**
   * index || value
   */
  currentItemType: {
    type: String,
    default: INDEX,
  },
  /**
   * equal | greater
   */
  comparison: {
    type: String,
    default: ComparisonOperator.EQUAL,
  },
});
const emit = defineEmits<{ (e: "change", item: number | string): void }>();
const currentIdx = ref();

const { currentItem, currentItemType, data, valueKey, comparison } = props;
if (currentItem) {
  if (currentItemType === VALUE) {
    const foundIdx = data?.findIndex(
      (item) => item[valueKey].toString() === currentItem.toString(),
    );
    if (foundIdx !== -1) {
      currentIdx.value = foundIdx;
    }
  } else {
    currentIdx.value = currentItem;
  }
}
function moveItem(index: number) {
  currentIdx.value = index;
  if (currentItemType === INDEX) {
    emit("change", index);
  } else {
    let clickedValue: string | number = (data?.[index] as any)?.[valueKey];
    emit("change", clickedValue);
  }
}
const changeCurrentTabClass = (clickedIdx: number): boolean => {
  // NOTE: as number -> 컴파일 시 변수를 num 으로 강제 변환
  switch (comparison) {
    case ComparisonOperator.GREATER_THAN_OR_EQUAL:
      return currentIdx.value >= clickedIdx;
    case ComparisonOperator.EQUAL:
      return currentIdx.value === clickedIdx;
    default:
      console.error(`Unsupported comparison operator: ${comparison}`);
      return false;
  }
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
