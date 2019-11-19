<template>
	<view class="position_relative">
		<view class="findPwd-container">
			<login-head name="密码找回"></login-head>
		</view>
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
					   @blur="checkTelEvent(mobile)"  @focus="hideTabbar()"
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
			
			<view class="design-submit">
				<button  type="primary" :disabled="disabled" @tap="toNextPage">下一步</button>
			</view>
			
		</view>
		<view class=" font-size-small color-normal login_btn_container" >
			<view @tap="toOperate('login')">已有账号?<text class="color-blue" >登录</text></view>
		</view>
		<view class="copyright font-size-mini color-normal font-weight-normal" v-if="tabbar">
			登录/注册即表示同意<text class="color-blue" @tap="toOperate('pro')">《门店助手软件用户许可协议》</text>
		</view>
	</view>
</template>
<script>
	import loginHead from '../../../components/login/login-head.vue'
	export default{
		data(){
			return{
				mobile:'',
				vcode:'',
				isSend:false,
				num:60,
				tabbar:true,
				windowHeight:'',
				disabled:true,
			}
		},
		watch:{
			mobile(val){this.change()},
			vcode(val){this.change()}
		},
		components:{
			loginHead
		},
		methods:{
			change(){
				if(this.mobile && this.mobile != null && this.vcode && this.vcode!=null){
					this.disabled=false;
					return ;
				}
				this.disabled=true;
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
			checkTelEvent(event){
				if(event){
					if(!(/^1[34578]\d{9}$/.test(event))){ 
						uni.showToast({
							title:'电话号码不存在',
							icon:'none'
						})
							return;
					} 
				}
			},
			toNextPage(){
				if(this.check()){
					uni.navigateTo({
						url:'../reset-password/reset-password?mobile='+this.mobile+'&vcode='+this.vcode
					})
				}
			},
			check(){
				if(!this.mobile){
					uni.showToast({
						title:'请输入电话号码',
						icon:'none'
					})
					return false;
				}
				if(!this.vcode){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
					return false;
				}
				return true;
			},
			sendCode(){
				if(!this.mobile){
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
				}else{
					this.$ajax('SendVerCode',{mobile:this.mobile},res=>{
						uni.showToast({
							title:'短信已发送，请注意接受',
							icon:'none'
						})
					},false)
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
			}
		},
		onLoad(){
			this.changeTabbar()
		},
	}
</script>
<style lang="less">
	@import url('../../../static/css/demo.less');
	page{
		.background(#fff)
	}
	.copyright{
		position:fixed;
		left:59px;
		bottom:17px;
	}
	.findPwd-container{

		.mixPadding(102px;15px;17px;22px)
	}
		.findPwd-info{

			.mixPadding(51px;12px;0;15px);
			.findPwd-info-item{

				.mixPadding(26px;0;16px;0);
				.findPwd-info-item-tel-img{
					.mixImg(14px;22px;);
					.mixMarginRight(15px);

				}
				.findPwd-info-item-tel-input,
				.findPwd-info-item-vscode-input{
					.mixWidth(80%)
				}
				.findPwd-info-item-vscode-img{

					.mixImg(21px;15px;);
					.mixMarginRight(15px);
				}

			}
			.btn-area{

				.mixPadding(2px;11px;2px;11px);
				.background(rgba(66,176,237,1));
				.color(#fff);
				.mixBorderRadius(4px);
				right:10px;
				.lineHeight(28px);
			}
			.default-btn{

				.mixPadding(2px;45px;2px;45px);
				.color(gray);
				.mixBorderRadius(4px);
				right:10px;
				.lineHeight(28px);
			}
		}
		.design-submit{

			.mixMarginTop(31px);
		}
	.login_btn_container{
		.mixMarginTop(9px);
		.mixPaddingLeft(15px)
	}
</style>