<template>
	<view class="login_container">
		<view class="title">
			<view class="login_title">登录</view>
			<view class="login_design">还没有账号,&nbsp;<text style="color:rgba(66, 176, 237, 1);margin-left:10px;" @click="toDesign()">立即注册</text></view>
		</view>
		<view class="login_form">
			<form>
				<view class="cu-form-group position_relative">
					<view class="text-gray"><text class="cuIcon-people text-gray" style="font-size:22px;margin-right:15px;"></text></view>
					<input placeholder="请输入账号" 
					@input="inputAccount($event)"
					 v-model="designer.account" type="text"></input>
				</view>
				<view class="cu-form-group  position_relative " >
					<view class="text-gray">
						<text class="cuIcon-lock text-gray" style="font-size:22px;margin-right:15px;"></text>
					</view>
					<input placeholder="请输入密码"  
					@input="inputPwd($event)"
					v-model="designer.token" type="password" v-if="isShowPwd"></input>
					<input type="text" v-model="designer.token" v-else @input="inputPwd($event)">
					<image 
					@click="showPwd()"
					v-if="isShowPwd"
					src="../../../static/icon/eye.png" 
					style="width:24rpx;height:24rpx;position: absolute;right:44rpx;"></image>
					<image src="../../../static/icon/eye_open.png" 
					style="width:16px;height:17px;position: absolute;right:44rpx;"
					v-else
					@click="noShowPwd()"
					></image>
				</view>
			</form>
			<view class="text-center" style="margin-top:34px;margin-bottom:18rpx;">
				
				<button  class="inputStyle" v-if="isShow" @click="loginEvent()">登录</button>
				<button  class=" noInputStyle" v-else>登录</button>
			</view>
			<view class="forget" @click="toFindPassword()">忘记密码?</view>
		</view>
		<view class="copyright">
			登录/注册即表示同意<text style="color:rgba(66, 176, 237, 1)">乐象工程管家服务协议</text>
		</view>
	</view>
</template>
<script>
	import popModal from '../../../components/popmodal.vue'
	export default{
		data(){
			return{
				designer:{
					account:'',
					token:''
				},
				isShow:false,
				isShowPwd:true,//显示密码
			}
		},
		components:{
			popModal
		},
		onLoad(option){
			if(option){
				this.designer.account=option.account;
				this.designer.token=option.token;
				this.isShow=true;
			}
			
			
		},
		methods:{
			noShowPwd(){
				this.isShowPwd=true;
			},
			showPwd(){
				this.isShowPwd=false;
			},
			inputAccount(event){
				this.isShow=true;
			},
			inputPwd(event){
				this.isShow=true;
			},
			//注册
			toDesign(){
				uni.navigateTo({
					url:'../design/design'
				})
			},
			//忘记密码
			toFindPassword(){
				uni.navigateTo({
					url:'../find-password/find-password'
				})
			},
			loginEvent(){
				this.$ajax('Login',{
					user:this.designer.account,
					token:this.designer.token
				},res=>{
					if(res.code == -1){
						uni.showToast({
							title: `账号或者密码错误`,
							mask: false,
							icon:'none',
							duration: 1500
						})
						
					}else{
						if(res.type!=4){
							uni.showToast({
								title: `您的账号无法在“门店助手”登录`,
								mask: false,
								icon:'none',
								duration: 1500
							})
						}else{
							this.$store.commit('setUserInfo',res);
							uni.setStorage({
								key: 'userInfo',
								data: res,
								success: (res) => {
									uni.showToast({
										title:'登录成功',
										icon:'none'
									})
									setTimeout(function(){
										uni.switchTab({
											url:'../../tab-item/index/index'
										})
									},500)
								}
							});
							uni.getStorage({
								key:'userInfo',
								success: (res) => {
									console.log(res)
								}
							})
							
						}
					}
				},false)
// 				uni.request({
// 					
// 					url:this.$store.state.url+'Login',
// 					data:{
// 						user:this.designer.account,
// 						token:this.designer.token
// 					},
// 					success: (res) => {
// 						if(res.data.code == -1){
// 							uni.showToast({
// 								title: `账号或者密码错误`,
// 								mask: false,
// 								icon:'none',
// 								duration: 1500
// 							})
// 							
// 						}else{
// 							if(res.data.data.type!=4){
// 								uni.showToast({
// 									title: `您的账号无法在“门店助手”登录`,
// 									mask: false,
// 									icon:'none',
// 									duration: 1500
// 								})
// 							}else{
// 								this.$store.commit('setUserInfo',res.data.data);
// 								uni.setStorage({
// 									key: 'userInfo',
// 									data: res.data.data,
// 									success: (res) => {
// 										uni.showToast({
// 											title:'登录成功',
// 											icon:'none'
// 										})
// 										setTimeout(function(){
// 											uni.switchTab({
// 												url:'../../tab-item/index/index'
// 											})
// 										},500)
// 									}
// 								});
// 								uni.getStorage({
// 									key:'userInfo',
// 									success: (res) => {
// 										console.log(res)
// 									}
// 								})
// 								
// 							}
// 						}
// 
// 
// 					}
// 				})
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
				margin-top:23px;
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
			border:1px solid rgba(233,233,233,1);
			text{
				font-size:16px;

				font-weight:400;

			}
		}
		.copyright{
			margin-top:173px;
			margin-left:36px;
			font-size:12px;

			font-weight:400;
			color:rgba(137,136,136,1);
		}
		.cu-form-group>uni-text{
			font-size:14px;
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
