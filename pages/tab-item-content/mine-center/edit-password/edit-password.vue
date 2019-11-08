<template>
	<view >
		<cu-custom  isBack="true" bgColor="bg-white">
			 <block slot="left"><view class="cuIcon-back font-size-back" @click.stop="goBack()"></view></block>
			<block slot="content">
				<view class="font-size-big color-normal font-weight-bold">设置登录密码</view>
			</block>
			<!-- <block slot="right">
				<view  style="font-size:16px;width:100px;padding-right:20px;text-align: right;"
				:class="{'text-blue':user.newPwd ||user.confirmPwd ,'text-blue-light':!user.newPwd && !user.confirmPwd }" 
				@click="changePassword()">完成</view>
			</block> -->
		</cu-custom>
		<view>
			<view class="account-content bg-white" >
				当前登录账号<text class="text-blue" style="font-weight: 600;margin-left:8px;">{{userInfo.mobile}}</text>
			</view>
			<view class="form-content bg-white ">
				<view class="form-content-item flex justify-between borderBottom">
					<view class="color-normal font-size-normal"><text class="text-red">*</text>原密码</view>
					<input type="text" v-model="user.pwd" 
						:class="{
							'color-regular':!user.pwd,
							'color-normal':user.pwd
						}"
					placeholder="填写原密码" @blur="checkPwd(user.pwd)" style="text-align: right;">
				</view>
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
				<!-- <view class="vcode flex justify-between borderBottom align-center">
					<input type="number"  placeholder="请输入验证码" style="text-align: left;" v-model="user.vcode"/>
					<button @tap="sendMsg" :disabled="isSend">{{isSend?`点击重新发送(${num})`:'获取验证码'}}</button>
				</view> -->
				
				
				<view class="font-size-litter color-regular margin-top-13">
					密码必须是6-20位的数字、英文组合
				</view>
				<view class="font-size-litter color-blue" style="margin-top:6px;">
					<text  @click="forgetPwd()">忘记密码?</text>
				</view>
			</view>
		</view>
		
		<bottom-btn-one content="确定" @showModal="changePassword"></bottom-btn-one>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	import bottomBtnOne from '../../../../components/common/bottom-btn-one.vue'
	export default {
		computed:mapState(['userInfo']),
		data() {
			return {
				title:'设置登录密码',
				num:60,
				isSend:false,
				user:{
					pwd:'',
					confirmPwd:'',
					newPwd:'',
					vcode:'',//验证码
				}
			}
		},
		components:{
			bottomBtnOne
		},
		methods: {
			//发送验证码
			sendMsg(){
				this.isSend=true;
				this.num=60;
				setInterval(()=>{
					if(this.num<1){
						this.num=0;
						this.isSend=false;
					}else{
						this.num--;
					}
					
				},1000)
			},
			checkPwd(item){
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(item.trim())){
					uni.showToast({
						title:'密码不能含有非法字符，长度在6-12之间',
						icon:'none'
					})
					return;
				}
			},
			changePassword(){
				if(!this.user.confirmPwd || !this.user.newPwd){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
				}else if( (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.user.newPwd.trim()))
						|| 	(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.user.confirmPwd.trim()))){
					uni.showToast({
						title:'密码不能含有非法字符，长度在6-12之间',
						icon:'none'
					})
				}else if(this.user.confirmPwd.trim() !=this.user.newPwd.trim()){
					uni.showToast({
						title:'两次输入的密码不相同',
						icon:'none'
					})
				}else{
					this.$ajax('ResetPwd',{
						token:this.user.confirmPwd.trim(),
						original:this.user.pwd.trim()
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
		
	}
	.form-content{
		
		.mixPadding(27px;12px;8px;18px);
		.form-content-item{
			
			.mixPadding(29px;0;8px;0)
		}
		
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
