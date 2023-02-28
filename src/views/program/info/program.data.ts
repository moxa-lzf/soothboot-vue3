import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
export const columns: BasicColumn[] = [
  {
    title: '机器名称',
    dataIndex: 'machineName',
  },
  {
    title: '程序名称',
    dataIndex: 'programName',
  },
  {
    title: '截止日期',
    dataIndex: 'deadline',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '消息内容',
    field: 'message',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    component: 'DictSelect',
    label: '消息类别',
    componentProps: {
      code: 'message_type',
      compType: 'select',
      mode: 'multiple',
    },
    colProps: {
      span: 8,
    },
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
    label: '字典名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '字典编码',
    field: 'code',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '描述',
    field: 'description',
    component: 'Input',
  },
];

export const dictItemColumns: BasicColumn[] = [
  {
    title: '程序名称',
    dataIndex: 'programName',
  },
  {
    title: '消息内容',
    dataIndex: 'message',
  },
  {
    title: '消息类别',
    dataIndex: 'status',
    customRender:({record,value})=>{
      return render.renderDict('message_type', record.status, value);
    }
  },
  {
    title: '创建时间',
    dataIndex: 'creatTime',
  },
];

export const itemFormSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '字典名称',
    field: 'dictName',
    required: true,
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '字典项名称',
    field: 'name',
    required: true,
    component: 'Input',
  },
  {
    label: '数据值',
    field: 'value',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      return !!values.id;
    },
  },
  {
    label: '描述',
    field: 'description',
    component: 'Input',
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    defaultValue: 1,
  },
];
