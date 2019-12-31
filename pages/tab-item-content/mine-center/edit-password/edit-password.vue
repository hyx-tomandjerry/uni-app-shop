<template>
	<view >
		<view class="borderTop font-size-normal">
			<view class="account-content bg-white" >
				当前登录账号<text class="text-blue" style="font-weight: 600;margin-left:8px;">{{userInfo.mobile}}</text>
			</view>
			<view class="form-content bg-white ">
				<view class="form-content-item flex justify-between borderBottom">
					<view class="color-normal font-size-normal"><text class="text-red">*</text>原密码</view>
					<input type="text" v-model="pwd" 
						:class="{
							'color-regular':!pwd,
							'color-normal':pwd
						}"
						
					placeholder="填写原密码" style="text-align: right;">
				</view>
				<view class="form-content-item flex justify-between borderBottom">
					<view class="color-normal font-size-normal"><text class="text-red">*</text>新密码</view>
					<input type="text" v-model="newPwd" 
						:class="{
							'color-regular':!newPwd,
							'color-normal':newPwd
						}"
						
					placeholder="填写新密码"  style="text-align: right;">
				</view>
			
				<view class="form-content-item borderBottom flex justify-between" style="margin-bottom:18px;">
					<view class="color-normal font-size-normal"><text class="text-red">*</text>确认密码</view>
					<input type="text" v-model="confirmPwd" 
					:class="{
						'color-regular':!newPwd,
						'color-normal':newPwd
					}"
					
					placeholder="再次填写确认" style="text-align: right;">
				</view>
			
				
				<view class=" color-regular margin-top-13">
					密码必须是6-20位的数字、英文组合
				</view>
				<view class=" color-blue" style="margin-top:6px;">
					<text  @click="forgetPwd()">忘记密码?</text>
				</view>
			</view>
		</view>
		
		<common-btn-one
			:type="btnType" 
			:disabled="disabled" 
			content="确定"
			:loading="loading"
			@operateBtn="changePassword" :isPos="true"></common-btn-one>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import {ResetPwdApi} from '../../../../api/mine_api.js'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				pwd:'',
				confirmPwd:'',
				newPwd:'',
				btnType:'default',
				disabled:false,
				loading:false
			}
		},
		components:{
			commonBtnOne
		},
		watch:{
			pwd(){this.change()},
			confirmPwd(){this.change()},
			newPwd(){this.change()}
		},
		methods: {
			change(){
				if(this.pwd && this.pwd !="" && this.confirmPwd && this.confirmPwd !="" && this.newPwd && this.newPwd !="" ){
					this.btnType='primary';
					this.disabled=false;
					return;
				}
				this.btnType='default';
				this.disabled=true;
			},			
			checkPwd(item){
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(item.trim())){
					this.$utils.showToast('密码必须是6-20位的数字、英文组合')
					return;
				}
			},
			check(){
				if(!this.pwd){
					this.$utils.showToast('请输入原密码')
					return false;
				}
				if(!this.newPwd){
					this.$utils.showToast('请输入新密码')
					return false;
				}
				if(!this.confirmPwd){
					
					this.$utils.showToast('请输入确认密码')
					return false;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.pwd.trim())){
					
					this.$utils.showToast('原密码格式输入错误，必须是6-20位的数字、英文组合')
					return false;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.newPwd.trim())){
					this.$utils.showToast('新密码格式输入错误，必须是6-20位的数字、英文组合')
					return false;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.confirmPwd.trim())){
				
					this.$utils.showToast('确认密码格式输入错误，必须是6-20位的数字、英文组合')
					return false;
				}
				
				if(this.confirmPwd.trim() !=this.newPwd.trim()){
					this.$utils.showToast('两次输入的密码不相同')
					return false;
				}
				return true;
			},
			async changePassword(){
				if(this.check()){
					this.disabled=true;
					this.loading=true;
					if(await ResetPwdApi(this.confirmPwd.trim(),this.pwd.trim())){
						this.$utils.showToast('登录密码设置成功')
						this.logout(this.userInfo);
						setTimeout(()=>{
							uni.redirectTo({
								url:"../../../login-design/login/login"
							})
						},500)
					}
					this.disabled=false;
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
		
	}
	.form-content{
		padding:54upx 30upx 16upx 36upx;
		
		
	}
	.form-content-item{
		padding:58upx 0 18upx 0;
	}
	.text-blue-light{
		color:#B6DEFB
	}
	.uni-input-placeholder{
		text-align: left;
	}
	.vcode{
		padding:10upx 
	}
	.vcode>button{
		margin:0;
		font-size:24upx;
		height:56upx;
		line-height:56upx;
		background:rgba(66,176,237,1);
		border-radius:4px;
		color:#fff;
		text-align: center;
	}
</style>
