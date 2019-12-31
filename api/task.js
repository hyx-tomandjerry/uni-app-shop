/*任务管理接口*/
import {ajax} from '../common/https.js'
import utils from '../common/js/utils.js'
/*任务列表*/
async function ReceivedTasksApi(page){
	let result = await ajax('ReceivedTasks',{status:0,offset:utils.getOffset(page)})
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*任务详情--任务动态*/
async function TaskEventFlowsApi(task){
	let result = await ajax('TaskEventFlows',{task})
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*任务详情*/
async function ProcessTaskApi(id){
	let result = await ajax('ProcessTask',{id});
	if(utils.getErrorMsg(result.code.toString())) return result.data
}

/*拒绝任务*/
async function RefuseTaskApi(task,reason){
	let result = await ajax('RefuseTask',{task,reason})
	if(utils.getErrorMsg(result.code.toString())) return true
}
/*接受任务*/
async function AcceptTaskApi(task){
	let result = await ajax('AcceptTask',{task})
	if(utils.getErrorMsg(result.code.toString())) return true
}
/*申请验收*/
async function FinishTaskApi(val){
	let result = await ajax('FinishTask',val)
	if(utils.getErrorMsg(result.code.toString())) return true
}
export {
	ReceivedTasksApi,
	TaskEventFlowsApi,
	ProcessTaskApi,
	RefuseTaskApi,
	AcceptTaskApi,
	FinishTaskApi
}