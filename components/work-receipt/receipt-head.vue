<template>
	<view class="user flex justify-start align-center">
		<image :src="item.headurl?item.headurl:'../../../../../static/img/default.png'" ></image>
		
		<view class="user-info flex-1">
			<view>
				<text class="user-name font-size-normal color-normal">{{item.reporterName}}</text>
			</view>
			<view class="flex justify-between color-regular font-size-litter">
				<view >{{item.rptdate | formatTime('YMD')}}</view>
				<view>
					<text>发送</text>
					<text> {{item.shopName}}</text>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:Object
		}
	}
</script>

<style scoped>
	.user-name{
		font-weight:500;
	}
	.user>image{
		width:80upx;
		height:80upx;
		margin-right:26upx;
		vertical-align: middle;
		border-radius: 50%;
	}
	.user-info{
		margin-top:10upx;
		margin-bottom:16upx;
	}
	.user-info>view:first-child{
		margin-bottom:10upx;
	}
	.user-info>view:nth-child(2)>view:nth-child(2){
		margin-left:40upx;
	}
	.user-info>view:nth-child(2)>view:nth-child(2)>text:nth-child(2){
		margin:0 20upx;
	}
</style>
