<template>
  <button @click="clickModal">클릭</button>
  <modal
    :content-class="''"
    :background="'interactive'"
    :display-directive="'show'"
    :drag-and-resize="true"
    :modal-id="'modal1'"
    :hide-overlay="false"
    :overlay-transition="'vfm-slide-down'"
    :content-transition="'vfm-slide-right'"
    :esc-to-close="true"
    :click-to-close="true"
  >
    <template v-slot:head><span>header</span></template>
    <template v-slot:body>
      <span>body</span>
      <span>모달테스트</span>
      <span>모달테스트</span>
      <span>모달테스트</span>
    </template>
    <template v-slot:foot>
      <span>footer</span>
      <button class="button" @click="">Confirm</button>
    </template>
  </modal>
  <h2>confirm, confirm-text, placeholder</h2>
  <DatePicker
    v-model="date"
    value-type="format"
    :format="'YYYY-MM-DD'"
    :confirm="true"
    :confirm-text="'확인'"
    :placeholder="'입력해주세용'"
  ></DatePicker>
  <h2>editable = false, clearable = false</h2>
  <p>editable 이 input 에서만 수정 안되는거였음...</p>
  <DatePicker
    v-model:modelValue="date2"
    :type="'date'"
    value-type="YY-MM-DD"
    :format="'YY.MM.DD'"
    :clearable="false"
    :editable="false"
  ></DatePicker>
  <h2>Disabled</h2>
  <DatePicker
    v-model:modelValue="date"
    :type="'date'"
    :format="'YY-MM-DD H:m:s'"
    :disabled="true"
  ></DatePicker>

  <h2>Range</h2>
  <DatePicker
    v-model:modelValue="range1"
    :format="'YYYY-MM-DD'"
    :range="true"
  ></DatePicker>
  <h2>separator, confirm</h2>
  <DatePicker
    v-model="range2"
    value-type="format"
    :format="'YY.MM-DD'"
    :range="true"
    :confirm="true"
    :separator="'~~~~~~~~~'"
  ></DatePicker>

  <h2>datetime</h2>
  <p>v-model에 null 넣으면 placeholder</p>
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

  <h2>Year</h2>
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

  <h2>month</h2>
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

  <h2>time</h2>
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

  <h2>Multiple</h2>
  <p>multiple 설정할 경우 separator 알맞게(",") 설정해줘야 함!</p>
  <DatePicker
    v-model="multiple"
    value-type="format"
    type="date"
    :format="'YYYY-MM-DD'"
    :multiple="true"
    :separator="','"
  ></DatePicker>

  <h2>Time options (Hour, Minute, Second Options)</h2>
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

  <h2>
    타입이 datetime 일때만 show-time-panel이 보인다. 아무리 true 줘봤자 안됌!
  </h2>
  <!--  <DatePicker-->
  <!--    v-model="date"-->
  <!--    value-type="format"-->
  <!--    type="date"-->
  <!--    :format="'YYYY-MM-DD'"-->
  <!--    :show-time-panel="true"-->
  <!--  ></DatePicker>-->
  <DatePicker
    v-model="dateTime"
    value-type="format"
    type="datetime"
    :format="'YYYY-MM-DD HH:mm:ss'"
    :show-time-panel="true"
  ></DatePicker>

  <h2>Disabled</h2>
  <p>datetime 일때 date, time 둘 다 disabled range 적용</p>
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
    v-model="nullData"
    value-type="format"
    type="datetime"
    :format="'YYYY-MM-DD HH:mm:ss'"
    :disabled-date-range="['2024-01-01', '2024-01-11']"
    :disabled-time-range="['09:30:00', '12:00:00']"
  ></DatePicker>
  <DatePicker
    v-model="date"
    value-type="format"
    type="date"
    :format="'YYYY-MM-DD'"
    :disabled-date-range="['2024-01-01', null]"
  ></DatePicker>
  <DatePicker
    v-model="time"
    value-type="format"
    type="time"
    :format="'HH:mm:ss'"
    :disabled-time-range="[null, '09:30:00', null]"
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
    :disabled-time-range="[null, '12:00:00']"
    :range="true"
  ></DatePicker>
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
import { useNuxtApp } from "nuxt/app";
const { $vfm } = useNuxtApp();

function clickModal() {
  $vfm.open("modal1");
}
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
