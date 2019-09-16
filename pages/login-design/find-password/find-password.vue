<template>
	<view class="position_relative">
		<view class="findPwd-container">
			<view class="font-size-supper font-weight-super text-black">密码找回</view>
		</view>
		<view class="findPwd-info">
			<view class="findPwd-info-item flex justify-start borderBottom align-center">
				<image src="../../../static/icon/icon-zhuce-shouji@2x.png"
					   class="findPwd-info-item-tel-img"></image>
				<input type="text" placeholder="请输入手机号"
					   v-model="designer.mobile"
					   :class="{
					   		'color-placeholder':!designer.mobile,
					   		'color-normal':designer.mobile
					   }"
					   class=" font-size-big font-weight-normal findPwd-info-item-tel-input"
					   @blur="checkTelEvent(designer.mobile)"  @focus="hideTabbar()"
					   maxlength="11">
				<text class="color-placeholder">{{designer.mobile.length}}/11</text>
			</view>
			
			<view class="findPwd-info-item flex justify-start borderBottom align-center">
				<image src="../../../static/icon/icon-zhuce-youxiang@2x.png"
					   class="findPwd-info-item-vscode-img"></image>
				<input type="text" placeholder="请输入短信验证码" v-model="designer.vcode"
					   :class="{
					   		'color-placeholder':!designer.vcode,
					   		'color-normal':designer.vcode
					   }"
					   class="font-size-big font-weight-normal findPwd-info-item-vscode-input"  @blur="showTabbar()">
				<button type="default"   v-if="isSend"  class="default-btn font-size-small font-weight-normal position_absolute" >{{num}}s</button>
				<button type="primary"  v-else  class="btn-area font-size-small font-weight-normal position_absolute"   @click="sendCode()">发送验证码</button>
			</view>
			
			<view class="design-submit">
				<button  :class="{'bg-gray':!designer.mobile,
					'bg-blue':designer.mobile
					}" @click="toNextPage()">下一步</button>
			</view>
			
		</view>
		<view class=" font-size-small color-normal login_btn_container" >
			<view @click="toLogin()">已有账号?<text class="color-blue" >登录</text></view>
		</view>
		<view class="copyright font-size-mini color-normal font-weight-normal" v-if="tabbar">
			登录/注册即表示同意<text class="color-blue" @click="signPro">《门店助手软件用户许可协议》</text>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				designer:{
					mobile:'',
					vcode:''
				},
				isSend:false,
				num:60,
				tabbar:true,
				windowHeight:''
			}
		},
		components:{
			
		},
		methods:{
			signPro(){
				uni.redirectTo({
					url:"../protocol/protocol"
				})
			},
			toLogin(){
				uni.navigateBack({
					delta:1
				})
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
				
				if(!this.designer.mobile || !this.designer.vcode){
					uni.showToast({
						title:'请完善基本信息',
						icon:'none'
					})
				}else{
					
					uni.navigateTo({
						url:'../reset-password/reset-password?mobile='+this.designer.mobile+'&vcode='+this.designer.vcode
					})
				}
			},
			sendCode(){
				if(!this.designer.mobile){
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
				}else{
					this.$ajax('SendVerCode',{mobile:this.designer.mobile},res=>{
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