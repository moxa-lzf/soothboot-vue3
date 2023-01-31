<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    defaultFullscreen
    :canFullscreen="false"
    title="数据字段列表"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal } from '/@/components/Modal';
  import { genTableColumns } from '../genTable.data';
  import { BasicTable, useTable } from '/@/components/Table/index';
  import { useModalInner } from '/@/components/Modal';
  import { getTableFieldList } from '../genTable.api';

  //表单赋值
  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    reload({ searchInfo: { tableId: data.record.id } });
  });
  const [registerTable, { reload }] = useTable({
    api: getTableFieldList,
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
