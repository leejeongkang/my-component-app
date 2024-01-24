<template>
  <div class="flex-container">
    <div
      v-for="(item, index) in data"
      @click="moveItem(index)"
      class="flex-tab"
      :class="{ 'disabled-tab': isDisabled(item[valueKey]) }"
    >
      <div>
        <span :class="{ 'current-tab': changeCurrentTabClass(index) }">
          {{ item[labelKey] }}
        </span>
      </div>
    </div>
  </div>
  <slot :name="data[currentIdx][valueKey]"></slot>
</template>

<script lang="ts" setup>
// defineProps, emit 찾아보기
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
  disabledList: {
    type: Array<String | Number>,
    default: [],
  },
});
const emit = defineEmits<{ (e: "change", item: number | string): void }>();
const currentIdx = ref();

const { currentItem, currentItemType, data, valueKey, disabledList } = props;
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
// NOTE: as number -> 컴파일 시 변수를 num 으로 강제 변환
const changeCurrentTabClass = (clickedIdx: number): boolean => {
  return currentIdx.value === clickedIdx;
};

const isDisabled = (value: string | number): boolean => {
  return disabledList.includes(value);
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

.disabled-tab {
  pointer-events: none;
  opacity: 0.5; /* 비활성화된 탭의 투명도를 조절할 수 있습니다. */
  /* 여기에 추가적인 스타일을 적용할 수 있습니다. */
}
</style>
