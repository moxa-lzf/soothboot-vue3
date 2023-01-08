<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
  <div class="w-1/2">
    <RoleTable @change="handleChange" />
    </div>
    <div class="w-1/2">
    <UserRoleTable ref="userRoleTableRef" />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive, ref,unref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import RoleTable from './components/RoleTable.vue';
  import UserRoleTable from './components/UserRoleTable.vue';
const userRoleTableRef=ref(null);
  function handleChange(id) {
  console.log(unref(userRoleTableRef));
    unref(userRoleTableRef).load(id);
  }
</script>
