<template>
	<view class="borderTop">
		<view class="tel-container borderBottom">
			<view class="tel-title font-size-back font-weight-bold color-normal">手机账号</view>
			<view class="flex justify-between tel-number align-center" @click="changeTel">
				<view>{{userInfo.mobile}}</view>
				<view>
					<text class="font-size-big color-regular" style="margin-right:8px;">更换</text>
					<text class="cuIcon-right font-size-big color-regular"></text>
				</view>
			</view>
		</view>
		<view class="intro font-size-mini">
			注意：一个手机号码只能作为一个登录账号
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				
			}
		},
		methods: {
			changeTel(){
				uni.navigateTo({
					url:'../change-telephone/change-telephone'
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
	.tel-container{
		padding-top:20px;
		.tel-title{
			
			margin-left: 15px;
		
		}
		.tel-number{
			margin-top: 12px;
			margin-left: 15px;
			margin-right: 12px;
			padding-bottom: 16px;
			
		}
	}
	.intro{
		margin-left: 14px;
		margin-top: 10px;
		color:#D40D0D
	}
</style>
