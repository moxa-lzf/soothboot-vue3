import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
export const columns: BasicColumn[] = [
  {
    title: '基类全类名',
    dataIndex: 'className',
  },
  {
    title: '基类字段',
    dataIndex: 'fields',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '基类全类名',
    field: 'className',
    component: 'Input',
    colProps: { span: 6 },
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
    label: '基类全类名',
    field: 'className',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '基类字段',
    field: 'fields',
    component: 'Input',
  },
];
