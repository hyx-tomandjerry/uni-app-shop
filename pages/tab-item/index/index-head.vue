<template>
	<view class="head-container" >
		<!-- header start  -->
		<view class="flex  align-center">
			<image :src="company.cover?company.cover:'../../../static/img/default.png'" class="companyImg"></image>
			<view class="font-weight-bold font-size-bigger color-normal">{{company.name || ''}}</view>
		</view>
		<!-- header end -->
	</view>
</template>

<script>
	export default{
		props:{
			company:{
				type:Object,
				default(){return {}}
			}
		}
	}
</script>

<style scoped>
	.head-container{
		padding-top:100upx;
		padding-bottom:20upx;
		position:fixed;left:32upx;z-index:100;background:#fff;width:100%;
	}
	.companyImg{
		width:70upx;height:70upx!important;margin-right:16upx;flex-shrink: 0;
		border-radius: 50%;
		vertical-align: middle;
	}
</style>
