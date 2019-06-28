<template>
	<view>

		<view class="tab-container">
			<view class="tab-list">
				<view style="background:rgba(239,249,251,1);" class="tab-item" @click="showItem('log')">
					<image src="../../../static/img/work/tab/log.png" style="width:36px;height:36px;"></image>
					<view class="font-size-big ">工作日志</view>
				</view>
				<view style="background:rgba(252,237,236,1);" class="tab-item" @click="showItem('express')">
					<image src="../../../static/img/work/tab/email.png" style="width:38px;height:38px;"></image>
					<view class="font-size-big ">快递包裹</view>
				</view>
				<view style="background:#E3F3ED;" class="tab-item" @click="showItem('repair')">
					<image src="../../../static/img/work/tab/repair.png" style="width:38px;height:38px;"></image>
					<view class="font-size-big ">我的报修</view>
				</view>
				<view style="background:#FFF4D1;" class="tab-item" @click="showItem('employee')" v-if="userInfo.type==replacerObj.type">
					<image src="../../../static/img/work/tab/personnel.png" style="width:38px;height:38px;"></image>
					<view class="font-size-big ">组织结构</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed:mapState(['userInfo','userStatus','replacerObj']),
		data() {
			return {

			}
		},
		methods: {
			showItem(type){
				if(this.userInfo.status!=this.userStatus.normal){
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
						});
						break;
						case 'employee':
						uni.navigateTo({
							url:'../../tab-item-content/work-center/personnel-center/personnel-index/personnel-index'
						})
						
					}
				}
				
				
			}
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;

	}
	.tab-container{

		padding-top:16px;
		padding-right:12px;
		padding-left:14px;
		.tab-list{
			width:100%;

			text-align: center;
		}
		.tab-item{
			padding:18px 0;border-radius:8px;margin-bottom:13px;
		}
	}

</style>
