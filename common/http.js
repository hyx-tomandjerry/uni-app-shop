import store from '../store/index'
const errorText = require('./errorText')

const ajax=(api,param,resp,reqCache=true)=>{
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
				httpMethod(api,param,baseParam,resp)
			},
			fail:()=>{
                uni.showToast({
                    title:`请求错误`,
                    icon:'none'
                })
			}
		})
	}else{
		let baseParam = {}
		httpMethod(api,param,baseParam,resp)
	}
}
const httpMethod = (api,param,baseParam,resp)=>{
	uni.request({
		url:store.state.url+api,
		data:Object.assign(param,baseParam),
		method:'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
		},
		success: (res) => {
			if(res.statusCode==200){
                if (res.data.code === 0) {
                    resp(res.data.data)
                } else {
                    switchCode(res.data.code.toString());
                }


			}else {
                handleError(res)
			}

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
