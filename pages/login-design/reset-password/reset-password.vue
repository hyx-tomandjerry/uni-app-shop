<template>
	<view class="login_container">
		<view class="title">
			<view class="login_title font-size-supper font-weight-super">设置密码</view>
		</view>
		<view class="login_form">
			<view class="login-form-item borderBottom flex justify-start position_relative align-center">
				<image src="../../../static/icon/icon-dneglu-mima@2x.png"  class="login-form-item-tel-img"></image>
				<input type="text" placeholder="请输入密码"
					   v-model="designer.pwd" class="font-weight-normal font-size-big"
					   v-if="isShowPwd" @blur="checkPwdEvent(designer.pwd)" @focus="hideTabbar()">
				<input type="password" placeholder="请输入密码" v-model="designer.pwd"
					   class="font-weight-normal font-size-big" v-else @blur="checkPwdEvent(designer.pwd)"
					   @focus="hideTabbar()">

				<div v-if="isShowPwd" @click="showPwd('pwd')">
					<image src="../../../static/icon/icon-xianshimima@2x.png" class="login-form-item-eyeopen-img"></image>
				</div>
				<div v-else  @click="showPwd('pwd')">
					<image src="../../../static/icon/icon-yingcangmima@2x.png" class="login-form-item-eye-img"></image>
				</div>
			</view>
			<view class="login-form-item borderBottom flex justify-start position_relative align-center">
				<image src="../../../static/icon/icon-dneglu-mima@2x.png"  class="login-form-item-tel-img"></image>
				<input type="text" placeholder="请再次输入密码" v-model="designer.confirmPwd" class="font-weight-normal font-size-big" v-if="isShowConfrimPwd" @blur="checkPwdEvent(designer.pwd)">
				<input type="password" placeholder="请再次输入密码" v-model="designer.confirmPwd" class="font-weight-normal font-size-big" v-else @blur="checkPwdEvent(designer.pwd)" >

				<div v-if="isShowConfrimPwd" @click="showPwd('confirm')">
					<image src="../../../static/icon/icon-xianshimima@2x.png" class="login-form-item-eyeopen-img"></image>
				</div>
				<div v-else  @click="showPwd('confirm')">
					<image src="../../../static/icon/icon-yingcangmima@2x.png" class="login-form-item-eye-img"></image>
				</div>
			</view>
			
			<view class="text-center btn_container" >
				<button @click="resetPassword()" 
					:class="{
						'inputStyle':designer.pwd || designer.confirmPwd,
						'noInputStyle':! designer.pwd && ! designer.confirmPwd
					}">
					<text>确定</text>
				</button>
			</view>

		</view>

		<view class="copyright font-size-mini" v-if="tabbar">
			登录/注册即表示同意<text class="color-blue" @click="signPro">《门店助手软件用户许可协议》</text>
		</view>
	</view>
</template>
<script>
    export default{
        data(){
            return{
               
	
				isShowPwd:false,
				isShowConfrimPwd:false,
				designer:{
					pwd:'',
					confirmPwd:'',
					mobile:'',
					vcode:''
				},
				tabbar:true,//用于键盘，
				windowHeight:''
            }
        },
        components:{

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
			signPro(){
				uni.redirectTo({
					url:"../protocol/protocol"
				})
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
			resetPassword(){
				this.showTabbar()
				if(!this.designer.pwd || !this.designer.confirmPwd){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
				}else if( (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.designer.pwd)) || (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.designer.confirmPwd))){
					uni.showToast({
						title:'密码不能含有非法字符，长度在6-12之间',
						icon:'none'
					})
				}else if(this.designer.pwd!=this.designer.confirmPwd){
						uni.showToast({
							title:'两次输入的密码不一致',
							icon:'none'
						})
					}else{
						this.$ajax('InitPwd',{
							vcode:this.designer.vcode,
							token:this.designer.confirmPwd,
							mobile:this.designer.mobile
						},res=>{
							uni.setStorageSync('userPsw',this.designer.confirmPwd);
							uni.showToast({
								title:'设置密码成功',
								icon:'none'
							})
							setTimeout(()=>{
								uni.redirectTo({
									url:'../../login-design/login/login'
								})
							},800)
						},false)
					}
			},
			//验证密码
			checkPwdEvent(event){
				if(event){
					var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
					if(reg.test(event)==false){
						uni.showToast({
							title:'密码不能含有非法字符，长度在6-12之间',
							icon:'none'
						})

					}

				}
			},
		}
    }
</script>
<style lang="less">
	@import url(../../../static/css/demo.less);
	page{

		.background(#fff)
	}
	.login_container{
		.mixPadding(113px;12px;17px;15px);
		.title{
			.mixPaddingLeft(7px);
			.login_title{
				.mixHeight(42px);
				.lineHeight(42px);

			}
		}
		.login_form{
			.mixMarginTop(47px);
			.login-form-item{
				.mixPadding(20px;12px;20px;15px);
				.login-form-item-tel-img{
					.mixImg(19px;23px;);
					.mixMarginRight(15px)
				}
				.login-form-item-eye-img{
					width:16px;
					height:9px;
					position: absolute;
					right:22px;top:30px;

				}
				.login-form-item-eyeopen-img{
					width:16px;
					height:14px;
					position: absolute;
					right:22px;top:30px;
				}
			}
		}
	}
	.cu-form-group{
		.mixHeight(77px);
		.lineHeight(77px);
	}
	.cu-form-group uni-input{
		font-size:16px;
		font-weight:400;
		color:rgba(185,185,185,1);

	}
	.cu-form-group+.cu-form-group{
		border-bottom:0.5px solid #eee;
	}
	.cu-btn{
		background:rgba(255,255,255,1);
		border:1px solid rgba(233,233,233,1);
		text{
			font-size:16px;
			font-weight:400;
			color:rgba(137,136,136,1);
		}
	}
	.copyright{
			left:59px;
			color:rgba(137,136,136,1);
			position:fixed;
			bottom:17px;
	}
	.cu-form-group>uni-text{
		font-size:14px;
	}
	.cu-btn uni-text{
		font-size:14px;
		font-weight:400;
		color:#fff;
	}
	.inputStyle{
		.background(rgba(66,176,237,1));
		.color(#fff)
	}
	.noInputStyle{
		.background(rgba(245,246,248,1));
		.color(rgba(137,136,136,1))
	}
	.btn_container{
		/*margin-top:34px;margin-bottom:9px;*/
		.mixMarginBottom(9px);
		.mixMarginTop(34px);
	}
</style>
