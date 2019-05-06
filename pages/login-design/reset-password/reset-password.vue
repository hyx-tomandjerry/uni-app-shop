<template>
	<view class="login_container">
		<view class="title">
			<view class="login_title">重置密码</view>
		</view>
		<view class="login_form">
			<form>
				<view class="cu-form-group position_relative">
					<view class="text-gray">
						<text class="cuIcon-lock text-gray" style="font-size:22px;margin-right:15px;"></text>
					</view>
					<input type="text" placeholder="请输入密码" v-model="designer.pwd" 
					@blur="checkPwdEvent(designer.pwd)">
					<text class="cuIcon-roundclose position_absolute" style="right:44rpx;" v-show="isInput" ></text>
				</view>

				<view class="cu-form-group">
					<view class="text-gray"><text class="cuIcon-lock text-gray" style="font-size:22px;margin-right:15px;"></text></view>
					<input 
					type="text" 
					placeholder="再次输入密码" 
					v-model="designer.confirmPwd" 
					:style="isSame ? '':sameStyle"
					@blur="checkConfirmEvent(designer.confirmPwd)">
				</view>
				<view class="passwordSet">密码长度为6-12位，由英文和数字组成</view>
			</form>

			<view class="text-center" style="margin-top:34px;margin-bottom:18rpx;">
				<button class="cu-btn block  margin-tb-sm lg" :class="designer.pwd || designer.confirmPwd ?'inputStyle':'noInputStyle'">
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
				designer:{
					pwd:'',
					confirmPwd:''
				},
				sameStyle:{
					color:'red'
				}
            }
        },
        components:{

        },
        onLoad(){

        },
		methods:{
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
			checkConfirmEvent(event){
				var _this=this;
				if(this.designer.pwd!=event){
					_this.isSame=false;
					uni.showToast({
						title:'两次输入的密码不一致',
						icon:'none'
					})
				}
			}
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
