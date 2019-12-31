import {ajax} from '../common/https.js'
import utils from '../common/js/utils.js'
/*收件信息--公司列表*/
async function ExpressAddressesApi(){
	let result = await ajax('ExpressAddresses')
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*收件对象--仓库列表*/
async function WarehousesApi(){
	let result = await ajax('Warehouses');
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*新建快递单*/
async function NewWaybillApi(val){
	let result = await ajax('NewWaybill',val);
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*调拨单详情*/
async function RequisitionApi(id){
	let result  = await ajax('Requisition',{id})
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*调拨单列表*/
async function RequisitionsApi(isApplier,page){
	let result = await ajax('Requisitions',{isApplier,offset:utils.getOffset(page)})
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*新建调拨单*/
async function NewRequisitionApi(val){
	let result = await ajax('NewRequisition',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*取消调拨单*/
async function RemoveRequisitionApi(id){
	let result = await ajax('RemoveRequisition',{id});
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*物流费用*/
async function ShopFreightBillApi(shop,year,month,list){
	let result = await ajax('ShopFreightBill',{shop,year,month,list});
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*快递列表*/
async function ShopWaybillsApi(shop,dir,page){
	let result = await ajax('ShopWaybills',{shop,dir,offset:utils.getOffset(page)})
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*快递详情*/
async function WaybillApi(id){
	let result = await ajax('Waybill',{id});
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*取消快递单*/
async function CancelWaybillApi(id){
	let result = await ajax('CancelWaybill',{id})
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*新建申诉*/
async function NewWaybillComplaintApi(val){
	let result = await ajax('NewWaybillComplaint',val);
	if(utils.getErrorMsg(result.code.toString())) return true;
	
}
/*取消申诉*/
async function CancelComplaintApi(target){
	let result = await ajax('CancelComplaint',{target});
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*投诉列表*/
async function WaybillComplaintsApi(){
	let result = await ajax('WaybillComplaints')
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*投诉详情*/
async function ComplaintApi(id){
	let result = await ajax('Complaint',{id})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*物流详情*/
async function TraceWaybillApi(waybill){
	let result = await ajax('TraceWaybill',{waybill})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
export {
	ExpressAddressesApi,
	WarehousesApi,
	NewWaybillApi,
	RequisitionApi,
	RequisitionsApi,
	NewRequisitionApi,
	RemoveRequisitionApi,
	ShopFreightBillApi,
	ShopWaybillsApi,
	WaybillApi,
	CancelWaybillApi,
	CancelComplaintApi,
	NewWaybillComplaintApi,
	WaybillComplaintsApi,
	ComplaintApi,
	TraceWaybillApi
}