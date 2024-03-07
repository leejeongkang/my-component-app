<template>
  <div class="update-board">
    <h1>{{ boardId }} 번째 게시글</h1>
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
    <div
      class="input-field"
      v-if="board.comments && board.comments.data.length > 0"
    >
      <p v-for="(comment, index) in board.comments.data">
        {{ index + 1 }} : {{ comment.attributes.comment }}
        <button @click="deleteComment(comment.id)">x</button>
      </p>
    </div>
    <div class="input-field">
      <label>댓글</label>
      <div>
        <input v-model="newComment.comment" />
        <button @click="saveComment">댓글 등록</button>
      </div>
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
import type { Strapi4ResponseSingle } from "@nuxtjs/strapi/dist/runtime/types";
import type { Comments } from "@/components/types/Comments";
import type { Ref } from "vue";
const { findOne, update, create, delete: remove } = useStrapi();
const route = useRoute();
const router = useRouter();

const boardId: number = +route.params.id;
const response: Strapi4ResponseSingle<Boards> = await findOne<Boards>(
  "boards",
  boardId,
  { populate: "*" },
);
const board: Ref<Boards> = ref(response.data.attributes);

const updateBoard = async (): Promise<void> => {
  await update<Boards>("boards", boardId, {
    title: board.value.title,
    content: board.value.content,
    user: board.value.user,
  });
};

const newComment: Comments = reactive({
  comment: "댓글 입니다.",
  boards: boardId,
});
const saveComment = async (): Promise<void> => {
  await create<Comments>("comments", newComment);
  router.go(0);
};
async function deleteComment(id: number): Promise<void> {
  await remove<Comments>("comments", id);
  router.go(0);
}
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
