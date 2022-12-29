import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';
enum Api {
  list = '/gen/table/list',
  save = '/gen/table/add',
  edit = '/gen/table/edit',
  deleteDict = '/gen/table/delete',
  deleteBatch = '/gen/table/deleteBatch',
  getTableList='/gen/table/getTableList',
  getTableFieldList='/gen/table/getTableFieldList',
  preview='/gen/code/preview',
  generate='/gen/code/generate'
}
/**
 * 字典列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });
/**
 * 删除字典
 */
export const deleteDict = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteDict, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
/**
 * 批量删除字典
 * @param params
 */
export const batchDeleteDict = (params, handleSuccess) => {
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


export const getTableList=(params)=>defHttp.get({ url: Api.getTableList,params});

export const tableImport=(datasourceId:Number,tableNameList:Array<String>)=>defHttp.post({ url:'/gen/table/'+datasourceId+'/tableImport',params:tableNameList});

export const getTableFieldList=(params)=>defHttp.get({ url:Api.getTableFieldList,params});

export const preview=(params)=>defHttp.get({ url:Api.preview,params});

export const generate=(params)=>defHttp.post({ url:Api.generate,params});
