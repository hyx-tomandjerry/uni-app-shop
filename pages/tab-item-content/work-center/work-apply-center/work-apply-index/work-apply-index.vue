<template>
	<view>
		<view class="sale-container">
			<view class="sale-top"></view>
			<!-- <view class="operate-item flex justify-between align-center border-Left-red operate-item-one"
				 hover-class="bg-color-normal" @click="operate('apply')">
				<view class="font-size-big font-weight-bold color-normal">
					我的申请
				</view>
				<image src="../../../../../static/img/work/apply/shenqing.png"
				 mode="widthFix" lazy-load class="apply_img"></image>
			</view>
			<view class="operate-item flex justify-between align-center border-left-p"
				 hover-class="bg-color-normal" @click="operate('check')">
				<view class="font-size-big font-weight-bold color-normal">
					我的审批
				</view>
				<image src="../../../../../static/img/work/apply/shenpi.png"
				 mode="widthFix" lazy-load class="sale_check_img"></image>
			</view> -->
			
			<operateTabItem 
			name="我的申请"
			value="apply"
			class="operate-item-one"
			@goToItem="operate"
			:apply_img="true"
			:border_left_y="true"
			:src="'../../../../../static/img/work/apply/shenqing.png'" ></operateTabItem>
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
	import positionImg from '../../../../../components/common/position_img.vue'
	import operateTabItem from '../../../../../components/common/operate-tab-item.vue'
	export default {
		components:{positionImg,operateTabItem},
		data() {
			return {
				
			}
		},
		methods: {
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
		display: flex;
		flex-direction: column;
		align-items: center;
		
	}
	.sale-top{
		height:200upx;
		width:100%;
		background:url("../../../../../static/img/sale_bg.png") no-repeat ;
		background-size:cover;
	}
		
		.operate-item-one{
			margin-top:-100upx !important;
		}
		
</style>
