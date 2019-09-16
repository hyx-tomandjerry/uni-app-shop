export default {
    setUserInfo(state,userInfo){
        state.userInfo=userInfo;
    },
    setProvince(state,province){
        state.province=province;
    },
    setAddress(state,address){
        state.address=address;
    },
    setLoginInfo(state,loginInfo){
        state.loginInfo=loginInfo
    },
    setImInfo (state, imInfo) {
        state.imInfo = imInfo
    },
	setAccount(state,param){
		state.user=param,
		uni.setStorage({
			key:'account',
			data:param
		})
	},
    login(state,provider){
        state.hasLogin=true;
        state.userInfo=provider;
        uni.setStorage({
            key:'userInfo',
            data:provider
        })
    },
    logout(state){
        //退出登录
        state.hasLogin= true;
        state.userInfo={};
        uni.removeStorage({
            key:'userInfo',
        })
    }
}
