<template>
  <a-row :class="['p-4', `${prefixCls}--box`]" :gutter="10">
    <a-col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <a-card :bordered="false" style="height: 100%">
        <TemplateGroupTree @select="onTreeSelect"></TemplateGroupTree>
      </a-card>
    </a-col>
    <a-col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1">
    <GenTemplate :data="departData"></GenTemplate>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup name="system-depart-user">
  import { provide, ref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import TemplateGroupTree from './components/TemplateGroupTree.vue';
  import GenTemplate from './components/GenTemplate.vue';
  const { prefixCls } = useDesign('depart-user');
  provide('prefixCls', prefixCls);

  let departData = ref({});
  // 左侧树选择后触发
  function onTreeSelect(data) {
    departData.value = data;
  }
</script>

<style>

</style>
