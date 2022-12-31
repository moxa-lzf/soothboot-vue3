<template>
  <BasicDrawer @register="registerBaseDrawer" title="角色用户" width="800" destroyOnClose>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleSelect"> 添加用户</a-button>
      </template>
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" />
      </template>
    </BasicTable>
    <!--用户选择弹窗-->
    <UseSelectModal @register="registerModal" @select="selectOk" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, defineProps, watch, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/src/components/Table';
  import { BasicDrawer, useDrawer, useDrawerInner } from '/src/components/Drawer';
  import { useModal } from '/src/components/Modal';
  import UseSelectModal from './UseSelectModal.vue';
  import { userList, deleteUserRole, batchDeleteUserRole, addUserRole } from '../role.api';
  import { userColumns } from '../role.data';

  const emit = defineEmits(['register', 'hideUserList']);
  const checkedKeys = ref<Array<string | number>>([]);
  const roleId = ref('');
  const [registerBaseDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    roleId.value = data.id;
    setProps({ searchInfo: { roleId: data.id } });
    reload();
  });
  //注册drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  //注册drawer
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, updateTableDataRecord, setProps }] = useTable({
    title: '用户列表',
    api: userList,
    columns: userColumns,
    striped: true,
    useSearchForm: false,
    showTableSetting: true,
    clickToRowSelect: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    rowKey: 'id',
    actionColumn: {
      width: 180,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteUserRole({ userId: record.id, roleId: roleId.value }, reload);
  }

  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDeleteUserRole({ userIds: checkedKeys.value.join(','), roleId: roleId.value }, reload);
  }

  /**
   * 成功回调
   */
  function handleSuccess({ isUpdate, values }) {
    isUpdate ? updateTableDataRecord(values.id, values) : reload();
  }
  /**
   * 选择已有用户
   */
  function handleSelect() {
    openModal(true);
  }
  /**
   * 添加已有用户
   */
  async function selectOk(val) {
    await addUserRole({ roleId: roleId.value, userIdList: val }, reload);
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '取消关联',
        popConfirm: {
          title: '是否确认取消关联',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>
