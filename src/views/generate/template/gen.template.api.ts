import { BaseApi } from '/@/api/base/baseApi';
import { defHttp } from '/@/utils/http/axios';
class TemplateApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const templateApi = new TemplateApi('/generate/template').api;

enum Api {
  help = '/generate/template/help',
}

export const help = () => defHttp.get({ url: Api.help });
