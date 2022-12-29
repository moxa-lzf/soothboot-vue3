<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" width="700px" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicForm, useForm } from '/src/components/Form';
  import { formConfirmSchema } from '../genTable.data';
import{generate}from '../genTable.api'
import{camelCase}from 'lodash-es'
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const rowId = ref('');
  const tableName=ref('')
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: formConfirmSchema,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, minHeight: 80 });
    rowId.value = data.record.id;
    tableName.value=data.record.tableName;
  let _Index=data.record.tableName.indexOf("_");
  let moduleName;
  let entityName;
  if(_Index>0){
  moduleName=data.record.tableName.substring(0,_Index);
  }else{
  moduleName='';
  }
  entityName=data.record.tableName.substring(_Index+1);
  data.record.moduleName=camelCase(moduleName);
  data.record.entityName=camelCase(entityName);
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });

  });
  //设置标题
  const getTitle = computed(() => '代码生成【'+tableName.value+"】");
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      console.log(values)
      //提交表单
      await generate(values)
      //关闭弹窗
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
