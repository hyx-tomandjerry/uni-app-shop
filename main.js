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
import {ajax} from './common/http.js'
Vue.prototype.$ajax = ajax;

import utils from './common/utils'
Vue.prototype.$utils = utils;

import moment from 'moment';//时间日期格式化
Vue.prototype.$moment=moment;

//管道
import "./common/filter.js" 
//数组递减
Vue.prototype.my_reduce=function(max,arr){
	arr.forEach(item=>{
		max-=item.mon
	})
	return max;
}
const app = new Vue({
    ...App
})
app.$mount()

