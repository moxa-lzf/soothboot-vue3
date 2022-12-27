import { defHttp } from '/@/utils/http/axios';
import { GetUserInfoModel, LoginParams, LoginResultModel } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';
import { useUserStoreWithOut } from '/@/store/modules/user';
import { setAuthCache } from '/@/utils/auth';
import { TOKEN_KEY } from '/@/enums/cacheEnum';
import { router } from '/@/router';
import { PageEnum } from '/@/enums/pageEnum';

enum Api {
  Login = '/sys/login',
  Logout = '/sys/logout',
  GetUserInfo = '/sys/user/getUserInfo',
  GetPermCode = '/sys/permission/getPermCode',
  getInputCode = '/sys/randomImage',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp
    .get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
    .catch((e) => {
      if (e && (e.message.includes('timeout') || e.message.includes('401'))) {
        const userStore = useUserStoreWithOut();
        userStore.setToken('');
        setAuthCache(TOKEN_KEY, null);
        router.push(PageEnum.BASE_LOGIN);
      }
    });
}
export function getPermCode() {
  return defHttp.get({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function getCodeInfo(currdatetime) {
  const url = Api.getInputCode + `/${currdatetime}`;
  return defHttp.get({ url: url });
}
