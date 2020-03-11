<template>
	<view>
		<login-common title="注册" :tabbar="tabbar" @toPro="operateClickEvent('pro')" :isLogin="false" :isDesign="true">
			<block slot="head-extra">
				<view class="head-extra font-size-normal color-regular" >
					您好！欢迎来到乐象门店助手
				</view>
			</block>
			<block slot="content">
				<view class="design-info">
					<view class="design-info-item flex justify-start borderBottom align-center">
						<image src="../../../static/icon/icon-dneglu-zhanghu@2x.png" class="design-info-item-name"></image>
				
						<input type="text" placeholder="请输入姓名" v-model="name"
							   :class="name?'explain-color':'color-placeholder'"
							   class=" font-size-big font-weight-normal design-info-item-input"  @focus="hideTabbar()">
					</view>
					
					<view class="design-info-item flex justify-between borderBottom align-center">
						<view class="flex justify-start">
							<image src="../../../static/icon/icon-zhuce-shouji@2x.png" class="design-info-item-tel"></image>
							
							<input type="number" placeholder="请输入手机号"
								   maxlength="11"
								   v-model="mobile"
								   :class="mobile?'explain-color':'color-placeholder'"
								   class=" font-size-big font-weight-normal design-info-item-tel-input" >
						</view>
						<view>
							<text  class="text-gray">{{mobile.length}}/11</text>
						</view>
					</view>
					
					<view class="design-info-item flex justify-between borderBottom position_relative align-center">
						<view class="flex justify-start">
							<image src="../../../static/icon/icon-dneglu-mima@2x.png"
								   class="design-info-item-pwd"></image>
							<input type="text" placeholder="请输入密码"   v-if="isShowPwd" v-model="token"
								   class="font-size-big font-weight-normal" :class="token?'explain-color':'color-placeholder'">
							<input type="password" placeholder="请输入密码" 
								   v-else v-model="token" class="font-size-big font-weight-normal"
								   :class="token?'explain-color':'color-placeholder'">
						</view>
						
						<view style="width:200upx;height:20px;">
							<view v-if="isShowPwd" @click="showPwd()">
								<image src="../../../static/icon//zhengkaiyanjing.png"
									   class="imgEye"
							
								></image>
							</view>
							<view v-else @click="showPwd()">
								<image  
										src="../../../static/icon/eye.png"
									  class="imgEyeOpen"></image>
							</view>
						</view>
						
						
					</view>
					
					<view class="design-info-item flex justify-between borderBottom position_relative align-center">
						<view class="flex justify-start align-center">
							<image src="../../../static/icon/icon-zhuce-youxiang@2x.png"
								   class="design-info-item-vscode"></image>
							
							<input type="number" placeholder="请输入验证码" v-model="vcode"
								   :class="vcode?'explain-color':'color-placeholder'"
								   class=" font-size-big font-weight-normal" style="width:80%" @blur="hideTabbar()">
						</view>
						<view>
							<button type="default"   v-if="isSend"  class="default-btn font-size-small font-weight-normal " >{{num}}s</button>
							<button type="primary"  v-else  class="btn-area font-size-small font-weight-normal "   @click="sendCode()">发送验证码</button>
						</view>
						
					</view>
				</view>
				<loading
						ref="loading"
						:custom="false"
						:shadeClick="true"
						:type="1">
				</loading>
				<common-btn-one
					:type="btnType" 
					:disabled="disabled" 
					content="注册"
					@operateBtn="designerSubmit" :isPos="false"></common-btn-one>
					<view class="font-size-small font-weight-normal  color-normal flex justify-between submit-intro">
						<view>已有账号？<text class="color-blue" @click="operateClickEvent('login')">登录</text></view>
					</view>
			</block>
		</login-common>
	</view>
</template>
<script>
	import loginCommon from '../../../components/login/login-common.vue'
	import loading from '../../../components/common/xuan-loading.vue'
	import commonBtnOne from '../../../components/common/common-btn-one.vue'
	import {SignupApi,SendVerCodeApi} from '../../../api/login_api.js'
	export default{
		components:{loginCommon,commonBtnOne,loading},
		data(){
			return{
				tabbar:true,
				name:'',
				mobile:'',
				token:'',
				vcode:'',
				num:60,
				disabled:true,
				isSend:false,
				isShowPwd:false,
				windowHeight:'',
				btnType:'default'
			}
		},
		watch:{
			name(){this.change()},
			mobile(){this.change()},
			token(){this.change()},
			vcode(){this.change()}
		},
		onShow(){
			this.tabbar=true;
		},
		methods:{
			codeBeforeCheck(){
				if(!this.mobile){
					this.$utils.showToast('请输入手机号')
					this.close()
					return false;
				}
				if(!this.name){
					this.$utils.showToast('请输入姓名')
					this.close()
					return false;
				}
				if(!this.token){
					this.$utils.showToast('请输入密码')
					this.close()
					return false;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.token)){
					this.$utils.showToast('密码不能含有非法字符，长度在6-12之间')
					this.close();
					return false;
				}
				if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile))){
					this.$utils.showToast('电话号码不存在')
					this.close();
					return false;
				}
				return true;
			},
			check(){
				if(!this.vcode){
					this.$utils.showToast('请输入验证码')
					this.close()
					return false;
				}
				return true;
			},
			async sendCode(){
				if(this.codeBeforeCheck()){
					if(await SendVerCodeApi(this.mobile)){
						this.$utils.showToast('短信已发送，请注意接受');
						this.isSend=true;
						this.num=60;
						setInterval(()=>{
							if(this.num>0){
								this.num--
							}
							if(this.num==0){
								this.isSend=false;
							}
						},1000)
					}
				}
				
				
			},
			async designerSubmit(){
				this.open();
				if(this.check() && this.codeBeforeCheck()){
					let val={
						name:this.name,
						token:this.token,
						mobile:this.mobile,
						gender:this.config.genderZn.man,
						type:this.config.shoperObj.type,
						vcode:this.vcode,
					}
					if(await SignupApi(val)){
						this.$utils.showToast('用户注册成功')
						this.close();
						setTimeout(()=>{
							uni.redirectTo({
								url:"../login/login",
								success: () => {
									this.$fire.fire('login',{
										account:this.mobile,
										token:this.token
									})
									uni.setStorage({
									    key: 'remeber',
									    data:false,
									});
									this.close()
								}
							})
						},600)
					}
					this.disabled=false;
					this.close()
				}
				
			},
			change(){
				if(this.name && this.mobile && this.token && this.vcode){
					this.disabled=false;
					this.btnType='primary'
					return;
				}
				this.disabled=true;
				this.btnType='default'
			},
			close(){
				 this.$refs.loading.close();
			},
			open(){
				this.$refs.loading.open();
			},
			showTabbar(){
				this.tabbar=true;
			},
			hideTabbar(){
				this.tabbar=false;
			},
			showPwd(){
				this.isShowPwd=!this.isShowPwd;
			},
			operateClickEvent(type){
				switch(type){
					case 'login':
						uni.redirectTo({
							url:'../login/login'
						})
						break;
					case 'pro':
						uni.navigateTo({
							url:"../protocol/protocol"
						})
						break;
				}
			},
			
		},
		onLoad(){
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
		},
	}
</script>
<style scoped >
	.head-extra{
		margin-top: 16upx;
	}
	.design-info{
		margin-bottom: 40upx;
	}
	.design-info-item-name{

		width:44upx;
		height:44upx;
		margin-right: 30upx;
		flex-shrink: 0;
		
	}
	.design-info-item-input{
		width:80%;
		
	}
	.design-info-item-tel{
		width:36upx;
		height:46upx !important;
		margin-right: 30upx;
		flex-shrink: 0;
		
		
	}
	.design-info-item-tel-input{
		width:70%;
	}
	.design-info-item-pwd{
		width:38upx;
		height:46upx!important;
		margin-right: 30upx;
		flex-shrink: 0;
		
	}
	.design-info-item-pwd-img{
		width:34upx;
		height:16upx!important;
		flex-shrink: 0;
		
		
	}
	.design-info-item-pwd-img-show{
		width:34upx;
		height:22upx !important;
		flex-shrink: 0;
	}
	.design-info-item-vscode{
		width:40upx;
		height:36upx !important;
		flex-shrink: 0;
		margin-right: 30upx;
	}
	.design-info-item{
		padding:32upx 20upx 32upx 0;
	}

	.btn-area{
		
		color:#FFFFFF;
		padding:4upx 22upx;
		background:rgba(66,176,237,1);
		border-radius: 8upx;
		line-height:56upx;
	}
	.default-btn{
		padding:4upx 90upx;
		color:gray;
		border-radius: 8upx;
		line-height:56upx;
	}
	.imgEye{
		width:76upx;
		height:50upx !important;
		flex-shrink: 0;
		position: absolute;right:20upx;top:24upx;
	}
	.imgEyeOpen{
		width:70upx;
		height:60upx !important;
		flex-shrink: 0;
		position: absolute;right:20upx;top:24upx;
	}
	.submit-intro{
		margin-top: 20upx;
	}
</style>