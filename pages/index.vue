<template>
  <div>
    <h1>SelectBox Example</h1>
    <div style="height: 100px;">
      <SelectBox :options="selectOptions" labelKey="label" valueKey="data" @select="selectValue" />
    </div>

    <h1>ListGroup Example</h1>
    <div style="height: 100px;">
      <ListGroup :options="listOptions" labelKey="label" valueKey="data" @select="selectValue" />
    </div>

    <h1>ComboBox Example</h1>
    <ComboBox :options="comboOptions" labelKey="label" valueKey="value" @select="selectValue" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SelectBox from '@/components/selectBox.vue';
import ComboBox from '@/components/comboBox.vue';
import ListGroup from "@/components/listGroup.vue";

const selectOptions = ref<Array<{ [key: string]: string | number }>>([]);
const listOptions = ref([
  { label: 'Option 4', data: 'option4' },
  { label: 'Option 5', data: 'option5' },
  { label: 'Option 6', data: 'option6' },
]);
const comboOptions = ref([
  { value: 'test', label: 'test' },
  { value: 'yons', label: 'yons' },
  { value: 'kim', label: 'kim' },
  { value: 'son', label: 'son' }
]);

const selectValue = (selectedValue: any) => {
  console.log(selectedValue);
};

onMounted(() => {
  setTimeout(() => {
    selectOptions.value = [
      { label: 'Option 1', data: 'option1' },
      { label: 'Option 2', data: 'option2' },
      { label: 'Option 3', data: 'option3' },
    ];
  }, 3000);
});
</script>
