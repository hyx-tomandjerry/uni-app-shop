export default {
	//设置门店数量
	setShopCount(state,value){
		state.shopCount=value;
		uni.getStorage({
			key:'shopCount',
			data:value
		})
	},
	//设置单个门店内容
	setShopOnlyObj(state,value){
		state.shopOnlyObj=value;
		uni.getStorage({
			key:'shopOnlyObj',
			data:value
		})
	},
    login(state,provider){
        state.userInfo=provider;
        uni.setStorage({
            key:'userInfo',
            data:provider
        })
    },
    logout(state){
        //退出登录
        state.userInfo={};
        uni.removeStorage({
            key:'userInfo',
        })
    },
	setTodoNum(state,value){
		state.todoNum=value
	},
	
}

