<template>
	<view >
		<cu-custom  isBack="true">
			 <block slot="left"><text class="cuIcon-back" @click="goBack()"></text></block>
			<block slot="content">设置登录密码</block>
			<block slot="right"><text class="text-blue" @click="changePassword()">提交</text></block>
		</cu-custom>
		<view>
			<view class="account-content bg-white" >
				当前登录账号<text class="text-blue" style="font-weight: 600;margin-left:8px;">{{userInfo.mobile}}</text>
			</view>
			<view class="form-content bg-white">
				<!-- <view class="form-content-item flex justify-between">
					<view class="form-title text-black"><text class="text-red">*</text>原密码</view>
					<input type="text" v-model="user.pwd" placeholder="请输入您的原密码" >
				</view> -->
			
				<view class="form-content-item flex justify-between">
					<view class="form-title text-black"><text class="text-red">*</text>新密码</view>
					<input type="text" v-model="user.newPwd" placeholder="填写新密码">
				</view>
			
				<view class="form-content-item flex justify-between" style="margin-bottom:18px;">
					<view class="form-title text-black"><text class="text-red">*</text>确认密码</view>
					<input type="text" v-model="user.confirmPwd" placeholder="再次填写确认" @blur="checkConfirmpwdEvent($event)">
				</view>
				<view class="pwd-desc">
					密码必须是6-20位的数字、英文组合
				</view>
				<view class="forget-pwd" @click="forgetPwd()">忘记密码?</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import headTab from '../../../../components/head-tab.vue'
	export default {
		data() {
			return {
				title:'设置登录密码',
				userInfo:{},
				user:{
					pwd:'',
					confirmPwd:'',
					newPwd:''
				}
			}
		},
		components:{
			headTab
		},
		methods: {
			changePassword(){
				this.$ajax('ResetPwd',{
					token:this.user.confirmPwd,
					original:this.user.pwd
				},res=>{
					console.log(res)
				})
			},
			checkConfirmpwdEvent(event){
				if(event.detail.value !=this.user.newPwd){
					uni.showToast({
						title:'两次输入的密码不相同',
						icon:'none'
					})
					return
				}
			},
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
	.header-content{
		height:66px;line-height:66px;text-align:center;position:fixed;width:100%;background:#EEEEED;padding-top:10px;z-index:100;
		padding-top:10px;
		.back{
			font-size:13px;position: absolute;left:20px;top:10px;
		}
		.submit{
			font-size:14px;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(66,176,237,1);
					position:absolute;right:10px;top:10px;
		}
	}
	page{
		background:white
	}
	uni-input{
			text-align:right
	}
	// .header-content{
	// 	padding:15px 14px;
	// 	border-bottom:1px solid #EEEEED;
	// 	.header-title{
	// 		font-size:16px;
	// 		font-family:PingFangSC-Semibold;
	// 		font-weight:600;
	// 		color:rgba(42,42,42,1);
	// 	}
	// 	.headers-submit{
	// 		font-size:14px;
	// 		font-family:PingFangSC-Regular;
	// 		font-weight:400;
	// 		color:rgba(66,176,237,1);
	// 	}
	// }
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
