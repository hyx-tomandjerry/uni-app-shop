import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
App.mpType = 'app'
import store from './store/index.js'
Vue.prototype.$store=store;
import onfire from 'onfire.js';
Vue.prototype.$fire=new onfire();


//管道
Vue.filter('repairStatus',function(value){
	if(!value) return ''
	return store.state.repairStatusZn[value]
})
Vue.filter('repairStatusColor',function(value){
	if(!value) return ''
	return store.state.repairStatusColor[value]
})
Vue.filter('color',function(value){
	return 'bg-gray'
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
	
				}
				return dataTime;//将格式化后的字符串输出到前端显示
})
	
//代办通知显示类型
Vue.filter('todoType',function(value){
	return store.state.noticeTypeZn[value]
})
//代办通知显示类型颜色
Vue.filter('todoTypeColor',function(value){
	return store.state.noticeTypeColor[value]
})
const app = new Vue({
    ...App
})
app.$mount()
