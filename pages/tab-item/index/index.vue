<template>
    <view class="position_relative">
		<view class="head-container" >
			<!-- header start  -->
			<!-- 如果type=4&&status=2 加入门店-->
			<view class="flex justify-start">
				<image :src="company.cover?company.cover:'../../../static/img/default.png'" class="companyImg"></image>
				<view style="padding-top:3px;"><text class="company">{{company.name || ''}}</text></view>
			</view>
			<!-- header end -->
		</view>
		<view class="index-container">

			<!-- swiper start -->
			<swiper class="screen-swiper square-dot"  :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in shopList" :key="index">
					<image :src="item.url" mode="aspectFill" style="border-radius:8px;"></image>
				</swiper-item>
			</swiper>
			<!-- swiper end -->
			<!-- tab start -->
			<view class="operateItem">
				<view v-for="(item,index) in options" :key="index" @click="operateItem(item.value)" style="position: relative;">
					<view><image :src="item.image"
						:class="{
							'operateIcon':index==0 || index==3,
							'repairImg':index==1 || index==2
						}"
					></image></view>
					<view>{{item.text}}</view>
				</view>
			</view>
			<!-- tab end -->
		</view>

		<!-- article start -->
		<view class="notice_container">
			<view style="margin-bottom:10px;">
				<view>
					<view class="cu-bar bg-white ">
						<view class="action">
							<text class="card-title">销售公告</text>
						</view>
						<view class="action" @click="showMoreInfo('skill')">
							<text  >更多<text class="cuIcon-right" ></text></text>
						</view>
					</view>

					<template v-if="noticeList1.length">
						<block v-for="(item,index) in noticeList1" :key="index">
							<article-skill :item="item" :index="index"  @checkItemInfo="detailContent"></article-skill>
						</block>
					</template>
					<template v-else>
						<view  style="text-align: center;padding:42px 0 68px;">
							<image src="../../../static/img/noticeNo.png" style="width:125px;height:92px;"></image>
							<view class="font-size-small font-weight-normal " style="color:rgba(137,136,136,1);">暂无数据哦~</view>
						</view>
					</template>
				</view>
			</view>
		</view>
		<view class="bg-white" style="margin-top:13px;padding-right:14px;padding-left:18px;padding-bottom:50px;">
			<view class="cu-bar bg-white " >
				<view class="action">
					<text class="card-title">陈列公告</text>
				</view>
				<view class="action" @click="showMoreInfo('example')">
					<text  >更多<text class="cuIcon-right" ></text></text>
				</view>
			</view>
			<template v-if="noticeList2.length">
				<block v-for="(item,index) in noticeList2 " :key="index">
					<article-example :item="item" :index="index" @checkItemInfo="detailContent"></article-example>
				</block>
			</template>
			<template v-else>
				<view  style="text-align: center;padding:42px 0 68px;">
					<image src="../../../static/img/noticeNo.png" style="width:125px;height:92px;"></image>
					<view class="font-size-small font-weight-normal " style="color:rgba(137,136,136,1);">暂无数据哦~</view>
				</view>
			</template>
		</view>
		<!-- article end -->
    </view>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	import articleSkill from '../../../components/article/article-skill.vue'
	import articleExample from '../../../components/article/article-example.vue'
	import {getArticleList} from '../../../api/index_api.js'
	import {getShopList,RefreshOnlineUser,getTodoList} from '../../../api/common_api.js'
	export default{
		computed:mapState(['shopCount','shopOnlyObj']),
		data(){
			return{
				shopList:[
					{id:0,url:"https://i04piccdn.sogoucdn.com/41da27612e577928"},
					{id:1,url:"https://i02piccdn.sogoucdn.com/f19f1950d032e713"},
					{id:2,url:"https://i03piccdn.sogoucdn.com/e5ab27310ecbc5f8"},
					{id:3,url:"https://i02piccdn.sogoucdn.com/c382398752cc1021"},
					{id:4,url:"https://i02piccdn.sogoucdn.com/3e8b9bc55bc0a4d1"},
					{id:5,url:"https://i01piccdn.sogoucdn.com/50a1d0976d455b0d"}
				],
				company:{
					name:'',
					cover:''
				},//公司名称
				noticeList1:[],//销售技巧
				noticeList2:[],//陈述案例
				options:[
					{image:'../../../static/img/index/index-repair.png',text:'门店报修',value:'repair'},
					{image:'../../../static/img/index/index-express.png',text:'快递包裹',value:'express'},
					{image:'../../../static/img/index/index-shop.png',text:'我的门店',value:'shop'},
					{image:'../../../static/img/index/index-statistics.png',text:'销售绩效',value:'statistics'},
					]
			}
		},

		methods:{
			//获得门店数量
			async getShopCount(){
				let result=await getShopList();
				this.setShopCount(result.length);
				if(result.length==1) this.setShopOnlyObj(result[0])
			},
			/*记一笔*/
			recordMoney(){
				uni.navigateTo({
					url:"../../tab-item-content/work-center/statistics-center/record-money/record-money"
				})
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
				let result= await getArticleList({offset:0,type:0});
				if(result.length>0){
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
				let result =await RefreshOnlineUser();
				this.login(result);
				if(result.status == this.config.userStatus.normal){
					this.company = {
						name:result['ownerName'],
						cover:result['ownerLogoUrl']
					}
					this.getTodoList()
					this.showArticles();
					this.getShopCount()
				}else{
					uni.redirectTo({
						url:"../../login-design/login/login"
					})
				}

			},
			/*nav操作*/
			operateItem(type){
				this.getShopCount()
				if(this.shopCount==1){
					//只有一个门店
					switch(type){
						case 'repair':
							uni.navigateTo({
								url:'../../tab-item-content/shop-center/shop-center?type=all&id='+this.shopOnlyObj.id
							})
						break;
						case 'express':
							uni.navigateTo({
								url:'../../tab-item-content/work-center/express-center/express-index/express-index?id='+this.shopOnlyObj.id
							})
						break;
						case 'shop':
						uni.navigateTo({
							url:"../../tab-item-content/shop-center/clerk-list/clerk-list?shopID="+this.shopOnlyObj.id
						})
						break;
						case 'statistics':
						uni.navigateTo({
							url:"../../tab-item-content/work-center/statistics-center/shop-statistics-item/shop-statistics-item?id="+this.shopOnlyObj.id
						})
						break;
					}
				}else{
					//有多条门店
					switch(type){
						case 'repair':
							uni.navigateTo({
								url:'../../tab-item-content/shop-center/shop-list/shop-list?type='+type
							})
						break;
						case 'express':
							uni.navigateTo({
								url:'../../tab-item-content/shop-center/shop-list/shop-list?type='+type
							})
						break;
						case 'shop':
						uni.navigateTo({
							url:'../../tab-item-content/shop-center/shop-list/shop-list?type=shop'
						})
						break;
						case 'statistics':
						uni.navigateTo({
							url:'../../tab-item-content/shop-center/shop-list/shop-list?type=statistics'
						})
						break;
					}	
				}
			},
			
			...mapMutations(['login','setShopCount','setShopOnlyObj'])

		},
		components:{
			articleSkill,
			articleExample
		},
		onShow(){
			this.refreshInfo();
		}

	}
</script>
<style scoped>
@import url("./index.css");

</style>



