import { BasicColumn, FormSchema } from '/@/components/Table';
import { templateGroupList } from './gen.template.api0';
import { h } from 'vue';
export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '模板名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const columns: BasicColumn[] = [
  {
    title: '模板名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '模板组名称',
    dataIndex: ['dict', 'groupId'],
    width: 200,
    align: 'left',
  },
  {
    title: '有效状态',
    dataIndex: 'validStatus',
    customRender: (record) => {
      console.log(record);
      return h('');
    },
    width: 200,
    align: 'left',
  },
];
export const formGroupSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: '模板组名称',
    component: 'Input',
    required: true,
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
    field: 'name',
    label: '模板名称',
    component: 'Input',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'groupId',
    label: '模板分类',
    component: 'ApiSelect',
    componentProps: {
      api: templateGroupList,
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'validStatus',
    label: '有效状态',
    component: 'DictSelect',
    required: true,
    componentProps: {
      code: 'valid_status',
      stringToNumber: true,
    },
    colProps: {
      span: 8,
    },
  },
];
