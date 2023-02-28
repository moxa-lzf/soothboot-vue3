<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { watch } from 'vue';
  import { BasicTable, useTable } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { dictItemColumns, searchFormSchema } from '../program.data';
  import { dictItemApi } from '../message.api';

  const props = defineProps({
    program: { type: Object },
  });

  const [registerTable, { reload, setProps }] = useTable({
    title: '程序消息列表',
    api: dictItemApi.list,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    columns: dictItemColumns,
    striped: true,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
  });

  watch(
    () => props.program,
    (program) => {
      setProps({
        searchInfo: {
          machineName: program?.machineName,
          programName: program?.programName,
        },
      });
      reload();
    },
    { deep: true },
  );
</script>
<style scoped lang="less">
  @prefix-cls: ~'@{namespace}-row-invalid';

  :deep(.@{prefix-cls}) {
    background: #f4f4f4;
    color: #bababa;
  }
</style>
