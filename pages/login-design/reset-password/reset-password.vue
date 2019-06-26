<template>
	<view class="login_container">
		<view class="title">
			<view class="login_title font-weight-super">设置密码</view>
		</view>
		<view class="login_form">
			<view class="login-form-item borderBottom flex justify-start position_relative">
				<view class="cuIcon-lock text-gray" style="font-size:23px;margin-right:21px;"></view>
				<input type="password" placeholder="请输入密码" v-model="designer.pwd" class="font-weight-normal font-size-big" v-if="isShowPwd" @blur="checkPwdEvent(designer.pwd)" @focus="hideTabbar()">
				<input type="text" placeholder="请输入密码" v-model="designer.pwd" class="font-weight-normal font-size-big" v-else @blur="checkPwdEvent(designer.pwd)" @focus="hideTabbar()">
				<image
				v-if="isShowPwd"
				@click="showPwd('pwd')"
				src="../../../static/icon/eye.png"
				style="width:30rpx;height:30rpx;position: absolute;right:44rpx;top:30px;"></image>
				<image
				@click="showPwd('pwd')"
				
				v-else
				src="../../../static/icon/eye_open.png"
				style="width:30rpx;height:30rpx;position: absolute;right:44rpx;top:30px;"></image>
				
			</view>
			<view class="login-form-item borderBottom flex justify-start position_relative">
				<view class="cuIcon-lock text-gray" style="font-size:23px;margin-right:21px;"></view>
				<input type="password" placeholder="请再次输入密码" v-model="designer.confirmPwd" class="font-weight-normal font-size-big" v-if="isShowConfrimPwd" @blur="checkPwdEvent(designer.pwd)">
				<input type="text" placeholder="请再次输入密码" v-model="designer.confirmPwd" class="font-weight-normal font-size-big" v-else @blur="checkPwdEvent(designer.pwd)" >
				
				
				<image
				v-if="isShowConfrimPwd"
				@click="showPwd('confirm')"
				src="../../../static/icon/eye.png"
				style="width:30rpx;height:30rpx;position: absolute;right:44rpx;top:30px;"></image>
				<image
				@click="showPwd('confirm')"
				v-else
				src="../../../static/icon/eye_open.png"
				style="width:30rpx;height:30rpx;position: absolute;right:44rpx;top:30px;"></image>
			</view>
			
			<view class="text-center" style="margin-top:34px;margin-bottom:18rpx;">
				<button @click="resetPassword()" 
					:class="{
						'inputStyle':designer.pwd || designer.confirmPwd,
						'noInputStyle':! designer.pwd && ! designer.confirmPwd
					}">
					<text>确定</text>
				</button>
			</view>

		</view>

		<view class="copyright" v-if="tabbar">
			登录/注册即表示同意<text style="color:rgba(66, 176, 237, 1)">《乐象工程管家服务协议》</text>
		</view>
	</view>
</template>
<script>
    export default{
        data(){
            return{
               
	
				isShowPwd:true,
				isShowConfrimPwd:true,
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
				}else{
					if(this.designer.pwd!=this.designer.confirmPwd){
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
							uni.showToast({
								title:'设置密码成功',
								icon:'none'
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:'../../login-design/login/login'
								})
							},800)
						},false)
					}

				}
			},
			//验证密码
			checkPwdEvent(event){
				if(event){
					var reg=/^[a-zA-Z0-9]{6,12}$/;
					if(reg.test(event)==false){
						uni.showToast({
							title:'密码不能含有非法字符，长度在6-12之间',
							icon:'none'
						})
						return;
					}

				}
			},
		}
    }
</script>
<style lang="less">
	page{
		background:#fff;
	}
	.login_container{
		padding:113px 12px 17px 15px;
		.title{
			padding-left:7px;
			.login_title{
				height:42px;
				line-height:42px;
				font-size:30px;
				color:rgba(42,42,42,1);

			}
			.login_design{
				font-size:15px;

				font-weight:400;
				color:rgba(137,136,136,1);
				height:21p;
				line-height:21px;


			}
		}
		.login_form{
			margin-top:47px;
			.login-form-item{
				padding:20px 12px 20px 15px;
			}
		}
		.forget{
			font-size:14px;

			font-weight:400;
			color:rgba(42,42,42,1);
		}

	}
	.cu-form-group{
		height:77px;
		line-height:77px;
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
			font-size:12px;
			font-weight:400;
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
	.passwordSet{
		margin-top:8px;
		height:20px;
		font-size:14px;

		font-weight:400;
		color:rgba(66,176,237,1);
		line-height:20px;
		margin-bottom:25px;
	}
	.inputStyle{
		background:rgba(66,176,237,1);
		color:#fff;
	}
	.noInputStyle{
		background:rgba(245,246,248,1);
		color:rgba(137,136,136,1);
	}
</style>
