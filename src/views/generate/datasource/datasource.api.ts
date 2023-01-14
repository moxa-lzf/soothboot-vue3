import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from '/@/api/base/baseApi';
class DataSourceApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const datasourceApi = new DataSourceApi('/sys/dataSource').api;
enum Api {
  testConnection = '/sys/dataSource/testConnection',
  listLabel = '/sys/dataSource/listLabel',
}
/**
 * 测试连接
 * @param params
 */
export const testConnection = (params) => {
  return defHttp.post({ url: Api.testConnection, params });
};
export const listLabel = () => {
  return defHttp.get({ url: Api.listLabel });
};
