import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from '/@/api/base/baseApi';
class FieldTypeApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const fieldTypeApi = new FieldTypeApi('/generate/fieldType').api;

enum Api {
  listAttrType = '/generate/fieldType/listAttrType',
  initTypeField = '/generate/fieldType/init',
}

export const listAttrType = (params) => defHttp.get({ url: Api.listAttrType, params });

export const initTypeField = (params?) => {
  const url = Api.initTypeField;
  return defHttp.post({ url: url, params });
};
