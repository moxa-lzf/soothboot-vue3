<template>
  <BasicModal v-bind="$attrs" @register="registerModal" defaultFullscreen :canFullscreen="false"
              title="数据字段列表" @ok="handleSubmit">
    <BasicTable @register="registerTable"/>
  </BasicModal>
</template>
<script lang="ts" setup>
import {BasicModal} from '/src/components/Modal';
import {useDesign} from '/@/hooks/web/useDesign';
import {genTableColumns} from '../genTable.data';
import {BasicTable, useTable} from '/@/components/Table/index';
import {useModalInner} from "/@/components/Modal";
import {getTableFieldList} from '../genTable.api'

const {prefixCls} = useDesign('row-invalid');
//表单赋值
const [registerModal, {setModalProps, closeModal}] = useModalInner(async (data) => {
  reload({searchInfo: {tableId: data.record.id}})
});
const [registerTable, {reload, setProps}] = useTable({
  api: getTableFieldList,
  columns: genTableColumns,
  striped: true,
  bordered: true,
  showIndexColumn: false,
  canResize: false,
  immediate: false,
});

async function handleSubmit() {
  closeModal()
}

</script>
<style scoped lang="less">
@prefix-cls: ~'@{namespace}-row-invalid';

::v-deep(.@{prefix-cls}) {
  background: #f4f4f4;
  color: #bababa;
}
</style>
