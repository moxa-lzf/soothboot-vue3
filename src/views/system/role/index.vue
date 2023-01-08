<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <RoleTable @change="handleChange" />
    <UserRoleTable :roleId="roleId" />
  </PageWrapper>
</template>
<script lang="ts" name="system-role" setup>
  import { reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import RoleTable from './components/RoleTable.vue';
  import UserRoleTable from './components/UserRoleTable.vue';
  const roleId = ref(null);
  function handleChange(id) {
    roleId.value = id;
  }
</script>
