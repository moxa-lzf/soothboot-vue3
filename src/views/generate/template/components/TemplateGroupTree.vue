<template>
  <BasicTree
    title="模板组"
    toolbar
    :treeData="treeData"
    :actionList="actionList"
    @select="onSelect"
  >
    <template #treeAction>
      <PlusOutlined @click="handlePlus"></PlusOutlined>
    </template>
  </BasicTree>
  <TemplateGroupModal @register="registerModal"
                      @success="initTemplateGroupTree"></TemplateGroupModal>
</template>
<script setup lang="ts">
import { h, ref } from "vue";
import { BasicTree, ActionItem } from "/@/components/Tree/index";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import { Popconfirm } from "ant-design-vue";
import { useModal } from "/@/components/Modal";
import { templateGroupList, removeGroup } from "../gen.template.api0";

const [registerModal, { openModal }] = useModal();
import TemplateGroupModal from "./TemplateGroupModal.vue";

const treeData = ref([]);

const emit = defineEmits(["select"]);

function onSelect(selKeys, event) {
  emit("select", event.selectedNodes[0]);
}

function initTemplateGroupTree() {
  templateGroupList().then(data => {
    treeData.value = data.map(group => {
      return { key: group.id + "", title: group.name, record: group };
    });
  });
}

initTemplateGroupTree();

function handlePlus() {
  openModal(true, {
    isUpdate: false
  });
}

function handleEdit(node: any) {
  openModal(true, {
    record: node.record,
    isUpdate: true
  });
}

async function handleRemove(node: any) {
  await removeGroup({ id: node.record.id });
  initTemplateGroupTree();
}

const actionList: ActionItem[] = [
  {
    render: (node) => {
      return h(EditOutlined, {
        onClick: () => {
          handleEdit(node);
        }
      });
    }
  },
  {
    render: (node) => {
      return h(Popconfirm, {
        title: "是否确认删除?",
        onConfirm() {
          handleRemove(node);
        }
      }, [h(DeleteOutlined)]);
    }
  }
];
</script>
