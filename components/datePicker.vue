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
        :show-time-panel="dateTimePanel"
      >
        <template #footer v-if="isPanelVisible()">
          <button class="mx-btn mx-btn-text" @click="switchDateTimePanel">
            {{ dateTimePanel ? "select date" : "select time" }}
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

const DATETIME = "datetime";
const props = defineProps({
  modelValue: {
    type: [Array, String],
    default: "",
  },
  /**
   * |date|datetime|year|month|time|week|
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
    type: Array as PropType<string[] | null[]>,
    // [start, end]
  },
  disabledTimeRange: {
    type: Array as PropType<string[] | null[]>,
    // [start, end]
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
  /**
   * 타입에 맞지 않게 설정 되면 콘솔 워닝
   * props.type = "datetime" 일 경우, true
   * @param value
   * @param props
   */
  showTimePanel: {
    type: Boolean,
    validator: (value, props) => {
      return !(props.type !== DATETIME && value);
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

function setDay(
  value: string | Date | number | null,
  format: string,
): string | null {
  if (!(value instanceof Date) && (value === null || _.isEmpty(value))) {
    console.error("Invalid parameters.");
    return null;
  } else {
    return dayjs(value).format(format);
  }
}
function disabledDate(val: Date): boolean {
  if (_.isNil(props.disabledDateRange)) {
    return false;
  }
  const FORMAT = props.format;
  const date: string | null = setDay(val, FORMAT);
  if (!date) {
    console.error("Date is null.");
    return false;
  }
  if (props.disabledDateRange) {
    const [start, end] = props.disabledDateRange;
    if (start === undefined || end === undefined) {
      console.error("Invalid props disabledDateRange");
      return false;
    }
    const startDate = setDay(start, FORMAT);
    const endDate = setDay(end, FORMAT);
    return calculateRange(date, startDate, endDate);
  }
  return false;
}
function disabledTime(val: Date): boolean {
  if (_.isNil(props.disabledTimeRange)) {
    return false;
  }
  const format = props.type === DATETIME ? "HH:mm:ss" : props.format;
  const date: string | null = setDay(val, format);
  if (!date) {
    console.error("Date is null.");
    return false;
  }
  if (props.disabledTimeRange) {
    const [start, end] = props.disabledTimeRange;
    if (
      start === undefined ||
      end === undefined ||
      start === "" ||
      end === ""
    ) {
      console.error("Invalid props disabledTimeRange");
      return false;
    }
    return calculateRange(date, start, end);
  }
  return false;
}
function calculateRange(
  date: string,
  start: string | null,
  end: string | null,
): boolean {
  if (start === null && end !== null) {
    return date <= end;
  } else if (end === null && start !== null) {
    return start <= date;
  } else if (start !== null && end !== null) {
    return start <= date && date <= end;
  } else {
    console.error("Invalid parameters.");
    return false;
  }
}
/**
 * props.type === "dateTime" 일 경우 값 할당 하는 방어 코드
 */
const dateTimePanel = ref();
if (props.type === DATETIME) {
  if (props.showTimePanel) {
    dateTimePanel.value = false;
  }
}
const isPanelVisible = (): boolean => {
  return props.showTimePanel && props.type === DATETIME;
};
function switchDateTimePanel(): void {
  dateTimePanel.value = !dateTimePanel.value;
}
</script>
