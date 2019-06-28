<template>
	<view>
		<view class="tel-content">
			<view class="tel-desc">
				绑定手机号码需要通过短信验证
			</view>
			<view class="telephone-content flex justify-start">
				<text class="tel-first">+86</text>
				<input type="number" 
				@blur="checkTelEvent($event)"
				placeholder="请输入手机号码" style="color:#CCCCCC" v-model="telephone">
			</view>
			<view class="cu-btn " 
			@click="changeTelephone()"
			style=" border-radius:10px;width:90%;background:#69C0FF;color:#fff;padding-top:15px;padding-bottom:15px;" >
				下一步
			</view>
			
		</view>
		<view style="padding-left:20px;">
			<text class="cuIcon-roundcheckfill bg-gradual-blue" style="font-size:15px;border-radius: 50%;" v-if="checked" @click="refuse()"></text>
			<text class="cuIcon-round line-blue" style="font-size:19px;border-radius: 50%;" v-else></text>
			<text style="margin-left:5px;">我已阅读并同意服务声明</text>
		</view>
		<view class="cu-modal" :class="isShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">更换手机号码</view>
				</view>
				<view class="padding-xl">
					门店管家更换绑定新的手机号码前，需要将当前的绑定关系解除，请确定是否更换
				</view>
				<view class="flex justify-around bg-white" style="border-top:0.5px solid #EEEEED;padding-top:10px;">
					<view style="font-size:18px;width:50%;padding-bottom:10px;border-right:1px solid #EEEEED"
						@click="hideModal()"
					>取消</view>
					<view style="font-size:18px;width:50%;" @click="inputCheckCard()">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import popModal from '../../../../components/popmodal.vue'
	export default {
		data() {
			return {
				telephone:'',
				checked:true,
				isShow:false,
				userInfo:''
			}
		},
		components:{
			popModal
		},
		onLoad(){
			uni.getStorage({
				key:'userInfo',
				success: (res) => {
					this.userInfo=res.data
				}
			})
		},
		methods: {
			refuse(){
				this.checked=false;
			},
			changeTelephone(){
				if(!this.telephone){
					uni.showToast({
						title:'请输入电话号码',
						icon:'none'
					})
					return
				}
			},
			hideModal(){
				this.isShow=false;
			},
			checkTelEvent(event){
				
				if((/^1[345678]\d{9}$/.test(event))){ 
					uni.showToast({
						title:'输入电话号码有误',
						icon:'none'
					})
					this.isShow=false;
					
				}else{
					this.isShow=true;
				}
			},
			inputCheckCard(){
				//输入验证码
				uni.navigateTo({
					url:'../input-code/input-code?mobile='+this.userInfo.mobile
				})
			}
		}
	}
</script>

<style lang="less">
	page{
		background:rgba(247,247,247,1);
	}
	.tel-content{
		text-align:center;
		padding-top:20px;
		font-size:14px;
		font-family:PingFangSC-Semibold;
		font-weight:400;
		margin-bottom:5px;
		color:rgba(137,136,136,1);
		.tel-desc{
			margin-bottom:8px;
		}
		.telephone-content{
			background:white;
			padding:10px 40px;
			margin-bottom:20px;
			.tel-first{
				padding-left:20px;
				padding-right:20px;
				color:skyblue;
				border-right: 1px solid lightgrey;
				font-size:14px;
				font-family:PingFangSC-Semibold;
				font-weight:400;
			}
		}
	}
	
	
</style>
