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
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
    <GenTemplateModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" name="monitor-datasource" setup>
  import { ref, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { columns, searchFormSchema } from '../gen.template.data';
  import { remove, removeBatch } from '../gen.template.api0';
  import { templateApi } from '../gen.template.api';
  import GenTemplateModal from './GenTemplateModal.vue';

  const props = defineProps({
    data: { require: true, type: Object },
  });
  watch(
    () => props.data,
    () => {
      reload({ searchInfo: { groupId: props.data.record.id } });
    },
  );
  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();

  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
    title: '任务列表',
    api: templateApi.page,
    columns: columns,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
      fieldMapToTime: [['fieldTime', ['beginDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']],
    },
    showIndexColumn: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
  });

  /**
   * 操作列定义
   * @param record
   */
  function getActions(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
      {
        label: '删除',
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
    await remove({ id: record.id }, reload);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await removeBatch({ ids: selectedRowKeys.value }, reload);
  }
</script>
