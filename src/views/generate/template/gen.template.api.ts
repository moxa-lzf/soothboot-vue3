import {BaseApi} from "/@/api/base/baseApi";

class TemplateApi extends BaseApi{
  constructor(){
    super('/generate/template');
  }
}
export const templateApi=new TemplateApi().api;
