<template>
	<view >
		<cu-custom  isBack="true" bgColor="bg-white">
			 <block slot="left"><view class="cuIcon-back font-size-back" @click.stop="goBack()"></view></block>
			<block slot="content">
				<view class="font-size-big color-normal font-weight-bold">设置登录密码</view>
			</block>
			<block slot="right">
				<view  style="margin-right:15px;"
				:class="{'text-blue':user.newPwd ||user.confirmPwd ,'text-blue-light':!user.newPwd && !user.confirmPwd }" 
				@click="changePassword()">完成</view>
			</block>
		</cu-custom>
		<view>
			<view class="account-content bg-white" >
				当前登录账号<text class="text-blue" style="font-weight: 600;margin-left:8px;">{{userInfo.mobile}}</text>
			</view>
			<view class="form-content bg-white ">
				<!-- <view class="form-content-item flex justify-between borderBottom">
					<view class="form-title text-black"><text class="text-red">*</text>原密码</view>
					<input type="text" v-model="user.pwd" placeholder="请输入您的原密码" style="text-align: right;">
				</view>
			 -->
				<view class="form-content-item flex justify-between borderBottom">
					<view class="color-normal font-size-normal"><text class="text-red">*</text>新密码</view>
					<input type="text" v-model="user.newPwd" 
						:class="{
							'color-regular':!user.newPwd,
							'color-normal':user.newPwd
						}"
					placeholder="填写新密码" @blur="checkPwd(user.newPwd)" style="text-align: right;">
				</view>
			
				<view class="form-content-item borderBottom flex justify-between" style="margin-bottom:18px;">
					<view class="color-normal font-size-normal"><text class="text-red">*</text>确认密码</view>
					<input type="text" v-model="user.confirmPwd" 
					:class="{
						'color-regular':!user.newPwd,
						'color-normal':user.newPwd
					}"
					placeholder="再次填写确认" @blur="checkPwd(user.confirmPwd)" style="text-align: right;">
				</view>
				<view class="font-size-litter color-regular">
					密码必须是6-20位的数字、英文组合
				</view>
				<view class="font-size-litter color-blue" style="margin-top:6px;">
					<text  @click="forgetPwd()">忘记密码?</text>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				title:'设置登录密码',
				user:{
					pwd:'',
					confirmPwd:'',
					newPwd:''
				}
			}
		},
		components:{
			
		},
		methods: {
			checkPwd(item){
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(item)){
					uni.showToast({
						title:'密码不能含有非法字符，长度在6-12之间',
						icon:'none'
					})
				}
			},
			changePassword(){
				if(!this.user.confirmPwd || !this.user.newPwd){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
				}else if((!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.user.newPwd)) || (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.user.confirmPwd))){
					uni.showToast({
						title:'密码不能含有非法字符，长度在6-12之间',
						icon:'none'
					})
				}else if(this.user.confirmPwd !=this.user.newPwd){
					uni.showToast({
						title:'两次输入的密码不相同',
						icon:'none'
					})
				}else{
					this.$ajax('ResetPwd',{
						token:this.user.confirmPwd,
						original:this.user.pwd
					},res=>{
						uni.showToast({
							title:'设置登录密码成功',
							icon:'none'
						})
						this.logout(this.userInfo)
						setTimeout(()=>{
							uni.redirectTo({
								url:"../../../login-design/login/login"
							})
						},500)
					})
				}
				
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			forgetPwd(){
				uni.navigateTo({
					url:'../../../login-design/find-password/find-password'
				})
			},
			...mapMutations(['logout','login']),

		},
		onLoad(){

		}
	}
</script>

<style lang="less">
	@import "../../../../static/css/demo";
	page{
		background: @white_color;
	}
	uni-input{
			text-align:right
	}

	.account-content{
		text-align:center;
		.mixWidth(100%);
		.mixPadding(33px;0;22px;0);
		.mixFont(16px);
		.mixFontFamily(PingFangSC-Regular);
		.color(rgba(137,136,136,1));
		/*width:100%;*/
		/*padding-top:33px;*/
		/*padding-bottom:32px;*/
		/*font-size:16px;*/
		/*font-family:PingFangSC-Regular;*/
		/*font-weight:400;*/
		/*color:rgba(137,136,136,1);*/
	}
	.form-content{
		/*padding:27px 12px 8px 18px;*/
		.mixPadding(27px;12px;8px;18px);
		.form-content-item{
			/*padding:29px 0px 8px 0px;*/
			.mixPadding(29px;0;8px;0)
		}
		/*.pwd-desc{*/
			/*font-size:13px;*/

			/*color:rgba(137,136,136,1);*/
			/**/
			/*margin-bottom:2px;*/
		/*}*/
		/*.forget-pwd{*/
		
			/*font-size:13px;*/
			/*font-family:PingFangSC-Regular;*/
			/*font-weight:400;*/
			/*color:rgba(66,176,237,1);*/
			/*padding-bottom:280px;*/
		/*}*/
	}
	.text-blue-light{
		color:#B6DEFB
	}
</style>
