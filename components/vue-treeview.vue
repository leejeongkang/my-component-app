<template>
  <ClientOnly>
    <Tree
      :nodes="nodes"
      :config="config"
      @nodeOpened="log(`node-opened`)"
      @nodeClosed="log('node-closed')"
      @nodeFocus="log('node-focus')"
      @nodeToggle="log('node-toggle')"
      @nodeBlur="log('node-blur')"
      @nodeEdit="log('node-edit')"
      @nodeChecked="log('node-checked')"
      @nodeUnchecked="log('node-unchecked')"
      @nodeDragstart="log('node-dragstart')"
      @nodeDragenter="log('node-dragenter')"
      @nodeDragleave="log('node-dragleave')"
      @nodeDragend="log('node-dragend')"
      @nodeOver="log('node-over')"
      @nodeDrop="log('node-drop')"
    ></Tree>
  </ClientOnly>
</template>

<script lang="ts" setup>
import Tree from "vue3-treeview";
import "vue3-treeview/dist/style.css";
const nodes = {
  id1: {
    text: "text1",
    children: ["id11", "id12", "id13"],
  },
  id11: {
    text: "text11",
    children: ["id111", "id112", "id113"],
  },
  id111: {
    text: "id111",
  },
  id112: {
    text: "id112",
  },
  id113: {
    text: "id113",
  },
  id12: {
    text: "text12",
    children: [],
  },
  id13: {
    text: "text13",
    children: ["id131", "id132"],
  },
  id131: {
    text: "text131",
  },
  id132: {
    text: "text132",
  },
  id2: {
    text: "text2",
    children: ["id21", "id22"],
  },
  id21: {
    text: "text21",
    children: ["id211", "id212"],
  },
  id211: {
    text: "id211",
  },
  id212: {
    text: "id212",
  },
  id22: {
    text: "text12",
    children: [],
  },
  id3: {
    text: "text3",
  },
};
const config = {
  roots: ["id1", "id2", "id3"],
  keyboardNavigation: false,
  dragAndDrop: false,
  checkboxes: true,
  editable: true,
};
function log(str) {
  console.log(str);
}
</script>
