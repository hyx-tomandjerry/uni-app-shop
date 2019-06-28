<template>
	<view class="position_relative">
		<view class="findPwd-container">
			<view class="font-size-supper font-weight-super text-black">密码找回</view>
		</view>
		<view class="findPwd-info">
			<view class="findPwd-info-item flex justify-start borderBottom">
				<image src="../../../static/icon/common/phone.png" style="width:14px;height:20px;margin-right:22px;vertical-align: middle;margin-top:2px;"></image>
				<input type="text" placeholder="请输入手机号" v-model="designer.mobile"  class="color-placeholder font-size-big font-weight-normal" style="width:80%" @blur="checkTelEvent(designer.mobile)"  @focus="hideTabbar()" maxlength="11">
				<text class="text-gray">{{designer.mobile.length}}/11</text>
			</view>
			
			<view class="findPwd-info-item flex justify-start borderBottom">
				<!-- <text class="cuIcon-mail text-grey" style="font-size:23px;margin-right:16px;padding-left:8px;"></text> -->
				<image src="../../../static/icon/common/email.png" style="width:21px;height:15px;margin-right:22px;vertical-align: middle;margin-top:6px;"></image>
				<input type="text" placeholder="请输入短信验证码" v-model="designer.vcode" class="color-placeholder font-size-big font-weight-normal" style="width:80%" @blur="showTabbar()">
				<button type="default"   v-if="isSend"  class="default-btn font-size-small font-weight-normal position_absolute" >{{num}}s</button>
				<button type="primary"  v-else  class="btn-area font-size-small font-weight-normal position_absolute"   @click="sendCode()">发送验证码</button>
			</view>
			
			<view class="design-submit">
				<button style="width:100%" :class="{'bg-gray':!designer.mobile,
					'bg-blue':designer.mobile
					}" @click="toNextPage()">下一步</button>
			</view>
			
		</view>
		<view class=" font-size-small color-normal" style="margin-top:9px;padding-left:15px;">
			<view @click="toLogin()">已有账号?<text style="color:#42B0ED;margin-left:9px;" >登录</text></view>
		</view>
		<view class="copyright font-size-mini color-normal font-weight-normal" v-if="tabbar">
			登录/注册即表示同意<text style="color:rgba(66, 176, 237, 1)">《乐象工程管家服务协议》</text>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				designer:{
					mobile:'',
					vcode:''
				},
				isSend:false,
				num:60,
				tabbar:true,
				windowHeight:''
			}
		},
		components:{
			
		},
		methods:{
			toLogin(){
				uni.navigateBack({
					delta:1
				})
			},
			showTabbar(){
				console.log('jjjj')
				this.tabbar=true;
			},
			hideTabbar(){
				this.tabbar=false;
			},
			checkTelEvent(event){
				if(event){
					if(!(/^1[34578]\d{9}$/.test(event))){ 
						uni.showToast({
							title:'电话号码不存在',
							icon:'none'
						})
						this.checkTel=true;
						return
					} else{
						this.checkTel=false;
					}
				}
			},
			toNextPage(){
				
				if(!this.designer.mobile || !this.designer.vcode){
					uni.showToast({
						title:'请完善基本信息',
						icon:'none'
					})
				}else{
					
					uni.navigateTo({
						url:'../reset-password/reset-password?mobile='+this.designer.mobile+'&vcode='+this.designer.vcode
					})
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
		},
		onLoad(){
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
	}
</script>
<style lang="less">
	page{
		background:#fff;
	}
	.copyright{
		position:fixed;
		left:59px;
		bottom:17px;
	}
		.findPwd-container{
			padding:102px 15px 17px 22px;
		
			// .fintPwd-title{
			// 	font-size:30px;
			// }
			
		}
		.findPwd-info{
			padding-top:51px;
			padding-left:15px;
			padding-right:12px;
			
			.findPwd-info-item{
				padding:26px 0 16px 0;
			}
			// .findPwd-info-item-input{
			// 	color:rgba(185,185,185,1);
			// }
			.btn-area{
				padding:2px 11px;
				background:rgba(66,176,237,1);
				color:#fff;
				border-radius:4px;
				right:10px;
				line-height: 28px;
			}
			.default-btn{
				padding:2px 45px;
				color:gray;
				border-radius:4px;
				right:10px;
				line-height: 28px;
				
			}
		}
		.design-submit{
			margin-top:31px;
			
		}
</style>