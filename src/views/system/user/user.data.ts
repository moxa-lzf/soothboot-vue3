import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import{roleApi}from '/@/views/system/role/role.api';
export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'username',
  },
  {
    title: '昵称',
    dataIndex: 'realname',
  },
  {
    title: '性别',
    dataIndex: ['dict', 'sex'],
    width: 80,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '状态',
    dataIndex: ['dict', 'status'],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '账号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'realname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'Input',
    colProps: { span: 6 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'username',
    label: '账号',
    component: 'Input',
    rules: [
      {
        required: true,
      },
      {
//        validator(_, value) {
//          return new Promise((resolve, reject) => {
//            isAccountExist(value)
//              .then(() => resolve())
//              .catch((err) => {
//                reject(err.message || '验证失败');
//              });
//          });
//        },
      },
    ],
  },
  {
    field: 'realname',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  {
    label: '角色',
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: roleApi.list,
      mode: 'multiple',
      labelField: 'roleName',
      valueField: 'id',
    },
    required: true,
  },
  {
    field: 'dept',
    label: '部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    label: '性别',
    field: 'sex',
    component: 'Input',
  },
  {
    label: '手机号码',
    field: 'phone',
    component: 'Input',
    dynamicRules: ({ model, schema }) => {
      return [
        { pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '手机号码格式有误' },
        ];
      },
  }
];
