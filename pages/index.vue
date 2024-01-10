<template>
  <div>
    <h1>Step Example</h1>
    <Step :data="stepOptions" :label-key="'label'" @change="changeStep"></Step>

    <h1>Tab Example</h1>
    <Tab
      :data="tabOptions"
      :label-key="'label'"
      :value-key="'value'"
      @change="changeTab"
    ></Tab>
    <h3>탭을 클릭하면 아래 contents가 알맞게 변경됩니다.</h3>
    <h3 v-show="currentTab === 'all'">강이정(27) 수원시</h3>
    <h3 v-show="currentTab === 'name'">강이정</h3>
    <h3 v-show="currentTab === 'age'">27세</h3>
    <h3 v-show="currentTab === 'city'">수원시</h3>

    <!--    <h1>SelectBox Example</h1>-->
    <!--    <div style="height: 100px">-->
    <!--      <SelectBox-->
    <!--        :options="selectOptions"-->
    <!--        labelKey="label"-->
    <!--        valueKey="data"-->
    <!--        @select="selectValue"-->
    <!--      />-->
    <!--    </div>-->

    <!--    <h1>ListGroup Example</h1>-->
    <!--    <div style="height: 100px">-->
    <!--      <ListGroup-->
    <!--        :options="listOptions"-->
    <!--        labelKey="label"-->
    <!--        valueKey="data"-->
    <!--        @select="selectValue"-->
    <!--      />-->
    <!--    </div>-->

    <!--    <h1>ComboBox Example</h1>-->
    <!--    <ComboBox-->
    <!--      :options="comboOptions"-->
    <!--      labelKey="label"-->
    <!--      valueKey="value"-->
    <!--      @select="selectValue"-->
    <!--    />-->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SelectBox from "@/components/selectBox.vue";
import ComboBox from "@/components/comboBox.vue";
import ListGroup from "@/components/listGroup.vue";

const selectOptions = ref<Array<{ [key: string]: string | number }>>([]);
const listOptions = ref([
  { label: "Option 4", data: "option4" },
  { label: "Option 5", data: "option5" },
  { label: "Option 6", data: "option6" },
]);
const comboOptions = ref([
  { value: "test", label: "test" },
  { value: "yons", label: "yons" },
  { value: "kim", label: "kim" },
  { value: "son", label: "son" },
]);

const tabOptions = [
  { label: "전체", value: "all" },
  { label: "이름", value: "name" },
  { label: "나이", value: "age" },
  { label: "사는곳", value: "city" },
];

const stepOptions = [
  { label: "Step1", value: "Step1" },
  { label: "Step2", value: "Step2" },
  { label: "Step3", value: "Step3" },
  { label: "Step4", value: "Step4" },
];

const selectValue = (selectedValue: any) => {
  console.log(selectedValue);
};

function changeStep(value: any) {
  console.log(value);
}
const currentTab = ref("");
function changeTab(value: any) {
  currentTab.value = value;
}

onMounted(() => {
  setTimeout(() => {
    selectOptions.value = [
      { label: "Option 1", data: "option1" },
      { label: "Option 2", data: "option2" },
      { label: "Option 3", data: "option3" },
    ];
  }, 3000);
});
</script>
