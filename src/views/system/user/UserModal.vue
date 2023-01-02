<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './user.data';
  import { listTree } from '/@/views/system/dept/dept.api';
  import { saveUser, editUser } from './user.api';
  import { getRoleByUserId } from '/@/views/system/role/userRole.api';
  import { getDeptByUserId } from '/@/views/system/dept/userDept.api';
  export default defineComponent({
    name: 'UserModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 80,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          const roleList = await getRoleByUserId({ userId: unref(rowId) });
          const deptList = await getDeptByUserId({ userId: unref(rowId) });
          setFieldsValue({
            ...data.record,
            roleIdList: roleList.map((role) => role.roleId),
            deptIdList: deptList.map((dept) => dept.deptId),
          });
        }
        const treeData = await listTree({});
        updateSchema([
          {
            field: 'deptIdList',
            componentProps: { treeData },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增用户' : '编辑用户'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          if (unref(isUpdate)) {
            await editUser(values);
          } else {
            await saveUser(values);
          }
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
