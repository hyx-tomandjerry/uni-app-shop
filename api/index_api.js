import {ajax} from '../common/https.js'
import utils from '../common/js/utils.js'

/*获得文章列表*/
async function getArticleList(val={}){
	let result=await ajax('MyArticles',val)
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*文章回执列表*/
async function WorkReportsByShopApi(page){
	let result = await ajax('WorkReportsByShop',{type:0,offset:utils.getOffset(page)})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*文章回执详情*/
async function CommentsByShopApi(workreport){
	let result = await ajax('CommentsByShop',{workreport})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*文章回执详情*/
async function WorkReportByShopApi(article,shop){
	let result = await ajax('WorkReportByShop',{article,shop});
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*未回执门店列表*/
async function UnreplyShopsApi(user,id,page){
	let result = await ajax('UnreplyShops',{user,id,offset:utils.getOffset(page)})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*文章详情*/
async function ArticleApi(id){
	let result = await ajax('Article',{id})
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*公司公告*/
async function MessageApi(id){
	let result = await ajax('Message',{id});
	if(utils.getErrorMsg(result.code.toString())) return result.data;
}
/*文章回执*/
async function NewWorkReportByShopApi(val){
	let result = await ajax('NewWorkReportByShop',val)
	if(utils.getErrorMsg(result.code.toString())) return true;
}
export{
	getArticleList,
	WorkReportsByShopApi,
	CommentsByShopApi,
	WorkReportByShopApi,
	UnreplyShopsApi,
	ArticleApi,
	MessageApi,
	NewWorkReportByShopApi
}