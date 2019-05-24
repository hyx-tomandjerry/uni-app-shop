<template>
	<view class="login_container">
		<view class="title">
			<view class="login_title">设置密码</view>
		</view>
		<view class="login_form">
			<form>
				<view class="cu-form-group position_relative">
					<view class="text-gray">
						<text class="cuIcon-lock text-gray" style="font-size:22px;margin-right:15px;"></text>
					</view>
					<input type="password" placeholder="请输入密码" v-model="designer.pwd" @blur="checkPwdEvent(designer.pwd)" v-if="isShowPwd">
					<input type="text" v-model="designer.pwd" v-else  @input="inputPwd($event)">
					<image 
					@click="showPwd('pwd')"
					v-if="isShowPwd"
					src="../../../static/icon/eye.png" 
					style="width:24rpx;height:24rpx;position: absolute;right:44rpx;"></image>
					<image src="../../../static/icon/eye_open.png" 
					style="width:16px;height:17px;position: absolute;right:44rpx;"
					v-else
					@click="noShowPwd('pwd')"
					></image>
				</view>

				<view class="cu-form-group">
					<view class="text-gray"><text class="cuIcon-lock text-gray" style="font-size:22px;margin-right:15px;"></text></view>
					<input 
					type="password" 
					placeholder="再次输入密码" 
					v-if="isShowConfrimPwd"
					v-model="designer.confirmPwd" 
					@blur="checkPwdEvent(designer.confirmPwd)"
					:style="isSame ? '':sameStyle"
					>
					<input type="text" v-model="designer.confirmPwd" v-else  @input="inputPwd($event)">
					<image 
					@click="showPwd('confirm')"
					v-if="isShowConfrimPwd"
					src="../../../static/icon/eye.png" 
					style="width:24rpx;height:24rpx;position: absolute;right:44rpx;"></image>
					<image src="../../../static/icon/eye_open.png" 
					style="width:16px;height:17px;position: absolute;right:44rpx;"
					v-else
					@click="noShowPwd('confirm')"
					></image>
				</view>
				<view class="passwordSet">密码长度为6-12位，由英文和数字组成</view>
			</form>

			<view class="text-center" style="margin-top:34px;margin-bottom:18rpx;">
				<button 
					@click="resetPassword()"
				class="cu-btn block  margin-tb-sm lg" :class="designer.pwd || designer.confirmPwd ?'inputStyle':'noInputStyle'">
					<text>确定</text>
				</button>
			</view>

		</view>

		<view class="copyright">
			登录/注册即表示同意<text style="color:rgba(66, 176, 237, 1)">乐象工程管家服务协议</text>
		</view>
	</view>
</template>
<script>
    export default{
        data(){
            return{
                isInput:false,//是否输入账号,
				isSame:true,
				isShowPwd:true,
				isShowConfrimPwd:true,
				designer:{
					pwd:'',
					confirmPwd:'',
					mobile:'',
					vcode:''
				},
				sameStyle:{
					color:'red'
				}
            }
        },
        components:{

        },
        onLoad(options){
			this.designer.mobile=options.mobile;
			this.designer.vcode=options.vcode
        },
		methods:{
			noShowPwd(type){
				if(type=='pwd'){
					this.isShowPwd=true;
				}else if(type=='confirm'){
					console.log('kkkk')
					this.isShowConfrimPwd=true;
				}
			
			},
			showPwd(type){
				console.log(type)
				if(type=='pwd'){
						this.isShowPwd=false;
				}else if(type=='confirm'){
					console.log('llll')
					this.isShowConfrimPwd=false;
				}
			},
			resetPassword(){
				if(!this.designer.pwd || !this.designer.confirmPwd){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
				}else{
					if(this.designer.pwd!=this.designer.confirmPwd){
						this.isSame=false;
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
						})
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
					}else{
						this.checkPwd=true;
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
		padding:57px 12px 17px 15px;
		.title{
			padding-left:7px;
			.login_title{
				height:42px;
				line-height:42px;
				font-size:30px;

				font-weight:600;
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
		margin-top:180px;
		margin-left:36px;
		font-size:12px;

		font-weight:400;
		color:rgba(137,136,136,1);
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
