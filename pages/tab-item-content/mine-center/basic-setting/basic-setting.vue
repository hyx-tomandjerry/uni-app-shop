<template>
	<view>
		<cu-custom :isBack="true"  bgColor="bg-white">
			<block slot="left">
				<view class="cuIcon-back" style="font-size:20px" @click.stop="goBack()"></view>
			</block>
			<block slot="content">
				<view class="font-size-big font-weight-bold color-normal">基本资料</view>
			</block>
			<block slot="right">
				
				<view class="font-size-small font-weight-normal text-blue" style="margin-right:15px;"  @click="setUserInfo()" >
					提交
				</view>
			</block>
		</cu-custom>
		<view class="info-container bg-white">
		

			<view class="user-info-item-log flex justify-between position_relative borderBottom" @click="uploadAvatar()">
				<view class="font-weight-normal font-size-normal color-normal" style="line-height:47px;">头像</view>
				<view >
					<image 
					
					class="coverUrl"
					v-if="userInfo.headurl"
					:src="userInfo.headurl" ></image>
				</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:27px;" ></text>
			</view>
			
			<view class="cu-form-group position_relative">
				<view class=" font-size-normal font-weight-normal color-normal">昵称</view>
				<input placeholder="请输入昵称"  style="text-align:right;margin-right:5px;" class="font-size-normal font-weight-normal " v-model="userInfo.name"></input>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:14px;" ></text>
			</view>
			<view class="cu-form-group position_relative">
				<view class=" font-size-normal font-weight-normal color-normal">账号</view>
				<input placeholder="请输入账号"  style="text-align:right;margin-right:5px;" class="font-size-normal font-weight-normal text-black" v-model="userInfo.mobile" @blur="checkTelEvent(userInfo.mobile)"></input>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:14px;" ></text>
			</view>
		</view>
		<view class="extra-container bg-white" >
				<view class="uni-list borderBottom" style="height:51px;line-height:51px;">
					<view class="uni-list-cell flex justify-between" style="padding:0 15px 0 16px;">
						<view class="uni-list-cell-left color-normal font-size-normal font-weight-normal">
							性别
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input">
									<text class="color-regular">{{array[index].name}}</text>
									<text class="cuIcon-right text-gray" style="font-size:18px;" ></text>
								</view>
							</picker>
						</view>
					</view>
				</view>
		
			<view class="cu-form-group position_relative borderBottom" @click="inputIDcard()">
				<view class=" font-size-normal font-weight-normal color-normal">身份证号</view>
				<input placeholder="输入身份证号"  style="text-align:right;margin-right:5px;"
						v-if="isShowInput"
					   maxlength="18"
					   minlength="15"
					   class="font-size-normal font-weight-normal color-regular"
						v-model="userInfo.idnum" @blur="checkIdCard(userInfo.idnum)">
				<view v-else style="margin-right:15px;" class="color-regular">{{show_idnum}}</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:14px;" ></text>
			</view>
			<view class="user-info-item flex justify-between borderBottom position_relative"  @click="onShowDatePicker('date')">
				<view class="font-weight-normal font-size-normal color-normal" style="line-height:47px;">出生日期</view>
				<view  style="line-height:40px;margin-right:10px;" class="color-regular">
					<text v-if="showBir">{{birthday || ''}}</text>
					<text  v-else>{{userInfo.birthday | formatTime('YMD') || ''}}</text>
				</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:12px;"  ></text>
			</view>
		</view>
		 <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true"
				@confirm="onSelected($event)" @cancel="onSelected($event)"
		 />
		 
	</view>
</template>
<script>
	import MxDatePicker from '../../../../components/uni/mx-datepicker/mx-datepicker.vue';
	import {mapState,mapMutations} from 'vuex'
	export default{
		computed:mapState(['userInfo']),
		data(){
			return{
				value: '',
				type: 'rangetime',
				radio:0,
				sexList:['女','男'],
				token:'',//上传头像的token
				birthday:'',
				showPicker:false,
				showBir:false,
				coverID:'',	
				show_idnum:'',
				array: [{name:'男'},{name: '女'}],
				index: 0,
				isShowInput:false,
			}
		},
		components:{
			MxDatePicker,
		},
		methods:{
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			checkIdCard(event){
				if(event){
					var reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if(!reg.test(event)){
						uni.showToast({
							title:'身份证号不正确',
							icon:'none'
						})
					}
				}
				
			},
			inputIDcard(){
				this.isShowInput=true;
			},
			checkTelEvent(event){
				 if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event))){
					uni.showToast({
						title:'电话号码不存在',
						icon:'none'
					})
				}
			},
			//获得上传图片的token
			getUploadToken(){
				this.$ajax('UploadToken',{},res=>{
					this.token=res
				})
			},
			uploadAvatar(){
				this.getUploadToken();
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera','album'],
					success: (res) => {
						const tempFilePaths=res.tempFilePaths;
						this.coverList = res.tempFilePaths;
						const uploadTask=uni.uploadFile({
								url:this.$store.state.uploadHostUrl+this.token,
								filePath:tempFilePaths[0],
								name:'file',
								formData:{
									'x:type':11,
									'x:owner':this.userInfo.owner,
									'x:creator': this.userInfo.id,
									'x:target':this.userInfo.id
								},
								success: (uploadFileRes) => {
									let FileRes=JSON.parse(uploadFileRes.data)
									this.coverID=FileRes.data;
									this.getAvater(this.coverID)
								}
							});
						
					}
				})
			},
			//获得头像图片
			getAvater(id){
				this.$ajax('File',{id:id},res=>{
					this.userInfo.headurl=res.resurl;
				})
			},
			onSelected(e) {//选择
				this.showPicker = false;
				if(e) {
					this[this.type] = e.value;
					this.birthday=e.value.replace(/\//g,'-');
					this.showPicker = false;
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
			setUserInfo(){
				
				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.userInfo.mobile))){
					uni.showToast({
						title:'电话号码不存在',
						icon:'none'
					})
				}else if(this.userInfo.idnum && !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(this.userInfo.idnum)){
					uni.showToast({
						title:'身份证号不正确',
						icon:'none'
					})
				}else{
					this.$ajax('SetProfile',{
						gender:this.index==0?1:2,
						mobile:this.userInfo.mobile,
						name:this.userInfo.name,
						birthday:this.birthday?this.birthday:this.format(this.userInfo.birthday,'YMD'),
						idnum:this.userInfo.idnum?this.userInfo.idnum:''
					},res=>{
						uni.showToast({
							title:'编辑基本信息成功',
							icon:'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},800)
					})	
				}
				
			},
			...mapMutations(['login']),
		},
		onLoad(){
			console.log(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test('564335665566666'))
		},
		onShow(){
			this.$ajax('RefreshOnlineUser',{},res=>{
				this.login(res);
				this.index=this.userInfo.gender==1?0:1;
				if(res.idnum && res.idnum.length>10){
					this.userInfo.idnum=res.idnum;
					// let index=;
					this.show_idnum=res.idnum.replace(res.idnum.slice(6,14),'********');
				}else{
					this.show_idnum='';
					this.userInfo.idnum=''
				}
				
			})
		}
	}
</script>
<style lang="less">
	@import "../../../../static/css/demo";
	.extra-container{
		/*margin-top:13px;*/
		.mixMarginTop(13px);
	}
	.info-container,.extra-container{
		/*border-top:1px solid #EEEEED;*/
		.mixBorderTop(1px;#EEEEED);
		.user-info-item{
			/*padding:2px 26px 2px 14px;*/
			.mixPadding(2px;26px;2px;14px);
		}
		.user-info-item-log{
			/*padding:15px 33px 11px 14px;*/
			.mixPadding(15px;33px;11px;14px);
			.coverUrl{
				/*border-radius: 50%;*/

				/*width:47px;*/
				/*height:47px;*/
				/*vertical-align: middle*/
				.mixImg(47px;47px);
				.mixBorderRadius(50%)
			}
		}
	}
	uni-picker .uni-picker-content{
		height:100px !important;
	}
	.uni-list{
		.mixHeight(55px);
		.lineHeight(55px);
		/*height:55px;*/
		/*line-height: 55px;*/
	}
</style>