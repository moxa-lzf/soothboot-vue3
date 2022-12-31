<template>
  <!--引用表格-->
  <BasicTable @register="registerTable">
    <!--插槽:table标题-->
    <template #toolbar>
      <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate"> 新增
      </a-button>
      <a-button type="primary" @click="handlerRefreshCache" preIcon="ant-design:sync-outlined">
        刷新缓存
      </a-button>
    </template>
    <!--操作栏-->
    <template #action="{ record }">
      <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)"/>
    </template>
  </BasicTable>
  <!--字典弹窗-->
  <DictModal @register="registerModal" @success="handleSuccess" />
  <!--字典配置抽屉-->
  <DictItemList @register="registerDrawer" />
</template>

<script lang="ts" setup>
//ts语法
import { ref, computed, unref } from "vue";
import { BasicTable, useTable, TableAction } from "/src/components/Table";
import { useDrawer } from "/src/components/Drawer";
import { useModal } from "/src/components/Modal";
import DictItemList from "./components/DictItemList.vue";
import DictModal from "./components/DictModal.vue";
import { useMessage } from "/src/hooks/web/useMessage";
import { removeAuthCache, setAuthCache } from "/src/utils/auth";
import { columns, searchFormSchema } from "./dict.data";
import { refreshCache, queryAllDictItems } from "./dict.api";
import { dictApi } from "./dict.api";
import { DB_DICT_DATA_KEY } from "/src/enums/cacheEnum";

const { createMessage } = useMessage();
//字典model
const [registerModal, { openModal }] = useModal();
//字典配置drawer
const [registerDrawer, { openDrawer }] = useDrawer();

// 列表页面公共参数、方法
const [registerTable, { reload, updateTableDataRecord }] = useTable({
  title: "数据字典",
  api: dictApi.page,
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
    slots: { customRender: 'action' },
    fixed: undefined
  }
});

/**
 * 新增事件
 */
function handleCreate() {
  openModal(true, {
    isUpdate: false
  });
}

/**
 * 编辑事件
 */
async function handleEdit(record: Recordable) {
  openModal(true, {
    record,
    isUpdate: true
  });
}

/**
 * 详情
 */
async function handleDetail(record) {
  openModal(true, {
    record,
    isUpdate: true
  });
}

/**
 * 删除事件
 */
async function handleDelete(record) {
  dictApi.api.remove({ id: record.id }).then(reload());
}

/**
 * 批量删除事件
 */
async function batchHandleDelete() {
  // await batchDeleteDict({ ids: selectedRowKeys.value }, reload);
}

/**
 * 成功回调
 */
function handleSuccess({ isUpdate, values }) {
  if (isUpdate) {
    updateTableDataRecord(values.id, values);
  } else {
    reload();
  }
}

/**
 * 刷新缓存
 */
async function handlerRefreshCache() {
  const result = await refreshCache();
  if (result.success) {
    const res = await queryAllDictItems();
    removeAuthCache(DB_DICT_DATA_KEY);
    setAuthCache(DB_DICT_DATA_KEY, res.result);
    createMessage.success("刷新缓存完成！");
  } else {
    createMessage.error("刷新缓存失败！");
  }
}

/**
 * 字典配置
 */
function handleItem(record) {
  openDrawer(true, {
    id: record.id
  });
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
        label: '字典配置',
        onClick: handleItem.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>

<style scoped></style>
