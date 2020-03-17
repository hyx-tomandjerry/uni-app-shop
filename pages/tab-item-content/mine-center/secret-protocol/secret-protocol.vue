<template>
	<view class="bg-white borderTop protocol-content" >
		<view class="soft-logo flex align-center justify-center flex-d-column">
			<image src="../../../../static/img/logo.png" mode="widthFix"></image>
			<view>门店助手</view>
		</view>
		<view class="soft-intro"></view>
		<view class="soft-bottom text-center">
			<view><text class="color-blue protocol-serve" @tap="operate('serve')">服务协议</text><text class="color-blue" @tap="operate('secret')">隐私政策</text></view>
			<view>Copyright © 2019 橡木林 沪ICP备18018276号-5</view>
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
			operate(type){
				switch(type){
					case 'serve':
					uni.navigateTo({
						url:'../../../login-design/protocol/protocol?type=serve'
					})
					break;
					case 'secret':
					uni.openDocument({
						filePath:'../../../../static/protocol/secret.docx',
					})
					break;
				}
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
	margin-bottom:20upx;
}
.soft-bottom{
	position:absolute;
	bottom:10px;
	left:50%;
	width:100%;
	transform:translateX(-50%)
}
.soft-bottom view:first-child{
	margin-bottom:26upx;
}
.soft-bottom view:first-child text{
	display: inline-block;
	padding: 0 30upx;
}
.protocol-serve{
	border-right:1px solid #898888
}
.protocol-content{
	height:100vh;
}
</style>
