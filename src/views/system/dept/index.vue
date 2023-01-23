<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Button type="primary" @click="handleCreate"> 新增部门</Button>
        <Button type="primary" preIcon="ic:round-expand" @click="expandAll">展开全部</Button>
        <Button type="primary" preIcon="ic:round-compress" @click="collapseAll">折叠全部 </Button>
      </template>
         <template #selected>
      <a @click="handleRemoveBatch">删除</a>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="getTableAction(record)"
          :dropDownActions="getDropDownAction(record)"
        />
      </template>
    </BasicTable>
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import DeptModal from './DeptModal.vue';
  import { columns, searchFormSchema } from './dept.data';
  import { deptApi, listTree } from './dept.api';
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, expandAll, collapseAll,getSelectRowKeys }] = useTable({
    title: '部门列表',
    api: listTree,
    columns,
    expandRowByClick: true,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    rowSelection:{type:'checkbox'},
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    await deptApi.remove({ id: record.id });
    reload();
  }
async function handleRemoveBatch(){
  const selectRowKeys=getSelectRowKeys();
 await deptApi.removeBatch(selectRowKeys,reload);
}
  function handleSuccess() {
    reload();
  }

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

  function getDropDownAction(record): ActionItem[] | null {
    return null;
  }
</script>
