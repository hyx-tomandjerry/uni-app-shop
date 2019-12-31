<template>
	<view class="flex align-center borderBottom font-size-mini color-regular detail-item animated slideInLeft">
		<view class="flex-1">
			<view class="margin-b-m">
				<text class="margin-r">费用科目 : </text>
				<text class="color-normal">{{item.subjectName}}</text>
			</view>
			<view>
				<text class="margin-r">报销金额 : </text>
				<text class="color-red font-weight-bold">{{item.amount}}元</text>
			</view>
		</view>
		<view class="flex-1">
			<view class="margin-b-m">
				<text class="margin-r">报销日期 : </text>
				<text class="color-normal">{{item.occdate | formatTime('YMD')}}</text>
			</view>
			<view>
				<text class="margin-r">摘要 : </text>
				<text class="color-normal">{{item.detail || ''}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		props:{
			item:Object,
			index:Number
		},
		
		
	}
</script>

<style scoped>
.detail-item{
		padding:10upx 20upx;
}
.margin-b-m{
	margin-bottom: 10upx;
}
.margin-r{
	margin-right: 10upx;
}
</style>
