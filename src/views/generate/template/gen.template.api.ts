import{BaseApi}from '/@/api/common/baseApi'
class TemplateApi extends BaseApi{
  constructor(){
    super('/generate/template');
  }
}
export const templateApi=new TemplateApi().baseApi();