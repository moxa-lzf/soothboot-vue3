import { BasicColumn, FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
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
    title: '操作时间',
    dataIndex: 'createTime',
  },
  {
    title: '日志类型',
    dataIndex: ['dict', 'logType'],
  },
  {
    title: '状态',
    dataIndex: ['dict', 'status'],
    customRender: ({ record, value }) => render.renderDict('success_status', record.status, value),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'keyWord',
    label: '搜索日志',
    component: 'Input',
    componentProps: {
      placeholder: '请输入业务模块/操作描述/操作人名称',
    },
    colProps: { span: 5 },
  },
  {
    field: 'logType',
    component: 'DictSelect',
    label: '日志类型',
    componentProps: {
      code: 'log_type',
      compType: 'select',
      mode: 'multiple',
    },
    colProps: {
      span: 4,
    },
  },
  {
    field: 'status',
    component: 'DictSelect',
    label: '状态',
    componentProps: {
      code: 'success_status',
      compType: 'select',
      mode: 'multiple',
    },
    colProps: {
      span: 4,
    },
  },
  {
    field: 'createTime',
    component: 'RangePicker',
    label: '操作时间',
    componentProps: {
      valueType: 'Date',
    },
    colProps: {
      span: 4,
    },
  },
];
