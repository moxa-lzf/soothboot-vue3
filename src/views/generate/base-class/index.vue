<template>
  <!--引用表格-->
  <BasicTable @register="registerTable">
  <template #fields>
  hello
  </template>
    <!--插槽:table标题-->
    <template #toolbar>
      <Button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate">
        新增
      </Button>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <!--字典弹窗-->
  <FieldTypeModal @register="registerModal" @success="handleSuccess" />
</template>

<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import {BasicTable, useTable, TableAction, ActionItem} from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import FieldTypeModal from './components/BaseClassModal.vue';
  import { columns, searchFormSchema } from './baseClass.data';
  import { baseClassApi } from './baseClass.api';

  const [registerModal, { openModal }] = useModal();
  // 列表页面公共参数、方法
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    title: '基类管理',
    api: baseClassApi.page,
    columns: columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    showIndexColumn: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  /**
   * 新增事件
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }
  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await baseClassApi.remove({ id: record.id });
    reload();
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
  function getTableAction(record): ActionItem[] {
    return [
      {
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
      },
      {
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>

<style scoped></style>
