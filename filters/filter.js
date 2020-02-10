import Vue from 'vue'
import {config} from '../common/config.js'
import moment from 'moment';//时间日期格式化
//保修单状态
Vue.filter('repairStatusZnPipe', function (value) {
    if (!value) return ''
    return config.repairStatusZn[value]
})
//保修单状态字段
Vue.filter('repairTypePipe', (value) => {
    if (!value) return ''
    return config.repairTypeZn[value]
})
//审批状态
Vue.filter('approvalStatusPipe',  (value)=> {
    if (!value) return ''
    return config.approvalStatusZn[value]
})
//快递状态
Vue.filter('expressStatusZnPipe', (value) => {
    if (!value) return ''
    return config.expressStatusZn[value]
})
//投诉状态
Vue.filter('complaintStatusZnPipe',(value)=>{
	if(!value) return;
	return config.complaintStatusZn[value]
})
//门店状态
Vue.filter('shopStatusZnPipe', (value) => {
    if (!value) return ''
    return config.shopStatusZn[value];
})
//店员状态
Vue.filter('userStatusZnPipe',value=>{
	if (!value) return ''
	return config.userStatusZn[value];
})

//任务状态
Vue.filter('taskStatusZnPipe', (value) => {
    if (!value) return ''
    return config.taskStatusZn[value];
})
/*快递调拨类型*/
Vue.filter('distributeStatusZnPipe', (value) => {
    if (!value) return ''
    return config.distributeStatusZn[value]
})
// 快递收件对象
Vue.filter('expressItemZnPipe',(value)=>{
	if(!value) return;
	 return config.expressItemZn[value]
})
//审批类型
Vue.filter('approvalModeZnPipe',(value)=>{
	if (!value) return ''
	return config.approvalModeZn[value]
})
//请假类型
Vue.filter('absenceTypeZnPipe',(value)=>{
	if (!value) return ''
	return config.absenceTypeZn[value]
})
/*文章分类*/
Vue.filter('articleTypeZnPipe',value=>{
	if(!value) return '';
	return config.articleTypeZn[value]
})
// 设备状态
Vue.filter('serviceStatusZnPipe',value=>{
	if(!value) return '';
	return config.serviceStatusZn[value]
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
		case 'HM':
			dataTime = moment(value).format('HH:mm')
			break;
			default:
			dataTime = moment(value).format('YYYY-MM-DD')
			break;
    }
    return dataTime;
})
//千分符
Vue.filter('numStyle',(value)=>{
	if(!value) {return 0}
	return (value.toString().indexOf ('.') !== -1) ? value.toLocaleString() : value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
})

Vue.filter('wanStyle',value=>{
	if(!value) {return 0}
	if(value<10000) {
		return Number(value).toFixed(2)
	}else{
		return Number(value/10000).toFixed(2)+'万'
	}
	
})

//保留两位小数
Vue.filter('decimalPipe',(value)=>{
	if(!value) return;
	return Number(value).toFixed(2)
})
//不保留小数
Vue.filter('intStyle',value=>{
	if(!value) return;
	return Number(value).toFixed(0)
})

// 流量
Vue.filter('trafficStyle',val=>{
	if(!val) return 0
	return Number(val/1024).toFixed(2)
})
