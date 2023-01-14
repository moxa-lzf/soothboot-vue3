<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.realName }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem key="account" text="账户设置" icon="ant-design:setting-outlined" />
        <MenuItem key="password" text="密码修改" icon="ant-design:edit-outlined" />
        <MenuItem key="dept" text="切换部门" icon="ant-design:cluster-outlined" />
        <MenuItem key="cache" text="刷新缓存" icon="ant-design:sync-outlined" />
        <MenuItem v-if="getUseLockPage" key="lock" text="锁定屏幕" icon="ion:lock-closed-outline" />
        <MenuItem key="logout" text="退出系统" icon="ion:power-outline" />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
  <UpdatePassword ref="updatePasswordRef" />
  <AccountSetting @register="registerAccount" />
</template>
<script lang="ts">
  import { Dropdown, Menu } from 'ant-design-vue';
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';

  import { defineComponent, computed, ref } from 'vue';

  import { useUserStore } from '/@/store/modules/user';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useModal } from '/@/components/Modal';
  import headerImg from '/@/assets/images/header.jpg';
  import { propTypes } from '/@/utils/propTypes';
  import { defHttp } from '/@/utils/http/axios';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';

  type MenuEvent = 'logout' | 'dept' | 'account' | 'password' | 'lock' | 'cache';

  export default defineComponent({
    name: 'UserDropdown',
    components: {
      Dropdown,
      Menu,
      MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
      MenuDivider: Menu.Divider,
      LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
      AccountSetting: createAsyncComponent(() => import('./AccountSetting.vue')),
      UpdatePassword: createAsyncComponent(() => import('./UpdatePassword.vue')),
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
      const { prefixCls } = useDesign('header-user-dropdown');
      const { t } = useI18n();
      const { getUseLockPage } = useHeaderSetting();
      const userStore = useUserStore();
      const getUserInfo = computed(() => {
        const { realName = '', avatar, desc } = userStore.getUserInfo || {};
        return { realName, avatar: avatar || headerImg, desc };
      });

      const [register, { openModal }] = useModal();

      const [registerAccount, { openModal: openAccountModal }] = useModal();

      function handleLock() {
        openModal(true);
      }

      //  login out
      function handleLoginOut() {
        userStore.confirmLoginOut();
      }

      // 修改密码
      const updatePasswordRef = ref();

      const accountSettingRef = ref();

      function updatePassword() {
        updatePasswordRef.value.show(userStore.getUserInfo.username);
      }

      function accountSetting() {
        openAccountModal(true, { record: userStore.getUserInfo });
      }
      function refreshCache() {
        defHttp.get({ url: '/sys/refreshCache'});
      }
      function handleMenuClick(e: MenuInfo) {
        switch (e.key as MenuEvent) {
          case 'logout':
            handleLoginOut();
            break;
          case 'lock':
            handleLock();
            break;
          case 'dept':
            break;
          case 'password':
            updatePassword();
            break;
          case 'account':
            accountSetting();
            break;
          case 'cache':
            refreshCache();
            break;
        }
      }

      return {
        prefixCls,
        t,
        getUserInfo,
        handleMenuClick,
        register,
        registerAccount,
        getUseLockPage,
        updatePasswordRef,
        accountSettingRef,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
