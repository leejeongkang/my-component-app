<template>
  <div>
    <DatePicker
      :value="value"
      @update:value="$emit('update:modelValue', $event)"
      :type="type"
      :range="range"
      :format="format"
      :value-type="valueType"
      lang="ko"
      :placeholder="placeholder"
      :clearable="clearable"
      :confirm="confirm"
      :multiple="multiple"
      :disabled="disabled"
    ></DatePicker>
  </div>
</template>

<script lang="ts" setup>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
//import "vue-datepicker-next/locale/ko";

const value = null;
const props = defineProps({
  type: {
    type: String,
    default: "datetime",
  },
  range: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: "YYYY-MM-DD",
  },
  valueType: {
    type: String,
    default: "date",
  },
  placeholder: {
    type: String,
    default: null,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // disabledDate: {
  //   type: Boolean,
  // },
});
</script>
