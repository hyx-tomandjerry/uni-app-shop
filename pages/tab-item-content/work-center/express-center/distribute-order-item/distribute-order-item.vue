<template>
	<view class="borderTop">
		<view class="user-info bg-white margin-bottom-normal">
			<view class="user-info-item borderBottom flex justify-start align-center">
				<view class="email-tag text-white font-size-middle" style="background:#000;">发</view>
				<view>
					<view class="font-size-normal color-normal" style="margin-bottom:4px;">么么哒时光门店</view>
					<view  class="font-size-normal color-normal" style="margin-bottom:4px;">
						<text style="margin-right:10px;">佳如</text> <text>17156854569</text>
					</view>
					<view class="color-placeholder" style="font-size:13px;">上海市长宁区金钟路658号东华大学</view>
				</view>
			</view>
			<view class="user-info-item borderBottom flex justify-start align-center">
				<view class="email-tag text-white font-size-middle" style="background:rgba(66,176,237,1)">收</view>
				<view>
					<view class="font-size-normal color-normal" style="margin-bottom:4px;">么么哒时光门店</view>
					<view  class="font-size-normal color-normal" style="margin-bottom:4px;">
						<text style="margin-right:10px;">佳如</text> <text>17156854569</text>
					</view>
					<view class="color-placeholder" style="font-size:13px;">上海市长宁区金钟路658号东华大学</view>
				</view>
			</view>
			<view class="user-info-item borderBottom flex justify-start align-center">
				<view class="email-tag text-white font-size-middle" style="background:rgba(255,160,30,1);">需</view>
				<view>
					<view class="font-size-normal color-normal" style="margin-bottom:4px;">么么哒时光门店</view>
					<view  class="font-size-normal color-normal" style="margin-bottom:4px;">
						<text style="margin-right:10px;">佳如</text> <text>17156854569</text>
					</view>
					<view class="color-placeholder" style="font-size:13px;">上海市长宁区金钟路658号东华大学</view>
				</view>
			</view>
		</view>
		<view class="order-info bg-white">
			<view class="order-info-title font-size-big font-weight-bold color-normal">调拨单详情</view>
			<view class="order-info-item">
				<text style="margin-right:27px;" class="color-placeholder">调拨类型</text>
				<text class="color-normal">到店</text>
			</view>
			<view class="order-info-item">
				<text style="margin-right:27px;" class="color-placeholder">发件对象</text>
				<text class="color-normal">门店</text>
			</view>
			<view class="order-info-item">
				<text style="margin-right:27px;" class="color-placeholder">调拨状态</text>
				<text class="color-normal">已签收</text>
			</view>
			<view class="order-info-item">
				<text style="margin-right:27px;" class="color-placeholder">寄件类型</text>
				<text class="color-normal">同城 即日达</text>
			</view>
			<view class="order-info-item">
				<text style="margin-right:27px;" class="color-placeholder">商品名称</text>
				<text class="color-normal">muzi慕姿定制女包</text>
			</view>
			<view class="order-info-item">
				<text style="margin-right:27px;" class="color-placeholder">商品数量</text>
				<text class="color-normal">2个</text>
			</view>
			<view class="order-info-item">
				<text style="margin-right:27px;" class="color-placeholder">下单人</text>
				<text class="color-normal">欧尼酱</text>
			</view>
			<view class="order-info-item">
				<text style="margin-right:27px;" class="color-placeholder">下单时间</text>
				<text class="color-normal">2019-7-3</text>
			</view>
			<view class="order-info-item">
				<text style="margin-right:27px;" class="color-placeholder">下单备注</text>
				<text class="color-normal">无</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				assignType:''
			}
		},
		methods: {
			
		},
		onLoad(options){
			console.log(options)
			if(options){
				this.assignType=options.type;
			}
		}
	}
</script>

<style lang="less">
	.user-info{
		.user-info-item{
			padding-top:16px;
			padding-left:18px;
			padding-bottom:16px;
			.email-tag{
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
				padding:8px 13px;
				margin-right:21px;
			}
		}
	}
	.order-info{
		padding-left:21px;
		.order-info-title{
			padding-top:17px;
			padding-bottom:12px;

		}
		.order-info-item{
			font-size:15px;
			margin-bottom:10px;
			display: flex;
			justify-content: flex-start;
		}
	}
</style>
