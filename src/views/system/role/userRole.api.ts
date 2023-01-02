import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from '/@/api/base/baseApi';

class UserRoleApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}

export const userRoleApi = new UserRoleApi('/sys/userRole').api;

enum Api {
  saveUserRole = '/sys/userRole/saveUserRole',
  getUserByRoleId = '/sys/userRole/getUserByRoleId',
  getRoleByUserId = '/sys/userRole/getRoleByUserId',
}

export const saveUserRole = (params, handleSuccess) => {
  return defHttp.post({ url: Api.saveUserRole, params }).then(() => {
    handleSuccess();
  });
};

export const getUserByRoleId = (params) => {
  return defHttp.get({ url: Api.getUserByRoleId, params });
};

export const getRoleByUserId = (params) => {
  return defHttp.get({ url: Api.getRoleByUserId, params });
};
