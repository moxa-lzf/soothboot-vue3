import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from '/@/api/base/baseApi';

class MenuApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}

export const menuApi = new MenuApi('/sys/permission').api;

enum Api {
  listTree = '/sys/permission/listTree',
}

/**
 * 列表接口
 * @param params
 */
export const listTree = (params) => {
  return defHttp.get({ url: Api.listTree, params });
};
