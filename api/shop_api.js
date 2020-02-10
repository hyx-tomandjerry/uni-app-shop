import {ajax} from '../common/https.js'
import utils from '../common/js/utils.js'
/*获得门店详情*/
 async function ChainShopApi(id){
	let result = await ajax('ChainShop',{id})
	if(utils.getErrorMsg(result.code.toString())) return result.data
 }
 /*获得门店人员列表*/
 async function ShopSalesmenApi(shop){
	 let result = await ajax('ShopSalesmen',{shop})
	 if(utils.getErrorMsg(result.code.toString())) return result.data
 }
 /*获得区域人员*/
 async function UsersApi(team,page){
	 let result =await ajax('Users',{
		 team,
		 status:-1,
		 offset:utils.getOffset(page)
	 })
	if(utils.getErrorMsg(result.code.toString())) return result.data
 }
 /*获得设备列表*/
 async function ShopDevicesApi(shop){
	 let result =await ajax('ShopDevices',{shop})
	 if(utils.getErrorMsg(result.code.toString())) return result.data
 }
 
 /*修改门店面积*/
 async function SetShopAreaApi(id,area){
	 let result =  await ajax('SetShopArea',{id,area})
	 if(utils.getErrorMsg(result.code.toString())) return true
 }
 /*修改门店地址*/
 async function SetShopAddressApi(id,province,city,district,address,arr){
	let result = await ajax('SetShopAddress',{
		 id,
		 province,
		 city,
		 district,
		 address,
		 coordinate:arr.join(',')
	 })
	 if(utils.getErrorMsg(result.code.toString())) return true;
 }
 /*修改门店编号*/
 async function SetShopSeqApi(id,seq){
	 let result = await ajax('SetShopSeq',{id,seq});
	  if(utils.getErrorMsg(result.code.toString())) return true
 }
 /*获得报修列表*/
 async function ShopServiceOrdersApi(status,shop,page){
	let result= await ajax('ShopServiceOrders',{status,shop,offset:utils.getOffset(page)})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
 }
 /*新建报修*/
 async function NewServiceOrderApi(val){
	 let result = await ajax('NewServiceOrder',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
 }
 /*查看报修子类别详情*/
 async function ServiceCatalogApi(id){
	 let result = await ajax('ServiceCatalog',{id})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
 }
 /*报修详情*/
 async function ServiceOrderApi(id){
	let result =  await ajax('ServiceOrder',{id,step:1})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
 }
 /*删除保修单*/
 async function RemoveServiceOrderApi(id){
	 let result = await ajax('RemoveServiceOrder',{id})
	 if(utils.getErrorMsg(result.code.toString())) return true;
 }
 /*重新提交报修*/
 async function SetServiceOrderApi(val){
	let result = await ajax('SetServiceOrder',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
 }
 /*设为店长*/
 async function SetShopManagerApi(shop,user){
	 let result = await ajax('SetShopManager',{shop,user})
	 if(utils.getErrorMsg(result.code.toString())) return true;
 }
 /*同意或拒绝店员加入*/
 async function AcceptSalesmanApi(shop,user,reject){
	 let result = await ajax('AcceptSalesman',{shop,user,reject})
	 if(utils.getErrorMsg(result.code.toString())) return true;
 }
 /*绑定设备*/
 async function BindCameraApi(uuid,shop){
	 let result = await ajax('BindCamera',{uuid,shop})
	 if(utils.getErrorMsg(result.code.toString())) return true;
 }
 /*设备详情*/
 export async function CameraApi(uuid){
	 let result =await ajax('Camera',{uuid})
	 if(utils.getErrorMsg(result.code.toString())) return result.data;
 }
 /*激活cpe路由器*/
 export async function ActivateRouterApi(seq,shop){
	 let result = await ajax('ActivateRouter',{seq,shop})
	 if(utils.getErrorMsg(result.code.toString())) return true
 }
 /*查看路由器cpe详情*/
 export async function RouterApi(seq){
	 let result = await ajax('Router',{seq})
	  if(utils.getErrorMsg(result.code.toString())) return result.data;
 }
 /*解绑cpe*/
 export async function PauseRouterApi(id,skp){
	 let result = await ajax('PauseRouter',{id,skp});
	 if(utils.getErrorMsg(result.code.toString())) return true;
 }
 /*解绑摄像头*/
 export async function UninstallCameraApi(id){
	 let result = await ajax('UnbindCamera',{id,status:1})
	 if(utils.getErrorMsg(result.code.toString())) return true
	 
 }
 /*单卡流量接口*/
 export async function  SimTrafficApi(sim){
	 let result = await ajax('SimTraffic',{sim,today:1})
	 if(utils.getErrorMsg(result.code.toString())) return result.data;
 }
 // 获得url
 export async function CertifyUrlApi(){
	 let result = await ajax('CertifyUrl');
	 if(utils.getErrorMsg(result.code.toString())) return result.data
 }
 // 更换路由器
 export async function ReplaceRouterApi(seq, old){
	 let result = await ajax('ReplaceRouter',{seq,old});
	 if(utils.getErrorMsg(result.code.toString())) return true
 }
 export {
	 ChainShopApi,
	 ShopSalesmenApi,
	 UsersApi,
	 ShopDevicesApi,
	 SetShopAreaApi,
	 SetShopAddressApi,
	 ShopServiceOrdersApi,
	 NewServiceOrderApi,
	 ServiceCatalogApi,
	 ServiceOrderApi,
	 RemoveServiceOrderApi,
	 SetServiceOrderApi,
	 SetShopManagerApi,
	 AcceptSalesmanApi,
	 BindCameraApi,
	 SetShopSeqApi
 }