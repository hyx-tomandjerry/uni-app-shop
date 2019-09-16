<template>
	<view  class="position_relative">
		<view class="design-container">
			<view class=" font-weight-super font-size-supper design-container-title" >注册</view>
			<view class="color-regular font-weight-normal font-size-normal">您好！欢迎来到乐象门店助手</view>
		</view>
		<view class="design-info">
			<view class="design-info-item flex justify-start borderBottom align-center">
				<image src="../../../static/icon/icon-dneglu-zhanghu@2x.png" class="design-info-item-name"></image>

				<input type="text" placeholder="请输入姓名" v-model="designer.name"
					   :class="designer.name?'explain-color':'color-placeholder'"
					   class=" font-size-big font-weight-normal design-info-item-input"  @focus="hideTabbar()">
			</view>
			
			<view class="design-info-item flex justify-between borderBottom align-center">
				<view class="flex justify-start">
					<image src="../../../static/icon/icon-zhuce-shouji@2x.png" class="design-info-item-tel"></image>
					
					<input type="telephone" placeholder="请输入手机号"
						   maxlength="11"
						   v-model="designer.mobile"
						   :class="designer.mobile?'explain-color':'color-placeholder'"
						   class=" font-size-big font-weight-normal design-info-item-tel-input" @blur="checkTelEvent(designer.mobile)">
				</view>
				<view>
					<text  class="text-gray">{{designer.mobile.length}}/11</text>
				</view>
			</view>
			
			<view class="design-info-item flex justify-between borderBottom position_relative align-center">
				<view class="flex justify-start">
					<image src="../../../static/icon/icon-dneglu-mima@2x.png"
						   class="design-info-item-pwd"></image>
					<input type="text" placeholder="请输入密码"  @blur="checkPwdEvent(designer.token)" v-if="isShowPwd" v-model="designer.token"
						   class="font-size-big font-weight-normal" :class="designer.token?'explain-color':'color-placeholder'">
					<input type="password" placeholder="请输入密码" @blur="checkPwdEvent(designer.token)"
						   v-else v-model="designer.token" class="font-size-big font-weight-normal"
						   :class="designer.token?'explain-color':'color-placeholder'">
				</view>
				
				<view>
					<view v-if="isShowPwd" @click="showPwd()">
						<image src="../../../static/icon/icon-xianshimima@2x.png"
							   class="design-info-item-pwd-img-show"
					
						></image>
					</view>
					<view v-else @click="showPwd()">
						<image  
								src="../../../static/icon/icon-yingcangmima@2x.png"
							  class="design-info-item-pwd-img"></image>
					</view>
				</view>
				
				
			</view>
			
			<view class="design-info-item flex justify-between borderBottom position_relative align-center">
				<view class="flex justify-start">
					<image src="../../../static/icon/icon-zhuce-youxiang@2x.png"
						   class="design-info-item-vscode"></image>
					
					<input type="text" placeholder="请输入验证码" v-model="designer.vcode"
						   :class="designer.vcode?'explain-color':'color-placeholder'"
						   class=" font-size-big font-weight-normal" style="width:80%" @blur="hideTabbar()">
				</view>
				<view>
					<button type="default"   v-if="isSend"  class="default-btn font-size-small font-weight-normal " >{{num}}s</button>
					<button type="primary"  v-else  class="btn-area font-size-small font-weight-normal "   @click="sendCode()">发送验证码</button>
				</view>
				
			</view>
		</view>
		
		<view class="design-submit">
			<button  class="design-submit-btn" :class="{'bg-gray':!designer.name,
				'bg-blue':designer.name
				}" @click="designerSubmit()" :disabled="isInput">注册</button>
		</view>
		<view class="font-size-small font-weight-normal  color-normal flex justify-between submit-intro">
			<view>已有账号？<text class="color-blue" @click="operateClickEvent('login')">登录</text></view>
		</view>
		<view class="copyright font-size-mini font-weight-normal color-normal" v-if="tabbar">
			登录/注册即表示同意<text class="color-blue"  @click="signPro">《门店助手软件用户许可协议》</text>
		</view>
		<loading
				ref="loading"
				:custom="false"
				:shadeClick="true"
				:type="1"
				@callback="callback()">
			<!-- <view class="test">自定义</view> -->
		</loading>
	</view>
</template>
<script>
	import loading from '../../../components/xuan-loading.vue'
	export default{
		data(){
			return{
				isShow:false,
				designer:{
					name:'',
					mobile:'',
					token:'',
					vcode:''
				},
				num:60,
				isSend:false,
				modalName:'',
				isInput:false,
				isShowPwd:false,
				isRightTel:true,
				tabbar:true,//用于键盘，
				windowHeight:'',
				type:'',//用于区分销售人员还是渠道商个人注册
			}
		},
		components:{
			loading
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
			close(){
				 this.$refs.loading.close();
			},
			open(){
				this.$refs.loading.open();
			},
			callback(){
				
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
			operateClickEvent(type){
				switch(type){
					case 'login':
						uni.navigateTo({
							url:'../login/login'
						})
						break;
					case 'choose':
						uni.navigateTo({
							url:'../design-type/design-type'
						})
				}
			},
			designerSubmit(){
				this.open();
				if(!this.isRightTel){
					uni.showToast({
						title:'电话号码不存在',
						icon:'none',
						success:()=>{
							this.close()
						}
					})
				}else if(!this.designer.name || !this.designer.mobile || !this.designer.token){
					uni.showToast({
						title:'请完善基本信息',
						icon:'none',
						success:()=>{
							this.close()
						}
					})
				}else if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/.test(this.designer.token)){
					uni.showToast({
						title:'密码不能含有非法字符，长度在6-12之间',
						icon:'none',
						success:()=>{
							this.close()
						}
					})
				} else if(!this.designer.vcode){
					uni.showToast({
						title:'请输入验证码',
						icon:'none',
						success:()=>{
							this.close()
						}
					})
				}else{
					this.$ajax('Signup',{
						name:this.designer.name,
						token:this.designer.token,
						mobile:this.designer.mobile,
						gender:this.$store.state.genderZn.man,
						// type:this.$store.state.shoperObj.type,
						type:this.type,
						vcode:this.designer.vcode,
					},res=>{
						this.isInput=true;
						uni.showToast({
							title:'用户注册成功',
							icon:'none',
							success:()=>{
								this.close()
							}
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:"../login/login",
								success: () => {
									this.$fire.fire('login',{
										account:this.designer.mobile,
										token:this.designer.token
									})
								}
							})
						},600)
					},false)
				}
			},
			sendCode(){
				if(!this.designer.mobile){
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
				}else{
					this.$ajax('SendVerCode',{mobile:this.designer.mobile},res=>{
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
			clearPwd(){
				this.designer.token=''
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
					this.isRightTel=false;
					
				} else {
					this.isRightTel=true;
				}
			}
		}
		
	}
</script>
<style lang="less" >
	@import url('../../../static/css/demo.less');
	page{
		background: @bg_color;
	}
	.copyright{
		position:fixed;
		bottom:17px;
		left:59px;
		
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

			.mixPadding(16px;0;16px;0);
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