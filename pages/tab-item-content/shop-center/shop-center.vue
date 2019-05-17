<template>
	<view>
		<view class="operateItem" >
			<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''"
						v-for="(item,index) in statusList" :key="index" @tap="tabSelect(item)" :data-id="index">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		</view>
		<view class="order_content position_relative" >
			<scroll-view scroll-y="true" class="page show" >
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
							<image src="../../../static/icon/shop.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
							<text style="margin-right:5px;">门店名称:</text> {{item.shopname}}
						</view>


						<view class="list-content-item">
							<image src="../../../static/icon/time.png" class="img20 marginRight10" style="vertical-align:middle;" ></image>
							<text style="margin-right:5px;">报修时间:</text> {{item.createdate| formatTime('YMDHMS')}}
						</view>

						<view class="list-content-item">
							<image src="../../../static/icon/client.png" class="img18 marginRight10" style="vertical-align:middle;" ></image>
							<text style="margin-right:5px;">报修人:</text> {{item.creatorName}}  <text class="text-blue" style="margin:0 5px;">|</text> {{item.creatorMobile}}
						</view>
						<view class="list-content-item"
						 style="border-top:1px solid #EEEEED;padding-top:10px;text-align:right;margin-bottom:7px;" >
						 <!-- <text class="cu-tag line-blue" @click="orderDetail(item)" style="margin-right:20px;">查看详情</text> -->
						 
							<text v-if="item.status==repairStatus.treating"
							 class="cu-tag line-blue" @click.stop.prevent="createComment(item)">进行评价</text>
							 <text v-if="item.status==repairStatus.refuse"
							  class="cu-tag line-red" @click.stop.prevent="delOrder(item)">删除订单</text>
							   <text v-if="item.status==repairStatus.finish"
							   class="cu-tag line-blue" @click.stop.prevent="checkComment(item)">查看评价</text>
						</view>
					</view>
				</view>
				<image src="../../../static/icon/add.png"
						style="position:fixed;right:12px;bottom:45px;width:68px;height:68px;z-index:100;" @click.stop="createRepair()"></image>
			</scroll-view>

		</view>


	</view>
</template>

<script>
	
	export default{
		data(){
			return{
				repairStatus:this.$store.state.repairStatus,
				statusList:[
					{id:0,
					name:"未处理",
					value:'orders',
					status:this.$store.state.repairStatus.untreated},
					{id:1,name:"处理中",value:'unfinish',status:this.$store.state.repairStatus.treating},
					{id:2,name:"无效",value:'during',status:this.$store.state.repairStatus.refuse},
					{id:3,name:"已完成",value:'refuse',status:this.$store.state.repairStatus.finish},
					
				],
				TabCur:0,
				scrollLeft:0,
				repairList:[],
				userInfo:{},
				type:'',//用于区分来自门店报修还是我的报修
				
			}
		},
		components:{
			
		},
		computed:{
			
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
				
				this.getRepairList(e.status)
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
				this.$ajax('ServiceOrders',{
					catalog:-1,
					status:status,
					stored:this.type=='all'?1:0,
					},res=>{
					this.repairList=res
				})
				
			
			},
			
		},
		onLoad(options){
			if(options){
				this.type=options.type
			}
			this.getRepairList(this.$store.state.repairStatus.untreated);
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

