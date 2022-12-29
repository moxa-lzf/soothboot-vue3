import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '字段类型',
    dataIndex: 'columnType',
  },
  {
    title: '属性类型',
    dataIndex: 'attrType',
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '字段类型',
    field: 'columnType',
    component: 'Input',
  },
  {
    label: '属性类型',
    field: 'attrType',
    component: 'Input',
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
    label: '字段类型',
    field: 'columnType',
    required: true,
    component: 'Input',
  },
  {
    label: '属性类型',
    field: 'attrType',
    required: true,
    component: 'Input'
  },
];
