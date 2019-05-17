<template>
	<view>
		<view class="order_content">
			<scroll-view scroll-y="true" class="page show" >
				<view class="operaterInfo flex justify-between" 
					v-show="repaitItem.status==$store.state.repairStatus.finish">
					<!-- 未处理状态不可见 -->
					<view>
						<image 
						src="../../../../static/icon/touxiang.png"
						class="img55"
						style="vertical-align: middle;"
						></image>
						<text style="font-size:16px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(42,42,42,1);">维修人员:TomAndJerry</text>
					</view>
					<view>
						<image 
						class="img38"
						src="../../../../static/icon/call.png"></image>
					</view>
				</view>
				
				<view class="repair-detail" style="position: relative;">
					<!-- 报修详情 -->
					<view 
						style="width:8px;height:25px;background:rgba(66,176,237,1);position:absolute;left:0;top:19px;">
					</view>
					<view class="repair-detail-title" >
						<text>报修详情</text>
					</view>
					<view class="repair-detail-list">
						<view class="repair-detail-list-item flex justify-between">
							<view>报修人</view>
							<view class="text-grey">{{repaitItem.creatorName}}</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between">
							<view>联系电话</view>
							<view class="text-grey">{{repaitItem.creatorMobile}}</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between">
							<view>门店名称</view>
							<view class="text-grey">{{repaitItem.shopname}}</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between">
							<view>品牌名称</view>
							<view class="text-grey">大象漆</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between text-right">
							<view style="width:26%;">门店地址</view>
							<view class="text-grey">{{repaitItem.provinceName}}{{repaitItem.cityName}}{{repaitItem.districtName}}{{repaitItem.address}}</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between">
							<view>维修类别</view>
							<view class="text-grey">{{repaitItem.catalogName}}</view>
						</view>
						
						<!-- <view class="repair-detail-list-item flex justify-between">
							<view>维修详情</view>
							<view class="text-grey">门店灯具坏了</view>
						</view> -->
						
						<view class="repair-detail-list-item flex justify-between">
							<view>上门时间</view>
							<view class="text-grey">{{repaitItem.appointdate | formatTime('YMD')}}</view>
						</view>
						
						<view class="repair-detail-list-item flex justify-between">
							<view>报修描述</view>
							<view class="text-grey">{{repaitItem.summary}}</view>
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
					<view class="repair-detail-item flex justify-between borderBottom" style="padding:24px 0;">
						<view>
							<text style="margin-right:40px;">维修进度:</text>
							<text class="cu-tag  round" 
							:class="{'bg-orange':repaitItem.status==$store.state.repairStatus.untreated,'bg-green':repaitItem.status==$store.state.repairStatus.treating,'bg-red':repaitItem.status==$store.state.repairStatus.refuse,'bg-purple':repaitItem.status==$store.state.repairStatus.finish}"
							>{{repaitItem.status | repairStatus}}</text>
						</view>
						<view class="cu-tag line-blue" @click="showModal($event)" data-target="bottomModal" v-if="repaitItem.status!=1">
							查看进度
						</view>
					</view>
					
					<view style="padding-top:22px;">
						<view style="margin-bottom:14px;">
							<text style="margin-right:20px;">申请时间:</text>
							<text class="text-grey">{{repaitItem.createdate | formatTime('YMDHMS')}}</text>
						</view>
						<view>
							<text style="margin-right:20px;">订单编号:</text>
							<text class="text-grey">{{repaitItem.shopseq}}</text>
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
					<view  style="padding-top:13px;padding-bottom:12px;">
						<uni-grid :options="avatar" @click="viewImg()"></uni-grid>
							<!-- <view class=" flex justify-start">
								<image v-for="(item,index) in repaitItem.files" :key="index" :src="item.url" style="width:78px;height:78px;margin-right:12px;" @click="viewImg(item)"></image> -->
								<!-- <view class="bg-img" v-for="(item,index) in repaitItem.files" :key="index"
								 :style="[{ backgroundImage:'url(' + item.url + ')' }]"></view> -->
							<!-- </view> -->
						
			
					</view>
				</view>
			</scroll-view>
			<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view></view>
					<view class="action text-blue" @tap="hideModal()">
						<image src="../../../../static/icon/close.png" style="width:24px;height:24px;"></image>
					</view>
				</view>
				<view class="progress-content">
					<view style="margin-bottom:23px;">
						<view class="progress-item">
							<image src='../../../../static/icon/radio.png' style="width:18px;height:18px;margin-right:19px;"></image>
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
							<image src='../../../../static/icon/duihaoGreen.png' style="width:16px;height:16px;margin-right:16px;"></image>
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
							<image src='../../../../static/icon/duihao.png' style="width:18px;height:16px;margin-right:16px;"></image>
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
							<image src='../../../../static/icon/duihao.png' style="width:18px;height:16px;margin-right:16px;"></image>
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
</view>
</template>

<script>
	import uniGrid from '../../../../components/uni-grid/uni-grid.vue'
	export default{
		data(){
			return{
				avatar:[],
				modalName:null,
				repaitItem:''
			};
		},
		components: {
			uniGrid
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			//显示模态框
			showModal(e){
				this.modalName=e.currentTarget.dataset.target;
			},
			hideModal(){
				this.modalName=''
			},
			viewImg(){
				let imgList=[];
				this.repaitItem.files.forEach(item=>{
					if(item.postfix){
						imgList.push(item.url)
					}
				})
				uni.previewImage({
					urls: imgList
				})
				
			},
			//获得详情
			getRepairItem(id){
				this.$ajax('ServiceOrder',{
					id:id
				},res=>{
					this.repaitItem=res
					res.files.forEach(item=>{
						this.avatar.push({
							image:item.url,
							text:''
						})
					})
					console.log(this.avatar)
				})
				// uni.request({
				// 	url:this.$store.state.url+'ServiceOrder',
				// 	data:{
				// 		id:id,
				// 		userId:49,
				// 		owner:18
				// 	},
				// 	success: (res) => {
				// 		
				// 		this.repaitItem=res.data.data;
				// 	}
				// })
			}
		},
		onLoad(option){
			this.getRepairItem(option.id)
		}
	}
</script>


	


<style lang="less">
	
	.cu-timeline>.cu-item>.content{
		padding:0;
	}
	.cu-timeline>.cu-item{
		padding:12px 15px 5px 60px;
	}
	.img55{
		width:55px;
		height:55px;
		margin-right:25px;
	}
	.img38{
		width:38px;
		height:38px;
		
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
			}
		}
	}
	.cu-modal{
		text-align:left;
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
</style>
