<template>
  <div class="update-board">
    <h1>{{ response.data.id }} 번째 게시글</h1>
    <div class="input-field">
      <label>제목 :</label>
      <input v-model="board.title" />
    </div>
    <div class="input-field">
      <label>내용 :</label>
      <textarea v-model="board.content"></textarea>
    </div>
    <div class="input-field">
      <label>작성자 :</label>
      <input v-model="board.user" />
    </div>
    <div class="button-group">
      <button
        @click="
          updateBoard();
          $router.go(-1);
        "
      >
        Update
      </button>
      <button @click="$router.go(-1)">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Boards } from "@/components/types/Boards";
import type { Ref } from "vue";
import type { Strapi4ResponseSingle } from "@nuxtjs/strapi/dist/runtime/types";
const { findOne, update } = useStrapi();
const route = useRoute();

const boardId: number = +route.params.id;
const response: Strapi4ResponseSingle<Boards> = await findOne<Boards>(
  "boards",
  boardId,
);
const board: Ref<Boards> = ref(response.data.attributes);

const updateBoard = async (): Promise<void> => {
  await update<Boards>("boards", boardId, {
    title: board.value.title,
    content: board.value.content,
    user: board.value.user,
  });
};
</script>

<style scoped>
.update-board {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.input-field {
  margin-bottom: 15px;
}

.input-field label {
  font-weight: bold;
  margin-right: 10px;
}

.input-field input,
.input-field textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.button-group button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-group button:last-child {
  margin-right: 0;
}
</style>
