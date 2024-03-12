<template>
  <div class="pagination">
    <ul class="pagination-list">
      <li v-for="item in pages" :key="item">
        <button
          class="pagination-button button-icon"
          :class="
            currentGroup * props.perPage + item - 1 === selectedPage
              ? 'is-selected'
              : ''
          "
          :title="item + ' 페이지로 이동'"
          @click="movePage(currentGroup * props.perPage + item - 1)"
        >
          <span class="button-text">{{
            currentGroup * props.perPage + item
          }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, onMounted, ref } from "vue";

const props = defineProps({
  totalElements: {
    type: Number,
    default: 0,
  },
  // 10개 씩 보기, 20개씩 보기
  pageSize: {
    type: Number,
    default: 10,
  },
  // 현재 페이지
  currentPage: {
    type: Number,
    default: 0,
  },
  // 페이지네이션에 몇개의 페이지가 보이게 할것인지
  perPage: {
    type: Number,
    default: 10,
  },
});
const totalPage = ref();
const selectedPage = ref(props.currentPage);
const currentGroup = ref(0);
const lastGroup = ref(0);
const startIndex = ref();
const lastIndex = ref();
const pageCnt = ref();
const emit = defineEmits(["click"]);

const pages = computed(() => {
  if (selectedPage.value != null) {
    totalPage.value = Math.ceil(props.totalElements / props.pageSize);
    lastGroup.value = Math.ceil(totalPage.value / props.perPage); //4
    currentGroup.value = Math.floor(selectedPage.value / props.perPage); //0
    startIndex.value = currentGroup.value * props.perPage + 1;

    let last = (currentGroup.value + 1) * props.perPage;

    if (totalPage.value < last) {
      lastIndex.value = totalPage.value;
      pageCnt.value = totalPage.value % props.perPage;
    } else {
      lastIndex.value = last;
      pageCnt.value = props.perPage;
    }
    return pageCnt.value;
  }
});
watch(
  () => props.currentPage,
  (newValue) => {
    selectedPage.value = newValue;
  },
);

function movePage(page: number) {
  selectedPage.value = page;
  emit("click", page);
}
</script>

<style scoped>
.pagination {
  text-align: center;
}

.pagination-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: inline-block; /* Display the list horizontally */
}

.pagination-list li {
  display: inline; /* Display list items horizontally */
}

.pagination-button {
  display: inline-block;
  padding: 8px 16px;
  margin: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.pagination-button.is-selected {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.pagination-button:hover {
  background-color: #f0f0f0;
}

.button-icon {
  /* Add your button icon styles here if needed */
}

.button-text {
  /* Add your button text styles here */
}
</style>
