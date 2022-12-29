<template>
  <!--引用表格-->
  <BasicTable @register="registerTable">
    <!--插槽:table标题-->
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增</a-button>
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
  import { ref, computed, unref } from 'vue';
  import { BasicTable,useTable, TableAction } from '/src/components/Table';
  import { useDrawer } from '/src/components/Drawer';
  import { useModal } from '/src/components/Modal';
  import FieldTypeModal from './components/BaseClassModal.vue';
  import { useMessage } from '/src/hooks/web/useMessage';
  import { columns, searchFormSchema } from './baseClass.data';
  import { list, deleteFieldType, batchDeleteFieldType } from './baseClass.api';

  const { createMessage } = useMessage();
  //字典model
  const [registerModal, { openModal }] = useModal();
  //字典配置drawer
  const [registerDrawer, { openDrawer }] = useDrawer();

  // 列表页面公共参数、方法
const [registerTable, { reload, updateTableDataRecord }]  = useTable({
      title: '基类管理',
      api: list,
      columns: columns,
      formConfig: {
        schemas: searchFormSchema,
      },
      actionColumn: {
        width: 240,
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
   * 详情
   */
  async function handleDetail(record) {
    openModal(true, {
      record,
      isUpdate: true,
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
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '确定删除吗?',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>

<style scoped></style>
