<template>
    <view class="position_relative">
		<index-head :company="company"></index-head>
		<view class="index-container">
			<index-swiper></index-swiper>
			<index-operate></index-operate>
		</view>
	
		<!-- <index-sale-article :list="noticeList1" @showMoreInfo="showMoreInfo" @detailContent="detailContent" srcimg="../../../static/img/noticeNo.png"/> -->
		<index-display-article :list="noticeList2" @showMoreInfo="showMoreInfo" @detailContent="detailContent" srcimg="../../../static/img/noticeNo.png"/>
		
    </view>
</template>
<script>
	import indexHead from './childComponent/index-head.vue'
	import indexSwiper from './childComponent/index-swiper.vue'
	import indexOperate from './childComponent/index-operate.vue'
	import indexSaleArticle from './childComponent/index-sale-article.vue'
	import indexDisplayArticle from './childComponent/index-display-article.vue'

	import {mapState,mapMutations} from 'vuex'
	// import {getXapis} from '../../../api/common_api.js'
	import {getArticleList} from '../../../api/index_api.js'
	import {getShopList,RefreshOnlineUser,getTodoList,errorApi,getXapis} from '../../../api/common_api.js'
	export default{
		computed:mapState(['shopCount','shopOnlyObj','authorArr']),
		data(){
			return{
				company:{
					name:'',
					cover:''
				},//公司名称
				noticeList1:[],//销售技巧
				noticeList2:[],//陈述案例
				
			}
		},
		onPullDownRefresh() {
			this.refreshInfo()
		},
		methods:{
			//获得门店数量
			async getShopCount(){
				let result=await getShopList();
				this.setShopCount(result.length);
				if(result.length==1) this.setShopOnlyObj(result[0])
			},
			/*获得代办数量*/
			async getTodoList(){
				let result =await getTodoList();
				if(result>0){
					uni.setTabBarBadge({
					  index: 1,
					  text:result.toString()
					 
					})
				}else{
					uni.hideTabBarRedDot({
						index:1
					})
				}
			},

			/*文章列表*/
			async showArticles(){
				this.noticeList1 =[];
				this.noticeList2=[];
				let result= await getArticleList({offset:0,type:0});
				if(result && result.length>0){
					this.noticeList1 = result.filter(item=>item.type==1);
					this.noticeList2 = result.filter(item=>item.type==2)
				}
				
			},
		   /*点击更多*/
			showMoreInfo(type){
				if(type=='skill'){
					uni.navigateTo({
						url:'../../all-item-content/index-more/index-more?value='+type
					})
					//销售技巧
				}else if(type=='example'){
					uni.navigateTo({
						url:'../../all-item-content/index-more/index-more?value='+type
					})
				}
			},
			/*查看文章详情*/
			detailContent(event){
					let type=event.type==1?'skill':'example'
					uni.navigateTo({
						url:'../../all-item-content/detail-content/detail-content?type='+type+'&id='+event.id
					})
			},
			/*刷新*/
			async refreshInfo(){
				let result = await RefreshOnlineUser();
				if(result && result.status == this.config.userStatus.normal){
                    this.login(result);
					
					//xserver
					if(result.xserver){
						let res = await getXapis();
						this.setXserver(res);	
					}
					//错误码
					let errors = await errorApi()
					this.setErrors(errors);
					
					//试用
					let value = result.modules?result.modules.split(',').map(item => Number(item)):[];
					this.setAuthor(value)
					
					this.company = {
						name:result['ownerName'],
						cover:result['ownerLogoUrl']
					}
					this.getTodoList()
					this.getShopCount()
					this.showArticles();
					
				}else{
					uni.redirectTo({
						url: '../../login-design/login/login'
					});
				}

			},
			
			...mapMutations(['login','setShopCount','setShopOnlyObj','setXserver','setErrors','setAuthor'])

		},
		components:{
			indexHead,
			indexSwiper,
			indexOperate,
			indexDisplayArticle,
			indexSaleArticle
		},
		onShow(){
			this.refreshInfo();
			
		}
	}
</script>
<style scoped>
.index-container{
		padding:180upx 24upx 30upx 36upx;
		background:#fff;
	
	}
</style>



