<template>
	<view>
		<view class="tab-container">
			<view class="tab-title">
				工作
			</view>
		</view>
		<view class="tab-list">
			<view class="tab-first flex justify-start" style="margin-bottom:20px;">
				<view class="text-center" style="flex:1" @click="showItem('log')">
					<image src="../../../static/img/work/tab/gongzuohuizhi.png" 
						class="img-tag"
					></image>
					<view>工作回执</view>
				</view>
				<view class="text-center" style="flex:1" @click="showItem('express')">
					<image src="../../../static/img/work/tab/kuaidibaoguo.png" class="img-tag"></image>
					<view>快递包裹</view>
				</view>
				<view class="text-center" style="flex:1" @click="showItem('repair')">
					<image src="../../../static/img/work/tab/wodebaoxiu.png" class="img-tag"></image>
					<view>我的报修</view>
				</view>
				<!-- <view class="text-center" style="flex:1" @click="showItem('count')">
					<image src="../../../static/img/work/tab/xiaoshoujixiao.png"  class="img-tag"></image>
					<view>销售绩效</view>
				</view> -->
				<view class="text-center" style="flex:1" @click="showItem('work')">
					<image src="../../../static/img/work/tab/renwuguanli.png"  class="work-tag"></image>
					<view>任务管理</view>
				</view>
			</view>
			<!-- <view class="tab-second flex justify-start" style="padding-left:20px;">
				<view class="text-center"  @click="showItem('work')">
					<image src="../../../static/img/work/tab/renwuguanli.png" class="work-tag"></image>
					<view>任务管理</view>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['userInfo','userStatus']),
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
					});
					break;
					case 'count':
					//统计
					uni.navigateTo({
						url:"../../tab-item-content/shop-center/shop-list/shop-list?type=statistics"
					})
					break;
					case 'work':
						//任务管理
						uni.navigateTo({
							url:"../../tab-item-content/work-center/task-center/task-index/task-index"
						})
					
				}
				
				
			}
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/demo";
	page{
		background:@white_color;

	}
	.img-tag{
		.img(95upx;95upx);
	}
	.work-tag{

		.img(86upx;95upx);
	}
	.tab-title{
		/*font-size:24px;
		font-family:PingFangSC-Semibold;
		font-weight:600;
		color:rgba(70,69,69,1);
		margin-bottom:50upx;*/
		.mixFont(24px;bold);
		.mixFontFamily(PingFangSC-Semibold);
		.color(rgba(70,69,69,1));
		.mixMarginBottom(50upx);

		
	}
	.tab-container{

		/*padding-top:16px;*/
		/*padding-left:30px;*/
		.mixPadding(16px;0;0;30px)
		
		
	}
	.tab-list{
		
		text-align: center;
	}
	
</style>
