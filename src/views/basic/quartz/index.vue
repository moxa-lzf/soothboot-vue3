<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          preIcon="ant-design:plus-outlined"
          type="primary"
          @click="handleAdd"
          style="margin-right: 5px"
          >新增</a-button
        >
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="getTableAction(record)"
          :dropDownActions="getDropDownAction(record)"
        />
      </template>
    </BasicTable>
    <QuartzModal @register="registerModal" @success="reload" />
  </div>
</template>
<script lang="ts" name="monitor-quartz" setup>
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { executeImmediately, resumeJob, pauseJob, quartzApi } from './quartz.api';
  import { columns, searchFormSchema } from './quartz.data';
  import QuartzModal from './QuartzModal.vue';

  const [registerModal, { openModal }] = useModal();
  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
    title: '定时任务列表',
    api: quartzApi.page,
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
   * 操作列定义
   * @param record
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
  function getDropDownAction(record): ActionItem[] | null {
    return [
      {
        label: '启动',
        popConfirm: {
          title: '是否启动选中任务?',
          confirm: handlerResume.bind(null, record),
        },
        ifShow: (_action) => {
          return record.status == -1;
        },
      },
      {
        label: '停止',
        popConfirm: {
          title: '是否暂停选中任务?',
          confirm: handlerPause.bind(null, record),
        },
        ifShow: (_action) => {
          return record.status == 0;
        },
      },
      {
        label: '立即执行',
        popConfirm: {
          title: '是否立即执行任务?',
          confirm: handlerExecute.bind(null, record),
        },
      }
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
    await quartzApi.remove({ id: record.id });
    reload();
  }

  /**
   * 立即执行
   */
  async function handlerExecute(record) {
    await executeImmediately({ id: record.id }, reload);
  }

  /**
   * 暂停
   */
  async function handlerPause(record) {
    await pauseJob({ id: record.id }, reload);
  }

  /**
   * 启动
   */
  async function handlerResume(record) {
    await resumeJob({ id: record.id }, reload);
  }
</script>
