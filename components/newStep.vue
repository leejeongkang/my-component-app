<template>
  <h3>현재 스텝 {{ data[currentItem][labelKey] }} Index : {{ currentIdx }}</h3>
  <div class="step-container">
    <div
      v-for="(item, index) in data"
      @click="clickStep(index)"
      class="flex-item"
    >
      <div>
        <span
          :class="{ 'current-step': classCurrentStep(index) }"
        >
          {{ item[labelKey] }}
        </span>
      </div>
    </div>
    <!-- hash tag 사용 -->
    <slot :name="data[currentIdx][valueKey]"></slot>
    <div v-if="showBtn">
      <button
        @click="moveItem(currentIdx - 1)"
        :disabled="currentIdx === 0"
      >
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
import type { PropType } from "vue";
import { defineProps, ref } from "vue";
import { ComparisonOperator } from "@/components/types/comparisonOperator";

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
    type: Number,
    default: 0,
  },
  /**
   * only index
   */
  // currentItemType: {
  //   type: String,
  //   default: "index",
  // },
  comparison: {
    type: Number as PropType<ComparisonOperator>,
    default: ComparisonOperator.EQUAL,
  },
});
const emit = defineEmits<{ (e: "change", item: number | string): void }>();
const currentIdx = ref();

const { currentItem, comparison } = props;
if(currentItem) {
  currentIdx.value = currentItem
}
function clickStep(index: number) {
  if(currentIdx.value < index) return;
  return moveItem(index)
}
function moveItem(index: number) {
  currentIdx.value = index
  emit("change", index)
}
const classCurrentStep = (clickedIdx: number): boolean => {
  switch (comparison) {
    case ComparisonOperator.GREATER_THAN_OR_EQUAL:
      return currentIdx.value >= clickedIdx;
    case ComparisonOperator.EQUAL:
      return currentIdx.value === clickedIdx
    default:
      throw new Error(`Unsupported comparison operator: ${comparison}`);
  }
}
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
