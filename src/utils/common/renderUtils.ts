import { h } from 'vue';
import { Avatar, Tag } from 'ant-design-vue';
import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
import Icon from '/@/components/Icon';

const render = {
  /**
   * 渲染列表头像
   */
  renderAvatar: ({ record }) => {
    if (record.avatar) {
      const avatarList = record.avatar.split(',');
      return h(
        'span',
        avatarList.map((item) => {
          return h(Avatar, {
            src: getFileAccessHttpUrl(item),
            shape: 'square',
            size: 'default',
            style: { marginRight: '5px' },
          });
        }),
      );
    } else {
      return h(
        Avatar,
        { shape: 'square', size: 'default' },
        {
          icon: () => h(Icon, { icon: 'ant-design:file-image-outlined', size: 30 }),
        },
      );
    }
  },
  renderArray: ({ value }) => {
    if (!value) {
      return '';
    }
    return h(
      'span',
      value.map((v) => h('span', { class: 'mr-4' }, h(Tag, { color: 'blue' }, v))),
    );
  },
};
export { render };
