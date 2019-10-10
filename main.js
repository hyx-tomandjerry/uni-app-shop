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
//保修单状态
Vue.filter('repairStatus', function (value) {
    if (!value) return ''
    return store.state.repairStatusZn[value]
})
//保修单状态字段
Vue.filter('repairTypePipe', (value) => {
    if (!value) return ''
    return store.state.repairTypeZn[value]
})
//快递状态
Vue.filter('expressStatusPipe', (value) => {
    if (!value) return ''
    return store.state.expressStatus[value]
})
//门店状态
Vue.filter('shopStatus', (value) => {
    if (!value) return ''
    return store.state.shopStatus[value];
})

/*经营类别*/
Vue.filter('operateZn', (value) => {
    if (!value) return ''
    return store.state.runCatalogZn[value]
})

/*快递调拨类型*/
Vue.filter('distributeStatusPipe', (value) => {
    if (!value) return ''
    return store.state.distributeStatus[value]
})

//时间日期格式化
Vue.filter('formatTime', function (value, type) {
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
			default:
			dataTime = moment(value).format('YYYY-MM-DD')
			break;
    }
    return dataTime;
}),

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
/*
    Vue.filter('shopStatusZn', (value) => {
        if (!value) return ''
        return store.state.shopStatusZn[value];
    })
    Vue.filter('shopTypeFilter', (value) => {
        if (!value) return ''
        return store.state.shopType[value];
    })

    //成员状态
    Vue.filter('userStatusPipe', (value) => {
        if (!value) return ''
        return store.state.userStatus[value]
    })
    //外部成员状态

    Vue.filter('outerStatusZnPipe', (value) => {
        if (!value) return ''
        return store.state.outerStatusZn[value]
    })

    Vue.filter('genderPipe', (value) => {
     return store.state.gender[value]
    })


   Vue.prototype.format = function (value, type) {
        var dataTime="";
        switch (type) {
            case 'YMD':
                dataTime = moment(value).format('YYYY-MM-DD')
                break;
            case 'YMDHMS':
                dataTime = moment(value).format('YYYY-MM-DD hh:mm:ss')
                break;
            case 'HMS':
                dataTime = moment(value).format('hh:mm:ss');
                break;
            case 'YM':
                dataTime = moment(value).format('YYY-MM')
                break;
            case 'MD':
                dataTime = moment(value).format('MM-DD')
                break;
        }
        return dataTime;
    }

*/
