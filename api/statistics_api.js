import {ajax} from '../common/https.js'
import utils from '../common/js/utils.js'

/*编辑记一笔*/
async function ChangeSalesmanAmountApi(val){
	
	let result = await ajax('ChangeSalesmanAmount',val);
	 if(utils.getErrorMsg(result.code.toString())) return true;
}
/*记一笔*/
async function RecordMySalesAmountApi(val){
	let result = await ajax('RecordMySalesAmount',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*年绩效分解--ShopYearlySalesPlan*/
async function ShopYearlySalesPlanApi(shop,year=new Date().getFullYear()){
	let result = await ajax('ShopYearlySalesPlan',{	shop,year,withActual: 1});
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}

/*修改月绩效*/
async function BreakDownYearlySalesPlanApi(shop,amount,months){
	let result = await ajax('BreakDownYearlySalesPlan',{year:new Date().getFullYear(),shop,amount,months});
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*月分解-天数*/
async function ShopMonthlySalesPlanApi(shop,date){
	let result = await ajax('ShopMonthlySalesPlan',{shop,date});
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}

/*分解方式*/
async function BreakDownMonthlySalesPlanApi(val){
	let result = await ajax('BreakDownMonthlySalesPlan',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*修改日绩效*/
async function ChangeShopDailySalesPlanApi(val){
	let result = await ajax('ChangeShopDailySalesPlan',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*待审批列表*/
async function ShopUnconfirmedDaysApi(shop){
	let result = await ajax('ShopUnconfirmedDays',{shop})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}

/*绩效审核--获得店员绩效*/
async function SalesmenSalesAmountApi(shop,timeObj){
	let result = await ajax('SalesmenSalesAmount',
	{shop,year:timeObj.year?timeObj.year:'',month:timeObj.month?timeObj.month:'',date:timeObj.day?timeObj.day:''});
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*确定绩效*/
async function ConfirmShopSalesAmountApi(shop,date){
	let result = await ajax('ConfirmShopSalesAmount',{shop,date});
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*绩效榜单*/
async function ShopRankingApi(val){
	let result = await ajax('ShopRanking',val);
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*查看单人单月的绩效*/
async function SalesmanDailyAmountApi(shop,salesman,timeObj){
	let result = await ajax('SalesmanDailyAmount',{shop,salesman, year:timeObj.year,month:timeObj.month})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}

/*退库*/
async function DeductSalesAmountApi(shop,date,amount,salesman){
	let result = await ajax('DeductSalesAmount',{shop,date,amount,salesman})
	if(utils.getErrorMsg(result.code.toString())) return true;
}
export {
	ChangeSalesmanAmountApi,
	RecordMySalesAmountApi,
	ShopYearlySalesPlanApi,
	BreakDownYearlySalesPlanApi,
	ShopMonthlySalesPlanApi,
	BreakDownMonthlySalesPlanApi,
	ChangeShopDailySalesPlanApi,
	ShopUnconfirmedDaysApi,
	SalesmenSalesAmountApi,
	ConfirmShopSalesAmountApi,
	ShopRankingApi,
	SalesmanDailyAmountApi,
	DeductSalesAmountApi
}