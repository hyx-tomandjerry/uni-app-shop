<template>
    <view class="position_relative">
		<view class="head-container" >
			<!-- header start  -->
			<!-- 如果type=4&&status=2 加入门店-->
			<view v-if="userInfo && (userInfo.type==shoperObj.type)">

				<view v-if="userInfo.status==userStatus.applying">
					<text class=" text-orange ">申请加入中</text>
				</view>
				<view class="flex justify-start"  v-else>
					<image :src="company.cover?company.cover:'../../../static/img/default.png'" class="companyImg"></image>
					<view style="padding-top:3px;"><text class="company">{{company.name || ''}}</text></view>
				</view>
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
				<view v-for="(item,index) in options" :key="index" @click="showOperateItem(item.value)" style="position: relative;">
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
						<view class="action">
							<text  @click="showMoreInfo('skill')">更多<text class="cuIcon-right" ></text></text>
						</view>
					</view>

					<template v-if="noticeList1.length">
						<block v-for="(item,index) in noticeList1" :key="index">
							<index-sale :item="item" :index="index" @detailContent="detailContent"></index-sale>
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
				<view class="action">
					<text  @click="showMoreInfo('example')">更多<text class="cuIcon-right" ></text></text>
				</view>
			</view>
			<template v-if="noticeList2.length">
				<block v-for="(item,index) in noticeList2 " :key="index">
					<index-example :item="item" :index="index" @detailContent="detailContent"></index-example>
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
	import simpleModel from '../../../components/simple-model.vue';
	import showModel from '../../../components/show-model.vue'
	import {mapState,mapMutations} from 'vuex'
	import indexSale from '../../../components/index/index-sale.vue'
	import indexExample from '../../../components/index/index-example.vue'
	export default{
		computed:mapState(['userInfo','userStatus','shoperObj','report']),
		data(){
			return{
				shopList:[
					{id:0,url:"https://i01piccdn.sogoucdn.com/73d5a112b17c6806"},
					{id:1,url:"https://i01piccdn.sogoucdn.com/4a0fbf1cf00509d2"},
					{id:2,url:"https://i03piccdn.sogoucdn.com/c3a5ff7cbecc25f3"},
					{id:3,url:"https://i02piccdn.sogoucdn.com/eb3f0b525a56d51c"},
					{id:4,url:"https://i01piccdn.sogoucdn.com/1c6f37b86d604fb1"},
					{id:5,url:"https://i02piccdn.sogoucdn.com/1a49f133f0b2edb5"}
				],
				company:{
					name:'',
					cover:''
				},//公司名称
				noticeList1:[],//销售技巧
				noticeList2:[],//陈述案例
				options:[
					// {image:'../../../static/img/index/index-message.png',text:'通知公告',isCheck:true,value:'message'},
					{image:'../../../static/img/index/index-repair.png',text:'门店报修',value:'repair'},
					{image:'../../../static/img/index/index-express.png',text:'快递包裹',value:'express'},
					{image:'../../../static/img/index/index-shop.png',text:'我的门店',value:'shop'},
					{image:'../../../static/img/index/index-statistics.png',text:'销售绩效',value:'statistics'},
					],
				statusBarHeight:''
			}
		},

		methods:{
			/*记一笔*/
			recordMoney(){
				uni.navigateTo({
					url:"../../tab-item-content/work-center/statistics-center/record-money/record-money"
				})
			},

			/*获得代办数量*/
			getTodoList(){
				this.$ajax('MyEventNumbers',{},res=>{
					
					if(res>0){
						uni.setTabBarBadge({
						  index: 1,
						  text:res.toString()
						 
						})
					}
				})
			},

			/*文章列表*/
			showArticles(){
				this.$ajax('MyArticles',{
					offset:0,
					type:0
				},res=>{
					if(res){
						let array1=[],array2=[]
						res.forEach(item=>{
							if(item.type==1){
								array1.push(item)
							}else if(item.type==2){
								array2.push(item)
							}
						})
						array1.forEach(item=>{
							if(!item.coverurl){
								item.coverurl="../../../static/img/default.png"
							}
						})
						array2.forEach(item=>{
							if(!item.coverurl){
								item.coverurl="../../../static/img/default.png"
							}
						})
						this.noticeList1=Array.from(new Set(array1));
						this.noticeList2=Array.from(new Set(array2));
					}
				})
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
				console.log(event)
					uni.navigateTo({
						url:'../../all-item-content/detail-content/detail-content?type='+event.type+'&id='+event.item.id
					})
			},
			/*刷新*/
			refreshInfo(){
				this.$ajax('RefreshOnlineUser',{},res=>{
					if(res.status==this.userStatus.normal){
						this.login(res);
						this.company={
							name:res['ownerName'],
							cover:res['ownerLogoUrl']
						}
						this.getTodoList()
						this.showArticles();

					}
				})
			},
			/*nav操作*/
			showOperateItem(event){
				switch(event){
					case 'repair':
						//门店报修
						uni.navigateTo({

							url:'../../tab-item-content/shop-center/shop-center?type=all'
						})
						break;
					case 'express':
						//我的门店
						uni.navigateTo({
							url:'../../tab-item-content/work-center/express-center/express-index/express-index'
						})
						break;
					case 'shop':
						//工作日志
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

			},

			...mapMutations(['login'])

		},
		components:{
			simpleModel,
			showModel,
			indexSale,
			indexExample
		},

		onLoad(){
			
			this.getTodoList()
			this.showArticles();

		},
		onShow(){
			this.refreshInfo();
		}

	}
</script>
<style scoped>
@import url("./index.css");

</style>



