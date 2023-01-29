import { BaseApi } from '/@/api/base/baseApi';
import { defHttp } from "/@/utils/http/axios";
class TemplateGroupApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const templateGroupApi = new TemplateGroupApi('/generate/templateGroup').api;

enum Api {
  groupList = "/generate/templateGroup/groupList",
}

export const groupList = (params) => defHttp.get({ url: Api.groupList, params });
