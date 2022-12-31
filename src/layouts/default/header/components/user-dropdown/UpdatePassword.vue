<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="修改密码"
    @ok="handleSubmit"
    width="600px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
import { defineExpose, ref, unref } from "vue";
import { rules } from "/@/utils/helper/validator";
import { defHttp } from "/@/utils/http/axios";
import { useMessage } from "/@/hooks/web/useMessage";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
// 声明Emits
const emit = defineEmits(["register"]);
const username = ref("");
//表单配置
const [registerForm, { resetFields, validate, clearValidate }] = useForm({
  labelWidth: 100,
  baseColProps: { span: 24 },
  schemas: [
    {
      label: "旧密码",
      field: "oldPassword",
      component: "InputPassword",
      required: true
    },
    {
      label: "新密码",
      field: "password",
      component: "StrengthMeter",
      componentProps: {
        placeholder: "请输入新密码"
      },
      rules: [
        {
          required: true,
          message: "请输入新密码"
        }
      ]
    },
    {
      label: "确认密码",
      field: "confirmPassword",
      component: "InputPassword",
      dynamicRules: ({ values }) => rules.confirmPassword(values, true)
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
    }, { isTransformResponse: false }).then(res => {
      if (res.success) {
        closeModal();
      } else {
        useMessage().createMessage.error(res.message);
      }
    });
  } finally {
    setModalProps({ confirmLoading: false });
  }
}

async function show(name) {
  username.value = name;
  await setModalProps({ visible: true });
  await resetFields();
  await clearValidate();
}

defineExpose({
  show
});
</script>
