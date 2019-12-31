import {ajax} from '../common/https.js'
import utils from '../common/js/utils.js'
import store from '../store/index.js'
/*获得门店列表*/
async function  getShopList(){
	let result= await ajax('MyShops',{address:''})
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*刷新数据*/
async function RefreshOnlineUser(){
	let result = await ajax('RefreshOnlineUser');
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*获得代办通知的数量*/
async function getTodoList(){
	let result =await ajax('MyEventNumbers');
	if(utils.getErrorMsg(result.code.toString())) return result.data
}

/*从公司删除人*/
async function RemoveSalesman(val){
	let result = await ajax('RemoveSalesman',val)
	if(result.code.toString()==0) return result.data;
} 

/*获得公司信息*/
async function getCompanyInfoApi(eid){
	let result = await ajax('Customer',{eid});
	if(utils.getErrorMsg(result.code.toString())){
		if(result.data.id==0){
			utils.showToast('公司不存在')
			return false
		}
		if(result.data.type==1){
			utils.showToast('该公司是装修公司，不可加入')
			return false
		}
		return result.data
	}
}

/*获得公司所有门店*/
async function ChainShopsApi(val){
	let result =await ajax('ChainShops',val)
	if(utils.getErrorMsg(result.code.toString())) return result.data
}

/*店员加入门店*/
async function ApplyOrInvite2JoinApi(val){
	let result =await ajax('ApplyOrInvite2Join',{owner:0,...val})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}

/*获得品牌列表*/
async function MyBrandsApi(owner){
	let result=[]
	if(owner){
		result  = await ajax('MyBrands',{owner})
	}else{
		result  = await ajax('MyBrands')
	}
	
	if(utils.getErrorMsg(result.code.toString())) return result.data
}


/*获得公司区域*/
async function DepartmentsApi(val={}){
	let obj = {type:4,parent:-1,...val}
	let result = await ajax('Departments',obj)
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*获得公司区域人员*/
async function UsersApi(team){
	let result = await ajax('Users',{team,status:-1});
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*获得省市区*/
async function DistrictsApi(parent){
	let result = await ajax('Districts',{parent});
	if(utils.getErrorMsg(result.code.toString())) return result.data
}

/*获得token*/
async function UploadTokenApi(){
	let result = await ajax('UploadToken');
	if(utils.getErrorMsg(result.code.toString())) return result.data
}

/*删除图片*/
async function RemoveFilesApi(files){
	let result =await ajax('RemoveFiles',{files});
	if(utils.getErrorMsg(result.code.toString())) return true;
}
/*获得报修列表*/
async function ServiceCatalogsApi(){
	let result =await  ajax('ServiceCatalogs')
	if(utils.getErrorMsg(result.code.toString())) return result.data
}

/*获得审批模板*/
async function WorkflowsApi(type){
	let result = await ajax('Workflows',{type})
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*获得费用列表*/
async function ConstantsApi(){
	let result = await ajax('Constants',{objects:1,type:24,parent:-1})
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
/*获得图片详情*/
async function FileApi(id){
	let result = await ajax('File',{id})
	if(utils.getErrorMsg(result.code.toString())) return result.data
}
export {
	getShopList,
	RefreshOnlineUser,
	getTodoList,
	RemoveSalesman,
	getCompanyInfoApi,
	ChainShopsApi,
	ApplyOrInvite2JoinApi,
	MyBrandsApi,
	DepartmentsApi,
	DistrictsApi,
	UploadTokenApi,
	RemoveFilesApi,
	ServiceCatalogsApi,
	WorkflowsApi,
	ConstantsApi,
	FileApi,
	UsersApi
}