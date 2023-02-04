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
    <BasicTable ref="BasicTableRef" @register="registerTable" :rowSelection="rowSelection" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { Form, FormItem } from 'ant-design-vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { BasicModal } from '/@/components/Modal';
  import { genTableImportColumns } from '../genCode.data';
  import { getTableList, tableImport } from '../genCode.api';
  import { listLabel } from '/@/views/generate/datasource/datasource.api';
  import ApiSelect from '/@/components/Form/src/components/ApiSelect.vue';
  import { useModalInner } from '/@/components/Modal';

  // 选择key
  const checkedKeys = ref<any[]>([]);

  const BasicTableRef = ref(null);

  const searchInfo = ref({ id: 0 });

  const emit = defineEmits(['success']);
  //表单赋值
  const [registerModal, { openOKLoading, closeModal }] = useModalInner(async (data) => {});

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
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }
  async function onApiChange(value) {
    searchInfo.value.id = value;
    BasicTableRef.value.reload();
  }
  function handleSubmit() {
    openOKLoading(async () => {
      await tableImport(searchInfo.value.id, unref(checkedKeys));
      closeModal();
      emit('success');
    });
  }
</script>
<style scoped lang="less"></style>
