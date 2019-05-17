let url="http://192.168.10.22/services?f=";
// let url='http://192.168.10.58:8080/blade/services?f='
const ajax=(api,param,resp,a=true)=>{
	if(a){
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
				console.log('kkkkkkkkkk')
				}
		})
	}else{
		let baseParam = {}
		httpMethod(api,param,baseParam,resp)
	}
}
const httpMethod = (api,param,baseParam,resp)=>{
	uni.request({
		url:url+api,
		data:Object.assign(param,baseParam),
		method:'POST',
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', 
		},
		success: (data) => {
			if(data.statusCode==200){
				resp(data.data.data)
			}else {
				uni.showToast({
					title:'调用接口失败',
					icon:'none'
				})
			}
			
		}
	})
}

export {
	ajax
}