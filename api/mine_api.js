import {ajax} from '../common/https.js'
import utils from '../common/js/utils.js'
/*基本信息编辑*/
async function SetProfileApi(val){
	let result = await ajax('SetProfile',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*公司信息*/
async function CustomerApi(id){
	let result = await ajax('Customer',{id})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*修改密码*/
async function ResetPwdApi(token,original){
	let result = await ajax('ResetPwd',{token,original})
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*修改电话号码*/
async function ChangeMobileApi(mobile,token,vcode){
	let result = await ajax('ChangeMobile',{mobile,token,vcode})
	if(utils.getErrorMsg(result.code.toString())) return true;
}
export {
	SetProfileApi,
	CustomerApi,
	ResetPwdApi,
	ChangeMobileApi
}