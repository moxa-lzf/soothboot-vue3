<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="部门列表"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'deptId', title: 'deptName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { listTree } from '/@/views/system/dept/dept.api';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);

      async function fetch() {
        treeData.value = (await listTree({})) as unknown as TreeItem[];
      }

      function getNodeIds(selectedNodes) {
        let nodeIds = [];
        if (selectedNodes && selectedNodes.length > 0) {
          for (let selectedNode of selectedNodes) {
            nodeIds.push(selectedNode.deptId);
            if (selectedNode.children && selectedNode.children.length > 0) {
              nodeIds.push(...getNodeIds(selectedNode.children));
            }
          }
        }
        return nodeIds;
      }

      function handleSelect(keys, { selectedNodes }) {
        emit('select', getNodeIds(selectedNodes));
      }

      onMounted(() => {
        fetch();
      });
      return { treeData, handleSelect };
    },
  });
</script>
