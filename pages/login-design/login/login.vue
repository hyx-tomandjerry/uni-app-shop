<template>
	<view class="login_container position_relative">
		<login-head name="登录">
			<block slot="extra">
				<view class="color-normal font-size-normal font-weight-normal">
					<text class="color-regular">还没有账号,</text>&nbsp;
					<text style="margin-left:10px;" class="color-blue" @tap="toOperate('design')">
						立即注册
					</text>
				</view>
			</block>
		</login-head>
		<view class="login_form">
			<view class="login-form-item flex justify-start borderBottom align-center">
				<image src="../../../static/icon/icon-denglu-account.png"  class="imgAccount"></image>
				<input type="number" placeholder="请输入账号"
						v-model="account"
						style="flex:1;padding-right:80upx;"
						class="font-size-big font-weight-normal"
						:class="account?'text-black':'color-placeholder'"
						@focus="hideTabbar()"
						@blur="checkTelEvent(account)"
						maxlength="11">
				<text class="text-gray" style="width:80upx;">{{account.length}}/11</text>
			</view>
			<view class="login-form-item flex justify-start borderBottom position_relative align-center">
				<image src="../../../static/icon/icon-denglu-pwd.png"  class="imgPwd"></image>
				<input type="text"
					   placeholder="请输入密码"
					   @blur="showTabbar()"
					   v-if="isShowPwd"
					   v-model="token"
					   class="font-size-big font-weight-normal"
					   :class="token?'text-black':'color-placeholder'">
				<input type="password"
					   placeholder="请输入密码"
						@blur="showTabbar()"
						v-else
						v-model="token"
						class="font-size-big font-weight-normal"
						:class="token?'text-black':'color-placeholder'">
				<div v-if="isShowPwd" @click="showPwd()" class="flex-1" style="width:200upx;height:100%;">
					<image src="../../../static/icon/zhengkaiyanjing.png" class="imgEye" ></image>
				</div>
				<div v-else @click="showPwd()" class="flex-1"  style="height:100%;width:200upx">
					<image src="../../../static/icon/eye.png" class="imgEyeOpen"></image>
				</div>
			</view>

			<view class="text-center btn_container" >

				<button  @tap="loginEvent" type="primary"
						:disabled="disabled"
						>登录</button>

			</view>
			<view class="font-size-normal font-weight-normal color-normal flex justify-between align-center" >
				<text @tap="toOperate('forget')">忘记密码?</text>
				<view @tap="remeberPwd" class="flex align-center">
					<text :class="checked?'cuIcon-squarecheck':'cuIcon-square'"></text>
					<text style="margin-left:6upx;">记住密码</text>
				</view>
			</view>
		</view>
		<view class="copyright font-size-mini color-regular" v-if="tabbar">
			登录/注册即表示同意<text class="color-blue" @tap="toOperate('pro')">《门店助手软件用户许可协议》</text>
		</view>
		<loading
				ref="loading"
				:custom="false"
				:shadeClick="true"
				:type="1">
			<!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>
<script>

    import im from '../../../common/im'
	import loading from '../../../components/xuan-loading.vue'
	import loginHead from '../../../components/login/login-head.vue'
	import {
		mapState,
	    mapMutations
	} from 'vuex';
	export default{
		computed: mapState(['hasLogin','userInfo','shoperObj','user','userStatus','shopType','remeber']),
		data(){
			return{
				checked:false,
				disabled:true,
				account:'',
				token:'',
				isShowPwd:false,//显示密码
				tabbar:true,//用于键盘隐藏，
				windowHeight:'',

			}
		},
		watch:{
			account(val){this.change()},
			token(val){this.change()}
		},
		onShow(){

			if(this.remeber){
				console.log(this.remeber)
				this.checked=this.remeber;
				const userName=uni.getStorageSync('userName');
				const userPsw=uni.getStorageSync('userPsw');
				console.log(userName)
				console.log(userPsw)
				if(userName&& userPsw){
					this.account=userName,
					this.token=userPsw
				}else{
					this.account="",
					this.token=""
				}
				// uni.getStorage({
				// 	key:'userInfo',
				// 	success: (res) => {
				// 		 if(res.data.status==this.userStatus.normal){
				// 			uni.switchTab({
				// 				url:"../../tab-item/index/index"
				// 			})
				// 		}

				// 	}
				// })
			}

		},
		onLoad(){
			this.changeTabbar()
			this.$fire.on('login',res=>{
					this.inInput=false;
					this.account=res.account;
					this.token=res.token;
			})


		},

		methods:{
			changeTabbar(){
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
			change(){
				if(this.account && this.account !=null && this.token && this.token!=null){
					this.disabled=false;
					return;
				}
				this.disabled=true;
			},
			remeberPwd(){
				this.checked=!this.checked;
				this.setRember(this.checked)
			},
			close(){
				 this.$refs.loading.close();
			},
			open(){
				this.$refs.loading.open();
			},
			//验证电话号码
			checkTelEvent(event){
				if(event){
					if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(event))){
						uni.showToast({
							title:'电话号码不存在',
							icon:'none'
						})
					}
					return;
				}
			},
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
			showPwd(){
				this.isShowPwd=!this.isShowPwd;
			},
			toOperate(type){
				switch(type){
					case 'design':
					uni.navigateTo({
						url:"../design/design?type="+this.shoperObj.type
					})
					break;
					case 'forget':
					uni.navigateTo({
						url:'../find-password/find-password'
					})
					break;
					case 'pro':
					uni.navigateTo({
						url:"../protocol/protocol"
					})
					break;
				}
			},
			toLogin(account,token){

				this.open();
				setTimeout(()=>{
					this.$ajax("Login",{
						user:account,
						token:token
					},res=>{
						if(res.type==this.shoperObj.type){
							this.login(res);
							// im.webimLogin()
							this.close();
							uni.showToast({
								title:'登录成功',
								icon:'none'
							})

							uni.setStorageSync('userName', account);
							uni.setStorageSync('userPsw',token);
							setTimeout(()=>{
								if(this.userInfo.status==this.userStatus.free){
									uni.redirectTo({
										url:"../../tab-item/search-company/search-company"
									})
									this.disabled=false;
								}else if(this.userInfo.status==this.userStatus.normal){
									uni.switchTab({
										url:"../../tab-item/index/index"
									})
									this.disabled=false;
								}
							},500)
						}else{

							setTimeout(()=>{
								uni.showToast({
									title: `您的账号无法在“门店助手”登录`,
									mask: false,
									icon:'none',
									duration: 1500,
									success:()=>{
										this.close();
									}
								})
							},800)


						}
					},false,code=>{
						if(code == -1){
							uni.showToast({
								title: `账号或者密码不正确`,
								mask: false,
								icon:'none',
								duration: 1500,
								success:()=>{
									this.close()
								}
							})


						}
					})
				},1000)

			},
			check(){
				if(!this.account){
					uni.showToast({
						title:'请输入账号',
						icon:'none'
					})
					return;
				}
				if(!this.token){
					uni.showToast({
						title:'请输入密码',
						icon:'none'
					})
					return}
				if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.account)){
					uni.showToast({
						title:'电话号码不存在',
						icon:'none'
					})
					return;
				}
				if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.token)){
					uni.showToast({
						title:'密码格式不正确',
						icon:'none'
					})
					return;
				}
				return true;
			},
			loginEvent(){
				if(this.check()){
					this.disabled=true;
					this.toLogin(this.account,this.token);
				}
			},

			 ...mapMutations(['login','setAccount','setRember'])
		},
		components:{loading,loginHead}
	}
</script>

<style lang="less">
	@import url('../../../static/css/demo.less');
	.cuIcon-square,.cuIcon-squarecheck{
		font-size:22px;
		color:rgba(137,136,136,1);
	}
	.cu-dialog{
		min-width:331px;
	}
	page{

		.background(#fff);
	}
	.login_container{

		.mixPadding(90px;12px;17px;15px);
			.title{

				.mixPaddingLeft(7px)
			}
			.login_form{

				.mixMarginTop(32px);
				.login-form-item{
					.mixPadding(20px;12px;20px;15px);

				}
				.btn_container{
					.mixMarginTop(31px);
					.mixMarginBottom(9px);
				}
			}
	}

	.copyright{
		left:59px;
		position:fixed;
		bottom:17px;
	}
	.inputStyle{
		.background(rgba(66,176,237,1));
		.color(#fff)
	}
	.noInputStyle{
		.background(rgba(245,246,248,1));
		.color(rgba(137,136,136,1))
	}
	.imgAccount{

		.mixImg(22px;22px;);
		.mixMarginRight(15px);
	}
	.imgPwd{
		.mixImg(22px;26px;);
		.mixMarginRight(15px);

	}
	.imgEye{
		.mixWidth(76upx);
		.mixHeight(50upx);
		position: absolute;right:22px;top:20px;
	}
	.imgEyeOpen{
		.mixWidth(70upx);
		.mixHeight(60upx);
		position: absolute;right:22px;top:40upx;
	}
	.resign-shop{
		// border-right:1px solid #EEEEED;
		.mixBorderRight(1px;solid;#EEEEED);
		.mixPadding(10px;20px;10px;20px);


	}
	.resign-shop-img,
	.resign-agent-img{
		.mixImg(35px;35px;);
		.mixMarginRight(10px);
	}
	.resign-agent{
		.mixPadding(10px;15px;10px;20px);
	}
	.cu-bar-title{
		.fontSize(19px);
		.color(rgba(51,51,51,1))
	}
	.cu-bar-bg{
		.background(rgba(247,248,253,1))
	}
</style>
