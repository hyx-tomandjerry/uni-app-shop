import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

import LxEmpty from 'lx_components/lx-empty'
Vue.component('lx-empty', LxEmpty)

App.mpType = 'app'

import store from './store/index.js'
Vue.prototype.$store = store;

import onfire from 'onfire.js';
Vue.prototype.$fire = new onfire();

import webim from './static/js/webim.js'

import {config} from './common/config.js'
Vue.prototype.config = config;
 
import utils from './common/js/utils'
Vue.prototype.$utils = utils;

import timer from './common/js/timer.js'
Vue.prototype.$timer = timer;

import moment from 'moment';//时间日期格式化
Vue.prototype.$moment=moment;
//管道
import "./filters/filter.js"
//数组递减
Vue.prototype.my_reduce=function(max,arr){
	arr.forEach(item=>{
		max-=item.mon
	})
	return max;
}
Vue.prototype.formatTime = (value,type)=>{
	var dataTime="";
	switch (type) {
	    case 'YMD':
	        dataTime = moment(value).format('YYYY-MM-DD')
	        break;
	    case 'YMDHMS':
	        dataTime = moment(value).format('YYYY-MM-DD HH:mm:ss')
	        break;
	    case 'HMS':
	        dataTime = moment(value).format('HH:mm:ss');
	        break;
	    case 'YM':
	        dataTime = moment(value).format('YYY-MM')
	        break;
	    case 'MD':
	        dataTime = moment(value).format('MM-DD')
	        break;
		case 'HM':
			dataTime = moment(value).format('HH:mm')
			break;
			default:
			dataTime = moment(value).format('YYYY-MM-DD')
			break;
	}
	return dataTime;
}
const app = new Vue({
    ...App
})
app.$mount()

