<template>
<BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" defaultFullscreen width="100%" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
    <CodeEditor v-model:value="content"></CodeEditor>
  </BasicModal>
</template>
<script lang="ts" setup>
import { CodeEditor } from '/@/components/CodeEditor';
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/src/components/Modal';
  import { BasicForm, useForm } from '/src/components/Form';
  import { formSchema } from '../gen.template.data';
  import { saveOrUpdate,get} from '../gen.template.api0';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const rowId = ref('');
  const content=ref('');
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false, minHeight: 80 });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      const templateData=await get({id:data.record.id});
      content.value=templateData.content
      await setFieldsValue(templateData);
    }else if(content.value){
    content.value='';
    }
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增模板' : '编辑模板'));
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      values.content=content.value;
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
