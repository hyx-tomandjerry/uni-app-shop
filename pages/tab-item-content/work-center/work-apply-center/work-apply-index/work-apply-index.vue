<template>
	<view>
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
		padding-top:40upx;
		display: flex;
		height:200upx;
		flex-direction: column;
		align-items: center;
		background:url(../../../../../static/img/sale_bg.png) no-repeat ;
		background-size:cover;
	}
	
</style>
