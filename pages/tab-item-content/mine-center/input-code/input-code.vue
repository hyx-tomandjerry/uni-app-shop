<template>
	<view>
			<view class="code-content">
				<view>
					我们已向<text style="color:rgba(66,176,237,1);">18838280488</text>发送验证码短信 请查看短信并输入验证码
				</view>
				<view class="input-content  flex justify-around">
					<view  class="box-item">
						<input type="text" style="margin-top:7px;font-size:20px;">
					</view>
					<view  class="box-item">
						<input type="text" style="margin-top:7px;font-size:20px;">
					</view>
					<view  class="box-item">
						<input type="text" style="margin-top:7px;font-size:20px;">
					</view>
					<view  class="box-item">
						<input type="text" style="margin-top:7px;font-size:20px;">
					</view>
				</view>
				<view class="again">
					<text>重新发送验证码</text>
				</view>
				
			</view>
			<view style="padding-right:13px;padding-left:15px;background:rgba(255,255,255,1);">
				<button type="primary" @click="login()">下一步</button>
			</view>
			
			<view class="cu-modal" :class="isShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">提示</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					请使用 <text class="notice">18838280588</text>手机号登录
				</view>
				<view class="cu-bar bg-white justify-center">
					<view class="action">
						<text class="notice">我知道了</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				isShow:false
			}
		},
		methods: {
			login(){
				this.isShow=true;
			},
			hideModal(){
				this.isShow=false;
			}
		}
	}
</script>

<style lang="less">
	page{
		background:#fff;
	}
	.code-content{
		text-align:center;
		padding-top:56px;
		padding-right:32px;
		padding-left:38px;
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
		.input-content{
			margin-top:38px;
			padding-left:50px;
			padding-right:50px;
			margin-bottom:24px;
		}
		.box-item{
			width:43px;height:43px;border-radius:4px;line-height:43px;
			border:1px solid rgba(66,176,237,1);background:rgba(242,242,242,1);
		}
		.again{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(66,176,237,1);
			margin-bottom:24px;
		}
	}
	.notice{
		font-size:16px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(66,176,237,1);
	}
</style>
