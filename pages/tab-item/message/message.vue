<template>
	<view style="position:relative">
		<view class="header-content">
			<view class="flex justify-start">
				<image src="../../../static/img/message/group.png" 
				style="width:50px;
				height:50px;
				vertical-align: middle;
				margin-right:29rpx;"
				></image>
				<view class="list-title">群组列表</view>
			</view>
			<view class="flex justify-start">
				<image src="../../../static/img/message/telephone.png" 
				style="width:50px;
				height:50px;
				vertical-align: middle;
				margin-right:29rpx;"
				></image>
				<view class="list-title">通讯录</view>
			</view>
		</view>
		
		<view class="purple">
			111
		</view>
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		<view class="box" style="position:fixed;bottom:0px;width:100%;">
			<view class="cu-bar tabbar bg-white">
				<view class="action" style="padding-top:5px;" @click="showIndexClick()">
					<view class="cuIcon-cu-image">
						<image src="../../../static/img/tab_img/shouye.png"></image>
						
					</view>
					<view class="text-gray">首页</view>
				</view>
				<view class="action" style="padding-top:5px;">
					<view class="cuIcon-cu-image" >
						<image src="../../../static/img/tab_img/xiaoxi_color.png" ></image>
						<view class="cu-tag badge">99</view>
					</view>
					<view class="text-blue">消息</view>
				</view>
				<view class="action" style="padding-top:5px;" @click="showMineClick()">
					<view class="cuIcon-cu-image">
						
						<image src="../../../static/img/tab_img/mine.png"></image>
					</view>
					<view class="text-gray">我的</view>
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
			showIndexClick(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
			showMineClick(){
				uni.navigateTo({
					url:'../mine/mine'
				})
			}
		}
	}
</script>

<style lang="less">
	
	.header-content{
		padding-right:26rpx;
		padding-left:32rpx;
		padding-top:10px;
		margin-bottom:28rpx;
		background: #fff;
	}
	.list-title{
		width:70%;
		line-height:50px;
		height:50px;
		font-size:30rpx;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(42,42,42,1);
		border-bottom:1px solid #EEEEED;
		margin-bottom:17px;
	}
	.talk-content{
		background:#fff;
		padding-right:26rpx;
		padding-left:32rpx;
		padding-top:10px;
	}
</style>
