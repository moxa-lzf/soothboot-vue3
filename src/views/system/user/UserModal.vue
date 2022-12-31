<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from "vue";
import { BasicModal, useModalInner } from "/@/components/Modal";
import { BasicForm, useForm } from "/@/components/Form/index";
import { formSchema } from "./user.data";
import { getDeptList } from "/@/api/demo/system";
import { listTree } from "/@/views/system/dept/dept.api";

export default defineComponent({
  name: "UserModal",
  components: { BasicModal, BasicForm },
  emits: ["success", "register"],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref("");

    const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
      labelWidth: 100,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 23
      }
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        setFieldsValue({
          ...data.record
        });
      }

      const treeData = await listTree({});
    console.log(treeData);
      updateSchema([
        {
          field: "pwd",
          show: !unref(isUpdate)
        },
        {
          field: "dept",
          componentProps: { treeData }
        }
      ]);
    });

    const getTitle = computed(() => (!unref(isUpdate) ? "新增用户" : "编辑用户"));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // TODO custom api
        console.log(values);
        closeModal();
        emit("success", { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
      } finally {
        setModalProps({ confirmLoading: false });
      }
    }

    return { registerModal, registerForm, getTitle, handleSubmit };
  }
});
</script>
