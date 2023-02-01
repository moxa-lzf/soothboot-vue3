<template>
  <BasicTable @register="registerTable">
    <template #expandedRowRender="{ record }">
      <Description
        title="日志详情"
        layout="horizontal"
        :column="1"
        :data="getData(record)"
        :schema="getSchema(record)"
      />
    </template>
  </BasicTable>
</template>
<script lang="ts" name="basic-log" setup>
  import { h, ref, unref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { DescItem, Description } from '/@/components/Description/index';
  import { CodeEditor } from '/@/components/CodeEditor';
  import { logApi } from './log.api';
  import { columns, searchFormSchema } from './log.data';
  const logData = ref({});

  // 列表页面公共参数、方法
  const [registerTable] = useTable({
    title: '日志列表',
    api: logApi.page,
    columns,
    isTreeTable: true,
    useSearchForm: true,
    showTableSetting: true,
    expandRowByClick: false,
    bordered: true,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    beforeFetch(param) {
      const keyWord = param.keyWord;
      if (keyWord) {
        delete param.keyWord;
        param['bizModule'] = param['description'] = param['realname'] = keyWord;
      }
    },
  });
  function getData(record) {
    let id = record.id;
    if (!unref(logData)[id]) {
      unref(logData)[id] = [];
      logApi.get({ id: record.id }).then((res) => {
        unref(logData)[id] = res;
      });
    }
    return unref(logData)[id];
  }
  function getSchema(record) {
    const schema: DescItem[] = [
      {
        field: 'bizModule',
        label: '业务模块',
      },
      {
        field: 'description',
        label: '操作描述',
      },
      {
        field: 'username',
        label: '操作人账号',
      },
      {
        field: 'realname',
        label: '操作人名称',
      },
      {
        field: 'ip',
        label: 'IP',
      },
      {
        field: 'costTime',
        label: '耗时(毫秒)',
      },
      {
        field: 'logType',
        label: '日志类型',
        render: (val, data) => {
          if (data && data.dict) {
            return data.dict.logType;
          } else {
            return val;
          }
        },
      },
      {
        field: 'status',
        label: '状态',
        render: (val, data) => {
          if (data && data.dict) {
            return data.dict.status;
          } else {
            return val;
          }
        },
      },
      {
        field: 'requestType',
        label: '请求类型',
      },
      {
        field: 'method',
        label: '请求方法',
      },
      {
        field: 'requestUrl',
        label: '请求地址',
      },
      {
        field: 'userAgent',
        label: '操作设备',
      },
      {
        field: 'requestParam',
        label: '请求参数',
      },
      {
        field: 'createTime',
        label: '操作时间',
      },
    ];
    if (record.status > 0) {
      const errorSchema: DescItem[] = [
        {
          field: 'message',
          label: '异常信息',
        },
        {
          field: 'exceptionClass',
          label: '异常类名',
        },
        {
          field: 'stackTrace',
          label: '异常详情',
          render: (val) => {
            if (!val) {
              val = '';
            }
            return h(CodeEditor, { value: val, readonly: true });
          },
        },
      ];
      schema.push(...errorSchema);
    }
    return schema;
  }
</script>
