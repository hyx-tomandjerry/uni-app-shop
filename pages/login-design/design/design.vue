<template>
	<view class="login_container">
		<view class="title">
			<view class="login_title">注册</view>
			<view class="login_design">您好！欢迎来到乐象门店助手</view>
		</view>
		<view class="login_form">
			<form>
				<view class="cu-form-group position_relative">
					<view class="text-gray"><text class="cuIcon-people text-gray" style="font-size:22px;margin-right:15px;"></text></view>
					<input placeholder="请输入姓名" v-model="designr.name"  type="text" />

				</view>

				<view class="cu-form-group position_relative">
					<view class="text-gray"><text class="cuIcon-mobile text-gray" style="font-size:22px;margin-right:15px;"></text></view>
					<input placeholder="请输入手机号" v-model="designr.mobile"  type="phone" @blur="checkTelEvent(designr.mobile)" />
				</view>

				<view class="cu-form-group  position_relative " >
					<view class="text-gray">
						<text class="cuIcon-lock text-gray" style="font-size:22px;margin-right:15px;"></text>
					</view>
					<input placeholder="密码长度6-12位,英文和数字组成" v-model="designr.token" type="text"
					 @blur='checkPwdEvent(designr.token)'/>
					<text 
					class="cuIcon-roundclose position_absolute" 
					style="right:44rpx;color:gray" v-show="designr.token" @click="clearPwd()"></text>
				</view>

				<view class="cu-form-group position_relative">
					<view class="text-gray"><text class="cuIcon-mail text-gray" style="font-size:22px;margin-right:15px;"></text></view>
					<input placeholder="请输入验证码" v-model="designr.vcode" type="number" name='vcode'/>
					<view class="position_absolute" style="right:10px;">
						<button class="cu-btn block bg-blue margin-tb-sm"
						style="background:rgba(66,176,237,1);border-radius:4px;height:28px;line-height:28px;">
						<text class="code">获取验证码</text>
						</button>
					</view>
				</view>
			</form>
			<view class="text-center" style="margin-top:34px;margin-bottom:18rpx;" >
				<button  :class="designr.name||designr.token || designr.mobile?'inputStyle':'noInputStyle'"  @click="design()">
					<text >注册</text></button>
			</view>
			<view class="forget">已有账号?
			<text style="color:rgba(66, 176, 237, 1);margin-left:10px;" @click="toLogin()">登录</text>
			</view>
		</view>
		<view class="copyright" >
			登录/注册即表示同意<text style="color:rgba(66, 176, 237, 1)">乐象工程管家服务协议</text>
		</view>
		<pop-modal :isShow="isShow">
			<block slot="content">
				<text v-if="modalName=='exit'">该手机号已存在</text>
				<text v-if="modalName=='success'">注册成功</text>
			</block>
		</pop-modal>
	</view>
</template>
<script>
	
	import popModal from '../../../components/popmodal.vue'
	var _this;
	export default{
		data(){
			return{
				designr:{
					name:'',
					mobile:'',
					token:'',
					vcode:''
				},
				isShow:false,
				modalName:'',
				checkTel:false,
				checkPwd:false
				
			}
		},
		components:{
			popModal	
		},
		onLoad(){

		},
		methods:{
			//登录
			toLogin(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			//注册
			design(){
				var _this=this;
				if(this.checkPwd && this.checkTel){
					uni.request({
						url:this.$store.state.url,
						data:{
							name:this.designr.name,
							token:this.designr.token,
							mobile:this.designr.mobile,
							gender:1,
							type:4,
							vcode:this.designr.vcode,
							f:'Signup'
						},
						success:(res)=>{
							if(res.data.data==-2){
								this.isShow=true;
								this.modalName='exit'
								setTimeout(function(){
									this.isShow=false;
									this.modalName=''
								},2000)
							}else{
								console.log(res)
								console.log(this.designr)
								this.isShow=true;
								this.modalName='success'
								setTimeout(()=>{
									this.isShow=false;
									this.modalName='',
									console.log('1111')
									console.log(this.designr.mobile)
									uni.navigateTo({
										url:'../login/login?account='+this.designr.mobile+'&token='+this.designr.token
									})
								},500)
							}
							
						}
					})
				}else{
					uni.showToast({
						title:'所填内容不符合规则',
						icon:'none'
					})
				}
				
			},
			hideModal(e) {
				this.modalName = null;
				this.isShow=false;
			},
			clearPwd(event){
				this.designr.token=''
			},
			checkTelEvent(event){
				console.log(event)
				if(event){
					if(!(/^1[34578]\d{9}$/.test(event))){ 
						
							uni.showToast({
								title:'电话号码不存在',
								icon:'none'
							})
						} else{
							this.checkTel=true;
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
			}
				
			
		}
	}
</script>
<style lang="less">
		page{
			background:#fff;
		}
		.login_container{
			padding:47px 12px 17px 15px;
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
					width:195px;
					height:21px;
					font-size:15px;

					font-weight:400;
					
					line-height:21px;


				}
			}
			.login_form{
				margin-top:28px;
			}
			.forget{
				font-size:14px;

				font-weight:400;
				color:rgba(42,42,42,1);
				height:20px;
				line-height:20px;
			}

		}
		.cu-form-group{
			height:60px;
			line-height:60px;
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
			}
		}
		.copyright{
			margin-top:99px;
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
