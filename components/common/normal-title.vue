<template>
	<view class="flex justify-start bg-white common-title borderBottom">
		<view class="border-tag" v-show="isTag"></view>
		<view class="font-size-big font-weight-bold color-normal">
			{{content}}
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			content:String,
			isTag:Boolean
		}
	}
</script>

<style scoped>
	.border-tag{
		width:18upx;
		height:36upx;
		background:#42b0ed;
		margin-right:20upx;
	}
	.common-title{
		margin-top:26upx;
		padding:30upx 40upx;
	}
</style>
