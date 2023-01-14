import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'dictName',
  },
  {
    title: '字典编码',
    dataIndex: 'dictCode',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '字典名称',
    field: 'dictName',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    label: '字典编码',
    field: 'dictCode',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '字典名称',
    field: 'dictName',
    required: true,
    component: 'Input',
  },
  {
    label: '字典编码',
    field: 'dictCode',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '描述',
    field: 'description',
    component: 'Input',
  },
];

export const dictItemColumns: BasicColumn[] = [
  {
    title: '名称',
    dataIndex: 'itemText',
  },
  {
    title: '数据值',
    dataIndex: 'itemValue',
  },
  {
    title: '描述',
    dataIndex: 'description',
  },
];

export const itemFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '字典名称',
    field: 'dictName',
    required: true,
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '字典项名称',
    field: 'itemText',
    required: true,
    component: 'Input',
  },
  {
    label: '数据值',
    field: 'itemValue',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '描述',
    field: 'description',
    component: 'Input',
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 1,
  },
];
