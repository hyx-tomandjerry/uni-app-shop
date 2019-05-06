<template>
	<view class="login_container">
		<view class="title">
			<view class="login_title">密码找回</view>
		</view>
		<view class="login_form">
			<form>
				<view class="cu-form-group position_relative">
					<view class="text-gray"><text class="cuIcon-lock text-gray" style="font-size:22px;margin-right:15px;"></text></view>

					<input type="text" placeholder="请输入手机号" v-model="designer.mobile" @blur="checkTelEvent(designer.mobile)">
					<text class="cuIcon-roundclose position_absolute" style="right:44rpx;" v-show="isInput"></text>
				</view>

				<view class="cu-form-group position_relative">
					<view class="text-gray"><text class="cuIcon-mail text-gray" style="font-size:22px;margin-right:15px;"></text></view>

					<input type="text" placeholder="请输入验证码" v-model="designer.vcode">
					<view class="position_absolute">
						<button class="cu-btn block bg-blue margin-tb-sm"
						style="background:rgba(66,176,237,1);border-radius:4px;height:28px;line-height:28px;">
						<text class="code">获取验证码</text>
						</button>
					</view>
				</view>

			</form>
			<view class="text-center" style="margin-top:34px;margin-bottom:18rpx;">
				<button
				@click="toResetPassword()"
				class=" block  margin-tb-sm lg"
				:class="designer.mobile||designer.vcode?'inputStyle':'noInputStyle'" 
				>
					<text>下一步</text>
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
				checkTel:false,
				designer:{
					mobile:'',
					vcode:''
				}
			}
		},
		components:{

		},
		onLoad(){

		},
		methods:{
			//重置密码
			toResetPassword(){
				if(this.checkTel){
					uni.navigateTo({
						url:'../reset-password/reset-password'
					})
				}else{
					uni.showToast({
						title:'号码不存在',
						icon:'none'
					})
					return;
				}
				
			},
			checkTelEvent(event){
				if(event){
					if((/^1[34578]\d{9}$/.test(event))){ 
						this.checkTel=true;
			
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
				margin-top:53px;
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
			margin-top:202px;
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
		.inputStyle{
			background:rgba(66,176,237,1);
			color:#fff;
		}
		.noInputStyle{
			background:rgba(245,246,248,1);
			color:rgba(137,136,136,1);
		}
</style>
