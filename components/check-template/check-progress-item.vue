<template>
	<!-- 模板列表详情 -->
	<view class="work-flow-item flex justify-start align-center animated slideInLeft" @tap="chooseItem" hover-class="bg-color-normal">
		<template v-if="item.formType==approvalMode.common">
			<image src="../../../../static/img/work/apply/my-apply/common_icon.png" mode="widthFix" lazy-load></image>
		</template>
		<template v-if="item.formType==approvalMode.repair_service">
			<image src="../../../../static/img/work/apply/my-apply/repair_icon.png" mode="widthFix" lazy-load></image>
		</template>
		<template v-if="item.formType==approvalMode.expense">
			<image src="../../../../static/img/work/apply/my-apply/baoxiao_icon.png" mode="widthFix" lazy-load></image>
		</template>
		<template v-if="item.formType==approvalMode.absence">
			<image src="../../../../static/img/work/apply/my-apply/qingjia_icon.png" mode="widthFix" lazy-load></image>
		</template>
		<view>
			<view class="font-weight-bold color-normal">{{item.formTypeName}}</view>
			<view class="color-regular font-size-mini">模板名称 :{{item.name}}</view>
			<view class="color-regular font-size-mini">创建人 ： {{item.creatorName}}    {{item.instdate | formatTime('YMD')}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		computed:{approvalMode(){return this.config.approvalMode}},
		props:{
			item:Object,
			index:Number
		},
		methods:{
			chooseItem(){
				this.$emit('chooseItem',this.item)
			}
		}
	}
</script>

<style scoped>
	.work-flow-item{
		padding:10px 20px;
		border-bottom:1upx solid #EEEEED;
	}
	.work-flow-item>image{
		width:80upx;
		height:80upx !important;
		flex-shrink: 0;
		margin-right: 20upx;
	}
	.work-flow-item>view>view:first-child{
		font-size:26upx;
		margin-bottom:10upx;
	}
	.work-flow-item>view>view:nth-child(2){
		margin-bottom:4upx;
	}
</style>
