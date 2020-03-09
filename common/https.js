import {config} from './config.js'
// const errorText = require('./errorText.js')
import {xServerApi,proServerApi} from './api.js';
// import {xServerArr} from '../store/index.js'
 let normalUrl="";
let xServer="";
let baseParam={};
let xapiArr={};//xapi数组
async function ajax(api,param={}){
	return new Promise((resolve,reject)=>{
		uni.getStorage({
			key:'userInfo',
			success:(res)=>{
				if(!res.data.session){
					uni.showToast({
						title:'没有本地记录，请重新登录',
						icon:'none'
					})
					return;
				}
				normalUrl=res.data.server;
				xServer=res.data.xserver;
				baseParam={
					owner:res.data.owner,
					session:res.data.session,
					userId:res.data.id
				}
			},
			fail: () => {
				baseParam={}
			}
		})
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
					title:`${api}接口报错`,
					icon:'none'
				})
				return;
				// resolve(error)
			}
		})
	})
}

// const getUrl=(api) => {
// 	if(xServerApi.includes(api)){
// 		return xServer;
// 	}else if(proServerApi.includes(api)){
// 		return config.proUrl;
// 		// return config.xiaoxiongUrl
// 	}else{
// 		return normalUrl;
// 	}
	
// }
const getUrl=(api) => {
	let result = uni.getStorageSync('xapi');
	if(result  && result.includes(api)){
		return xServer;
	}else if(proServerApi.includes(api)){
		return config.proUrl;
		// return config.xiaoxiongUrl
	}else if(api==='XAPIs'){
		return xServer;
	}else{
		return normalUrl;
	}
	
}

export {
	ajax
}