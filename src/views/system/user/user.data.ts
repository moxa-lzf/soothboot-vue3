import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'username',
    width: 100,
  },
  {
    title: '昵称',
    dataIndex: 'realname',
    width: 100,
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    width: 80,
    customRender: render.renderAvatar,
  },
  {
    title: '性别',
    dataIndex: ['dict', 'sex'],
    width: 80,
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: 100,
  },
  {
    title: '部门',
    width: 100,
    dataIndex: 'orgCodeTxt',
  },
  {
    title: '状态',
    dataIndex: 'status_dictText',
    width: 80,
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
//  {
//    label: '角色',
//    field: 'role',
//    component: 'ApiSelect',
//    componentProps: {
//      api: getAllRoleList,
//      labelField: 'roleName',
//      valueField: 'roleValue',
//    },
//    required: true,
//  },
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
    field: 'realname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '性别',
    field: 'sex',
    component: 'Input',
    required: true,
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
