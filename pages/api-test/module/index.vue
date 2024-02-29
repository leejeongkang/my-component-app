<template>
  <div>
    <h1>API TEST- module 사용</h1>
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
        <tr v-for="board in boards?.data" :key="board.id">
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
import type { Boards, boardKey } from "@/components/types/Boards";
const { find, create, delete: remove } = useStrapi();

const newBoard: Boards = reactive({
  title: null,
  content: null,
  user: null,
});
const { data: boards, refresh } = await useAsyncData("boards", () =>
  find<Boards>("boards"),
);
async function deleteBoard(id: number): Promise<void> {
  await remove<Boards>("boards", id);
  await refresh();
}
async function addBoard(): Promise<void> {
  await create<Boards>("boards", newBoard);
  await refresh();
  /**
   * NOTE:
   * 오류가 발생한 이유는 Object.keys() 메서드가 반환하는 키 배열의 요소가 기본적으로 string 타입으로 되어 있기 때문입니다. 따라서 forEach 메서드에 전달되는 콜백 함수의 파라미터 타입도 string 타입으로 추론되어 버립니다.
   * 이를 해결하기 위해서는 명시적으로 타입 캐스팅을 통해 콜백 함수의 파라미터 타입을 boardKey로 지정해주어야 합니다.
   * TypeScript가 key 변수를 string 타입에서 boardKey 타입으로 올바르게 캐스팅하여 오류를 해결할 수 있습니다.
   */
  Object.keys(newBoard).forEach((key: string) => {
    const boardKey = key as boardKey;
    newBoard[boardKey] = null;
  });
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
