import { BaseApi } from '/@/api/base/baseApi';
import { defHttp } from '/@/utils/http/axios';
class ButtonPermissionApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const buttonPermissionApi = new ButtonPermissionApi('/sys/buttonPermission').api;

enum Api {
  saveButtonPermission = '/sys/buttonPermission/saveButtonPermission',
}
/**
 * 保存按钮权限
 */
export const saveButtonPermission = (params) =>
  defHttp.post({ url: Api.saveButtonPermission, params });
