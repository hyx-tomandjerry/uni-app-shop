<template>
	<view>
		<view class="header-content flex justify-between">
			<text class="cuIcon-back" style="font-size:17px;" @click="goBack()"></text>
			<text class="header-content-title">反馈建议</text>
			<text class="header-content-submit">提交</text>
		</view>
		<view class="suggestion-content">
			<view class="suggestion-content-title"><text class="text-red">*</text>内容描述:</view>
			<view>
				<textarea  
				style="max-height:142px;width:100%;padding-top:17px;padding-left:11px;background:rgba(247,247,247,1);
border-radius:4px;margin-bottom:23px;"
				placeholder="告诉我们您遇到的问题，我们会第一时间处理" v-model="suggestion"/>
			</view> 
			<view class="suggestion-content-title" style="margin-bottom:19px;">截图(选填):</view>
			<view>
				<image src="../../../../static/icon/image.png" style="width:102px;height:102px;"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				suggestion:''
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background:#fff !important;
	}
	.header-content{
		padding:15px 13px 15px 15px;
		width:100%;
		border-bottom:0.5px solid #EEEEED;
		.header-content-title{
			font-size:16px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(42,42,42,1);
		}
		.header-content-submit{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			// color:rgba(182,222,251,1);
			color:rgba(66,176,237,1)
		}
	}
	.inputactive{
		color:rgba(66,176,237,1)
	}
	.suggestion-content{
		padding-top:18px;
		padding-right:11px;
		padding-left:14px;
		.suggestion-content-title{
			font-size:18px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(42,42,42,1);
			margin-bottom:12px;
		}
	}
</style>
