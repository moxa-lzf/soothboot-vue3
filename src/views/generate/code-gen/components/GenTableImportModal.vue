<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="数据库表列表"
    @ok="handleSubmit"
    width="800px"
  >
    <a-form :label-col="{ span: 2 }" :wrapper-col="{ span: 6 }">
      <a-form-item label="数据源">
        <ApiSelect
          :api="api"
          :label-field="labelField"
          :value-field="valueField"
          @change="onApiChange"
        />
      </a-form-item>
    </a-form>
    <BasicTable
      ref="BasicTableRef"
      @register="registerTable"
      :rowClassName="getRowClassName"
      :rowSelection="rowSelection"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicModal } from '/@/components/Modal';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { genTableImportColumns } from '../genTable.data';
  import { getTableList, tableImport } from '../genTable.api';
  import { listLabel } from '/@/views/generate/datasource/datasource.api';
  import ApiSelect from '/@/components/Form/src/components/ApiSelect.vue';
  import { useModalInner } from '/@/components/Modal';

  const { prefixCls } = useDesign('row-invalid');
  // 选择key
  const checkedKeys = ref<any[]>([]);

  const BasicTableRef = ref(null);

  const searchInfo = ref({ id: 0 });

  const emit = defineEmits(['success']);
  //表单赋值
  const [registerModal, { closeModal }] = useModalInner(async (data) => {});

  const [registerTable] = useTable({
    api: getTableList,
    columns: genTableImportColumns,
    formConfig: {
      labelAlign: 'right',
      wrapperCol: {},
      // schemas: codeGenSearchFormSchema,
      // autoSubmitOnEnter: true,
    },
    searchInfo: searchInfo,
    rowKey: (record) => record.tableName,
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
  };
  const { api, labelField, valueField } = {
    api: listLabel,
    labelField: 'name',
    valueField: 'id',
  };

  /**
   * 选择事件
   */
  function onSelectChange(selectedRowKeys: (string | number)[], selectedRows) {
    checkedKeys.value = selectedRowKeys;
  }
  async function onApiChange(value) {
    searchInfo.value.id = value;
    BasicTableRef.value.reload();
  }
  async function handleSubmit() {
    await tableImport(searchInfo.value.id, unref(checkedKeys));
    closeModal();
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
