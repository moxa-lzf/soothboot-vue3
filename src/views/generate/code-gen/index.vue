<template>
  <!--引用表格-->
  <BasicTable @register="registerTable">
    <!--插槽:table标题-->
    <template #toolbar>
      <Button type="primary" preIcon="ant-design:plus-outlined" @click="handleImport">
        数据库表导入
      </Button>
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
  import { ref, computed, unref } from 'vue';
  import { Button } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import GenTableModal from './components/GenTableFieldModal.vue';
  import GenTableImportModal from './components/GenTableImportModal.vue';
  import GenCodeConfirmModal from './components/GenCodeConfirmModal.vue';
  import { columns, searchFormSchema } from './genTable.data';
  import { genCodeApi, preview } from './genTable.api';

  //字典model
  const [registerImportModal, { openModal: openImportModal }] = useModal();
  const [registerModal, { openModal }] = useModal();
  const [registerConfirmModal, { openModal: openConfirmModal }] = useModal();

  //字典配置drawer
  import { ActionItem } from '/@/components/Table';
  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
    title: '代码生成',
    api: genCodeApi.page,
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
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openModal(true, {
      record,
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
      record,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await genCodeApi.remove({ id: record.id });
    reload();
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
   * 下拉操作栏
   */
  function getDropDownAction(record): ActionItem[]|null{
    return [
      {
        label: '预览',
        onClick: handlePreview.bind(null, record),
      },
      {
        label: '生成',
        onClick: handleGenerate.bind(null, record),
      },
      {
        label: '同步',
        onClick: handlePreview.bind(null, record),
      },
    ];
  }
</script>

<style scoped></style>
