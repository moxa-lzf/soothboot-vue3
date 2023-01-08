<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate">
        新增
      </a-button>
    </template>
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
    </template>
  </BasicTable>
  <RoleModal @register="registerModal" @success="reload" />
  <!--角色菜单授权抽屉-->
  <RolePermissionDrawer @register="rolePermissionDrawer" />
  <!--角色用户表格-->
  <UseSelectModal @register="registerUserModal" @select="selectOk"></UseSelectModal>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
import { ActionItem, BasicTable, TableAction, useTable } from "/@/components/Table";
import { useDrawer } from "/@/components/Drawer";
import { useModal } from "/@/components/Modal";
import RoleModal from "./RoleModal.vue";
import RolePermissionDrawer from "./RolePermissionDrawer.vue";
import UseSelectModal from "./UseSelectModal.vue";
import { columns, searchFormSchema } from "../role.data";
import { roleApi } from "../role.api";
import { saveUserRole } from "../userRole.api";

const [rolePermissionDrawer, { openDrawer: openRolePermissionDrawer }] = useDrawer();
const [registerModal, { openModal }] = useModal();
const [registerUserModal, { openModal: openUserModal }] = useModal();

// 声明Emits
const emit = defineEmits(["change"]);
const roleId = ref(null);
// 列表页面公共参数、方法
const [registerTable, { reload }] = useTable({
  title: "角色列表",
  api: roleApi.page,
  columns: columns,
  rowKey: "id",
  rowSelection: {
    type: "radio",
    onChange(selectedRowKeys) {
      if (selectedRowKeys && selectedRowKeys.length > 0) {
        emit("change", selectedRowKeys[0]);
      } else {
        emit("change");
      }
    }
  },
  formConfig: {
    labelWidth: 80,
    schemas: searchFormSchema
  },
  useSearchForm: true,
  showTableSetting: true,
  bordered: true,
  showIndexColumn: false,
  actionColumn: {
    width: 150,
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
  await roleApi.remove({ id: record.id });
  reload();
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
  roleId.value = record.id;
  openUserModal(true);
}

/**
 * 添加已有用户
 */
async function selectOk(userIdList) {
  await saveUserRole({ roleId: roleId.value, userIdList: userIdList });
  emit("change", roleId.value);
}

/**
 * 操作栏
 */
function getTableAction(record): ActionItem[] {
  return [
    {
      tooltip: "修改",
      icon: "clarity:note-edit-line",
      onClick: handleEdit.bind(null, record)
    },
    {
      tooltip: "删除",
      icon: "ant-design:delete-outlined",
      color: "error",
      popConfirm: {
        title: "是否确认删除",
        confirm: handleDelete.bind(null, record)
      }
    }
  ];
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record): ActionItem[] | null {
  return [
    {
      icon: "ant-design:team-outlined",
      label: "角色权限",
      onClick: handlePerssion.bind(null, record)
    },
    {
      icon: "ant-design:user-add-outlined",
      label: "添加用户",
      onClick: handleUser.bind(null, record)
    }
  ];
}
</script>
