<template>
	<view>
		<view class="operateItem" >
			<view class="bg-white nav" style="width:100%;">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.id==TabCur?'text-red cur':''"
						v-for="(item,index) in statusList" :key="index" @tap="tabSelect(item)" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="TabCur==1">
			<view v-if="repairList.length>0">
				<view class="order_content position_relative" >
					<view class="list-item"  v-for="(item,index) in repairList" :key="index"  @click="orderDetail(item)">
							<view class=" flex justify-between">
								<view class="list-item-title">{{item.catalogName}}</view>
								<view>
									
									<view class='cu-tag radius bg-red' 
									:class="{
									'bg-gradual-orange':item.status==repairStatus.untreated,
									'green':item.status==repairStatus.treating,
									'red':item.status==repairStatus.refuse,
									'finishBlue':item.status==repairStatus.finish}"
									>{{item.status|repairStatus}}</view>
								</view>
							</view>
							<view class="list-content">
								<view class="list-content-item">
									<image src="../../../static/icon/shop.png" class="shopImg " style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">门店名称:</text> {{item.shopname}}
								</view>
				
				
								<view class="list-content-item">
									<image src="../../../static/icon/time.png" class="shopImg" style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">预约时间:</text> {{item.appointdate| formatTime('YMD')}}
								</view>
				
								<view class="list-content-item">
									<image src="../../../static/icon/client.png" class="shopImg " style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">报修人:</text> {{item.creatorName}}  <text class="text-blue" style="margin:0 5px;">|</text> {{item.creatorMobile}}
								</view>
								<view class="list-content-item"
								 style="border-top:1px solid #EEEEED;padding-top:10px;text-align:right;margin-bottom:7px;" >
								 <!-- <text class="cu-tag line-blue" @click="orderDetail(item)" style="margin-right:20px;">查看详情</text> -->
								 
									<text v-if="item.status==repairStatus.finish && !item.comment"
									 class="cu-tag line-blue" @click.stop.prevent="createComment(item)">进行评价</text>
									<!-- <text v-if="item.status==repairStatus.refuse"
									  class="cu-tag line-red" @click.stop.prevent="delOrder(item)">删除订单</text> -->
									   <text v-if="item.status==repairStatus.finish"
									   class="cu-tag line-blue" @click.stop.prevent="checkComment(item)">查看评价</text>
								</view>
							</view>
						</view>
						
				</view>
			</view>
			<view v-else>
				<lx-empty></lx-empty>
			</view>
		</view>
		<view v-if="TabCur==2">
			<view v-if="repairList.length>0">
				<view class="order_content position_relative" >
					<view class="list-item"  v-for="(item,index) in repairList" :key="index"  @click="orderDetail(item)">
							<view class=" flex justify-between">
								<view class="list-item-title">{{item.catalogName}}</view>
								<view>
									
									<view class='cu-tag radius bg-red' 
									:class="{
									'bg-gradual-orange':item.status==repairStatus.untreated,
									'green':item.status==repairStatus.treating,
									'red':item.status==repairStatus.refuse,
									'finishBlue':item.status==repairStatus.finish}"
									>{{item.status|repairStatus}}</view>
								</view>
							</view>
							<view class="list-content">
								<view class="list-content-item">
									<image src="../../../static/icon/shop.png" class="shopImg " style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">门店名称:</text> {{item.shopname}}
								</view>
				
				
								<view class="list-content-item">
									<image src="../../../static/icon/time.png" class="shopImg" style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">预约时间:</text> {{item.appointdate| formatTime('YMD')}}
								</view>
				
								<view class="list-content-item">
									<image src="../../../static/icon/client.png" class="shopImg " style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">报修人:</text> {{item.creatorName}}  <text class="text-blue" style="margin:0 5px;">|</text> {{item.creatorMobile}}
								</view>
								<view class="list-content-item"
								 style="border-top:1px solid #EEEEED;padding-top:10px;text-align:right;margin-bottom:7px;" >
								 <!-- <text class="cu-tag line-blue" @click="orderDetail(item)" style="margin-right:20px;">查看详情</text> -->
								 
									
								</view>
							</view>
						</view>
						
				</view>
			</view>
			<view v-else>
				<lx-empty></lx-empty>
			</view>
		</view>

<view v-if="TabCur==3">
			<view v-if="repairList.length>0">
				<view class="order_content position_relative" >
					<view class="list-item"  v-for="(item,index) in repairList" :key="index"  @click="orderDetail(item)">
							<view class=" flex justify-between">
								<view class="list-item-title">{{item.catalogName}}</view>
								<view>
									
									<view class='cu-tag radius bg-red' 
									:class="{
									'bg-gradual-orange':item.status==repairStatus.untreated,
									'green':item.status==repairStatus.treating,
									'red':item.status==repairStatus.refuse,
									'finishBlue':item.status==repairStatus.finish}"
									>{{item.status|repairStatus}}</view>
								</view>
							</view>
							<view class="list-content">
								<view class="list-content-item">
									<image src="../../../static/icon/shop.png" class="shopImg " style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">门店名称:</text> {{item.shopname}}
								</view>
				
				
								<view class="list-content-item">
									<image src="../../../static/icon/time.png" class="shopImg" style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">预约时间:</text> {{item.appointdate| formatTime('YMD')}}
								</view>
				
								<view class="list-content-item">
									<image src="../../../static/icon/client.png" class="shopImg " style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">报修人:</text> {{item.creatorName}}  <text class="text-blue" style="margin:0 5px;">|</text> {{item.creatorMobile}}
								</view>
								<view class="list-content-item"
								 style="border-top:1px solid #EEEEED;padding-top:10px;text-align:right;margin-bottom:7px;" >
								 <!-- <text class="cu-tag line-blue" @click="orderDetail(item)" style="margin-right:20px;">查看详情</text> -->
								 
									
									<text v-if="item.status==repairStatus.refuse"
									  class="cu-tag line-red" @click.stop.prevent="delOrder(item)">删除订单</text>
									  
								</view>
							</view>
						</view>
						
				</view>
			</view>
			<view v-else>
				<lx-empty></lx-empty>
			</view>
		</view>
		<view v-if="TabCur==4">
			<view v-if="repairList.length>0">
				<view class="order_content position_relative" >
					<view class="list-item"  v-for="(item,index) in repairList" :key="index"  @click="orderDetail(item)">
							<view class=" flex justify-between">
								<view class="list-item-title">{{item.catalogName}}</view>
								<view>
									
									<view class='cu-tag radius bg-red' 
									:class="{
									'bg-gradual-orange':item.status==repairStatus.untreated,
									'green':item.status==repairStatus.treating,
									'red':item.status==repairStatus.refuse,
									'finishBlue':item.status==repairStatus.finish}"
									>{{item.status|repairStatus}}</view>
								</view>
							</view>
							<view class="list-content">
								<view class="list-content-item">
									<image src="../../../static/icon/shop.png" class="shopImg " style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">门店名称:</text> {{item.shopname}}
								</view>
				
				
								<view class="list-content-item">
									<image src="../../../static/icon/time.png" class="shopImg" style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">预约时间:</text> {{item.appointdate| formatTime('YMD')}}
								</view>
				
								<view class="list-content-item">
									<image src="../../../static/icon/client.png" class="shopImg " style="vertical-align:middle;" ></image>
									<text style="margin-right:5px;">报修人:</text> {{item.creatorName}}  <text class="text-blue" style="margin:0 5px;">|</text> {{item.creatorMobile}}
								</view>
								<view class="list-content-item"
								 style="border-top:1px solid #EEEEED;padding-top:10px;text-align:right;margin-bottom:7px;" >
								 <!-- <text class="cu-tag line-blue" @click="orderDetail(item)" style="margin-right:20px;">查看详情</text> -->
								 
									<text v-if="item.status==repairStatus.finish && !item.comment"
									 class="cu-tag line-blue" @click.stop.prevent="createComment(item)">进行评价</text>
									<!-- <text v-if="item.status==repairStatus.refuse"
									  class="cu-tag line-red" @click.stop.prevent="delOrder(item)">删除订单</text> -->
									   <text v-if="item.status==repairStatus.finish"
									   class="cu-tag line-blue" @click.stop.prevent="checkComment(item)">查看评价</text>
								</view>
							</view>
						</view>
						
				</view>
				
			</view>
			<view v-else>
				<lx-empty></lx-empty>
			</view>
		</view>
		<uni-load-more :contentText="content" :showIcon="true" :status="loading"></uni-load-more>
		<image src="../../../static/icon/add.png"
				style="position:fixed;right:12px;bottom:36px;width:68px;height:68px;z-index:100;" @click.stop="createRepair()"></image>
	</view>
</template>

<script>
	import LxEmpty from '../../../lx_components/lx-empty.vue';
	import uniLoadMore from '../../../components/uni-load-more.vue'
	export default{
		data(){
			return{
				repairStatus:this.$store.state.repairStatus,
				statusList:[
					{id:1,
					name:"未处理",
					value:'orders',
					status:this.$store.state.repairStatus.untreated},
					{id:2,name:"处理中",value:'unfinish',status:this.$store.state.repairStatus.treating},
					{id:3,name:"无效",value:'during',status:this.$store.state.repairStatus.refuse},
					{id:4,name:"已完成",value:'refuse',status:this.$store.state.repairStatus.finish},
					
				],
				TabCur:1,
				scrollLeft:0,
				repairList:[],
				userInfo:{},
				type:'',//用于区分来自门店报修还是我的报修
				isLoading:false,
				isFinish:false,
				page:1,
				content:{
					contentdown: "",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				loading:'more'
				
			}
		},
		onPullDownRefresh(){
			uni.stopPullDownRefresh();
			this.getRepairList(this.TabCur)
		},
		onReachBottom(){
			
			this.page++;
			this.loading='loading';
			setTimeout(()=>{
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						if(this.type=='all'){
								this.$ajax('ServiceOrders',{
								catalog:-1,
								status:this.TabCur,
								stored:1,
								offset:this.$utils.getOffset(this.page),
								creator:res.data.id
								},res=>{
									if(res==''){
										setTimeout(()=>{
											this.loading='noMore'
										},600)
									}else{
										res.forEach(item=>{
											this.repairList.concat(item)
										})
									}
							})
							
						}else if(this.type=='alone'){
							this.$ajax('ServiceOrdersBySalesman',{
								catalog:-1,
								status:this.TabCur,
								offset:this.$utils.getOffset(this.page),
								creator:res.data.id
								},res=>{
								if(res==''){
									this.isLoading=false;
									setTimeout(()=>{
											this.isFinish=true;
									},200)
									
									
								}else{
									res.forEach(item=>{
										this.repairList.concat(item)
									})
								}
							})
						}
					}
				})
				
				
				
			},1000)
		},
		components:{
			LxEmpty,
			uniLoadMore
		},
		computed:{
			
		},
		onShow(){
			this.getRepairList(this.TabCur);
		},
		methods:{
			//查看评价
			checkComment(item){
				uni.navigateTo({
					url:'./create-comment/create-comment?orderID='+item.id+'&type=check'
				})
			},
			delOrder(item){
				
			},
			radioChangeType(e){
				console.log(e)
			},
			// 查看报修记录详情
			orderDetail(item){
				uni.navigateTo({
					url:'./repair-order-item/repair-order-item?id='+item.id
				})
			},
			//新增报修
			createRepair(){
				
				uni.navigateTo({
					url:'./create-order/create-order'
				})
			},
			tabSelect(e) {
				
				this.TabCur = e.id;
				console.log(this.TabCur)
				this.getRepairList(this.TabCur)
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			//进行评价
			createComment(item){
				console.log(item)
				uni.navigateTo({
					url:'./create-comment/create-comment?orderID='+item.id+'&type=create'
				})
			},
				
			//报修列表
			getRepairList(status){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						if(this.type=='all'){
							
							this.$ajax('ServiceOrders',{
								catalog:-1,
								status:status,
								stored:1,
								offset:this.$utils.getOffset(this.page),
								creator:res.data.id
								},res=>{
								this.repairList=res
							})
						}else if(this.type=='alone'){
							this.$ajax('ServiceOrdersBySalesman',{
								catalog:-1,
								status:status,
								creator:res.data.id,
								offset:this.$utils.getOffset(this.page)
								},res=>{
								this.repairList=res
							})
						}
					}
				})
				
				
				
			
			},
			
		},
		onLoad(options){
			if(options){
				this.type=options.type
			}
			console.log(this.TabCur)
			// this.getRepairList(this.TabCur);
		}
	}
</script>

<style lang="less">
	.red{
		background:red;
	}
	.blue{
		background:blue;
	}
	.green{
		background:green;
	}
	.black{
		background:black;
	}
	.shopImg{
		width:18px;
		height:18px;
		vertical-align: middle;
		margin-right:10px;
	}
			.operateItem{
				text-align:center;
				display: flex;
				justify-content: space-around;
				border-bottom:1px solid rgba(233,233,233,1)
			}

			.page {
				height: 87Vh;
				width: 100vw;
			}
			.page.show {
				overflow: hidden;
			}
			.list-item{
				padding:18px 16px 17px 20px;
				background: #fff;
				margin-bottom:13px;
				.list-item-title{
					font-size:16px;
					font-weight:400;
					color:rgba(42,42,42,1);
					margin-bottom:10px;

				}
			}
			.marginRight10{
				margin-right:10px;
			}
			.lineHeight18{
				line-height:18px;

			}
			.lineHeight20{
				line-height: 20px;

			}
			.list-content-item{
				font-size:14px;
				font-weight:400;
				color:rgba(137,136,136,1);
				margin-bottom:12px;
			}
			.finishBlue{
				background:#42B0ED;
			}
</style>

