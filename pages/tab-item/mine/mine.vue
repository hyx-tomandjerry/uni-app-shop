<template>
	<view style="position:relative">
		<view class="header-content flex justify-between">
			<view class="flex justify-start">
				<image src="../../../static/img/avatar.jpg"
					style="width:70px;height:70px;vertical-align: bottom;margin-right:25px;"
				></image>
				<view>
					<text class="header-title">{{userInfo.name || ''}}</text>
					<text class="header-tel">{{userInfo.mobile}}</text>
				</view>
				<text class="cuIcon-right" style="position:absolute;right:20px;top:52px;color:rgba(0,0,0,1)"></text>
			</view>
		</view>
		<view class="list-content">
			<view class="list-content-item flex justify-start"

			 v-for="(item,index) in operateList" :key="index">
				<image :src="item.image" class="img28"></image>
				<view class="list-content-item-title" >
					<text>{{item.text}}</text>
				</view>
				<text class="cuIcon-right" style="position: absolute;right:20px;" @click="operateItem(index)"></text>
			</view>
		</view>
		
		<view class="box" style="position:fixed;bottom:0px;width:100%;">
			<view class="cu-bar tabbar bg-white">
				<view class="action" style="padding-top:5px;" @click="showIndexClick()">
					<view class="cuIcon-cu-image">
						<image src="../../../static/img/tab_img/shouye.png"></image>
						
					</view>
					<view class="text-gray">首页</view>
				</view>
				<view class="action" style="padding-top:5px;" @click="showMessageClick()">
					<view class="cuIcon-cu-image" >
						<image src="../../../static/img/tab_img/xiaoxi.png" ></image>
						<view class="cu-tag badge">99</view>
					</view>
					<view class="text-gray">消息</view>
				</view>
				<view class="action" style="padding-top:5px;">
					<view class="cuIcon-cu-image">
						
						<image src="../../../static/img/tab_img/mine_color.png"></image>
					</view>
					<view class="text-blue">我的</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default{
		data(){
			return{
				userInfo:{},
				operateList:[
					{image:'../../../static/img/mine/icon-shezhi@2x.png',index:1,text:'基本设置'},
					{image:'../../../static/img/mine/icon-xiugaimima@2x.png',index:1,text:'修改密码'},
					{image:'../../../static/img/mine/icon-fankui@2x.png',index:1,text:'意见反馈'},
				]
			}
		},
		methods:{
			showMessageClick(){
				uni.navigateTo({
					url:'../message/message'
				})
			},
			showIndexClick(){
				uni.navigateTo({
					url:'../index/index'
				})
			},
			getUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.userInfo=res.data;
					}
				})
			},
			operateItem(index){

				switch(index){
					case 0:
					//基本设置
					uni.navigateTo({
						url:'../../tab-item-content/mine-center/basic-setting/basic-setting'
					})
					break;
					case 1:
					//修改密码
					uni.navigateTo({
						url:'../../tab-item-content/mine-center/edit-password/edit-password'
					})
					break;
					case 2:
					//意见反馈
					uni.navigateTo({
						url:'../../tab-item-content/mine-center/suggestion-list/suggestion-list'
					})
					break;
				}
			}
		},
		onLoad(){
			this.getUserInfo()
		}
	}
</script>

<style lang="less">
	page{
		background: #fff;
	}
	.header-content{
		background:#fff;
		padding:29px 16px 23px 22px;
		box-shadow:0px 4px 6px 0px rgba(242,241,241,0.5);
		border-radius:4px;
		.header-title{
			font-size:18px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(42,42,42,1);
			margin-bottom:3px;
			display: block;
			padding:5px;
		}
		.header-tel{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(137,136,136,1);
			display: block;
			padding:5px;
		}
	}
	.list-content{
		background:#fff;
		padding-top:26px;
		padding-left:22px;
		padding-right:20px;
		.list-content-item{
			padding-top:16px;
			padding-bottom:16px;
			.list-content-item-title{
				font-size:15px;
				padding-bottom:16px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(42,42,42,1);
				border-bottom:1px solid #EEEEED;
				width:100%;
			}
		}
		.img28{
			width:28px;
			height:28px;
			margin-right:8px;
			vertical-align: middle
		}

	}
</style>



