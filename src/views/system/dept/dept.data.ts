import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
  },
  {
    title: '部门编码',
    dataIndex: 'deptCode',
  },
  {
    title: '状态',
    dataIndex: ['dict', 'status'],
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'deptCode',
    label: '部门编码',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'deptCode',
    label: '部门编码',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
    },
  },
  {
    field: 'orderNo',
    label: '排序',
    defaultValue: 1,
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'status',
    label: '状态',
    component: 'DictSelect',
    defaultValue: 0,
    componentProps: {
      code: 'status',
      compType: 'radioButton',
      stringToNumber: true,
    },
    required: true,
  },
  {
    label: '备注',
    field: 'description',
    component: 'InputTextArea',
  },
];
