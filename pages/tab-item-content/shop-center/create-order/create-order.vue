<template>
	<view>
		<view >
			<view class="flex justify-between bg-white" 
			style="margin-bottom:10px;padding-left:20px;border-bottom:1px solid #EEEEED;height:38px;line-height:38px;padding-right:16px;">
				<view v-if="shop.name" style="font-size:14px;">
					{{shop.name}}
				</view>
				<view v-else>
					<text>选择门店</text>
				</view>
				<text class="cuIcon-right" style="font-size: 14px;margin-top:4px;" @click="toNearShopList()"></text> 
			</view>
			
			
			
			<view class="userInfo" >
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>报修人</view>
					<input placeholder="请输入报修人" name="input" style="text-align:right;font-size:12px;"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title"><text class="text-red">*</text>联系方式</view>
					<input placeholder="请输入联系方式" name="input" @blur="checkTelEvent($event)" style="text-align:right;font-size:12px;"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title text-black" >
						<text class="text-red" style="margin-right:4rpx;">*</text>上门日期
					</view>
					<view @click="onShowDatePicker('date')" >
						<view class="dateStyle" v-if="designer.date">{{ designer.date}}</view>
						<view v-else><text class="cuIcon-right" style="font-size:14px;"></text></view>
					</view> 
				</view>
			</view>
			<view class="repair-item">维修明细</view>
			<view class="repair-info">
				<view class="cu-form-group">
					<view class="title text-black" >
						<text class="text-red" style="margin-right:4rpx;">*</text>维修类别
					</view>
					<view>
						<view class="dateStyle" v-if="repairObj.bigName" @click="toRepairItem()" style="font-size:12px;">{{repairObj.bigName}}</view>
						<view v-else><text class="cuIcon-right" style="font-size:14px;" @click="toRepairItem()"
						
						
						
						></text></view>
					</view> 
				</view>
				
				<view class="cu-form-group">
					<view class="title text-black" >
						<text class="text-red" style="margin-right:4rpx;">*</text>维修项
					</view>
					<view>
						<view class="dateStyle" v-if="repairObj.bigName" style="font-size:12px;">{{repairObj.subName}}</view>
						<view v-else><text class="cuIcon-right" style="font-size:14px;"></text></view>
					</view> 
				</view>
				<view>
					<view class="title text-black bg-white" style="font-size:14px;padding-left:12px;padding-top:10px;border-top:1px solid #EEEEED"><text class="text-red" style="margin-right:4rpx;">*</text>报修描述</view>
					<view>
						<view class="cu-form-group">
							<textarea maxlength="200"   v-model="repairObj.summary" placeholder="报修描述输入..." style="font-size:12px;"></textarea>
						</view>
					</view>
				</view>
				
				<view class="cu-bar bg-white" >
<view class="title text-black" style="font-size:24rpx;padding-left:10px;"><text class="text-red" style="margin-right:4rpx;">*</text>上传附件</view>
				</view>
				
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
													  :key="index" @tap="ViewImage(item)" :data-url="imgList[index]">
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
		<view >
			<button class="cu-btn block bg-green margin-tb-sm lg" @click="createOrder()">提交</button>
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
	export default{
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
				token:''
			}
		},
		components:{
			MxDatePicker
		},
		getOpenDate(){
			var date=new Date();
			return this.format(date,'YMD')
		},
		onLoad(){
			//进行定位
			this.amapPlugin=new amap.AMapWX({
				key:this.key
			})
			this.getLocationInfo();
			this.getUploadToken();
			this.$fire.on('shop',result=>{
				this.shop.id=result.id;
				this.shop.name=result.name;
			})
			this.$fire.on('repair',result=>{
				this.repairObj={
					bigID:result.bigID,
					bigName:result.bigName,
					subID:result.subID,
					subName:result.subName
				}
			})
			
			
		},
		methods:{
			//提交报修
			createOrder(){
				
				if(!this.repair.subID){
					uni.showToast({
						title:'请选择报修类别',
						icon:'none'
					})
				}else if(!this.repair.summary){
					uni.showToast({
						title:'请输入报修描述',
						icon:'none'
					})
				}else{
			        uni.request({
			            url:this.$store.state.url+'NewServiceOrder',
			            data:{
			                // owner:this.$store.state.userInfo.owner,
							owner:18,
							userId:49,
			                catalog:this.repairObj.subID,
			                // creator:this.$store.state.userInfo.id,
							creator:49,
							// creator:49,
			                shop:65,
			                // shop:65,
			                appointdate:this.designer.date?this.designer.date:this.getOpenDate,
			                summary:this.repairObj.summary,
			                files:this.files?this.files.join(','):'',
			                contractor:this.designer.name?this.designer.name:this.$store.state.userInfo.name,
			                telephone:this.designer.telephone?this.designer.telephone:this.$store.state.userInfo.mobile
			
			            },success: (res) => {
			                uni.showToast({
			                    title:'新增报修成功',
			                    icon:'success'
			                });
			                setTimeout(()=>{
			                    uni.navigateTo({
			                        url:'../shop-center'
			                    })
								uni.clearStorage()
			                },500)
			            }
			        })
				}
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
							for(var i=0;i<res.tempFilePaths.length;i++){
								var  uploadTask=uni.uploadFile({
									url:this.$store.state.uploadHostUrl+this.token,
									filePath:tempFilePaths[i],
									name:'file',
									formData:{
										'x:type':18,
										'x:owner': 18,
										'x:creator': 49,
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
			
			},
			DelImg(event){},
			ViewImage(event){},
			onSelected(e) {//选择
			    this.showPicker = false;
			    if(e) {
			        this[this.type] = e.value;
			        this.designer.date=e.value;
					uni.setStorage({
						key:'time',
						data:e.value
					})
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
					url:'../near-shop-list/near-shop-list?address='+this.address
				})
			},
			//获得位置
			getLocationInfo(){
				uni.showLoading({
					title:'获取位置中..',
				})
				this.amapPlugin.getRegeo({
						success:(data)=>{
							console.log(data,'地址')
							this.address=`${data[0].regeocodeData.addressComponent.province}${data[0].regeocodeData.formatted_address}`;
								uni.hideLoading()
							// uni.request({
							// 	url:this.$store.state.url+'MyShops',
							// 	data:{
							// 		owner:18,
							// 		userId:49,
							// 		address:`${data[0].regeocodeData.addressComponent.province}${data[0].regeocodeData.formatted_address}`
							// 	},
							// 	success: (res) => {
							// 		console.log(res.data.data)
							// 		this.shopList=res.data.data;
							// 		uni.hideLoading()
							// 	}
							// })
						}
				})
			},
			showModal(e) {
				console.log(e)
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(){
				this.modalName=''
			},
			//验证电话号码
			checkTelEvent(event){
				if(!(/^1[3|5|7|8][0-9]\d{4,8}$/.test(event))){ 
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
		font-size:15px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(42,42,42,1);
	}
	 .cu-form-group uni-textarea{
		background:rgba(247,247,247,1);
		border-radius:4px;
		padding-top:5px;
		padding-left:10px;
	}
</style>