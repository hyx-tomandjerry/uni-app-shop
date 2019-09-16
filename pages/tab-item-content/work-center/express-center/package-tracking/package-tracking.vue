<template>
	<view class="borderTop">
		<image src="../../../../../static/img/work/express/other/banner.png" style="width:100%;height:114px;"></image>
		<view class="logistics-info margin-bottom-normal">
			<view class="user-info bg-white">
				<view class="sender-container flex justify-between align-center">
					<view class="flex justify-start align-center">
						<image src="../../../../../static/img/work/express/other/sender.png" style="width:42px;height:42px;vertical-align: middle;margin-right:12px;"></image>
						<view>
							<view class="font-size-normal color-normal">快递员姓名</view>
							<view class="color-placeholder font-size-small">联系方式:18838280588</view>
						</view>
					</view>
					<view>
						<image src="../../../../../static/img/work/express/other/call.png" style="width:26px;height:26px;"></image>
						<view class="font-size-small color-placeholder">联系TA</view>
					</view>
				</view>
			</view>
			<view  class="flex justify-between align-center service-info">
				<view class="font-size-small color-normal">京东快递 71301609174859</view>
				<view	class="service-tag color-blue">服务评价</view>
			</view>
		</view>
		<view class="tracking-container bg-white ">
			<view style="min-height:94px;">
				<view class="flex justify-start align-center">
					<view style="width:15%;">
						<view class="font-size-normal color-normal">07-3</view>
						<view class="font-size-litter color-placeholder">13:36</view>
					</view>

					<view style="width:10%;">
						<image  src="../../../../../static/img/work/express/other/down.png" style="width:25px;height:25px;"></image>
					</view>
					<view>
						<view class="font-size-normal color-normal">已签收</view>
					</view>
				</view>
				<view class="flex justify-start ">
					<view style="width:40%;" class="position_relative">
						<view style="width:1px;height:66px;position:absolute;left:66px;top:-7px;background:#CACACA;"></view>
					</view>
					<view>已签收，签收人是拍照签收。感谢您使用顺 丰快递，期待再次为你服务</view>
				</view>
			</view>
			<view style="min-height:94px;">
				<view class="flex justify-start align-center">
					<view style="width:15%;">
						<view class="font-size-normal color-normal">07-2</view>
						<view class="font-size-litter color-placeholder">13:36</view>
					</view>

					<view style="width:10%;">
						<image  src="../../../../../static/img/work/express/other/sending.png" style="width:25px;height:25px;"></image>
					</view>
					<view>
						<view class="font-size-normal color-normal">派送中</view>
					</view>
				</view>
				<view class="flex justify-start ">
					<view style="width:40%;" class="position_relative">
						<view style="width:1px;height:66px;position:absolute;left:66px;top:-7px;background:#CACACA;"></view>
					</view>
					<view>快件交给张三，正在派送中（联系电话 13123455432）</view>
				</view>
			</view>
			<view style="min-height:94px;">
				<view class="flex justify-start align-center">
					<view style="width:15%;">
						<view class="font-size-normal color-normal">07-1</view>
						<view class="font-size-litter color-placeholder">13:36</view>
					</view>

					<view style="width:10%;">
						<image  src="../../../../../static/img/work/express/other/car.png" style="width:25px;height:25px;"></image>
					</view>
					<view>
						<view class="font-size-normal color-normal">运输中</view>
					</view>
				</view>
				<view class="flex justify-start ">
					<view style="width:40%;" class="position_relative">
						<view style="width:1px;height:66px;position:absolute;left:66px;top:-7px;background:#CACACA;"></view>
					</view>
					<view>快件交给张三，正在派送中（联系电话 13123455432）</view>
				</view>
			</view>
			<view style="min-height:94px;">
				<view class="flex justify-start align-center">
					<view style="width:15%;">
						<view class="font-size-normal color-normal">06-30</view>
						<view class="font-size-litter color-placeholder">13:36</view>
					</view>

					<view style="width:10%;">
						<image  src="../../../../../static/img/work/express/other/car.png" style="width:25px;height:25px;"></image>
					</view>
					<view>
						<view class="font-size-normal color-normal">已揽件</view>
					</view>
				</view>
				<view class="flex justify-start ">
					<view style="width:40%;" class="position_relative">
						<view style="width:1px;height:66px;position:absolute;left:66px;top:-7px;background:#CACACA;"></view>
					</view>
					<view>快件交给张三，正在派送中（联系电话 13123455432）</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			/*查看物流*/
			checkTrack(waybill){
				this.$ajax('TraceWaybill',{
					waybill:waybill
				},res=>{
					console.log(res);
				})
			}
		},
		onLoad(options){
			if(options.id){
				this.checkTrack(options.id)
			}
		}
	}
</script>

<style lang="less">
	.logistics-info{
		padding:11px 12px 20px 14px;
		.user-info{
			padding:16px 16px 7px 14px;
		}
		.service-info{
			padding:9px 14px;background:rgba(250,250,250,1);
			.service-tag{
				padding:1px 8px ;border-radius:10px;
				border:1px solid rgba(66,176,237,1);
			}
		}
	}

	.tracking-container{
		padding:26px;
	}
</style>
