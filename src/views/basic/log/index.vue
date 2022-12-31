<template>
  <BasicTable @register="registerTable" :searchInfo="searchInfo" :columns="logColumns">
    <template #toolbar>
      <Tabs defaultActiveKey="1" @change="tabChange" size="small">
        <TabPane tab="登录日志" key="1"></TabPane>
      <TabPane tab="操作日志" key="2"></TabPane>
      <TabPane tab="访问日志" key="3"></TabPane>
      <TabPane tab="错误日志" key="4"></TabPane>
      </Tabs>
    </template>
  </BasicTable>
</template>
<script lang="ts" name="monitor-log" setup>
  import { ref } from 'vue';
  import{Tabs,TabPane}from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { logApi } from './log.api';
  import { columns, searchFormSchema, operationLogColumn } from './log.data';
  import { useMessage } from '/@/hooks/web/useMessage';
  const { createMessage } = useMessage();
  const checkedKeys = ref<Array<string | number>>([]);

  const logColumns = ref<any>(columns);
  const searchInfo = { logType: '1' };
  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
      title: '日志列表',
      api: logApi.page,
      expandRowByClick: true,
      showActionColumn: false,
      rowSelection: {
        columnWidth: 20,
      },
      formConfig: {
        schemas: searchFormSchema,
        fieldMapToTime: [['fieldTime', ['createTime_begin', 'createTime_end'], 'YYYY-MM-DD']],
      },
  });

  // 日志类型
  function tabChange(key) {
    searchInfo.logType = key;
    //update-begin---author:wangshuai ---date:20220506  for：[VUEN-943]vue3日志管理列表翻译不对------------
    if (key == '1') {
      logColumns.value = columns;
    } else {
      logColumns.value = operationLogColumn;
    }
    //update-end---author:wangshuai ---date:20220506  for：[VUEN-943]vue3日志管理列表翻译不对--------------
    reload();
  }

  /**
   * 选择事件
   */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }
</script>
