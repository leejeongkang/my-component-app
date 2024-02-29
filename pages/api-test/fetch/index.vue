<template>
  <div>
    <h1>API TEST- fetch 사용</h1>
    <table border="1">
      <tr>
        <th>제목</th>
        <th>내용</th>
        <th>작성자</th>
        <th>작성 시간</th>
        <th>수정 시간</th>
        <th>삭제</th>
      </tr>
      <tbody>
        <tr v-for="board in boards" :key="board.id">
          <td @click="$router.push(`${$route.path}/${board.id}`)">
            {{ board.attributes.title }}
          </td>
          <td>{{ board.attributes.content }}</td>
          <td>{{ board.attributes.user }}</td>
          <td>{{ board.attributes.createdAt }}</td>
          <td>{{ board.attributes.updatedAt }}</td>
          <td>
            <button style="flex: 1" @click="deleteBoard(board.id)">삭제</button>
          </td>
        </tr>
        <tr>
          <td><input v-model="newBoard.title" /></td>
          <td><input v-model="newBoard.content" /></td>
          <td><input v-model="newBoard.user" /></td>
          <td><button @click="addBoard">새글 추가</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { $fetch } from "ofetch";
import type { Boards } from "@/components/types/Boards";
const boards = ref();
const newBoard: Boards = reactive({
  title: null,
  content: null,
  user: null,
});
const getBoards = async (): Promise<void> => {
  const res = await $fetch("http://localhost:1337/api/boards");
  boards.value = await res.data;
};
getBoards();

async function deleteBoard(id: number): Promise<void> {
  await $fetch(`http://localhost:1337/api/boards/${id}`, {
    method: "DELETE",
  });
  await getBoards();
}
function addBoard(): void {
  $fetch("http://localhost:1337/api/boards", {
    method: "POST",
    body: {
      data: newBoard,
    },
  });
  getBoards();
  newBoard.title = null;
  newBoard.content = null;
  newBoard.user = null;
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
