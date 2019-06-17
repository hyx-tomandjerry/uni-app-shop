<template>
	<view class="login_container">

		<view class="title">
			<view class="font-size-supper font-weight-super" >登录</view>
			<view class="color-normal font-size-normal font-weight-normal">还没有账号,&nbsp;<text style="margin-left:10px;" class="color-blue" @click="toDesign()">立即注册</text></view>
		</view>
		<view class="login_form">
			<view class="login-form-item flex justify-start borderBottom">
				<!-- <text class="cuIcon-people text-gray" style="font-size:22px;margin-right:13px;"></text> -->
				<image src="../../../static/icon/common/client.png" style="width:24px;height:24px;margin-right:15px;vertical-align: middle;"></image>
				<input type="text" placeholder="请输入账号" v-model="designer.account" style="width:78%;" class="font-size-big font-weight-normal" :class="designer.account?'text-black':'color-placeholder'">
				<text class="text-gray">{{designer.account.length}}/11</text>
			</view>
			<view class="login-form-item flex justify-start borderBottom position_relative">
				<!-- <text class="cuIcon-lock text-gray" style="font-size:22px;margin-right:13px;"></text> -->
				<image src="../../../static/icon/common/lock.png" style="width:24px;height:24px;margin-right:15px;vertical-align: middle;"></image>
				<input type="text" placeholder="请输入密码"  @blur="checkPwdEvent(designer.token)" v-if="isShowPwd" v-model="designer.token" class="font-size-big font-weight-normal" :class="designer.token?'text-black':'color-placeholder'">
				<input type="password" placeholder="请输入密码" @blur="checkPwdEvent(designer.token)" v-else v-model="designer.token" class="font-size-big font-weight-normal" :class="designer.token?'text-black':'color-placeholder'">

				<image src="../../../static/icon/eye_open.png"
					v-if="isShowPwd"
					@click="showPwd()"
				 style="width:44rpx;height:44rpx;position: absolute;right:44rpx;top:30px;" ></image>
				<image src="../../../static/icon/eye.png"  style="width:44rpx;height:44rpx;position: absolute;right:44rpx;top:30px;"
					v-else
					@click="showPwd()"
				 ></image>

			</view>

			<view class="text-center" style="margin-top:31px;margin-bottom:18rpx;">

				<button  @click="loginEvent()"
					:disabled="isInput"
				:class="{
					'inputStyle':designer.account || designer.token,
					'noInputStyle':!designer.account && !designer.token
				}">登录</button>

			</view>
			<view class="font-size-normal font-weight-normal color-normal" @click="toFindPassword()">忘记密码?</view>
		</view>
		<view class="copyright">
			登录/注册即表示同意<text style="color:rgba(66, 176, 237, 1)">《乐象工程管家服务协议》</text>
		</view>

		<view class="cu-modal" :class="modalName=='resignModal'?'show':''">
			<view class="cu-dialog bg-white">
				<view class="cu-bar justify-center" style="background:rgba(247,248,253,1)">
					<view class="font-weight-bold" style="font-size:19px;color:rgba(51,51,51,1);">注册类型</view>
				</view>
				<view class=" flex " style="margin-top:9px;margin-bottom:20px;">
					<view class="resign-item" style="border-right:1px solid #EEEEED;padding:10px 40px 10px 20px;" @click="resignOperate('alone')">
						<image src="../../../static/img/resign/alone.png" style="width:35px;height:35px;vertical-align: middle;margin-right:10px;"></image>
						<text class="font-size-small font-weight-bold text-blue">个人注册</text>
					</view>
					<view class="resign-item"  @click="resignOperate('company')" style="padding:10px 20px 10px 20px;">
						<image src="../../../static/img/resign/company.png" style="width:35px;height:35px;vertical-align: middle;margin-right:10px;"></image>
						<text class="font-size-small font-weight-bold text-blue">代理商注册</text>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>
<script>
	import popModal from '../../../components/popmodal.vue';
    import im from '../../../common/im'
	import {
		mapState,
	    mapMutations
	} from 'vuex';
	export default{
		computed: mapState(['hasLogin','userInfo']),
		data(){
			return{
				designer:{
					account:'',
					token:''
				},
				isShowPwd:false,//显示密码
				isInput:false,
				modalName:''
			}
		},
		components:{
			popModal
		},
		onLoad(){

			// uni.getStorage({
			// 	key:'userInfo',
			// 	success: (res) => {
			// 		uni.clearStorage();
			// 	}
			// })
			this.$fire.on('login',res=>{
					this.inInput=false;
					this.designer.account=res.account;
					this.designer.token=res.token;
			})


		},
		methods:{
			resignOperate(type){
				switch(type){
					case 'alone':
					this.hideModal()
					uni.navigateTo({
						url:'../design/design'
					})
					break;
					case 'company':
					this.hideModal()
					uni.navigateTo({
						url:'../design_company/design_company'
					})
					break;
				}
			},
			hideModal(){
				this.modalName=null;
			},
			checkPwdEvent(event){
				if(event){
					var reg=/^[a-zA-Z0-9]{6,12}$/;
					if(reg.test(event)==false){
						uni.showToast({
							title:'密码不能含有非法字符，长度在6-12之间',
							icon:'none'
						})
						return false;
					}

				}
			},
			showPwd(){

				this.isShowPwd=!this.isShowPwd;
			},

			//注册
			toDesign(){
				this.modalName='resignModal'
			},
			//忘记密码
			toFindPassword(){

				uni.navigateTo({
					url:'../find-password/find-password'
				})
			},
			loginEvent(){
				if(!this.designer.account || !this.designer.token){
					uni.showToast({
						title: '请输入账号或密码',
						icon:'none'
					});
				}else{
					this.$ajax('Login',{
						user:this.designer.account,
						token:this.designer.token
					},res=>{

						if(res.type!=this.$store.state.ownerType){
							uni.showToast({
								title: `您的账号无法在“门店助手”登录`,
								mask: false,
								icon:'none',
								duration: 1500
							})
						}else{
                            // this.$store.commit('setUserInfo',res)
							this.login(res);
                            im.webimLogin()
							console.log(this.userInfo)
							this.isInput=true;
							uni.showToast({
								title:'登录成功',
								icon:'none'
							})
							setTimeout(()=>{
								uni.switchTab({
									url:'../../tab-item/index/index',

								})
							},500)
							// uni.setStorage({
							// 	key: 'userInfo',
							// 	data: res,
							// 	success: (data) => {
							// 		this.isInput=true;
							// 		uni.showToast({
							// 			title:'登录成功',
							// 			icon:'none'
							// 		})
							//
							// 		setTimeout(()=>{
							// 			uni.switchTab({
							// 				url:'../../tab-item/index/index',
							//
							// 			})
							// 		},500)
							// 	}
							// });

						}

					},false)
				}
			},
			// loginEvent(){
			// 	uni.getStorage({
			// 		key:'userInfo',
			// 		success: (res) => {
			//
			// 			uni.removeStorage({
			// 				key:'userInfo'
			// 			})
			// 		},
			// 		fail: () => {
			//
			// 			if(!this.designer.account || !this.designer.token){
			// 				uni.showToast({
			// 					title: '请输入账号或密码',
			// 					icon:'none'
			// 				});
			// 			}else{
			// 				this.$ajax('Login',{
			// 					user:this.designer.account,
			// 					token:this.designer.token
			// 				},res=>{
			// 					if(res.code == -1){
			// 						uni.showToast({
			// 							title: `账号或者密码错误`,
			// 							mask: false,
			// 							icon:'none',
			// 							duration: 1500
			// 						})
			//
			// 					}else{
			// 						if(res.type!=4){
			// 							uni.showToast({
			// 								title: `您的账号无法在“门店助手”登录`,
			// 								mask: false,
			// 								icon:'none',
			// 								duration: 1500
			// 							})
			// 						}else{
			//
			// 							uni.setStorage({
			// 								key: 'userInfo',
			// 								data: res,
			// 								success: (data) => {
			// 									this.isInput=true;
			// 									uni.showToast({
			// 										title:'登录成功',
			// 										icon:'none'
			// 									})
			//
			// 									setTimeout(()=>{
			// 										uni.switchTab({
			// 											url:'../../tab-item/index/index',
			//
			// 										})
			// 									},500)
			// 								}
			// 							});
			//
			//
			// 						}
			// 					}
			// 				},false)
			// 			}
			// 		}
			// 	})
			//
			// }
			 ...mapMutations(['login'])
		}
	}
</script>

<style lang="less">
	.cu-dialog{
		min-width:331px;
	}
		page{
			background:#fff;
		}
		.login_container{
			padding:90px 12px 17px 15px;
			.title{
				padding-left:7px;
// 				.login_title{
// 					height:42px;
// 					line-height:42px;
// 					font-size:30px;
//
// 				}
// 				.login_design{
// 					font-size:15px;
//
// 					font-weight:400;
// 					color:rgba(137,136,136,1);
// 					height:21p;
// 					line-height:21px;
//
//
// 				}
			}
			.login_form{
				margin-top:32px;
				.login-form-item{
					padding:20px 12px 20px 15px;
				}
			}
// 			.forget{
// 				font-size:14px;
//
// 				font-weight:400;
// 				color:rgba(42,42,42,1);
// 			}

		}
// 		.cu-form-group{
// 			height:77px;
// 			line-height:77px;
// 		}
// 		.cu-form-group uni-input{
// 			font-size:16px;
// 			font-weight:400;
// 			color:rgba(185,185,185,1);
//
// 		}
// 		.cu-form-group+.cu-form-group{
// 			border-bottom:0.5px solid #eee;
// 		}
// 		.cu-btn{
// 			border:1px solid rgba(233,233,233,1);
// 			text{
// 				font-size:16px;
// 				font-weight:400;
//
// 			}
// 		}
		.copyright{
			margin-top:173px;
			margin-left:36px;
			font-size:12px;
			font-weight:400;
			color:rgba(137,136,136,1);
		}
		// .cu-form-group>uni-text{
		// 	font-size:14px;
		// }
		.inputStyle{
			background:rgba(66,176,237,1);
			color:#fff;
		}
		.noInputStyle{
			background:rgba(245,246,248,1);
			color:rgba(137,136,136,1);
		}
</style>
