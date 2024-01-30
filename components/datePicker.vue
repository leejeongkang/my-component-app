<template>
  <div>
    <ClientOnly>
      <DatePicker
        :value="modelValue"
        @update:value="emit('update:modelValue', $event)"
        :type="type"
        :range="range"
        :format="format"
        :formatter="formatter"
        :value-type="valueType"
        :default-value="defaultValue"
        :lang="lang"
        :placeholder="placeholder"
        :editable="editable"
        :clearable="clearable"
        :confirm="confirm"
        :confirm-text="confirmText"
        :multiple="multiple"
        :disabled="disabled"
        :disabled-date="disabledDate"
        :disabled-time="disabledTime"
        :title-format="titleFormat"
        :separator="separator"
        :hour-options="hourOptions"
        :minute-options="minuteOptions"
        :second-options="secondOptions"
        :show-time-panel="showTimePanel"
        @pick="pick"
        @change="change"
      >
        <template #footer v-if="isPanelVisible()">
          <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
            {{ panelTitle ? "select date" : "select time" }}
          </button>
        </template>
      </DatePicker>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import type { PropType } from "vue";
import dayjs from "dayjs";
import _ from "lodash";

const props = defineProps({
  modelValue: {
    type: [Array, String],
    default: "",
  },
  /**
   * |datetime(x) -> dateTime(o)|year|month|time|week|
   */
  type: {
    type: String,
    default: "date",
  },
  range: {
    type: Boolean,
    default: false,
  },
  format: {
    type: String,
    default: "YYYY-MM-DD",
  },
  formatter: {
    type: Object,
  },
  valueType: {
    type: String,
    default: "format",
  },
  defaultValue: {
    type: Date,
    default: new Date(),
  },
  /**
   * true 일 경우 defaultValue 적용
   */
  setDefaultValue: {
    type: Boolean,
    default: false,
  },
  lang: {
    type: String,
    default: "ko",
  },
  placeholder: {
    type: String,
    default: null,
  },
  editable: {
    type: Boolean,
    default: true,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "확인",
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disabledDateRange: {
    type: Array as PropType<string[]>,
  },
  disabledTimeRange: {
    type: Array as PropType<string[]>,
  },
  titleFormat: {
    type: String,
    default: "YYYY-MM-DD",
  },
  separator: {
    type: String,
    default: " ~ ",
  },
  /**
   *  NOTE
   *  Array<Number>과 같이 TypeScript에서 사용되는 제네릭 타입은
   *  Vue의 props에서 직접적으로 사용되지 않습니다
   */
  hourOptions: {
    type: Array as PropType<number[]>,
  },
  minuteOptions: {
    type: Array as PropType<number[]>,
  },
  secondOptions: {
    type: Array as PropType<number[]>,
  },
  showTimePanel: {
    type: Boolean,
    /**
     * 타입에 맞지 않게 설정 되면 콘솔 워닝
     * @param value
     * @param props
     */
    validator: (value, props) => {
      return !(props.type !== "dateTime" && value);
    },
  },
});
const emit = defineEmits(["update:modelValue"]);
const modelValue = computed(() => {
  if (!props.modelValue || _.isEmpty(props.modelValue)) {
    if (props.setDefaultValue) {
      return setDay(props.defaultValue, props.format);
    }
  }
  return props.modelValue;
});

function setDay(value: string | Date | number | null, format: string) {
  return dayjs(value).format(format);
}
function disabledDate(val: Date) {
  const FORMAT = props.format;
  const date = setDay(val, FORMAT);
  if (props.disabledDateRange) {
    const [start, end] = props.disabledDateRange;
    const startDate = setDay(start, FORMAT);
    const endDate = setDay(end, FORMAT);
    return startDate <= date && date <= endDate;
  }
  return false;
}
function disabledTime(val: Date) {
  const FORMAT = props.format;
  const date = setDay(val, FORMAT);
  if (props.disabledTimeRange) {
    const [start, end] = props.disabledTimeRange;
    return start <= date && date <= end;
  }
  return false;
}

/**
 * props.type === "dateTime" 일 경우 true 할당 하는 방어 코드
 */
const panelTitle = ref(false);
if (props.showTimePanel) {
  if (props.type === "dateTime") {
    panelTitle.value = props.showTimePanel;
  }
}
const isPanelVisible = (): boolean => {
  return props.showTimePanel && props.type === "dateTime";
};
function toggleTimePanel() {
  panelTitle.value = !panelTitle.value;
}

function change(val) {
  console.log(val);
}
function pick(val) {
  console.log(val);
}
</script>