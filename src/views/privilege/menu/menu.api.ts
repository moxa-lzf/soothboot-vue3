import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from '/@/api/base/baseApi';

class MenuApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}

export const menuApi = new MenuApi('/sys/menu').api;

enum Api {
  listMenuTree = '/sys/menu/listMenuTree',
}

/**
 * 列表接口
 * @param params
 */
export const listMenuTree = (params) => {
  return defHttp.get({ url: Api.listMenuTree, params });
};
