<template>
	<view>
		<cu-custom :isBack="true" bgColor="red">
			<block slot="left"><text class="cuIcon-back" @click="goBack()" style="font-size:22px;"></text></block>
			<block slot="content">
				<view class="font-size-big font-weight-bold">基本设置</view>
			</block>
			<block slot="right">
				<text class="text-blue font-weight-normal font-size-small" @click="setUserInfo()">确定</text>
			</block>
		</cu-custom>
		
		<view class="info-container bg-white">
			<view class="user-info-item-log flex justify-between position_relative borderBottom">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">头像</view>
				<view>
					<image 
					@click.stop.prevent="uploadAvatar()"
					class="coverUrl"
					v-if="avatar" :src="avatar.resurl"></image>
					<image 
					@click.stop.prevent="uploadAvatar()"
					class="coverUrl"
					v-else
					:src="userInfo.headurl" ></image>
				</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:27px;" ></text>
			</view>
			<view class="user-info-item flex justify-between borderBottom position_relative">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">昵称</view>
				<input type="text" placeholder="请输入昵称" v-model="userInfo.name" class="text-right" style="padding-right:10px;padding-top:7px;">
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:15px;" ></text>
			</view>
			<view class="user-info-item flex justify-between borderBottom position_relative">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">账号</view>
				<input type="text" placeholder="请输入昵称" v-model="userInfo.mobile" class="text-right" style="padding-right:10px;padding-top:7px;">
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;" ></text>
			</view>
		</view>
		<view class="extra-container bg-white" >
			<view class="user-info-item flex justify-between borderBottom position_relative" @click="changeGender()">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">性别</view>
				<text  style="line-height:40px;margin-right:10px;">{{userInfo.gender==1?'男':'女'}}</text>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;" ></text>
			</view>
			<view class="user-info-item flex justify-between borderBottom position_relative"  @click="onShowDatePicker('date')">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">出生日期</view>
				<view  style="line-height:40px;margin-right:10px;">
					<text v-if="userInfo.birthday">{{userInfo.birthday | formatTime('YMD')}}</text>
					<text v-if="birthday">{{birthday}}</text>
				</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;" ></text>
			</view>
			<view class="user-info-item flex justify-between borderBottom position_relative" @click="writeMotto()">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">签名</view>
				<text  style="line-height:40px;margin-right:10px;">{{userInfo.motto||''}}</text>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;" ></text>
			</view>
		</view>
		
		<view class="cu-modal" :class="isChangeSex?'show':''" @tap="hideModal()">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange($event)">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in sexList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{item}}</view>
								<radio class="round" 
								:class="radio=='radio' + (index+1)?'checked':''" 
								:checked="radio=='radio' + (index+1)?true:false"
								 :value="'radio' + (index+1)"></radio>
							</label>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		
		 <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true"
		@confirm="onSelected($event)" @cancel="onSelected($event)"
		 />
	</view>
</template>

<script>
	import MxDatePicker from '../../../../components/uni/mx-datepicker/mx-datepicker.vue'
	export default {
		data() {
			return {
				isShow:true,
				value: '',
				type: 'rangetime',
				radio:0,
				sexList:['男','女'],
				isChangeSex:false,
				userInfo:{},
				token:'',//上传头像的token
				avatar:'',
				birthday:'',
				showPicker:false
			}
		},
		methods: {
			writeMotto(){
				uni.navigateTo({
					url:'../write-motto/write-motto?content='+this.userInfo.motto
				})
			},
			onSelected(e) {//选择
					this.showPicker = false;
					if(e) {
						this.isShow=false;
						this[this.type] = e.value;
						this.birthday=e.value.replace(/\//g,'-')
						console.log(this.userInfo.birthday)
					}
			
			},
			RadioChange(e) {
				this.radio = e.detail.value.substr(5,1);
				this.userInfo.gender=this.radio
			},
			hideModal(){
				this.isChangeSex=false;
			},
			tochangeMobile(){
				// 账号管理
				uni.navigateTo({
					url:'../account-manager/account-manager'
				})
			},
			changeName(){
				uni.navigateTo({
					url:'../change-name/change-name'
				})
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			changeGender(){
				this.isChangeSex=true;
			},
			//上㢟头像
			uploadAvatar(){
				uni.chooseImage({
					count:1,
					sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: (res) => {
						const src=res.tempFilePaths[0];
						uni.navigateTo({
							url:'../cut-image/cut-image?src='+src
						})
					}
				})
			},
			//获得头像
			getUserInfoAvatar(){
				uni.getStorage({
					key:'logo',
					success: (res) => {
						this.avatar=res.data
					}
				})
			},
			 onShowDatePicker(type){//显示
			  this.type = type;
			  this.showPicker = true;
			  this.value = this[type];
			},
			//获得头像图片
			getAvater(id){
				this.$ajax('File',{id:id},res=>{
					this.avatar=res;
					
					uni.setStorage({
						key:'logo',
						data:this.avatar
					})
				})
			},
			setUserInfo(){
				this.$ajax('SetProfile',{
					gender:this.radio,
					mobile:this.userInfo.mobile,
					name:this.userInfo.name,
					motto:this.userInfo.motto,
					birthday:this.birthday
				},res=>{
					uni.showToast({
						title:'编辑基本信息成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1,
							success:(res)=>{
								this.$fire.fire('refresh','')
							}
						})
					},500)
				})
			}
		},
		components:{
			MxDatePicker
		},
		onShow(){
			
			this.$ajax('RefreshOnlineUser',{},res=>{
				this.userInfo=res;
				
			})
		},
		onLoad(){
			this.getUserInfoAvatar()
			this.$fire.on('image',res=>{
				if(res){
					this.getAvater(res)
				}
			})
			
			this.$fire.on('motto',res=>{
				if(res){
					this.userInfo.motto=res;
				}
			})
			
		}
	}
</script>

<style lang="less">
	.extra-container{
		margin-top:13px;
	}
	.info-container,.extra-container{
		border-top:1px solid #EEEEED;
		.user-info-item{
			padding:2px 26px 2px 14px;
		}
		.user-info-item-log{
			padding:15px 33px 11px 14px;
			.coverUrl{
				border-radius: 50%;
				width:47px;
				height:47px;
				vertical-align: middle
			}
		}
	}
	.info-content-item{
		padding:1px  33px 2px 14px;
		line-height:47px;
		border-bottom:1px solid #EEEEED;
	}
	.info-item-title{
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
	}
	.info-content{
		.img47{
			border-radius: 50%;
			width:47px;
			height:47px;
			vertical-align: middle
		}
		
	}
	.extra-content{
		margin-top:13px;
		margin-bottom:12px;
	}
	.height53{
		padding-top:2px !important;
		padding-bottom:3px !important
	}
</style>
