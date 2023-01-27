<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    title="按钮权限配置"
    width="650px"
    destroyOnClose
    showFooter
  >
    <BasicTree
      ref="treeRef"
      checkable
      toolbar
      :treeData="treeData"
      :fieldNames="{ key: 'key', title: 'name' }"
      :checkStrictly="true"
      :clickRowToExpand="true"
      title="所拥有的权限"
    >
      <template #action>
        <Select
          v-model:value="buttonType"
          :options="buttonData"
          :field-names="{ label: 'name', value: 'value' }"
          class="w-full"
          allowClear
          mode="multiple"
          placeholder="统一配置按钮权限"
          @change="handleChange"
        />
      </template>
    </BasicTree>
    <!--右下角按钮-->
    <template #footer>
      <PopConfirmButton
        title="确定放弃编辑？"
        @confirm="closeDrawer"
        okText="确定"
        cancelText="取消"
        >取消</PopConfirmButton
      >
      <a-button @click="handleSubmit" type="primary" :loading="loading">保存</a-button>
    </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { Select } from 'ant-design-vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';
  import { PopConfirmButton } from '/@/components/Button';
  import { listTree } from '/@/views/privilege/menu/menu.api';
  import { dictItemCode } from '/@/sooth/Dict/dict.api';
  import { saveButtonPermission } from '../buttonPermission.api';
  const treeRef = ref<Nullable<TreeActionType>>(null);
  //树的信息
  const treeData = ref<TreeItem[]>([]);
  const lastTreeData: Array<any> = [];
  const buttonType = ref([]);
  const buttonData = ref([]);
  const roleId = ref('');
  const loading = ref(false);
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    setDrawerProps({ confirmLoading: false, loading: true });
    roleId.value = data.roleId;
    //初始化数据
    const menuResult = await listTree({});
    const buttonResult = await dictItemCode('button_type');
    if (buttonResult) {
      buttonData.value = buttonResult;
    }
    treeData.value = menuPermission(menuResult, buttonResult);
    setDrawerProps({ loading: false });
  });

  function getTree() {
    const tree = unref(treeRef);
    if (!tree) {
      throw new Error('tree is null!');
    }
    return tree;
  }
  /**
   * 提交
   */
  async function handleSubmit() {
    let checkedKeys = getTree().getCheckedKeys();
    if (!(checkedKeys instanceof Array)) {
      checkedKeys = checkedKeys['checked'];
    }
    const checkedNodeArray: Array<any> = [];
    for (let checkedKey of checkedKeys) {
      const checkedNode = getTree().getSelectedNode(checkedKey);
      if (checkedNode && checkedNode.isLeaf) {
        const parentId = checkedNode.parentId;
        const type = checkedNode.type;
        if (parentId && type) {
          checkedNodeArray.push({roleId:unref(roleId),menuId:parentId,type:type});
        }
      }
    }
    loading.value = true;
    try {
      await saveButtonPermission(checkedNodeArray);
    } finally {
      loading.value = false;
    }
    closeDrawer();
  }
  function handleChange() {
    let checkedKeys: Array<any> = [];
    if (buttonType.value && buttonType.value.length > 0) {
      for (let bt of buttonType.value) {
        for (let lastTree of lastTreeData) {
          checkedKeys.push(lastTree + bt);
        }
      }
    }
    getTree().checkAll(false);
    getTree().setCheckedKeys(checkedKeys);
  }

  function menuPermission(menuResult: Array<any>, buttonResult: Array<any>): Array<TreeItem> {
    const resultArray: Array<TreeItem> = [];
    for (let menu of menuResult) {
      const permission: TreeItem = {
        key: menu.id,
        name: menu.name,
        parentId: menu.parentId,
        disableCheckbox: true,
        isLeaf: false,
      };
      resultArray.push(permission);
      if (menu.children?.length > 0) {
        permission.children = menuPermission(menu.children, buttonResult);
      } else {
        lastTreeData.push(permission.key);
        buttonPermission(permission, buttonResult);
      }
    }
    return resultArray;
  }
  function buttonPermission(menu: TreeItem, buttonResult: Array<any>): void {
    const buttonArray: Array<TreeItem> = [];
    if (buttonResult) {
      for (let button of buttonResult) {
        const permission: TreeItem = {
          key: menu.key + button.value,
          name: button.name,
          type: button.value,
          parentId: menu.key,
          disableCheckbox: false,
          isLeaf: true,
        };
        buttonArray.push(permission);
      }
    }
    menu.children = buttonArray;
  }
</script>

<style lang="less" scoped></style>
