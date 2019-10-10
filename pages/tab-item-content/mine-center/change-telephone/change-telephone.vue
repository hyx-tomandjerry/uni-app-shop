<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-white">
			<block slot="left"><text class="cuIcon-back font-size-back color-regular"  @click.stop="goBack()"></text></block>
			<block slot="content"><view class="font-size-big color-regular">更换手机号</view></block>
			<block slot="right"><view style="margin-right: 15px;" 
			@click="changeTelNext"
			:class="{'color-noInput':!telephone,'color-blue':telephone}">下一步</view ></block>
		</cu-custom>
		<view class="borderTop">
			<view class="item flex justify-between borderBottom align-center">
				<view class="font-size-normal color-normal">国家和地区</view>
				<view >
					<text class="font-size-normal color-regular" style="margin-right:6px;">中国大陆</text>
					<text class="cuIcon-right font-size-big color-regular"></text>
				</view>
			</view>
			<view class="item flex justify-between align-center borderBottom">
				<view class="font-size-normal color-normal">+86</view>
				<input type="number" maxlength="11" placeholder="请输入您的手机号"
					class="text-right"
				 @blur="checkTel(telephone)" v-model="telephone">
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				telephone:''
			}
		},
		components:{
			
		},
		methods:{
			changeTelNext(){
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
					this.$ajax('SendVerCode',{
						mobile:this.telephone
					},res=>{
						uni.navigateTo({
							url:"../input-code/input-code?telephone="+this.telephone
						})
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
			}
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
</style>