<template>
  <div class="step-container">
    <div
      v-for="(item, index) in data"
      @click="clickStep(index)"
      class="flex-item"
    >
      <div>
        <span :class="{ 'current-step': changeCurrentTabClass(index) }">
          {{ item[labelKey] }}
        </span>
      </div>
    </div>
    <slot :name="data[currentIdx][valueKey]"></slot>
    <div v-if="showBtn">
      <button @click="moveItem(currentIdx - 1)" :disabled="currentIdx === 0">
        이전</button
      ><button
        @click="moveItem(currentIdx + 1)"
        :disabled="currentIdx + 1 >= data.length"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, ref } from "vue";
import { ComparisonOperator } from "@/components/types/comparisonOperator";
import type { PropType } from "vue";
const INDEX = "index";
const VALUE = "value";

const props = defineProps({
  data: {
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
    type: [Number, String],
    default: 0,
  },
  currentItemType: {
    /**
     * type: String as PropType<typeof INDEX | typeof VALUE>,
     * 첫 번째 접근 방식에서 typeof INDEX | typeof VALUE는 INDEX 및 VALUE 상수의 유형을 취하고, 이들을 문자열 리터럴 유형인 "index" | "value"으로 결합합니다.
     * 두 번째 접근 방식에서는 직접 문자열 리터럴 유형을 지정하므로 INDEX와 VALUE 상수를 사용하는 것보다 더 직접적입니다.
     * 따라서 두 접근 방식 모두 동일한 결과를 생성하지만, 두 번째 접근 방식이 더 직관적이고 간결합니다. 일반적으로 두 번째 접근 방식을 선호합니다.
     */
    type: String as PropType<"index" | "value">,
    default: INDEX,
  },
  comparison: {
    type: String as PropType<"equal" | "greater">,
    default: ComparisonOperator.EQUAL,
  },
});
const emit = defineEmits<{ (e: "change", item: number | string): void }>();
const currentIdx = ref();

const { currentItem, currentItemType, comparison, data, valueKey } = props;
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
function clickStep(index: number) {
  if (currentIdx.value < index) {
    return;
  }
  return moveItem(index);
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
