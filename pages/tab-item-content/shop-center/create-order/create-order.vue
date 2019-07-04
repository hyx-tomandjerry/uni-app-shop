<template>
	<view>
		<view >
			<view class="cu-form-group borderBottom position_relative" @click="toNearShopList()">
				<view class="title font-size-normal font-weight-normal" >
					<text class="text-red" style="margin-right:4rpx;">*</text>选择门店
				</view>
				<view>
					<view class="dateStyle" v-if="shop.name" style="margin-right:20px;">
						<text  class="font-size-normal font-weight-normal">{{shop.name}}</text>
					</view>
					<view v-if="!repaitItem">
						<text class="cuIcon-right  position_absolute color-placeholder" style="font-size:16px;right:17px;bottom:14px;" >
						</text>
					</view>
				</view>
			</view>

			<view class="userInfo" >
				<view class="cu-form-group">
					<view class=" font-size-normal font-weight-normal"><text class="text-red">*</text>报修人</view>
					<input placeholder="请输入报修人" name="input" style="text-align:right;" class="font-size-normal font-weight-normal text-black" v-model="designer.name"></input>
				</view>

				<view class="cu-form-group">
					<view class=" font-size-normal font-weight-normal"><text class="text-red">*</text>联系方式</view>
					<input placeholder="请输入联系方式" name="input" @blur="checkTelEvent($event)" style="text-align:right;"  class="font-size-normal font-weight-normal text-black" v-model="designer.telephone"></input>
				</view>

				<view class="cu-form-group position_relative"  @click="onShowDatePicker('date')">
					<view class=" font-size-normal font-weight-normal" >
						<text class="text-red" style="margin-right:4rpx;">*</text>上门日期
					</view>
					<view >
						<view class="dateStyle color-normal" v-if="designer.date" style="margin-right:20px;">{{ designer.date}}</view>
						<view><text class="cuIcon-right position_absolute color-placeholder" style="font-size:20px;right:17px;bottom:12px;"></text></view>
					</view>
				</view>
			</view>
			<view class="repair-item">维修明细</view>
			<view class="repair-info">
				<view class="cu-form-group position_relative" @click="toRepairItem()">
					<view class=" font-size-normal font-weight-normal" >
						<!--<text class="text-red" style="margin-right:4rpx;">*</text>-->
						维修类别
					</view>
					<view>
						<view class="dateStyle" v-if="repairObj.bigName" @click="toRepairItem()" style="margin-right:20px;">
							<text>{{repairObj.bigName}}</text>
						</view>
						<view >
							<text class="cuIcon-right position_absolute color-placeholder" style="font-size:20px;right:17px;bottom:12px;" ></text>
						</view>
					</view>
				</view>

				<view class="cu-form-group position_relative">
					<view class=" font-size-normal font-weight-normal" >
						<!--<text class="text-red" style="margin-right:4rpx;">*</text>-->
						维修项
					</view>
					<view>
						<view class="dateStyle" v-if="repairObj.subName" style="margin-right:20px;"><text >{{repairObj.subName}}</text></view>

						<view ><text class="cuIcon-right position_absolute color-placeholder" style="font-size:20px;right:17px;bottom:11px;"></text></view>
					</view>
				</view>
				<view>
					<view class=" font-size-normal font-weight-normal bg-white" style="font-size:14px;padding-left:12px;padding-top:10px;border-top:1px solid #EEEEED"><text class="text-red" style="margin-right:4rpx;">*</text>报修描述</view>
					<view>
						<view class="cu-form-group">
							<textarea maxlength="200"   v-model="repairObj.summary" placeholder="报修描述输入..." class="font-size-normal font-weight-normal"></textarea>
						</view>
					</view>
				</view>

				<view class="cu-bar bg-white" >
<view class="title font-size-normal font-weight-normal" style="font-size:13px;padding-left:10px;"><text class="text-red" style="margin-right:4rpx;">*</text>上传附件</view>
				</view>

				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
													  :key="index" @tap="ViewImage(index) " :data-url="imgList[index]">
							<view class="cu-tag bg-red" @tap.stop="DelImg(index)" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="padding-xs solids" @tap="ChooseImageEvent()" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view style="padding:0 12px 0 15px;">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @click="createOrder()"  :disabled="loading">
				<text v-if="repaitItem.status==1">修改订单</text>
				<text v-else-if="repaitItem.status==3">重新派单</text>
				<text v-else>提交订单</text>
			</button>
		</view>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true"
			@confirm="onSelected($event)" @cancel="onSelected($event)"
		 />
		</view>
	</view>
</template>
<script>

	import amap from '../../../../common/amap-wx.js'
	import MxDatePicker from '../../../../components/uni/mx-datepicker/mx-datepicker.vue'
	import {mapState} from 'vuex'
	export default{
	    computed:mapState(['userInfo']),
		data(){
			return{
				showPicker: false,
				isShow:false,
				modalName:null,
				 value: '',
				CustomBar: this.CustomBar,
				shop:{
					id:'',
					name:''
				},

				amapPlugin:null,//地图组件
				key:'4c523fb1857f99ba7f2d683d9e88ec1e',//地图key
				shopList:[],
				designer:{
					name:'',
					telephone:'',
					date:''
				},
				repairObj:{
					bigName:'',
					bigID:'',
					subName:'',
					subID:'',
					summary:''
				},
				type:'rangetime',
				files:[],
				imgList:[],
				address:'',
				token:'',
				loading:false,
				repaitItem:'',//报修详情
			}
		},
		components:{
			MxDatePicker
		},
		getOpenDate(){
			var date=new Date();
			return this.format(date,'YMD')
		},
		onLoad(options){
			console.log(options)
			if(options.id){
				this.getRepairInfo(options.id)
			}
			// //进行定位
			// this.amapPlugin=new amap.AMapWX({
			// 	key:this.key
			// })
			// this.getLocationInfo();
			this.getUploadToken();
			this.$fire.on('createOrderShopID',result=>{
				if(result){
					this.getShopInfo(result)
				}

			})
			this.$fire.on('repair',result=>{
				this.repairObj={
					bigID:result.bigID,
					bigName:result.bigName,
					subID:result.subID,
					subName:result.subName
				}
				console.log(this.repairObj)
				if(this.repaitItem){
					this.repairObj.summary=this.repaitItem.summary;
				}
			})
			if(this.userInfo){
                this.designer.name=this.userInfo.name;
                this.designer.telephone=this.userInfo.account;
			}



		},
		methods:{
			//获得报修详情
			getRepairInfo(id){
				console.log(id)
				this.$ajax('ServiceOrder',{
					id:id
				},res=>{
					this.repaitItem=res;
					console.log(res)
					this.designer={
					name:this.repaitItem.creatorName,
					telephone:this.repaitItem.creatorMobile,
					date:this.format(this.repaitItem.appointdate,'YMD')
					};
					this.shop={
						id:this.repaitItem.shop,
						name:this.repaitItem.shopname
					};
					this.repairObj={
					bigName:'',
					bigID:'',
					subName:this.repaitItem.catalogName,
					subID:this.repaitItem.catalog,
					summary:this.repaitItem.summary?this.repaitItem.summary:''
					};
					if(this.repaitItem.files){
						
						this.repaitItem.files.forEach(item=>{

							this.imgList.push(item.url);
							this.files.push(item.id);
							console.log(this.files)
						})
						console.log(this.imgList)
					}
				})
			},
			//提交报修
			createOrder(){
				if(this.repaitItem){
					this.$ajax('SetServiceOrder',{
						id:this.repaitItem.id,
					    // catalog:this.repairObj.subID?this.repairObj.subID:this.repairObj.bigID,
						detail:this.repairObj.subID?this.repairObj.subID:'',
						type:this.repairObj.bigID?this.repairObj.bigID:'',
					    creator:this.userInfo.id,
					    // shop:this.repaitItem.shop,
					    appointdate:this.designer.date?this.designer.date:this.format(this.repaitItem.appointdate,'YMD'),
					    summary:this.repairObj.summary,
					    files:this.files?this.files.join(','):'',
					    contractor:this.designer.name?this.designer.name:this.userInfo.name,
					    telephone:this.designer.telephone?this.designer.telephone:this.userInfo.account,
						reassigned:this.repaitItem.status==3?1:''
					},res=>{
					    this.loading = true
					    uni.showToast({
					        title:'重新派单成功',
					        icon:'success'
					    });
					    setTimeout(()=>{
					        uni.navigateBack({
					            delta:1
					        })
					    },1000)
										
					})
				}else{
					if(!this.shop.name){
						uni.showToast({
							title:'请选择门店进行报修',
							icon:'none'
						})
					}else if(!this.designer.date){
						uni.showToast({
							title:'请选择上门时间',
							icon:'none'
						})
					}else if(!this.repairObj.bigID){
						uni.showToast({
							title:'请选择报修类别',
							icon:'none'
						})
					}else if(!this.repairObj.summary){
						uni.showToast({
							title:'请输入报修描述',
							icon:'none'
						})
					}else if(this.files.length==0){
					
						uni.showToast({
							title:'请上传图片',
							icon:'none'
						})
					}else{
					
					    this.$ajax('NewServiceOrder',{
					        catalog:this.repairObj.subID?this.repairObj.subID:'',
							type:this.repairObj.bigID?this.repairObj.bigID:'',
					        creator:this.userInfo.id,
					        shop:this.shop.id,
					        appointdate:this.designer.date?this.designer.date:this.getOpenDate,
					        summary:this.repairObj.summary,
					        files:this.files?this.files.join(','):'',
					        contractor:this.designer.name?this.designer.name:this.userInfo.name,
					        telephone:this.designer.telephone?this.designer.telephone:this.userInfo.account
					    },res=>{
					        this.loading = true
					        uni.showToast({
					            title:'新增报修成功',
					            icon:'success'
					        });
					        setTimeout(()=>{
					            uni.navigateBack({
					                delta:1
					            })
					        },1000)
					
					    })
					}
				}
				
			},
			//获得门店信息
			getShopInfo(id){
				this.$ajax('ChainShop',{id:id},res=>{
					this.shop=res;
				})
			},
			toRepairItem(){
				uni.navigateTo({
					url:'../repair-item/repair-item'
				})
			},
			//获得上传图片的token
			getUploadToken(){
				uni.request({
					url:this.$store.state.url+'UploadToken',
					success: (res) => {
						this.token=res.data.data
					}
				})
			},
			ChooseImageEvent(){
					uni.chooseImage({
						count:9,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: (res) => {
                            const tempFilePaths=res.tempFilePaths;
                            if (this.imgList.length != 0) {
                                this.imgList = this.imgList.concat(res.tempFilePaths)
                            } else {
                                this.imgList = res.tempFilePaths
                            }
                            console.log(this.imgList)
                            for(var i=0;i<res.tempFilePaths.length;i++){
                                var  uploadTask=uni.uploadFile({
                                    url:this.$store.state.uploadHostUrl+this.token,
                                    filePath:tempFilePaths[i],
                                    name:'file',
                                    formData:{
                                        'x:type':this.$store.state.constants.serviceorder_file,
                                        'x:owner': this.userInfo.owner,
                                        'x:creator': this.userInfo.id,
                                    },
                                    success: (uploadFileRes) => {
                                        let res=JSON.parse(uploadFileRes.data);
                                        this.files.push(res.data);
                                        console.log(this.files)
                                    }
                                });
                                uploadTask.onProgressUpdate((res)=>{
                                    if(res.progress==100){
                                        uni.showToast({
                                            title:'上传成功',
                                            icon:'none'
                                        })
                                    }
                                },(error)=>{
                                    uni.showToast({
                                        title:'上传失败',
                                        icon:'none'
                                    })
                                })
                            }




						}
					})

			},
			ViewImage(event){
				console.log(event)
				uni.previewImage({
					urls: this.imgList,
					current: event
				});
			},
			DelImg(event){
				uni.showModal({
						content: '确定删除？',
						cancelText: '取消',
						confirmText: '确定',
						success: res => {
								if (res.confirm) {
									console.log(event)
									this.imgList.splice(event, 1);
									this.$ajax('RemoveFiles',{
										files:this.files[event],
									},res=>{
										this.files.splice(event,1)
										uni.showToast({
											title:'删除成功',
											icon:'none'
										})
									})

								}
							}
						})
			},
			onSelected(e) {//选择
			    this.showPicker = false;
			    if(e) {
			        this[this.type] = e.value;
			        this.designer.date=e.value.replace(/\//g,'-');
			    }
			},
			 onShowDatePicker(type){//显示
			    this.type = type;
			    this.showPicker = true;
			    this.value = this[type];
			},
			//显示最近的门店
			toNearShopList(){
				uni.navigateTo({
					url:'../near-shop-list/near-shop-list?cat=createOrder'
				})
			},
			// //获得位置
			// getLocationInfo(){
			// 	uni.showLoading({
			// 		title:'获取位置中..',
			// 	})
			// 	this.amapPlugin.getRegeo({
			// 			success:(data)=>{
			// 				this.address=`${data[0].regeocodeData.addressComponent.province}${data[0].regeocodeData.formatted_address}`
			// 				uni.hideLoading();
			// 				uni.showToast({
			// 					title:'获取位置成功',
			// 					icon:'none'
			// 				})
			//
			// 			},
			// 			fail:(res)=>{
			// 				// console.log(res)
			// 			}
			// 	})
			// },
			showModal(e) {
				console.log(e)
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(){
				this.modalName=''
			},
			//验证电话号码
			checkTelEvent(event){

				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event.detail.value))){
					uni.showToast({
						title:'手机号码不存在',
						icon:'none'
					})
					return false;
				}
			}
		}
	}
</script>
<style lang="less">
	.dateStyle{
		font-size:15px;
		font-weight: 400;
	}
	.repair-item{
		font-size:13px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(137,136,136,1);
		padding-top:4px;
		padding-bottom:10px;
		padding-left:14px;
	}
	.title{
		color:rgba(42,42,42,1);
	}
	 .cu-form-group uni-textarea{
		background:rgba(247,247,247,1);
		border-radius:4px;
		padding-top:5px;
		padding-left:10px;
	}
	uni-button[disabled]:not([type]){
		background:#989595;
		color:#fff;
	}
</style>
