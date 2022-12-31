<template>
  <!--引用表格-->
  <BasicTable @register="registerTable" :rowSelection="rowSelection">
    <!--插槽:table标题-->
    <template #tooltar>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleInitFieldType">
        初始化类型
      </a-button>
      <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出
      </a-button>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <!--字典弹窗-->
  <FieldTypeModal @register="registerModal" @success="handleSuccess" />
</template>

<script lang="ts" name="system-dict" setup>
//ts语法
import { ref, computed, unref } from "vue";
import { BasicTable, useTable, TableAction } from "/src/components/Table";
import { useDrawer } from "/src/components/Drawer";
import { useModal } from "/src/components/Modal";
import FieldTypeModal from "./components/FieldTypeModal.vue";
import { useMessage } from "/src/hooks/web/useMessage";
import { columns, searchFormSchema } from "./fieldType.data";
import { list, deleteFieldType, batchDeleteFieldType } from "./fieldType.api";

const { createMessage } = useMessage();
//字典model
const [registerModal, { openModal }] = useModal();
//字典配置drawer
const [registerDrawer, { openDrawer }] = useDrawer();
import { initTypeField } from "./fieldType.api";
// 列表页面公共参数、方法
const [registerTable, { reload, updateTableDataRecord }] = useTable({
  title: "类型映射",
  api: list,
  columns: columns,
  formConfig: {
    labelWidth: 80,
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

async function handleInitFieldType() {
  await initTypeField();
}

/**
 * 编辑事件
 */
async function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true
  });
}

/**
 * 详情
 */
async function handleDetail(record) {
  openModal(true, {
    record,
    isUpdate: true
  });
}

/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteFieldType({ id: record.id }, reload);
}

/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDeleteFieldType({ ids: selectedRowKeys.value }, reload);
}

/**
 * 成功回调
 */
function handleSuccess({ isUpdate, values }) {
  if (isUpdate) {
    updateTableDataRecord(values.id, values);
  } else {
    reload();
  }
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
</script>

<style scoped></style>
