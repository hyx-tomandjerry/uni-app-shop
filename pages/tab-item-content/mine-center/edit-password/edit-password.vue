<template>
	<view>
		<view class="header-content flex justify-between bg-white bg-white">
			<view><text class="cuIcon-back" style="font-size:20px;" @click="goBack()"></text></view>
			<view><text class="header-title">设置登录密码</text></view>
			<view><text class="headers-submit">提交</text></view>
		</view>

		<view class="account-content bg-white">
			当前登录账号<text class="text-black">{{userInfo.mobile}}</text>
		</view>
		<view class="form-content bg-white">
			<view class="form-content-item flex justify-between">
				<view class="form-title text-black"><text class="text-red">*</text>原密码</view>
				<input type="text" v-model="user.pwd" placeholder="请输入您的原密码">
			</view>

			<view class="form-content-item flex justify-between">
				<view class="form-title text-black"><text class="text-red">*</text>新密码</view>
				<input type="text" v-model="user.newPwd" placeholder="填写新密码">
			</view>

			<view class="form-content-item flex justify-between" style="margin-bottom:18px;">
				<view class="form-title text-black"><text class="text-red">*</text>确认密码</view>
				<input type="text" v-model="user.pwd" placeholder="再次填写确认">
			</view>
			<view class="pwd-desc">
				密码必须是6-20位的数字、英文组合
			</view>
			<view class="forget-pwd" @click="forgetPwd()">忘记密码?</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				user:{
					pwd:'',
					confirmPwd:'',
					newPwd:''
				}
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.userInfo=res.data
					}
				})
			},
			forgetPwd(){
				uni.navigateTo({
					url:'../../../login-design/find-password/find-password'
				})
			}
		},
		onLoad(){
			this.getUserInfo()
		}
	}
</script>

<style lang="less">
	page{
		background:white
	}
	uni-input{
			text-align:right
	}
	.header-content{
		padding:15px 14px;
		border-bottom:1px solid #EEEEED;
		.header-title{
			font-size:16px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(42,42,42,1);
		}
		.headers-submit{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(66,176,237,1);
		}
	}
	.account-content{
		text-align:center;
		width:100%;
		padding-top:33px;
		padding-bottom:32px;
		font-size:16px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(137,136,136,1);
	}
	.form-content{
		.form-content-item{
			padding:29px 12px 8px 18px;
			border-bottom:1px solid #EEEEED;
		}
		.form-title{
			font-size:15px;
			font-family:PingFangSC-Regular;
			font-weight:400;

		}
		.pwd-desc{
			font-size:13px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(137,136,136,1);
			padding-left:15px;
			margin-bottom:2px;
		}
		.forget-pwd{
			padding-left:15px;
			font-size:13px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(66,176,237,1);
			padding-bottom:280px;
		}
	}
</style>
