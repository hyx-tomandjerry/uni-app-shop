import config from './config.js'
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
				}
				httpMethod(api,param,baseParam,resp,failResp)
			},
			fail:()=>{
			}
		})
	}else{
		let baseParam = {}
		httpMethod(api,param,baseParam,resp,failResp)
	}
}
const httpMethod = (api,param,baseParam,resp,failResp)=>{
	let real_params;
	// let url=config.xiaoxiongUrl;
	let url=config.proUrl;
	Object.keys(param).forEach(item=>{
		if(baseParam[item]){
			delete baseParam[item]
		}
	})
	real_params = Object.assign({f:api},baseParam,param)
	uni.request({
		url:url,
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
