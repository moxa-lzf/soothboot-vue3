import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { ApiSelect, DictSelect } from '/@/components/form/index';
import { listAttrType } from '/@/views/generate/field-type/fieldType.api';
import { templateGroupList } from '/@/views/generate/template/gen.template.api0';
import { baseClassApi } from '/@/views/generate/base-class/baseClass.api';
import { Checkbox, Input } from 'ant-design-vue';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '表名',
    dataIndex: 'tableName',
  },
  {
    title: '类名',
    dataIndex: 'className',
  },
  {
    title: '表说明',
    dataIndex: 'tableComment',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '表名称',
    field: 'tableName',
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
    label: '表名',
    field: 'tableName',
    required: true,
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '表描述',
    field: 'tableComment',
    required: true,
    component: 'Input',
  },
];

export const formConfirmSchema: FormSchema[] = [
  {
    label: '',
    field: 'id',
    component: 'Input',
    show: false,
  },
  {
    label: '表名',
    field: 'tableName',
    required: true,
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: '表备注',
    field: 'tableComment',
    required: true,
    component: 'Input',
  },

  {
    label: '类名',
    field: 'className',
    required: true,
    component: 'Input',
  },
  {
    label: '业务名',
    field: 'entityName',
    required: true,
    component: 'Input',
  },
  {
    label: '模块名',
    field: 'moduleName',
    required: true,
    component: 'Input',
  },
  {
    label: '包名',
    field: 'packageName',
    required: true,
    component: 'Input',
  },
  {
    label: '模板组',
    field: 'groupId',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: templateGroupList,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    label: '基类',
    field: 'baseId',
    component: 'ApiSelect',
    componentProps: {
      api: baseClassApi.list,
      labelField: 'name',
      valueField: 'id',
    },
  },
];

export const genTableImportColumns: BasicColumn[] = [
  {
    title: '表名称',
    dataIndex: 'tableName',
  },
  {
    title: '表备注',
    dataIndex: 'tableComment',
  },
];

export const genTableColumns: BasicColumn[] = [
  {
    title: '字段名称',
    dataIndex: 'columnName',
  },
  {
    title: '字段类型',
    dataIndex: 'typeName',
  },
  {
    title: '字段备注',
    dataIndex: 'columnComment',
    customRender: (opt) => {
      return h(Input, { value: opt.record.columnComment });
    },
  },
  {
    title: '属性名',
    dataIndex: 'attrName',
    customRender: (opt) => {
      return h(Input, { value: opt.record.attrName });
    },
  },
  {
    title: '属性类型',
    dataIndex: 'attrType',
    customRender: (opt) => {
      return h(ApiSelect, {
        api: listAttrType,
        value: opt.record.attrType,
        labelField: 'attrType',
        valueField: 'attrType',
      });
    },
  },
  {
    title: '主键',
    dataIndex: 'primaryPk',
    customRender: (opt) => {
      return h(Checkbox, {
        checked: opt.record.primaryPk,
        ['onUpdate:checked']: (checked) => {
          opt.record.primaryPk = checked;
        },
      });
    },
  },
  {
    title: '列表',
    dataIndex: 'listType',
    customRender: (opt) => {
      return h(DictSelect, { code: 'show_type', value: 'no_query' });
    },
  },
  {
    title: '表单',
    dataIndex: 'formType',
    customRender: (opt) => {
      return h(DictSelect, { code: 'show_type', value: 'no_query' });
    },
  },
  {
    title: '查询方式',
    dataIndex: 'searchType',
    customRender: (opt) => {
      return h(DictSelect, { code: 'rule_conditions', value: null });
    },
  },
  {
    title: '校验规则',
    dataIndex: 'validateType',
    customRender: (opt) => {
      return h(DictSelect, { code: 'validate_rule', value: null });
    },
  },
];
