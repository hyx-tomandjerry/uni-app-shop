<template>
	<view>
		<cu-custom :isBack="true">
			<block slot="left">
				<text class="cuIcon-back" style="font-size:20px" @click="goBack()"></text>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold">基本资料</view>
			</block>
			<block slot="right">
				
				<view class="font-size-small font-weight-normal text-blue"   @click="setUserInfo()" >
					提交
				</view>
			</block>
		</cu-custom>
		<view class="info-container bg-white">
			<view class="user-info-item-log flex justify-between position_relative borderBottom" @click="uploadAvatar()">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">头像</view>
				<view >
					<image 
					
					class="coverUrl"
					v-if="userInfo.headurl"
					:src="userInfo.headurl" ></image>
				</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:27px;" ></text>
			</view>
			
			<view class="cu-form-group position_relative">
				<view class=" font-size-normal font-weight-normal">昵称</view>
				<input placeholder="请输入昵称"  style="text-align:right;margin-right:5px;" class="font-size-normal font-weight-normal text-black" v-model="userInfo.name"></input>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:14px;" ></text>
			</view>
			<view class="cu-form-group position_relative">
				<view class=" font-size-normal font-weight-normal">账号</view>
				<input placeholder="请输入账号"  style="text-align:right;margin-right:5px;" class="font-size-normal font-weight-normal text-black" v-model="userInfo.mobile" @blur="checkTelEvent(userInfo.mobile)"></input>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:14px;" ></text>
			</view>
			<!-- <view class="user-info-item flex justify-between borderBottom position_relative">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">账号</view>
				<input type="text" placeholder="请输入昵称" v-model="userInfo.mobile" class="text-right" style="padding-right:10px;padding-top:7px;">
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;" ></text>
			</view> -->
		</view>
		<view class="extra-container bg-white" >
			<view class="user-info-item flex justify-between borderBottom position_relative" >
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">性别</view>
				<!-- <text  style="line-height:40px;margin-right:10px;">{{userInfo.gender==1?'男':'女'}}</text> -->
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;" ></text>
				<view class="uni-list-cell-db" style="margin-top:10px;margin-right:7px;">
				    <picker @change="bindPickerChange($event)" :value="radio" :range="sexList">
				        <view class="uni-input">{{sexList[radio]}}</view>
				    </picker>
				</view>
			</view>
			<view class="user-info-item flex justify-between borderBottom position_relative"  @click="onShowDatePicker('date')">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">出生日期</view>
				<view  style="line-height:40px;margin-right:10px;">
					<text v-if="showBir">{{birthday || ''}}</text>
					<text  v-else>{{userInfo.birthday | formatTime('YMD') || ''}}</text>
					
				</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;"  ></text>
			</view>
			<!-- <view class="user-info-item flex justify-between borderBottom position_relative" @click="writeMotto()">
				<view class="font-weight-normal font-size-normal" style="line-height:47px;">签名</view>
				<text  style="line-height:40px;margin-right:10px;">{{userInfo.motto||''}}</text>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;" ></text>
			</view> -->
		</view>
		
	
		
		
		 <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true"
		@confirm="onSelected($event)" @cancel="onSelected($event)"
		 />
	</view>
</template>
<script>
	import MxDatePicker from '../../../../components/uni/mx-datepicker/mx-datepicker.vue'
	import {mapState,mapMutations} from 'vuex'
	export default{
		computed:mapState(['userInfo']),
		data(){
			return{
				isShow:true,
				value: '',
				type: 'rangetime',
				radio:0,
				sexList:['女','男'],
				isChangeSex:false,
				userInfo1:{},
				token:'',//上传头像的token
				avatar:'',
				birthday:'',
				showPicker:false,
				showBir:false,
				coverID:'',
				index: 0,
			}
		},
		components:{
			MxDatePicker
		},
		methods:{
		
			...mapMutations(['login']),
				checkTelEvent(event){
				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event))){
					uni.showToast({
						title:'电话号码不存在',
						icon:'none'
					})
				}
			},
			bindPickerChange(event){
				
				this.radio=event.detail.value;
				
			},
			//获得上传图片的token
			getUploadToken(){
				this.$ajax('UploadToken',{},res=>{
					this.token=res;
				})
			},
			uploadAvatar(){
				
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths=res.tempFilePaths;
						this.coverList = res.tempFilePaths;
						const uploadTask=uni.uploadFile({
								url:this.$store.state.uploadHostUrl+this.token,
								filePath:tempFilePaths[0],
								name:'file',
								formData:{
									'x:type':11,
									'x:owner':this.userInfo? this.userInfo.owner:'',
									'x:creator': this.userInfo? this.userInfo.id:'',
									'x:target':this.userInfo? this.userInfo.id:''
								},
								success: (uploadFileRes) => {
									console.log(uploadFileRes)
									let FileRes=JSON.parse(uploadFileRes.data)
									
									this.coverID=FileRes.data;
									
									this.getAvater(this.coverID)
								}
							});
							uploadTask.onProgressUpdate((resProgress)=>{
								setTimeout(()=>{
									 if(resProgress.progress==100){
									 	uni.showToast({
									 		title:'上传成功',
											icon:'none'
										})
									 }
									
								},400)
								
									
							},(error)=>{
								uni.showToast({
									title:'上传失败',
									icon:'none'
								})
							})
					}
				})
			},
			//获得头像图片
			getAvater(id){
				this.$ajax('File',{id:id},res=>{
					this.userInfo.headurl=res.resurl;
					uni.setStorage({
						key:'logo',
						data:this.userInfo.headurl
					})
				})
			},
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
					this.birthday=e.value.replace(/\//g,'-');
					this.showBir=true;
				}
			
			},
			
			
			goBack(){
				uni.navigateBack({
					delta:1,
					success:(res)=>{
						
					}
				})
			},
			
			 onShowDatePicker(type){//显示
			  this.type = type;
			  this.showPicker = true;
			  this.value = this[type];
			},
			//获得头像
			getUserInfoAvatar(){
				uni.getStorage({
					key:'logo',
					success: (res) => {
						if(this.userInfo){
							this.userInfo.headurl=res.data
						}
						
					}
				})
			},
			setUserInfo(){
				this.$ajax('SetProfile',{
					gender:this.radio,
					mobile:this.userInfo.mobile,
					name:this.userInfo.name,
					// motto:this.userInfo.motto,
					birthday:this.birthday
				},res=>{
					uni.showToast({
						title:'编辑基本信息成功',
						icon:'none'
					})
				})
			}
		},
		onLoad(){
			uni.getStorage({
				key:'logo',
				success: (res) => {
					if(res){
						uni.removeStorage({
							key:'logo'
						})
					}
				}
			})
			this.getUploadToken();
			this.getUserInfoAvatar();
			this.$ajax('RefreshOnlineUser',{},res=>{
				this.login(res);
				this.radio=this.userInfo?this.userInfo.gender:1;
			})
			
			this.$fire.on('motto',res=>{
				if(res){
					this.userInfo.motto=res;
				}
			})
		},
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
	uni-picker .uni-picker-content{
		height:100px !important;
	}
</style>