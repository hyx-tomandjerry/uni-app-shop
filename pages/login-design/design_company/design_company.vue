<template>
	<view>
		<view class="design-container">
			<view class=" font-weight-super font-size-supper position_relative" style="margin-bottom:4px;">
				<text style="height:6px;background:rgba(66,176,237,1);width:20%" ></text>
				<text>代理商注册</text>
			</view>
			<view class="color-normal font-weight-normal font-size-normal">您好！欢迎来到乐象工程管家</view>
		</view>
		<view class="design-info">
			<view class="design-info-item flex justify-start borderBottom">
				<image src="../../../static/img/resign/name.png" style="width:25px;height:25px;vertical-align: middle;margin-right:12px;"></image>
				<input type="text" placeholder="请输入企业名称" v-model="company.name" class="color-placeholder font-size-big font-weight-normal" style="width:80%">
			</view>
			<view class="design-info-item flex justify-start borderBottom">
				<image src="../../../static/img/resign/shortname.png" style="width:25px;height:25px;vertical-align: middle;margin-right:12px;"></image>
				<input type="text" placeholder="请输入企业简称" v-model="company.alias" class="color-placeholder font-size-big font-weight-normal" style="width:80%">
			</view>
			<view class="design-info-item flex justify-start borderBottom">
				<text class="cuIcon-people text-grey" style="font-size:27px;margin-right:10px;"></text>
				<input type="text" placeholder="请输入姓名" v-model="company.contactor" class="color-placeholder font-size-big font-weight-normal" style="width:80%">
			</view>
			
			<view class="design-info-item flex justify-start borderBottom">
				<text class="cuIcon-mobile text-grey" style="font-size:27px;margin-right:16px;margin-left:4px;"></text>
				<input type="telephone" placeholder="请输入手机号" v-model="company.mobile" class="color-placeholder font-size-big font-weight-normal" @blur="checkTelEvent(company.mobile)" style="width:70%">
				<text  class="text-gray">{{company.mobile.length}}/11</text>
			</view>
			
			<view class="design-info-item flex justify-start borderBottom position_relative">
				<text class="cuIcon-lock text-grey" style="font-size:27px;margin-right:16px;padding-left:7px;"></text>
				<input type="text" placeholder="密码长度6-12位，英文和数字组成" v-model="company.token" class="color-placeholder font-size-big font-weight-normal" @blur="checkPwdEvent(company.token)" style="width:80%">
				<text class="cuIcon-close position_absolute"  
				style="right:19px;top:23px;font-size:20px;" 
				@click="clearPwd()"
				v-if="company.token"></text>
			</view>
			
			<view class="design-info-item flex justify-start borderBottom position_relative">
				<text class="cuIcon-mail text-grey" style="font-size:27px;margin-right:16px;padding-left:7px;"></text>
				<input type="text" placeholder="请输入验证码" v-model="company.vcode" class="color-placeholder font-size-big font-weight-normal" style="width:80%">
				<button type="default"   v-if="isSend"  class="default-btn font-size-small font-weight-normal position_absolute" >{{num}}s</button>
				<button type="primary"  v-else  class="btn-area font-size-small font-weight-normal position_absolute"   @click="sendCode()">发送验证码</button>
			</view>
		</view>
		
		<view class="design-submit">
			<button style="width:100%" :class="{'bg-gray':!company.name,
				'bg-blue':company.name
				}" @click="designerSubmit()" :disabled="isInput">注册</button>
		</view>
		<view class="flex justify-between font-size-litter font-weight-normal" style="padding:9px 12px 0 15px;">
			<view>已有账号？<text style="color:rgba(66,176,237,1);" @click="operateClickEvent('login')">登录</text></view>
			<view  style="color:rgba(66,176,237,1);"  @click="operateClickEvent('resign')">前往个人注册</view>
		</view>
		<view class="copyright font-size-mini font-weight-normal color-normal">
			登录/注册即表示同意<text style="color:rgba(66, 176, 237, 1)">《乐象工程管家服务协议》</text>
		</view>
		
	</view>
</template>
<script>

	export default{
		data(){
			return{
				isShow:false,
				company:{
					name:'',//姓名
					alias:'',//简称
					contactor:'',//联系人
					mobile:'',//电话号码
					token:'',//密码
					vcode:''//验证码
				},
				num:60,
				isSend:false,
				modalName:'',
				isInput:false
			}
		},
		components:{
			
		},
		methods:{
			operateClickEvent(type){
				switch(type){
					case 'login':
					uni.navigateTo({
						url:'../login/login'
					});
					break;
					case 'resign':
					uni.navigateTo({
						url:'../design/design'
					});
					break;
				}
			},
			designerSubmit(){
				if(!this.company.name || !this.company.mobile || !this.company.token || !this.company.alias || !this.company.contactor){
					uni.showToast({
						title:'请完善基本信息',
						icon:'none'
					})
				}else if(!this.company.vcode){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
				}else{
					this.$ajax('RegCustomer',{
						users : '3' ,
						name:this.company.name,
						token:this.company.token,
						contactor:this.company.contactor,
						telephone:this.company.mobile,
						alias:this.company.alias,
						type:this.$store.state.shoperType,
						vcode:this.company.vcode,
						type:this.$store.state.ownerType
					},res=>{
						this.isInput=true;
						uni.showToast({
							title:'代理商注册成功',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1,
								success:(res)=>{
									this.$fire.fire('login',{
										account:this.company.mobile,
										token:this.company.token
									})
								}
							})
						},600)
					},false)
				}
			},
			sendCode(){
				console.log(this.company.mobile)
				if(!this.company.mobile){
					uni.showToast({
						title:'请输入手机号',
						icon:'none'
					})
				}else{
					this.$ajax('SendVerCode',{mobile:this.company.mobile},res=>{
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
				this.company.token=''
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
	.copyright{
		margin-top:58px;;
		margin-left:59px;
		
	}
	.design-container{
		padding:59px 12px 17px 15px;
	}
	.design-info{
		padding-left:15px;
		padding-right:12px;
		margin-bottom:28px;
		.design-info-item{
			padding:10px 0 10px 0;
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