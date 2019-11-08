<template>
	<!-- <view>
		<cu-custom :isBack="true" bgColor="bg-color-active">
			<block slot="left">
				<view class="cuIcon-back font-size-back text-white" @tap="goBack"></view>
			</block>
			<block slot="content">
				<view class="font-size-big text-white font-weight-bold">工作申请</view>
			</block>
		</cu-custom>
		<view class="container position_relative">
			<image src="../../../../../static/img/work/head.png" mode="widthFix" lazy-load></image>
			<view class="work-tab">
				<view hover-class="bg-color-normal" @tap="operate('apply')">
					<view>我的申请</view>
					<image src="../../../../../static/img/work/apply/shenqing.png" mode="widthFix" lazy-load ></image>
				</view>
				<view hover-class="bg-color-normal"  @tap="operate('check')">
					<view>我的审批</view>
					<image src="../../../../../static/img/work/apply/shenpi.png" mode="widthFix" lazy-load ></image>
				</view>
			</view>
			<positionImg @createOperate="createApply" :src="'../../../../../static/img/add.png'"></positionImg>
		</view>
		
	</view> -->
	<view>
		<cu-custom :isBack="true" bgColor="bg-color-blue" >
			<block slot="left"><text class="cuIcon-back text-white" @click="goBack()"></text></block>
			<block slot="content"><view class="font-size-big font-weight-bold text-white" >工作申请</view></block>
		</cu-custom>
		<view class="sale-container">
			
			<operateTabItem 
			name="我的申请"
			value="apply"
			@goToItem="operate"
			:apply_img="true"
			:border_left_y="true"
			:src="'../../../../../static/img/work/apply/shenqing.png'"></operateTabItem>
			<operateTabItem
			name="我的审批"
			value="check"
			@goToItem="operate"
			:check_img="true"
			:border_left_r="true"
			:src="'../../../../../static/img/work/apply/shenpi.png'"></operateTabItem>
		</view>
		
		<positionImg @createOperate="createApply" :position_img="true" :src="'../../../../../static/img/add.png'"></positionImg>
	</view>
</template>

<script>
	import positionImg from '../../../../../components/position_img.vue'
	import operateTabItem from '../../../../../components/operate-tab-item.vue'
	export default {
		components:{positionImg,operateTabItem},
		data() {
			return {
				
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			createApply(){
				uni.navigateTo({
					url: '../work-my-apply/work-my-apply'
				});
			},
			operate(type){
				uni.navigateTo({
					url: '../my-apply-list/my-apply-list?type='+type
				});
			}
		}
	}
</script>

<style scoped>
	.sale-container{
		padding-top:160upx;
		display: flex;
		height:300upx;
		flex-direction: column;
		align-items: center;
		background:url(../../../../../static/img/sale_bg.png) no-repeat ;
		background-size:cover;
	}
	
</style>
