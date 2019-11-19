<template>
	<view class="position_relative">
		<view class="position_relative">
			<view class="header-content flex justify-between">
				<view class="flex justify-start align-center" @click="operateItem('user')">
					<image :src="userInfo.headurl?userInfo.headurl:'../../../static/img/avatar.jpg'"
						class="user-img"
					></image>
					<view class="flex-1">
						<view class="header-title borderBottom">{{userInfo.name || ''}}</view>
						<view class="color-regular"> 状态 : {{userInfo.status==userStatus.normal?'在职' :''}}</view>
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
					<view class="flex justify-between  align-center list-content-item  flex-all"

						@click="operateItem('company')">
						<view class="flex justify-start align-center">
							<image src="../../../static/img/mine/set.png"
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

			<showModel :isShow="modalName=='quitAccount'" @hideModel="hideModal()" @confirmDel="confirmModel('account')" v-if="modalName=='quitAccount'">
				<block slot="content">确定要退出登录吗?</block>
			</showModel>
			<showModel :isShow="modalName=='quitCompany'" @hideModel="hideModal()" @confirmDel="confirmModel('company')" v-if="modalName=='quitCompany'">
				<block slot="content">确定要退出<text class="color-blue font-weight-bold">{{userInfo.ownerName}}</text>吗?</block>
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
				modalName:""

			}
		},
		onLoad(){
		},
		methods:{
			...mapMutations(['logout','login']),
			confirmModel(type){
				switch(type){
					case 'company':
						this.$ajax('RemoveSalesman',{
							shop:0,
							users:this.userInfo.id,
							permanent:1
						},res=>{
							uni.showToast({
								title:'您已成功退出公司',
								icon:'none'
							})
							this.hideModal();
							this.logout();
							uni.redirectTo({
								url:'../../login-design/login/login'
							})
						})
					break;
					case 'account':
						this.hideModal();
						this.logout();
						uni.redirectTo({
							url:'../../login-design/login/login'
						})
					break;
				}
			},
			
			hideModal(type){

				this.modalName=null;

			},
			getTodoList(){
				this.$ajax('MyEventNumbers',{},res=>{
					if(res>0){
						uni.setTabBarBadge({
						  index: 1,
						  text:res.toString()
						
						})
					}
				})
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
						this.modalName="quitAccount"
						break;
						case 'company':
						this.modalName="quitCompany"
						break;
					}
				}


		},
		onLoad(){
			this.getTodoList()
		}
	}
</script>

<style scoped>
	@import url("./mine.css");
</style>



