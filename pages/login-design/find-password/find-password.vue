<template>
	<view>
		<view class="findPwd-container">
			<view class="fintPwd-title font-weight-bold">密码找回</view>
		</view>
		<view class="findPwd-info">
			<view class="findPwd-info-item flex justify-start borderBottom">
				<text class="cuIcon-mobile text-grey" style="font-size:22px;margin-right:16px;padding-left:8px;"></text>
				<input type="text" placeholder="请输入手机号" v-model="designer.mobile"  class="findPwd-info-item-input font-size-big font-weight-normal" style="width:80%" @blur="checkTelEvent(designer.mobile)">
			</view>
			
			<view class="findPwd-info-item flex justify-start borderBottom">
				<text class="cuIcon-mail text-grey" style="font-size:23px;margin-right:16px;padding-left:8px;"></text>
				<input type="text" placeholder="请输入短信验证码" v-model="designer.vcode" class="findPwd-info-item-input font-size-big font-weight-normal" style="width:80%">
				<button type="default"   v-if="isSend"  class="default-btn font-size-small font-weight-normal position_absolute" >{{num}}s</button>
				<button type="primary"  v-else  class="btn-area font-size-small font-weight-normal position_absolute"   @click="sendCode()">发送验证码</button>
			</view>
			
			<view class="design-submit">
				<button style="width:100%" :class="{'bg-gray':!designer.mobile,
					'bg-blue':designer.mobile
					}" @click="toNextPage()">下一步</button>
			</view>
			<view class="design-del font-weight-normal font-size-small " style="bottom:17px;right:59px;position:fixed">
				<text style="color:#898888" >登录/注册即表示同意</text><text style="color:#42B0ED">《乐象工程管家服务协议》</text>
			</view>
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
			}
		},
		components:{
			
		},
		methods:{
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
				console.log(this.designer.mobile)
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
			
		},
	}
</script>
<style lang="less">
	page{
		background: #fff;
	}
		.findPwd-container{
			padding:57px 15px 17px 22px;
		
			.fintPwd-title{
				font-size:30px;
			}
			
		}
		.findPwd-info{
			padding-top:62px;
			padding-left:15px;
			padding-right:12px;
			margin-bottom:34px;
			.findPwd-info-item{
				padding:16px 0 16px 0;
			}
			.findPwd-info-item-input{
				color:rgba(185,185,185,1);
			}
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
			padding-right:12px;
			padding-left:15px;
		}
</style>