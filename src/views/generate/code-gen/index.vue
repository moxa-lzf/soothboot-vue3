<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tooltar>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleImport">
        数据库表导入
      </a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="batchHandleDelete">
              <Icon icon="ant-design:delete-outlined"></Icon>
              删除
            </a-menu-item>
          </a-menu>
        </template>
        <a-button
        >批量操作
          <Icon icon="ant-design:down-outlined"></Icon>
        </a-button>
      </a-dropdown>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
    </template>
  </BasicTable>
  <GenTableImportModal @register="registerImportModal" @success="reload" />
  <GenTableModal @register="registerModal" />
  <GenCodeConfirmModal @register="registerConfirmModal" />
</template>

<script lang="ts" name="system-dict" setup>
//ts语法
import { ref, computed, unref } from "vue";
import { BasicTable, useTable, TableAction } from "/src/components/Table";
import { useModal } from "/src/components/Modal";
import GenTableModal from "./components/GenTableFieldModal.vue";
import GenTableImportModal from "./components/GenTableImportModal.vue";
import GenCodeConfirmModal from "./components/GenCodeConfirmModal.vue";
import { useMessage } from "/src/hooks/web/useMessage";
import { columns, searchFormSchema } from "./genTable.data";
import { list, deleteDict, batchDeleteDict, preview } from "./genTable.api";

const { createMessage } = useMessage();
//字典model
const [registerImportModal, { openModal: openImportModal }] = useModal();
const [registerModal, { openModal }] = useModal();
const [registerConfirmModal, { openModal: openConfirmModal }] = useModal();

//字典配置drawer
import { ActionItem } from "/@/components/Table";
// 列表页面公共参数、方法
const [registerTable, { reload, updateTableDataRecord }] = useTable({
  title: "代码生成",
  api: list,
  columns: columns,
  formConfig: {
    schemas: searchFormSchema
  },
  actionColumn: {
    width: 240
  },
  showIndexColumn: false,
  useSearchForm: true,
  showTableSetting: true,
  bordered: true
});

/**
 * 编辑事件
 */
async function handleEdit(record: Recordable) {
  openModal(true, {
    record
  });
}

/**
 * 详情
 */
async function handlePreview(record) {
  await preview({ tableId: record.id });
}

function handleGenerate(record) {
  openConfirmModal(true, {
    record
  });
}

/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteDict({ id: record.id }, reload);
}

/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDeleteDict({ ids: selectedRowKeys.value }, reload);
}

/**
 * 字典配置
 */
function handleImport() {
  openImportModal();
}

/**
 * 操作栏
 */
function getTableAction(record) {
  return [
    {
      label: "编辑",
      onClick: handleEdit.bind(null, record)
    }
  ];
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record): ActionItem[] {
  return [
    {
      label: "预览",
      onClick: handlePreview.bind(null, record)
    },
    {
      label: "生成",
      onClick: handleGenerate.bind(null, record)
    },
    {
      label: "同步",
      onClick: handlePreview.bind(null, record)
    },
    {
      label: "删除",
      popConfirm: {
        title: "是否确认删除",
        confirm: handleDelete.bind(null, record)
      }
    }
  ];
}
</script>

<style scoped></style>
