<template>
	<view>
		<view class="flex justify-around" style="width:100%;flex-wrap: wrap;padding-top:10px;">
			<view style="width:45%;position:relative" @click="showItem('log')">
				<image src="../../../static/img/work/tab/construct.png" mode="" style="height:168px"></image>
				<text class="position_absolute font-size-big font-weight-bold text-white" style="bottom:48px;left:59px;">工作日志</text>
			</view>
			<view style="width:45%;position:relative" @click="showItem('express')">
				<image src="../../../static/img/work/tab/express.png" mode="" style="height:168px"></image>
				<text class="position_absolute font-size-big font-weight-bold text-white" style="bottom:48px;left:59px;">快递包裹</text>
			</view>
			<view style="width:45%;position:relative" @click="showItem('repair')">
				<image src="../../../static/img/work/tab/repair.png" mode="" style="height:168px"></image>
				<text class="position_absolute font-size-big font-weight-bold text-white" style="bottom:48px;left:59px;">我的报修</text>
			</view>
			<view style="width:45%;position:relative" @click="showItem('employee')" v-if="userInfo.type==replacerObj.type">
				<image src="../../../static/img/work/tab/construct.png" mode="" style="height:168px"></image>
				<text class="position_absolute font-size-big font-weight-bold text-white" style="bottom:48px;left:59px;">组织结构</text>
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
				tabImg:[
					{type:'log',url:'../../../static/img/work/tab/construct.png',text:'工作日志'},
					{type:'express',url:'../../../static/img/work/tab/express.png',text:'快递包裹'},
					{type:'repair',url:'../../../static/img/work/tab/repair.png',text:'我的报修'},
					{type:'employee',url:'../../../static/img/work/tab/construct.png',text:'组织结构'},
				]
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
