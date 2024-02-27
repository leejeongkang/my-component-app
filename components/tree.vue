<template>
  <div>
    <slot name="add" @click="$emit('addRootNode', addRootNode)"></slot>
    <div v-if="editMode">
      <input v-model="newName" />
      <button @click="editNode">수정</button>
    </div>
    <ClientOnly>
      <Vue3TreeVue
        :items="items"
        :isCheckable="true"
        :hideGuideLines="hideGuideLines"
        :lazyLoad="lazyLoad"
        @onCheck="checkNode"
        @onSelect="selectNode"
        @onExpand="openNode"
        @onCollapse="closeNode"
      >
        <template v-slot:item-prepend-icon="treeViewItem">
          <span class="icon">📂</span>
        </template>
        <template v-slot:item-prepend="treeViewItem"
          ><span class="icon"></span
        ></template>
        <template v-slot:item-append="treeViewItem">
          <span v-if="treeViewItem.connect"
            >(연결 상태: {{ treeViewItem.connect }})</span
          >
          &nbsp&nbsp&nbsp&nbsp&nbsp
          <span v-if="treeViewItem.user"
            >(소유자: {{ treeViewItem.user }})</span
          >
          <button @click.stop.prevent="addNode(treeViewItem)">추가</button>
          <button @click.stop.prevent="showEditInput(treeViewItem)">
            수정
          </button>
          <button @click.stop.prevent="deleteNode(treeViewItem)">삭제</button>
        </template>
      </Vue3TreeVue>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Vue3TreeVue from "vue3-tree-vue";
import "vue3-tree-vue/dist/style.css";
import type { PropType, Ref } from "vue";
import _ from "lodash";
import { TreeNode } from "@/components/composables/Tree";

interface TreeViewItem {
  name: String;
  id?: String | Number;
  children: TreeViewItem[];
  checked?: Boolean;
  selected?: Boolean;
  expanded?: Boolean;
  disabled?: Boolean; // When disabled, an item can neither be selected or checked
  meta?: any; // provides meta-data of any type per node.
  user?: String;
  connect?: String;
}
const props = defineProps({
  items: {
    type: Array as PropType<Array<TreeViewItem>>,
    default: null,
  },
  hideGuideLines: {
    type: Boolean,
    default: false,
  },
  lazyLoad: {
    type: Boolean,
    default: false,
  },
  isCheckable: {
    type: Boolean,
    default: false,
  },
  checkboxStyle: {
    required: false,
  },
  dropValidator: {
    required: false,
  },
});
const emit = defineEmits<{
  (e: "check", item: [TreeViewItem]): void;
  (e: "select", item: TreeViewItem): void;
  (e: "open", item: TreeViewItem): void;
  (e: "close", item: TreeViewItem): void;
}>();

const tree: {
  data: Array<TreeViewItem>;
  selectedNode: TreeViewItem | null;
} = reactive({
  data: [],
  selectedNode: null,
});

if (props.items) {
  tree.data = props.items;
}
function checkNode(checkedNodes: [TreeViewItem]): void {
  emit("check", checkedNodes);
}
function selectNode(node: TreeViewItem): void {
  addNode(node);
  emit("select", node);
}
function openNode(node: TreeViewItem): void {
  emit("open", node);
}
function closeNode(node: TreeViewItem): void {
  emit("close", node);
}
function addRootNode(): void {
  const node: TreeViewItem = {
    name: "새노드",
    children: [],
  };
  tree.data.push(node);
}
// TODO: children 이 children key 값을 갖지 않을 경우 에도 개발 필요
function addNode(node: TreeViewItem): void {
  console.log(node);
  const newNode = { name: "새노드", children: [] };
  if (!node.hasOwnProperty("children") || !Array.isArray(node.children)) {
    // Object.defineProperty(node, "children", {
    //   value: [],
    //   writable: true,
    //   enumerable: true,
    //   configurable: true,
    // });
    let foundNode = tree.data.find((v) => v.id === node.id);
    if (foundNode) {
      foundNode.children = [newNode];
    } else {
      console.error("Can not Found Node Data...");
    }
    node.children = [newNode];
  } else {
    node.children.push(newNode);
    console.log(node);
  }
}

//TODO) K : 1.9 -> 2.3 -> 3.0 -> 3.2 -> 3.9
//TODO) CREA : 3.1 -> 2.88 -> 1.9
//TODO) BUN : 62.4 -> 40

//TODO: 피하 수액 이후

//TODO) K : 3.9 -> 4.1
//TODO) CREA : 1.9 -> 1.4
//TODO) BUN : 40 -> 26

function deleteNode(node: TreeViewItem): void {
  for (let i = 0; i < tree.data.length; i++) {
    if (tree.data[i].id === node.id) {
      tree.data.splice(i, 1);
      break;
    }
  }
}
const editMode: Ref<Boolean> = ref(false);
const newName: Ref<String> = ref("");
function showEditInput(node: TreeViewItem): void {
  editMode.value = !editMode.value;
  tree.selectedNode = node;
}
function editNode(): void {
  if (_.isNil(tree.selectedNode) || _.isEmpty(tree.selectedNode)) {
    return console.error("Can not Found Node Data...");
  } else {
    let foundNode = tree.data.find((v) => v.id === tree.selectedNode!.id);
    if (foundNode) {
      foundNode.name = newName.value;
    } else {
      console.error("Can not Found Node Data...");
    }
  }

  console.log(tree.data);
  editMode.value = !editMode.value;
  newName.value = "";
}
</script>
