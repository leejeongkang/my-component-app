<template>
  <ClientOnly>
    <Tree
      :nodes="nodes"
      :config="config"
      @nodeOpened="log(`node-opened`)"
      @nodeClosed="log('node-closed')"
      @nodeFocus="clickNode"
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
    >
      <template #after-input="props">
        <button @nodeFocus="addNode">추가</button>
      </template>
    </Tree>
  </ClientOnly>
</template>

<script lang="ts" setup>
import Tree from "vue3-treeview";
import "vue3-treeview/dist/style.css";
export interface Node {
  text: string;
  children?: string[];
  state?: State;
  // add 속성
  isRoot?: boolean;
  title?: string;
  icon?: string;
  data?: any;
}
export interface State {
  opened: boolean;
  disabled: boolean;
  editable: boolean;
  draggable: boolean;
  dropable: boolean;
  checked: boolean;
  indeterminate: boolean;
  isLoading: boolean;
}
const nodes: Object = ref({
  id1: {
    text: "text1",
    children: ["id11", "id12", "id13"],
    state: {
      opened: true,
    },
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
  id131: {
    text: "text131",
  },
  id132: {
    text: "text132",
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
    state: {
      opened: true,
    },
  },
  id3: {
    text: "text3",
  },
  id2: {
    text: "text2",
    children: ["id21", "id22"],
    state: {
      opened: true,
    },
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
});
const config = {
  roots: ["id3", "id1", "id2"],
  keyboardNavigation: false,
  dragAndDrop: false,
  checkboxes: false,
  editable: true,
};
function log(str) {
  console.log(str);
}
function clickNode(val) {
  console.log(val);
}
function addNode(node: Node) {
  const newNode: Node = { text: "새노드", children: [] };
  //node.children?.push(newNode);
  console.log(node);
  nodes.key3 = newNode;
  console.log(nodes);
}
</script>
