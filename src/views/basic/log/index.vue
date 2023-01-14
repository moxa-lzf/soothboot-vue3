<template>
  <BasicTable @register="registerTable" :searchInfo="searchInfo" :columns="logColumns">
    <template #toolbar>
      <Tabs defaultActiveKey="auth" @change="tabChange" size="small">
        <TabPane tab="认证日志" key="auth" />
        <TabPane tab="操作日志" key="operate" />
      </Tabs>
    </template>
  </BasicTable>
</template>
<script lang="ts" name="monitor-log" setup>
  import { ref } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { logApi } from './log.api';
  import { columns, searchFormSchema, operationLogColumn } from './log.data';
  const checkedKeys = ref<Array<string | number>>([]);

  const logColumns = ref<any>(columns);
  const searchInfo = { logType: '1' };
  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
    title: '日志列表',
    api: logApi.page,
    showIndexColumn: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    formConfig: {
      labelWidth: 100,
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
