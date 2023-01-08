<template>
  <div class="p-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate">
          新增菜单
        </Button>
        <Button type="primary" preIcon="ic:round-expand" @click="expandAll">展开全部</Button>
        <Button type="primary" preIcon="ic:round-compress" @click="collapseAll">折叠全部 </Button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="getTableAction(record)"
          :dropDownActions="getDropDownAction(record)"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" :showFooter="showFooter" />
  </div>
</template>
<script lang="ts" name="system-menu" setup>
  import { nextTick, ref } from 'vue';
  import {BasicTable, useTable, TableAction, ActionItem} from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';
  import { columns, searchFormSchema } from './menu.data';
  import { menuApi, listTree } from './menu.api';
  import { Button } from 'ant-design-vue';
  const checkedKeys = ref<Array<string | number>>([]);
  const showFooter = ref(true);
  const [registerDrawer, { openDrawer }] = useDrawer();
  // 列表页面公共参数、方法
  const [registerTable, { reload, expandAll, collapseAll }] = useTable({
    title: '菜单列表',
    api: listTree,
    columns: columns,
    size: 'small',
    formConfig: {
      schemas: searchFormSchema,
    },
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });
  /**
   * 选择列配置
   */
  const rowSelection = {
    type: 'checkbox',
    columnWidth: 30,
    selectedRowKeys: checkedKeys,
    onChange: onSelectChange,
  };

  /**
   * 选择事件
   */
  function onSelectChange(selectedRowKeys: (string | number)[]) {
    checkedKeys.value = selectedRowKeys;
  }

  /**
   * 新增
   */
  function handleCreate() {
    showFooter.value = true;
    openDrawer(true, {
      isUpdate: false,
    });
  }

  /**
   * 编辑
   */
  function handleEdit(record) {
    showFooter.value = true;
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * 添加下级
   */
  function handleAddSub(record) {
    openDrawer(true, {
      record: { parentId: record.id, menuType: 1 },
      isUpdate: false,
    });
  }

  /**
   * 删除
   */
  async function handleDelete(record) {
    await menuApi.remove({ id: record.id });
    reload();
  }

  /**
   * 成功回调
   */
  function handleSuccess() {
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
  function getDropDownAction(record): ActionItem[]|null {
    return [
      {
        icon: 'ant-design:vertical-align-bottom-outlined',
        label: '添加下级',
        onClick: handleAddSub.bind(null, record),
      },
    ];
  }
</script>
