<template>
	<view>
		<login-common title="设置密码" :tabbar="tabbar" @toPro="signPro">
			<block slot="content">
				<view class="login_form">
					<view class="login-form-item borderBottom flex justify-start position_relative align-center">
						<image src="../../../static/icon/icon-dneglu-mima@2x.png"  class="login-form-item-tel-img"></image>
						<input type="text" placeholder="请输入密码" maxlength="12"
							   v-model="pwd" class="font-weight-normal font-size-big"
							   v-if="isShowPwd" @blur="checkPwdEvent(pwd)" @focus="hideTabbar()">
						<input type="password" placeholder="请输入密码" v-model="pwd" maxlength="12"
							   class="font-weight-normal font-size-big" v-else @blur="checkPwdEvent(pwd)"
							   @focus="hideTabbar()">
				
						<div v-if="isShowPwd" @click="showPwd('pwd')">
							<image src="../../../static/icon/icon-eye-open.png" class="login-form-item-eyeopen-img"></image>
						</div>
						<div v-else  @click="showPwd('pwd')">
							<image src="../../../static/icon/eye.png" class="login-form-item-eye-img"></image>
						</div>
					</view>
					<view class="login-form-item borderBottom flex justify-start position_relative align-center">
						<image src="../../../static/icon/icon-dneglu-mima@2x.png"  class="login-form-item-tel-img"></image>
						<input type="text" placeholder="请再次输入密码" v-model="confirmPwd" class="font-weight-normal font-size-big" v-if="isShowConfrimPwd" @blur="checkPwdEvent(pwd)" maxlength="12">
						<input type="password" placeholder="请再次输入密码" v-model="confirmPwd" class="font-weight-normal font-size-big" v-else @blur="checkPwdEvent(pwd)" maxlength="12">
				
						<div v-if="isShowConfrimPwd" @click="showPwd('confirm')">
							<image src="../../../static/icon/icon-eye-open.png" class="login-form-item-eyeopen-img"></image>
						</div>
						<div v-else  @click="showPwd('confirm')">
							<image src="../../../static/icon/eye.png" class="login-form-item-eye-img"></image>
						</div>
					</view>
					<view class="font-size-mini color-blue" style="margin:10upx 30upx;">
						密码长度为6-12位，由英文和数字组成
					</view>
				</view>
				<common-btn-one
					:type="btnType" 
					:disabled="disabled" 
					content="确定"
					@operateBtn="resetPassword" :isPos="false" :isMargin="false"></common-btn-one>
					<view style="margin-top:20upx;" @tap="toLogin">
						返回<text class="color-blue font-weight-bold">登录</text>
					</view>
			</block>
		</login-common>
	</view>
</template>
<script>
	import loginCommon from '../../../components/login/login-common.vue';
	import commonBtnOne from '../../../components/common/common-btn-one.vue'
	import {InitPwdApi} from '../../../api/login_api.js'
	export default{
		components:{loginCommon,commonBtnOne},
		data(){
			return{
				disabled:false,
				btnType:'default',
				isShowPwd:false,
				isShowConfrimPwd:false,
				designer:{
					mobile:'',
					vcode:''
				},
				tabbar:true,//用于键盘，
				windowHeight:'',
				pwd:'',//密码
				confirmPwd:'',//确认密码				
			}
		},
		watch:{
			pwd(){this.change()},
			confirmPwd(){this.change()}
		},
		onLoad(options){
			uni.getSystemInfo({
				success: (res) => {
					this.windowHeight=res.windowHeight;
				}
			})
			uni.onWindowResize((res)=>{
				if(res.size.windowHeight<this.windowHeight){
					this.tabbar=false;
				}else{
					this.tabbar=true;
				}
			})
			this.designer.mobile=options.mobile;
			this.designer.vcode=options.vcode
		},
		methods:{
			toLogin(){
				uni.redirectTo({
					url: '../login/login'
				});
			},
			async resetPassword(){
				this.showTabbar()
				if(this.check()){
					if(await InitPwdApi(this.designer.vcode,this.confirmPwd,this.designer.mobile)){
						this.$utils.showToast('设置密码成功')
						setTimeout(()=>{
							uni.redirectTo({
								url:'../../login-design/login/login'
							})
						},800)
					}
				
				}
			},
			//验证密码
			checkPwdEvent(event){
				if(event){
					var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
					if(reg.test(event)==false){
						this.$utils.showToast('密码不能含有非法字符，长度在6-12之间')
					}
			
				}
			},
			check(){
				if(!this.pwd || !this.confirmPwd){
					this.$utils.showToast('请填写密码')
					return false;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.pwd) || 
				(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.confirmPwd))){
					this.$utils.showToast('密码不能含有非法字符，长度在6-12之间')
					return false;
				}
				if(this.pwd!=this.confirmPwd){
					this.$utils.showToast('两次输入的密码不一致')
					return false;
				}
				return true;
				
			},
			showTabbar(){
				this.tabbar=true;
			},
			hideTabbar(){
				this.tabbar=false;
			},
			showPwd(type){
				if(type=='pwd'){
						this.isShowPwd=!this.isShowPwd;
				}else if(type=='confirm'){
					this.isShowConfrimPwd=!this.isShowConfrimPwd;
				}
			},
			signPro(){
				// uni.redirectTo({
				// 	url:"../protocol/protocol?type=serve"
				// })
				uni.openDocument({
					filePath:'../../../static/protocol/serve.docx'
				})
			},
			change(){
				if(this.pwd && this.pwd !='' && this.confirmPwd && this.confirmPwd!=''){
					this.disabled=false;
					this.btnType='primary';
					return;
				}
				this.disabled=true;
				this.btnType='default'
			},
		}
	}
</script>
<style scoped>
	.login-form-item-tel-img{
		width:38upx;
		height:46upx !important;
		margin-right: 30upx;
	}
	.login-form-item-eye-img{
		width:60upx;
		height:50upx;
		position: absolute;
		right:22px;top:30px;
		
	}
	.login-form-item-eyeopen-img{
		width:60upx;
		height:50upx;
		position: absolute;
		right:22px;top:30px;
	}
	.login_form{
		margin-top: 100upx;
		margin-bottom: 40upx;
	}
	.login-form-item{
		padding:40upx 24upx 40upx 30upx;
	}
</style>