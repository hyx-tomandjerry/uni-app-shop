<template>
	<view style="border-top:1px solid #EEEEED;">
		<!-- <view class="number-container">
			<view class="number-title">手机账号</view>
			<view class="number-content flex justify-between">
				<view class="number-tel">18838380488</view>
				<view class="number-change">
					<text style="margin-right:8px;">更换</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
		<view class="number-desc">
			注意：一个手机号码只能作为一个登录账号
		</view> -->
		
		<view class="telephone-content">
			<view class="title">
				您已经绑定手机号码
			</view>
			<view class="telephone-title">
				188****488
			</view>
			<view class="change cu-btn round" @click="changeTel()">
				<view >更换手机号码</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
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
		background:rgba(247,247,247,1);
	}
	.telephone-content{
		text-align:center;
		padding-top:20px;
		padding-bottom:20px;
		.title{
			font-size:14px;
			font-family:PingFangSC-Semibold;
			font-weight:400;
			margin-bottom:20px;
			color:rgba(137,136,136,1);
		}
		.telephone-title{
			font-size:26px;
			font-family:PingFangSC-Semibold;
			font-weight:400;
			color:rgba(42,42,42,1);
		}
		.change{
			margin-top:20px;
		}
	}
	// .number-container{
	// 	padding:20px 12px 16px 15px;
	// 	border-bottom:1px solid #EEEEED;
	// 	.number-title{
	// 		font-size:22px;
	// 		font-family:PingFangSC-Semibold;
	// 		font-weight:600;
	// 		color:rgba(42,42,42,1);
	// 		margin-bottom:12px;
	// 	}
	// 	.number-tel{
	// 		font-size:16px;
	// 		font-family:PingFangSC-Regular;
	// 		font-weight:400;
	// 		color:rgba(42,42,42,1);
	// 	}
	// 	.number-change{
	// 		font-size:16px;
	// 		font-family:PingFangSC-Regular;
	// 		font-weight:400;
	// 		color:rgba(137,136,136,1);
	// 	}
	// }
	// .number-desc{
	// 	padding-top:10px;
	// 	padding-left:14px;
	// 	font-size:12px;
	// 	font-family:PingFangSC-Regular;
	// 	font-weight:400;
	// 	color:rgba(212,13,13,1);
	// }
</style>
