<template>
	<view class="borderTop">
		<view class="user-info-container margin-bottom-normal flex justify-start align-center">
			<image :src="userInfo.headurl?userInfo.headurl:'../../../../static/img/default.png'" mode="" class="user-img"></image>
			<view class="user-info">
				<view class="font-size-big color-normal" style="margin-bottom:3px;">报修人:{{repaitItem.creatorName || ''}}</view>
				<view class="font-size-small color-regular">{{repaitItem.creatorMobile || ''}}</view>
			</view>
		</view>
		<view class="order_content">
				<view class="repair-detail" style="position: relative;">
					<!-- 报修详情 -->
					<view 
						style="width:8px;height:25px;background:rgba(66,176,237,1);position:absolute;left:0;top:19px;">
					</view>
					<view class="repair-detail-title" >
						<text>报修详情</text>
					</view>
					<view class="repair-detail-list">
						<!-- <view class="repair-detail-list-item flex justify-between">
							<view style="width:40%;text-align: left;padding-left:10px;">报修人</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.creatorName}}</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between">
							<view style="width:40%;text-align: left;padding-left:10px;"> 联系电话</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.creatorMobile}}</view>
						</view> -->
						
						<view class="repair-detail-list-item flex justify-between">
							<view class="flex-sm text-left repair-intro">门店名称</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.name}}</view>
						</view>
						<view class="repair-detail-list-item flex justify-between">
							<view class="flex-sm text-left repair-intro">品牌名称</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.brandName}}</view>
						</view>
						
						
						<view class="repair-detail-list-item flex justify-between ">
							<view class="flex-sm text-left repair-intro">门店地址</view>
							<view class="color-regular text-right " style="flex:1">
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{repaitItem.provinceName}}{{repaitItem.cityName}}{{repaitItem.districtName}}{{repaitItem.address}}</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between">
							<view class="flex-sm text-left repair-intro">维修类别</view>
							<view class="color-regular flex-1 text-right">{{repaitItem.type|repairTypePipe}}</view>
						</view>
						
						<!--<view class="repair-detail-list-item flex justify-between">-->
							<!--<view style="width:40%;text-align: left;padding-left:10px;">维修详情</view>-->
							<!--<view class="text-grey flex-1 text-right">{{repaitItem.categoryName || ''}}</view>-->
						<!--</view>-->
						
						<view class="repair-detail-list-item flex justify-between">
							<view  class="flex-sm text-left repair-intro">维修日期</view>
							<view class="color-regular  flex-1 text-right">{{repaitItem.appointdate | formatTime('YMD')}}</view>
						</view>
						
						<view class="repair-detail-list-item">
							<view style="margin-bottom:6px;" class="flex-sm text-left repair-intro">报修描述</view>
							<view class="color-regular repair-summary" >{{repaitItem.summary}}</view>
						</view>
						
					</view>
				</view>
				
				
				<view class="repair-detail" style="position: relative;">
					<!-- 报修进度 -->
					<view 
						style="width:8px;height:25px;background:rgba(66,176,237,1);position:absolute;left:0;top:19px;">
					</view>
					<view class="repair-detail-title" >
						<text>服务状态</text>
					</view>
					<view class="repair-detail-item flex justify-between borderBottom font-size-big" style="padding:24px 0;">
						<view>
							<text style="margin-right:40px;" class="font-size-normal color-normal">维修进度:</text>
							<!-- <image src="../../../../static/img/shop/smile.png" class="smile-img" v-if="repaitItem.manager == userInfo.id && repaitItem.status==repairStatus.waitManager"></image> -->
							<text  
							:class="{
								'text-orange':repaitItem.status==repairStatus.waitManager,
								'text-green':repaitItem.status==repairStatus.waitArea,
								'color-red':repaitItem.status==repairStatus.waitCompany,
								'color-regular':repaitItem.status==repairStatus.finish,
								'text-purple':repaitItem.status==repairStatus.loading}"
							>{{repaitItem.status | repairStatus}}</text>
						</view>
						<!--<view class="cu-tag line-blue" @click="showModal($event)" data-target="bottomModal" -->
							<!--v-if="repaitItem.status==repairStatus.treating || repaitItem.status==repairStatus.finish">-->
							<!--查看进度-->
						<!--</view>-->
					</view>
					
					<view style="padding-top:22px;">
						<view style="margin-bottom:14px;" class="font-size-big">
							<text style="margin-right:20px;" class=" color-normal">申请时间:</text>
							<text class="color-regular">{{repaitItem.createdate | formatTime('YMDHMS')}}</text>
						</view>
						<view class="font-size-big">
							<text style="margin-right:20px;" class=" color-normal">订单编号:</text>
							<text class="color-regular">{{repaitItem.shopSeq}}</text>
						</view>
					</view>
				</view>
				
				<view class="repair-detail" style="position: relative;" v-if="repaitItem.status==4">
					<!-- 报修进度 -->
					<view 
						style="width:8px;height:25px;background:rgba(66,176,237,1);position:absolute;left:0;top:19px;">
					</view>
					<view class="repair-detail-title" >
						<text>评价结果</text>
					</view>
					<view class="text-grey" style="padding-top:13px;padding-bottom:12px;">
						感谢维修师傅，来的很及时，各方面都挺好的
					</view>
				</view>
				
				<view class="repair-detail" style="position: relative;">
					<!-- 报修进度 -->
					<view 
						style="width:8px;height:25px;background:rgba(66,176,237,1);position:absolute;left:0;top:19px;">
					</view>
					<view class="repair-detail-title" >
						<text>报修附件</text>
					</view>
					<view  style="padding-top:13px;padding-bottom:12px;" v-if="repaitItem.files">
						<view class="bg-white padding">
							<view class="grid col-4 grid-square">
								<view class="bg-img" v-for="(item,index) in repaitItem.files" :key="index" :style="[{ backgroundImage:'url(' + item.url + ')' }]"
									@click="viewImg(index)"
								></view>
							</view>
						</view>
							<!-- <view class=" flex justify-start">
								<image v-for="(item,index) in repaitItem.files" :key="index" :src="item.url" style="width:78px;height:78px;margin-right:12px;" @click="viewImg(item)"></image> -->
								<!-- <view class="bg-img" v-for="(item,index) in repaitItem.files" :key="index"
								 :style="[{ backgroundImage:'url(' + item.url + ')' }]"></view> -->
							<!-- </view> -->
						
			
					</view>
				</view>
			
			<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
				<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view></view>
					<view class="action text-blue" @tap="hideModal()">
						<image src="../../../../static/icon/icon-repair-guanbi.png" style="width:24px;height:24px;"></image>
					</view>
				</view>
				<view class="progress-content">
					<view style="margin-bottom:23px;">
						<view class="progress-item">
							<image src='../../../../static/icon/icon-repair-wancheng.png' style="width:18px;height:18px;margin-right:19px;"></image>
							<text class="status-title">已完成</text>
						</view>
						<view style="padding-left:37px;">
							<view class="progress-desc">
								维修已经完成，请对本次服务进行评价。
							</view>
							<view class="progress-time">
								2019-03-22 09:15:30
							</view>
						</view>
					</view>
					
					<view style="margin-bottom:23px;">
						<view class="progress-item">
							<image src='../../../../static/icon/icon-repair-during.png' style="width:16px;height:16px;margin-right:16px;"></image>
							<text class="status-title">维修中</text>
						</view>
						<view style="padding-left:37px;">
							<view class="progress-desc">
								正在维修中
							</view>
							<view class="progress-time">
								2019-03-22 09:15:30
							</view>
						</view>
					</view>
					
					<view style="margin-bottom:23px;">
						<view class="progress-item">
							<image src='../../../../static/icon/icon-repair-guocheng.png' style="width:18px;height:16px;margin-right:16px;"></image>
							<text class="status-title">上门中</text>
						</view>
						<view style="padding-left:37px;">
							<view class="progress-desc">
								已分派维修师傅，正在生门中;
								登跃 联系电话：13241468904
							</view>
							<view class="progress-time">
								2019-03-22 09:15:30
							</view>
						</view>
					</view>
					
					<view style="margin-bottom:23px;">
						<view class="progress-item">
							<image src='../../../../static/icon/icon-repair-guocheng.png' style="width:18px;height:16px;margin-right:16px;"></image>
							<text class="status-title">派单中</text>
						</view>
						<view style="padding-left:37px;">
							<view class="progress-desc">
								正在为您分配维修员。
							</view>
							<view class="progress-time">
								2019-03-22 09:15:30
							</view>
						</view>
					</view>
				</view>
			</view>
			</view>
	</view>
		<!-- <view class="btn-container">
		
			<view class="flex justify-between" v-if="repaitItem.manager == userInfo.id && repaitItem.status==repairStatus.waitManager">
				<view class="agree-btn flex-sm"  @click="showModal($event)" data-target="refuseModel">驳回</view>
				<view class="refuse-btn flex-1" @click="operateOrder('agree')">同意</view>
			</view>
			<view class="btn-area" v-else-if="repaitItem.creator==userInfo.id && (repaitItem.status==repairStatus.waitManager || repaitItem.status==repairStatus.waitArea)" @click="showModal($event)" data-target="repairModel">修改订单</view>
		</view> -->
		<showModel :isShow="modalName=='repairModel'" @hideModel="hideModal"
					 @confirmDel="operateOrder('edit')" v-if="modalName=='repairModel'">
			<block slot="content">确定要修改保修单?</block>
		</showModel>
		<showModel :isShow="modalName=='refuseModel'" @hideModel="hideModal"
					 @confirmDel="operateOrder('refuse')" v-if="modalName=='refuseModel'">
			<block slot="content">确定要拒绝保修单?</block>
		</showModel>
</view>
</template>

<script>
	import {mapState} from 'vuex';
	import showModel from '../../../../components/show-model.vue'
	import downloader from '../../../../common/img-downloader.js'
	export default{
		computed:mapState(['repairStatus','userInfo']),
		data(){
			return{
				avatar:[],
				modalName:null,
				repaitItem:'',
				
			};
		},
		components:{showModel},
		methods: {
			/*
				操作订单
			*/
		   operateOrder(type){
			   switch(type){
				   case 'edit':
				   uni.navigateTo({
				   		url:"../create-order/create-order?id="+this.repaitItem.id,
				   			success:()=>{
				   				this.hideModal()
				   			}
				   })
				   break;
				   case 'agree':
				   this.$ajax('SubmitServiceOrder',{id:this.repaitItem.id,refused:0},res=>{
				   	uni.showToast({
				   		title:'拒绝保修单成功!',
				   		icon:'none',
				   		success:()=>{
				   			uni.navigateBack({
				   				delta:1
				   			})
				   		}
				   	})
				   })
				   break;
				   case 'refuse':
					this.$ajax('SubmitServiceOrder',{id:this.repaitItem.id,refused:1},res=>{
						uni.showToast({
							title:'拒绝保修单成功!',
							icon:'none',
							success:()=>{
								uni.navigateBack({
									delta:1
								})
							}
						})
					})
				   break;
			   }
			   
		   },
		   
			/*获得设备详情*/
			getSystemInfo(){
				uni.getSystemInfo({
					success:(res)=>{
						console.log(res.windowHeight)
					}
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			//显示模态框
			showModal(e){
				console.log(e)
				this.modalName=e.currentTarget.dataset.target;
			},
			hideModal(){
				this.modalName=null
			},
			viewImg(index){
				let imgList=[];
				this.repaitItem.files.forEach(item=>{
					if(item.postfix){
						imgList.push(item.url)
					}
				})
				
				uni.previewImage({
					urls: imgList,
					current:index,
					indicator:'number',
					longPressActions: {
						itemList: [ '保存图片'],
						success: function(data) {
							if(data.tapIndex + 1==1){
								uni.getImageInfo({
									src:imgList[data.tapIndex + 1],
									success:(res)=>{
										let promise=downloader.load(res.path,res.path);
										promise.then(([err, res])=>{ 
											if(res){
												uni.showToast({
													title:'保存图片到相册',
													icon:'none'
												})			
											} 
										});
								 }
							})
						}
					},
					fail: function(err) {
							console.log(err.errMsg);
					}
            }
				})
				
			},
			//获得详情
			getRepairItem(id){
				this.$ajax('ServiceOrder',{
					id:id
				},res=>{
					this.repaitItem=res;
					if(res.files){
						res.files.forEach(item=>{
							this.avatar.push({
								image:item.url,
								text:''
							})
						})
					}
					
					
				})
			}
		},
		onLoad(option){
			console.log(this.userInfo)
			this.getSystemInfo()
			if(option.id){
				this.getRepairItem(option.id)
			}
		}
	}
</script>


	


<style lang="less">
	.user-info-container{
		height:97px;
		box-sizing: border-box;
		padding-top:20px;
		padding-left:22px;
		padding-bottom:19px;
		background:#fff;
		.user-img{
			height: 58px;
			width: 58px;
			border-radius: 50%;
			vertical-align: middle;
		}
		.user-info{
			margin-left: 12px;
		}
		
	}
	.smile-img{
		width: 15px;
		height: 15px;
		vertical-align: middle;
		margin-right: 8px;
	}
	.cu-timeline>.cu-item>.content{
		padding:0;
	}
	.cu-timeline>.cu-item{
		padding:12px 15px 5px 60px;
	}
	
	.operaterInfo{
		padding:21px 19px 21px 20px;
		background: #fff;
		margin-bottom:13px;
	}
	.repair-detail{
		padding:15px 13px 23px 18px;
		background: #fff;
		margin-bottom:13px;
		.repair-detail-title{
			font-size:16px;
			padding-bottom:11px;
			font-family:PingFangSC-Regular;
			font-weight:400;
			color:rgba(42,42,42,1);
			margin-left:12px;
			border-bottom:1px solid rgba(238, 238, 237, 1);
		}
		.repair-detail-list{
			padding-top:15px;
			
			.repair-detail-list-item{
				margin-bottom:15px;
				font-size:15px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(42,42,42,1);
				.repair-intro{
					padding-left:10px;
				}
				.repair-summary{
					font-size:15px;
					padding:10px 15px;
				
					word-wrap: break-word;
					word-break: break-all
				}
			}
		}
	}
	
	.progress-content{
		padding:17px 41px 29px 45px;
		.progress-item{
			margin-bottom:8px;
			.status-title{
				font-size:15px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(42,42,42,1);
			}
			.progress-desc{
				font-size:14px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(137,136,136,1);
				margin-bottom:1px;
			}
			.progress-time{
				font-size:12px;
				font-family:PingFangSC-Regular;
				font-weight:400;
				color:rgba(137,136,136,1);
			}
		}
		
	}
	.btn-container{
		background-color: #fff;
		width:100%;
		padding:11px 12px 10px 14px;
		.btn-area{
			width:100%;
			text-align: center;
			background:rgba(66,176,237,1);
			border-radius:5px;
			height:40px;
			line-height:40px;
			color:#fff;
			font-size:17px;
			
		}
		.agree-btn{
			height:40px;
			line-height:40px;
			color:rgba(66,176,237,1);
			font-size:16px;
			border-radius:5px;
			text-align: center;
			margin-right: 12px;
			border:1px solid rgba(66,176,237,1);
		}
		.refuse-btn{
			height:40px;
			line-height:40px;
			color:#fff;
			text-align: center;
			background:rgba(66,176,237,1);
			border-radius:5px;
		}
	}
</style>
