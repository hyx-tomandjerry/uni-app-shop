<template>
	<view >
		<view style="position:relative">
			<view class="header-content flex justify-between">
				<view class="flex justify-start" @click="operateItem(0)">
					<!-- <image :src="avatar.resurl"
						v-if="avatar.resurl"
						style="width:70px;height:70px;vertical-align: bottom;margin-right:25px;border-radius: 50%;"
					></image> -->
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
					<text class="cuIcon-right color-normal" style="position:absolute;right:20px;top:52px;font-size:20px;" ></text>
				</view>
			</view>
				<view class="list-content">
				<view class="list-content-item flex justify-start"
			
				 v-for="(item,index) in operateList" :key="index"  @click="operateItem(index)">
					<image :src="item.image" class="img28"></image>
					<view class="list-content-item-title" >
						<text>{{item.text}}</text>
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
		computed: mapState(['hasLogin','userInfo']),
		data(){
			return{
				avatar:'',
				isQuit:false,
				operateList:[
					{image:'../../../static/img/mine/icon-shezhi@2x.png',index:0,text:'基本设置'},
					{image:'../../../static/img/mine/icon-xiugaimima@2x.png',index:1,text:'修改密码'},
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
					setTimeout(()=>{
						uni.reLaunch({
							url:'../../login-design/login/login'
						})
						
					},500)

				}

			},
			operateItem(index){
				
					switch(index){
						case 0:
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
						case 1:
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
						case 3:
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
						case 2:
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

		background:#fff;
		padding:29px 16px 23px 22px;
		margin-bottom: 13px;
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
				margin-left:8px;
				padding-bottom:16px;
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



