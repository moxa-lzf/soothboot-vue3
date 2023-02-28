<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!--引用表格-->
    <BasicTable @register="registerTable">
    </BasicTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { columns } from '../program.data';
  import { dictApi } from '../program.api';

  const emit = defineEmits(['change']);
  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
    title: '程序运维列表',
    api: dictApi.page,
    columns: columns,
    rowSelection: {
      type: 'radio',
      onChange(selectedRowKeys, selectedRows) {
        if (selectedRows && selectedRows.length > 0) {
          emit('change', selectedRows[0]);
        } else {
          emit('change');
        }
      },
    },
    showTableSetting: true,
    bordered: true,
  });

</script>

<style scoped></style>
