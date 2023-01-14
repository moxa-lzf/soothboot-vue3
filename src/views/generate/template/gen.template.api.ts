import { BaseApi } from '/@/api/base/baseApi';

class TemplateApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const templateApi = new TemplateApi('/generate/template').api;
