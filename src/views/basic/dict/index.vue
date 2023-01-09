<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
  <DictTable @change='handleDictChange'></DictTable>
  <DictItemTable :dict="dict"></DictItemTable>
  </PageWrapper>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import { PageWrapper } from '/@/components/Page';
import DictTable from './components/DictTable.vue';
import DictItemTable from './components/DictItemTable.vue';
const dict=ref(null);
function handleDictChange(row){
dict.value=row;
}
</script>

<style scoped></style>
