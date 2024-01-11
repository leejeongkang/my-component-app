<template>
  <h3>현재 스텝 {{ data[currentItem][labelKey] }} Index : {{ currentItem }}</h3>
  <p>디폴트는 0 입니당.</p>
  <div class="step-container">
    <div
      v-for="(item, index) in data"
      @click="moveStep(index)"
      class="flex-item"
    >
      <div>
        <span :class="{ 'current-step': currentItem >= index }">
          {{ item[labelKey] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { navigationComposition } from "@/components/composables/navigationComposition.ts";
const props = defineProps([
  "data",
  "labelKey",
  "valueKey",
  "iconKey",
  "currentItem",
]);
const emit = defineEmits(["change"]);

const { moveItem } = navigationComposition({
  ...props,
  onChange: (idx: number) => {
    emit("change", idx);
  },
});
function moveStep(idx: number) {
  if (props.currentItem < idx) {
    return null;
  } else {
    moveItem(idx);
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
