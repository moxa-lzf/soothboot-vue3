import { BaseApi } from '/@/api/base/baseApi';
class BaseClassApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const baseClassApi = new BaseClassApi('/generate/baseClass').api;
