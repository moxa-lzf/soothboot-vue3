<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
  <DeptTree class="w-1/4 xl:w-1/5"></DeptTree>
    <RoleTable class="w-3/4 xl:w-4/5" @change="handleChange" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref,unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import RoleTable from './components/RoleTable.vue';
  import DeptTree from '../user/DeptTree.vue';
const userRoleTableRef=ref(null);
  function handleChange(id) {
    unref(userRoleTableRef).load(id);
  }
</script>
