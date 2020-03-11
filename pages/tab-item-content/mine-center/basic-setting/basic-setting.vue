<template>
	<view>
		<view class="info-container bg-white">
			<view class="user-info-item-log flex justify-between position_relative borderBottom" @click="uploadAvatar()">
				<view class="font-weight-normal font-size-normal color-normal" style="line-height:47px;">头像</view>
				<view >
					<image
					lazy-load="true"
					mode="aspectFill"
					class="coverUrl"
					v-if="userInfo.headurl"
					:src="userInfo.headurl" ></image>
				</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:27px;" ></text>
			</view>

			<view class="cu-form-group flex justify-between align-center borderBottom">
				<view class=" font-size-normal font-weight-normal color-normal">昵称</view>
				<view class="flex justify-start align-center">
					<input placeholder="请输入昵称"  style="text-align:right;" class="font-size-normal font-weight-normal " v-model="userInfo.name"></input>
					<text class="cuIcon-right  text-gray" style="font-size:18px;" ></text>
				</view>
			</view>
			<common-flex 
					:isRed="false"
					leftContent="电话" 
					:rightContent="userInfo.mobile" 
					type="navigate"
					@operateItem="changeTel"></common-flex>
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

			<!-- <view class="cu-form-group position_relative borderBottom" @click="inputIDcard()">
				<view class=" font-size-normal font-weight-normal color-normal">身份证号</view>
				<input placeholder="输入身份证号"  style="text-align:right;margin-right:5px;"
						v-if="isShowInput"
					   maxlength="18"
					   minlength="15"
					   class="font-size-normal font-weight-normal color-regular"
						v-model="userInfo.idnum" @blur="checkIdCard(userInfo.idnum)">
				<view v-else style="margin-right:15px;" class="color-regular">{{show_idnum}}</view>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:14px;" ></text>
			</view> -->
			
			<view class="cu-form-group position_relative borderBottom">
				<view class=" font-size-normal font-weight-normal color-normal">身份证号</view>
				<view v-if="userInfo.idnum" style="margin-right:15px;" @click="changeIdnum">{{show_idnum}}</view>
				<input type="text" placeholder="请输入身份证号" v-model="idcard" style="text-align:right;margin-right:15px;" v-else>
				<text class="cuIcon-right position_absolute text-gray" style="font-size:18px;right:10px;top:14px;" ></text>
			</view>
			<view class="user-info-item flex justify-between borderBottom position_relative"  @click="onShowDatePicker('date')">
				<view class="font-weight-normal font-size-normal color-normal" style="line-height:47px;">出生日期</view>
				<view  style="line-height:40px;margin-right:10px;" class="color-regular">
					<text v-if="showBir">{{birthday || ''}}</text>
					<text  v-else-if="userInfo.birthday">{{userInfo.birthday | formatTime('YMD') || ''}}</text>
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
	import commonFlex from '../../../../components/common/common-flex.vue'
	
	import {RefreshOnlineUser,FileApi,UploadTokenApi} from '../../../../api/common_api.js'
	import {SetProfileApi} from '../../../../api/mine_api.js'
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
				idcard:'',//身份证号
			}
		},
		components:{
			MxDatePicker,commonFlex
		},
		onNavigationBarButtonTap(event){
			if(event.index==0){
				this.setUserInfo()
			}
		},
		methods:{
			//修改身份证号
			changeIdnum(){
				uni.navigateTo({
					url:"../edit-idnum/edit-idnum"
				})
			},
			//修改电话号码
			changeTel(){
				uni.navigateTo({
					url:'../change-telephone/change-telephone'
				})
			},
			bindPickerChange: function(e) {
				this.index = e.target.value
			},
			checkIdCard(event){
				if(event){
					var reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
					if(!reg.test(event)){
						this.$utils.showToast('身份证号不正确')
					}
				}

			},
			inputIDcard(){
				this.isShowInput=true;
			},
			checkTelEvent(event){
				 if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event))){
					this.$utils.showToast('电话号码不存在')
				}
			},
			//获得上传图片的token
			async getUploadToken(){
				this.token = await UploadTokenApi()
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
								url:this.config.uploadHostUrl+this.token,
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
									this.$utils.showToast('头像上传成功')
									setTimeout(()=>{
										uni.hideToast()
									},900)
									this.coverID=FileRes.data;
									this.getAvater(this.coverID)
								}
							});

					}
				})
			},
			//获得头像图片
			async getAvater(id){
				let result = await FileApi(id);
				this.userInfo.headurl = result['resurl']

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
			onShowDatePicker(type){//显示
			  this.type = type;
			  this.showPicker = true;
			  this.value = this[type];
			},
			async setUserInfo(){
				if(this.check()){
					let val={
						gender:this.index==0?1:2,
						mobile:this.userInfo.mobile,
						name:this.userInfo.name,
						birthday:this.birthday?this.birthday:this.$moment(this.userInfo.birthday || new Date()).format('YYYY-MM-DD'),
						idnum:this.idcard?this.idcard:''
					}
					if(await SetProfileApi(val)){
						this.$utils.showToast('编辑基本信息成功')
						this.$utils.goBack()
					}
				}


			},
			check(){
				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(this.userInfo.mobile))){
					this.$utils.showToast('电话号码不存在')
					return false;
				}
				if(this.userInfo.idnum && !/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(this.userInfo.idnum)){
					this.$utils.showToast('身份证号不正确')
					return false;
				}
				return true;
			},
			async getUserInfo(){
				let result = await RefreshOnlineUser();
				this.login(result);
				this.index=this.userInfo.gender==1?0:1;
				if(result.idnum && result.idnum.length>10){
					this.userInfo.idnum=result.idnum;
					this.show_idnum=result.idnum.replace(result.idnum.slice(6,14),'********');
				}else{
					this.show_idnum='';
					this.userInfo.idnum=''
				}
			},
			...mapMutations(['login']),
		},
		onShow(){
			this.getUserInfo()
		}
	}
</script>
<style lang="less">
	@import "../../../../static/css/demo";
	.cu-form-group uni-input{
		padding-right:0px;
	}
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
				.mixImg(100upx;100upx);
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
