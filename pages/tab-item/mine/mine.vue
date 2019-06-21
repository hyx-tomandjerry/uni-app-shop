<template>
	<view >
		<view style="position:relative;">
			
			<view class="header-content flex justify-between" v-if="userInfo.ownerType==shoperObj.ownerType && userInfo.type==shoperObj.type">
				<view class="flex justify-start" @click="operateItem('user')">
					<image :src="userInfo.headurl"
						v-if="userInfo.headurl"
						style="width:70px;height:70px;vertical-align: bottom;margin-right:25px;border-radius: 50%;"
					></image>
					<image src="../../../static/img/avatar.jpg"
						v-else
						style="width:70px;height:70px;vertical-align: bottom;margin-right:25px;border-radius: 50%;"
					></image>
					<view>
						<text class="header-title">{{userInfo.name || ''}}</text>
						<text class="header-tel">{{userInfo.account}}</text>
					</view>

				</view>
			</view>
			
			
			<view class="header-content flex justify-between" v-if="userInfo.ownerType==replacerObj.ownerType && userInfo.type==replacerObj.type">
				<view class="flex justify-start" @click="operateItem('user')">
					<image :src="userInfo.headurl"
						v-if="userInfo.headurl"
						style="width:70px;height:70px;vertical-align: bottom;margin-right:25px;border-radius: 50%;"
					></image>
					<image src="../../../static/img/avatar.jpg"
						v-else
						style="width:70px;height:70px;vertical-align: bottom;margin-right:25px;border-radius: 50%;"
					></image>
					<view>
						<view class="header-title">{{userInfo.name || ''}} ( {{userInfo.account}} ) </view>
						<view style="margin-left:4px;margin-top:8px;" class="font-size-small color-normal">{{userInfo.ownerName}}</view>
					</view>
			
				</view>
			</view>
				<view class="list-content">
					<view class="list-content-item flex justify-start" v-if="userInfo.ownerType==replacerObj.ownerType && userInfo.type==replacerObj.type" @click="operateItem('company')">
						<image src="../../../static/img/mine/company.png" class="img28"></image>
						<view class="list-content-item-title" >
							<text>公司设置</text>
						</view>
						<text class="cuIcon-right color-normal" style="position: absolute;right:20px;font-size:18px;"></text>
					</view>
					<view class="list-content-item flex justify-start" @click="operateItem('user')">
						<image src="../../../static/img/mine/user.png" class="img28"></image>
						<view class="list-content-item-title" >
							<text>基本设置</text>
						</view>
						<text class="cuIcon-right color-normal" style="position: absolute;right:20px;font-size:18px;"></text>
					</view>
					<view class="list-content-item flex justify-start" v-if="userInfo.ownerType==shoperObj.ownerType && userInfo.type==shoperObj.type" @click="operateItem('password')">
						<image src="../../../static/img/mine/set.png" class="img28"></image>
						<view class="list-content-item-title" >
							<text>修改密码</text>
						</view>
						<text class="cuIcon-right color-normal" style="position: absolute;right:20px;font-size:18px;"></text>
					</view>
					<view class="list-content-item flex justify-start" v-if="userInfo.ownerType==replacerObj.ownerType && userInfo.type==replacerObj.type" @click="operateItem('realName')">
						<image src="../../../static/img/mine/renzhen.png" class="img28"></image>
						<view class="list-content-item-title" >
							<text>实名认证</text>
						</view>
						<text class="cuIcon-right color-normal" style="position: absolute;right:20px;font-size:18px;"></text>
					</view>
					
					
				</view>
			
			<view class="list-content" style="padding-top:0;margin-top:13px;">
				<view class="list-content-item flex justify-start" @click="operateItem('quit')">
					<image src="../../../static/img/mine/quit.png" class="img28"></image>
					<view class="list-content-item-title" >
						<text>退出登录</text>
					</view>
					<text class="cuIcon-right color-normal" style="position: absolute;right:20px;font-size:18px;"></text>
				</view>
			</view>
			<view class="cu-modal" :class="isQuit?'show':''">
				<view class="cu-dialog ">
					<view class="cu-bar bg-white justify-end borderBottom">
						<view class="content font-size-big font-weight-normal color-normal">提示</view>
					</view>
					<view class="padding-xl font-size-big font-weight-normal color-normal bg-white borderBottom" style="padding:25px 0 27px;">
						确定要退出登录吗?
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action flex justify-around" style="width:100%;">
							<view style="width:50%;border-right:1px solid #EEEEED;padding:12px;"  @tap="hideModal('cancel')">取消</view>
							<view style="width:50%;padding:12px;"  @tap="hideModal('agree')" class="text-blue">确定</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import popModal from '../../../components/popmodal.vue'
	export default{
		computed: mapState(['hasLogin','userInfo','replacerObj','shoperObj']),
		data(){
			return{
				avatar:'',
				isQuit:false,
				operateList:[
					{image:'../../../static/img/mine/company.png',index:0,text:'公司设置'},
					{image:'../../../static/img/mine/user.png',index:0,text:'个人设置'},
					{image:'../../../static/img/mine/renzheng.png',index:1,text:'个人认证'},
					// {image:'../../../static/img/mine/icon-fankui@2x.png',index:2,text:'意见反馈'},
					{image:'../../../static/img/mine/tuichu.png',index:3,text:'退出登录'},
				]
			}
		},
		components: {
			popModal
		},
		methods:{
			...mapMutations(['logout','login']),
			//获得头像
			getUserInfoAvatar(){
				uni.getStorage({
					key:'logo',
					success: (res) => {
						this.userInfo.headerUrl=res.data
					}
				})
			},
			hideModal(type){
				this.isQuit=false;
				if(type=='agree'){
					this.logout();
					uni.redirectTo({
						url:'../../login-design/login/login'
					})
				}

			},
			operateItem(type){
				
					switch(type){
						case 'company':
						uni.navigateTo({
							url:'../../tab-item-content/mine-center/company-setting/company-setting'
						})
						break;
						case 'realName':
						break;
						case 'user':
						//基本设置
						if(this.userInfo.status!=1){
							uni.showToast({
								title:'您没有操作的权限',
								icon:'none'
							})
						}else{
							uni.navigateTo({
								url:'../../tab-item-content/mine-center/basic-setting/basic-setting'
							})
						}
						
						break;
						case 'password':
						//修改密码
						if(this.userInfo.status!=1){
							uni.showToast({
								title:'您没有操作的权限',
								icon:'none'
							})
						}else{
							uni.navigateTo({
								url:'../../tab-item-content/mine-center/edit-password/edit-password'
							})
						}
						
						break;
						case 'eidt':
						if(this.userInfo.status!=1){
							uni.showToast({
								title:'您没有操作的权限',
								icon:'none'
							})
						}else{
							//意见反馈
							uni.navigateTo({
								url:'../../tab-item-content/mine-center/suggestion-list/suggestion-list'
							})
						}
						
						break;
						case 'quit':
						this.isQuit=true;
					}
				}
				
			
		},
		
		onLoad(){
			this.getUserInfoAvatar();


		}
	}
</script>

<style lang="less">

	.header-content{
	background-image: url("../../../static/img/mine/img.png") ;
	background-size: 100%;
		background-repeat: no-repeat;
		padding:29px 16px 23px 22px;
		margin-bottom:13px;
		border-radius:4px;
		.header-title{
			font-size:17px;
			font-family:PingFangSC-Regular;
			font-weight:600;
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
				margin-left:8px;
				padding-bottom:16px;
				margin-top:4px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(42,42,42,1);
				border-bottom:1px solid #EEEEED;
				width:100%;
			}
		}
		.img28{
			width:30px;
			height:28px;
			vertical-align: middle
		}

	}
</style>



