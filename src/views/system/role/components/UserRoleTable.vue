<template>
  <BasicTable @register="registerTable">
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" />
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { userRoleApi, getUserByRoleId } from "../userRole.api";
import { userColumns, searchUserFormSchema } from "../role.data";

const props = defineProps({ roleId: Number });
const roleId = ref(null);
const [registerTable, { reload, setProps }] = useTable({
  title: "角色用户列表",
  api: getUserByRoleId,
  columns: userColumns,
  formConfig: {
    labelWidth: 80,
    schemas: searchUserFormSchema
  },
  striped: true,
  useSearchForm: true,
  showTableSetting: true,
  clickToRowSelect: false,
  bordered: true,
  showIndexColumn: false,
  canResize: true,
  rowKey: "id",
  actionColumn: {
    width: 100,
    title: "操作",
    dataIndex: "action",
    slots: { customRender: "action" },
    fixed: undefined
  }
});

/**
 * 删除事件
 */
async function handleDelete(record) {
  await userRoleApi.remove({ id: record.id });
  reload();
}

function load(id) {
  roleId.value = id;
  setProps({ searchInfo: { roleId: id } });
  reload();
}
/**
 * 操作栏
 */
function getTableAction(record): ActionItem[] {
  return [
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
defineExpose({load});
</script>
