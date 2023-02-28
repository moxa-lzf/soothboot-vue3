<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <ProgramTable class="w-2/5 xl:w-2/5" @change="handleDictChange" />
    <MessageTable class="w-3/5 xl:w-3/5" :program="program" />
  </PageWrapper>
</template>

<script lang="ts" name="basic-dict" setup>
  import { ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import ProgramTable from './components/ProgramTable.vue';
  import MessageTable from './components/MessageTable.vue';
  const program = ref(null);
  function handleDictChange(row) {
    program.value = row;
  }
</script>

<style scoped></style>
