import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';
enum Api {
  list = '/generate/baseClass/list',
  save = '/generate/baseClass/add',
  edit = '/generate/baseClass/edit',
  listAll = '/generate/baseClass/listAll',
  deleteFieldType = '/generate/baseClass/delete',
  deleteBatch = '/generate/baseClass/deleteBatch',
  importExcel = '/generate/baseClass/importExcel',
  exportXls = '/generate/baseClass/exportXls',
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

export const listAll = (params) => defHttp.get({ url: Api.listAll, params });
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
