<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="代码预览"
    defaultFullscreen
    okText="下载"
    @ok="handleSubmit"
  >
    <Tabs v-for="(item, index) in codeList" :key="index">
      <TabPane :tab="item.fileName">
        <CodeEditor v-model:value="item.content" />
      </TabPane>
    </Tabs>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { CodeEditor } from '/@/components/CodeEditor';
  import { ref } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  // 声明Emits
  const emit = defineEmits(['register', 'success']);
  const codeList = ref([]);
  //表单赋值
  const [registerModal, { openOKLoading, closeModal }] = useModalInner(async (data) => {
    debugger
    codeList.value = data;
  });
  //表单提交事件
  async function handleSubmit() {
    openOKLoading(async () => {
      //提交表单
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    });
  }
</script>
