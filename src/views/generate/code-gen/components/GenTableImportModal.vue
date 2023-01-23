<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="数据库表列表"
    @ok="handleSubmit"
    width="800px"
  >
    <Form>
      <FormItem label="数据源">
        <ApiSelect
          :api="api"
          placeholder="请选择数据源"
          :label-field="labelField"
          :value-field="valueField"
          @change="onApiChange"
        />
      </FormItem>
    </Form>
    <BasicTable
      ref="BasicTableRef"
      @register="registerTable"
      :rowSelection="rowSelection"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
import {Form,FormItem}from 'ant-design-vue';
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

</script>
<style scoped lang="less">

</style>
