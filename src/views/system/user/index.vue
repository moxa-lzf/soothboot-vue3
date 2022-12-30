<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="getTableAction(record)"
          :dropDownActions="getDropDownAction(record)"
        />
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
import { defineComponent, reactive } from "vue";

import { BasicTable, useTable, TableAction } from "/@/components/Table";
import { PageWrapper } from "/@/components/Page";
import DeptTree from "./DeptTree.vue";

import { useModal } from "/@/components/Modal";
import UserModal from "./UserModal.vue";

import { columns, searchFormSchema } from "./user.data";
import { userApi } from "./user.api";
import { useGo } from "/@/hooks/web/usePage";

const go = useGo();
const [registerModal, { openModal }] = useModal();
const searchInfo = reactive<Recordable>({});
const [registerTable, { reload, updateTableDataRecord }] = useTable({
  title: "用户列表",
  api: userApi.api.page,
  rowKey: "id",
  columns,
  formConfig: {
    labelWidth: 80,
    schemas: searchFormSchema,
    autoSubmitOnEnter: true
  },
  showIndexColumn: false,
  useSearchForm: true,
  showTableSetting: true,
  bordered: true,
  actionColumn: {
    width: 120,
    title: "操作",
    dataIndex: "action",
    slots: { customRender: "action" }
  }
});

function handleCreate() {
  openModal(true, {
    isUpdate: false
  });
}

function handleEdit(record: Recordable) {
  console.log(record);
  openModal(true, {
    record,
    isUpdate: true
  });
}

function handleDelete(record: Recordable) {
  console.log(record);
}

function handleSuccess({ isUpdate, values }) {
  if (isUpdate) {
    // 演示不刷新表格直接更新内部数据。
    // 注意：updateTableDataRecord要求表格的rowKey属性为string并且存在于每一行的record的keys中
    const result = updateTableDataRecord(values.id, values);
    console.log(result);
  } else {
    reload();
  }
}

function handleSelect(deptIds=[]) {
console.log(deptIds)
searchInfo.deptIds = deptIds;
  reload();
}
/**
 * 操作栏
 */
function getTableAction(record): ActionItem[] {
  return [
    {
      label: "编辑",
      onClick: handleEdit.bind(null, record)
      // ifShow: () => hasPermission('system:user:edit'),
    }
  ];
}

/**
 * 下拉操作栏
 */
function getDropDownAction(record): ActionItem[] {
  return [
//    {
//      label: "详情",
//      onClick: handleDetail.bind(null, record)
//    },
//    {
//      label: "密码",
//      onClick: handleChangePassword.bind(null, record.username)
//    },
    {
      label: "删除",
      popConfirm: {
        title: "是否确认删除",
        confirm: handleDelete.bind(null, record)
      }
    },
//    {
//      label: "冻结",
//      ifShow: record.status == 1,
//      popConfirm: {
//        title: "确定冻结吗?",
//        confirm: handleFrozen.bind(null, record, 2)
//      }
//    },
//    {
//      label: "解冻",
//      ifShow: record.status == 2,
//      popConfirm: {
//        title: "确定解冻吗?",
//        confirm: handleFrozen.bind(null, record, 1)
//      }
//    }
  ];
}

</script>
