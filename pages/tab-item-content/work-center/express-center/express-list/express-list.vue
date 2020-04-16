<template>
	<view>
		<view class="border-top" >
			<view class="flex justify-between align-center bg-white" style="padding:20upx 40upx 10upx 30upx;">
				<view>{{timeObj.year}}年</view>
				<view class="flex align-center">物流费用总计: <strong class="color-blue">{{totalCountInfo.amount || 0}}元</strong> </view>
			</view>
		</view>
		<view class=" list-content">
			<view class="flex justify-between align-center borderBottom bg-white">
				<view @tap="showModel" data-target="timeModel">
					{{timeObj.year}}年{{timeObj.month}}月
					<text class="font-size-big color-regular" :class="{
						'cuIcon-unfold':down,
						'cuIcon-fold':!down
					}"></text>
				</view>
				<view class="flex align-center">物流费用: <strong class="color-blue">{{countInfo.amount | numStyle}}元</strong></view>
			</view>
		</view>
		
		<!-- tab start -->
		<common-tab-nav 
			:isShowBorder="false"
			:tabList="tabList" 
			:TabCur="TabCur" 
			@tabSelect="tabSelect"></common-tab-nav>
		<!-- tab end -->
		<!-- 快递列表 start -->
		<template v-if="expressList.length">
			<view class="list-container">
				<block v-for="(item,index) in expressList" :key="index">
					<express-list-item 
					:TabCur='TabCur'
					:item="item" :index="index"
					 @checkTrack="checkTrack"
					 @checkItemInfo="checkItemInfo"></express-list-item>
				</block>
				<uni-load-more :contentText="content"
							   :showIcon="true"
							   v-if="expressList.length>=5"
							   :status="loading"
							   color="rgb(39, 134, 245)"></uni-load-more>
			</view>
		</template>
		
		<template v-else>
			
			<LxEmpty srcImg="../../../../../static/img/noticeNo.png"></LxEmpty>
		</template>
		
		<!-- 快递列表 end -->
		<!-- 年月选择框 -->
		<year-month-model 
		:isShow="modalName=='timeModel'" 
		:value="value" 
		@bindChange="bindChange"
		@hideModel="hideModel"></year-month-model>
	</view>
</template>
<script>
	import yearMonthModel from '../../../../../components/common/year-month-model.vue'
	import commonTabNav from '../../../../../components/common/common-tab-nav.vue'
	import uniLoadMore from '../../../../../components/common/uni-load-more.vue'
	import expressListItem from '../../../../../components/express/express-list-item.vue'
	import LxEmpty from '../../../../../lx_components/lx-empty.vue'
	
	import {mapState} from 'vuex'
	import {ShopFreightBillApi,ShopWaybillsApi} from '../../../../../api/express_api.js'
	import {ChainShopApi} from '../../../../../api/shop_api.js'
	export default{
		computed:mapState(['shopCount','shopOnlyObj']),
		components:{yearMonthModel,commonTabNav,uniLoadMore,LxEmpty,expressListItem},
		data(){
			return{
				down:true,
				modalName:'',
				value: [10,0],
				timeObj:{
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1
				},
				tabList:[
					{name:'发件',num:0,id:this.config.expressGive.send},
					{name:'收件',num:0,id:this.config.expressGive.receive},
				],
				TabCur:1,
				page:1,
				expressList:[],
				content:{
					contentdown: "下拉加载更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more',
				shopItem:{},
				countInfo:{},
				shopID:'',
				totalCountInfo:{},//一年的物流费用
			}
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				uni.navigateTo({
					url:"../express-search/express-search"
				})
			}
		},
		onPullDownRefresh(){
			setTimeout(()=>{
				this.page=1;
				this.getCountInfo(true)
				this.getCountInfo(false)
				this.getExpressList(this.TabCur)
				uni.stopPullDownRefresh()
			},900)
		},
		onLoad(options){
			if(options.id){
				if(this.shopCount==1){
					this.shopItem=this.shopOnlyObj;
					this.shopID=this.shopOnlyObj.id;
					uni.setNavigationBarTitle({
						title:this.shopItem.name
					})
					this.getCountInfo(true)
					this.getCountInfo(false)
					this.getExpressList(this.TabCur)
				}else{
					this.shopID=options.id;
					this.getShopItem(options.id);
				}
				
			}
		},
		methods:{
			//查看物流信息
			checkTrack(item){
				
			},
			//获得费用数据
			async getCountInfo(flag){
				if(flag){
					//传月份
					this.totalCountInfo= await ShopFreightBillApi(this.shopID,this.timeObj.year,this.timeObj.month,1)
				}else{
					//不传月份
					this.countInfo = await ShopFreightBillApi(this.shopID,this.timeObj.year,'',0);
					this.tabList[0].num=this.countInfo.sents;
					this.tabList[1].num=this.countInfo.recvs;
				}
				
				
			},
			// 获得快递列表
			async getExpressList(status){
				this.expressList = await ShopWaybillsApi(this.shopID,status,this.page)

			},
			async getShopItem(id){
				this.shopItem = await ChainShopApi(id);
				uni.setNavigationBarTitle({
					title:this.shopItem.name
				})
				this.getCountInfo(true)
				this.getCountInfo(false)
				this.getExpressList(this.TabCur)

			},
			checkItemInfo(event){
				uni.navigateTo({
					url:"../express-item/express-item?id="+event.id
				})
				
			},
			tabSelect(item){
				this.TabCur=item.id;
				this.page=1;
				this.getExpressList(this.TabCur)
			},
			bindChange(event){
				if(event){
					this.timeObj=event;
					this.getCountInfo(true);
					this.getExpressList(this.TabCur)
				}
			},
			hideModel(){
				this.down=!this.down;
				this.modalName=null
			},
			showModel(event){
				this.down=!this.down;
				if(event){this.modalName=event.currentTarget.dataset.target}
			}
		},
		onReachBottom(){
			
		},
		onShow(){
			this.getCountInfo(true)
			this.getCountInfo(false)
			this.getExpressList(this.TabCur)
		},
		onPullDownRefresh(){
			//下拉刷新
			this.page=1;
			this.getExpressList(this.TabCur)
			this.getCountInfo(true)
			this.getCountInfo(false)
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},800)
		
		}
	}
</script>
<style scoped>
	page{
		background:rgba(247,247,247,1);
	}

	.list-content>view:first-child{
		padding:20upx 40upx 20upx 30upx;
	}
	.list-content>view:first-child>view:first-child{
		border:1upx solid #EEEEED;
		padding:10upx;
		border-radius: 10upx;
	}
	.list-container{
		margin-top:11px;
		padding-right: 12px;
		padding-left: 13px;
		background-color: rgba(247,247,247,1);
	}
	
	
	
	
	
	.travel-tag{
		width:63px;
		height:23px;
		line-height: 23px;
		border-radius:12px;
		border:1px solid rgba(66,176,237,1);
		font-size:12px;
		color:#42B0ED;	
	}
	
	
	
	
</style>