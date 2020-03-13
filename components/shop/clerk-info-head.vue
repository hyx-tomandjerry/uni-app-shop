<template>
	<view class="clerk-info-header flex justify-center align-center">
		<!-- #ifdef MP-WEIXIN -->
			<image src="/static/bgimg/clerk_bg.png" mode="widthFix" lazy-load  ></image>
		<!-- #endif -->
		<!-- #ifndef MP-WEIXIN -->
			<image src="../../../../static/bgimg/clerk_bg.png" mode="widthFix" lazy-load  ></image>
		<!-- #endif -->
		<view class="user-info flex justify-center align-center " style="flex-direction: column;">
			<!-- #ifdef MP-WEIXIN -->
				<image :src="clerkItem.headurl?clerkItem.headurl:'static/img/default.png'" mode="widthFix" lazy-load></image>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
				<image :src="clerkItem.headurl?clerkItem.headurl:'../../../../static/img/default.png'" mode="widthFix" lazy-load></image>
				
			<!-- #endif -->
			<!-- 姓名 -->
			<view class="flex justify-center align-center  font-weight-bold text-white space font-size-back">{{clerkItem.name || ''}}</view>
			<!-- 状�-->
			<view class="status-tag flex justify-center align-center">
				{{clerkItem.status | userStatusZnPipe}}
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			clerkItem:Object
		},
		data(){
			return{
				bgImage:1
			}
		}
	}
</script>

<style scoped>
	.status-tag{
		background:rgba(32,208,158,1);
		border-radius:13px;
		font-size:22upx;
		color:#fff;
		padding:2upx 12upx;
	}
	.clerk-info-header{
		position:relative;
		height:500upx !important
	}
	.clerk-info-header>image{
		width:100%;
		height:500upx !important;
		flex-shrink: 0;
	}
	.space{
		margin:20upx 0;
	}
	.user-info{
		top:150upx;
		position:absolute;
	}
	.user-info>image{
		width:200upx;
		height:200upx !important;
		border-radius: 100%;
		flex-shrink: 0;
	}
</style>
