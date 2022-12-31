<template>
  <RouterView>
    <template #default="{ Component, route }">
      <keep-alive v-if="routeCache(route)">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
      <component v-else :is="Component" :key="route.fullPath" />
    </template>
  </RouterView>
  <FrameLayout v-if="getCanEmbedIFramePage" />
</template>

<script lang="ts" setup>
  import FrameLayout from '/@/layouts/iframe/index.vue';

  import { useRootSetting } from '/@/hooks/setting/useRootSetting';

  const { getCanEmbedIFramePage } = useRootSetting();

  function routeCache(route) {
    return route.meta.keepAlive;
  }
</script>
