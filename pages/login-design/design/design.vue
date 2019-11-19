<template>
	<view  class="position_relative">
		<view class="design-container">
			<login-head name="注册" >
				<block slot="extra">
					<view class="color-regular font-weight-normal font-size-normal">您好！欢迎来到乐象门店助手</view>
				</block>	
			</login-head>
		</view>
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
						   class=" font-size-big font-weight-normal design-info-item-tel-input" @blur="checkTelEvent(mobile)">
				</view>
				<view>
					<text  class="text-gray">{{mobile.length}}/11</text>
				</view>
			</view>
			
			<view class="design-info-item flex justify-between borderBottom position_relative align-center">
				<view class="flex justify-start">
					<image src="../../../static/icon/icon-dneglu-mima@2x.png"
						   class="design-info-item-pwd"></image>
					<input type="text" placeholder="请输入密码"  @blur="checkPwdEvent(token)" v-if="isShowPwd" v-model="token"
						   class="font-size-big font-weight-normal" :class="token?'explain-color':'color-placeholder'">
					<input type="password" placeholder="请输入密码" @blur="checkPwdEvent(token)"
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
				<view class="flex justify-start">
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
		
		<view class="design-submit">
			<button  class="design-submit-btn"  type="primary"
			 :disabled="disabled"
			 @tap="designerSubmit" >注册</button>
		</view>
		<view class="font-size-small font-weight-normal  color-normal flex justify-between submit-intro">
			<view>已有账号？<text class="color-blue" @click="operateClickEvent('login')">登录</text></view>
		</view>
		<view class="copyright font-size-mini font-weight-normal color-normal" v-if="tabbar">
			登录/注册即表示同意<text class="color-blue"  @tap="operateClickEvent('pro')">《门店助手软件用户许可协议》</text>
		</view>
		<loading
				ref="loading"
				:custom="false"
				:shadeClick="true"
				:type="1">
		</loading>
	</view>
</template>
<script>
	import loading from '../../../components/xuan-loading.vue'
	import loginHead from '../../../components/login/login-head.vue'
	export default{
		data(){
			return{
				isShow:false,
				name:'',
				mobile:'',
				token:'',
				vcode:'',
				num:60,
				disabled:true,
				isSend:false,
				isShowPwd:false,
				tabbar:true,//用于键盘，
				windowHeight:'',
				type:'',//用于区分销售人员还是渠道商个人注册
			}
		},
		watch:{
			name(val){this.change()},
			mobile(val){this.change()},
			token(val){this.change()},
			vcode(val){this.change()}
		},
		components:{
			loading,
			loginHead
		},
		onLoad(options){
			if(options.type){
				this.type=options.type;
			}
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
		methods:{
			change(){
				if(this.name && this.mobile && this.token && this.vcode){
					this.disabled=false;
					return;
				}
				this.disabled=true;
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
			check(){
				if(!this.name){
					uni.showToast({
					title:'请输入姓名',
					icon:'none'
					})
					this.close()
					return false;
				}
				if(!this.mobile){
					uni.showToast({
					title:'请输入手机号',
					icon:'none'
					})
					this.close()
					return false;
				}
				if(!this.vcode){
					uni.showToast({
					title:'请输入验证码',
					icon:'none'
					})
					this.close()
					return false;
				}
				if(!this.token){
					uni.showToast({
					title:'请输入密码',
					icon:'none'
					})
					this.close()
					return false;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.token)){
					uni.showToast({
						title:'密码不能含有非法字符，长度在6-12之间',
						icon:'none',
						
					})
					this.close();
					return false;
				}
				if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile))){
					uni.showToast({
						title:'电话号码不存在',
						icon:'none',
						
					})
					this.close();
					return false;
				}
				return true;
			},
			designerSubmit(){
				this.open();
				if(this.check()){
					this.$ajax('Signup',{
						name:this.name,
						token:this.token,
						mobile:this.mobile,
						gender:this.$store.state.genderZn.man,
						// type:this.$store.state.shoperObj.type,
						type:this.type,
						vcode:this.vcode,
					},res=>{
					
						
						uni.showToast({
							title:'用户注册成功',
							icon:'none',
							success:()=>{
								this.close();
								this.disabled=false;
							}
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:"../login/login",
								success: () => {
									this.$fire.fire('login',{
										account:this.mobile,
										token:this.token
									})
									this.close()
								}
							})
						},600)
					},false,(err)=>{
						this.close();
						
					})
				}
				
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
			checkPwdEvent(event){
				if(event){
					var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
					if(reg.test(event)==false){
						uni.showToast({
							title:'密码不能含有非法字符，长度在6-12之间',
							icon:'none'
						})
						return false;
					}
					
				}
			},
			checkTelEvent(event){
				if(!(/^1[34578]\d{9}$/.test(event))){ 
					uni.showToast({
						title:'电话号码不存在',
						icon:'none'
					})
					return;
					
				} 
			}
		}
		
	}
</script>
<style lang="less" >
	@import url('../../../static/css/demo.less');
	page{
		background: #FFFFFF;
	}
	.copyright{
		position:fixed;
		bottom:17px;
		left:59px;
		
	}
	.imgEye{
		.mixWidth(76upx);
		.mixHeight(50upx);
		position: absolute;right:10px;top:24upx;
	}
	.imgEyeOpen{
		.mixWidth(70upx);
		.mixHeight(60upx);
		position: absolute;right:10px;top:24upx;
	}
	.design-container{

		.mixPadding(59px;12px;17px;15px;);
		.design-container-title{
			.mixMarginBottom(4px);

		}

	}
	.design-info{

		.mixPadding(34px;23px;0;15px);
		.mixMarginBottom(28px);
		.design-info-item{

			.mixPadding(16px;10px;16px;0);
			.design-info-item-name{
				.mixImg(22px;22px;);
				.mixMarginRight(15px);

			}
			.design-info-item-input{

				.mixWidth(80%;);
			}
			.design-info-item-tel{
				.mixImg(18px;23px;);
				.mixMarginRight(18px);

			}
			.design-info-item-tel-input{
				.mixWidth(70%;);
			}
			.design-info-item-pwd{
				.mixImg(19px;23px;);
				.mixMarginRight(15px);

			}
			.design-info-item-pwd-img{
				
				.mixWidth(17px);
				.mixHeight(8px);
				

			}
			.design-info-item-pwd-img-show{

				.mixWidth(17px);
				.mixHeight(11px);
			}
			.design-info-item-vscode{
				.mixImg(20px;18px;);
				.mixMarginRight(15px);
			}

		}
		.btn-area{
			color:@bg_color;
			
			.mixPadding(2px;11px;2px;11px;);
			.background(rgba(66,176,237,1));
			.mixBorderRadius(4px);
			.lineHeight(28px);
		}
		.default-btn{
			
			.mixPadding(2px;45px;2px;45px);
			.color(gray);
			.mixBorderRadius(4px);
			.lineHeight(28px)
		}
	}
	.design-submit{
		.mixPadding(0;12px;0;15px);
		.design-submit-btn{
			.mixWidth(100%)
		}

	}
	.submit-intro{
		.mixPadding(0;15px;0;15px;);
		.mixMarginTop(9px);
	}
</style>