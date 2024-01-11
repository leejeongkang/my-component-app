<template>
  <div>
    <h1>Step Example</h1>
    <Step
      :data="stepOptions"
      :label-key="'label'"
      :current-item="currentStep"
      @change="changeStep"
    ></Step>
    <div>
      <button @click="movePrevStep">이전</button
      ><button @click="moveNextStep">다음</button>
    </div>

    <h1>Tab Example</h1>
    <Tab
      :data="tabOptions"
      :label-key="'label'"
      :value-key="'value'"
      :current-item="currentIdx"
      @change="changeTab"
    ></Tab>
    <h3>탭을 클릭하면 아래 contents가 알맞게 변경됩니다.</h3>
    <h3 v-show="currentTab === 'all'">강이정(27) 수원시</h3>
    <h3 v-show="currentTab === 'name'">강이정</h3>
    <h3 v-show="currentTab === 'age'">27세</h3>
    <h3 v-show="currentTab === 'city'">수원시</h3>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
/**
 * STEP
 */
const stepOptions = [
  { label: "Step1", value: "Step1" },
  { label: "Step2", value: "Step2" },
  { label: "Step3", value: "Step3" },
  { label: "Step4", value: "Step4" },
];
const currentStep = ref(0);
function changeStep(value: number) {
  currentStep.value = value;
}
function movePrevStep() {
  if (currentStep.value - 1 < 0) {
    return alert("0보다 작으면 안됌");
  } else {
    currentStep.value--;
  }
}
function moveNextStep() {
  if (currentStep.value + 1 >= stepOptions.length) {
    return alert("데이터 길이 넘어가면 안됍니다.");
  } else {
    currentStep.value++;
  }
}

/**
 * Tab
 */
const tabOptions = [
  { label: "전체", value: "all" },
  { label: "이름", value: "name" },
  { label: "나이", value: "age" },
  { label: "사는곳", value: "city" },
];
const currentTab = ref("");
const currentIdx = ref(0);
function changeTab(idx: number) {
  currentTab.value = tabOptions[idx]["value"];
  currentIdx.value = idx;
}
</script>

<style scoped></style>
