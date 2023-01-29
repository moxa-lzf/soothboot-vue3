<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    width="700px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formConfirmSchema } from '../genTable.data';
  import { generate } from '../genTable.api';
  import { camelCase } from 'lodash-es';
  const rowId = ref('');
  const tableName = ref('');
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
  labelWidth:100,
  baseColProps:{span:24},
    schemas: formConfirmSchema,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { openOKLoading, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    rowId.value = data.record.id;
    tableName.value = data.record.tableName;
    let _Index = data.record.tableName.indexOf('_');
    let moduleName;
    let entityName;
    if (_Index > 0) {
      moduleName = data.record.tableName.substring(0, _Index);
    } else {
      moduleName = '';
    }
    entityName = data.record.tableName.substring(_Index + 1);
    data.record.moduleName = camelCase(moduleName);
    data.record.entityName = camelCase(entityName);
    //表单赋值
    await setFieldsValue({
      ...data.record,
    });
  });
  //设置标题
  const getTitle = computed(() => '代码生成【' + tableName.value + '】');
  //表单提交事件
  async function handleSubmit() {
    let values = await validate();
    openOKLoading(async () => {
      //提交表单
      const data=await generate(values);
      //关闭弹窗
      closeModal();
    });
  }
</script>
