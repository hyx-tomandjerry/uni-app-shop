<template>
	<view>
		<view class="design-container">
			<view class="design-title font-weight-bold">注册</view>
			<view class="design-title-desc font-weight-normal font-size-normal">您好！欢迎来到乐象工程管家</view>
		</view>
		<view class="design-info">
			<view class="design-info-item flex justify-start borderBottom">
				<text class="cuIcon-people text-grey" style="font-size:22px;margin-right:16px;padding-left:7px;"></text>
				<input type="text" placeholder="请输入姓名" v-model="designer.name" class="design-info-item-input font-size-big font-weight-normal" style="width:80%">
			</view>
			
			<view class="design-info-item flex justify-start borderBottom">
				<text class="cuIcon-mobile text-grey" style="font-size:33px;margin-right:16px;"></text>
				<input type="telephone" placeholder="请输入手机号" v-model="designer.mobile" class="design-info-item-input font-size-big font-weight-normal" @blur="checkTelEvent(designer.mobile)" style="width:80%">
			</view>
			
			<view class="design-info-item flex justify-start borderBottom position_relative">
				<text class="cuIcon-lock text-grey" style="font-size:23px;margin-right:16px;padding-left:7px;"></text>
				<input type="text" placeholder="密码长度6-12位，英文和数字组成" v-model="designer.token" class="design-info-item-input font-size-big font-weight-normal" @blur="checkPwdEvent(designer.token)" style="width:80%">
				<text class="cuIcon-close position_absolute"  
				style="right:19px;top:23px;" 
				@click="clearPwd()"
				v-if="designer.token"></text>
			</view>
			
			<view class="design-info-item flex justify-start borderBottom position_relative">
				<text class="cuIcon-mail text-grey" style="font-size:23px;margin-right:16px;padding-left:7px;"></text>
				<input type="text" placeholder="请输入验证码" v-model="designer.vcode" class="design-info-item-input font-size-big font-weight-normal" style="width:80%">
				<button type="default"   v-if="isSend"  class="default-btn font-size-small font-weight-normal position_absolute" >{{num}}s</button>
				<button type="primary"  v-else  class="btn-area font-size-small font-weight-normal position_absolute"   @click="sendCode()">发送验证码</button>
			</view>
		</view>
		
		<view class="design-submit">
			<button style="width:100%" :class="{'bg-gray':!designer.name,
				'bg-blue':designer.name
				}" @click="designerSubmit()">登录</button>
		</view>
		<view class="design-del font-weight-normal font-size-small " style="bottom:17px;right:59px;position:fixed">
			<text style="color:#898888" >登录/注册即表示同意</text><text style="color:#42B0ED">《乐象工程管家服务协议》</text>
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
			}
		},
		components:{
			popModal
		},
		methods:{
			designerSubmit(){
				if(!this.designer.name || !this.designer.mobile || !this.designer.token){
					uni.showToast({
						title:'请完善基本信息',
						icon:'none'
					})
				}else if(!this.designer.vcode){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
				}else{
					this.$ajax('Signup',{
						name:this.designer.name,
						token:this.designer.token,
						mobile:this.designer.mobile,
						gender:1,
						type:4,
						vcode:this.designer.vcode,
					},res=>{
						uni.showToast({
							title:'用户注册成功',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:'../login/login?account='+this.designer.mobile+'&token='+this.designer.token
							})
						},600)
					},false)
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
			clearPwd(){
				this.designer.token=''
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
			checkTelEvent(event){
				if(!(/^1[34578]\d{9}$/.test(event))){ 
					uni.showToast({
						title:'电话号码不存在',
						icon:'none'
					})
					return false
				} 
			}
		},
		onLoad(){
			
		},
	}
</script>
<style lang="less" >
	page{
		background:#fff;
	}
	.design-container{
		padding:59px 12px 17px 15px;
		.design-title{
			font-size:30px;
		}
		.design-title-desc{
			color:rgba(137,136,136,1);
		}
	}
	.design-info{
		padding-top:34px;
		padding-left:15px;
		padding-right:12px;
		margin-bottom:34px;
		.design-info-item{
			padding:16px 0 16px 0;
		}
		.design-info-item-input{
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
		padding-right:12px;
		padding-left:15px;
	}
</style>