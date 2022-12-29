<template>
  <BasicTable @register="registerTable">
    <template #tableTitle>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增
      </a-button>
    </template>
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
    </template>
  </BasicTable>
  <!--角色用户表格-->
  <RoleUserTable @register="roleUserDrawer" />
  <!--角色编辑抽屉-->
  <RoleDrawer @register="registerDrawer" @success="reload" :showFooter="showFooter" />
  <RoleDesc @register="registerDesc"></RoleDesc>
  <!--角色菜单授权抽屉-->
  <RolePermissionDrawer @register="rolePermissionDrawer" />
</template>
<script lang="ts" name="system-role" setup>
import { ref } from "vue";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { useDrawer } from "/@/components/Drawer";
import { useModal } from "/@/components/Modal";
import RoleDrawer from "./components/RoleDrawer.vue";
import RoleDesc from "./components/RoleDesc.vue";
import RolePermissionDrawer from "./components/RolePermissionDrawer.vue";
import RoleUserTable from "./components/RoleUserTable.vue";
import { columns, searchFormSchema } from "./role.data";
import { list, deleteRole, batchDeleteRole } from "./role.api";

const showFooter = ref(true);
const [roleUserDrawer, { openDrawer: openRoleUserDrawer }] = useDrawer();
const [registerDrawer, { openDrawer }] = useDrawer();
const [rolePermissionDrawer, { openDrawer: openRolePermissionDrawer }] = useDrawer();
const [registerDesc, { openDrawer: openRoleDesc }] = useDrawer();

// 列表页面公共参数、方法
const [registerTable, { reload }] = useTable({
  title: "角色列表",
  api: list,
  columns: columns,
  formConfig: {
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
    slots: { customRender: "action" },
    fixed: undefined
  }
});

/**
 * 新增
 */
function handleCreate() {
  showFooter.value = true;
  openDrawer(true, {
    isUpdate: false
  });
}

/**
 * 编辑
 */
function handleEdit(record: Recordable) {
  showFooter.value = true;
  openDrawer(true, {
    record,
    isUpdate: true
  });
}

/**
 * 详情
 */
function handleDetail(record) {
  showFooter.value = false;
  openRoleDesc(true, {
    record,
    isUpdate: true
  });
}

/**
 * 删除事件
 */
async function handleDelete(record) {
  await deleteRole({ id: record.id }, reload);
}

/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  await batchDeleteRole({ ids: selectedRowKeys.value }, reload);
}

/**
 * 角色授权弹窗
 */
function handlePerssion(record) {
  openRolePermissionDrawer(true, { roleId: record.id });
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
      label: "详情",
      onClick: handleDetail.bind(null, record)
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
