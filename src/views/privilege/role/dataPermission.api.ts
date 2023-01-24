import { BaseApi } from '/@/api/base/baseApi';
class RoleApi extends BaseApi {
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const dataPermissionApi = new RoleApi('/sys/dataPermission').api;
