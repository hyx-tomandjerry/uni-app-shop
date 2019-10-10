import store from '../store/index'
const errorText = require('./errorText')
const ajax=(api,param,resp,reqCache=true,failResp)=>{
	if(reqCache){
	
		uni.getStorage({
			key:'userInfo',
			success: (res) => {
				if(!res.data.session){
					uni.showToast({
						title:'没有本地记录，请重新登录',
						icon:'none'
					})
					return;
				}
				let baseParam={
					owner:res.data.owner,
					session:res.data.session,
					userId:res.data.id
					// owner:0,
					// userId:1,
					// session:'c12571af68a447389107a255e5c76183'
				}
				httpMethod(api,param,baseParam,resp,failResp)
			},
			fail:()=>{
                // uni.showToast({
                //     title:`请求错误`,
                //     icon:'none'
                // })
			}
		})
	}else{
		let baseParam = {}
		httpMethod(api,param,baseParam,resp,failResp)
	}
}
const httpMethod = (api,param,baseParam,resp,failResp)=>{
	// let url;
	// if(store.state.production){
	// 	url = store.state.proUrl
	// }else{
	// 	url = store.state.devUrl
	// }
	// if(store.state.hasLogin){
	// 	url = store.state.userInfo.server;
	// }

	
	let real_params
	Object.keys(param).forEach(item=>{
		if(baseParam[item]){
			delete baseParam[item]
		}
	})
	real_params = Object.assign({f:api},baseParam,param)
	uni.request({
		// store.state.xiaoxiongUrl
		// url:store.state.xiaoxiongUrl,
		url:store.getters.url,
		data:real_params,
		method:'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
		},
		success: (res) => {
			if(res.statusCode===200){
                if (res.data.code === 0) {
                    resp(res.data.data)
                } else {
					setTimeout(()=>{
						switchCode(res.data.code.toString());
						failResp(res.data.code)
					},800)
					
				}
                // else if(res.data.code===-31 || res.data.code===-1) {
				// 	 resp(res.data.code)
                //
                // }else{
				//
				// }


			}else {
			
                handleError(res)
			}

		},
		fail(error) {
			console.log(error)
		}
	})
}



const handleError = (error)=> {
    const errortext = errorText.serverMessage[error.statusCode] || error.statusCode;
    uni.showToast({
        title:`请求错误，${errortext}`,
        icon:'none'
    })
}




const switchCode =  (code)=> {
    const errortext = errorText.codeMessage[code] || code;
    uni.showToast({
        title:`${errortext}`,
        icon:'none'
    })
}

export {
	ajax
}
