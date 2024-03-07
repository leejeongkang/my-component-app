<template>
  <div>
    <h1>API TEST- module 사용</h1>
    <div>
      <input v-model="keyword" />
      <button @click="searchBoard">검색</button>
    </div>
    <div>
      <h3 @click="changeLocale">
        locale 설정 : {{ locale === "ko" ? "한국어" : "영어" }}
      </h3>
    </div>
    <table border="1">
      <tr>
        <th>ID</th>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>댓글</th>
        <th>작성 시간</th>
        <th>수정 시간</th>
        <th>삭제</th>
      </tr>
      <tbody>
        <tr v-for="board in boards" :key="board.id">
          <td>{{ board.id }}</td>
          <td @click="$router.push(`${$route.path}/${board.id}`)">
            {{ board.attributes.title }}
          </td>
          <td>{{ board.attributes.content }}</td>
          <td>{{ board.attributes.user }}</td>
          <td>
            {{
              board.attributes.comments.data.length > 0
                ? board.attributes.comments.data.length
                : ""
            }}
          </td>
          <td>{{ board.attributes.createdAt }}</td>
          <td>{{ board.attributes.updatedAt }}</td>
          <td>
            <button style="flex: 1" @click="deleteBoard(board.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :total-elements="pagination.total"
      :page-size="pagination.pageSize"
      :current-page="pagination.page - 1"
      @click="changePage"
    ></Pagination>

    <label>제목:</label><br />
    <input v-model="newBoard.title" /><br /><br />
    <label>내용:</label><br />
    <textarea rows="4" cols="50" v-model="newBoard.content"></textarea
    ><br /><br />
    <label>작성자:</label><br />
    <input v-model="newBoard.user" /><br /><br />
    <button @click="addBoard">새글 추가</button><br /><br />
  </div>
</template>

<script lang="ts" setup>
import type { Boards, boardKey } from "@/components/types/Boards";
import type { Ref } from "vue";
import qs from "qs";
import type { Strapi4ResponseMany } from "@nuxtjs/strapi/dist/runtime/types";

const { find, create, delete: remove } = useStrapi();
const boards = ref();
const pagination: {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
} = reactive({
  page: 1,
  pageSize: 10,
  pageCount: 0,
  total: 0,
});
const newBoard: Boards = reactive({
  title: "게시글",
  content: "게시글",
  user: "강이정",
});
const locale: Ref<String> = ref("ko");
async function getBoards(query: string): Promise<void> {
  const res: Strapi4ResponseMany<Boards> = await find<Boards>(
    `boards?${query}`,
  );
  console.log(locale.value);
  boards.value = res.data;
  pagination.page = res.meta.pagination.page;
  pagination.total = res.meta.pagination.total;
}
const defaultQuery: string = qs.stringify(
  {
    populate: "*",
    sort: ["createdAt:desc"],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    locale: "ko",
  },
  {
    encodeValuesOnly: true, // prettify URL
  },
);
getBoards(defaultQuery);
async function deleteBoard(id: number): Promise<void> {
  await remove<Boards>("boards", id);
  await getBoards(defaultQuery);
}
async function addBoard(): Promise<void> {
  await create<Boards>("boards", newBoard);
  await getBoards(defaultQuery);
  Object.keys(newBoard).forEach((key: string) => {
    const boardKey = key as boardKey;
    newBoard[boardKey] = null;
  });
}

const keyword: Ref<string> = ref("");
async function searchBoard(): Promise<void> {
  pagination.page = 1;
  const query: string = qs.stringify(
    {
      populate: "*",
      sort: ["createdAt:desc"],
      filters: {
        title: {
          $contains: keyword.value,
        },
      },
      pagination: {
        page: pagination.page,
        pageSize: 10,
      },
      locale: locale.value,
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );
  await getBoards(query);
}
async function changePage(page: number): Promise<void> {
  pagination.page = page;
  const query: string = qs.stringify(
    {
      populate: "*",
      sort: ["createdAt:desc"],
      filters: {
        title: {
          $contains: keyword.value,
        },
      },
      pagination: {
        page: page + 1,
        pageSize: 10,
      },
      locale: locale.value,
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );
  await getBoards(query);
}

function changeLocale() {
  switch (locale.value) {
    case "ko":
      locale.value = "en";
      break;
    case "en":
      locale.value = "ko";
      break;
  }
  let query = qs.stringify(
    {
      populate: "*",
      sort: ["createdAt:desc"],
      pagination: {
        page: 1,
        pageSize: 10,
      },
      locale: locale.value,
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  );
  getBoards(query);
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
