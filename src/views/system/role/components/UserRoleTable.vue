<template>
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
</template>
<script lang="ts" setup>
  import { ref, watchEffect, effect, watch } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import UseSelectModal from './UseSelectModal.vue';
  import { userRoleApi, saveUserRole, getUserByRoleId } from '../userRole.api';
  import { userColumns } from '../role.data';
  const dataSource = ref([]);
  const props = defineProps({ roleId: Number });
  const roleId = ref(null);
  // watch(
  //   () => props.roleId,
  //   () => {
  //     if (props.roleId) {
  //       getUserByRoleId({ roleId: props.roleId }).then((res) => {
  //         dataSource.value = res.rows;
  //       });
  //     } else {
  //       dataSource.value = [];
  //     }
  //   },
  // );
  // effect(() => {
  //   if (props.roleId) {
  //     getUserByRoleId({ roleId: props.roleId }).then((res) => (dataSource.value = res.rows));
  //   } else {
  //     dataSource.value = [];
  //   }
  // });
  watchEffect(() => {
    if (props.roleId) {
      getUserByRoleId({ roleId: props.roleId }).then((res) => (dataSource.value = res.rows));
    } else {
      dataSource.value = [];
    }
  });
  //注册drawer
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: '角色用户列表',
    dataSource: dataSource,
    columns: userColumns,
    striped: true,
    useSearchForm: true,
    showTableSetting: true,
    clickToRowSelect: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    rowKey: 'id',
    actionColumn: {
      width: 150,
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
    await userRoleApi.remove({ id: record.id });
    reload();
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
    await saveUserRole({ roleId: roleId.value, userIdList: val }, reload);
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
