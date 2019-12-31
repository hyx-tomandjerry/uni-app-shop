<template>
	<view class="flex align-center express-user-item">
		<view>
			<image :src="src" mode="widthFix" class="express_tag"></image>
		</view>
		<view>
			<view class="font-weight-bold color-normal">{{shopName || ''}}</view>
			<view>{{clerkName}} <text v-if="clerkMobile" style="margin-left:10upx;"> {{clerkMobile}}</text></view>
			<view class="font-size-mini">{{shopAddress}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			src:String,
			shopName:String,
			clerkName:String,
			clerkMobile:String,
			shopAddress:String
		}
	}
</script>

<style scoped>
	.express-user-item{
		margin-bottom:30upx;
	}
	.express-user-item>view:last-child{
		padding-left:30upx;
	}
	.express-user-item>view:last-child>view:nth-child(2){
		margin:10upx 0;
	}
	.express_tag{
		flex-shrink: 0;
		width:70upx;
		height: 68upx !important;
	}
</style>
