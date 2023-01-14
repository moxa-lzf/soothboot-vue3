<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="title"
    @ok="handleSubmit"
    width="40%"
  >
    <BasicForm @register="registerForm">
      <template #cron="{ model, field }">
        <EasyCron v-model:value="model[field]" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './quartz.data';
  import { EasyCron } from '/@/components/EasyCron';
  import { quartzApi } from './quartz.api';
  import { isJsonObjectString } from '/@/utils/is';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //获取详情
      //data.record = await getQuartzById({id: data.record.id});
      try {
        data.record.paramterType = isJsonObjectString(data?.record?.parameter) ? 'json' : 'string';
      } catch (e) {
        console.log(e);
      }
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
    }
  });
  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增任务' : '编辑任务'));
  //表单提交事件
  async function handleSubmit() {
    try {
      let values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      await quartzApi.saveOrEdit(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
