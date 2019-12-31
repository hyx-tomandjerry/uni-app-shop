<template>
	<view>
		<view class="borderTop change-container font-size-normal">
			<view class="change-item borderBottom flex justify-between">
				<view>
					<input type="number" maxlength="11" placeholder="请输入手机号" 
					@blur="checkTel(telephone)"
					style="text-align: left;padding-left:20upx;" v-model="telephone">
				</view>
				<view class="color-regular" style="margin-right:20px;">{{telephone.length}}/11</view>
				
			</view>
			<view class="change-item borderBottom justify-between" style="padding-left:15px;">
				<view>
					<input type="number" maxlength="6" placeholder="请输入验证码" v-model="vscode">
				</view>
				<button class="cu-btn bg-blue" @tap="sendCode" :disabled="num<60&&num>0">
					<text>发送验证码</text>
					<text v-show="isSend">({{num}})</text>
				</button>
			
			</view>
			<view class="change-item flex justify-between borderBottom position_relative align-center">
				<input type="text"
					   placeholder="请输入密码"
					   v-if="isShowPwd"
					   v-model="pwd"
					   style="padding-left:10px;"
					   :class="pwd?'text-black':'color-placeholder'">
				<input type="password"
					   placeholder="请输入密码"
						v-else
						v-model="pwd"
						 style="padding-left:20upx;"
						:class="pwd?'text-black':'color-placeholder'">
				<div v-if="isShowPwd" @click="showPwd()" class="flex-1" style="height:100%;">
					<image src="../../../../static/icon/zhengkaiyanjing.png" class="imgEye" ></image>
				</div>
				<div v-else @click="showPwd()" class="flex-1"  style="height:100%;">
					<image src="../../../../static/icon/eye.png" class="imgEyeOpen"></image>
				</div>
			</view>
			
			
		</view>
		<common-btn-one
			:type="btnType" 
			:disabled="disabled" 
			content="确定"
			@operateBtn="changeTelNext" :isPos="false"></common-btn-one>
			
		
	</view>
</template>
<script>
	import commonBtnOne from '../../../../components/common/common-btn-one.vue'
	import {SendVerCodeApi} from '../../../../api/login_api.js'
	import {ChangeMobileApi} from '../../../../api/mine_api.js'
	import {mapMutations} from 'vuex';
	export default{
		data(){
			return{
				telephone:'',
				num:60,
				isSend:false,
				vscode:'',
				modalName:null,
				pwd:'',
				disabled:false,
				isShowPwd:false,
				btnType:'default'
			}
		},
		watch:{
			pwd(val){ this.change()},
			vscode(val){this.change()},
			telephone(val){this.change()}
		},
		components:{
			commonBtnOne
		},
		methods:{
			check(){
				if(!this.pwd){
					this.$utils.showToast('请输入密码')
					return false;
				}
				if(!this.telephone){
					
					this.$utils.showToast('请输入电话号码')
					return false;
				}
				if(!(/^1[34578]\d{9}$/.test(this.telephone))){
					
					this.$utils.showToast('电话号码不存在')
					return false;
				}
				if(!this.vscode){
					this.$utils.showToast('请输入验证码')
					
					return false ;
				}
				return true;
			},
			change(){
				if(this.vscode && this.pwd && this.telephone ){
					this.disabled=false;
					this.btnType='primary'
					return;
				}
				this.disabled=true;
				this.btnType='default'
			},
			showPwd(){
				this.isShowPwd=!this.isShowPwd;
			},
			hideModal(){
				this.modalName=null;
				this.logout();
				uni.redirectTo({
					url:'../../../login-design/login/login'
				})
			},
			//发送验证码
			async sendCode(){
				if(!this.telephone){
					
					this.$utils.showToast('请输入电话号码')
				}else if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.telephone))){
					this.$utils.showToast('电话号码不存在')
					this.telephone=null;
				}else{
					this.isSend=true;
					this.num=10;
					setInterval(()=>{
						if(this.num>0){
							this.num--;
						}else{
							this.num=0;
							this.isSend=false;
						}
					},1000)
					if(await SendVerCodeApi(this.telephone)){
						this.$utils.showToast(`已经向${this.telephone}发送短信,请查看`)
						
					}
				
				}
			},
			async changeTelNext(){
				
				if(this.check()){
					this.disabled=true;
					if(await ChangeMobileApi(this.telephone,this.pwd,this.vscode)){
						uni.showModal({
							content:`修改登录手机号码后，下次登录请使用新的手机号码登录，同时更新您的联系方式，登录密码不变。`,
							success: (res) => {
								if(res.confirm){
									this.logout();
									uni.redirectTo({
										url:'../../../login-design/login/login'
									})
								}else if(res.cancel){
									this.logout();
									uni.redirectTo({
										url:'../../../login-design/login/login'
									})
								}
							}
						})
						
					}
					this.disabled=false;
				}
			},
			checkTel(event){
				if(!(/^1[34578]\d{9}$/.test(event))){
					this.$utils.showToast('电话号码不存在')
				}
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			...mapMutations(['logout']),
		},
	}
</script>
<style lang="less">
	page,
	uni-page{
		background:#fff;
	}
		.color-noInput{
			color:#B6DEFB
		}
		.item{
			height:51px;
			line-height:51px;
			padding-right:12px;
			padding-left: 15px;
		}
	.change-container{
		padding:0 15px;

		.change-item{
			align-items: baseline;
			padding-top:32px;
			padding-bottom:7px;
			display: flex;

		}
	}
	.btn-container{
	
		margin:60upx 20upx;
	}
	.login-form-item{
		padding:40upx 24upx 40upx 30upx;
	}
	.imgPwd{
		width:44upx;
		height:54upx;
		margin-right:30upx;
	
	}
	.imgEye{

		width:76upx;
		height:50upx;
		position: absolute;right:16px;top:20px;
	}
	.imgEyeOpen{
		width:70upx;
		height:60upx;
		position: absolute;right:16px;top:40upx;
	}
</style>
