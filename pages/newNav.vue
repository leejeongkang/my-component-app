<template>
  <div>
    <h1>Step Example</h1>
    <NewStep
      :data="stepOptions"
      :label-key="'label'"
      :current-item="currentStep"
      :comparison="'equal'"
      @change="changeStep"
    >
      <template #Step1>
        <div>스텝 1</div>
      </template>
      <template #Step2>
        <div>스텝2</div>
      </template>
      <template #Step3>
        <div>hi 스텝 33</div>
      </template>
      <template #Step4>
        <div>스텝 4444</div>
      </template>
    </NewStep>
    <NewStep
      :data="stepOptions2"
      :label-key="'label'"
      :current-item="currentStep2"
      :current-item-type="'value'"
      :comparison="'greater'"
      @change="changeStep2"
    >
      <template #Step1>
        <div>스텝 1</div>
      </template>
      <template #Step2>
        <div>스텝2</div>
      </template>
      <template #Step3>
        <div>hi 스텝 33</div>
      </template>
      <template #Step4>
        <div>스텝 4444</div>
      </template>
    </NewStep>
    <h1>Tab Example</h1>
    <h3>type: string || Emit : {{ currentTab }}</h3>
    <NewTab
      :data="tabOptions"
      :label-key="'label'"
      :value-key="'value'"
      :current-item="currentTab"
      :current-item-type="'value'"
      :disabled-list="['city']"
      @change="changeTab"
    >
      <template #all>
        <div>강이정(27) 수원시</div>
      </template>
      <template #name>
        <div>강이정</div>
      </template>
      <template #age>
        <div>27세</div>
      </template>
      <template #city>
        <div>수원시</div>
      </template>
    </NewTab>

    <h3>type: number || Emit : {{ currentTab2 }}</h3>
    <NewTab
      :data="tabOptions2"
      :label-key="'label'"
      :value-key="'value'"
      :current-item="currentTab2"
      :current-item-type="'index'"
      :disabled-list="[1, 3]"
      @change="changeTab2"
    ></NewTab>
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
const currentStep = ref(2);
function changeStep(value: number) {
  currentStep.value = value;
}

const stepOptions2 = [
  { label: "Step1", value: "Step1" },
  { label: "Step2", value: "Step2" },
  { label: "Step3", value: "Step3" },
  { label: "Step4", value: "Step4" },
];
const currentStep2 = ref();
currentStep2.value = "Step1";
function changeStep2(value: number | string) {
  currentStep2.value = value;
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
const tabOptions2 = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
];

const currentTab = ref();
currentTab.value = "city";
function changeTab(item: number | string) {
  currentTab.value = item;
}

const currentTab2 = ref();
currentTab2.value = 1;
function changeTab2(item: number | string) {
  currentTab2.value = item;
}
</script>
