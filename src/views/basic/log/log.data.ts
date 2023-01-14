import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '业务模块',
    dataIndex: 'bizModule',
  },
  {
    title: '操作描述',
    dataIndex: 'description',
  },
  {
    title: '操作人账号',
    dataIndex: 'username',
  },
  {
    title: '操作人名称',
    dataIndex: 'realname',
  },
  {
    title: 'IP',
    dataIndex: 'ip',
  },
  {
    title: '耗时(毫秒)',
    dataIndex: 'costTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
];

/**
 * 操作日志需要操作类型
 */
export const operationLogColumn: BasicColumn[] = [
  ...columns,
  {
    title: '操作类型',
    dataIndex: 'operateType_dictText',
    width: 40,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyWord',
    label: '搜索日志',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'fieldTime',
    component: 'RangePicker',
    label: '创建时间',
    componentProps: {
      valueType: 'Date',
    },
    colProps: {
      span: 6,
    },
  },
];
