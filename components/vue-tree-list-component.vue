<template>
  <div>
    {{ checkList }}
    <button @click="addNode">Add Node</button>
    <VueTreeList
      :model="treeData"
      @click="onClick"
      @changeName="onChangeName"
      @deleteNode="onDeleteNode"
      @addNode="onAddNode"
      default-tree-node-name="New node"
      default-leaf-node-name="New leaf"
      v-bind:default-expanded="false"
    >
      <!--      <template v-slot:treeNodeIcon="slotProps">-->
      <!--        <input-->
      <!--          type="checkbox"-->
      <!--          :id="'checkbox_' + slotProps.model.id"-->
      <!--          :name="slotProps.model.name"-->
      <!--          :value="slotProps.model.id"-->
      <!--          :checked="checkList.includes(slotProps.model.id)"-->
      <!--          @click="onCheck($event.target.checked, slotProps.model.id)"-->
      <!--        />-->
      <!--        &lt;!&ndash;        {{ slotProps.model }}&ndash;&gt;-->
      <!--      </template>-->
      <!--      <template v-slot:leafNodeIcon="slotProps">-->
      <!--        <input type="checkbox" :id="'checkbox_' + slotProps.model.id" />-->
      <!--        {{ slotProps.model }}-->
      <!--        <span class="icon">🍃</span>-->
      <!--      </template>-->
      <!--      <template v-slot:leafNameDisplay="slotProps">-->
      <!--        <span>{{ slotProps.model.name }} #{{ slotProps.model.id }}</span>-->
      <!--      </template>-->
      <!--      <template v-slot:addTreeNodeIcon="slotProps">-->
      <!--        <span class="icon">📂</span>-->
      <!--      </template>-->
      <!--      <template v-slot:addLeafNodeIcon="slotProps">-->
      <!--        <span class="icon">＋</span>-->
      <!--      </template>-->
      <!--      <template v-slot:editNodeIcon="slotProps">-->
      <!--        <span class="icon">📃</span>-->
      <!--      </template>-->
      <!--      <template v-slot:delNodeIcon="slotProps">-->
      <!--        <span class="icon" @click="onDel">✂️</span>-->
      <!--      </template>-->
      <!--      <template v-slot:treeNodeIcon="slotProps">-->
      <!--        <span class="icon">-->
      <!--          {{-->
      <!--            slotProps.model.children &&-->
      <!--            slotProps.model.children.length > 0 &&-->
      <!--            !slotProps.expanded-->
      <!--              ? "🌲"-->
      <!--              : ""-->
      <!--          }}</span-->
      <!--        >-->
      <!--      </template>-->
    </VueTreeList>
    <pre>
          {{ treeData }}
        </pre
    >
  </div>
</template>

<script setup lang="ts">
import { VueTreeList, Tree, TreeNode } from "vue-tree-list-vue3/src";

const newTree = {};
const treeData = ref(
  new Tree([
    {
      name: "테스트1",
      id: 1,
      pid: 0,
      dragDisabled: true,
      addTreeNodeDisabled: false,
      addLeafNodeDisabled: false,
      editNodeDisabled: false,
      delNodeDisabled: false,
      children: [
        {
          name: "Node 1-2",
          id: 2,
          isLeaf: true,
          pid: 1,
        },
      ],
    },
    {
      name: "Node 2",
      id: 3,
      pid: 0,
      disabled: true,
    },
    {
      name: "Node 3",
      id: 4,
      pid: 0,
    },
  ]),
);

// 기획서에 체크박스 기능 없음. 안만들어두됌
const checkList = ref([]);
function onCheck(isCheck: boolean, checkedNode: string | number) {
  if (isCheck) {
    checkList.value.push(checkedNode);
  } else {
    let indexToRemove = checkList.value.indexOf(checkedNode);
    if (indexToRemove !== -1) {
      checkList.value.splice(indexToRemove, 1);
    }
  }
}
function addNode() {
  const node = new TreeNode({ name: "New node", isLeaf: false });
  if (!treeData.value.children) treeData.value.children = [];
  treeData.value.addChildren(node);
  console.log("add Node");
}
function onChangeName(params) {
  console.log(params);
}
function onClick(val: any) {
  console.log(val);
}
function onDeleteNode(node: any) {
  console.log("on Delete");
  node.value.remove();
}
function onAddNode(params) {
  console.log(params);
}
function getNodeId(node) {
  console.log(node);
}
</script>

<style lang="less" rel="stylesheet/less">
.vtl {
  .vtl-drag-disabled {
    background-color: #d0cfcf;
    &:hover {
      background-color: #d0cfcf;
    }
  }
  .vtl-disabled {
    background-color: #d0cfcf;
  }
}
</style>

<style lang="less" rel="stylesheet/less" scoped>
.icon {
  &:hover {
    cursor: pointer;
  }
}

.muted {
  color: gray;
  font-size: 80%;
}
</style>
