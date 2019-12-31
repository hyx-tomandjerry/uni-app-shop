<template>
	<view class="position_relative">
		<view class="position_relative">
			<view class="header-content flex justify-between">
				<view class="flex justify-start align-center" @click="operateItem('user')">
					<image :src="userInfo.headurl?userInfo.headurl:'../../../static/img/avatar.jpg'"
						class="user-img"
					></image>
					<view class="flex-1">
						<view class="header-title borderBottom flex align-center" style="width:100%">
							{{userInfo.name || ''}} 
							<text class="color-regular font-size-normal" style="margin-left:10upx;margin-bottom:4upx;" v-if="userInfo.account">({{userInfo.account || ''}})</text>
						</view>
						<view class="color-regular" style="margin-top:10upx;"> 状态 : {{userInfo.status==userStatus.normal?'在职' :''}}</view>
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
					
						@click="operateItem('company')">
						<view class="flex justify-start align-center">
							<image src="../../../static/img/mine/company.png"
							class="img-user"></image>
							<view class="font-size-normal">公司详情</view>
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
					<view class="flex justify-between  align-center list-content-item  flex-all"

						@click="operateItem('quitCompany')">
						<view class="flex justify-start align-center">
							<image src="../../../static/img/mine/quit_company.png"
							class="img-user"></image>
							<view class="font-size-normal">退出公司</view>
						</view>
						<view>
							<image src="../../../static/icon/icon-mine-right.png" class="arrow-right"></image>
						</view>
					</view>
				</view>

			<view class="list-content margin-top-13">
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
		</view>
	</view>

</template>

<script>

	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {getTodoList,RefreshOnlineUser,RemoveSalesman} from '../../../api/common_api.js'
	export default{
		computed:{
			 ...mapState(['userInfo']),
			 userStatus(){return this.config.userStatus}
		},
		
		methods:{
			...mapMutations(['logout','login']),
			async confirmModel(type){
				switch(type){
					case 'company':
						let val={
							shop:0,
							users:this.userInfo.id,
							permanent:1
						}
						let result = await RemoveSalesman(val);
						if(result==0){
							this.$utils.showToast('您已成功退出公司')
							this.logout();
							setTimeout(()=>{
								uni.redirectTo({
									url:'../../login-design/login/login'
								})
							},900)
						}
					break;
					case 'account':
						this.logout();
						uni.redirectTo({
							url:'../../login-design/login/login'
						})
					break;
				}
			},
			async getTodoList(){
				let result =await getTodoList();
				if(result>0){
					uni.setTabBarBadge({
					  index: 1,
					  text:result.toString()
					 
					})
				}else{
					uni.hideTabBarRedDot({
						index:1
					})
				}	
			},
			async refreshInfo(){
				let result =await RefreshOnlineUser();
				if(result.status==this.userStatus.normal){
					this.login(result)			
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
						case 'company':
						uni.navigateTo({
							url:"../../tab-item-content/mine-center/company-info/company-info"
						})
						break;
						case 'password':
						//修改密码
						uni.navigateTo({
							url:'../../tab-item-content/mine-center/edit-password/edit-password'
						})

						break;
						case 'quit':
						uni.showModal({
						    content: '确定要退出该账号?',
						    success:(res)=> {
						        if (res.confirm) {
						            this.confirmModel('account')
						        }
						    }
						});
						break;
						case 'quitCompany':
						uni.showModal({
							content:`确定要退出${this.userInfo.ownerName}吗?`,
							success: (res) => {
								if(res.confirm){
									this.confirmModel('company')
								}
							}
						})
						break;
					}
				}


		},
		onLoad(){
			this.getTodoList();
			this.refreshInfo()
		},
		onShow(){
			this.getTodoList();
			this.refreshInfo()
		}
	}
</script>

<style scoped>
	@import url("./mine.css");
</style>



