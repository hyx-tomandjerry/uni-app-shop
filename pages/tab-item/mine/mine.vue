<template>
	<view >
		<view style="position:relative;">
			
			<view class="header-content flex justify-between">
				<view class="flex justify-start align-center" @click="operateItem('user')">
					<image :src="userInfo.headurl?userInfo.headurl:'../../../static/img/avatar.jpg'"
						style="width:70px;height:70px;vertical-align: bottom;margin-right:25px;border-radius: 50%;"
					></image>
					<view>
						<text class="header-title">{{userInfo.name || ''}}</text>
						<text class="header-tel">{{userInfo.account}}</text>
					</view>
				</view>
			</view>
			
				<view class="list-content">
					<view class="flex justify-between  align-center list-content-item" 
						
						@click="operateItem('user')">
						<view class="flex justify-start align-center">
							<image src="../../../static/img/mine/set.png" 
							class="img-user"></image>
							<view class="font-size-normal">基本设置</view>
						</view>
						<view>
							<image src="../../../static/icon/icon-mine-right.png" class="arrow-right"></image>
						</view>
					</view>
					<view class="flex justify-between  align-center list-content-item"
						
						@click="operateItem('password')">
						<view class="flex justify-start align-center">
							<image src="../../../static/img/mine/passowrd.png" 
							class="img-set"
							></image>
							<view class="font-size-normal">修改密码</view>
						</view>
						<view>
							<image src="../../../static/icon/icon-mine-right.png" class="arrow-right"></image>
						</view>
					</view>
					
				</view>
			
			<view class="list-content" style="margin-top:13px;">
				<view class="flex justify-between  align-center quit-item"
					
					@click="operateItem('quit')">
					<view class="flex justify-start align-center">
						<image src="../../../static/img/mine/quit.png" class="img-quit"></image>
						<view class="font-size-normal">退出登录</view>
					</view>
					<view>
						<image src="../../../static/icon/icon-mine-right.png" class="arrow-right"></image>
					</view>
				</view>
				
			</view>
			
			<showModel :isShow="isQuit" @hideModel="hideModal('cancel')" @confirmDel="hideModal('agree')" v-if="isQuit">
				<block slot="content">确定要退出登录吗?</block>
			</showModel>
		</view>
		
	</view>

</template>

<script>
	import showModel from '../../../components/show-model.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default{
		computed: mapState(['hasLogin','userInfo','shoperObj','userStatus']),
		components:{showModel},
		data(){
			return{
				isQuit:false,
				
			}
		},
		methods:{
			...mapMutations(['logout','login']),
			hideModal(type){
				
				if(type=='agree'){
					this.isQuit=false;
					this.logout();
					uni.redirectTo({
						url:'../../login-design/login/login'
					})
				}else if(type=='cancel'){
					this.isQuit=false;
				}

			},
			operateItem(type){
				
					switch(type){
						case 'user':
						//基本设置
						uni.navigateTo({
							url:'../../tab-item-content/mine-center/basic-setting/basic-setting'
						})
						
						break;
						case 'password':
						//修改密码
						uni.navigateTo({
							url:'../../tab-item-content/mine-center/edit-password/edit-password'
						})
						
						break;
						case 'quit':
						this.isQuit=true;
					}
				}
				
			
		}
	}
</script>

<style lang="less">
	@import "../../../static/css/demo";
	.header-content{
		background-image: url("../../../static/img/mine/img.png") ;
		background-size: 100%;
		background-repeat: no-repeat;
		.mixPadding(29px;16px;23px;22px);
		.mixMarginBottom(13px);
		.mixBorderRadius(4px);
		.header-title{
			.mixFont(16px;bold);
			 display: block;
			.mixPaddingTop(5px);
			.mixPaddingLeft(5px);
		}
		.header-tel{
			color:@intro_color;
			display: block;
			.mixPadding(5px;5px;5px;5px);
		}
	}
	.list-content{
		background-color: @white_color;
		.mixPadding(7px;21px;0;16px);
		.list-content-item{
			.mixHeight(53px);
			.lineHeight(53px);
			.mixBorderBottom(1px;solid;#EEEEED);
			.mixWidth(100%);
			.img-user{

				.mixImg(21px;21px);
				.mixMarginRight(13px);
			}
			.img-set{

				.mixImg(21px;24px);
				.mixMarginRight(13px);
			}
			
		}
		.quit-item{

			.mixHeight(47px);
			.lineHeight(47px);
			.mixWidth(100%);
			.img-quit{

				.mixImg(21px;21px);
				.mixMarginRight(13px);
			}
		}

		.arrow-right{
			.mixWidth(6px);
			.mixHeight(12px)
		}
	}
</style>



