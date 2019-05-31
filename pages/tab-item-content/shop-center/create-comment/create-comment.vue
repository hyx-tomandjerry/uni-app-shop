<template>
	<view>
		<view class="repairInfo bg-white">
			<view class="title">维修前</view>
			<view  style="padding-top:13px;padding-bottom:12px;">
				<uni-grid :options="filesList" v-if="filesList" @click="viewImg()"></uni-grid>
			</view>
			<view class="repair-desc" style="background:rgba(247,247,247,1);">
				<textarea  placeholder="报修前的样子....." 
				maxlength="200" 
				v-model="repaitItem.summary"/>
			</view>
			<view class="title">维修后</view>
			<view class="imgInfo">
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="padding-xs bg-img" :style="[{backgroundImage:'url(' + imgList[index] +')'}]" v-for="(item,index) in imgList"
							  :key="index" @tap="ViewImage(item)" :data-url="imgList[index]">
							<view class="cu-tag bg-red" @tap.stop="DelImg(index)" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="padding-xs solids" @tap="ChooseImage($event)" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="repair-desc" style="background:rgba(247,247,247,1);">
				<textarea  placeholder="请输入服务评价" maxlength="200" v-model="summary"/>
			</view>
		</view>
		
		<view class="comment-content">
			<view class="comment-title">感谢您的评价</view>
			<view class="comment-title-desc">我们会根据您的评价持续优化服务</view>
		</view>
		<view >
			<view class="startInfo bg-white flex justify-start">
				<view class="start-title">服务态度：</view>
				<view class="starts-wrapper">
					<view v-for="n in 5" :key="n" @click="selected(n,'service')" :class="{'on':cur1>=n}"></view>
				</view>
				<text class="detail">{{detail1}}</text>
			</view>
			
			<view class="startInfo bg-white flex justify-start">
				<view class="start-title">准时到达：</view>
				<view class="starts-wrapper">
					<view v-for="n in 5" :key="n" @click="selected(n,'timely')" :class="{'on':cur2>=n}"></view>
				</view>
				<text class="detail">{{detail2}}</text>
			</view>
			<view class="startInfo bg-white flex justify-start">
				<view class="start-title">施工质量：</view>
				<view class="starts-wrapper">
					<view v-for="n in 5" :key="n" @click="selected(n,'quantity')" :class="{'on':cur3>=n}"></view>
				</view>
				<text class="detail">{{detail3}}</text>
			</view>
		</view>
		<view class="btn-area" v-if="!repaitItem">
			<button 
			@click="createComment()"
			style="background:rgba(66,176,237,1); 
border-radius:5px;color:#fff;"><text class="submit-btn" >提交</text></button>
		</view>
		
	</view>
</template>

<script>
	
	import uniGrid from '../../../../components/uni-grid/uni-grid.vue'
	import myIssue  from '../../../../components/start/App.vue'
	export default{
		data(){
			return{
					filesList:[],
					imgList: [],
					cur1:5,
					cur2:5,
					cur3:5,
					flag:false,
					repaitItem:'',
					files:[],
					summary:'',//报修内容
					detail1:'非常满意',
					detail2:'非常满意',
					detail3:'非常满意',
					orderID:''

			}
		},
		components:{
			myIssue,
			uniGrid
		},
		methods:{
			viewImg(){
				let array=[];
				this.repaitItem.files.forEach(item=>{
					if(item.postfix){
						array.push(item.url)
					}
				})
				console.log(array)
				uni.previewImage({
					urls: array
				})
				
			},
			//获得订单信息
			getOrderInfo(id){
				
				this.$ajax('ServiceOrder',{id:id},res=>{
					
					this.repaitItem=res
					console.log(this.repaitItem)
					this.summary=this.repaitItem.comment;
					this.cur1=this.repaitItem.service;
					this.cur2=this.repaitItem.timely;
					this.cur3=this.repaitItem.quality;
					if(res.files){
						res.files.forEach(item=>{
							if(item.postfix){
								this.filesList.push({
									
									image:item.url,
									text:''
								})
							}
							
							
						})
					}
					
				})
				// uni.request({
				// 	url:this.$store.state.url+'ServiceOrder',
				// 	data:{
				// 		id:id
				// 	},
				// 	success: (res) => {
				// 		if(!res.data.data.summary){
				// 			res.data.data.summary=''
				// 		}
				// 		this.repaitItem=res.data.data;
				// 	}
				// })
			},
		ChooseImage(event) {
			
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
										'x:type':this.$store.state.constants.serviceorder_file,
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
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e
				});
			},
			DelImg(event) {
				uni.showModal({
					content: '确定删除？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(event, 1);
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
							// 		owner:18
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
				})
			},
			//获得上传token
			getUploadToken(){
				uni.request({
					url:this.$store.state.url+'UploadToken',
					success: (res) => {
						this.token=res.data.data
			
					}
				})
			},
			selected(n,type){
				
				this.flag=true;
				if(type=='service'){
					this.cur1=n;
					if(n>=5){
						this.detail1='非常满意';
					}else if(n>=3){
						this.detail1='满意';
					}else if(n>=1){
						this.detail1='一般';
					}else {
						this.detail1='不满意';
					}
				}
				if(type=='timely'){
					this.cur2=n;
					if(n>=5){
						this.detail2='非常满意';
					}else if(n>=3){
						this.detail2='满意';
					}else if(n>=1){
						this.detail2='一般';
					}else {
						this.detail2='不满意';
					}
				}
				if(type=='quantity'){
					this.cur3=n;
					if(n>=5){
						this.detail3='非常满意';
					}else if(n>=3){
						this.detail3='满意';
					}else if(n>=1){
						this.detail3='一般';
					}else {
						this.detail3='不满意';
					}
				}
				
			},
			createComment(){
				this.$ajax('NewServiceOrderComments',{
					comment:this.summary,
					id:this.orderID,
					service:this.cur1,
					timely:this.cur2,
					quality:this.cur3,
					files:this.files?this.files.join(','):''
				},res=>{
					uni.showToast({
						title:'验收评价成功',
						icon:'none'
					});
					setTimeout(()=>{
						uni.navigateBack({
							delta: 1
						});
					},500)
				})
				// uni.request({
				// 	url:this.$store.state.url+'NewServiceOrderComments',
				// 	data:{
				// 		owner:18,
				// 		userId:43,
				// 		comment:this.summary,
				// 		id:this.orderID,
				// 		service:this.cur1,
				// 		timely:this.cur2,
				// 		quality:this.cur3,
				// 		files:this.files?this.files.join(','):''
				// 		
				// 	},
				// 	success: (res) => {
				// 		uni.showToast({
				// 			title:'验收评价成功',
				// 			icon:'none'
				// 		});
				// 		setTimeout(()=>{
				// 			uni.navigateBack({
				// 				delta: 1
				// 			});
				// 		},500)
				// 	}
				// })
			}
		},
		onLoad(option){
			console.log(option)
			this.getUploadToken();
			this.orderID=option.orderID;
			this.getOrderInfo(option.orderID);
			console.log(this.repaitItem)
		}
		
	}
</script>

<style lang="less">
	.repairInfo{
		padding:13px 13px 23px;
		.title{
			font-size:16px;
			font-family:PingFangSC-Semibold;
			font-weight:600;
			color:rgba(42,42,42,1);
			margin-bottom:11px;
		}
		.imgInfo{
			margin-bottom:17px;
		}
		.repair-desc{
			margin-bottom:16px;
			min-height:30px;
			padding:8px 6px;
		}
	}
	.cu-form-group{
		padding:0;
	}
	uni-textarea{
		max-height:71px;
		padding:8px 6px;
	}
	.comment-content{
		background: #fff;
		width:100%;
		text-align: center;
		padding-bottom:10px;
		.comment-title{
			font-size:15px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(42,42,42,1);
		}
		.comment-title-desc{
			font-size:13px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(137,136,136,1);
			margin-top:2px;
		}
	}
	.startInfo{
		padding-left:22px;
		padding-top:19px;
		.start-title{
			line-height:29px;
			font-size:15px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(42,42,42,1);
			margin-right:10px;
		}
		.detail{
			padding-top:8px;
			font-size:13px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(137,136,136,1);
		}
	}
	.starts-wrapper view{
		width:30px;
		height:30px;
		background-image: url('../../../../static/icon/start/pingjia.png');
		background-repeat:no-repeat;
		background-size:100% 100%;
		margin-right: 10px;
		display: inline-block;
	}
	.starts-wrapper .on{
		background-image: url('../../../../static/icon/start/pingjia_color.png');
	}
	.btn-area{
		
		padding:39px 13px 23px 14px;
		background:#fff;
	}
	.submit-btn{
		font-size:16px;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
</style>
