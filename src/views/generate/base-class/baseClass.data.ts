import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import {h } from 'vue';
import { Select ,Tag } from 'ant-design-vue';
export const columns: BasicColumn[] = [
  {
    title: '基类全类名',
    dataIndex: 'className',
    width: 300
  },
  {
    title: '基类字段',
    dataIndex: 'fields',
    customRender({value}){
      if(!value){
        return '';
      }
      return h('span' ,value.map(v=>h('span',{class:'mr-4'},h(Tag,{color:'blue'},v))));
    }
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
    component: 'Select',
    componentProps: {
      mode: 'tags',
    }
  },
];
