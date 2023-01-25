<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate">
          新增
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="getTableAction(record)"
          :dropDownActions="getDropDownAction(record)"
        />
      </template>
    </BasicTable>
    <!--角色用户表格-->
    <UserRoleDrawer @register="roleUserDrawer" />
    <RoleModal @register="registerModal" @success="handleSuccess"/>
    <!--菜单授权抽屉-->
    <MenuPermissionDrawer @register="menuPermissionDrawer" />
    <!--数据授权抽屉-->
    <DataPermissionDrawer @register="dataPermissionDrawer" />
  </PageWrapper>
</template>
<script lang="ts" name="system-role" setup>
  import {defineExpose,reactive} from 'vue';
  import { ActionItem, BasicTable, TableAction, useTable } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { PageWrapper } from '/@/components/Page';
  import { useModal } from '/@/components/Modal';
  import RoleModal from './RoleModal.vue';
  import MenuPermissionDrawer from './MenuPermissionDrawer.vue';
  import DataPermissionDrawer from './DataPermissionDrawer.vue';
  import UserRoleDrawer from './UserRoleDrawer.vue';
  import { columns, searchFormSchema } from '../role.data';
  import { roleApi } from '../role.api';

  const [roleUserDrawer, { openDrawer: openRoleUserDrawer }] = useDrawer();
  const [menuPermissionDrawer, { openDrawer: openMenuPermissionDrawer }] = useDrawer();
  const [dataPermissionDrawer, { openDrawer: openDataPermissionDrawer }] = useDrawer();
  const [registerModal, { openModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  // 列表页面公共参数、方法
  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    api: roleApi.page,
    columns: columns,
    rowKey: 'id',
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  /**
   * 新增
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  /**
   * 编辑
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await roleApi.remove({ id: record.id });
    reload();
  }

  /**
   * 菜单授权弹窗
   */
  function handleMenuPerssion(record) {
    openMenuPermissionDrawer(true, { roleId: record.id });
  }
  /**
   * 数据授权弹窗
   */
  function handleDataPerssion(record) {
    openDataPermissionDrawer(true, { record:{roleId:record.id,roleCode:record.roleCode,roleName:record.roleName} });
  }
  /**
   * 角色用户
   */
  function handleUser(record) {
    openRoleUserDrawer(true, record);
  }
function handleSelect(deptIds){
  searchInfo.deptId = deptIds;
  reload();
}
function handleSuccess(){
  reload();
}
  /**
   * 操作栏
   */
  function getTableAction(record): ActionItem[] {
    return [
      {
        tooltip: '修改',
        icon: 'clarity:note-edit-line',
        onClick: handleEdit.bind(null, record),
      },
      {
        tooltip: '删除',
        icon: 'ant-design:delete-outlined',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record): ActionItem[] | null {
    return [
      {
        icon: 'ant-design:team-outlined',
        label: '菜单权限',
        onClick: handleMenuPerssion.bind(null, record),
      },
      {
        icon: 'ant-design:database-outlined',
        label: '数据权限',
        onClick: handleDataPerssion.bind(null, record),
      },
      {
        icon: 'ant-design:user-add-outlined',
        label: '角色用户',
        onClick: handleUser.bind(null, record),
      },
    ];
  }
defineExpose({handleSelect});
</script>
