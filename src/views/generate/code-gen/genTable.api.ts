import { defHttp } from '/@/utils/http/axios';
import { BaseApi } from "/@/api/base/baseApi";

class GenCodeApi extends BaseApi{
  constructor(requestUrl) {
    super(requestUrl);
  }
}
export const genCodeApi=new GenCodeApi('/gen/table').api;
enum Api {
  getTableList='/gen/table/getTableList',
  getTableFieldList='/gen/table/getTableFieldList',
  preview='/gen/code/preview',
  generate='/gen/code/generate'
}

export const getTableList=(params)=>defHttp.get({ url: Api.getTableList,params});

export const tableImport=(datasourceId:Number,tableNameList:Array<String>)=>defHttp.post({ url:'/gen/table/'+datasourceId+'/tableImport',params:tableNameList});

export const getTableFieldList=(params)=>defHttp.get({ url:Api.getTableFieldList,params});

export const preview=(params)=>defHttp.get({ url:Api.preview,params});

export const generate=(params)=>defHttp.get({ url:Api.generate,params});
