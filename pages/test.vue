<template>
  <div>
    <h1>Tree</h1>
    <Tree
      :items="items"
      :is-checkable="false"
      @check="checkNode"
      @select="selectNode"
      @close="closeNode"
    >
      <!--      <template #add="addRootNode">-->
      <!--      <template #add v-slot="{ addRootNode }">-->
      <!--        <button @click="addRootNode">루트 노드 추가</button> <br />-->
      <!--      </template>-->
      <template #add @addRootNode="test">
        <button>루트 노드 추가</button> <br />
      </template>
    </Tree>
    {{ items }}
  </div>
</template>

<script lang="ts" setup>
import { TreeViewItem } from "vue3-tree-vue/dist/types/src/types";
import { Ref } from "vue";

const items: Ref<Array<TreeViewItem>> = ref([
  {
    name: "Node1",
    children: [{ name: "node1-1", user: "리드미", children: [] }],
    connect: "연결",
    user: "강이정",
  },
  { name: "Node2", user: "강이정", children: [] },
]);
function checkNode(v) {
  console.log(v);
}
function selectNode(v) {
  console.log(v);
}
function closeNode(v) {
  console.log(v);
}
function test(v) {
  console.log(v);
}
</script>
