import { FormSchema } from '/@/components/Table';
export const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
];
/**
 * 角色用户Columns
 */
export const userColumns = [
  {
    title: '用户账号',
    dataIndex: 'username',
  },
  {
    title: '用户姓名',
    dataIndex: 'realname',
  },
  {
    title: '状态',
    dataIndex: ['dict', 'status'],
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'roleCode',
    label: '角色编码',
    component: 'Input',
    colProps: { span: 8 },
  },
];
/**
 * 角色用户搜索form
 */
export const searchUserFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户账号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'realname',
    label: '用户姓名',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleCode',
    label: '角色编码',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '备注',
    field: 'description',
    component: 'InputTextArea',
  },
];
