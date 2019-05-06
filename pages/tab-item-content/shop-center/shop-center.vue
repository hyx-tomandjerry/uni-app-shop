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
				<view class="list-item"  v-for="(item,index) in repairList" :key="index">
					<view class=" flex justify-between">
						<view class="list-item-title">{{item.catalogName}}</view>
						<view>
							
							<view class='cu-tag radius bg-red' 
							:class="{
							'orange':item.status==1,
							'green':item.status==2,
							'red':item.status==3,
							'black':item.status==4}"
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
						 <text class="cu-tag line-blue" @click="orderDetail(item)" style="margin-right:20px;">查看详情</text>
						 
							<text v-if="item.status==$store.state.repairStatus.finish"
							 class="cu-tag line-blue" @click="createComment(item)">进行评价</text>
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
	import axbCheckBox from '../../../components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.vue'
	export default{
		data(){
			return{
				statusList:[
					{id:0,name:"全部",value:'orders',status:this.$store.state.repairStatus[this.$store.state.repairStatusZn[0]]},
					{id:1,name:"未处理",value:'unfinish',status:this.$store.state.repairStatus[this.$store.state.repairStatusZn[1]]},
					{id:2,name:"处理中",value:'during',status:this.$store.state.repairStatus[this.$store.state.repairStatusZn[2]]},
					{id:3,name:"已完成",value:'finish',status:this.$store.state.repairStatus[this.$store.state.repairStatusZn[4]]}
				],
				TabCur:0,
				scrollLeft:0,
				repairList:[],
				userInfo:{}
				
			}
		},
		components:{
			axbCheckBox
		},
		computed:{
			finish(){
				return this.$store.state.repairStatus['finish']
			}
		},
		methods:{
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
					url:'./create-comment/create-comment?orderID='+item.id
				})
			},
				
			//报修列表
			getRepairList(status){
				uni.request({
					url:this.$store.state.url+'ServiceOrders',
					data:{
						status:status,
						catalog:-1,
						// owner:18,
						// userId:49,
						owner:this.$store.state.userInfo.owner,
						userId:this.$store.state.userInfo.id
					},
					success: (res) => {
						this.repairList=res.data.data
					}
				})
			
			},
			getList(){
				uni.request({
					url:this.$store.state.url+'ServiceOrders',
					data:{
						
						catalog:-1,
						// owner:18,
						// userId:49,
						owner:this.$store.state.userInfo.owner,
						userId:this.$store.state.userInfo.id
					},
					success: (res) => {
						this.repairList=res.data.data
					}
				})
			}
		},
		onLoad(){
			this.getList();
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

</style>

