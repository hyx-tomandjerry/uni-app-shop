<template>
	<view>
		<login-common title="密码找回" :tabbar="tabbar" @toPro="toOperate('pro')">
			<block slot="content">
				<view class="findPwd-info">
					<view class="findPwd-info-item flex justify-start borderBottom align-center">
						<image src="../../../static/icon/icon-zhuce-shouji@2x.png"
							   class="findPwd-info-item-tel-img"></image>
						<input type="text" placeholder="请输入手机号"
							   v-model="mobile"
							   :class="{
							   		'color-placeholder':!mobile,
							   		'color-normal':mobile
							   }"
							   class=" font-size-big font-weight-normal findPwd-info-item-tel-input"
								@focus="hideTabbar()"
							   maxlength="11">
						<text class="color-placeholder">{{mobile.length}}/11</text>
					</view>
					
					<view class="findPwd-info-item flex justify-start borderBottom align-center">
						<image src="../../../static/icon/icon-zhuce-youxiang@2x.png"
							   class="findPwd-info-item-vscode-img"></image> 
						<input type="text" placeholder="请输入短信验证码" v-model="vcode" maxlength="8"
							   :class="{
							   		'color-placeholder':!vcode,
							   		'color-normal':vcode
							   }"
							   class="font-size-big font-weight-normal findPwd-info-item-vscode-input"  @blur="showTabbar">
						<button type="default"   v-if="isSend"  class="default-btn font-size-small font-weight-normal position_absolute" >{{num}}s</button>
						<button type="primary"  v-else  class="btn-area font-size-small font-weight-normal position_absolute"   @tap="sendCode">发送验证码</button>
					</view>
				</view>
				<common-btn-one
					:type="btnType" 
					:disabled="disabled" 
					content="下一步"
					@operateBtn="toNextPage" :isPos="false" :isMargin="false"></common-btn-one>
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
	import {SendVerCodeApi} from '../../../api/login_api.js'
	export default{
		components:{loginCommon,commonBtnOne},
		data(){
			return{
				tabbar:true,
				mobile:'',
				vcode:'',
				isSend:false,
				num:60,
				disabled:true,
				btnType:'default',
				windowHeight:''
			}
		},
		watch:{
			mobile(val){this.change()},
			vcode(val){this.change()}
		},
		methods:{
			toLogin(){
				uni.redirectTo({
					url: '../login/login'
				});
			},
			changeTabbar(){
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
			telCheck(){
				if(!this.mobile){
					this.$utils.showToast('请输入电话号码')
					return false;
				}
				if(!(/^1[34578]\d{9}$/.test(this.mobile))){
					this.$utils.showToast('电话号码不存在')
					return false;
				} 
				return true;
			},
			codeCheck(){
				if(!this.vcode){
					this.$utils.showToast('请输入验证码')
					return false;
				}
				return true;
			},
			async sendCode(){
				if(this.telCheck()){
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
			toNextPage(){
				if(this.codeCheck()&&this.telCheck()){
					uni.navigateTo({
						url:'../reset-password/reset-password?mobile='+this.mobile+'&vcode='+this.vcode
					})
				}
			},
			change(){
				if(this.mobile && this.mobile != null && this.vcode && this.vcode!=null){
					this.disabled=false;
					this.btnType='primary'
					return ;
				}
				this.disabled=true;
				this.btnType='default'
			},
			toOperate(type){
				switch(type){
					case 'login':
					uni.navigateBack({
						delta:1
					})
					break;
					case 'pro':
					uni.navigateTo({
						url:"../protocol/protocol"
					})
					break;
				}
			},
			showTabbar(){
				this.tabbar=true;
			},
			hideTabbar(){
				this.tabbar=false;
			},
		}
		
	}
</script>
<style scoped>
	.findPwd-info-item-tel-img{
		width:28upx;
		height:44upx !important;
		margin-right: 30upx;	
	}
	.findPwd-info-item-tel-input,
	.findPwd-info-item-vscode-input{
		width:80%;
	}
	.findPwd-info-item-vscode-img{
		width:42upx;
		height:30upx;
		margin-right: 30upx;
	}
	.findPwd-info-item{
		padding:52upx 0 32upx 0;	
	}
	.findPwd-info{
		margin-bottom:60upx;
		padding:102upx 24upx 0 30upx;
	}
	.default-btn{
		padding:4upx 90upx ;
		color:gray;
		border-radius: 8upx;
		right:50upx;
		line-height:56upx;
	}
	.btn-area{
		padding:4upx 22upx;
		background-color: rgba(66,176,237,1);
		color:#fff;
		border-radius: 8upx;
		right:50upx;
		line-height:56upx;
	}
</style>