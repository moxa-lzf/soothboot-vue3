import { BaseApi } from '/@/api/base/baseApi';

class DictItemApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const dictItemApi = new DictItemApi('/sys/dictItem').api;
