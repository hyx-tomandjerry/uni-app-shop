<template>
	<view class="borderTop">
		<view class="charge-title flex align-center">
			<view class="charge-traffic">流量: <strong class="color-blue">100G</strong></view>
			<view>支出: <strong class="color-blue">1000元</strong></view>
		</view>
		<view class="charge-list-content bg-white">
			<view class="charge-list-item flex justify-between" 
				@tap="checkOrderItem"
				v-for="(item,index) in chargeList" :key="index">
				<view class="flex align-center">
					<view><image src="../../../../../static/img/shop/service/charge-img.png" mode="widthFix"></image></view>
					<view>
						<view class="color-normal margin-bottom-mini"><text class="charge-use">{{item.name}}</text>充值: <strong>{{item.traffic}}</strong></view>
						<view class="color-regular font-size-mini">{{item.time}}</view>
					</view>
				</view>
				<view>
					<strong class="color-blue font-weight-bold font-size-big">¥{{item.count}}</strong>
				</view>
			</view>
		</view>
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
				shopID:'',
				chargeList:[
					{name:'李刚',traffic:'2G',count:'100',time:'2020年2月20日 15:30'},
					{name:'李刚',traffic:'2G',count:'100',time:'2020年2月20日 15:30'},
					{name:'李刚',traffic:'2G',count:'100',time:'2020年2月20日 15:30'},
					{name:'李刚',traffic:'2G',count:'100',time:'2020年2月20日 15:30'},
					{name:'李刚',traffic:'2G',count:'100',time:'2020年2月20日 15:30'},
					{name:'李刚',traffic:'2G',count:'100',time:'2020年2月20日 15:30'},
					
				]
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
.charge-title{
	font-size:15px;
	color:#2A2A2A;
	padding:32upx;
}
.charge-traffic{
	margin-right:60upx;
}
.charge-list-content{
	padding-left:32upx;
}
.charge-list-item{
	padding:32upx 32upx 32upx 0;
	border-bottom:1px solid #EEEEED;
}
.charge-list-item image{
	margin-right:20upx;
	width:24px;
	height:24px !important;
	vertical-align: middle;
}
.charge-use{
	margin-right:30upx;
}
.margin-bottom-mini{
	margin-bottom:10upx;
}
</style>
