<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
  <DeptTree class="w-1/4 xl:w-1/5"></DeptTree>
    <RoleTable class="w-3/4 xl:w-4/5" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import RoleTable from './components/RoleTable.vue';
  import DeptTree from '../user/DeptTree.vue';
</script>
