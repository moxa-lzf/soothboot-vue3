import { BaseApi } from '/@/api/base/baseApi';
import { defHttp } from '/@/utils/http/axios';
class ButtonApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const buttonApi = new ButtonApi('/sys/button').api;

enum Api {
  saveButton = '/sys/button/saveButton',
}
/**
 * 保存按钮
 */
export const saveButton = (menuId, params) =>
  defHttp.post({ url: Api.saveButton + '/' + menuId, params });
