<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          preIcon="ant-design:plus-outlined"
          @click="handleAdd"
          style="margin-right: 5px"
          >新增
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <GenTemplateModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" name="monitor-datasource" setup>
  import { watch } from 'vue';
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { columns, searchFormSchema } from '../gen.template.data';
  import { templateApi } from '../gen.template.api';
  import GenTemplateModal from './GenTemplateModal.vue';

  const props = defineProps({
    data: { require: true, type: Object },
  });
  watch(
    () => props.data,
    () => {
      reload({ searchInfo: { groupId: props.data?.record?.id } });
    },
  );
  const [registerModal, { openModal }] = useModal();

  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
    title: '任务列表',
    api: templateApi.page,
    columns: columns,
    formConfig: {
      labelWidth: 80,
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
    await templateApi.remove({ id: record.id });
    reload();
  }
</script>
