<template>
	<view class="bg-white borderTop protocol-content" >
		<view class="soft-logo flex align-center justify-center flex-d-column">
			<image src="../../../../static/img/mine/protocol-logo.png" mode="widthFix"></image>
			<view class="font-size-big font-weight-bold color-normal soft-intro">门店助手</view>
		</view>
		<!-- <view class="soft-intro"></view>
		<view class="soft-bottom text-center">
			<view><text class="color-blue protocol-serve" @tap="operate('serve')">服务协议</text><text class="color-blue" @tap="operate('secret')">隐私政策</text></view>
			
		</view> -->
		<view class="protocol-list">
			<view class="protocol-list-item" @tap="operate('serve')">
				<view>服务协议</view>
				<view class="cuIcon-right"></view>
			</view>
			<view class="protocol-list-item" @tap="operate('secret')">
				<view>隐私政策</view>
				<view class="cuIcon-right"></view>
			</view>
		</view>
		
		<view class="protocol-bottom">Copyright © 2019 橡木林 沪ICP备18018276号-5</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			operate(type){
				uni.navigateTo({
					url:'../../../login-design/protocol/protocol?type='+type
				})
			}
		}
	}
</script>

<style scoped>
.soft-logo{
	padding:60upx 0;
	font-size:15px;
}
.soft-logo image{
	width:50px !important;
	height:50px !important;
	flex-shrink: 0;
}
.soft-intro{
	margin:40upx 0 48upx;
}
.protocol-list-item{
	height:52px;
	line-height:52px;
	padding: 0 18upx 0 28upx;
	display: flex;
	justify-content: space-between;
	align-content: center;
	border-bottom:1px solid #EEEEED;
	font-size:15px;
	color:#2A2A2A;
}
.protocol-content{
	height:100vh;
	overflow: hidden;
}
.protocol-bottom{
	position:fixed;
	bottom:50upx;
	left:50%;
	white-space: nowrap;
	transform: translateX(-50%);
}
</style>
