<template>
	<view class="company-head flex align-center bg-white borderBottom borderTop">
		<image 
		:src="companyInfo.logourl?companyInfo.logourl:'../../../../static/img/default.png'"
		 mode="widthFix" ></image>
		 <view >
			 <view class="company-title">{{companyInfo.name}}</view>
			 <view class="color-regular font-size-big">EID:{{companyInfo.eid || ''}}</view>
		 </view>
	</view>
</template>

<script>
	export default{
		props:{
			companyInfo:{
				type:Object,
				default(){return {}}
			}
		}
	}
</script>

<style scoped>
	.company-head{
		padding:32upx 0 30upx 40upx;
	}
	.company-head image{
		width:60px;
		height:60px !important;
		margin-right:40upx;
		vertical-align: middle;
		border-radius: 100%;
	}
	.company-title{
		font-size:16px;
		font-weight: bold;
		color:#2A2A2A
	}
</style>
