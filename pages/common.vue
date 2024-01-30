<template>
  <h4>confirm, confirm-text, placeholder</h4>
  <DatePicker
    v-model="date"
    value-type="format"
    :format="'YYYY-MM-DD'"
    :confirm="true"
    :confirm-text="'확인'"
    :placeholder="'입력해주세용'"
  ></DatePicker>
  <h4>editable = false, clearable = false</h4>
  <p>editable 이 input 에서만 수정 안되는거였음...</p>
  <DatePicker
    v-model:modelValue="date2"
    :type="'date'"
    value-type="YY-MM-DD"
    :format="'YY.MM.DD'"
    :clearable="false"
    :editable="false"
  ></DatePicker>
  <h4>Disabled</h4>
  <DatePicker
    v-model:modelValue="date"
    :type="'date'"
    :format="'YY-MM-DD H:m:s'"
    :disabled="true"
  ></DatePicker>

  <h4>date =>? Range</h4>
  <DatePicker
    v-model:modelValue="range1"
    :format="'YYYY-MM-DD'"
    :range="true"
  ></DatePicker>
  <h4>separator, confirm</h4>
  <DatePicker
    v-model="range2"
    value-type="format"
    :format="'YY.MM-DD'"
    :range="true"
    :confirm="true"
    :separator="'~~~~~~~~~'"
  ></DatePicker>

  <h4>datetime</h4>
  <DatePicker
    v-model="nullData"
    :type="'datetime'"
    :format="'YYYY-MM-DD HH:mm'"
    value-type="YYYY-MM-DD HH:mm"
    :placeholder="'선택해주세요.'"
  ></DatePicker>
  <DatePicker
    v-model="dateTimeRange"
    value-type="YYYY-MM-DD HH:mm:ss"
    type="datetime"
    :format="'YYYY-MM-DD HH:mm:ss'"
    :confirm="true"
    :range="true"
  ></DatePicker>

  <h4>Year</h4>
  <DatePicker
    v-model="year"
    value-type="YYYY"
    type="year"
    :format="'YYYY'"
    :confirm="true"
    :separator="'~~~~~~~~~'"
  ></DatePicker>
  <DatePicker
    v-model="yearRange"
    value-type="YYYY"
    type="year"
    :format="'YYYY'"
    :range="true"
  ></DatePicker>

  <h4>month</h4>
  <DatePicker
    v-model="month"
    value-type="MM"
    type="month"
    :format="'MM'"
    :confirm="true"
  ></DatePicker>
  <DatePicker
    v-model="monthRange"
    value-type="format"
    type="month"
    :format="'MM'"
    :range="true"
  ></DatePicker>

  <h4>time</h4>
  <DatePicker
    v-model="time"
    value-type="format"
    type="time"
    :format="'HH:mm'"
    :confirm="true"
  ></DatePicker>
  <DatePicker
    v-model="timeRange"
    value-type="format"
    type="time"
    :format="'HH:mm'"
    :range="true"
  ></DatePicker>

  <h4>Multiple</h4>
  <p>multiple 설정할 경우 separator 알맞게(",") 설정해줘야 함!</p>
  <DatePicker
    v-model="multiple"
    value-type="format"
    type="date"
    :format="'YYYY-MM-DD'"
    :multiple="true"
    :separator="','"
  ></DatePicker>

  <h4>Time options (Hour, Minute, Second Options)</h4>
  <DatePicker
    v-model="options"
    value-type="format"
    type="time"
    :format="'HH:mm:ss'"
    :placeholder="'HH:mm:ss'"
    :hour-options="[8, 9, 10, 11, 12, 13]"
    :minute-options="[0, 30]"
    :second-options="[0, 20, 40]"
  ></DatePicker>

  <h4>
    타입이 datetime 일때만 show-time-panel이 보인다. 아무리 true 줘봤자 안됌!
  </h4>
  <DatePicker
    v-model="date"
    value-type="format"
    type="date"
    :format="'YYYY-MM-DD'"
    :show-time-panel="true"
  ></DatePicker>
  <DatePicker
    v-model="dateTime"
    value-type="format"
    type="datetime"
    :format="'YYYY-MM-DD HH:mm:ss'"
    :show-time-panel="true"
  ></DatePicker>

  <h4>Disabled</h4>
  <DatePicker
    v-model="nullData"
    value-type="format"
    type="datetime"
    :format="'YYYY-MM-DD HH:mm:ss'"
    :disabled-date-range="['2024-01-01', '2024-01-11']"
    :disabled-time-range="['09:30:00', '12:00:00']"
    :range="true"
  ></DatePicker>
  <DatePicker
    v-model="date"
    value-type="format"
    type="date"
    :format="'YYYY-MM-DD'"
    :disabled-date-range="['2024-01-01', '2024-01-11']"
  ></DatePicker>
  <DatePicker
    v-model="time"
    value-type="format"
    type="time"
    :format="'HH:mm:ss'"
    :disabled-time-range="['09:30:00', '12:00:00']"
  ></DatePicker>
  <DatePicker
    v-model="date"
    value-type="format"
    type="date"
    :format="'YYYY-MM-DD'"
    :disabled-date-range="['2024-01-01', '2024-01-11']"
    :range="true"
  ></DatePicker>
  <DatePicker
    v-model="time"
    value-type="format"
    type="time"
    :format="'HH:mm:ss'"
    :disabled-time-range="['09:30:00', '12:00:00']"
    :range="true"
  ></DatePicker>
  <!-- TODO: datetime disabled -->
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<script lang="ts" setup>
const nullData = ref(null);
const date = ref("2024-01-26");
const date2 = ref("24.01.26");

const range1 = ref(["2023-12-26", "2024-01-11"]);
const range2 = ref(["24.01-01", "24.01-11"]);

const dateTime = ref("2024-01-29 16:31:30");
const dateTimeRange = ref(["2024-01-29 16:31:30", "2024-01-31 12:31:30"]);

const year = ref("2018");
const yearRange = ref(["2021", "2024"]);

const month = ref("09");
const monthRange = ref(["01", "11"]);

const time = ref("15:00");
const timeRange = ref(["01:13", "20:20"]);

const multiple = ref(["2024-01-02", "2024-01-11"]);
const options = ref("");
</script>
