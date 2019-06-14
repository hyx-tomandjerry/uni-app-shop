<template>
	<view>
		<view class="tab-content bg-white text-center">
			<view class="tab-item" style="background:rgba(239,249,251,1);" @click="showItem('log')">
				<image src="../../../static/img/work/tab/work.png" 
				style="width:43px;height:43px;"></image>
				<view class="font-weight-normal font-size-big">
					工作日志
				</view>
			</view>
			<view class="tab-item" style="background:rgba(252,237,236,1);" @click="showItem('express')">
				<image src="../../../static/img/work/tab/express.png" 
				style="width:43px;height:43px;"></image>
				<view class="font-weight-normal font-size-big">
					快递包裹
				</view>
			</view>
			<view class="tab-item" style="background:rgba(227,243,237,1);"  @click="showItem('repair')">
				<image src="../../../static/img/work/tab/repair.png" 
				style="width:43px;height:43px;"></image>
				<view class="font-weight-normal font-size-big">
					我的报修
				</view>
			</view>
		</view>
		
		
		<!-- <view class="box" style="position:fixed;bottom:0px;width:100%;">
			<view class="cu-bar tabbar bg-white">
				<view class="action" style="padding-top:5px;" @click="showIndexClick()">
					<view class="cuIcon-cu-image">
						<image src="../../../static/img/tab_img/shouye.png"></image>
						
					</view>
					<view class="text-gray">首页</view>
				</view>
				<view class="action" style="padding-top:5px;">
					<view class="cuIcon-cu-image" @click="showMessageClick()">
						<image src="../../../static/img/tab_img/xiaoxi.png" ></image>
						<view class="cu-tag badge">99</view>
					</view>
					<view class="text-gray">消息</view>
				</view>
					<view class="action" style="padding-top:5px;">
					<view class="cuIcon-cu-image" >
						<image src="../../../static/img/tab_img/gongzuo_color.png" ></image>
					</view>
					<view class="text-blue">工作</view>
				</view>
				<view class="action" style="padding-top:5px;" @click="showMineClick()">
					<view class="cuIcon-cu-image">
						
						<image src="../../../static/img/tab_img/mine.png"></image>
					</view>
					<view class="text-gray">我的</view>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			showItem(type){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						if(res.data.status!=1){
							uni.showToast({
								title:'您没有该权限',
								icon:'none'
							})
						}else{
							switch(type){
								case 'log':
								uni.navigateTo({
									url:'../../tab-item-content/work-center/work-log/work-log'
								});
								break;
								case 'express':
								uni.navigateTo({
									url:'../../tab-item-content/work-center/express-center/express-index/express-index'
								});
								break;
								case 'repair':
								uni.navigateTo({
									url:'../../tab-item-content/shop-center/shop-center?type=alone'
								})
							}
						}
					}
				})
				
			},
			showMineClick(){
				uni.navigateTo({
					url:'../mine/mine'
				})
			},
			showMessageClick(){
				uni.navigateTo({
					url:'../message/message'
				})
			},
			showIndexClick(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
		height:100%;
	}
	.tab-content{
		padding-top:16px;
		padding-right:12px;
		padding-left:14px;
	}
	.tab-item{
		min-height:95px;
		text-align:center;
		border-radius:8px;
		padding-top:13px;
		padding-bottom:11px;
		margin-bottom:11px;
	}
</style>
