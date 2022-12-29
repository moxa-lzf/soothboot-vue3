<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="数据库表列表" @ok="handleSubmit" width="800px">
    <a-form
      :label-col="{ span: 2}"
      :wrapper-col="{ span: 6}">
      <a-form-item label="数据源">
        <ApiSelect :api="api" :label-field="labelField" :value-field="valueField" @change="onApiChange"></ApiSelect>
      </a-form-item>
    </a-form>
    <BasicTable ref="BasicTableRef" @register="registerTable" :rowClassName="getRowClassName"
                :rowSelection="rowSelection">
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
import {ref, unref} from 'vue';
import {BasicTable, useTable} from '/src/components/Table';
import {BasicModal} from '/src/components/Modal';
import {useDesign} from '/@/hooks/web/useDesign';
import {genTableImportColumns} from '../genTable.data';
import {getTableList, tableImport} from '../genTable.api';
import {getAllDataSourceList} from '/@/views/basic/datasource/datasource.api'
import {ColEx} from '/@/components/Form/src/types';
import ApiSelect from "/@/components/Form/src/components/ApiSelect.vue";
import {useModalInner} from "/@/components/Modal";

const {prefixCls} = useDesign('row-invalid');
// 选择key
const checkedKeys = ref<any[]>([]);

const BasicTableRef=ref(null)

const searchInfo=ref({id:0})

const emit = defineEmits(['success']);
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
});
// 自适应列配置
const adaptiveColProps: Partial<ColEx> = {
  xs: 24, // <576px
  sm: 24, // ≥576px
  md: 24, // ≥768px
  lg: 12, // ≥992px
  xl: 12, // ≥1200px
  xxl: 8, // ≥1600px
};
const [registerTable, {reload, setProps}] = useTable({
  api: getTableList,
  columns: genTableImportColumns,
  formConfig: {
    baseColProps: adaptiveColProps,
    labelAlign: 'right',
    wrapperCol: {},
    // schemas: codeGenSearchFormSchema,
    // autoSubmitOnEnter: true,
  },
  searchInfo:searchInfo,
  rowKey:record=>record.tableName,
  striped: true,
  // useSearchForm: true,
  bordered: true,
  showIndexColumn: false,
  canResize: false,
  immediate: false,
});
const rowSelection = {
  type: 'checkbox',
  columnWidth: 30,
  selectedRowKeys: checkedKeys,
  onChange: onSelectChange,
}
const {api, labelField, valueField} = {
  api: getAllDataSourceList,
  labelField: "name",
  valueField: "id"
};

/**
 * 选择事件
 */
function onSelectChange(selectedRowKeys: (string | number)[],selectedRows) {
  checkedKeys.value = selectedRowKeys;
}
async function onApiChange(value){
  searchInfo.value.id=value
  BasicTableRef.value.reload()
}
async function handleSubmit() {
  await tableImport(searchInfo.value.id, unref(checkedKeys));
  closeModal()
  emit('success');
}

function getRowClassName(record) {
  return record.status == 0 ? prefixCls : '';
}
</script>
<style scoped lang="less">
@prefix-cls: ~'@{namespace}-row-invalid';

::v-deep(.@{prefix-cls}) {
  background: #f4f4f4;
  color: #bababa;
}
</style>
