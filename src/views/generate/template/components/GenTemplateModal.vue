<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    defaultFullscreen
    width="100%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #content="{ model, field }">
        <CodeEditor v-model:value="model[field]" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { CodeEditor } from '/@/components/CodeEditor';
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from '../gen.template.data';
  import { templateApi } from '../gen.template.api';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const rowId = ref('');
  const content = ref('');
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { openOKLoading, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      rowId.value = data.record.id;
      const templateData = await templateApi.get({ id: data.record.id });
      content.value = templateData.content;
      await setFieldsValue(templateData);
    } else if (content.value) {
      content.value = '';
    }
  });
  //设置标题
  const getTitle = computed(() => (!unref(isUpdate) ? '新增模板' : '编辑模板'));
  //表单提交事件
  async function handleSubmit() {
    let values = await validate();
    values.content = content.value;
    openOKLoading(async () => {
      //提交表单
      await templateApi.saveOrEdit(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    });
  }
</script>
