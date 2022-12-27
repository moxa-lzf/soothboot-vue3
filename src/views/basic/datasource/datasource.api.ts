import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/sys/dataSource/page',
  save = '/sys/dataSource/save',
  edit = '/sys/dataSource/edit',
  get = '/sys/dataSource/get',
  delete = '/sys/dataSource/remove',
  testConnection = '/sys/dataSource/testConnection',
  deleteBatch = '/sys/dataSource/removeBatch',
  exportXlsUrl = 'sys/dataSource/exportXls',
  importExcelUrl = 'sys/dataSource/importExcel',
  getAllDataSourceList='/sys/dataSource/list',
}
/**
 * 导出api
 */
export const getExportUrl = Api.exportXlsUrl;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcelUrl;

/**
 * 查询数据源列表
 * @param params
 */
export const getDataSourceList = (params) => {
  return defHttp.get({ url: Api.list, params });
};

/**
 * 保存或者更新数据源
 * @param params
 */
export const saveOrUpdateDataSource = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};

/**
 * 查询数据源详情
 * @param params
 */
export const getDataSourceById = (params) => {
  return defHttp.get({ url: Api.get, params });
};

/**
 * 删除数据源
 * @param params
 */
export const deleteDataSource = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.delete, data: params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};

/**
 * 测试连接
 * @param params
 */
export const testConnection = (params) => {
  return defHttp.post({ url: Api.testConnection, params });
};

/**
 * 批量删除数据源
 * @param params
 */
export const batchDeleteDataSource = (params, handleSuccess) => {
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
 * 获取全部数据源
 * @param params
 */
export const getAllDataSourceList = (params) => defHttp.get({ url: Api.getAllDataSourceList, params:params});
