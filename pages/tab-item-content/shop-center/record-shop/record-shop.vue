<template>
	<view>
		<view  style="margin-bottom:13px;">
			<view class="text-gray text-sm">

				<view class="cu-form-group" style="padding-top:10px;">
					<text class="title" style="margin-right:10px;">上传图片:</text>
					<view class="grid col-4 grid-square flex-sub">
						<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + coverList[index] +')'}]" v-for="(item,index) in coverList"
							  :key="index" @tap="ViewImage(item,'cover')" :data-url="coverList[index]">
							<view class="cu-tag bg-red" @tap.stop="DelImg(index,'cover')" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="padding-xs solids" @tap="uploadCover()" v-if="coverList.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="cu-form-group " style="border-top:none">
					<view class="title " ><text class="text-red" style="margin-right:4rpx;">*</text>品牌类别</view>
					<view @click="showShopCatalog()">
						{{category.name}}
						<text class="cuIcon-right" ></text>
					</view>
				</view>
				<view class="cu-form-group">
						<view class="title"><text style="color:red;margin-right:5px;">*</text>门店名称</view>
						<input type="text "  placeholder="门店名称" v-model="shop.name"  class="text-gray" style="font-size:12px;text-align:right">
				</view>



				<view class="cu-form-group ">
						<view class="title text-gray" ><text style="color:red;margin-right:5px;">*</text>选择城市</view>
						<addressed @changes="childClick($event)"></addressed>
				</view>


				<view class="cu-form-group">
						<view class="title text-gray"><text style="color:red;margin-right:5px;">*</text>详细地址</view>
						<input type="text" placeholder="详细地址" v-model="shop.address"  class="text-gray" style="font-size:12px;text-align:right">
				</view>


			</view>
		</view>

		<view style="margin-bottom:13px;">
			<view class="cu-form-group">
				<view class="title">开业日期</view>
				<view @click="onShowDatePicker('date')">
					<text   style="font-size:12px;color:gray;padding-right:15px;">{{shop.openDate ||'选择日期'}}</text>
				</view>
			</view>

			<view class="cu-form-group">
				<view class="title">门店联系人</view>
				<text>{{shop.contractor}}</text>
				<!-- <input placeholder="门店联系人" v-model="shop.contractor" class="text-gray" style="font-size:12px;"></input> -->
			</view>
			<view class="cu-form-group position_relative">
				<view class="text-black">联系方式</view>
				<text>{{shop.telephone}}</text>
				<!-- <input placeholder="请输入手机号" v-model="shop.telephone" class="text-gray" style="font-size:12px;"  type="phone" @blur="checkTelEvent(shop.telephone)" /> -->
			</view>

			<view class="cu-form-group">
				<view class="title">面积</view>
				<input type="text" placeholder="请输入面积" v-model="shop.area" class="text-gray" style="font-size:12px;text-align:right">
			</view>
		</view>

		<view class="detail">
			<view class="detail-title" style="margin-bottom:8px;">备注</view>
			<textarea v-model="shop.summary" placeholder="请输入备注" style="height:84px;background:rgba(247,247,247,1);padding-top:8px;padding-left:11px;width:100%;margin-bottom:14px;"/>
		<!-- 	<view class="cu-bar bg-white" style="border-top:1px solid rgba(238,238,237,1);">

											<view class="title text-black" style="font-size:24rpx;padding-left:10px;">上传附件</view>
										</view> -->
										<!-- <view class="cu-form-group">
											<view class="grid col-4 grid-square flex-sub">
												<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
													  :key="index" @tap="ViewImage(item,'file')" :data-url="imgList[index]">
													<view class="cu-tag bg-red" @tap.stop="DelImg(index,'file')" :data-index="index">
														<text class='cuIcon-close'></text>
													</view>
												</view>
												<view class="padding-xs solids" @tap="chooseImageEvent()" v-if="imgList.length<4">
													<text class='cuIcon-cameraadd'></text>
												</view>
											</view>
										</view> -->

			<view class="text-center" style="margin-top:40rpx;">
				<button class="cu-btn block bg-blue  lg" @click="recordShop()">确定</button>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="isShow?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green"></view>
					<view class="action text-blue" @tap="hideModal()">确定</view>
				</view>
				<view class="padding-xl">
					<view class="flex justify-around">
						<select style="width: 100%;height:29px;line-height:29px;border:none" @click="provinceChange()" id="province">
							<option v-for="(item,index) in provinceDataList" :value="item.id" :key="index">{{item.name}}</option>
						</select>
						<select  style="width: 100%;height:29px;line-height:29px;border:none;" id="city" @click="cityChange()">
							<option v-for="(item,index) in cityDataList" :value="item.id" :key="index">{{item.name}}</option>
						</select>
						<select  style="width: 100%; height:29px;line-height:29px;border:none;" id="area"  @click="areaChange()">
							<option v-for="(item,index) in areaDataList" :value="item.id" :key="index">{{item.name}}</option>
						</select>
					</view>
				</view>
			</view>
		</view>

		 <mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true"
		@confirm="onSelected($event)" @cancel="onSelected($event)"
		 />
	</view>
</template>

<script>
	import addressed from '../../../../components/jm-address/jm-address.vue'
	import MxDatePicker from '../../../../components/uni/mx-datepicker/mx-datepicker.vue'
	export default{
		components:{
			addressed,
			MxDatePicker
		},
		data(){
			return{
				isShow:false,
				provinceDataList:[],
				cityDataList:[],
				areaDataList:[],

				shop:{
					province:'',
					city:'',
					area:'',
					name:'',
					address:'',
					openDate:'',
					summary:'',
					contractor:'',//门店联系人
					telephone:'',//联系电话
					coverID:''

				},
				category:{
					id:'',
					name:''
				},
				index:-1,
				 imgList: [],
				 coverList:[],

				cityLobal:'',
				 titleValue:'',
				 catalogList:[],
				  type: 'rangetime',
				  showPicker: false,
				   value: '',
				   openType:'',//日期类型
				   token:'',
				   files:[]

			}
		},
		computed:{
			getOpenDate(){
				var date=new Date();
				return this.format(date,'YMD')
			}
		},
		onLoad(option){
			this.getProvinceData();
			this.getUploadToken();
			uni.getStorage({
				key:'userInfo',
				success:(res)=>{
					console.log(res.data)
					this.shop.contractor=res.data.name;
					this.shop.telephone=res.data.account;
				}
			})
			// this.shop.contractor=this.$store.state.userInfo.name;
			// this.shop.telephone=this.$store.state.userInfo.mobile;
			// console.log(this.$store.state.userInfo)
			if( option && option.subID){
				this.category={
					id:option.subID,
					name:option.subName
				}
			}else if(option && option.bigID && !option.subID){
				this.category={
					id:option.bigID,
					name:option.bigName
				}
			}
			this.$fire.on('category',result=>{
				this.category.name=result.name;
				this.category.id=result.id
			})

		},
		methods:{
			//上传头像
			uploadCover(){
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths=res.tempFilePaths;
						this.coverList = res.tempFilePaths
						uni.getStorage({
							key:'userInfo',
							success: (res) => {
								const uploadTask=uni.uploadFile({
									url:this.$store.state.uploadHostUrl+this.token,
									filePath:tempFilePaths[0],
									name:'file',
									formData:{
										'x:type':26,
										'x:owner': res.data.owner,
										'x:creator': res.data.id,
									},
									success: (uploadFileRes) => {
								
										let res=JSON.parse(uploadFileRes.data)
										this.shop.coverID=res.data;
										console.log(this.shop.coverID)
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
						})
						
						
					}
				})
			},

			childClick(e) {
                    console.log(e)
					this.shop.province=e.provinceID;
					this.shop.city=e.cityID;
					this.shop.district=e.districtID
                },
			hideModal(){
				this.isShow=false;
				this.cityLobal=this.province.name+'-'+this.city.name+'-'+this.area.name
			},
			areaChange(){
				let index=document.getElementById("city").value;
				this.areaDataList.forEach(item=>{
					if(item.id==index){
						this.area=item;
					}
				})
			},
			cityChange(){
				let index=document.getElementById("city").value;
				this.$ajax('Districts',{
                    parent:index
				},res=>{
                    this.areaDataList=res;
                    this.area=this.areaDataList[0];
                    this.cityDataList.forEach(item=>{
                        if(item.id==index){
                            this.city=item;
                            console.log(item.name)
                        }
                    })
				})
				// uni.request({
				// 	url:this.$store.state.url+'Districts',
				// 	data:{
				// 		userId:this.$store.state.userInfo.id,
				// 		owner:this.$store.state.userInfo.owner,
				// 	    // owner:18,
				// 	    // userId:49,
				// 		parent:index
				// 	},
				// 	success:(res)=>{
				// 		this.areaDataList=res.data.data;
				// 		this.area=this.areaDataList[0];
				// 		this.cityDataList.forEach(item=>{
				// 			if(item.id==index){
				// 				this.city=item;
				// 				console.log(item.name)
				// 			}
				// 		})
				// 	}
				// })
			},
			provinceChange(){
				let index=document.getElementById("province").value
				this.$ajax('Districts',{parent:index},res=>{
					this.cityDataList=res.data.data;
					this.city=this.cityDataList[0];
					this.provinceDataList.forEach(item=>{
						if(item.id==index){
							this.province=item
						}
					})
				})
				// uni.request({
				// 	url:this.$store.state.url+'Districts',
				// 	data:{
				// 		userId:this.$store.state.userInfo.id,
				// 		owner:this.$store.state.userInfo.owner,
				// 	    // owner:18,
				// 	    // userId:49,
				// 		parent:index
				// 	},
				// 	success:(res)=>{
				// 		this.cityDataList=res.data.data;
				// 		this.city=this.cityDataList[0];
				// 		this.provinceDataList.forEach(item=>{
				// 			if(item.id==index){
				// 				this.province=item
				// 			}
				// 		})
				// 	}
				// })
			},
// 			uploadCover(){
//
// 				uni.chooseImage({
// 					count: 1, //默认9
// 					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
// 					sourceType: ['album'], //从相册选择
// 					success: (res) => {
// 					if (this.coverList.length != 0) {
// 						this.coverList = this.coverList.concat(res.tempFilePaths)
// 					} else {
// 						this.coverList = res.tempFilePaths
// 					}
//
//
// 					var formData = new FormData();
// 					formData.append("x:type", 26);
// 					formData.append("x:owner", 18);
// 					formData.append("x:creator", 43);
// 					formData.append("file", res.tempFiles[0]);
// 					console.log(formData)
//
// 					uni.uploadFile({
// 						url:this.$store.state.uploadHostUrl+this.token,
// 						filePath :res.tempFilePaths[0],
// 						name :'oaks-1'+res.tempFilePaths[0].split('/')[3]+Math.random()*100000,
// 						formData:formData,
// 						success:(res)=> {
// 							console.log(res)
// 						},
// 						fail:(res)=>{
// 							console.log(res)
// 						}
// 					})
//
//
// 						var putExtra={
// 							params:{
// 								// 'x:owner': this.$store.state.userInfo.owner,
// 								// 'x:creator': this.$store.state.userInfo.id,
// 								'x:type':26,
// 								'x:owner': 18,
// 								'x:creator': 43,
// 								// 'x:type':26,
// 							}
// 						}
// 						var config={
// 							useCdnDomain: false
// 						}
// 						console.log(res.tempFiles[0])
//
//
// // 						var imgFile = new window.File([res.tempFiles[0]], 'oaks-1'+res.tempFilePaths[0].split('/')[3]+Math.random()*100000, {type: "text/plain"});
// // 						console.log(imgFile)
// //
// //
// // 						var observer=qiniu.upload(imgFile, 'oaks-1'+res.tempFilePaths[0].split('/')[3]+Math.random()*100000+'.png', this.token, putExtra, config);
// // 						 var subscription = observer.subscribe(
// // 						   ()=>{
// //
// // 						   },
// // 						   ()=>{
// //
// // 						   },
// // 						   (res)=>{
// // 							  if(res.data!=-1){
// // 								  uni.showToast({
// // 									title:'上传成功',
// // 									icon:'none'
// // 								  })
// // 							  }
// // 							 this.shop.coverID=res.data
// // 							 console.log(res.data)
// //
// // 						   }
// // 						 );
//
//
//
// 					}
// 				})
// 			},
			//验证电话号码
			checkTelEvent(event){
				console.log(event)
				if(event){
					if((/^[1][3,4,5,7,8][0-9]{9}$/.test(event))){

							uni.showToast({
								title:'电话号码不存在',
								icon:'none'
							})
						}
					}
				},
			//品牌类别
			showShopCatalog(){
				uni.navigateTo({
					url:'../category-item/category-item'
				})
			},
			//获得品牌类别
			getCatalog(){
				this.$ajax('Constants',{
					type: this.$store.state.constants.repair_type,
					parent: -1,
					objects: 1
				},res=>{
					this.catalogList=res;
				})
				// uni.request({
				// 	url:this.$store.state.url+'Constants',
				// 	data:{
				// 	    userId:this.$store.state.userInfo.id,
				// 		owner: this.$store.state.userInfo.owner,
				// 		// owner:18,
				// 		// userId:49,
				// 		type:39,
				// 		// type: this.$store.state.constants.repair_type,
				// 		parent: -1,
				// 		objects: 1
				// 	},
				// 	success:(res) => {
				// 		this.catalogList=res.data.data;
				// 	}
				// })
			},
			onSelected(e) {//选择
			    this.showPicker = false;
			    if(e) {
			        this[this.type] = e.value;
					this.shop.openDate=e.value.replace(/\//g,'-')

			    }

			},
			 onShowDatePicker(type){//显示
			  this.type = type;
			  this.showPicker = true;
			  this.value = this[type];
			},
			 // 三级联动选择
			showMulLinkageThreePicker() {

				this.isShow=true;
			},
			recordShop(){
				uni.getStorage({
					key:'userInfo',
					success: (info) => {
						if(!this.category.id || !this.shop.name || !this.shop.province || !this.shop.address){
											uni.showToast({
												title:'请填写完整信息',
												icon:'none'
											})
										}else{
											this.$ajax('NewProprietorShop',{
												manager:info.data.id,
												brand:this.category.id,
												name:this.shop.name,
												area:this.shop.area,
												address:this.shop.address,
												duedate:this.shop.openDate?this.shop.openDate:this.getOpenDate,
												summary:this.shop.summary?this.shop.summary:'',
												province:this.shop.province,
												city:this.shop.city,
												district:this.shop.district,
												coverurl:this.shop.coverID,
												status:3,
												type:2
											},res=>{
												uni.showToast({
													title:'录入门店成功',
													icon:'none'
												})
												setTimeout(()=>{
													uni.navigateBack({
														delta:1,
														success:(res)=>{
															this.$fire.fire('record-shop')
														}
													})
												},500)
											})
											// uni.request({
											// 	url:this.$store.state.url+'NewProprietorShop',
											// 	data:{
											// 		userId:this.$store.state.userInfo.id,
											// 		owner:this.$store.state.userInfo.owner,
						//                        // owner:18,
						//                        // userId:49,
											// 		manager:this.$store.state.userInfo.id,
											// 		brand:this.category.id,
											// 		name:this.shop.name,
											// 		area:this.shop.area,
											// 		address:this.shop.address,
											// 		duedate:this.shop.openDate?this.shop.openDate:this.getOpenDate,
											// 		summary:this.shop.summary?this.shop.summary:'',
											// 		province:this.shop.province,
											// 		city:this.shop.city,
											// 		district:this.shop.district,
											// 		// telephone:this.shop.telephone,
											// 		// contactor:this.shop.contractor,
											// 		files:this.files?this.files.join(','):'',
											// 		coverurl:this.shop.coverID,
											// 		status:3,
											// 		type:2
											// 	},
											// 	success: (res) => {
											// 		uni.showToast({
											// 			title:'录入门店成功',
											// 			icon:'none'
											// 		})
											// 		setTimeout(()=>{
											// 			uni.navigateTo({
											// 				url:'../shop-list/shop-list'
											// 			})
											// 		},500)
											// 	}
											// })
										}
					}
				})
				
			},
			//获得省市区
			getProvinceData() {
				this.$ajax('Districts',{parent:0},res=>{
					this.provinceDataList=res;
					this.province=this.provinceDataList[0];
				})
				// uni.request({
				// 	url:this.$store.state.url+'Districts',
				// 	data:{
				// 		userId:this.$store.state.userInfo.id,
				// 		owner:this.$store.state.userInfo.owner,
				// 	    // owner:18,
				// 	    // userId:49,
				// 		parent:0
				// 	},
				// 	success:(res)=>{
				// 		this.provinceDataList=res.data.data;
				// 		this.province=this.provinceDataList[0];
				// 	}
				// })
			},
			goBack(){
				uni.navigateBack({
					delta: 1
				});
			},
			chooseImageEvent(){
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
							uni.getStorage({
								key:'userInfo',
								success: (info) => {
									for(var i=0;i<res.tempFilePaths.length;i++){
										var  uploadTask=uni.uploadFile({
											url:this.$store.state.uploadHostUrl+this.token,
											filePath:tempFilePaths[i],
											name:'file',
											formData:{
												'x:type':26,
												'x:owner': info.data.owner,
												'x:creator': info.data.id,
											},
											success: (uploadFileRes) => {
												let res=JSON.parse(uploadFileRes.data);
												this.files.push(res.data);
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
							


						}
					})

			},
// 			ChooseImageEvent() {
// 				uni.chooseImage({
// 					count: 9, //默认9
// 					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
// 					sourceType: ['album'], //从相册选择
// 					success: (res) => {
// 						console.log(res)
// 						if (this.imgList.length != 0) {
// 							this.imgList = this.imgList.concat(res.tempFilePaths)
// 						} else {
// 							this.imgList = res.tempFilePaths
// 						}
//
// 						var putExtra={
// 							params:{
// 								// 'x:owner': this.$store.state.userInfo.owner,
// 								// 'x:creator': this.$store.state.userInfo.id,
// 								// 'x:type':this.$store.state.constants.shop_file,
//                                 'x:owner':18,
//                                 'x:creator':49,
//                                 'x:type':26,
// 							}
// 						}
//
// 						var config={
// 							 useCdnDomain: false
// 						}
// 						for(var i=0;i<res.tempFilePaths.length;i++){
// 							// res.tempFilePaths[i].split('/')[3]+'.jpg'
//
// 							var observer=qiniu.upload(res.tempFilePaths[i],'oaks-1'+res.tempFilePaths[i].split('/')[3]+Math.random()*100000+'.jpg' , this.token, putExtra, config);
// 							var subscription = observer.subscribe(
// 							  ()=>{
//
// 							  },
// 							  ()=>{
//
// 							  },
// 							  (res)=>{
// 									this.files.push(res.data)
// 									console.log(res)
// 									if(this.files.length===this.imgList.length){
// 										uni.showToast({
// 											title:'上传成功',
// 											icon:'success'
// 										})
// 									}
// 							  }
// 							);
// 						}
//
// 					},
// 				})
// 			},
			ViewImage(e,type) {
				if(type=='cover'){
					uni.previewImage({
						urls: this.coverList,
						current:2
					});
				}else if(type=='file'){
					uni.previewImage({
						urls: this.imgList,
						current: e
					});
				}

			},
			DelImg(event,type) {
				uni.showModal({
					content: '确定删除？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							if(type=='cover'){
								this.coverList.splice(event, 1);
								this.$ajax('RemoveFiles',{
									id:this.files[event]
								},res=>{
									this.files.splice(event,1)
									uni.showToast({
										title:'删除成功',
										icon:'none'
									})
								})
								// uni.request({
								// 	url:this.$store.state.url+'RemoveFiles',
								// 	data:{
								// 		id:this.files[event],
								// 		// owner:18,
								// 		// userId:49,
								// 		userId:this.$store.state.userInfo.id,
								// 		owner:this.$store.state.userInfo.owner,
								// 	},
								// 	success: (res) => {
								// 		this.files.splice(event,1)
								// 		uni.showToast({
								// 			title:'删除成功',
								// 			icon:'none'
								// 		})
								// 	}
								// })
							}else if(type=='file'){
								this.imgList.splice(event, 1);
								this.$ajax('RemoveFiles',{
									id:this.files[event],
								},res=>{
									this.files.splice(event,1)
									uni.showToast({
										title:'删除成功',
										icon:'none'
									})
								})
								// uni.request({
								// 	url:this.$store.state.url+'RemoveFiles',
								// 	data:{
								// 		id:this.files[event],
								// 		userId:this.$store.state.userInfo.id,
								// 		owner:this.$store.state.userInfo.owner,
        //                                 // owner:18,
        //                                 // userId:49,
								// 	},
								// 	success: (res) => {
								// 		this.files.splice(event,1)
								// 		uni.showToast({
								// 			title:'删除成功',
								// 			icon:'none'
								// 		})
								// 	}
								// })
							}

						}
					}
				})
			},

			//获得上传图片的token
			getUploadToken(){
				this.$ajax('UploadToken',{},res=>{
					this.token=res;
				})
				// uni.request({
				// 	url:this.$store.state.url+'UploadToken',
				// 	success: (res) => {
				// 		this.token=res.data.data
				// 	}
				// })
			}
		}
	}
</script>

<style lang="less">
	.cu-btn{
		border-radius: 5px;
		font-size:16px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(255,255,255,1);
	}
	.title{
		font-size:15px;
		font-family:'PingFangSC-Regular';
		font-weight:400;
		color:rgba(42,42,42,1);
	}
	.cu-form-group uni-input{
		text-align:right;
	}
	.uni-textarea-compute{
		padding-top:8px;
		padding-left:11px;
		background:rgba(247,247,247,1);
		border-radius:4px;
	}
	.detail{
		padding:18px 11px 5px 16px;
		background: #fff;
		.detail-title{
			font-size:14px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(42,42,42,1);
		}
	}
</style>


