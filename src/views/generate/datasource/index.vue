<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button
        type="primary"
        preIcon="ant-design:plus-outlined"
        @click="handleAdd"
        style="margin-right: 5px"
        >新增</a-button
      >
    </template>
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
  <DataSourceModal @register="registerModal" @success="reload" />
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { datasourceApi } from './datasource.api';
  import { columns, searchFormSchema } from './datasource.data';
  import DataSourceModal from './DataSourceModal.vue';
  const [registerModal, { openModal }] = useModal();

  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
    title: '任务列表',
    api: datasourceApi.page,
    columns: columns,
    formConfig: {
      labelWidth: 100,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 100,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

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

  /**
   * 新增事件
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  /**
   * 编辑事件
   */
  function handleEdit(record) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await datasourceApi.remove({ id: record.id });
    reload();
  }
</script>
