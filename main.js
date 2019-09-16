import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
import LxEmpty from 'lx_components/lx-empty'
Vue.component('lx-empty',LxEmpty)
App.mpType = 'app'
import store from './store/index.js'
Vue.prototype.$store=store;
import onfire from 'onfire.js';
Vue.prototype.$fire=new onfire();
import webim from './static/js/webim.js'
import {ajax} from './common/http.js'
Vue.prototype.$ajax=ajax;
import utils from './common/utils'
Vue.prototype.$utils=utils;


//管道
Vue.filter('repairStatus',function(value){
	if(!value) return ''
	return store.state.repairStatusZn[value]
})
Vue.filter('repairTypePipe',(value)=>{
	if(!value) return ''
	return store.state.repairTypeZn[value]
})
//快递状态
Vue.filter('expressStatusPipe',(value)=>{
	if(!value) return''
	return store.state.expressStatus[value]
})

//门店
Vue.filter('shopStatus',(value)=>{
	if(!value) return ''
	return store.state.shopStatus[value];
})
Vue.filter('shopStatusZn',(value)=>{
	if(!value) return ''
	return store.state.shopStatusZn[value];
})
Vue.filter('shopStatusColor',(value)=>{
	if(!value) return ''
	return store.state.shopStatusColor[value];
})

Vue.filter('shopTypeFilter',(value)=>{
	if(!value) return ''
	return store.state.shopType[value];
})
Vue.filter('operateZn',(value)=>{
	if(!value) return ''
	return store.state.runCatalogZn[value]
})
Vue.filter('distributeStatusPipe',(value)=>{
	if(!value) return ''
	return store.state.distributeStatus[value]
})

//成员状态
Vue.filter('userStatusPipe',(value)=>{
	if(!value) return ''
	return store.state.userStatus[value]
})
//外部成员状态

Vue.filter('outerStatusZnPipe',(value)=>{
	if(!value) return ''
	return store.state.outerStatusZn[value]
})
Vue.prototype.format=function(value,type){
				var dataTime="";
				var data = new Date();  
				data.setTime(value)
	     		var year   =  data.getFullYear();  
	             var month  = data.getMonth() + 1<10?"0"+(data.getMonth() + 1):data.getMonth() + 1
	             var day    = data.getDate()<10?"0"+data.getDate():data.getDate();
	             var hour   = data.getHours()<10?"0"+data.getHours():data.getHours();
				var minute =  data.getMinutes()<10?"0"+data.getMinutes():data.getMinutes();
				var second = data.getSeconds()<10?"0"+data.getSeconds():data.getSeconds()
				if(type == "YMD"){
					dataTime =  year + "-"+ month + "-" + day;
				}else if(type == "YMDHMS"){
					dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
				}else if(type == "HMS"){
					dataTime = hour+":" + minute+":" + second;
				}else if(type == "YM"){
					dataTime = year + "-" + month;

				}
				return dataTime;//将格式化后的字符串输出到前端显示
}
Vue.filter('formatTime',function(value,type){
				var dataTime="";
				var data = new Date();  
				data.setTime(value)
	     		var year   =  data.getFullYear();  
	             var month  = data.getMonth() + 1<10?"0"+(data.getMonth() + 1):data.getMonth() + 1
	             var day    = data.getDate()<10?"0"+data.getDate():data.getDate();
	             var hour   = data.getHours()<10?"0"+data.getHours():data.getHours();
				var minute =  data.getMinutes()<10?"0"+data.getMinutes():data.getMinutes();
				var second = data.getSeconds()<10?"0"+data.getSeconds():data.getSeconds()
				if(type == "YMD"){
					dataTime =  year + "-"+ month + "-" + day;
				}else if(type == "YMDHMS"){
					dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
				}else if(type == "HMS"){
					dataTime = hour+":" + minute+":" + second;
				}else if(type == "YM"){
					dataTime = year + "-" + month;

				}else if(type=='MD'){
					dataTime=month+"-"+day
				}
				return dataTime;//将格式化后的字符串输出到前端显示
})


/*
	性别

*/
Vue.filter('genderPipe',(value)=>{
	return store.state.gender[value]
})
const app = new Vue({
    ...App
})
app.$mount()
