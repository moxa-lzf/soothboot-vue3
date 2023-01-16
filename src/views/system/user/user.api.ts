import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from '/@/api/base/baseApi';

class UserApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const userApi = new UserApi('/sys/user').api;
enum Api {
  saveUser = '/sys/user/saveUser',
  editUser = '/sys/user/editUser',
  updatePassword = '/sys/user/updatePassword',
}

export const saveUser = (params) => defHttp.post({ url: Api.saveUser, params });

export const editUser = (params) => defHttp.post({ url: Api.editUser, params });

export const updatePassword = (params) => defHttp.put({ url: Api.updatePassword, params });
