<template>
  <div>
    <button @click="addRootNode">새노드 추가</button>
    <Vue3TreeVue
      :items="items"
      :isCheckable="false"
      :hideGuideLines="true"
      :lazyLoad="false"
      @onSelect="onItemSelected"
      @onExpand="loadLazy"
    >
      <template v-slot:item-prepend-icon="treeViewItem">
        <span class="icon">📂</span>
      </template>
      <template v-slot:item-prepend="treeViewItem"
        ><span class="icon"></span
      ></template>
      <template v-slot:item-append="treeViewItem">
        <span v-if="treeViewItem.connect"
          >(연결상태: {{ treeViewItem.connect }})</span
        >
        &nbsp&nbsp&nbsp&nbsp&nbsp
        <span v-if="treeViewItem.user">(소유자: {{ treeViewItem.user }})</span>
        <button @click.stop.prevent="addNode(treeViewItem)">추가</button>
        <button @click.stop.prevent="deleteNode(treeViewItem)">삭제</button>
      </template>
    </Vue3TreeVue>
  </div>
</template>

<script lang="ts" setup>
import Vue3TreeVue from "vue3-tree-vue";
import "vue3-tree-vue/dist/style.css";

type TreeViewItem = {
  name: string;
  id?: string | number;
  children?: TreeViewItem[];
  checked?: boolean;
  selected?: boolean;
  expanded?: boolean;
  disabled?: boolean; // When disabled, an item can neither be selected or checked
  meta?: any; // provides meta-data of any type per node.
  user?: string;
  connect?: string;
  parent?: TreeViewItem;
};
const onItemChecked = (checkedItems: []) => console.log(checkedItems);
const onItemSelected = (item: TreeViewItem) => console.log(item);

/**
 * 트리 노드 추가, 삭제, 이름 변경은 내가 직접 구현..
 */
// const onExpanded = (expandedItem: TreeViewItem) => {
//   //fetch data
//   const lazyLoadedItems = fetchFromApi(...);
//   expandedItem.children.push(...lazyLoadedItems)
// }
const items = ref<TreeViewItem[]>([
  {
    name: "Node1",
    children: [{ name: "node1-1", children: [] }],
    connect: "연결",
    user: "강이정",
  },
  {
    name: "Node2",
    user: "강이정",
    children: [],
  },
]);
function addRootNode() {
  const node = { name: "새노드", children: [] };
  items.value.push(node);
}
function addNode(node: TreeViewItem) {
  const newNode = { name: "새노드", children: [], parent: node };
  if (node.children !== undefined && Array.isArray(node.children)) {
    node.children.push(newNode);
  } else {
    console.log("children 없음 ;;;");
    node.children = [newNode];
  }
}
function deleteNode(treeViewItem: TreeViewItem) {
  for (let i = 0; i < items.value.length; i++) {
    if (items.value[i].id === treeViewItem.id) {
      items.value.splice(i, 1);
      break;
    }
  }
}

function loadLazy(val) {
  console.log(val);
}
</script>
