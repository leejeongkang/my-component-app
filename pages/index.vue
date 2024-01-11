<template>
  <div>
    <h1>SelectBox Example</h1>
    <div style="height: 100px">
      <SelectBox
        :options="selectOptions"
        labelKey="label"
        valueKey="data"
        @select="selectValue"
      />
    </div>

    <h1>ListGroup Example</h1>
    <div style="height: 100px">
      <ListGroup
        :options="listOptions"
        labelKey="label"
        valueKey="data"
        @select="selectValue"
      />
    </div>

    <h1>ComboBox Example</h1>
    <ComboBox
      :options="comboOptions"
      labelKey="label"
      valueKey="value"
      @select="selectValue"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

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
