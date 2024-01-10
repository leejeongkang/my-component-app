<template>
  <div>
    <div class="flex-container">
      <div
        v-for="(item, index) in data"
        @click="moveItem(index)"
        class="flex-tab"
      >
        <div>
          <span :class="{ 'current-tab': currentItem === index }">
            {{ item[labelKey] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { navigationComposition } from "@/components/composables/navigationComposition.ts";
const props = defineProps(["data", "labelKey", "valueKey", "iconKey"]);
const emit = defineEmits(["change"]);

const { currentItem, moveItem } = navigationComposition({
  ...props,
  onChange: (idx: number) => {
    emit("change", props.data[idx][props.valueKey]);
  },
});
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
