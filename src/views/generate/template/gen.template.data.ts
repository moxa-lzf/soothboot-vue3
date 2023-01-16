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
  },
  {
    title: '模板组名称',
    dataIndex: ['dict', 'groupId'],
  },
  {
    title: '备注',
    dataIndex: 'description',
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
      span: 12,
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
      span: 12,
    },
  },
  {
    field: 'content',
    label: '模板',
    component: 'Input',
    required: true,
    slot: 'content',
    colProps: {
      span: 24,
    },
  },
];
