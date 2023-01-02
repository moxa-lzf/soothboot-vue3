import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from '/@/api/base/baseApi';

class UserDeptApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}

export const userDeptApi = new UserDeptApi('/sys/userDept').api;

enum Api {
  getDeptByUserId = '/sys/userDept/getDeptByUserId',
}

export const getDeptByUserId = (params) => {
  return defHttp.get({ url: Api.getDeptByUserId, params });
};
