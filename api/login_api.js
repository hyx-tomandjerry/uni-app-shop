import {ajax} from '../common/https.js'
import utils from '../common/js/utils.js'
async function SignupApi(val){
	let result= await ajax('Signup',val);
	if(utils.getErrorMsg(result.code.toString())) return true
}
/*发送短信*/
async function SendVerCodeApi(mobile){
	let result = await ajax('SendVerCode',{mobile});
	if(utils.getErrorMsg(result.code.toString())) return true
}
/*设置密码*/
async function InitPwdApi(vcode,token,mobile){
	let result = await ajax('InitPwd',{vcode,token,mobile})
	if(utils.getErrorMsg(result.code.toString())) return true
}
/*登录*/
async function LoginApi(user,token){
	let result = await ajax('Login',{user,token})
	if(result.code.toString()==-1){
		setTimeout(()=>{
			utils.showToast('账号或密码错误')
		},900)
		return false
	}else if(result.code.toString()=='0') {
		return result.data
	}else{
		utils.showToast('请求超时')
		return false;
	}
	
}
export {
	SignupApi,
	SendVerCodeApi,
	InitPwdApi,
	LoginApi
}