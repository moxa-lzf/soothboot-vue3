<template>
  <Row class="p-4" :gutter="10">
    <Col :xl="6" :lg="8" :md="10" :sm="24" style="flex: 1">
      <Card :bordered="false" style="height: 100%">
        <TemplateGroupTree @select="onTreeSelect" />
      </Card>
    </Col>
    <Col :xl="18" :lg="16" :md="14" :sm="24" style="flex: 1">
      <GenTemplate :data="departData" />
    </Col>
  </Row>
</template>

<script lang="ts" name="generate-template" setup>
  import { ref } from 'vue';
  import { Row, Col, Card }from 'ant-design-vue';
  import TemplateGroupTree from './components/TemplateGroupTree.vue';
  import GenTemplate from './components/GenTemplate.vue';
  let departData = ref({});
  // 左侧树选择后触发
  function onTreeSelect(data) {
    departData.value = data;
  }
</script>

<style></style>
