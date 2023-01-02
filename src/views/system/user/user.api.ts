import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from '/@/api/base/baseApi';

class UserApi extends BaseApi{
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const userApi = new UserApi('/sys/user').api;
enum Api {
  save = '/sys/user/add',
  edit = '/sys/user/edit',
  list = '/sys/user/list',
  getUserRole = '/sys/user/queryUserRole',
}
/**
* 用户角色接口
* @param params
*/
export const getUserRoles = (params) => defHttp.get({ url: Api.getUserRole, params }, { errorMessageMode: 'none' });

/**
* 保存或者更新用户
* @param params
*/
export const saveOrUpdateUser = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
export const list = (params) => {
  return defHttp.get({ url: Api.list, params });
};

