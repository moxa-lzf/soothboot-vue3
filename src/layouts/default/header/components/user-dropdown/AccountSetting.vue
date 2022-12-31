<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="账户设置"
    @ok="handleSubmit"
    width="700px"
  >
    <PageWrapper dense contentClass="flex">
      <BasicForm class="w-3/4 xl:w-4/5" @register="registerForm" />
      <CropperAvatar class="w-1/4 xl:w-1/5" :uploadApi="uploadApi" :value="avatar" />
    </PageWrapper>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, defineExpose, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { defHttp } from '/@/utils/http/axios';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { CropperAvatar } from '/@/components/Cropper';
  import { uploadApi } from '/@/api/sys/upload';
  import { useUserStore } from '/@/store/modules/user';
  // 声明Emits
  const emit = defineEmits(['register']);
  const $message = useMessage();
  const formRef = ref();
  const username = ref('');
  const userStore = useUserStore();
  const avatar = ref(userStore.getUserInfo?.avatar || '');
  //表单配置
  const [registerForm, { resetFields, setFieldsValue, validate, clearValidate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 18 },
    schemas: [
      {
        label: '昵称',
        field: 'realname',
        component: 'Input',
        required: true,
      },
      {
        label: '性别',
        field: 'sex',
        component: 'DictSelect',
        componentProps: {
          code: 'sex',
        },
      },
      {
        label: '手机号码',
        field: 'phone',
        component: 'Input',
      },
    ],
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await resetFields();
    //表单赋值
    await setFieldsValue({
      ...data.record,
    });
  });
  //表单提交事件
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      //提交表单
      let params = Object.assign({ username: unref(username) }, values);
      defHttp
        .put(
          {
            url: '/sys/user/updatePassword',
            params,
          },
          { isTransformResponse: false },
        )
        .then((res) => {
          if (res.success) {
            $message.createMessage.success(res.message);
            //关闭弹窗
            closeModal();
          } else {
            $message.createMessage.warning(res.message);
          }
        });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
