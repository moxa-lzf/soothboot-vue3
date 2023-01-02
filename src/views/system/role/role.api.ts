import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from '/@/api/base/baseApi';
class RoleApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const roleApi = new RoleApi('/sys/role').api;
enum Api {
  queryRolePermission = '/sys/permission/queryRolePermission',
  saveRolePermission = '/sys/permission/saveRolePermission',
  batchDeleteUserRole = '/sys/user/deleteUserRoleBatch',
}
/**
 * 查询角色权限
 */
export const queryRolePermission = (params) =>
  defHttp.get({ url: Api.queryRolePermission, params });
/**
 * 保存角色权限
 */
export const saveRolePermission = (params) => defHttp.post({ url: Api.saveRolePermission, params });
