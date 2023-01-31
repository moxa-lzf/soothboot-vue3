/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;
  checkKey?: string | number;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}
