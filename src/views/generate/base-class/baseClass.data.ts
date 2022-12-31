import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '基类名称',
    dataIndex: 'name',
  },
  {
    title: '基类包名',
    dataIndex: 'packageName',
  },
  {
    title: '基类字段',
    dataIndex: 'fields',
  }
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '基类名称',
    field: 'name',
    component: 'Input',
    colProps: { span: 6 },
  }
];

export const formSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '基类名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '基类包名',
    field: 'packageName',
    required: true,
    component: 'Input'},
  {
    label: '基类字段',
    field: 'fields',
    component: 'Input',
  },
];
