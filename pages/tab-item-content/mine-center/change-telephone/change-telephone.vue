<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back font-size-back color-regular"  @click.stop="goBack()"></text></block>
			<block slot="content"><view class="font-size-big color-regular">更换手机号</view></block>
			<block slot="right"><view style="margin-right: 15px;"
			@click="changeTelNext"
			:class="{'color-noInput':!telephone,'color-blue':telephone}">确定</view ></block>
		</cu-custom>
		<view class="borderTop change-container">
			<view class="change-item borderBottom justify-around">
				<view>
					<text class="text-red">*</text>
					<text>手机号码</text>
				</view>
				<input type="number" maxlength="11" placeholder="请输入手机号" style="font-size:14px;" v-model="telephone">
				<button class="cu-btn bg-blue" @click="sendCode" :disabled="num<10&&num>0">
					<text>发送验证码</text>
					<text v-show="isSend">({{num}})</text>
				</button>
			</view>
			<view class="change-item borderBottom justify-start" style="padding-left:15px;">
				<view style="margin-right:17px">
					<text class="text-red">*</text>
					<text>验证码</text>
				</view>
				<input type="number" maxlength="11" placeholder="请输入验证码" style="font-size:14px;" v-model="vscode">

			</view>
			<!--<view class="item flex justify-between borderBottom align-center">-->
				<!--<view class="font-size-normal color-normal">国家和地区</view>-->
				<!--<view >-->
					<!--<text class="font-size-normal color-regular" style="margin-right:6px;">中国大陆</text>-->
					<!--<text class="cuIcon-right font-size-big color-regular"></text>-->
				<!--</view>-->
			<!--</view>-->
			<!--<view class="item flex justify-between align-center borderBottom">-->
				<!--<view class="font-size-normal color-normal">+86</view>-->
				<!--<input type="number" maxlength="11" placeholder="请输入您的手机号"-->
					<!--class="text-right"-->
				 <!--@blur="checkTel(telephone)" v-model="telephone">-->
			<!--</view>-->
		</view>
		<showModel :isShow="modalName=='introModel'" @hideModel="hideModal" @confirmDel="hideModal" v-if="modalName=='introModel'">
			<block slot="content">
				<view>修改登录手机号码后，下次</view>
				<view>登录请使用 <text class="color-blue">新的手机号码</text>登录，同时更</view>
				<view>新您的联系方式，登录密码不变。</view>
			</block>
		</showModel>
	</view>
</template>
<script>
	import showModel from '../../../../components/show-model'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default{
		data(){
			return{
				telephone:'',
				num:10,
				isSend:false,
				vscode:'',
				modalName:null
			}
		},
		components:{
			showModel
		},
		methods:{
			hideModal(){
				this.modalName=null;
				this.logout();
				uni.redirectTo({
					url:'../../../login-design/login/login'
				})
			},
			//发送验证码
			sendCode(){
				if(!this.telephone){
					uni.showToast({
						title:'请输入电话号码!',
						icon:'none'
					})
				}else if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.telephone))){
					uni.showToast({
						title:'电话号码不存在!',
						icon:'none',
						success:()=>{
							this.telephone=null;
						}
					})
				}else{
					this.isSend=true;
					this.num=10;
					setInterval(()=>{
						if(this.num>0){
							this.num--;
						}else{
							this.num=0;
							this.isSend=false;
						}
					},1000)

					this.$ajax('SendVerCode',{
						mobile:this.telephone
					},res=>{
						uni.showToast({
							title:`已经向${this.telephone}发送短信,请查看`,
							icon:'none'
						})
					})

				}
			},
			changeTelNext(){
				if(!this.vscode){
					uni.showToast({
						title:'请输入验证码',
						icon:'none'
					})
				}else{
					this.$ajax('CheckVerCode',{
						mobile:this.telephone,
						code:this.vscode
					},res=>{
						this.modalName='introModel'
					})
				}
			},
			checkTel(event){
				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event))){
					uni.showToast({
						title:'电话号码不存在!',
						icon:'none'
					})
				}
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			...mapMutations(['logout']),
		},
		onLoad(){

		},
	}
</script>
<style lang="less">
	page,
	uni-page{
		background:#fff;
	}
		.color-noInput{
			color:#B6DEFB
		}
		.item{
			height:51px;
			line-height:51px;
			padding-right:12px;
			padding-left: 15px;
		}
	.change-container{
		padding:0 15px;

		.change-item{
			align-items: baseline;
			padding-top:32px;
			padding-bottom:7px;
			display: flex;

		}
	}
</style>
