import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

export class BaseApi {
  readonly api: {
    postEdit: (params) => Promise<any>;
    get: (params) => Promise<any>;
    getOne: (params) => Promise<any>;
    save: (params) => Promise<any>;
    saveOrEdit: (params, isUpdate) => Promise<any>;
    removeBatch: (params, handleSuccess) => void;
    page: (params) => Promise<any>;
    list: (params) => Promise<any>;
    putEdit: (params) => Promise<any>;
    remove: (params) => Promise<any>;
  };

  constructor(requestUrl: string) {
    this.api = this.baseApi(requestUrl);
  }

  private baseApi(requestUrl: string) {
    const Api = {
      get: `${requestUrl}/get`,
      getOne: `${requestUrl}/getOne`,
      page: `${requestUrl}/page`,
      list: `${requestUrl}/list`,
      save: `${requestUrl}/save`,
      postEdit: `${requestUrl}/edit`,
      putEdit: `${requestUrl}/edit`,
      remove: `${requestUrl}/remove`,
      removeBatch: `${requestUrl}/removeBatch`,
    };
    /**
     * @param params
    */
    const get = (params) => {
      return defHttp.get({ url: Api.get, params });
    };
    /**
     * @param params
     */
    const getOne = (params) => {
      return defHttp.get({ url: Api.getOne, params });
    };
    /**
     * @param params
     */
    const page = (params) => {
      return defHttp.get({ url: Api.page, params });
    };
    /**
     *
     * @param params
     */
    const list = (params) => {
      return defHttp.get({ url: Api.list, params });
    };
    /**
     * @param params
     */
    const save = (params) => {
      return defHttp.post({ url: Api.save, params });
    };
    /**
     * @param params
     */
    const postEdit = (params) => {
      return defHttp.post({ url: Api.postEdit, params });
    };
    /**
     * @param params
     */
    const putEdit = (params) => {
      return defHttp.post({ url: Api.putEdit, params });
    };
    /**
     * @param params
     */
    const saveOrEdit = (params, isUpdate) => {
      if (isUpdate) {
        return postEdit(params);
      } else {
        return save(params);
      }
    };
    /**
     * @param params
     */
    const remove = (params) => {
      return defHttp.delete({ url: Api.remove, data: params }, { joinParamsToUrl: true });
    };

    /**
     * @param params
     */
    const removeBatch = (params, handleSuccess) => {
      Modal.confirm({
        title: '确认删除',
        content: '是否删除选中数据',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          return defHttp
            .delete({ url: Api.removeBatch, data: params }, { joinParamsToUrl: true })
            .then(() => {
              handleSuccess();
            });
        },
      });
    };
    return { get, getOne, page, list, save, postEdit, putEdit, saveOrEdit, remove, removeBatch };
  }
}
