/*工作申请api*/
import {ajax} from '../common/https.js'
import utils from '../common/js/utils.js'
/*请假申请*/
async function NewRoutineAppApi(val){
	let result = await ajax('NewRoutineApp',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*报销申请*/
async function ApplyExpenseApi(val){
	let result = await ajax('ApplyExpense',val);
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*通用申请*/
async function NewCommonFormApi(val){
	let result = await ajax('NewCommonForm',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*报销申请详情*/
async function ExpenseApi(id){
	let result = await ajax('Expense',{id,step:1})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*通用申请详情*/
async function CommonFormApi(id){
	let result = await ajax('CommonForm',{id,step:1})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*请假申请详情*/
async function RoutineAppApi(id){
	let result = await ajax('RoutineApp',{id,step:1})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*我的申请列表*/
async function WorkflowInstancesApi(applier,page){
	let result = await ajax('WorkflowInstances',{type:-1,status:0,applier,offset:utils.getOffset(page)})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*撤销请假申请*/
async function CancelRoutineAppApi(id){
	let result = await ajax('CancelRoutineApp',{id})
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*撤销报销申请*/
async function CancelExpenseApi(id){
	let result = await ajax('CancelExpense',{id})
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*撤销通用申请*/
async function CancelCommonFormApi(id){
	let result = await ajax('CancelCommonForm',{id})
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*拒绝申请*/
async function ApproveWorkflowApi(form,type,reject,comment,event){
	let result = await ajax('ApproveWorkflow',{form,type,reject,comment,event})
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*审批列表*/
async function ApprovalRecordsApi(page){
	let result = await ajax('ApprovalRecords',{offset:utils.getOffset(page)})
	if(utils.getErrorMsg(result.code.toString().toString())) return result.data
}
export {
	NewRoutineAppApi,
	ApplyExpenseApi,
	NewCommonFormApi,
	ExpenseApi,
	CommonFormApi,
	RoutineAppApi,
	WorkflowInstancesApi,
	CancelRoutineAppApi,
	CancelExpenseApi,
	CancelCommonFormApi,
	ApproveWorkflowApi,
	ApprovalRecordsApi
}