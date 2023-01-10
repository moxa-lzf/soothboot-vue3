<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <!--引用表格-->
    <BasicTable @register="registerTable">
      <!--插槽:table标题-->
      <template #toolbar>
        <a-button type="primary" preIcon="ant-design:plus-outlined" @click="handleCreate">
          新增
        </a-button>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction
          :actions="getTableAction(record)"
          :dropDownActions="getDropDownAction(record)"
        />
      </template>
    </BasicTable>
    <!--字典弹窗-->
    <DictModal @register="registerModal" @success="handleSuccess" />
    <!--字典配置抽屉-->
    <DictItemList @register="registerDrawer" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction, ActionItem } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { useDrawer } from '/@/components/Drawer';
  import { useModal } from '/@/components/Modal';
  import DictItemList from './DictItemList.vue';
  import DictModal from './DictModal.vue';
  import { columns, searchFormSchema } from '../dict.data';
  import { dictApi } from '../dict.api';

  //字典model
  const [registerModal, { openModal }] = useModal();
  //字典配置drawer
  const [registerDrawer, { openDrawer }] = useDrawer();
  const emit = defineEmits(['change']);
  // 列表页面公共参数、方法
  const [registerTable, { reload, updateTableDataRecord }] = useTable({
    title: '数据字典列表',
    api: dictApi.page,
    columns: columns,
    rowSelection: {
      type: 'radio',
      onChange(selectedRowKeys, selectedRows) {
        if (selectedRows && selectedRows.length > 0) {
          emit('change', selectedRows[0]);
        } else {
          emit('change');
        }
      },
    },
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
   * 新增事件
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  /**
   * 编辑事件
   */
  async function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await dictApi.remove({ id: record.id });
    reload();
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
   * 字典配置
   */
  function handleItem(record) {
    openDrawer(true, {
      id: record.id,
    });
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
    return null;
  }
</script>

<style scoped></style>
