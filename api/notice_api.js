import {ajax} from '../common/https.js'
/*获得消息接口*/
async function getNoticeList(val){
	let result =await ajax('EventFlows',val)
	if(result.code.toString()==0) return result.data
	
}

/*获得公司通知*/
async function getMsgList(val){
	let result =await ajax('Messages',val)
	if(result.code.toString()==0) return result.data
}
export {
	getNoticeList,
	getMsgList
}