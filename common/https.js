import {config} from './config.js'
import {xServerApi,proServerApi} from './api.js';
 let normalUrl="";
let xServer="";
let baseParam={};
let xapiArr={};//xapi数组
async function ajax(api,param={}){
	return new Promise((resolve,reject)=>{
		let userInfo = uni.getStorageSync('userInfo');
		if(userInfo){
			normalUrl=userInfo.server;
			xServer=userInfo.xserver;
			baseParam={
				owner:userInfo.owner,
				session:userInfo.session,
				userId:userInfo.id
			}
		}else{
			baseParam={}
		}
		//路径
		let url=getUrl(api);
	
		//数据
		uni.request({
			url:url,
			data:{...baseParam,...param,f:api},
			method:'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
			success: (res) => {
				
				if(res.statusCode==200){
					if(res.data==500){
						uni.showToast({
							title:`${api}报500`,
							icon:'none'
						})
						return;
					}
					resolve(res.data)
				}
			},
			fail: (error) => {
				
				uni.showToast({
					title:`${api}请求中....`,
					icon:'none'
				})
				return;
			}
		})
	})
}
const getUrl=(api) => {
	let result = uni.getStorageSync('xapi');
	if(result  && result.includes(api)){
		return xServer;
	}else if(proServerApi.includes(api)){
		return config.proUrl;
	}else if(api==='XAPIs'){
		return xServer;
	}else{
		return normalUrl;
	}
	
}

export {
	ajax
}