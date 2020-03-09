<template>
	<view class="borderTop">
		<view class="charge-content-title">
			<!-- <view @tap="showModel" data-target="timeModel">
				{{timeObj.year}}年{{timeObj.month}}月
				<text class="font-size-big color-regular" :class="{
					'cuIcon-unfold':down,
					'cuIcon-fold':!down
				}"></text>
			</view> -->
			<view>
				流量:<text class="color-blue font-weight-bold margin-right">100G</text>
				支出: <text class="color-blue font-weight-bold">1000元</text>
			</view>
		</view>
		
		<view class="charge-list-content ">
			<view class="charge-list-item border " @click="checkOrderItem">
				<view class="charge-list-item-top flex justify-between">
					<view>
						<text>张三  </text>
						<text>充值 ：2G</text>
					</view>
					<view>10元</view>
					
				</view>
				<view class="charge-list-item-bottom">
					2020年3月9号
				</view>
			</view>
		</view>
		
		<!-- 年月选择框 -->
		<year-month-model 
		:isShow="modalName=='timeModel'" 
		:value="value" 
		@bindChange="bindChange"
		@hideModel="hideModel"></year-month-model>
	</view>
</template>

<script>
	import {TrafficRechargesApi} from '../../../../../api/shop_api.js'
	import YearMonthModel from '../../../../../components/common/year-month-model.vue'
	export default {
		components:{YearMonthModel},
		data() {
			return {
				timeObj:{
					year:new Date().getFullYear(),
					month:new Date().getMonth()+1
				},
				down:true,
				modalName:'',
				value: [10,0],
				shopID:''
			}
		},
		methods: {
			checkOrderItem(){
				uni.navigateTo({
					url:'../charge-order-item/charge-order-item?id=1'
				})
			},
			bindChange(event){
				if(event){
					this.timeObj=event;
				}
			},
			hideModel(){
				this.down=!this.down;
				this.modalName=null
			},
			showModel(event){
				this.down=!this.down;
				if(event){this.modalName=event.currentTarget.dataset.target}
			},
			//获得充值记录
			async getChargeOrder(){
				let result = await TrafficRechargesApi(this.shopID)
			}
		},
		onLoad(options){
			this.shopID= options.shopID;
			this.getChargeOrder(this.shopID)
		},
		onShow(){
			uni.setNavigationBarTitle({
				title:`${new Date().getFullYear()}年充值记录`
			})
		}
	}
</script>

<style scoped>
.charge-content-title{
	padding:30upx;
	background: #F7F7F7;
}
.charge-list-content{
	padding:0 16upx;
}
.charge-list-item{
	padding:20upx 30upx;
	margin:10upx 10upx 0;
	border:1px solid #EEEEED;
	background:white;
	border-radius:10upx;
	
}
.charge-list-item-top{
	margin-bottom:20upx;
}
</style>
