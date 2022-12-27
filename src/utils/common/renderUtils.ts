import { h } from 'vue';
import { Avatar } from 'ant-design-vue';
import { getFileAccessHttpUrl } from '/@/utils/common/compUtils';
import Icon from '/@/components/Icon';

const render = {
  /**
   * 渲染列表头像
   */
  renderAvatar: ({record}) => {
    if (record.avatar) {
      let avatarList = record.avatar.split(',');
      return h(
        'span',
        avatarList.map((item) => {
          return h(Avatar, {
            src: getFileAccessHttpUrl(item),
            shape: 'square',
            size: 'default',
            style: {marginRight: '5px'},
          });
        })
      );
    } else {
      return h(
        Avatar,
        {shape: 'square', size: 'default'},
        {
          icon: () => h(Icon, {icon: 'ant-design:file-image-outlined', size: 30}),
        }
      );
    }
  }
};
export { render };
