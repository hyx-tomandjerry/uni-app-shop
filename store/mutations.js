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
    setImInfo (state, data) {
        state.imInfo = data
    },
    setChatWith (state, data) {
        state.chatWith = data
    }
}
