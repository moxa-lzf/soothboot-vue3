import { defHttp } from "/@/utils/http/axios";
enum Api {
  edit = "/generate/template/edit",
  save = "/generate/template/save",
  get = "/generate/template/get",
  remove = "/generate/template/remove",
  removeBatch = "/generate/template/removeBatch",

  templateList = "/generate/template/page",
  editGroup = "/generate/templateGroup/edit",
  saveGroup = "/generate/templateGroup/save",
  removeGroup="/generate/templateGroup/remove",
  templateGroupList = "/generate/templateGroup/list",
};
/**
 * 查询部门角色信息
 */
export const templateList = (params) => defHttp.get({ url: Api.templateList, params });

export const templateGroupList = (params) => defHttp.get({ url: Api.templateGroupList, params });

export const removeGroup = (params) => defHttp.delete({ url: Api.removeGroup, params },{ joinParamsToUrl: true });

export const saveOrUpdateGroup = (params, isUpdate) => {
  if(isUpdate){
    return defHttp.put({ url: Api.editGroup, params });
  }else{
    return defHttp.post({ url: Api.saveGroup, params });
  }
};
export const get = (params) => defHttp.get({ url: Api.get, params });
export const remove = (params) => defHttp.delete({ url: Api.remove, params },{ joinParamsToUrl: true });
export const removeBatch = (params) => defHttp.delete({ url: Api.removeBatch, params },{ joinParamsToUrl: true });
export const saveOrUpdate = (params, isUpdate) => {
  if(isUpdate){
    return defHttp.post({ url: Api.edit, params });
  }else{
    return defHttp.post({ url: Api.save, params });
  }
};
