<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleAdd" style="margin-right: 5px">新增</a-button>
<!--        <a-dropdown v-if="selectedRowKeys.length > 0">-->
<!--          <template #overlay>-->
<!--            <a-menu>-->
<!--              <a-menu-item key="1" @click="batchHandleDelete">-->
<!--                <Icon icon="ant-design:delete-outlined"></Icon>-->
<!--                删除-->
<!--              </a-menu-item>-->
<!--            </a-menu>-->
<!--          </template>-->
<!--          <a-button-->
<!--            >批量操作-->
<!--            <Icon icon="mdi:chevron-down"></Icon>-->
<!--          </a-button>-->
<!--        </a-dropdown>-->
      </template>
      <template #action="{ record }">
        <TableAction :actions="getActions(record)" />
      </template>
    </BasicTable>
    <DataSourceModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" name="monitor-datasource" setup>
  import { ref } from 'vue';
  import { BasicTable, useTable,TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getDataSourceList, deleteDataSource, batchDeleteDataSource } from './datasource.api';
  import { columns, searchFormSchema } from './datasource.data';
  import DataSourceModal from './DataSourceModal.vue';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const [registerModal, { openModal }] = useModal();

  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
      title: '任务列表',
      api: getDataSourceList,
      columns: columns,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        fieldMapToTime: [['fieldTime', ['beginDate', 'endDate'], 'YYYY-MM-DD HH:mm:ss']],
      },
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
    await deleteDataSource({ id: record.id }, reload);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    // await batchDeleteDataSource({ ids: selectedRowKeys.value }, reload);
  }
</script>
