import { BasicColumn, FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '任务类名',
    dataIndex: 'jobClassName',
    width: 200,
    align: 'left',
  },
  {
    title: 'Cron表达式',
    dataIndex: 'cronExpression',
    width: 200,
  },
  {
    title: '参数',
    dataIndex: 'parameter',
    width: 200,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'jobClassName',
    label: '任务类名',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'status',
    label: '任务状态',
    component: 'DictSelect',
    componentProps: {
      dictCode: 'quartz_status',
      stringToNumber: true,
    },
    colProps: { span: 6 },
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
    field: 'jobClassName',
    label: '任务类名',
    component: 'Input',
    required: true,
  },
  {
    field: 'cronExpression',
    label: 'Cron表达式',
    component: 'Input',
    required: true,
    slot: 'cron',
  },
  {
    field: 'parameter',
    label: '参数',
    component: 'InputTextArea',
  },
  {
    field: 'description',
    label: '描述',
    component: 'InputTextArea',
  },
];
