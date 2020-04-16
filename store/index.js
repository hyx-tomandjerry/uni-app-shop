
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations'
Vue.use(Vuex);
const store=new Vuex.Store({
	state:{
		todoNum:0,
		shopCount:0,//门店数量
		shopOnlyObj:{},//如果门店数量仅有一家
		userInfo:{},//用户信息
		xServerArr:[],//xserverapi数组
		authorArr:[],//权限数组
	},
	mutations
})
export default store;
