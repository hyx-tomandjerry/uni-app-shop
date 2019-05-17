<template>
	<view>
		<cu-custom :isBack="true" bgColor="red">
			<block slot="left"><text class="cuIcon-back" @click="goBack()" style="font-size:20px;"></text></block>
			<block slot="content">基本设置</block>
			<block slot="right">
				<text class="cu-tag round bg-blue" @click="setUserInfo()">确定</text>
			</block>
		</cu-custom>
		
		<view class="info-content bg-white position_relative" >
			<view 
			class="info-content-item flex justify-between">
				<view class="info-item-title">头像</view>
				<view>
					<image 
					@click.stop.prevent="uploadAvatar()"
					class="img47"
					v-if="avatar"
					:src="avatar.resurl" ></image>
					<image 
					@click.stop.prevent="uploadAvatar()"
					class="img47"
					v-else
					src="../../../../static/img/avatar.jpg" ></image>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:17px; font-size: 18px;"></text>
			</view>
			<view class="info-content-item flex justify-between" @click="changeName()">
				<view class="info-item-title">昵称</view>
				<view>
					<!-- <input type="text" v-model="userInfo.name" 
					style="text-align: right;padding-top:7px;"
					placeholder="请输入昵称"> -->
					<text>{{userInfo.name ||''}}</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:17px;"></text>
			</view>
			
			<view class="info-content-item flex justify-between">
				<view class="info-item-title">电话</view>
				<view>
					<!-- <text>{{userInfo.mobile || ''}}</text> -->
					<input type="text" 
					style="text-align: right;padding-top:7px;"
					v-model="userInfo.mobile" placeholder="请输入电话号码">
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:17px;"></text>
			</view>	
		</view>
		
		<view class="extra-content bg-white">
			<view class="info-content-item flex justify-between" @click="changeGender()">
				<view class="info-item-title">性别</view>
				<view>
					<text>{{userInfo.gender==1?'男':'女'}}</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:17px;"></text>
			</view>
			
			<view class="info-content-item flex justify-between" @click="onShowDatePicker('date')">
				<view class="info-item-title height53">出生日期</view>
				<view>
					<text v-if="userInfo.birthday && isShow">{{userInfo.birthday |formatTime('YMD')}}</text>
					<text v-if="birthday && !isShow">{{birthday}}</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:17px;"></text>
			</view>
			
			<view class="info-content-item flex justify-between" @click="writeMotto()">
				<view class="info-item-title height53">签名</view>
				<view>
					
					<text>{{userInfo.motto||''}}</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:7px;font-size:20px;"></text>
			</view>
			
			<!-- <view class="info-content-item flex justify-between">
				<view class="info-item-title height53">详细地址</view>
				<view>
					<text>浦东新区世纪公园208号</text>
				</view>
				<text class="cuIcon-right" 
				style="position:absolute;right:7px;font-size:20px;"></text>
			</view> -->
		</view>
		
		<!-- <view class="info-content-item  flex justify-between bg-white height53" @click="quitEvent()">
			<view class="info-item-title"  >退出登录</view>
			<view>
				<text></text>
			</view>
			<text class="cuIcon-right" 
			style="position:absolute;right:17px;"></text>
		</view> -->
		
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
				radio:'radio1',
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
					url:'../write-motto/write-motto'
				})
			},
			onSelected(e) {//选择
					this.showPicker = false;
					if(e) {
						this.isShow=false;
						this[this.type] = e.value;
						this.birthday=e.value.replace(/\//g,'-')
					}
			
			},
			RadioChange(e) {
				this.radio = e.detail.value.substr(5,1);
				this.userInfo.gender=this.radio==1?'男':'女'
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
			getUserInfo(){
				uni.getStorage({
					key:'userInfo',
					success: (res) => {
						this.userInfo=res.data
						console.log(this.userInfo)
					}
				})
			},
			//获得头像
			getUserInfoAvatar(){
				uni.getStorage({
					key:'logo',
					success: (res) => {
						// console.log(res)
						this.avatar=res.data
					}
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
			//获得上传图片的token
			getUploadToken(){
				this.$ajax('UploadToken',{},res=>{
					this.token=res;
					
				})
			},
			//退出登录
			quitEvent(){
				uni.removeStorage({
					key:'userInfo',
					success: (res) => {
						uni.navigateTo({
							url:'../../../login-design/login/login'
						})
					}
				})
				
			},
			 onShowDatePicker(type){//显示
			  this.type = type;
			  this.showPicker = true;
			  this.value = this[type];
			},
			setUserInfo(){
				console.log(this.userInfo.name,this.userInfo.mobile,this.radio,this.birthday,this.userInfo.motto)
				this.$ajax('SetProfile',{
					gender:this.radio=='radio1'?1:2,
					mobile:this.userInfo.mobile,
					name:this.userInfo.name,
					motto:this.userInfo.motto,
					birthday:this.birthday?this.birthday:this.userInfo.birthday
				},res=>{
					uni.showToast({
						title:'编辑基本信息成功',
						icon:'none'
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
				})
			}
		},
		components:{
			MxDatePicker
		},
		onLoad(){
			this.getUserInfo();
			this.getUserInfoAvatar()
			this.$fire.on('image',res=>{
				// console.log(res)
				if(res){
					this.getAvater(res)
				}
			})
			this.$fire.on('name',res=>{
				if(res){
					this.userInfo.name=res
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
