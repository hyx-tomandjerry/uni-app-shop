<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back font-size-back color-regular"  @click.stop="goBack()"></text></block>
			<block slot="content"><view class="font-size-big color-regular">更换手机号</view></block>
			<!-- <block slot="right"><view style="margin-right: 15px;"
			@click="changeTelNext"
			:class="{'color-noInput':!telephone,'color-blue':telephone}">确定</view ></block> -->
		</cu-custom>
		<view class="borderTop change-container">
			<view class="change-item borderBottom flex justify-between">
				<view>
					<input type="number" maxlength="11" placeholder="请输入手机号" style="font-size:14px;text-align: left;padding-left:20upx;" v-model="telephone">
				</view>
				<view class="color-regular" style="margin-right:20px;">{{telephone.length}}/11</view>
				
			</view>
			<view class="change-item borderBottom justify-between" style="padding-left:15px;">
				<view>
					<input type="number" maxlength="6" placeholder="请输入验证码" style="font-size:14px;" v-model="vscode">
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
					   class="font-size-small"
					   style="padding-left:10px;"
					   :class="pwd?'text-black':'color-placeholder'">
				<input type="password"
					   placeholder="请输入密码"
						v-else
						v-model="pwd"
						class="font-size-small"
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
		<view class="btn-container">
			<button type="primary" :disabled="disabled" :loading="loading" @tap="changeTelNext">确定</button>
		</view>
		
		<showModel :isShow="modalName=='introModel'" @hideModel="hideModal" @confirmDel="hideModal" v-if="modalName=='introModel'">
			<block slot="content">
				<view>修改登录手机号码后，下次</view>
				<view>登录请使用 <text class="color-blue">新的手机号码</text>登录，同时更</view>
				<view>新您的联系方式，登录密码不变。</view>
			</block>
		</showModel>
		
	</view>
</template>
<script>
	import showModel from '../../../../components/show-model'
	import bottomBtnOne from '../../../../components/common/bottom-btn-one.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default{
		data(){
			return{
				telephone:'',
				num:60,
				isSend:false,
				vscode:'',
				modalName:null,
				pwd:'',
				disabled:true,
				loading:false,
				isShowPwd:false
			}
		},
		watch:{
			pwd(val){ this.check()},
			vscode(val){this.check()},
			telephone(val){this.check()}
		},
		components:{
			showModel,
			bottomBtnOne
		},
		methods:{
			showTabbar(){},
			change(){
				if(!this.pwd){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
					return false;
				}
				if(!this.telephone){
					uni.showToast({
						title:'请输入电话号码',
						icon:'none'
					})
					return false;
				}
				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.telephone))){
					uni.showToast({
						title:'电话号码不存在',
						icon:'none'
					})
					return false;
				}
				if(!this.vscode){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
					return false ;
				}
				return true;
			},
			check(){
				if(this.vscode && this.pwd && this.telephone ){
					this.disabled=false;
					return;
				}
				this.disabled=true;
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
			sendCode(){
				if(!this.telephone){
					uni.showToast({
						title:'请输入电话号码!',
						icon:'none'
					})
				}else if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.telephone))){
					uni.showToast({
						title:'电话号码不存在!',
						icon:'none',
						success:()=>{
							this.telephone=null;
						}
					})
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

					this.$ajax('SendVerCode',{
						mobile:this.telephone
					},res=>{
						uni.showToast({
							title:`已经向${this.telephone}发送短信,请查看`,
							icon:'none'
						})
					})

				}
			},
			changeTelNext(){
				this.disabled=true;
				this.loading=true;
				if(this.change()){
					this.$ajax('ChangeMobile',{
						mobile:this.telephone,
						token:this.pwd,
						vcode:this.vscode
					},res=>{
						this.modalName='introModel'
					})
				}
				// this.$ajax('CheckVerCode',{
				// 		mobile:this.telephone,
				// 		code:this.vscode
				// 	},res=>{
				// 		this.modalName='introModel'
				// 	})
				// if(!this.vscode){
				// 	uni.showToast({
				// 		title:'请输入验证码',
				// 		icon:'none'
				// 	})
				// }else{
				// 	this.$ajax('CheckVerCode',{
				// 		mobile:this.telephone,
				// 		code:this.vscode
				// 	},res=>{
				// 		this.modalName='introModel'
				// 	})
				// }
			},
			checkTel(event){
				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event))){
					uni.showToast({
						title:'电话号码不存在!',
						icon:'none'
					})
				}
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			...mapMutations(['logout']),
		},
		onLoad(){

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
