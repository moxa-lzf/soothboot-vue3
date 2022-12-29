import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';
enum Api {
  list = '/generate/fieldType/list',
  listAttrType='/generate/fieldType/listAttrType',
  save = '/generate/fieldType/add',
  edit = '/generate/fieldType/edit',
  deleteFieldType = '/generate/fieldType/delete',
  deleteBatch = '/generate/fieldType/deleteBatch',
  importExcel = '/generate/fieldType/importExcel',
  exportXls = '/generate/fieldType/exportXls',
  initTypeField='/generate/fieldType/init'
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 * @param params
 */
export const getImportUrl = Api.importExcel;
/**
 * 字典列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

export const listAttrType=(params)=>defHttp.get({url:Api.listAttrType,params})
/**
 * 删除字典
 */
export const deleteFieldType = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteFieldType, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除字典
 * @param params
 */
export const batchDeleteFieldType = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新字典
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

export const initTypeField=(params?)=>{
  let url=Api.initTypeField
  return defHttp.post({ url: url, params });
}
