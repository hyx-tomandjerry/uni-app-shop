<template>
	<view>
		<view class="tab-content bg-white flex justify-between">
			<view @click="showItem('log')">
				<image src="../../../static/img/work/work.png" style="width:50px;height:50px;"></image>
				<view>工作汇报</view>
			</view>
			<view @click="showItem('express')">
				<image src="../../../static/img/index-tab/tab4.png" style="width:50px;height:50px;"></image>
				<view>快递包裹</view>
			</view>
			<view @click="showItem('repair')">
				<image src="../../../static/img/index-tab/tab2.png" style="width:50px;height:50px;"></image>
				<view>我的报修</view>
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
	}
	.tab-content{
		padding:20px 26px;
	}
</style>
