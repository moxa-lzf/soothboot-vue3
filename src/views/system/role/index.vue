<template>
  <BasicTable @register="registerTable">
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增
      </a-button>
    </template>
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
    </template>
  </BasicTable>
  <!--角色用户表格-->
  <RoleUserDrawer @register="roleUserDrawer"/>
  <RoleModal @register="registerModal" @success="reload"/>
  <!--角色菜单授权抽屉-->
  <RolePermissionDrawer @register="rolePermissionDrawer"/>
</template>
<script lang="ts" name="system-role" setup>
import {ref} from "vue";
import {BasicTable, TableAction, useTable} from "/@/components/Table";
import {useDrawer} from "/@/components/Drawer";
import {useModal} from "/@/components/Modal";
import RoleModal from './components/RoleModal.vue'
import RolePermissionDrawer from "./components/RolePermissionDrawer.vue";
import RoleUserDrawer from "./components/RoleUserDrawer.vue";
import {columns, searchFormSchema} from "./role.data";
import {batchDeleteRole, deleteRole, list} from "./role.api";

const showFooter = ref(true);
const [roleUserDrawer, {openDrawer: openRoleUserDrawer}] = useDrawer();
const [rolePermissionDrawer, {openDrawer: openRolePermissionDrawer}] = useDrawer();
const [registerModal, {openModal}] = useModal();

// 列表页面公共参数、方法
const [registerTable, {reload}] = useTable({
  title: "角色列表",
  api: list,
  columns: columns,
  formConfig: {
    labelWidth: 100,
    schemas: searchFormSchema
  },
  useSearchForm: true,
  showTableSetting: true,
  bordered: true,
  showIndexColumn: false,
  actionColumn: {
    width: 100,
    title: "操作",
    dataIndex: "action",
    slots: {customRender: "action"},
    fixed: undefined
  }
});

/**
 * 新增
 */
function handleCreate() {
  openModal(true, {
    isUpdate: false
  });
}

/**
 * 编辑
 */
function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true
  });
}

/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteRole({id: record.id}, reload);
}

/**
 * 角色授权弹窗
 */
function handlePerssion(record) {
  openRolePermissionDrawer(true, {roleId: record.id});
}

/**
 * 角色用户
 */
function handleUser(record) {
  //onSelectChange(selectedRowKeys)
  openRoleUserDrawer(true, record);
}

/**
 * 操作栏
 */
function getTableAction(record) {
  return [
    {
      label: "编辑",
      onClick: handleEdit.bind(null, record)
    }
  ];
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record) {
  return [
    {
      label: "授权",
      onClick: handlePerssion.bind(null, record)
    },
    {
      label: "用户",
      onClick: handleUser.bind(null, record)
    },
    {
      label: "删除",
      popConfirm: {
        title: "是否确认删除",
        confirm: handleDelete.bind(null, record)
      }
    }
  ];
}
</script>
