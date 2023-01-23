import { BaseApi } from '/@/api/base/baseApi';
import { defHttp } from "/@/utils/http/axios";
class TemplateApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const templateApi = new TemplateApi('/generate/template').api;

enum Api {
  groupList = "/generate/templateGroup/groupList",
}

export const groupList = (params) => defHttp.get({ url: Api.groupList, params });
