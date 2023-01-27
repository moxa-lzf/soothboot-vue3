import { defHttp } from '/@/utils/http/axios';

enum Api {
  dictItemCode = '/sys/dictItem',
}

export const dictItemCode = (code) => defHttp.get({ url: Api.dictItemCode + '/' + code });
