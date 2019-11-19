<template>

	<view class="position_relative">
		<cu-custom :isBack="true" bgColor="bg-white">

		</cu-custom>
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
				<view class="text-center" style="flex:1" @click="showItem('work')">
					<image src="../../../static/img/work/tab/renwuguanli.png"  class="work-tag"></image>
					<view>任务管理</view>
				</view>
			</view>
			<view class="tab-second flex justify-start" style="padding-left:20px;">
				<view class="text-center"  @click="showItem('apply')">
					<image src="../../../static/img/work/tab/apply.png" class="img-tag"></image>
					<view>工作申请</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		computed:mapState(['userInfo','userStatus']),
		data() {
			return {

			}
		},
		onLoad(){
			this.getTodoList()
		},
		onShow(){
			this.getTodoList()
		},
		methods: {
			
			/*获得代办数量*/
			getTodoList(){
				this.$ajax('MyEventNumbers',{},res=>{
					if(res>0){
						uni.setTabBarBadge({
						  index: 1,
						  text:res.toString()
						
						})
					}
				})
			},
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
						break;
					case 'apply':
					uni.navigateTo({
						url: '../../tab-item-content/work-center/work-apply-center/work-apply-index/work-apply-index'
					});
						break;

				}


			}
		}
	}
</script>

<style >
	@import url("work.css");
</style>
