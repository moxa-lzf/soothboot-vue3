<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="账户设置" @ok="handleSubmit"
              width="700px">
  <PageWrapper dense contentClass="flex">
    <BasicForm class="w-3/4 xl:w-4/5" @register="registerForm" />
    <CropperAvatar class="w-1/4 xl:w-1/5" :uploadApi="uploadApi" :value="avatar" />
  </PageWrapper>
  </BasicModal>
</template>
<script lang="ts" setup>
import { ref, unref, defineExpose } from "vue";
import { rules } from "/@/utils/helper/validator";
import { PageWrapper } from '/@/components/Page';
import { defHttp } from "/@/utils/http/axios";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { useMessage } from "/@/hooks/web/useMessage";
import { CropperAvatar } from "/@/components/Cropper";
import { uploadApi } from "/@/api/sys/upload";
import { useUserStore } from '/@/store/modules/user';
// 声明Emits
const emit = defineEmits(["register"]);
const $message = useMessage();
const formRef = ref();
const username = ref("");
const userStore = useUserStore();
const avatar = ref(userStore.getUserInfo?.avatar || "");
//表单配置
const [registerForm, { resetFields, validate, clearValidate }] = useForm({
  labelWidth: 100,
  baseColProps: { span: 18 },
  schemas: [
    {
      label: "昵称",
      field: "name",
      component: "Input",
      required: true
    },
    {
      label: "性别",
      field: "sex",
      component: "DictSelect",
      componentProps: {
        code: "sex"
      }
    },
    {
      label: "生日",
      field: "birthday",
      component: "DatePicker"
    }
  ],
  showActionButtonGroup: false
});
//表单赋值
const [registerModal, { setModalProps, closeModal }] = useModalInner();

//表单提交事件
async function handleSubmit() {
  try {
    const values = await validate();
    setModalProps({ confirmLoading: true });
    //提交表单
    let params = Object.assign({ username: unref(username) }, values);
    defHttp.put({
      url: "/sys/user/updatePassword",
      params
    }, { isTransformResponse: false }).then((res) => {
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

async function show(name) {
  if (!name) {
    $message.createMessage.warning("当前系统无登录用户!");
    return;
  } else {
    username.value = name;
    await setModalProps({ visible: true });
    await resetFields();
    await clearValidate();
  }
}

defineExpose({
  show
});
</script>
