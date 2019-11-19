import Vue from 'vue'
import config from './config.js'
import moment from 'moment';//时间日期格式化
//保修单状态
Vue.filter('repairStatus', function (value) {
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
    // if (!value) return ''
    return config.approvalStatusZn[value]
})
//快递状态
Vue.filter('expressStatusPipe', (value) => {
    if (!value) return ''
    return config.expressStatus[value]
})
//门店状态
Vue.filter('shopStatus', (value) => {
    if (!value) return ''
    return config.shopStatus[value];
})
//店员状态
Vue.filter('userStatusZnPipe',value=>{
	if (!value) return ''
	return config.userStatusZn[value];
})
//任务状态
Vue.filter('taskStatusPipe', (value) => {
    if (!value) return ''
    return config.taskStatus[value];
})
//任务状态
Vue.filter('taskStatusZnPipe', (value) => {
    if (!value) return ''
    return config.taskStatusZn[value];
})
/*快递调拨类型*/
Vue.filter('distributeStatusPipe', (value) => {
    if (!value) return ''
    return config.distributeStatus[value]
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
})
//千分符
Vue.filter('numStyle',(value)=>{
	if(!value) {return 0}
	return (value.toString().indexOf ('.') !== -1) ? value.toLocaleString() : value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
})

Vue.filter('wanStyle',value=>{
	if(!value) {return 0}
	return value/10000;
})
