<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    defaultFullscreen
    title="数据字段列表"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal } from '/@/components/Modal';
  import { genTableColumns } from '../genCode.data';
  import { BasicTable, useTable } from '/@/components/Table/index';
  import { useModalInner } from '/@/components/Modal';
  import { genCodeApi } from '../genCode.api';

  //表单赋值
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    reload({ searchInfo: { tableId: data.record.id } });
  });
  const [registerTable, { reload }] = useTable({
    api: genCodeApi.getTableFieldList,
    columns: genTableColumns,
    striped: true,
    bordered: true,
    canResize: false,
    immediate: false,
  });

  async function handleSubmit() {
    closeModal();
  }
</script>
<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-row-invalid';

  ::v-deep(.@{prefix-cls}) {
    background: #f4f4f4;
    color: #bababa;
  }
</style>
