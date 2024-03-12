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
import _ from "lodash";
const dayjs = useDayjs();

const DATETIME = "datetime";
const props = defineProps({
  modelValue: {
    type: [Array, String],
    default: "",
  },
  /**
   * NOTE: TypeScript에서 타입 검사를 수행하고, 특정한 문자열 값만을 허용하는 더 엄격한 타입을 제공
   * 이는 코드를 더 안전하고 예측 가능하게 만들어줍니다.
   */
  type: {
    type: String as PropType<
      "date" | "datetime" | "year" | "month" | "time" | "week"
    >,
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
function disabledDate(date: Date): boolean {
  if (_.isNil(props.disabledDateRange)) {
    return false;
  }
  if (props.disabledDateRange) {
    const [start, end] = props.disabledDateRange;
    return calculateRange(date, start, end);
  }
  return false;
}
function disabledTime(date: Date): boolean {
  if (_.isNil(props.disabledTimeRange) || _.isEmpty(props.disabledTimeRange)) {
    return false;
  }
  const [start, end] = props.disabledTimeRange!;
  if (!validateDate(start, end)) {
    return false;
  }
  let startDateTime =
    start === null ? null : `${dayjs(date).format("YYYY-MM-DD")} ${start}`;
  let endDateTime =
    end === null ? null : `${dayjs(date).format("YYYY-MM-DD")} ${end}`;
  return calculateRange(date, startDateTime, endDateTime);
}
function validateDate(
  start: string | null | undefined,
  end: string | null | undefined,
): boolean {
  if (start === undefined || end === undefined || start === "" || end === "") {
    console.error("Invalid props disabledTimeRange");
    return false;
  }
  return true;
}
/**
 * NOTE: date! 의미
 * Non-null assertion operator라고 불리며, TypeScript에서 사용되는 연산자입니다.
 * 이 연산자는 특정 변수 또는 속성이 null 또는 undefined가 아니라고 확신할 때 사용
 * TypeScript는 null 가능성을 고려하여 컴파일러 오류를 방지하기 위해 해당 변수를 사용하기 전에 null 체크를 강제합니다.
 * 그러나 때로는 프로그래머가 null 체크를 이미 수행했다고 확신할 때가 있습니다.
 * 이 때 Non-null assertion operator인 !를 사용하여 "이 변수는 null이 아님"이라고 알려줍니다
 */
function calculateRange(
  date: Date,
  start: string | null,
  end: string | null,
): boolean {
  if (!validateDate(start, end)) {
    return false;
  }
  if (start === null && end !== null) {
    return dayjs(date).isSameOrBefore(end);
  } else if (end === null && start !== null) {
    return dayjs(date).isSameOrAfter(start);
  } else if (start !== null && end !== null) {
    return dayjs(date).isBetween(start, end);
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
