<template>
	<view class="borderTop">
		<view class="order-count bg-white flex  margin-bottom text-center">
			<view class="font-weight-bold font-size-bigger">120.00</view>
			<text class="color-regular">交易成功</text>
		</view>
		<view class="order-count-list">
			<common-flex leftContent="流量" rightContent="30G"/>
			<common-flex leftContent="购买者" rightContent="张三"/>
			<common-flex leftContent="订单号" rightContent="OAKS12345"/>
			<common-flex leftContent="生成时间" rightContent="2020-02-20 15:30"/>
		</view>
	</view>
</template>

<script>
	import CommonFlex from '../../../../../components/common/common-flex.vue'
	export default {
		components:{CommonFlex},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.order-count{
	padding:60upx 0;
	
	flex-direction: column;
}
.order-count h3{
	margin-bottom:20upx;
}
</style>
