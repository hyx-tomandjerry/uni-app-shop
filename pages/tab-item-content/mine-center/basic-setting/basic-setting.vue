<template>
	<view>
		<view class="header-content flex justify-between bg-white">
			<view><text class="cuIcon-back" style="font-size:20px;" @click="goBack()"></text></view>
			<view><text class="header-title">设置登录密码</text></view>
			<view><text class="headers-submit">完成</text></view>
		</view>
		
		<view class="info-content bg-white position_relative">
			<view 
			style="padding:13px 40px 10px 14px;"
			class="info-content-item flex justify-between">
				<view class="info-item-title">头像</view>
				<view>
					<image 
					class="img47"
						src="../../../../static/img/avatar.jpg"></image>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:7px;font-size:20px;"></text>
			</view>
			<view class="info-content-item flex justify-between">
				<view class="info-item-title">昵称</view>
				<view>
					<text>{{userInfo.name || ''}}</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:7px;font-size:20px;"></text>
			</view>
			
			<view class="info-content-item flex justify-between">
				<view class="info-item-title">电话</view>
				<view>
					<text>{{userInfo.mobile || ''}}</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:7px;font-size:20px;" @click="tochangeMobile()"></text>
			</view>	
		</view>
		
		<view class="extra-content bg-white">
			<view class="info-content-item flex justify-between">
				<view class="info-item-title">性别</view>
				<view>
					<text>{{userInfo.gender==1?'男':'女'}}</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:7px;font-size:20px;"></text>
			</view>
			
			<view class="info-content-item flex justify-between">
				<view class="info-item-title height53">出生日期</view>
				<view>
					<text>{{userInfo.birthday | formatTime('YDM')}}</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:7px;font-size:20px;"></text>
			</view>
			
			<!-- <view class="info-content-item flex justify-between">
				<view class="info-item-title height53">所在地</view>
				<view>
					<text>{{userInfo.ADDRE''}}</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:7px;font-size:20px;"></text>
			</view> -->
			
			<!-- <view class="info-content-item flex justify-between">
				<view class="info-item-title height53">详细地址</view>
				<view>
					<text>浦东新区世纪公园208号</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:7px;font-size:20px;"></text>
			</view> -->
		</view>
		
		<view class="info-content-item  flex justify-between bg-white height53" @click="quitEvent()">
			<view class="info-item-title"  >退出登录</view>
			<view>
				<text></text>
			</view>
			<text class="cuIcon-right" 
			style="position:absolute;right:7px;font-size:20px;"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		methods: {
			tochangeMobile(){
				// 账号管理
				uni.navigateTo({
					url:'../account-manager/account-manager'
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getUserInfo(){
				uni.getStorage({
					key:'usrInfo',
					success: (res) => {
						this.userInfo=res.data
					}
				})
			},
			
			//退出登录
			quitEvent(){
				uni.clearStorage();
				uni.navigateTo({
					url:'../../../login-design/login/login'
				})
			}
		},
		onLoad(){
			this.getUserInfo()
			console.log(this.userInfo)
		}
	}
</script>

<style lang="less">
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
	.info-content-item{
		padding:1px  33px 2px 14px;
		line-height:47px;
		border-bottom:1px solid #EEEEED;
	}
	.info-item-title{
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
	}
	.info-content{
		.img47{
			width:47px;
			height:47px;
			vertical-align: middle
		}
		
	}
	.extra-content{
		margin-top:13px;
		margin-bottom:12px;
	}
	.height53{
		padding-top:2px !important;
		padding-bottom:3px !important
	}
</style>
