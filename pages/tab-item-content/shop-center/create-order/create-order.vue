<template>
	<view class="borderTop">
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

				<!-- <view class="cu-form-group position_relative"  @click="onShowDatePicker('date')">
					<view class=" font-size-normal font-weight-normal" >
						<text class="text-red" style="margin-right:4rpx;">*</text>上门日期
					</view>
					<view >
						<view class="dateStyle color-normal" v-if="designer.date" style="margin-right:20px;">{{ designer.date}}</view>
						<view><text class="cuIcon-right position_absolute color-placeholder" style="font-size:20px;right:17px;bottom:12px;"></text></view>
					</view>
				</view> -->
			</view>
			<view class="repair-item"></view>
			<view class="repair-info">
				<view class="cu-form-group position_relative borderBottom" @click="toRepairItem()">
					<view class=" font-size-normal font-weight-normal" >
						<text class="text-red" style="margin-right:4rpx;">*</text>
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

				<view class="cu-form-group bg-white font-size-normal margin-bottom-normal" v-show="subItem" style="padding:10px 15px;">
					<view class="flex-all">
						<view class="flex justify-start repair-detail-list-item" >
							<view class="color-regular reapir-intro" >维修子类别名称</view>
							<view class="color-normal  ">{{subItem.name}}</view>
						</view>
						<view class="flex justify-start repair-detail-list-item" >
							<view class="color-regular  reapir-intro" >维修子类别规格</view>
							<view class="color-normal  ">{{subItem.size}}</view>
						</view>
						<view class="flex justify-start repair-detail-list-item" >
							<view class="color-regular  reapir-intro" >维修子类别品牌</view>
							<view class="color-normal">{{subItem.type}}</view>
						</view>
						<view class="repair-detail-list-item"  >
							<view  class="color-regular  reapir-intro" >备注：</view>
							<view class="color-normal repair-summary"
								  >{{subItem.summary || '空'}}</view>
						</view>
						<view  class="color-regular  reapir-intro" v-if="subItemImg.length">附件:</view>
						<view v-if="subItemImg.length">
							<view class="bg-white padding">
								<view class="grid col-4 grid-square">
									<view class="bg-img" v-for="(item,index) in subItemImg"
										  :key="index"
										  @click="checkSubItemImg(index)"
										  :style="[{ backgroundImage:'url(' + subItemImg[index] + ')' }]"></view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view>
					<view class=" font-size-normal font-weight-normal bg-white reapir-detail-container" ><text class="text-red" style="margin-right:4rpx;">*</text>报修描述</view>
					<view>
						<view class="cu-form-group">
							<textarea maxlength="200"
									  required
									  v-model="repairObj.summary" placeholder="报修描述输入..."
									  class="font-size-normal font-weight-normal repair-detail"
									  ></textarea>
						</view>
					</view>
				</view>
				<view style="height:13px;width:100%;background:rgba(247,247,247,1)"></view>
				<view class="cu-bar bg-white " >
	<view class="title font-size-normal font-weight-normal" style="font-size:13px;padding-left:10px;"><text class="text-red" style="margin-right:4rpx;">*</text>上传附件</view>
				</view>

				<view class="cu-form-group margin-bottom-normal">
					<view class="grid col-4 grid-square flex-sub">
						<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
													  :key="index" @tap="ViewImage(index) " :data-url="imgList[index]">
							<view class="cu-tag bg-red" @tap.stop="DelImg(index)" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="padding-xs solids" v-if="imgList.length<4">
							<image src='../../../../static/img/work/camera.png' mode="" @tap="ChooseImageEvent()"  style="width:78px;height:78px;"></image>
						</view>

					</view>
				</view>

				<view class="cu-form-group borderBottom position_relative" @click="chooseWorkflow" >
					<view class="title font-size-normal font-weight-normal" >
						<text class="text-red" style="margin-right:4rpx;">*</text>审批流程
					</view>
					<view>
						<view class="dateStyle"  style="margin-right:20px;">
							<text  class="font-size-normal font-weight-normal">{{workFlowItem.name || ''}}</text>
							<text class="cuIcon-right  position_absolute color-placeholder" style="font-size:16px;right:17px;bottom:14px;" >
							</text>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<view style="padding:0 12px 0 15px;">
			<button class="cu-btn block bg-blue margin-tb-sm lg" @click="createOrder()"  :disabled="loading">
				<text v-if="repaitItem.status==1">修改订单</text>
				<text v-else-if="repaitItem.status==3">重新派单</text>
				<text v-else>确定</text>
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
	// import moment from 'moment'
	export default{
	    computed:mapState(['userInfo','repairStatus','repairTypeZn']),
		data(){
			return{
				showPicker: false,//显示日期弹出框
				// isShow:false,
				// modalName:null,
				 value: '',//显示日期弹出框
				 type:'rangetime',//显示日期弹出框
				// CustomBar: this.CustomBar,
				shop:{
					id:'',
					name:''
				},

				// amapPlugin:null,//地图组件
				// key:'4c523fb1857f99ba7f2d683d9e88ec1e',//地图key
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
					summary:'',

				},
				subItem:'',//维修子类别
				subItemImg:[],

				files:[],
				imgList:[],
				// address:'',获取位置
				token:'',
				loading:false,
				repaitItem:'',//报修详情,
				workFlowItem:'',//审批详情
			}
		},
		components:{
			MxDatePicker
		},

		onLoad(options){
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
				if(result.subID){
					this.subItemImg=[]
					this.$ajax('ServiceCatalog',{id:result.subID},res=>{
						if(res.files){
							res.files.forEach(item=>{
								this.subItemImg.push(item.url)
							})
						}
						this.subItem=res;
					})
				}

				if(this.repaitItem){
					this.repairObj.summary=this.repaitItem.summary;
				}
			})
			if(this.userInfo){
                this.designer.name=this.userInfo.name;
                this.designer.telephone=this.userInfo.account;
			}
			this.$fire.on('workFlow',res=>{
				console.log(res)
				this.workFlowItem=res;
			})


		},
		methods:{
	    	//选择流程模板
			chooseWorkflow(){
				uni.navigateTo({
					url:'../work-flow/work-flow'
				})
			},
			getOpenDate(){
				var date=new Date();
				// return this.format(date,'YMD')
				return this.$moment(Date.now()).format('YYYY-MM-DD')
			},
			checkSubItemImg(event){
				uni.previewImage({
					urls: this.subItemImg,
					current: event
				});
			},
			//获得报修详情
			getRepairInfo(id){

				this.$ajax('ServiceOrder',{
					id:id
				},res=>{
					this.repaitItem=res;
					this.designer={
					name:this.repaitItem.applierName,
					telephone:this.repaitItem.applierMobile,
					date:this.$moment(this.repaitItem.appointdate).format('YYYY-MM-DD')
					};
					this.shop={
						id:this.repaitItem.shop,
						name:this.repaitItem.name
					};
					this.repairObj={
					bigName:this.repaitItem.type?this.repairTypeZn[this.repaitItem.type]:'',
					bigID:this.repaitItem.type?this.repaitItem.type:'',
					subName:this.repaitItem.catalogName,
					subID:this.repaitItem.catalog,
					summary:this.repaitItem.summary?this.repaitItem.summary:''
					};
					if(this.repaitItem.files){

						this.repaitItem.files.forEach(item=>{

							this.imgList.push(item.url);
							this.files.push(item.id)
						})

					}
				})
			},
			//提交报修
			createOrder(){
				if(this.repaitItem){
					// if(!this.workFlowItem.id){
					// 	uni.showToast({
					// 		title:'请选择审批流程',
					// 		icon:'none'
					// 	})
					// 	return;
					// }
					this.$ajax('SetServiceOrder',{
						id:this.repaitItem.id,
						category:this.repairObj.subID?this.repairObj.subID:'',
						type:this.repairObj.bigID?this.repairObj.bigID:'',
					    // appointdate:this.designer.date?this.designer.date:this.format(this.repaitItem.appointdate,'YMD'),
					    // appointdate:this.designer.date?this.designer.date:this.$moment(this.repaitItem.appointdate).format('YYYY-MM-DD'),
					    summary:this.repairObj.summary,
					    files:this.files?this.files.join(','):'',
					    contractor:this.designer.name?this.designer.name:this.userInfo.name,
					    telephone:this.designer.telephone?this.designer.telephone:this.userInfo.account,
						// reassigned:this.repaitItem.status==this.repairStatus.refuse?1:'',
						workflow:this.repaitItem.workflow
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
					}else 
					// if(!this.designer.date){
					// 	uni.showToast({
					// 		title:'请选择上门时间',
					// 		icon:'none'
					// 	})
					// }else 
					if(!this.repairObj.bigID){
						uni.showToast({
							title:'请选择报修类别',
							icon:'none'
						})
					}else if(!this.repairObj.summary){
						uni.showToast({
							title:'请输入报修描述',
							icon:'none'
						})
					}else if(this.files.length===0){
						uni.showToast({
							title:'未上传图片，或者图片正上传，请稍等',
							icon:'none'
						})
					}else if(!this.workFlowItem.id){
						console.log(this.workFlowItem)
						uni.showToast({
							title:'请选择审批流程',
							icon:'none'
						})
					}else{
						
					    this.$ajax('NewServiceOrder',{
					        category:this.repairObj.subID?this.repairObj.subID:'',
							type:this.repairObj.bigID?this.repairObj.bigID:'',
					        creator:this.userInfo.id,
					        shop:this.shop.id,
					        // appointdate:this.designer.date?this.designer.date:this.$moment(Date.now()).format('YYYY-MM-DD'),
					        summary:this.repairObj.summary,
					        files:this.files?this.files.join(','):'',
					        contractor:this.designer.name?this.designer.name:this.userInfo.name,
					        telephone:this.designer.telephone?this.designer.telephone:this.userInfo.account,
							workflow:this.workFlowItem.id//流程模板
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
				this.$ajax('UploadToken',{},res=>{
					this.token=res
				})
			},
			ChooseImageEvent(){
					uni.chooseImage({
						count:9,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['camera','album'],
						success: (res) => {

                            const tempFilePaths=res.tempFilePaths;
                            if (this.imgList.length != 0) {
                                this.imgList = this.imgList.concat(res.tempFilePaths)
                            } else {
                                this.imgList = res.tempFilePaths
                            }

                            for(var i=0;i<res.tempFilePaths.length;i++){
                                let  uploadTask=uni.uploadFile({
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
                                    },

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
				if(this.repaitItem){
					return;
				}
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
// 			showModal(e) {
//
// 				this.modalName = e.currentTarget.dataset.target
// 			},
			// hideModal(){
			// 	this.modalName=''
			// },
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
		height:13px;
		width:100%;
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
	.repair-detail-list-item{
		margin-bottom: 8px;
		.reapir-intro{
			margin-right: 21px;
		}
		.repair-summary{
			font-size:15px;
			word-wrap: break-word;
			word-break: break-all
		}
	}
	.reapir-detail-container{
		padding-left:12px;
		padding-top:10px;
		.repair-detail{
			background:rgba(247,247,247,1);
			padding:10px 15px;
			border-radius: 10px;
			min-height:100px;
		}

	}
</style>
